/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user: import("./db/schema").User | null;
    session: import("./db/schema").Session | null;
  }
}

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly SITE_URL: string;
  readonly ADMIN_EMAIL: string;
  readonly ADMIN_PASSWORD_HASH: string;
  readonly SESSION_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
