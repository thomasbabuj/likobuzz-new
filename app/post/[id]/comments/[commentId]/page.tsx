import { Comments } from "@/app/components/Comments";

type Props = {
  params: {
    id: string;
    commentId: string;
  };
};

export default function CommentThreadPage({ params }: Props) {
  const { id: postId, commentId } = params;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Comment Thread</h1>
        <p className="text-gray-600">Viewing all replies for this comment</p>
      </div>

      <Comments postId={postId} showFullThread={true} />
    </div>
  );
}
