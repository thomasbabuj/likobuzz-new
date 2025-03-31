import { Comment, User } from "@/app/types";
import { USER_ROLES } from "@/app/constants/comments";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "JohnDoe",
    role: USER_ROLES.REGULAR,
    avatar: "/avatars/john.png",
  },
  {
    id: "2",
    name: "JaneSmith",
    role: USER_ROLES.TOP_COMMENTER,
    avatar: "/avatars/jane.png",
  },
  {
    id: "3",
    name: "TechGuru",
    role: USER_ROLES.EXPERT,
    avatar: "/avatars/tech.png",
  },
  {
    id: "4",
    name: "AliceJohnson",
    role: USER_ROLES.REGULAR,
    avatar: "/avatars/alice.png",
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This new feature is amazing! The UI is so intuitive and responsive. Great job on the implementation.",
    author: mockUsers[0],
    createdAt: "2 hours ago",
    upvotes: 45,
    downvotes: 2,
    replies: [
      {
        id: "2",
        content: "I agree! The performance improvements are noticeable too.",
        author: mockUsers[1],
        createdAt: "1 hour ago",
        upvotes: 12,
        downvotes: 1,
        replies: [
          {
            id: "3",
            content: "Especially on mobile devices now.",
            author: mockUsers[2],
            createdAt: "30 minutes ago",
            upvotes: 8,
            downvotes: 0,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    content: "Would love to see more features like this in the future!",
    author: mockUsers[3],
    createdAt: "2 hours ago",
    upvotes: 5,
    downvotes: 0,
  },
];
