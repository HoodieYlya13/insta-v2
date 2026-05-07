import PostSkeleton from './PostSkeleton';

export default function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 max-w-xl mx-auto gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
