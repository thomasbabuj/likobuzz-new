import { RoleStylesType, UserRole } from "@/app/types";

export const USER_ROLES: Record<string, UserRole> = {
  REGULAR: "REGULAR",
  STAFF: "STAFF",
  EXPERT: "EXPERT",
  TOP_CONTRIBUTOR: "TOP_CONTRIBUTOR",
  TOP_COMMENTER: "TOP_COMMENTER",
  POWER_USER: "POWER_USER",
} as const;

export const COMMENT_CONSTANTS = {
  INITIAL_REPLIES_SHOWN: 3,
  LOAD_MORE_INCREMENT: 5,
  MAX_VISIBLE_NESTING: 4,
} as const;

export const ROLE_STYLES: RoleStylesType = {
  [USER_ROLES.REGULAR]: "",
  [USER_ROLES.STAFF]: "bg-red-100 text-red-800",
  [USER_ROLES.EXPERT]: "bg-blue-100 text-blue-800",
  [USER_ROLES.TOP_CONTRIBUTOR]: "bg-green-100 text-green-800",
  [USER_ROLES.TOP_COMMENTER]: "bg-purple-100 text-purple-800",
  [USER_ROLES.POWER_USER]: "bg-yellow-100 text-yellow-800",
} as const;
