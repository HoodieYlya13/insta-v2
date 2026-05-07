'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    toast.error('An unexpected error occurred.');
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-muted/30 rounded-2xl border border-dashed border-border">
      <div className="size-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Oops ! Something went wrong.</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We couldn&apos;t load the photo feed. This may be due to a connection problem or a temporary server error.
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-primary px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}
