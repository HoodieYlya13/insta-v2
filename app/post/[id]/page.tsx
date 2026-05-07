import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { getPostById, getCurrentUser } from "../../lib/data";
import { toggleLikeAction } from "../../actions";
import OptimisticLikeButton from "../../components/OptimisticLikeButton";
import { notFound } from "next/navigation";

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  const currentUser = await getCurrentUser();

  if (!post) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card p-0 overflow-hidden">
      <div className="bg-muted flex items-center justify-center aspect-square md:aspect-auto relative overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          priority
        />
      </div>
      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
              <div className="size-full rounded-full bg-primary flex items-center justify-center font-bold text-xs">
                {post.authorId.slice(0, 2)}
              </div>
            </div>
            <div>
              <p className="font-bold">{post.authorId}</p>
              <p className="text-sm text-muted-foreground">
                Posted 2 hours ago
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-muted-foreground leading-relaxed">
            This is the full page version of the post. If you see this, it means
            you accessed the URL directly or refreshed the page while the modal
            was open.
          </p>
        </div>

        <div className="border-t pt-6 mt-6">
          <div className="flex gap-4">
            <OptimisticLikeButton
              post={post}
              isConnected={!!currentUser}
              toggleLikeAction={toggleLikeAction}
            />
            <button className="btn btn-ghost border border-border flex items-center justify-center gap-2 ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <Link
        href="/"
        className="btn btn-ghost mb-8 flex items-center gap-2 w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        Back
      </Link>

      <Suspense
        fallback={
          <div className="card h-[500px] animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">Loading post...</div>
          </div>
        }
      >
        <PostContent params={params} />
      </Suspense>
    </div>
  );
}
