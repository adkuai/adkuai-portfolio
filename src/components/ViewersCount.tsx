"use client";

import React, { useEffect, useRef, useState } from "react";

interface ViewersCountProps {
  initialCount?: number;
  className?: string;
}

export function ViewersCount({ initialCount = 1447, className = "" }: ViewersCountProps) {
  const [count, setCount] = useState<number>(initialCount);
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent React 18/19 StrictMode from double-invoking in dev mode
    if (hasRun.current) return;
    hasRun.current = true;

    try {
      // 1. Retrieve or generate a persistent unique ID for this device
      let deviceId = localStorage.getItem("adkuai_device_id");
      if (!deviceId) {
        deviceId = "dev_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
        localStorage.setItem("adkuai_device_id", deviceId);
      }

      // 2. Check if this device has already visited
      const alreadyVisited = localStorage.getItem("adkuai_device_visited") === "true";

      if (!alreadyVisited) {
        // First time this device visits: mark as visited and send deviceId to increment by 1
        localStorage.setItem("adkuai_device_visited", "true");

        fetch(`/api/views?t=${Date.now()}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          cache: "no-store",
          body: JSON.stringify({ deviceId }),
        })
          .then((res) => (res.ok ? res.json() : Promise.reject()))
          .then((data) => {
            if (typeof data.count === "number") {
              setCount(data.count);
            }
          })
          .catch(() => {
            // Local optimistic fallback
            setCount((prev) => prev + 1);
          });
      } else {
        // Same device returning: do NOT increment, just fetch the latest count
        fetch(`/api/views?t=${Date.now()}`, {
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
          cache: "no-store",
        })
          .then((res) => (res.ok ? res.json() : Promise.reject()))
          .then((data) => {
            if (typeof data.count === "number") {
              setCount(data.count);
            }
          })
          .catch(() => {});
      }
    } catch {
      // Fallback if localStorage is restricted (e.g. strict private browsing)
      fetch(`/api/views?t=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          if (typeof data.count === "number") {
            setCount(data.count);
          }
        })
        .catch(() => {});
    }
  }, []);

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
