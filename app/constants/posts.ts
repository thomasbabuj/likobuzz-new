import { CategoryStylesType } from "@/app/types";

export const POST_CATEGORIES = {
  ANNOUNCEMENTS: "Announcements",
  PRODUCT_UPDATES: "Product Updates",
  COMMUNITY: "Community",
  TUTORIALS: "Tutorials",
  NEWS: "News",
  ENTERTAINMENT: "Entertainment",
  TECH: "Technology",
  LIFESTYLE: "Lifestyle",
} as const;

export const POST_CONSTANTS = {
  EXCERPT_LENGTH: 160,
  FEATURED_POSTS_LIMIT: 5,
  POSTS_PER_PAGE: 10,
  RELATED_POSTS_LIMIT: 3,
} as const;

export const SORT_OPTIONS = {
  NEWEST: "newest",
  OLDEST: "oldest",
  MOST_VIEWED: "most_viewed",
  MOST_COMMENTED: "most_commented",
  MOST_UPVOTED: "most_upvoted",
} as const;

export const CATEGORY_STYLES: CategoryStylesType = {
  [POST_CATEGORIES.ANNOUNCEMENTS]: {
    background: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
  [POST_CATEGORIES.PRODUCT_UPDATES]: {
    background: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  [POST_CATEGORIES.COMMUNITY]: {
    background: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  [POST_CATEGORIES.TUTORIALS]: {
    background: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  [POST_CATEGORIES.NEWS]: {
    background: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  [POST_CATEGORIES.ENTERTAINMENT]: {
    background: "bg-pink-100",
    text: "text-pink-800",
    border: "border-pink-200",
  },
  [POST_CATEGORIES.TECH]: {
    background: "bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-200",
  },
  [POST_CATEGORIES.LIFESTYLE]: {
    background: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-200",
  },
} as const;
