"use client";

import { useOptimistic, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "../actions";
import { authStore } from "./OptimisticPostItem";
import { toast } from "sonner";

export default function OptimisticNav({
  isConnected: initialIsConnected,
  usernameFetcher,
}: {
  isConnected: boolean;
  usernameFetcher: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!initialIsConnected && authStore.getSnapshot() === true) {
      authStore.setLoggingOut(false);
      router.refresh();
    }
  }, [initialIsConnected, router]);

  useEffect(() => {
    if (!isPending && initialIsConnected && authStore.getSnapshot() === true)
      authStore.setLoggingOut(false);
  }, [isPending, initialIsConnected]);

  const [optimisticConnected, setOptimisticConnected] = useOptimistic(
    initialIsConnected,
    () => false,
  );

  const handleLogout = () => {
    authStore.setLoggingOut(true);

    startTransition(async () => {
      setOptimisticConnected(false);
      try {
        await logoutAction();
      } catch (error) {
        if (error instanceof Error && error.message.includes("NEXT_REDIRECT"))
          return;
        toast.error("Logout failed. Please try again.");
      }
    });
  };

  return (
    <nav className="flex items-center">
      {optimisticConnected ? (
        <>
          <div className="hidden sm:flex items-center gap-2 text-sm mr-4">
            <span className="text-muted-foreground">Connected as</span>
            {usernameFetcher}
          </div>
          <Link href="/" className="btn btn-ghost" aria-label="Account">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <form action={handleLogout}>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-ghost text-destructive"
              aria-label="Logout"
            >
              {isPending ? (
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
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
              ) : (
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              )}
            </button>
          </form>
        </>
      ) : (
        <Link href="/login" className="btn btn-primary" aria-label="Login">
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
      )}
    </nav>
  );
}
