"use client";
import Link from "next/link";
import { Post } from "./Post";
import type { Post as PostType } from "./Post/PostContext";

export default function OptimisticPostItem({
  post,
  currentUser,
  priority = false,
}: {
  post: PostType;
  currentUser: string | null;
  priority?: boolean;
}) {
  return (
    <Post.Root post={post} currentUser={currentUser} className="card p-6 relative group overflow-hidden">
      <Post.Delete />
      
      <Post.Header timestamp="2h ago" />
      
      <Post.Title as="h4" className="text-lg font-medium mb-4" />

      <Link href={`/post/${post.id}`} scroll={false} aria-label={`View post: ${post.title}`}>
        <Post.Media 
          priority={priority} 
          className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center cursor-pointer mb-4 hover:scale-[1.02] transition-transform overflow-hidden relative"
        />
      </Link>

      <Post.Actions>
        <Post.LikeButton />
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
      </Post.Actions>
    </Post.Root>
  );
}
