export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="space-y-2">
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          <div className="h-6 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-48 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 max-w-xl mx-auto gap-8">
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
    </div>
  );
}
