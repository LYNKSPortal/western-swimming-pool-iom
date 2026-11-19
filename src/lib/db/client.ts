import "server-only";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run `neon link` / `neon env pull` to populate .env.local."
  );
}

/**
 * Tagged-template SQL client for the pooled connection. Safe to use from
 * route handlers and Server Actions. Do not import this file from a Client
 * Component.
 */
export const sql = neon(process.env.DATABASE_URL);
