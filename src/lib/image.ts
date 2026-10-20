const RAW_BASE =
  "https://media.githubusercontent.com/media/st-eve-code/Client/main/data/scraped/images/";

export function imageSrc(file: string): string {
  return RAW_BASE + encodeURIComponent(file);
}
