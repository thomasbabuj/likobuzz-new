import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  await db.category.upsert({
    where: { id: "news" },
    update: {},
    create: { id: "news", name: "News", slug: "news" },
  });
  await db.category.upsert({
    where: { id: "entertainment" },
    update: {},
    create: {
      id: "entertainment",
      name: "Entertainment",
      slug: "entertainment",
    },
  });
  await db.category.upsert({
    where: { id: "lifestyle" },
    update: {},
    create: { id: "lifestyle", name: "Lifestyle", slug: "lifestyle" },
  });
}
main().finally(() => db.$disconnect());
