import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { db } from '@/lib/db';

const processedEvents = new Set(); // Store processed event IDs temporarily

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', { status: 400 });
  }

  // Prevent duplicate processing of the same event
  if (processedEvents.has(evt.id)) {
    console.log(`Duplicate event ignored: ${evt.id}`);
    return new Response('Duplicate event', { status: 200 });
  }
  processedEvents.add(evt.id);

  // Clean up the processedEvents set periodically (memory management)
  setTimeout(() => {
    processedEvents.delete(evt.id);
  }, 300000); // Keep for 5 minutes

  // Debugging payload
  console.log('Received payload:', JSON.stringify(payload, null, 2));

  if (payload?.data?.privateMetadata?.source === 'webhook-handler') {
    console.log('Ignoring self-triggered webhook.');
    return new Response('Ignoring self-triggered webhook', { status: 200 });
  }

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const data = payload.data;
    const user: Partial<User> = {
      id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      picture: data.image_url,
    };

    if (!user) {
      console.error('User data is invalid. Skipping processing.');
      return new Response('Invalid user data', { status: 400 });
    }

    const dbUser = await db.user.upsert({
      where: { email: user.email },
      update: user,
      create: {
        id: user.id!,
        name: user.name!,
        email: user.email!,
        picture: user.picture!,
        role: user.role || 'USER',
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(data.id, {
      privateMetadata: {
        role: dbUser.role || 'USER',
        source: 'webhook-handler', // Prevents re-triggering
      },
    });

    console.log(`User metadata updated in Clerk for user ID: ${data.id}`);
  }

  if (evt.type === 'user.deleted') {
    const userId = payload.data.id;
    await db.user.delete({ where: { id: userId } });
    console.log(`User with ID ${userId} deleted from database.`);
  }

  return new Response('Webhook received', { status: 200 });
}
