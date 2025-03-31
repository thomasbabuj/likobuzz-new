import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, Reply } from "lucide-react";
import { cn } from "@/lib/utils";

type Comment = {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
    role?: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
};

const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This is a really interesting discussion point. What do others think about this perspective?",
    author: {
      name: "JohnDoe",
      role: "Regular User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: "2 hours ago",
    upvotes: 10,
    downvotes: 2,
    replies: [
      {
        id: "2",
        content:
          "I completely agree with your point. We should consider all aspects of this situation.",
        author: {
          name: "JaneSmith",
          role: "Top Commenter",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        createdAt: "1 hour ago",
        upvotes: 5,
        downvotes: 1,
      },
    ],
  },
];

function CommentCard({
  comment,
  isReply = false,
}: {
  comment: Comment;
  isReply?: boolean;
}) {
  return (
    <div className={cn("flex gap-4", isReply && "ml-12 mt-4")}>
      <Avatar>
        <AvatarImage src={comment.author.image} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{comment.author.name}</span>
          {comment.author.role && (
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
              {comment.author.role}
            </span>
          )}
          <span className="text-sm text-gray-500">{comment.createdAt}</span>
        </div>
        <p className="mt-1 text-gray-800">{comment.content}</p>
        <div className="mt-2 flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.upvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <ThumbsDown className="h-4 w-4" />
            <span>{comment.downvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Comments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments</h2>
        <select className="rounded-md border px-3 py-1">
          <option>Most popular</option>
          <option>Newest first</option>
          <option>Oldest first</option>
        </select>
      </div>

      <div className="rounded-lg border p-4">
        <textarea
          placeholder="Join the conversation..."
          className="w-full rounded-md border p-3"
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <Button>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-6">
        {mockComments.map((comment) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
            {comment.replies?.map((reply) => (
              <CommentCard key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
