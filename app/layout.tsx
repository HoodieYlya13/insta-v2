import Link from 'next/link';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { logoutAction } from './actions';
import './globals.css';

export const metadata = {
  title: 'InstaV2',
  description: 'A Next.js 16 best practice demo',
};

// "Dynamic hole" for PPR demonstration
async function UsernameFetcher() {
  // Artificial delay to show Suspense fallback
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <span className="font-bold text-primary">User0</span>;
}

async function Nav() {
  const cookieStore = await cookies();
  const isConnected = cookieStore.has('access_token');

  return (
    <nav className="flex items-center">
      {isConnected ? (
        <>
          <div className="hidden sm:flex items-center gap-2 text-sm mr-4">
            <span className="text-muted-foreground">Connected as</span>
            <Suspense fallback={<span className="animate-pulse bg-muted rounded h-4 w-16" />}>
              <UsernameFetcher />
            </Suspense>
          </div>
          <Link href="/" className="btn btn-ghost" aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn btn-ghost text-destructive" aria-label="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </form>
        </>
      ) : (
        <Link href="/login" className="btn btn-primary" aria-label="Login">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link> 
      )}
    </nav>
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
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              📸 InstaV2
            </Link>
            
            <Suspense fallback={<div className="h-8 w-32 animate-pulse bg-muted rounded" />}>
              <Nav />
            </Suspense>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="animate-pulse bg-muted rounded-lg h-96 w-full" />}>
            {children}
          </Suspense>
        </main>

        <Suspense fallback={null}>
          {modal} 
        </Suspense>
      </body>
    </html>
  );
}
