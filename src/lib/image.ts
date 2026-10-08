export function imageSrc(file: string): string {
  return `/api/img/${encodeURIComponent(file)}`;
}