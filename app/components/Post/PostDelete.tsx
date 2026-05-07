"use client";

import { usePost } from "./PostContext";

interface PostDeleteProps {
  className?: string;
}

export function PostDelete({ className = "absolute top-4 right-4 z-10" }: PostDeleteProps) {
  const { isAuthor, isPending, handleDelete } = usePost();

  if (!isAuthor) return null;

  return (
    <form action={handleDelete} className={className}>
      <button
        type="submit"
        disabled={isPending}
        className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
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
  );
}
