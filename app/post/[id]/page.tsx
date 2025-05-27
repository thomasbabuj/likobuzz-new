"use client";
import { Comments } from "@/app/components/Comments";
import { RightSidebar } from "@/app/components/RightSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { usePost } from "@/app/hooks/use-post";
import { VoteButtons } from "@/app/components/VoteButtons";
import Loading from "@/app/loading";

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

  if (isLoading) return <Loading />;
  if (error || !post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto px-2 py-2 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1 min-w-0">
          <article className="bg-[var(--card)] rounded-lg border border-[var(--border)]">
            {/* MOBILE: Vote buttons above content */}
            <div className="md:hidden mb-2">
              <VoteButtons
                postId={post.id}
                initialUpvotes={post.upvotes}
                initialDownvotes={post.downvotes}
                initialUserVote={post.userVote}
                orientation="horizontal"
                size="lg"
                className="w-full justify-center"
              />
            </div>

            <div className="flex flex-col md:flex-row">
              {/* DESKTOP: Left vote column */}
              <div className="hidden md:flex flex-col items-center py-4 px-4 bg-[var(--muted)] rounded-l-lg border-r border-[var(--border)]">
                <VoteButtons
                  postId={post.id}
                  initialUpvotes={post.upvotes}
                  initialDownvotes={post.downvotes}
                  initialUserVote={post.userVote}
                  size="lg"
                />
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0 p-3 md:p-6">
                {/* Category, Title, Author, Timestamp */}
                <div className="flex flex-col gap-1 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-[var(--destructive)] text-[var(--card-foreground)] hover:bg-[var(--destructive)] w-fit"
                  >
                    {post.categories}
                  </Badge>
                  <h1 className="text-xl md:text-2xl font-bold leading-tight mb-1 md:mb-4">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                    <Badge
                      variant="secondary"
                      className="bg-[var(--destructive)] text-[var(--card-foreground)] hover:bg-[var(--destructive)]"
                    >
                      {MOCK_POST.authorBadge}
                    </Badge>
                    <span>
                      Posted by{" "}
                      <span className="text-foreground">{post.author}</span>
                    </span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="mb-4 flex flex-col gap-4">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto rounded-lg object-cover mx-auto"
                  />
                  <div className="rounded-lg p-4 flex-1 flex items-center">
                    <div
                      className="prose max-w-none text-[var(--foreground)]"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.commentCount} Comments</span>
                  <span>•</span>
                  <span>{MOCK_POST.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{post.upvotePercentage}% Upvoted</span>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {MOCK_POST.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Share */}
                <div className="space-y-1 mb-2">
                  <h3 className="text-xs font-medium">Share this article</h3>
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
            <div className="border-t border-[var(--border)]">
              <div className="flex justify-between p-4">
                <a
                  href="#"
                  className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <span>← PREV</span>
                  <span className="text-sm truncate">
                    Previous article title
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <span className="text-sm truncate">Next article title</span>
                  <span>NEXT →</span>
                </a>
              </div>
            </div>

            {/* Comments */}
            <div className="border-t border-[var(--border)]">
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
