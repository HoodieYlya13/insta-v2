import { Suspense } from 'react';
import FeedList from './components/FeedList';
import FilterButtons from './components/FilterButtons';
import RefreshWrapper from './components/RefreshWrapper';
import SessionHygieneWrapper from './components/SessionHygieneWrapper';
import FeedSkeleton from './components/FeedSkeleton';

async function DynamicFeed({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  const currentSort = sort || 'desc';

  return (
    <Suspense key={currentSort} fallback={<FeedSkeleton />}>
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
        <Suspense fallback={<FeedSkeleton />}>
          <SessionHygieneWrapper>
            <DynamicFeed searchParams={searchParams} />
          </SessionHygieneWrapper>
        </Suspense>
      </RefreshWrapper>
    </div>
  );
}
