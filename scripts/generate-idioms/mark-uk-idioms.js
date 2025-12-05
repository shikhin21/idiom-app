import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Takes: filename and array of UK idiom names
const filename = process.argv[2];
const ukIdiomNames = process.argv.slice(3);

if (!filename || ukIdiomNames.length === 0) {
  console.log('Usage: node mark-uk-idioms.js <filename> <idiom1> <idiom2> ...');
  process.exit(1);
}

const filepath = join(process.cwd(), filename);
const data = JSON.parse(readFileSync(filepath, 'utf-8'));

let marked = 0;
for (const idiom of data) {
  if (ukIdiomNames.includes(idiom.idiom)) {
    idiom.context = 'UK';
    marked++;
  }
}

writeFileSync(filepath, JSON.stringify(data, null, 2));
console.log(`✓ Marked ${marked} UK idioms in ${filename}`);
