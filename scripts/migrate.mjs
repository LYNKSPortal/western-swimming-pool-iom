#!/usr/bin/env node
// Applies src/lib/db/schema.sql against DATABASE_URL_UNPOOLED (direct
// connection, recommended for DDL). Loads .env.local manually so this can
// run via `node scripts/migrate.mjs` without extra dependencies.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnvLocal() {
  try {
    const content = readFileSync(path.join(root, ".env.local"), "utf8");
    for (const line of content.split("\n")) {
      const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^"(.*)"$/, "$1");
    }
  } catch {
    // .env.local may not exist; rely on already-exported env vars instead.
  }
}

loadEnvLocal();

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL_UNPOOLED (or DATABASE_URL) is not set.");
  process.exit(1);
}

const sql = readFileSync(path.join(root, "src/lib/db/schema.sql"), "utf8");

const client = new Client(connectionString);
await client.connect();
try {
  await client.query(sql);
  console.log("Migration applied successfully.");
} finally {
  await client.end();
}
