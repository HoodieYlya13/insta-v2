"use client";

import { usePost } from "./PostContext";
import OptimisticLikeButton from "../OptimisticLikeButton";
import { toggleLikeAction } from "@/app/actions";

export function PostLikeButton() {
  const { post, currentUser } = usePost();

  return (
    <OptimisticLikeButton
      post={post}
      isConnected={!!currentUser}
      toggleLikeAction={toggleLikeAction}
    />
  );
}
