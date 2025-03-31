// User related types
export type UserRole =
  | "REGULAR"
  | "STAFF"
  | "EXPERT"
  | "TOP_CONTRIBUTOR"
  | "TOP_COMMENTER"
  | "POWER_USER";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Comment related types
export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
  parentId?: string;
}

// Post related types
export interface PostContent {
  type: string;
  content: string;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  authorBadge: string;
  timestamp: string;
  views: number;
  commentCount: number;
  upvotePercentage: number;
  category: string;
  content: PostContent[];
  tags: string[];
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  isPublished?: boolean;
  isFeatured?: boolean;
}

// Style types
export interface RoleStylesType {
  [key: string]: string;
}

// Category types
export interface CategoryStylesType {
  [key: string]: {
    background: string;
    text: string;
    border?: string;
  };
}
