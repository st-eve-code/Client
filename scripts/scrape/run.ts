import { scrapers, byCategory } from "./registry.js";
import { writeRootIndex } from "./lib/storage.js";

async function main(): Promise<void> {
  const arg = process.argv[2];
  const all = !arg || arg === "all";
  const wanted = all ? null : arg;

  const list = wanted ? [byCategory(wanted)].filter(Boolean) : scrapers;

  if (!list.length) {
    console.error(`unknown category "${arg}". available:`);
    for (const s of scrapers) console.log(`  - ${s.category}  (${s.label}, site: ${s.site})`);
    process.exit(1);
  }

  for (const scraper of list as typeof scrapers) {
    await scraper.run();
  }

  await writeRootIndex(scrapers.map((s) => s.category));
  console.log("updated data/scraped/metadata/index.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
