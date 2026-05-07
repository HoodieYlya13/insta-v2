"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import OptimisticLikeButton from "./OptimisticLikeButton";
import { deletePostAction } from "@/app/actions";
import { toast } from "sonner";

export interface Post {
  id: string;
  title: string;
  likes: number;
  authorId: string;
  isLiked: boolean;
}

export default function OptimisticPostItem({
  post,
  currentUser,
  toggleLikeAction,
}: {
  post: Post;
  currentUser: string | null;
  toggleLikeAction: (id: string) => Promise<void>;
}) {
  const isAuthor = currentUser === post.authorId;
  const [isPending, startTransition] = useTransition();

  const [isDeletedOptimistically, setOptimisticDelete] = useOptimistic(
    false,
    () => true,
  );

  const handleDelete = () => {
    startTransition(async () => {
      setOptimisticDelete(true);

      try {
        await deletePostAction(post.id);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unknown error");
      }
    });
  };

  if (isDeletedOptimistically) return null;

  return (
    <div className="card p-6 relative group overflow-hidden">
      {isAuthor && (
        <form action={handleDelete} className="absolute top-4 right-4 z-10">
          <button
            type="submit"
            disabled={isPending}
            className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            title="Supprimer mon post"
          >
            {isPending ? (
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
                className="animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            ) : (
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
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            )}
          </button>
        </form>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs">
            {post.authorId.slice(0, 2)}
          </div>
        </div>
        <div>
          <p className="font-bold text-sm">{post.authorId}</p>
          <p className="text-xs text-muted-foreground">2h ago</p>
        </div>
      </div>

      <h4 className="text-lg font-medium mb-4">{post.title}</h4>

      <Link href={`/photo/${post.id}`} scroll={false}>
        <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center cursor-pointer mb-4 hover:scale-[1.02] transition-transform overflow-hidden">
          <div className="text-muted-foreground flex flex-col items-center">
            <span className="text-4xl mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/50"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </span>
            <span className="text-sm font-medium">View photo</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <OptimisticLikeButton
          post={post}
          isConnected={!!currentUser}
          toggleLikeAction={toggleLikeAction}
        />
        <button className="btn btn-ghost text-sm text-muted-foreground flex items-center gap-2">
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
  );
}
