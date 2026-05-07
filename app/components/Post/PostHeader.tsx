"use client";

import { usePost } from "./PostContext";

interface PostHeaderProps {
  timestamp?: string;
  className?: string;
}

export function PostHeader({
  timestamp,
  className = "flex items-center gap-3 mb-4",
}: PostHeaderProps) {
  const { post } = usePost();

  return (
    <div className={className}>
      <div className="size-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
        <div className="size-full rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white">
          {post.authorId.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div>
        <p className="font-bold text-sm">{post.authorId}</p>
        {timestamp && (
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        )}
      </div>
    </div>
  );
}
