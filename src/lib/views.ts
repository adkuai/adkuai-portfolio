import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import initialViews from "@/data/views.json";

interface ViewsData {
  count: number;
  ips?: string[];
}

const REDIS_KEY_VIEWS = "portfolio:views";
const REDIS_KEY_IPS = "portfolio:visitor_ips";
const INITIAL_SEED_COUNT = 1453;

let memoryCount: number = initialViews.count || INITIAL_SEED_COUNT;
let memoryIps: Set<string> = new Set((initialViews as ViewsData).ips || []);

function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;

  // Ignore missing, placeholder, or invalid credentials (e.g. during local build or dev)
  if (
    !url ||
    !token ||
    url === "[SENSITIVE]" ||
    token === "[SENSITIVE]" ||
    !url.startsWith("http")
  ) {
    return null;
  }

  try {
    return new Redis({
      url,
      token,
    });
  } catch (err) {
    console.error("Failed to initialize Upstash Redis:", err);
    return null;
  }
}

function getCandidates(): string[] {
  return [
    path.join(process.cwd(), "src", "data", "views.json"),
    path.join(process.cwd(), "data", "views.json"),
  ];
}

function resolveFilePath(): string {
  const candidates = getCandidates();
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function loadFromDisk(): void {
  try {
    const filePath = resolveFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed: ViewsData = JSON.parse(content);
      if (typeof parsed.count === "number" && !isNaN(parsed.count)) {
        memoryCount = Math.max(memoryCount, parsed.count);
      }
      if (Array.isArray(parsed.ips)) {
        memoryIps = new Set(parsed.ips);
      }
    }
  } catch {}
}

function saveToDisk(count: number, ips: Set<string>): void {
  try {
    const filePath = resolveFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const toSave: ViewsData = {
      count,
      ips: Array.from(ips).slice(-15000),
    };
    fs.writeFileSync(filePath, JSON.stringify(toSave, null, 2), "utf-8");
  } catch {}
}

function normalizeIp(ip: string): string {
  const trimmed = ip.trim().toLowerCase();
  if (trimmed === "::1" || trimmed === "::ffff:127.0.0.1" || trimmed === "localhost") {
    return "127.0.0.1";
  }
  return trimmed;
}

function hashIp(ip: string): string {
  // Hash IP address with SHA-256 for privacy and uniform storage
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function getViewsCount(): Promise<number> {
  const redis = getRedis();

  if (redis) {
    try {
      const current = await redis.get<number | string>(REDIS_KEY_VIEWS);
      if (current === null || current === undefined) {
        // Seed the initial count at 1453 if it does not exist yet
        await redis.setnx(REDIS_KEY_VIEWS, INITIAL_SEED_COUNT);
        return INITIAL_SEED_COUNT;
      }
      const parsed = Number(current);
      return !isNaN(parsed) && parsed > 0 ? parsed : INITIAL_SEED_COUNT;
    } catch (err) {
      console.error("Error reading views from Redis:", err);
    }
  }

  loadFromDisk();
  return memoryCount;
}

export async function recordIpView(rawIp: string): Promise<{ count: number; isNew: boolean }> {
  const normalized = normalizeIp(rawIp || "127.0.0.1");
  const ipHash = hashIp(normalized);

  const redis = getRedis();

  if (redis) {
    try {
      // 1. Seed initial count at 1453 if portfolio:views does not exist yet
      const exists = await redis.exists(REDIS_KEY_VIEWS);
      if (!exists) {
        await redis.setnx(REDIS_KEY_VIEWS, INITIAL_SEED_COUNT);
      }

      // 2. Add hashed IP to Redis Set
      const isAdded = await redis.sadd(REDIS_KEY_IPS, ipHash);

      // 3. Only increment by 1 when SADD returns 1 (brand new IP)
      if (isAdded === 1) {
        const updated = await redis.incr(REDIS_KEY_VIEWS);
        const countNum = Number(updated);
        memoryCount = Math.max(memoryCount, countNum);
        return { count: countNum, isNew: true };
      }

      // 4. Returning IP: get current count without incrementing
      const current = await redis.get<number | string>(REDIS_KEY_VIEWS);
      const parsed = Number(current);
      const finalCount = !isNaN(parsed) && parsed > 0 ? parsed : INITIAL_SEED_COUNT;
      return { count: finalCount, isNew: false };
    } catch (err) {
      console.error("Error recording IP view in Redis, falling back to local storage:", err);
    }
  }

  // Fallback to local disk / memory when Redis is not available
  loadFromDisk();
  if (memoryIps.has(ipHash)) {
    return { count: memoryCount, isNew: false };
  }

  memoryIps.add(ipHash);
  memoryCount += 1;
  saveToDisk(memoryCount, memoryIps);

  return { count: memoryCount, isNew: true };
}
