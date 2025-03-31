import { Post } from "@/app/types";
import { POST_CATEGORIES } from "@/app/constants/posts";

export const mockPosts: Post[] = [
  {
    id: "1",
    title:
      "Additional photos revealed just before Kim Soo Hyun's press conference",
    author: "Alec06",
    authorBadge: "AKP STAFF",
    timestamp: "1 hour ago",
    views: 21013,
    commentCount: 38,
    upvotePercentage: 58,
    category: POST_CATEGORIES.NEWS,
    content: [
      {
        type: "text",
        content:
          "According to Kim Sae Ron's family, based on text messages and handwritten letters, they believe that Kim Sae Ron, then 15, was in a relationship with the then 27-year-old Kim Soo Hyun starting in 2015.",
      },
      {
        type: "text",
        content:
          'However, Kim Soo Hyun\'s side claims the relationship began in 2019, after Kim Sae Ron had reached legal adulthood. Amid the dispute, previously unreleased KakaoTalk messages from 2016 and 2018 have surfaced, containing affectionate exchanges such as "I\'ll hug you and fall asleep" and "When can I sleep in your arms?"',
      },
      {
        type: "text",
        content:
          "The controversy has further intensified following a statement from the brother of the late singer and actress Sulli. He alleged that Sulli was misled by Kim Soo Hyun and pressured into filming a nude scene in the film 'Real' during her lifetime.",
      },
    ],
    tags: ["Sulli", "Kim Sae Ron", "Kim Soo Hyun"],
    imageUrl: "/images/mock/post-detail.jpg",
    upvotes: 9,
    downvotes: 0,
    isPublished: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Introducing new community features and improvements",
    author: "TeamLead",
    authorBadge: "STAFF",
    timestamp: "3 hours ago",
    views: 15420,
    commentCount: 42,
    upvotePercentage: 92,
    category: POST_CATEGORIES.PRODUCT_UPDATES,
    content: [
      {
        type: "text",
        content:
          "We're excited to announce several new features that will enhance your community experience.",
      },
    ],
    tags: ["Updates", "Features", "Community"],
    imageUrl: "/images/mock/product-update.jpg",
    upvotes: 156,
    downvotes: 3,
    isPublished: true,
    isFeatured: false,
  },
];
