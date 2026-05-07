"use client";

import Image from "next/image";
import { usePost } from "./PostContext";

interface PostMediaProps {
  priority?: boolean;
  aspectRatio?: "square" | "video" | "auto";
  className?: string;
  sizes?: string;
}

export function PostMedia({
  priority = false,
  aspectRatio = "square",
  className = "w-full bg-muted rounded-lg flex items-center justify-center overflow-hidden relative",
  sizes = "(max-width: 768px) 100vw, 500px",
}: PostMediaProps) {
  const { post } = usePost();

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  }[aspectRatio];

  return (
    <div className={`${className} ${aspectClass}`}>
      <Image
        src={post.imageUrl}
        alt={post.title}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
