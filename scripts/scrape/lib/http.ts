import fs from "fs-extra";
import axios, { type AxiosInstance } from "axios";
import { pipeline } from "stream/promises";
import { imagePath, imageExists } from "./storage.js";

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const http: AxiosInstance = axios.create({
  timeout: 30000,
  headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
  maxRedirects: 5,
});

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3, base = 400): Promise<T> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < attempts) await sleep(base * 2 ** (i - 1));
    }
  }
  throw lastErr;
}

export function fetchJson<T>(url: string): Promise<T> {
  return withRetry(async () => {
    const { data } = await http.get<T>(url);
    return data;
  });
}

export async function fetchText(url: string): Promise<string> {
  return withRetry(async () => {
    const { data } = await http.get<string>(url);
    return data;
  });
}

/** download to dest; returns true when bytes are on disk, false when failed */
export async function downloadImage(url: string, destFile: string): Promise<boolean> {
  const dest = imagePath(destFile);
  if (imageExists(destFile)) return true;
  try {
    const { data, headers } = await http.get(url, { responseType: "stream" });
    const total = Number(headers["content-length"] || 0);
    if (total > 0 && total < 100) {
      data.destroy();
      return false;
    }
    await pipeline(data, fs.createWriteStream(dest));
    return imageExists(destFile);
  } catch {
    await fs.remove(dest).catch(() => undefined);
    return false;
  }
}

export function extFromUrl(url: string): string {
  try {
    const p = new URL(url).pathname;
    const m = p.match(/\.(png|jpe?g|webp|gif|avif|svg)$/i);
    return m ? `.${m[1].toLowerCase()}` : ".jpg";
  } catch {
    return ".jpg";
  }
}
