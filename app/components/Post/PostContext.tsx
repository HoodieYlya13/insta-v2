"use client";

import { createContext, useContext } from "react";

export interface Post {
  id: string;
  title: string;
  likes: number;
  authorId: string;
  isLiked: boolean;
  imageUrl: string;
}

interface PostContextType {
  post: Post;
  currentUser: string | null;
  isAuthor: boolean;
  isPending: boolean;
  handleDelete: () => void;
}

export const PostContext = createContext<PostContextType | null>(null);

export function usePost() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
}
