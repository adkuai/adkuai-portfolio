"use client";

import React, { useEffect, useRef, useState } from "react";

interface ViewersCountProps {
  initialCount?: number;
  className?: string;
}

export function ViewersCount({ initialCount = 1428, className = "" }: ViewersCountProps) {
  const [count, setCount] = useState<number>(initialCount);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    // Send visit notification to increment view count
    fetch("/api/views", { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to record view");
        return res.json();
      })
      .then((data) => {
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        // Fallback: increment locally if API is unreachable
        setCount((prev) => prev + 1);
      });
  }, []);

  return (
    <div
      title="Website Views"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-black/10 dark:border-white/10 bg-zinc-100/90 dark:bg-[#141416] shadow-xs select-none transition-colors hover:border-black/20 dark:hover:border-white/20 ${className}`}
      aria-label={`Website views: ${count.toLocaleString()}`}
    >
      {/* Greyish Eye Icon - visible in both light & dark modes */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0"
        aria-hidden="true"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      {/* Counting Numbers */}
      <span className="font-mono text-[11px] sm:text-[12px] font-semibold text-zinc-700 dark:text-zinc-200 tabular-nums leading-none">
        {count.toLocaleString()}
      </span>
    </div>
  );
}
