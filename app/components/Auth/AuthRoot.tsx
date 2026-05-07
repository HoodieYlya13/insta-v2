"use client";

import { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface AuthRootProps {
  children: ReactNode;
  onSuccess?: () => void;
  className?: string;
}

export function AuthRoot({ children, onSuccess, className }: AuthRootProps) {
  return (
    <AuthContext.Provider value={{ onSuccess }}>
      <div className={className}>{children}</div>
    </AuthContext.Provider>
  );
}
