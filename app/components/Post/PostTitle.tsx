"use client";

import { usePost } from "./PostContext";

interface PostTitleProps {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function PostTitle({
  className = "font-bold mb-2",
  as: Component = "h3",
}: PostTitleProps) {
  const { post } = usePost();
  return <Component className={className}>{post.title}</Component>;
}
