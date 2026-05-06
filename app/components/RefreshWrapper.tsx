'use client';

import { useState, useTransition } from 'react';

export default function RefreshWrapper({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      setKey((prev) => prev + 1);
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleRefresh}
          disabled={isPending}
          className="btn btn-ghost text-sm flex gap-2 items-center"
        >
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
            className={isPending ? "animate-spin" : ""}
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
          </svg>
          {isPending ? 'Refreshing...' : 'Refresh Feed'}
        </button>
      </div>
      <div key={key}>
        {children}
      </div>
    </div>
  );
}
