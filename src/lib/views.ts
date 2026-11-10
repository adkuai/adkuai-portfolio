import fs from "fs";
import path from "path";
import initialViews from "@/data/views.json";

let memoryCount: number = initialViews.count || 1451;

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

function loadFromDisk(): number {
  try {
    const filePath = resolveFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (typeof parsed.count === "number" && !isNaN(parsed.count)) {
        memoryCount = Math.max(memoryCount, parsed.count);
      }
    }
  } catch {}
  return memoryCount;
}

export function getViewsCount(): number {
  return loadFromDisk();
}

export function incrementViewsCount(): number {
  // Read current count from disk first to ensure we never overwrite an increment
  loadFromDisk();

  // Increment by 1
  memoryCount += 1;

  // Persist immediately to disk
  try {
    const filePath = resolveFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify({ count: memoryCount }, null, 2), "utf-8");
  } catch {}

  return memoryCount;
}
