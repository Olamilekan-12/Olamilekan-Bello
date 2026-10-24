'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { SiGithub, FaLinkedinIn } from './book/brand-icons';
import { person } from '@/content/cv';
import { useToast } from './ui/use-toast';

export function WriteToMe() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      // A crashed server answers with an HTML or plain-text page, not JSON.
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `The server could not send it (${res.status}). Please email me directly.`);
      toast({ title: 'Letter sent', description: 'Thank you. I will reply to your email soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast({
        title: 'The letter did not go through',
        description: err instanceof Error ? err.message : 'Please try again, or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const field =
    'w-full border-0 border-b border-dashed border-ink/25 bg-transparent px-0 py-1 font-display text-lg text-ink placeholder:text-ink-faint/70 focus:border-solid focus:border-vermilion focus:ring-0 focus:outline-none';

  return (
    <section id="write" className="relative scroll-mt-20 px-4 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="font-mono text-[11px] tracking-[0.2em] text-vermilion uppercase">Postscript</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight text-desk-ink sm:text-5xl">
            The book ends here. <span className="italic text-desk-muted">The conversation does not have to.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-desk-muted">
            Tell me about the system you are building, the role you are hiring for, or the bug that will not let go. I read every note.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 rounded-full border border-desk-line px-4 py-2 text-sm text-desk-ink hover:border-desk-ink">
              {person.email}
            </a>
            <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full border border-desk-line text-desk-ink hover:border-desk-ink">
              <SiGithub className="size-4" />
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-desk-line text-desk-ink hover:border-desk-ink">
              <FaLinkedinIn className="size-4" />
            </a>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="relative -rotate-[0.6deg] rounded-[3px] px-6 py-10 text-ink shadow-[0_30px_60px_-30px_rgba(20,12,4,0.6),0_2px_6px_rgba(20,12,4,0.15)] sm:px-12 sm:py-14"
          style={{
            backgroundColor: 'var(--paper)',
            backgroundImage:
              'linear-gradient(to right, transparent 2.6rem, rgba(165,56,31,0.22) 2.6rem, rgba(165,56,31,0.22) calc(2.6rem + 1px), transparent calc(2.6rem + 1px)), repeating-linear-gradient(to bottom, transparent 0, transparent 2.15rem, rgba(31,28,24,0.07) 2.15rem, rgba(31,28,24,0.07) calc(2.15rem + 1px))',
          }}
        >
          <div className="flex items-baseline justify-between font-mono text-[11px] tracking-wider text-ink-faint uppercase">
            <span>To: {person.name}</span>
            <span>{person.location}</span>
          </div>

          <p className="mt-8 font-display text-2xl italic">Dear Bello,</p>

          <label htmlFor="message" className="sr-only">Your message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={update}
            placeholder="I am building a platform that needs to settle payments without double-charging anyone..."
            className={`${field} mt-4 leading-[2.15rem]`}
          />

          <p className="mt-8 font-display text-xl italic">Yours,</p>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="smallcaps text-xs text-ink-faint">Name</label>
              <input id="name" name="name" required value={form.name} onChange={update} autoComplete="name" className={field} placeholder="Ada Lovelace" />
            </div>
            <div>
              <label htmlFor="email" className="smallcaps text-xs text-ink-faint">Reply to</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={update} autoComplete="email" className={field} placeholder="you@company.com" />
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-px disabled:opacity-60"
          >
            {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
            {sending ? 'Sealing the envelope' : 'Send the letter'}
          </button>
        </form>
      </div>
    </section>
  );
}

export function Colophon() {
  return (
    <footer className="border-t border-desk-line px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-desk-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {person.name}. Set in Fraunces and Newsreader.
        </p>
        <p className="font-mono text-[11px] tracking-wider uppercase">Next.js · Framer Motion · CSS 3D</p>
      </div>
    </footer>
  );
}
