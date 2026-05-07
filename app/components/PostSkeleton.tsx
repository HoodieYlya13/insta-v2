export default function PostSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      {/* User Info Skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-muted" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-muted rounded" />
          <div className="w-16 h-3 bg-muted rounded" />
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="w-3/4 h-6 bg-muted rounded mb-4" />

      {/* Image Placeholder Skeleton */}
      <div className="aspect-square w-full bg-muted rounded-lg mb-4" />

      {/* Actions Skeleton */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="w-20 h-8 bg-muted rounded" />
        <div className="w-20 h-8 bg-muted rounded" />
      </div>
    </div>
  );
}
