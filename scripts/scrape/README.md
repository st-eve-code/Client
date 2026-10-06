# Scrapers

One folder per site, one script per category. Every category writes into the
same shared output tree, so the main app can call data by category without
caring which site produced it.

## Layout

```
scripts/scrape/
  lib/                  shared helpers (http, shopify, storage, types, text)
  sites/
    <site-id>/          one folder per website
      config.ts         base url + collection handles
      <category>.ts     one runnable scraper per category
  registry.ts           category -> scraper map
  run.ts                orchestrator

data/scraped/
  images/               ONE shared folder for every image, all sites
  metadata/
    <category>/         one folder per category
      index.json        summary used by the main app
      <slug>.json       one file per item
```

Image filenames are namespaced (`<site>__<handle>__<nnn>.jpg`) so sites never
collide while everything stays in a single flat folder.

## Running

```bash
npm run scrape              # every registered category
npm run scrape:vape-kits    # just the vape kits category
npx tsx scripts/scrape/run.ts <category>
npx tsx scripts/scrape/run.ts all
```

Shopify sites share one implementation: `lib/shopify.ts`'s
`createShopifyCollectionScraper` walks a "view all collection"
(`/collections/<handle>/products.json`, 250 per page) and downloads its images.
A category file is just a factory call wired to a collection handle.

Runs are resumable: existing images are skipped, metadata is rewritten each run.

## Adding a site

1. create `scripts/scrape/sites/<site-id>/config.ts`
2. add `scripts/scrape/sites/<site-id>/<category>.ts` exporting a `CategoryScraper`
3. register it in `scripts/scrape/registry.ts`

## Adding a category

Add another `<category>.ts` in the site folder, register it — output lands in
`data/scraped/metadata/<category>/` automatically.
