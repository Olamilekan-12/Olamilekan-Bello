import tls from 'node:tls';

// A minimal SMTP client over implicit TLS (port 465), using only Node built-ins.
// Sends one plain-text message through Gmail with the account's App Password.

type Mail = {
  user: string;
  pass: string;
  from: string;
  to: string;
  subject: string;
  text: string;
};

const b64 = (s: string) => Buffer.from(s, 'utf8').toString('base64');
const encodeHeader = (s: string) => `=?UTF-8?B?${b64(s)}?=`;
const wrap76 = (s: string) => s.match(/.{1,76}/g)?.join('\r\n') ?? '';

export function sendMail(mail: Mail): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: 'smtp.gmail.com', port: 465, servername: 'smtp.gmail.com' });
    socket.setEncoding('utf8');
    socket.setTimeout(15_000, () => socket.destroy(new Error('SMTP connection timed out')));

    let buffer = '';
    let waiting: ((reply: { code: number; text: string }) => void) | null = null;
    const replies: { code: number; text: string }[] = [];

    // A reply may span several lines ("250-..."); it ends on a line with a space after the code.
    socket.on('data', (chunk: string) => {
      buffer += chunk;
      let end: RegExpExecArray | null;
      while ((end = /^(\d{3}) .*\r?\n/m.exec(buffer))) {
        const text = buffer.slice(0, end.index + end[0].length);
        buffer = buffer.slice(end.index + end[0].length);
        const reply = { code: Number(end[1]), text: text.trim() };
        if (waiting) {
          const w = waiting;
          waiting = null;
          w(reply);
        } else {
          replies.push(reply);
        }
      }
    });

    const read = () =>
      new Promise<{ code: number; text: string }>((res) => {
        const queued = replies.shift();
        if (queued) res(queued);
        else waiting = res;
      });

    // `step` names the command in errors so credentials never end up in logs.
    const expect = async (codes: number[], line?: string, step = line) => {
      if (line !== undefined) socket.write(`${line}\r\n`);
      const reply = await read();
      if (!codes.includes(reply.code)) {
        throw new Error(`SMTP ${reply.code} at ${step ?? 'greeting'}: ${reply.text}`);
      }
      return reply;
    };

    socket.on('error', reject);

    (async () => {
      await expect([220]);
      await expect([250], 'EHLO localhost');
      await expect([334], 'AUTH LOGIN');
      await expect([334], b64(mail.user), 'AUTH username');
      await expect([235], b64(mail.pass), 'AUTH password');
      await expect([250], `MAIL FROM:<${mail.from}>`);
      await expect([250, 251], `RCPT TO:<${mail.to}>`);
      await expect([354], 'DATA');

      const headers = [
        `From: <${mail.from}>`,
        `To: <${mail.to}>`,
        `Subject: ${encodeHeader(mail.subject)}`,
        `Date: ${new Date().toUTCString()}`,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: base64',
      ];
      // Base64 bodies never contain a line that is just ".", so no dot-stuffing is needed.
      await expect([250], `${headers.join('\r\n')}\r\n\r\n${wrap76(b64(mail.text))}\r\n.`, 'message body');
      socket.write('QUIT\r\n');
      socket.end();
    })().then(resolve, (err) => {
      socket.destroy();
      reject(err);
    });
  });
}
