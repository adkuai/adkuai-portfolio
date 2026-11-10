"use client";

import React, { useMemo, useState } from "react";
import type { HeatmapDay } from "@/types";

interface LeetCodeActivityHeatmapProps {
  calendar: HeatmapDay[];
  totalSubmissions?: number;
  activeDays: number;
  streak: number;
}

interface TooltipState {
  count: number;
  date: string;
  x: number;
  y: number;
}

interface MonthBadgeData {
  number: number;
  label: string;
  year: string;
}

interface MonthGroup {
  key: string;
  year: string;
  name: string;
  monthNum: number;
  cols: (HeatmapDay | null)[][];
  badge: MonthBadgeData | null;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function MonthBadge({ badge }: { badge: MonthBadgeData }) {
  const isSep = badge.number === 9;
  return (
    <div
      title={`${badge.label} (${badge.year})`}
      className="group/badge relative inline-flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110"
      aria-label={`${badge.label} (${badge.year})`}
    >
      <svg
        width="22"
        height="24"
        viewBox="0 0 24 26"
        className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id={`grad-${badge.number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {isSep ? (
              <>
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#6b21a8" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#3730a3" />
              </>
            )}
          </linearGradient>
          <linearGradient id={`ring-${badge.number}`} x1="100%" y1="0%" x2="0%" y2="100%">
            {isSep ? (
              <>
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="100%" stopColor="#7e22ce" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#4338ca" />
              </>
            )}
          </linearGradient>
        </defs>
        {/* Outer Hexagon */}
        <path
          d="M 12 1.5 L 22.5 7.5 L 22.5 18.5 L 12 24.5 L 1.5 18.5 L 1.5 7.5 Z"
          fill="#18181b"
          stroke={`url(#grad-${badge.number})`}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Inner concentric spiral ring */}
        <path
          d="M 12 3.5 L 20.5 8.5 L 20.5 17.5 L 12 22.5 L 3.5 17.5 L 3.5 8.5 Z"
          fill="none"
          stroke={`url(#ring-${badge.number})`}
          strokeWidth="0.8"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Core dark hexagon */}
        <path
          d="M 12 5.5 L 18 9.5 L 18 16.5 L 12 20.5 L 6 16.5 L 6 9.5 Z"
          fill="#111113"
        />
        {/* Center Number */}
        <text
          x="12"
          y="12.5"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="8.5"
          fontWeight="800"
        >
          {badge.number}
        </text>
        {/* LC label */}
        <text
          x="12"
          y="17.2"
          textAnchor="middle"
          dominantBaseline="central"
          fill={isSep ? "#d8b4fe" : "#a5b4fc"}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="3.2"
          fontWeight="700"
          letterSpacing="0.3"
        >
          LC
        </text>
      </svg>
    </div>
  );
}

export function LeetCodeActivityHeatmap({
  calendar,
  totalSubmissions,
  activeDays,
  streak,
}: LeetCodeActivityHeatmapProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const months = useMemo<MonthGroup[]>(() => {
    if (!calendar || calendar.length === 0) return [];

    // Group days by YYYY-MM
    const map = new Map<string, HeatmapDay[]>();
    for (const day of calendar) {
      const ym = day.date.slice(0, 7);
      if (!map.has(ym)) map.set(ym, []);
      map.get(ym)!.push(day);
    }

    const monthKeys = Array.from(map.keys());

    return monthKeys.map((ym) => {
      const days = map.get(ym)!;
      const [yearStr, monthStr] = ym.split("-");
      const monthNum = parseInt(monthStr, 10);
      const monthIdx = monthNum - 1;
      const name = MONTH_NAMES[monthIdx];

      // Sunday = 0, Monday = 1, ..., Saturday = 6
      const firstDate = new Date(`${days[0].date}T00:00:00Z`);
      const firstDow = firstDate.getUTCDay();

      const cols: (HeatmapDay | null)[][] = [];
      let curCol: (HeatmapDay | null)[] = [];

      // Pad beginning of first column
      for (let i = 0; i < firstDow; i++) {
        curCol.push(null);
      }

      for (const day of days) {
        curCol.push(day);
        if (curCol.length === 7) {
          cols.push(curCol);
          curCol = [];
        }
      }

      if (curCol.length > 0) {
        while (curCol.length < 7) {
          curCol.push(null);
        }
        cols.push(curCol);
      }

      // Assign badges for September (9) and October (10) as earned on LeetCode
      let badge: MonthBadgeData | null = null;
      if (monthNum === 9) {
        badge = { number: 9, label: "September Daily Challenge Badge", year: yearStr };
      } else if (monthNum === 10) {
        badge = { number: 10, label: "October Daily Challenge Badge", year: yearStr };
      }

      return {
        key: ym,
        year: yearStr,
        name,
        monthNum,
        cols,
        badge,
      };
    });
  }, [calendar]);

  const total = useMemo(() => {
    if (totalSubmissions && totalSubmissions > 0) return totalSubmissions;
    return calendar.reduce((sum, d) => sum + (d.count || 0), 0);
  }, [calendar, totalSubmissions]);

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${dateStr}T00:00:00`));
  };

  const getCellColor = (count: number) => {
    if (count <= 0) return "bg-zinc-200/80 dark:bg-[#2c2c2c]";
    if (count <= 2) return "bg-[#1e6835] dark:bg-[#1e6835]";
    if (count <= 5) return "bg-[#2cbb5d] dark:bg-[#2cbb5d]";
    if (count <= 9) return "bg-[#3cd070] dark:bg-[#3cd070]";
    return "bg-[#52f689] dark:bg-[#52f689] shadow-[0_0_6px_rgba(82,246,137,0.4)]";
  };

  const showTooltip = (day: HeatmapDay, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      count: day.count,
      date: formatDate(day.date),
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div className="mt-4 rounded-xl bg-zinc-100/70 dark:bg-[#1f1f1f] border border-black/5 dark:border-white/5 p-4 sm:p-5 shadow-inner">
      {/* Header bar matching exact LeetCode layout */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[20px] sm:text-[22px] font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {total}
          </span>
          <span className="text-[12px] sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-normal">
            submissions in the past one year
          </span>
          <span
            title="Total submissions over the past 365 days"
            className="inline-flex items-center justify-center text-zinc-400 dark:text-zinc-500 cursor-help"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 7v4M8 5h.01" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] sm:text-[12px] text-zinc-500 dark:text-zinc-400">
          <span>
            Total active days:{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200 tabular-nums">{activeDays}</strong>
          </span>
          <span>
            Max streak:{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200 tabular-nums">{streak}</strong>
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium bg-zinc-200/70 dark:bg-[#323232] text-zinc-700 dark:text-zinc-200 border border-zinc-300/60 dark:border-zinc-700/60 shadow-sm cursor-default">
            <span>Current</span>
            <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 4.5L6 8L9.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Heatmap Grid & Month groups with separate columns and centered labels/badges */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-start gap-4 sm:gap-5 min-w-max">
          {months.map((m) => (
            <div key={m.key} className="flex flex-col items-center">
              {/* Columns of days in this month */}
              <div className="flex gap-[3px]">
                {m.cols.map((col, cIdx) => (
                  <div key={cIdx} className="flex flex-col gap-[3px]">
                    {col.map((day, rIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={`pad-${rIdx}`}
                            className="size-[10px] sm:size-[11px] rounded-[2.5px] bg-transparent"
                          />
                        );
                      }
                      return (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => showTooltip(day, e)}
                          onMouseLeave={() => setTooltip(null)}
                          className={`size-[10px] sm:size-[11px] rounded-[2.5px] transition-transform duration-150 hover:scale-125 hover:z-20 cursor-pointer ${getCellColor(
                            day.count
                          )}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Month label or monthly challenge badge centered underneath */}
              <div className="mt-2.5 flex items-center justify-center h-6">
                {m.badge ? (
                  <MonthBadge badge={m.badge} />
                ) : (
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    {m.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md border border-zinc-200 bg-white/95 px-2.5 py-1 text-center font-mono text-[11px] text-zinc-800 shadow-md backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-200 -mt-2"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">
            {tooltip.count === 0
              ? "No submissions"
              : `${tooltip.count} ${tooltip.count === 1 ? "submission" : "submissions"}`}
          </div>
          <div className="text-[10px] text-zinc-400 dark:text-zinc-500">{tooltip.date}</div>
        </div>
      )}
    </div>
  );
}
