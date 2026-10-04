#!/usr/bin/env tsx
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';
import pLimit from 'p-limit';
import slugify from 'slugify';

const DATA_DIR = path.resolve(process.cwd(), 'data/scraped');
const META_DIR = path.resolve(DATA_DIR, 'metadata');
const IMG_DIR = path.resolve(DATA_DIR, 'images');

async function main() {
  await fs.ensureDir(META_DIR);
  await fs.ensureDir(IMG_DIR);
  console.log('Scraper scaffold ready');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
