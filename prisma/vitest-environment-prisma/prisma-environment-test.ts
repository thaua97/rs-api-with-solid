import { prisma } from "@/libs/prisma";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest/environments";

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  async setup() {
    const schema = randomUUID();
    const url = generateDatabaseURL(schema);

    console.log(url);
    process.env.DATABASE_URL = url;

    execSync("npx prisma db push");
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect;
      },
    };
  },
};
