"use client";
import { Comments } from "@/app/components/Comments";
import { RightSidebar } from "@/app/components/RightSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { usePost } from "@/app/hooks/use-post";

// Mock data - replace with real data fetching
const MOCK_POST = {
  id: "1",
  title:
    "Additional photos revealed just before Kim Soo Hyun's press conference",
  author: "Alec06",
  authorBadge: "AKP STAFF",
  timestamp: "1 hour ago",
  views: 21013,
  commentCount: 38,
  upvotePercentage: 58,
  category: "NEWS",
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
};

type Props = {
  params: {
    id: string;
  };
};

export default function PostPage() {
  const params = useParams();
  const postId = params?.id as string;
  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1 min-w-0">
          <article className="bg-white rounded-lg border">
            <div className="flex">
              {/* Left vote column */}
              <div className="flex flex-col items-center py-4 px-4 bg-slate-50 rounded-l-lg border-r">
                <button className="hover:text-blue-500">
                  <ChevronUp className="h-6 w-6" />
                </button>
                <span className="text-lg font-medium my-1">{post.upvotes}</span>
                <button className="hover:text-red-500">
                  <ChevronDown className="h-6 w-6" />
                </button>
                <span className="text-xs text-muted-foreground mt-1">—</span>
                <span className="text-lg font-medium my-1">
                  {post.downvotes}
                </span>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0 p-6">
                {/* Category */}
                <div className="mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    {post.categories}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Author info */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    {MOCK_POST.authorBadge}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Posted by{" "}
                    <span className="text-foreground">{post.author}</span>
                    <span className="mx-2">•</span>
                    {post.createdAt}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-6">
                  {/* {post.content.map((block, index) => (
                    <p key={index} className="text-base leading-relaxed">
                      {block.content}
                    </p>
                  ))} */}
                  {post.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {MOCK_POST.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-100 text-slate-800 hover:bg-slate-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.commentCount} Comments</span>
                  </div>
                  <span>•</span>
                  <span>{MOCK_POST.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{post.upvotePercentage}% Upvoted</span>
                </div>

                {/* Share buttons */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Share this article</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[#1877f2] text-white hover:bg-[#1877f2]/90"
                    >
                      SHARE
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black text-white hover:bg-black/90"
                    >
                      SHARE
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t">
              <div className="flex justify-between p-4">
                <a
                  href="#"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <span>← PREV</span>
                  <span className="text-sm truncate">
                    Previous article title
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <span className="text-sm truncate">Next article title</span>
                  <span>NEXT →</span>
                </a>
              </div>
            </div>

            {/* Comments */}
            <div className="border-t">
              <div className="p-6">
                <Comments postId={postId} />
              </div>
            </div>
          </article>
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-80">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
