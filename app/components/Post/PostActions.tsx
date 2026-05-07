"use client";

import { ReactNode } from "react";

interface PostActionsProps {
  children: ReactNode;
  className?: string;
}

export function PostActions({
  children,
  className = "flex items-center justify-between border-t border-border pt-4 mt-auto",
}: PostActionsProps) {
  return <div className={className}>{children}</div>;
}
