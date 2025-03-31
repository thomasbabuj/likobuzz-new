import { Comments } from "@/app/components/Comments";
import { RightSidebar } from "@/app/components/RightSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { VoteButtons } from "@/app/components/VoteButtons";

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

export default async function PostPage({ params }: Props) {
  const postId = await params.id;

  return (
    <div className="mx-auto">
      <div className="flex flex-col xl:flex-row xl:container xl:px-8 xl:py-8 xl:gap-6">
        {/* Main content area */}
        <div className="w-full xl:flex-1 xl:max-w-3xl">
          {/* Post content */}
          <div className="bg-white xl:rounded-lg xl:border xl:shadow-sm">
            {/* Mobile Vote Buttons */}
            <div className="px-4 py-2">
              <VoteButtons
                upvotes={MOCK_POST.upvotes}
                downvotes={MOCK_POST.downvotes}
              />
            </div>

            <div className="flex min-w-0">
              {/* Desktop Vote Column */}
              <div className="hidden md:flex flex-col items-center py-4 px-3 bg-muted/30">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 hover:bg-transparent hover:text-red-600"
                >
                  <ChevronUp className="h-5 w-5" />
                </Button>
                <span className="text-sm font-medium my-1">
                  {MOCK_POST.upvotes}
                </span>
                <span className="text-xs text-muted-foreground mb-1">—</span>
                <span className="text-sm font-medium my-1">
                  {MOCK_POST.downvotes}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 hover:bg-transparent hover:text-red-600"
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>

              {/* Main Content Column */}
              <div className="flex-1 min-w-0">
                {/* Post Header */}
                <div className="px-4 py-3 border-b space-y-2">
                  {/* Category */}
                  <div>
                    <Badge
                      variant="secondary"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      {MOCK_POST.category}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-bold leading-tight break-words">
                    {MOCK_POST.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      {MOCK_POST.authorBadge}
                    </Badge>
                    <span className="text-sm">
                      Posted by {MOCK_POST.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {MOCK_POST.timestamp}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 py-3 space-y-4">
                  {MOCK_POST.content.map((block, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed break-words"
                    >
                      {block.content}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="px-4 py-3 border-t">
                  <div className="flex flex-wrap gap-2">
                    {MOCK_POST.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm bg-muted hover:bg-muted/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mobile Stats Bar */}
                <div className="flex md:hidden items-center justify-between px-4 py-3 border-t bg-muted/30">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{MOCK_POST.commentCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{MOCK_POST.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{MOCK_POST.upvotePercentage}% Upvoted</span>
                  </div>
                </div>

                {/* Desktop Stats Bar */}
                <div className="hidden md:flex items-center gap-4 px-4 py-3 border-t bg-muted/30">
                  <div className="flex items-center gap-1">
                    <span>{MOCK_POST.upvotePercentage}% Upvoted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{MOCK_POST.commentCount} Comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{MOCK_POST.views.toLocaleString()} views</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="px-4 py-3 border-t">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Share this article</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#1877f2] text-white hover:bg-[#1877f2]/90"
                      >
                        SHARE
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white hover:bg-black/90"
                      >
                        SHARE
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Previous/Next Navigation */}
                <div className="px-4 py-3 border-t">
                  <div className="flex justify-between">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 min-w-0"
                    >
                      <span className="shrink-0">← PREV</span>
                      <span className="text-sm truncate">
                        Previous article title
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 min-w-0"
                    >
                      <span className="text-sm truncate">
                        Next article title
                      </span>
                      <span className="shrink-0">NEXT →</span>
                    </a>
                  </div>
                </div>

                {/* Comments section */}
                <div className="border-t">
                  <div className="px-4 py-3 min-w-0">
                    <Comments postId={postId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden w-80 xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
