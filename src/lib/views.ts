import fs from "fs";
import path from "path";
import initialViews from "@/data/views.json";

interface ViewsData {
  count: number;
  devices?: string[];
}

let memoryCount: number = initialViews.count || 1447;
let memoryDevices: Set<string> = new Set((initialViews as ViewsData).devices || []);

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
        memoryCount = parsed.count;
      }
      if (Array.isArray(parsed.devices)) {
        memoryDevices = new Set(parsed.devices);
      }
    }
  } catch {
    // Keep existing memory state on read errors
  }
}

export function getViewsCount(): number {
  loadFromDisk();
  return memoryCount;
}

export function registerDeviceVisit(deviceId?: string): { count: number; isNew: boolean } {
  loadFromDisk();

  // If no device ID provided, do not increment; just return current count
  if (!deviceId || typeof deviceId !== "string" || deviceId.trim() === "") {
    return { count: memoryCount, isNew: false };
  }

  const cleanId = deviceId.trim();

  // If this device has already visited, do NOT increment
  if (memoryDevices.has(cleanId)) {
    return { count: memoryCount, isNew: false };
  }

  // New device: record device ID and increment count by EXACTLY 1
  memoryDevices.add(cleanId);
  memoryCount += 1;

  // Persist to disk
  try {
    const filePath = resolveFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const toSave: ViewsData = {
      count: memoryCount,
      devices: Array.from(memoryDevices).slice(-10000), // preserve last 10,000 devices
    };
    fs.writeFileSync(filePath, JSON.stringify(toSave, null, 2), "utf-8");
  } catch {
    // Gracefully handle read-only environments
  }

  return { count: memoryCount, isNew: true };
}
