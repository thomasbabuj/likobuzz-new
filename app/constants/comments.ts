export const USER_ROLES = {
  REGULAR: "Regular User",
  STAFF: "Staff",
  EXPERT: "Expert",
  TOP_CONTRIBUTOR: "Top Contributor",
  TOP_COMMENTER: "Top Commenter",
  POWER_USER: "Power User",
} as const;

export const COMMENT_CONSTANTS = {
  INITIAL_REPLIES_SHOWN: 2,
  LOAD_MORE_INCREMENT: 10,
  MAX_VISIBLE_NESTING: 3,
} as const;

type RoleStylesType = {
  [K in (typeof USER_ROLES)[keyof typeof USER_ROLES]]: string;
};

export const ROLE_STYLES: RoleStylesType = {
  [USER_ROLES.STAFF]: "bg-green-100 text-green-600",
  [USER_ROLES.EXPERT]: "bg-purple-100 text-purple-600",
  [USER_ROLES.TOP_CONTRIBUTOR]: "bg-yellow-100 text-yellow-600",
  [USER_ROLES.TOP_COMMENTER]: "bg-blue-100 text-blue-600",
  [USER_ROLES.POWER_USER]: "bg-orange-100 text-orange-600",
  [USER_ROLES.REGULAR]: "bg-gray-100 text-gray-600",
} as const;
