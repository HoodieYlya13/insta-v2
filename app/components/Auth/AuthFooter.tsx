"use client";

import { ReactNode } from "react";

interface AuthFooterProps {
  children: ReactNode;
  className?: string;
}

export function AuthFooter({
  children,
  className = "mt-6 text-center text-sm text-muted-foreground",
}: AuthFooterProps) {
  return <div className={className}>{children}</div>;
}
