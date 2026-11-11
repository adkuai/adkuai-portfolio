"use client";

import React, { useEffect, useRef, useState } from "react";

interface ViewersCountProps {
  initialCount?: number;
  className?: string;
}

export function ViewersCount({ initialCount = 1453, className = "" }: ViewersCountProps) {
  const [count, setCount] = useState<number>(initialCount);
  const hasRun = useRef(false);

  useEffect(() => {
    // 1. Check cached count on mount to avoid displaying a stale lower number
    try {
      const cached = localStorage.getItem("adkuai_view_count");
      if (cached) {
        const parsed = parseInt(cached, 10);
        if (!isNaN(parsed) && parsed > initialCount) {
          setCount(parsed);
        }
      }
    } catch {}

    // Prevent double-invocation in React StrictMode
    if (hasRun.current) return;
    hasRun.current = true;

    // 2. Send request to server - server strictly checks the visitor's IP address
    // If it's a new IP address, server increments by 1; if same IP, server returns current count.
    fetch(`/api/views?t=${Date.now()}`, {
      method: "POST",
      headers: { "Cache-Control": "no-cache" },
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (typeof data.count === "number" && !isNaN(data.count)) {
          setCount((prev) => {
            const next = Math.max(prev, data.count);
            try {
              localStorage.setItem("adkuai_view_count", String(next));
            } catch {}
            return next;
          });
        }
      })
      .catch(() => {
        // Keep current count without arbitrary guesswork
      });
  }, [initialCount]);

  return (
    <div
      title="Website Views"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border border-black/10 dark:border-white/10 bg-zinc-100/90 dark:bg-[#141416] shadow-xs select-none transition-colors ${className}`}
      aria-label={`Website views: ${count.toLocaleString()}`}
    >
      {/* Greyish Eye Icon - visible in both light & dark views */}
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
