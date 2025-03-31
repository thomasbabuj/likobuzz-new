import { USER_ROLES } from "@/app/constants/comments";

export type Comment = {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
    role?: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  totalReplies: number;
  replies?: Comment[];
};

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This new feature is amazing! The UI is so intuitive and responsive. Great job on the implementation.",
    author: {
      name: "JohnDoe",
      role: "Regular User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2 hours ago",
    upvotes: 45,
    downvotes: 2,
    totalReplies: 15,
    replies: [
      {
        id: "1-1",
        content: "I agree! The performance improvements are noticeable too.",
        author: {
          name: "JaneSmith",
          role: "Top Commenter",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        createdAt: "1 hour ago",
        upvotes: 12,
        downvotes: 1,
        totalReplies: 3,
        replies: [
          {
            id: "1-1-1",
            content: "Especially on mobile devices, it's much smoother now.",
            author: {
              name: "TechGuru",
              role: "Expert",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
            },
            createdAt: "45 minutes ago",
            upvotes: 8,
            downvotes: 0,
            totalReplies: 0,
          },
        ],
      },
      {
        id: "1-2",
        content: "Would love to see more features like this in future updates!",
        author: {
          name: "AliceJohnson",
          role: "Regular User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        },
        createdAt: "30 minutes ago",
        upvotes: 5,
        downvotes: 0,
        totalReplies: 8,
        replies: [
          {
            id: "1-2-1",
            content:
              "I have some feature suggestions that could be interesting.",
            author: {
              name: "IdeaGenerator",
              role: "Regular User",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Idea",
            },
            createdAt: "25 minutes ago",
            upvotes: 4,
            downvotes: 0,
            totalReplies: 2,
            replies: [
              {
                id: "1-2-1-1",
                content:
                  "What kind of features do you have in mind? I'm curious to hear your thoughts.",
                author: {
                  name: "ProductManager",
                  role: "Staff",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=PM",
                },
                createdAt: "20 minutes ago",
                upvotes: 3,
                downvotes: 0,
                totalReplies: 1,
                replies: [
                  {
                    id: "1-2-1-1-1",
                    content: "I'll DM you the detailed proposal!",
                    author: {
                      name: "IdeaGenerator",
                      role: "Regular User",
                      image:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Idea",
                    },
                    createdAt: "15 minutes ago",
                    upvotes: 2,
                    downvotes: 0,
                    totalReplies: 0,
                  },
                ],
              },
            ],
          },
          {
            id: "1-2-2",
            content:
              "The roadmap already includes some exciting features coming soon!",
            author: {
              name: "TeamLead",
              role: "Staff",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lead",
            },
            createdAt: "22 minutes ago",
            upvotes: 6,
            downvotes: 0,
            totalReplies: 3,
            replies: [
              {
                id: "1-2-2-1",
                content: "Can't wait to see what's coming next!",
                author: {
                  name: "ExcitedUser",
                  role: "Regular User",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Excited",
                },
                createdAt: "18 minutes ago",
                upvotes: 3,
                downvotes: 0,
                totalReplies: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    content:
      "Has anyone encountered issues with the latest update? I'm seeing some inconsistencies in the data sync.",
    author: {
      name: "DevExplorer",
      role: "Power User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    },
    createdAt: "3 hours ago",
    upvotes: 28,
    downvotes: 3,
    totalReplies: 20,
    replies: [
      {
        id: "2-1",
        content: "Yes, I noticed this too. It happens specifically when...",
        author: {
          name: "BugHunter",
          role: "Expert",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bug",
        },
        createdAt: "2 hours ago",
        upvotes: 15,
        downvotes: 0,
        totalReplies: 4,
        replies: [
          {
            id: "2-1-1",
            content:
              "I found a workaround for this issue. Here's what you need to do...",
            author: {
              name: "SolutionPro",
              role: "Top Commenter",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Solution",
            },
            createdAt: "1 hour ago",
            upvotes: 20,
            downvotes: 0,
            totalReplies: 2,
            replies: [
              {
                id: "2-1-1-1",
                content:
                  "Thanks! This workaround saved me hours of troubleshooting.",
                author: {
                  name: "GratefulDev",
                  role: "Regular User",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Grateful",
                },
                createdAt: "30 minutes ago",
                upvotes: 5,
                downvotes: 0,
                totalReplies: 0,
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        content: "The team is aware of this issue and working on a fix.",
        author: {
          name: "TeamMember",
          role: "Staff",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
        },
        createdAt: "1 hour ago",
        upvotes: 25,
        downvotes: 0,
        totalReplies: 0,
      },
    ],
  },
  {
    id: "3",
    content:
      "Just published a detailed tutorial on how to maximize the use of this platform. Check it out!",
    author: {
      name: "ContentCreator",
      role: "Top Contributor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creator",
    },
    createdAt: "4 hours ago",
    upvotes: 72,
    downvotes: 1,
    totalReplies: 25,
    replies: [
      {
        id: "3-1",
        content:
          "This tutorial is gold! Especially the section about advanced features.",
        author: {
          name: "Learner123",
          role: "Regular User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Learner",
        },
        createdAt: "3 hours ago",
        upvotes: 18,
        downvotes: 0,
        totalReplies: 3,
        replies: [
          {
            id: "3-1-1",
            content: "Could you elaborate more on the automation part?",
            author: {
              name: "CuriousMind",
              role: "Regular User",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Curious",
            },
            createdAt: "2 hours ago",
            upvotes: 8,
            downvotes: 0,
            totalReplies: 2,
            replies: [
              {
                id: "3-1-1-1",
                content:
                  "I'll create a follow-up tutorial focusing on automation next week!",
                author: {
                  name: "ContentCreator",
                  role: "Top Contributor",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Creator",
                },
                createdAt: "1 hour ago",
                upvotes: 12,
                downvotes: 0,
                totalReplies: 0,
              },
            ],
          },
        ],
      },
      {
        id: "3-2",
        content:
          "Would love to see more tutorials like this. Very well explained!",
        author: {
          name: "Enthusiast",
          role: "Regular User",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Enthusiast",
        },
        createdAt: "2 hours ago",
        upvotes: 15,
        downvotes: 0,
        totalReplies: 0,
      },
    ],
  },
];
