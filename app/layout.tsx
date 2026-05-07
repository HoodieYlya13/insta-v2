import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Toaster } from 'sonner';
import OptimisticNav from './components/OptimisticNav';
import './globals.css';

export const metadata = {
  title: 'InstaV2',
  description: 'A Next.js 16 best practice demo',
};

// "Dynamic hole" for PPR demonstration
async function UsernameFetcher() {
  // Artificial delay to show Suspense fallback
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  return <span>{token ? "HY13dev" : "Guest"}</span>;
}

async function Nav() {
  const cookieStore = await cookies();
  const isConnected = cookieStore.has('access_token');

  return (
    <OptimisticNav 
      isConnected={isConnected} 
      usernameFetcher={
        <Suspense fallback={<span className="animate-pulse bg-muted rounded h-4 w-16" />}>
          <UsernameFetcher />
        </Suspense>
      }
    />
  );
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Toaster position="top-center" richColors theme="dark" />
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>InstaV2</span>
            </Link>

            <Suspense fallback={<div className="size-10 rounded-full bg-muted animate-pulse" />}>
              <Nav />
            </Suspense>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <Suspense fallback={null}>
          {modal} 
        </Suspense>
      </body>
    </html>
  );
}
