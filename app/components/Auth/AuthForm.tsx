"use client";

import { ReactNode } from "react";
import { loginAction } from "@/app/actions";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface AuthFormProps {
  children: ReactNode;
  className?: string;
}

export function AuthForm({ children, className = "space-y-4" }: AuthFormProps) {
  const { onSuccess } = useAuth();

  const handleAction = async () => {
    const result = await loginAction();

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    if (onSuccess) onSuccess();
  };

  return (
    <form action={handleAction} className={className}>
      {children}
    </form>
  );
}
