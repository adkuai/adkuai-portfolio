#!/usr/bin/env node
/**
 * Refreshes src/data/stats-snapshot.json - the committed fallback the stats
 * sections render from when LeetCode, Codeforces or GitHub are unreachable.
 *
 *   node scripts/refresh-stats.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "src/data/stats-snapshot.json");

const HANDLES = { github: "adkuai", leetcode: "adkuai", codeforces: "adkuai", codechef: "adkuai" };

const envPath = resolve(root, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

function toLevel(count, max) {
  if (count <= 0) return 0;
  const step = Math.max(max, 4) / 4;
  if (count <= step) return 1;
  if (count <= step * 2) return 2;
  if (count <= step * 3) return 3;
  return 4;
}

function buildCalendar(counts, days = 365) {
  const max = Math.max(1, ...counts.values());
  const out = [];
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  cursor.setUTCDate(cursor.getUTCDate() - (days - 1));
  for (let i = 0; i < days; i++) {
    const date = cursor.toISOString().slice(0, 10);
    const count = counts.get(date) ?? 0;
    out.push({ date, count, level: toLevel(count, max) });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

async function leetcode() {
  const query = `query u($u:String!){matchedUser(username:$u){username profile{ranking}submitStatsGlobal{acSubmissionNum{difficulty count}}userCalendar{streak totalActiveDays submissionCalendar}}userContestRanking(username:$u){rating globalRanking attendedContestsCount topPercentage}userContestRankingHistory(username:$u){attended rating}allQuestionsCount{difficulty count}}`;
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com", "User-Agent": "Mozilla/5.0" },
    body: JSON.stringify({ query, variables: { u: HANDLES.leetcode } }),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  const user = json.data.matchedUser;
  const contest = json.data.userContestRanking;
  // No max-rating field exists; derive the peak from attended contests only.
  const attendedRatings = (json.data.userContestRankingHistory ?? [])
    .filter((h) => h.attended)
    .map((h) => h.rating);
  const pick = (list, key) => list.find((b) => b.difficulty.toLowerCase() === key)?.count ?? 0;

  const counts = new Map();
  for (const [sec, n] of Object.entries(JSON.parse(user.userCalendar.submissionCalendar || "{}"))) {
    const date = new Date(Number(sec) * 1000).toISOString().slice(0, 10);
    counts.set(date, (counts.get(date) ?? 0) + n);
  }

  return {
    username: user.username,
    rating: Math.round(contest?.rating ?? 0),
    maxRating: attendedRatings.length
      ? Math.round(Math.max(...attendedRatings))
      : Math.round(contest?.rating ?? 0),
    globalRanking: contest?.globalRanking ?? 0,
    topPercentage: Number((contest?.topPercentage ?? 0).toFixed(2)),
    contests: contest?.attendedContestsCount ?? 0,
    solved: {
      all: pick(user.submitStatsGlobal.acSubmissionNum, "all"),
      easy: pick(user.submitStatsGlobal.acSubmissionNum, "easy"),
      medium: pick(user.submitStatsGlobal.acSubmissionNum, "medium"),
      hard: pick(user.submitStatsGlobal.acSubmissionNum, "hard"),
    },
    totals: {
      easy: pick(json.data.allQuestionsCount, "easy"),
      medium: pick(json.data.allQuestionsCount, "medium"),
      hard: pick(json.data.allQuestionsCount, "hard"),
    },
    streak: user.userCalendar.streak ?? 0,
    activeDays: user.userCalendar.totalActiveDays ?? 0,
    calendar: buildCalendar(counts),
  };
}

async function cf(path) {
  const res = await fetch(`https://codeforces.com/api/${path}`, { headers: { "User-Agent": "portfolio" } });
  const json = await res.json();
  if (json.status !== "OK") throw new Error(json.comment ?? "codeforces error");
  return json.result;
}

async function codeforces() {
  const handle = HANDLES.codeforces;
  const [info] = await cf(`user.info?handles=${handle}`);
  const rating = await cf(`user.rating?handle=${handle}`);
  const status = await cf(`user.status?handle=${handle}&from=1&count=10000`);
  const solved = new Set();
  for (const s of status) if (s.verdict === "OK") solved.add(`${s.problem.contestId ?? "x"}-${s.problem.index}`);
  return {
    handle,
    rating: info.rating ?? 0,
    maxRating: info.maxRating ?? 0,
    rank: info.rank ?? "unrated",
    maxRank: info.maxRank ?? "unrated",
    contests: rating.length,
    solved: solved.size,
    history: rating.map((r) => ({
      date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString().slice(0, 10),
      rating: r.newRating,
      contest: r.contestName,
    })),
  };
}

function starsFor(rating) {
  if (rating >= 2500) return 7;
  if (rating >= 2200) return 6;
  if (rating >= 2000) return 5;
  if (rating >= 1800) return 4;
  if (rating >= 1600) return 3;
  if (rating >= 1400) return 2;
  return 1;
}

async function codechef() {
  const handle = HANDLES.codechef;
  const res = await fetch(`https://www.codechef.com/users/${handle}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`codechef http ${res.status}`);
  const html = await res.text();
  const block = html.match(/"all":\s*(\[\{.*?\}\])\s*,\s*"all_old"/s);
  if (!block) throw new Error("codechef rating history not found in page");
  const entries = JSON.parse(block[1]);
  if (!entries.length) throw new Error("codechef rating history is empty");
  const ratings = entries.map((e) => Number(e.rating));
  const ranks = entries.map((e) => Number(e.rank)).filter((r) => r > 0);
  const current = ratings[ratings.length - 1];
  const solved = html.match(/Total Problems Solved:\s*(\d+)/);
  return {
    handle,
    rating: current,
    maxRating: Math.max(...ratings),
    stars: starsFor(current),
    contests: entries.length,
    bestRank: ranks.length ? Math.min(...ranks) : 0,
    solved: solved ? Number(solved[1]) : 0,
    history: entries.map((e) => ({
      date: e.end_date.slice(0, 10),
      rating: Number(e.rating),
      contest: e.name,
    })),
  };
}

const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

async function github() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set (put it in .env.local)");
  const query = `query u($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}pullRequests(states:MERGED){totalCount}repositories(privacy:PUBLIC,ownerAffiliations:OWNER){totalCount}}}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: HANDLES.github } }),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  const user = json.data.user;
  const cal = user.contributionsCollection.contributionCalendar;
  return {
    login: HANDLES.github,
    totalContributions: cal.totalContributions,
    mergedPullRequests: user.pullRequests.totalCount,
    publicRepos: user.repositories.totalCount,
    calendar: cal.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
    ),
  };
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const next = { refreshedAt: new Date().toISOString() };

for (const [key, fn] of [["leetcode", leetcode], ["codeforces", codeforces], ["codechef", codechef], ["github", github]]) {
  try {
    next[key] = await fn();
    console.log(`  ok   ${key}`);
  } catch (err) {
    next[key] = previous[key];
    console.error(`  FAIL ${key}: ${err.message} (kept previous snapshot)`);
    if (!next[key]) process.exitCode = 1;
  }
}

writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
console.log(`\nwrote ${OUT}`);
