"use client";

import { useFormStatus } from "react-dom";

interface AuthSubmitProps {
  label?: string;
  loadingLabel?: string;
  className?: string;
}

export function AuthSubmit({
  label = "Login",
  loadingLabel = "Logging in...",
  className = "btn btn-primary w-full py-3 mt-4",
}: AuthSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
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
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
