import { Suspense } from 'react';
import FeedList from './components/FeedList';
import FilterButtons from './components/FilterButtons';
import RefreshWrapper from './components/RefreshWrapper';

async function DynamicFeed({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  const currentSort = sort || 'desc';

  return (
    <Suspense key={currentSort} fallback={
      <div className="grid grid-cols-1 max-w-xl mx-auto gap-8 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
            </div>
            <div className="h-6 w-3/4 bg-muted rounded mb-4" />
            <div className="aspect-square w-full bg-muted rounded-lg mb-4" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        ))}
      </div>
    }>
      <FeedList sort={currentSort} />
    </Suspense>
  );
}

async function FilterButtonsWrapper({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  return <FilterButtons currentSort={sort || 'desc'} />;
}

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Feed</h1>
          <p className="text-muted-foreground text-lg">Discover the latest moments shared by the community.</p>
        </div>
        <Suspense fallback={<div className="h-10 w-48 animate-pulse bg-muted rounded" />}>
          <FilterButtonsWrapper searchParams={searchParams} />
        </Suspense>
      </div>

      <RefreshWrapper>
        <DynamicFeed searchParams={searchParams} />
      </RefreshWrapper>
    </div>
  );
}
