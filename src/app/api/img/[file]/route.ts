import fs from "fs-extra";
import path from "path";
import { IMAGES_DIR } from "@/lib/catalog";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
): Promise<Response> {
  const { file } = await params;
  if (!/^[\w-]+__[\w-]+__\d{3}\.[a-z]+$/i.test(file) || file.includes("..")) {
    return new Response("invalid image name", { status: 400 });
  }

  const target = path.join(IMAGES_DIR, file);
  if (!(await fs.pathExists(target))) {
    return new Response("not found", { status: 404 });
  }

  const ext = path.extname(file).toLowerCase();
  const buffer = await fs.readFile(target);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}