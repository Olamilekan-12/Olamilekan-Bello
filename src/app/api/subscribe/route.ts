import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1' or 'us2'
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Add subscriber to Mailchimp
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: 'subscribed',
      }
    );

    return NextResponse.json(
      { message: 'Successfully subscribed!', data: response },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Mailchimp error:', error);
    
    // Handle Mailchimp errors
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
