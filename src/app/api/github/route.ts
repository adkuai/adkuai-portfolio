import { NextResponse } from 'next/server';
import { portfolio } from '~/portfolio.config';
import snapshot from '@/data/stats-snapshot.json';

interface DayItem {
  date: string;
  count: number;
}

function buildCalendarResponse(days: DayItem[], total: number) {
  const weeks: { contributionDays: { contributionCount: number; date: string }[] }[] = [];
  let currentWeek: { contributionCount: number; date: string }[] = [];

  for (const d of days) {
    currentWeek.push({ contributionCount: d.count, date: d.date });
    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  return {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: total,
            months: [],
            weeks,
          },
        },
      },
    },
  };
}

export async function POST(request: Request) {
  try {
    const token = process.env.GITHUB_TOKEN || "";

    // 1. If GITHUB_TOKEN is available, try official GraphQL API
    if (token) {
      try {
        const body = await request.json().catch(() => ({}));
        const query = body.query || "";
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.data?.user?.contributionsCollection?.contributionCalendar) {
            return NextResponse.json(data);
          }
        }
      } catch (err) {
        console.warn("GraphQL API with token failed, trying fallback:", err);
      }
    }

    // 2. Fallback: Fetch public GitHub contributions
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${portfolio.handles.github}?y=last`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const publicData = await res.json();
        const days = (publicData.contributions || []).map((d: { date: string; count: number }) => ({
          date: d.date,
          count: d.count,
        }));
        const total = publicData.total?.lastYear ?? 184;
        return NextResponse.json(buildCalendarResponse(days, total));
      }
    } catch (err) {
      console.warn("Public contributions fetch failed, using snapshot:", err);
    }

    // 3. Fallback: Local stats snapshot
    const snapDays = (snapshot.github?.calendar || []).map((d: { date: string; count: number }) => ({
      date: d.date,
      count: d.count,
    }));
    const snapTotal = snapshot.github?.totalContributions ?? 184;
    return NextResponse.json(buildCalendarResponse(snapDays, snapTotal));
  } catch (error) {
    console.error("GitHub API Proxy Error:", error);
    const snapDays = (snapshot.github?.calendar || []).map((d: { date: string; count: number }) => ({
      date: d.date,
      count: d.count,
    }));
    const snapTotal = snapshot.github?.totalContributions ?? 184;
    return NextResponse.json(buildCalendarResponse(snapDays, snapTotal));
  }
}
