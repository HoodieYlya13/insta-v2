import Link from 'next/link';
import { Suspense } from 'react';

async function PhotoContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 card p-0 overflow-hidden">
      <div className="bg-muted flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
          <circle cx="12" cy="13" r="3"></circle>
        </svg>
      </div>
      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary" />
            <div>
              <p className="font-bold">User{parseInt(id) % 3}</p>
              <p className="text-sm text-muted-foreground">Posted 2 hours ago</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Photo details #{id}</h1>
          <p className="text-muted-foreground leading-relaxed">
            This is the full page version of the photo. If you see this, it means you accessed the URL directly or refreshed the page while the modal was open.
          </p>
        </div>
        
        <div className="border-t pt-6 mt-6">
          <div className="flex gap-4">
            <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              Like
            </button>
            <button className="btn btn-ghost flex-1 border border-border flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <Link href="/" className="btn btn-ghost mb-8 flex items-center gap-2 w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        Back
      </Link>
      
      <Suspense fallback={
        <div className="card h-[500px] animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground">Loading photo...</div>
        </div>
      }>
        <PhotoContent params={params} />
      </Suspense>
    </div>
  );
}
