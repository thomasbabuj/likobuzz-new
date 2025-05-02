import { PrismaClient, UserRole } from "@prisma/client";
const db = new PrismaClient();

// authorId for all posts (replace with a real user id from your User table)
const authorId = "cma59mzfh0000vglpuhe9uykx";

const posts = [
  {
    title: "Viral: Jeepney Driver Returns Lost Wallet",
    slug: "viral-jeepney-driver-returns-lost-wallet",
    content:
      "A jeepney driver in Quezon City went viral after returning a lost wallet with P10,000 cash. Netizens praise his honesty.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
  {
    title: "KathNiel Spotted Together in Baguio",
    slug: "kathniel-spotted-together-in-baguio",
    content:
      "Fans are abuzz after Kathryn Bernardo and Daniel Padilla were seen vacationing in Baguio. Are they back together?",
    published: true,
    authorId,
    categories: { connect: [{ id: "entertainment" }] },
  },
  {
    title: "How to Survive the Manila Commute",
    slug: "how-to-survive-the-manila-commute",
    content:
      "Tips and tricks from daily commuters on how to survive the traffic and heat in Metro Manila.",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "OFW Stories: Sacrifices Abroad",
    slug: "ofw-stories-sacrifices-abroad",
    content:
      "OFWs share their inspiring and heartbreaking stories of working far from home.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
  {
    title: "Pinoy Street Food: What’s Your Favorite?",
    slug: "pinoy-street-food-whats-your-favorite",
    content:
      "Isaw, kwek-kwek, or balut? Share your favorite street food and where to find the best ones!",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "Miss Universe PH 2024: Early Favorites",
    slug: "miss-universe-ph-2024-early-favorites",
    content:
      "Pageant fans discuss their bets for this year’s Miss Universe Philippines.",
    published: true,
    authorId,
    categories: { connect: [{ id: "entertainment" }] },
  },
  {
    title: "Barangay Captain Caught on Camera",
    slug: "barangay-captain-caught-on-camera",
    content:
      "A barangay captain in Cebu is under fire after a video surfaced showing alleged misconduct.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
  {
    title: "Best Beaches Near Manila for a Quick Getaway",
    slug: "best-beaches-near-manila-for-a-quick-getaway",
    content:
      "Planning a weekend escape? Here are the top beaches near Manila you can visit.",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "Pinoy Big Brother: Latest Eviction Shocks Fans",
    slug: "pinoy-big-brother-latest-eviction-shocks-fans",
    content:
      "Fans react to the surprise eviction in the latest episode of PBB.",
    published: true,
    authorId,
    categories: { connect: [{ id: "entertainment" }] },
  },
  {
    title: "Netizens Debate: Should TikTok Be Banned?",
    slug: "netizens-debate-should-tiktok-be-banned",
    content:
      "With talks of banning TikTok, Pinoy netizens weigh in on the pros and cons.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
  {
    title: "How to Start a Small Business in the Philippines",
    slug: "how-to-start-a-small-business-in-the-philippines",
    content: "A step-by-step guide for aspiring entrepreneurs.",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "Celebrity Breakups: Fact or Chismis?",
    slug: "celebrity-breakups-fact-or-chismis",
    content:
      "Which celebrity breakups are real and which are just rumors? Let’s discuss!",
    published: true,
    authorId,
    categories: { connect: [{ id: "entertainment" }] },
  },
  {
    title: "Typhoon Update: Safety Tips for Families",
    slug: "typhoon-update-safety-tips-for-families",
    content: "Stay safe this typhoon season with these essential tips.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
  {
    title: "Pinoy Memes That Made Us Laugh This Week",
    slug: "pinoy-memes-that-made-us-laugh-this-week",
    content: "A roundup of the funniest Filipino memes trending online.",
    published: true,
    authorId,
    categories: { connect: [{ id: "entertainment" }] },
  },
  {
    title: "Budget Travel: Exploring the Philippines on a Shoestring",
    slug: "budget-travel-exploring-the-philippines-on-a-shoestring",
    content:
      "Travel hacks for seeing the best of the Philippines without breaking the bank.",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "Viral Teacher Inspires Students in Mindanao",
    slug: "viral-teacher-inspires-students-in-mindanao",
    content:
      "A teacher’s unique teaching style goes viral, inspiring students and netizens alike.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
  {
    title: "K-Drama Craze: Why Filipinos Love Korean Series",
    slug: "k-drama-craze-why-filipinos-love-korean-series",
    content: "Pinoys share their favorite K-dramas and why they’re hooked.",
    published: true,
    authorId,
    categories: { connect: [{ id: "entertainment" }] },
  },
  {
    title: "Healthy Living: Pinoy Edition",
    slug: "healthy-living-pinoy-edition",
    content: "Tips for staying healthy and fit, Filipino style.",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "Barangay Fiesta: Best Moments Caught on Cam",
    slug: "barangay-fiesta-best-moments-caught-on-cam",
    content: "Share your favorite photos and stories from your local fiesta!",
    published: true,
    authorId,
    categories: { connect: [{ id: "lifestyle" }] },
  },
  {
    title: "Senate Hearing: What’s Next for the SIM Card Law?",
    slug: "senate-hearing-whats-next-for-the-sim-card-law",
    content: "Lawmakers discuss the future of the SIM Card Registration Act.",
    published: true,
    authorId,
    categories: { connect: [{ id: "news" }] },
  },
];

const users = [
  {
    id: "user1",
    clerkId: "clerk1",
    email: "john@demo.com",
    username: "JohnDoe",
    firstName: "John",
    lastName: "Doe",
    imageUrl: "/avatars/john.png",
    role: UserRole.USER,
  },
  {
    id: "user2",
    clerkId: "clerk2",
    email: "jane@demo.com",
    username: "JaneSmith",
    firstName: "Jane",
    lastName: "Smith",
    imageUrl: "/avatars/jane.png",
    role: UserRole.USER,
  },
  {
    id: "user3",
    clerkId: "clerk3",
    email: "tech@demo.com",
    username: "TechGuru",
    firstName: "Tech",
    lastName: "Guru",
    imageUrl: "/avatars/tech.png",
    role: UserRole.USER,
  },
  {
    id: "user4",
    clerkId: "clerk4",
    email: "alice@demo.com",
    username: "AliceJohnson",
    firstName: "Alice",
    lastName: "Johnson",
    imageUrl: "/avatars/alice.png",
    role: UserRole.USER,
  },
];

async function main() {
  console.log("Starting seed...");
  console.log("Seeding categories...");

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

  // Only seed posts if none exist
  const postCount = await db.post.count();
  if (postCount === 0) {
    console.log("Seeding posts...");

    for (const post of posts) {
      await db.post.create({ data: post });
    }
  } else {
    console.log("Posts already seeded, skipping.");
  }

  // Only seed users if none exist
  const userCount = await db.user.count();
  if (userCount === 1) {
    console.log("Seeding users...");

    for (const user of users) {
      await db.user.create({ data: user });
    }
  } else {
    console.log("Users already seeded, skipping.");
  }

  const postId = "cma6qfku40001vgroobjhv6y3";
  const postCommentsCount = await db.comment.count({
    where: { postId },
  });

  if (postCommentsCount === 0) {
    console.log(`Seeding comments for post ${postId}...`);

    const comment1 = await db.comment.create({
      data: {
        content:
          "Nakakatuwa pa rin na may mga honest na jeepney drivers! Sana dumami pa ang katulad niya.",
        authorId: "user1", // JohnDoe
        postId,
      },
    });
    const reply1 = await db.comment.create({
      data: {
        content: "Agree! Dapat bigyan ng award si kuya. Good vibes sa umaga.",
        authorId: "user2", // JaneSmith
        postId,
        parentId: comment1.id,
      },
    });
    await db.comment.create({
      data: {
        content:
          "Sana may dashcam footage para makita ng lahat yung ginawa niya.",
        authorId: "user3", // TechGuru
        postId,
        parentId: reply1.id,
      },
    });
  } else {
    console.log(`Comments for post ${postId} already seeded, skipping.`);
  }

  console.log("Seeding votes...");

  // Fetch all posts and users from DB (to get their real IDs)
  const allPosts = await db.post.findMany({ select: { id: true } });
  const allUsers = await db.user.findMany({ select: { id: true } });

  // Fetch all existing votes
  const existingVotes = await db.vote.findMany({
    select: { userId: true, postId: true },
  });
  const voteSet = new Set(existingVotes.map((v) => `${v.userId}|${v.postId}`));

  let votesCreated = 0;
  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    for (let j = 0; j < allUsers.length; j++) {
      const user = allUsers[j];
      const key = `${user.id}|${post.id}`;
      if (!voteSet.has(key)) {
        const type = (j + i) % 4 === 0 ? "DOWNVOTE" : "UPVOTE";
        await db.vote.create({
          data: {
            type,
            userId: user.id,
            postId: post.id,
          },
        });
        votesCreated++;
      }
    }
  }

  if (votesCreated > 0) {
    console.log(`Seeded ${votesCreated} votes.`);
  } else {
    console.log("Votes already seeded, skipping.");
  }

  console.log("Seeding complete.");
}
main().finally(() => db.$disconnect());
