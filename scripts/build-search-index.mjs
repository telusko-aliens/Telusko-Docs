// Precomputes search structured data for every doc so the search route doesn't parse
// all MDX at runtime (too slow / memory hungry on Amplify's 1 GB compute).
import { structure } from 'fumadocs-core/mdx-plugins';
import fs from 'node:fs';
import path from 'node:path';

const docsDir = 'content/docs';
const outFile = '.source/search-structured-data.json';

const data = {};
for (const file of fs.readdirSync(docsDir, { recursive: true })) {
  if (!file.endsWith('.mdx')) continue;
  const raw = fs.readFileSync(path.join(docsDir, file), 'utf8');
  data[file.split(path.sep).join('/')] = structure(raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, ''));
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(data));
console.log(`[search] structured data for ${Object.keys(data).length} docs -> ${outFile}`);
