"use client";
import {
  useOptimistic,
  useTransition,
  useSyncExternalStore,
  useEffect,
} from "react";
import Link from "next/link";
import OptimisticLikeButton from "./OptimisticLikeButton";
import { deletePostAction } from "@/app/actions";
import { toast } from "sonner";
import Image from "next/image";

let isLoggingOut = false;
const listeners = new Set<() => void>();
export const authStore = {
  subscribe: (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  getSnapshot: () => isLoggingOut,
  setLoggingOut: (value: boolean) => {
    isLoggingOut = value;
    listeners.forEach((l) => l());
  },
};

export interface Post {
  id: string;
  title: string;
  likes: number;
  authorId: string;
  isLiked: boolean;
  imageUrl: string;
}

export default function OptimisticPostItem({
  post,
  currentUser,
  toggleLikeAction,
  priority = false,
}: {
  post: Post;
  currentUser: string | null;
  toggleLikeAction: (id: string) => Promise<{ success?: boolean; error?: string }>;
  priority?: boolean;
}) {
  const loggingOut = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    () => false,
  );

  useEffect(() => {
    if (currentUser === null && authStore.getSnapshot() === true)
      authStore.setLoggingOut(false);
  }, [currentUser]);

  const isAuthor = currentUser === post.authorId && !loggingOut;
  const [isPending, startTransition] = useTransition();

  const [isDeletedOptimistically, setOptimisticDelete] = useOptimistic(
    false,
    () => true,
  );

  const handleDelete = () => {
    startTransition(async () => {
      setOptimisticDelete(true);

      const result = await deletePostAction(post.id);
      if (result?.error) toast.error(result.error);
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
            aria-label="Delete my post"
            title="Delete my post"
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
        <div className="size-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
          <div className="size-full rounded-full bg-primary flex items-center justify-center font-bold text-xs">
            {post.authorId.slice(0, 2)}
          </div>
        </div>
        <div>
          <p className="font-bold text-sm">{post.authorId}</p>
          <p className="text-xs text-muted-foreground">2h ago</p>
        </div>
      </div>

      <h4 className="text-lg font-medium mb-4">{post.title}</h4>

      <Link href={`/post/${post.id}`} scroll={false} aria-label={`View post: ${post.title}`}>
        <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center cursor-pointer mb-4 hover:scale-[1.02] transition-transform overflow-hidden relative">
          <Image 
            src={post.imageUrl} 
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
            priority={priority}
          />
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <OptimisticLikeButton
          post={post}
          isConnected={!!currentUser}
          toggleLikeAction={toggleLikeAction}
        />
        <button 
          className="btn btn-ghost text-sm text-muted-foreground flex items-center gap-2"
          aria-label="Comment on this post"
        >
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
