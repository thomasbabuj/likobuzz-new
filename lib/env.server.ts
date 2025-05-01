import { env } from "./env";

// This file's only purpose is to be imported in your app's entry point
// to ensure environment validation runs before anything else

export function validateEnv() {
  const requiredEnvs = [
    "DATABASE_URL",
    "DIRECT_URL",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_APP_URL",
  ] as const;

  for (const key of requiredEnvs) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

// Run validation immediately
validateEnv();
