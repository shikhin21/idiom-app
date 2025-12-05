import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the cleaned idioms file
const rawData = readFileSync(join(__dirname, 'idioms-cleaned-all.json'), 'utf-8');
let idioms = JSON.parse(rawData);

console.log(`Total idioms loaded: ${idioms.length}`);

// Read profanity review file to get IDs to exclude
const profanityData = readFileSync(join(__dirname, 'profanity-review.json'), 'utf-8');
const profaneIdioms = JSON.parse(profanityData);
const profaneIds = new Set(profaneIdioms.map(item => item.id));

console.log(`Profane idioms to exclude: ${profaneIds.size}`);

// Filter out profane idioms
idioms = idioms.filter(idiom => !profaneIds.has(idiom.id));
console.log(`After removing profane idioms: ${idioms.length}`);

// Filter out idioms with "Synonym of" definitions
const beforeSynonymFilter = idioms.length;
idioms = idioms.filter(idiom => {
  return !idiom.definition.toLowerCase().startsWith('synonym of');
});
console.log(`Removed ${beforeSynonymFilter - idioms.length} "Synonym of" idioms`);
console.log(`Final idiom count: ${idioms.length}`);

// Chunk size
const CHUNK_SIZE = 500;

// Calculate number of chunks
const numChunks = Math.ceil(idioms.length / CHUNK_SIZE);
console.log(`Creating ${numChunks} chunk files...`);

// Create chunks
for (let i = 0; i < numChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, idioms.length);
  const chunk = idioms.slice(start, end);

  // Create filename with proper numbering
  const startNum = start + 1;
  const endNum = end;
  const filename = `idioms-${startNum}-${endNum}.json`;
  const filepath = join(__dirname, 'idioms', filename);

  // Write chunk to file
  writeFileSync(filepath, JSON.stringify(chunk, null, 2));
  console.log(`✓ Created ${filename} (${chunk.length} entries)`);
}

console.log('\nAll chunks created successfully!');
