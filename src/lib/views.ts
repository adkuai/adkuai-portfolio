import fs from "fs";
import path from "path";
import crypto from "crypto";
import initialViews from "@/data/views.json";

interface ViewsData {
  count: number;
  ips?: string[];
}

let memoryCount: number = initialViews.count || 1453;
let memoryIps: Set<string> = new Set((initialViews as ViewsData).ips || []);

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

export function getViewsCount(): number {
  loadFromDisk();
  return memoryCount;
}

export function recordIpView(rawIp: string): { count: number; isNew: boolean } {
  loadFromDisk();

  const normalized = normalizeIp(rawIp || "127.0.0.1");
  const ipHash = hashIp(normalized);

  // If this IP address has already opened the website, do NOT increment
  if (memoryIps.has(ipHash)) {
    return { count: memoryCount, isNew: false };
  }

  // New IP address: register it and strictly increment by EXACTLY 1
  memoryIps.add(ipHash);
  memoryCount += 1;

  // Persist directly to disk
  try {
    const filePath = resolveFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const toSave: ViewsData = {
      count: memoryCount,
      ips: Array.from(memoryIps).slice(-15000), // preserve last 15,000 unique IP hashes
    };
    fs.writeFileSync(filePath, JSON.stringify(toSave, null, 2), "utf-8");
  } catch {
    // Gracefully handle read-only filesystems in serverless
  }

  return { count: memoryCount, isNew: true };
}
