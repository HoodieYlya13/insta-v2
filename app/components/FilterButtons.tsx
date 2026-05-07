"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterButtons({
  currentSort,
}: {
  currentSort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleSort("desc")}
        className={`btn ${currentSort === "desc" ? "btn-primary" : "btn-ghost"}`}
      >
        Recent
      </button>
      <button
        onClick={() => handleSort("asc")}
        className={`btn ${currentSort === "asc" ? "btn-primary" : "btn-ghost"}`}
      >
        Oldest
      </button>
    </div>
  );
}
