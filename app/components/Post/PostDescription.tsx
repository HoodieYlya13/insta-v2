"use client";

import { ReactNode } from "react";

interface PostDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export function PostDescription({
  children,
  className = "text-sm text-muted-foreground",
}: PostDescriptionProps) {
  if (!children) return null;
  return <p className={className}>{children}</p>;
}
