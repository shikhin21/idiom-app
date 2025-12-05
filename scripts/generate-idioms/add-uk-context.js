import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// UK-specific idioms and phrases based on knowledge
const UK_SPECIFIC_IDIOMS = new Set([
  // UK slang and colloquialisms
  "bob's your uncle",
  "fanny's your aunt",
  "have a butcher's",
  "spend a penny",
  "taking the piss",
  "taking the mickey",
  "bloody hell",
  "bugger off",
  "chuffed to bits",
  "gobsmacked",
  "sod off",
  "throw a spanner in the works",
  "on your bike",
  "not my cup of tea",
  "lost the plot",
  "skive off",
  "chin wag",
  "having a laugh",
  "pull one's socks up",
  "gordon bennett",
  "stone the crows",
  "blimey",
  "crikey",
  "cor blimey",
  "bring one's arse to an anchor",
  "cheap-arse tuesday",
  "donkey's years",
  "full of beans",
  "have a gander",
  "on the pull",
  "on the lash",
  "wind up",
  "sorted",
  "gutted",
  "narky",
  "shirty",
  "wonky",
  "dodgy dealer",
  "bent as a nine bob note",
  "hard cheese",
  "easy peasy lemon squeezy",
  "bits and bobs",
  "brass monkey weather",
  "come a cropper",
  "do a bunk",
  "full monty",
  "have a dekko",
  "in a pickle",
  "keen as mustard",
  "know one's onions",
  "made up",
  "muck in",
  "not on",
  "pop one's clogs",
  "porkies",
  "pull a fast one",
  "put a sock in it",
  "quids in",
  "right as rain",
  "shambles",
  "take the biscuit",
  "tickety-boo",
  "up the duff",
  "waffle on",

  // UK cultural/institutional references
  "11 downing street",
  "10 downing street",
  "whitehall",
  "the old bill",
  "on the dole",
  "the smoke",
  "abbot's priory",
  "king's bench",
  "queen's bench",

  // Cockney rhyming slang
  "apples and pears",
  "dog and bone",
  "trouble and strife",
  "plates of meat",
  "butcher's hook",
  "pork pies",
  "adam and eve",
  "ball of chalk",
  "barnet fair",
  "china plate",
  "daisy roots",
  "gregory peck",
  "hampton wick",
  "loaf of bread",
  "mince pies",
  "north and south",
  "pig's ear",
  "rabbit and pork",
  "rosie lee",
  "syrup of figs",
  "tea leaf",
  "whistle and flute",
]);

// Patterns that indicate UK context
const UK_PATTERNS = [
  /\bbritish\b/i,
  /\buk\b/i,
  /\bengland\b/i,
  /\blondon\b/i,
  /\bparliament\b/i,
  /\bchancellor of the exchequer\b/i,
  /\bking's bench\b/i,
  /\bqueen's bench\b/i,
  /\blorry\b/i,
  /\bflat\b.*\bapartment\b/i, // UK term comparison
  /\bqueue\b/i, // when in British context
  /\bnhs\b/i,
  /\bpound sterling\b/i,
  /\bquid\b/i,
];

function isUKSpecific(idiom) {
  const idiomLower = idiom.idiom.toLowerCase();

  // Check exact matches
  if (UK_SPECIFIC_IDIOMS.has(idiomLower)) {
    return true;
  }

  // Check patterns in idiom text
  for (const pattern of UK_PATTERNS) {
    if (pattern.test(idiom.idiom) || pattern.test(idiom.definition)) {
      return true;
    }
  }

  return false;
}

// Get all chunk files
const idiomsDir = join(__dirname, 'idioms');
const files = readdirSync(idiomsDir)
  .filter(f => f.startsWith('idioms-') && f.endsWith('.json'))
  .sort();

console.log(`Found ${files.length} chunk files to process\n`);

let totalProcessed = 0;
let totalMarkedUK = 0;

// Process each file
for (const filename of files) {
  const filepath = join(idiomsDir, filename);
  console.log(`Processing ${filename}...`);

  // Read file
  const data = readFileSync(filepath, 'utf-8');
  const idioms = JSON.parse(data);

  let markedInFile = 0;

  // Check each idiom
  for (const idiom of idioms) {
    if (isUKSpecific(idiom)) {
      idiom.context = 'UK';
      markedInFile++;
    }
  }

  // Write back
  writeFileSync(filepath, JSON.stringify(idioms, null, 2));

  console.log(`  ✓ Marked ${markedInFile} UK idioms`);
  totalProcessed += idioms.length;
  totalMarkedUK += markedInFile;
}

console.log(`\n✓ Processing complete!`);
console.log(`Total idioms processed: ${totalProcessed}`);
console.log(`Total marked as UK: ${totalMarkedUK}`);
