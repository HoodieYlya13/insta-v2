"use client";

import {
  ReactNode,
  useOptimistic,
  useTransition,
  useSyncExternalStore,
  useEffect,
} from "react";
import { Post, PostContext } from "./PostContext";
import { authStore } from "./authStore";
import { deletePostAction } from "@/app/actions";
import { toast } from "sonner";

interface PostRootProps {
  post: Post;
  currentUser: string | null;
  children: ReactNode;
  className?: string;
}

export function PostRoot({
  post,
  currentUser,
  children,
  className,
}: PostRootProps) {
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
    <PostContext.Provider
      value={{ post, currentUser, isAuthor, isPending, handleDelete }}
    >
      <article className={className}>{children}</article>
    </PostContext.Provider>
  );
}
