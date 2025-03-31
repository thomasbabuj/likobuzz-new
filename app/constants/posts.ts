export const POST_CATEGORIES = {
  ANNOUNCEMENTS: "Announcements",
  PRODUCT_UPDATES: "Product Updates",
  COMMUNITY: "Community",
  GUIDELINES: "Guidelines",
  TUTORIALS: "Tutorials",
  TIPS: "Tips",
  TECHNICAL: "Technical",
  SUPPORT: "Support",
} as const;

export const POST_CONSTANTS = {
  EXCERPT_LENGTH: 150,
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

type CategoryStylesType = {
  [K in (typeof POST_CATEGORIES)[keyof typeof POST_CATEGORIES]]: {
    bg: string;
    text: string;
    border: string;
  };
};

export const CATEGORY_STYLES: CategoryStylesType = {
  [POST_CATEGORIES.ANNOUNCEMENTS]: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  [POST_CATEGORIES.PRODUCT_UPDATES]: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  [POST_CATEGORIES.COMMUNITY]: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  [POST_CATEGORIES.GUIDELINES]: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  [POST_CATEGORIES.TUTORIALS]: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  [POST_CATEGORIES.TIPS]: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
  [POST_CATEGORIES.TECHNICAL]: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
  },
  [POST_CATEGORIES.SUPPORT]: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
} as const;
