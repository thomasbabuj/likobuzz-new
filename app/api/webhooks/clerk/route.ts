import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";

console.log("🚀 Webhook endpoint module loaded");

export async function POST(req: Request) {
  console.log("🔔 Webhook received at:", new Date().toISOString());

  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  console.log("📨 Headers received:", {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature?.substring(0, 10) + "...", // Only log part of the signature for security
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing required headers");
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  console.log("📦 Webhook payload:", JSON.stringify(payload, null, 2));
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  console.log(
    "🔑 Webhook secret configured:",
    !!process.env.CLERK_WEBHOOK_SECRET
  );

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ Webhook verified successfully");
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log("📝 Event type:", eventType);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const primaryEmail = email_addresses[0]?.email_address;
    // Generate username from email (remove @ and domain)
    const generatedUsername = primaryEmail ? primaryEmail.split("@")[0] : null;

    console.log("👤 User data:", {
      clerkId: id,
      email: primaryEmail,
      generatedUsername,
      firstName: first_name,
      lastName: last_name,
    });

    if (!primaryEmail) {
      console.error("❌ Missing primary email");
      return new Response("Missing primary email", { status: 400 });
    }

    try {
      console.log("💾 Creating user in database...");
      await db.user.create({
        data: {
          clerkId: id,
          email: primaryEmail,
          username: generatedUsername || `user_${id.split("_")[1]}`, // Fallback username using part of Clerk ID
        },
      });

      console.log("✨ User created successfully in database");
      return new Response("User created", { status: 201 });
    } catch (error) {
      console.error("❌ Database error:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  console.log("✅ Webhook processed successfully");
  return new Response("Webhook received", { status: 200 });
}
