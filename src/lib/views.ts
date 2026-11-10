import fs from "fs";
import path from "path";
import initialViews from "@/data/views.json";

let memoryCount: number = initialViews.count || 1428;

const filePath = path.join(process.cwd(), "src", "data", "views.json");

export function getViewsCount(): number {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (typeof parsed.count === "number") {
        memoryCount = parsed.count;
      }
    }
  } catch {
    // Graceful fallback to memoryCount
  }
  return memoryCount;
}

export function incrementViewsCount(): number {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (typeof parsed.count === "number") {
        memoryCount = parsed.count;
      }
    }
  } catch {
    // Continue with existing memoryCount
  }

  memoryCount += 1;

  try {
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({ count: memoryCount }, null, 2), "utf-8");
    }
  } catch {
    // Gracefully handle read-only filesystems (e.g. serverless)
  }

  return memoryCount;
}
