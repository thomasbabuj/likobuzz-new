import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { RightSidebar } from "@/app/components/RightSidebar";
import { VoteButtons } from "@/app/components/VoteButtons";
import { Comments } from "@/app/components/Comments";

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
        "The controversy has further intensified following a statement from the brother of the late singer and actress Sulli. He alleged that Sulli was misled by Kim Soo Hyun and pressured into filming a nude scene in the film &apos;Real&apos; during her lifetime.",
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

export default function PostPage({ params }: Props) {
  return (
    <div className="container mx-auto py-8">
      <div className="py-4">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <article className="bg-card border rounded-sm">
              {/* Mobile Vote Buttons */}
              <VoteButtons
                upvotes={MOCK_POST.upvotes}
                downvotes={MOCK_POST.downvotes}
              />

              <div className="flex">
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
                <div className="flex-1">
                  {/* Post Header */}
                  <div className="p-4 border-b space-y-3">
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
                    <h1 className="text-xl md:text-2xl font-bold leading-tight">
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
                  <div className="p-4 space-y-4">
                    {MOCK_POST.content.map((block, index) => (
                      <p
                        key={index}
                        className="text-sm md:text-base leading-relaxed"
                      >
                        {block.content}
                      </p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="p-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {MOCK_POST.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs md:text-sm bg-muted hover:bg-muted/80"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Stats Bar */}
                  <div className="flex md:hidden items-center justify-between p-3 border-t bg-muted/30 text-sm">
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
                  <div className="hidden md:flex items-center gap-4 p-3 border-t bg-muted/30">
                    <div className="flex items-center gap-1 text-sm">
                      <span>{MOCK_POST.upvotePercentage}% Upvoted</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MessageSquare className="h-4 w-4" />
                      <span>{MOCK_POST.commentCount} Comments</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span>{MOCK_POST.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="p-4 border-t">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        Share this article
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#1877f2] text-white hover:bg-[#1877f2]/90 text-xs md:text-sm"
                        >
                          SHARE
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-black text-white hover:bg-black/90 text-xs md:text-sm"
                        >
                          SHARE
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Previous/Next Article Preview - Desktop/Tablet Only */}
            <div className="mt-6 hidden md:grid grid-cols-2 gap-6">
              {/* Previous Article */}
              <div>
                <Button
                  variant="destructive"
                  className="w-full mb-4 bg-[#c91c1c] hover:bg-[#a51717] justify-start px-4"
                >
                  ← PREV
                </Button>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="relative w-24 h-16">
                    <Image
                      src="/images/mock/prev-post.jpg"
                      alt="Previous article"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="flex-1 text-base font-medium group-hover:text-red-600 line-clamp-2">
                    Additional photos revealed just before Kim Soo Hyun&apos;s
                    press conference
                  </h4>
                </div>
              </div>

              {/* Next Article */}
              <div>
                <Button
                  variant="destructive"
                  className="w-full mb-4 bg-[#c91c1c] hover:bg-[#a51717] justify-end px-4"
                >
                  NEXT →
                </Button>
                <div className="flex gap-4 group cursor-pointer">
                  <div className="relative w-24 h-16">
                    <Image
                      src="/images/mock/next-post.jpg"
                      alt="Next article"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="flex-1 text-base font-medium group-hover:text-red-600 line-clamp-2">
                    &apos;The Old Woman With The Knife&apos; invited to 15th
                    Beijing International Film Festival
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          <div className="hidden xl:block">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="mt-8">
        <Comments postId={params.id} />
      </div>
    </div>
  );
}
