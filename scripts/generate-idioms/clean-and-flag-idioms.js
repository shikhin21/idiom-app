import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Comprehensive profanity list with variations
const PROFANITY_PATTERNS = [
  // Fuck variations
  'fuck', 'fucked', 'fucking', 'fucker', 'fuckers', 'fucks', 'motherfucker', 'motherfuckers',

  // Shit variations
  'shit', 'shits', 'shitty', 'shitting', 'shitted', 'bullshit', 'horseshit', 'chickenshit', 'batshit',

  // Damn variations
  'damn', 'damned', 'damning', 'dammit', 'damnit', 'goddamn', 'goddamned',

  // Ass variations
  'ass', 'asses', 'asshole', 'assholes', 'dumbass', 'smartass', 'badass', 'jackass', 'hardass',

  // Bitch variations
  'bitch', 'bitches', 'bitching', 'bitched', 'bitchy',

  // Bastard variations
  'bastard', 'bastards',

  // Hell variations
  'hell', 'hells', 'hellish',

  // Crap variations
  'crap', 'craps', 'crappy', 'crapped', 'crapping',

  // Piss variations
  'piss', 'pissed', 'pissing', 'pisses', 'pisser',

  // Cock variations
  'cock', 'cocks', 'cocky',

  // Dick variations
  'dick', 'dicks', 'dickhead', 'dickheads',

  // Pussy variations
  'pussy', 'pussies',

  // Cunt variations
  'cunt', 'cunts',

  // Whore variations
  'whore', 'whores', 'whoring',

  // Slut variations
  'slut', 'sluts', 'slutty',

  // Other vulgarities
  'douche', 'douchebag', 'turd', 'turds', 'fart', 'farts', 'farting', 'farted',
  'tit', 'tits', 'titty', 'titties', 'bollocks', 'bugger', 'buggered', 'buggering',
  'wank', 'wanker', 'wanking', 'wanked', 'bloody', 'screw', 'screwed', 'screwing', 'screws',
  'suck', 'sucks', 'sucking', 'sucked', 'sucker', 'prick', 'pricks', 'arse', 'arses',
  'shag', 'shagged', 'shagging', 'shags', 'knob', 'knobs', 'twat', 'twats',
  'sonovabitch', 'sonofabitch', 'friggin', 'frigging', 'freakin', 'freaking',
  'effing', 'godawful', 'godforsaken'
];

// Unicode character replacements
const UNICODE_REPLACEMENTS = {
  // Smart quotes
  '\u2018': "'", // left single quotation mark
  '\u2019': "'", // right single quotation mark
  '\u201C': '"', // left double quotation mark
  '\u201D': '"', // right double quotation mark
  '\u201B': "'", // single high-reversed-9 quotation mark
  '\u201F': '"', // double high-reversed-9 quotation mark
  '\u2039': '<', // single left-pointing angle quotation mark
  '\u203A': '>', // single right-pointing angle quotation mark
  '\u00AB': '<<', // left-pointing double angle quotation mark
  '\u00BB': '>>', // right-pointing double angle quotation mark

  // Dashes and hyphens
  '\u2013': '-', // en dash
  '\u2014': '-', // em dash
  '\u2015': '-', // horizontal bar
  '\u2212': '-', // minus sign

  // Spaces
  '\u00A0': ' ', // non-breaking space
  '\u2003': ' ', // em space
  '\u2002': ' ', // en space
  '\u2009': ' ', // thin space

  // Ellipsis
  '\u2026': '...', // horizontal ellipsis

  // Other common ones
  '\u2022': '*', // bullet
  '\u00B7': '*', // middle dot
  '\u2024': '.', // one dot leader
  '\u2025': '..', // two dot leader
  '\u00D7': 'x', // multiplication sign
  '\u00F7': '/', // division sign
};

// Clean unicode characters from text
function cleanUnicode(text) {
  if (!text) return text;

  let cleaned = text;
  let replacements = [];

  // Apply known replacements
  for (const [unicode, replacement] of Object.entries(UNICODE_REPLACEMENTS)) {
    if (cleaned.includes(unicode)) {
      replacements.push({ from: unicode, to: replacement });
      cleaned = cleaned.replaceAll(unicode, replacement);
    }
  }

  // Remove any remaining non-printable characters
  const beforeNonPrintable = cleaned;
  cleaned = cleaned.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  if (beforeNonPrintable !== cleaned) {
    replacements.push({ from: 'non-printable chars', to: 'removed' });
  }

  return { cleaned, replacements };
}

// Check if text contains profanity (whole word match only)
function checkProfanity(text) {
  if (!text) return [];

  const lowerText = text.toLowerCase();
  const found = [];

  for (const word of PROFANITY_PATTERNS) {
    // Use word boundaries on both sides for exact whole word match
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText)) {
      found.push(word);
    }
  }

  return found;
}

// Process a single idiom
function processIdiom(idiom) {
  const profanityMatches = [];
  let unicodeReplacements = [];

  // Check ONLY idiom text for profanity
  const idiomProfanity = checkProfanity(idiom.idiom);
  if (idiomProfanity.length > 0) {
    profanityMatches.push(...idiomProfanity);
  }

  // Clean unicode in idiom text
  const idiomResult = cleanUnicode(idiom.idiom);
  if (idiomResult.replacements.length > 0) {
    unicodeReplacements.push({ field: 'idiom', replacements: idiomResult.replacements });
  }
  idiom.idiom = idiomResult.cleaned;

  // Clean unicode in definition
  const defResult = cleanUnicode(idiom.definition);
  if (defResult.replacements.length > 0) {
    unicodeReplacements.push({ field: 'definition', replacements: defResult.replacements });
  }
  idiom.definition = defResult.cleaned;

  // Clean unicode in examples
  if (idiom.examples && Array.isArray(idiom.examples)) {
    idiom.examples.forEach((example, idx) => {
      if (example.sentence) {
        const exResult = cleanUnicode(example.sentence);
        if (exResult.replacements.length > 0) {
          unicodeReplacements.push({ field: `example[${idx}].sentence`, replacements: exResult.replacements });
        }
        example.sentence = exResult.cleaned;
      }
    });
  }

  // Clean unicode in wrong examples
  if (idiom.wrongExamples && Array.isArray(idiom.wrongExamples)) {
    idiom.wrongExamples = idiom.wrongExamples.map((wrongEx, idx) => {
      const weResult = cleanUnicode(wrongEx);
      if (weResult.replacements.length > 0) {
        unicodeReplacements.push({ field: `wrongExample[${idx}]`, replacements: weResult.replacements });
      }
      return weResult.cleaned;
    });
  }

  return { idiom, profanityMatches, unicodeReplacements };
}

// Main processing
console.log('Reading idioms-raw.json...');
const rawData = readFileSync(join(__dirname, 'idioms-raw.json'), 'utf-8');
const idioms = JSON.parse(rawData);

console.log(`Total idioms: ${idioms.length}`);
console.log('\nProcessing idioms...\n');

const flaggedForProfanity = [];
let totalUnicodeReplacements = 0;
let totalProfanityMatches = 0;

// Process each idiom
idioms.forEach((idiom, index) => {
  const result = processIdiom(idiom);

  if (result.unicodeReplacements.length > 0) {
    totalUnicodeReplacements++;
  }

  if (result.profanityMatches.length > 0) {
    totalProfanityMatches++;
    flaggedForProfanity.push({
      id: idiom.id,
      idiom: idiom.idiom,
      matchedWords: result.profanityMatches
    });
  }

  // Update the idiom in the array with cleaned version
  idioms[index] = result.idiom;
});

// Write profanity review file
console.log(`\n✓ Found ${totalProfanityMatches} idioms with profanity`);
console.log(`✓ Cleaned unicode in ${totalUnicodeReplacements} idioms`);

if (flaggedForProfanity.length > 0) {
  const reviewFilePath = join(__dirname, 'profanity-review.json');
  writeFileSync(reviewFilePath, JSON.stringify(flaggedForProfanity, null, 2));
  console.log(`\n✓ Wrote ${flaggedForProfanity.length} flagged idioms to profanity-review.json`);

  // Print summary
  console.log('\nSample flagged idioms:');
  flaggedForProfanity.slice(0, 10).forEach(item => {
    console.log(`  - ${item.id}: ${item.matchedWords.join(', ')}`);
    console.log(`    Idiom: "${item.idiom}"`);
  });

  if (flaggedForProfanity.length > 10) {
    console.log(`  ... and ${flaggedForProfanity.length - 10} more`);
  }
} else {
  console.log('\n✓ No profanity found!');
}

// Write cleaned idioms to file
const cleanedFilePath = join(__dirname, 'idioms-cleaned-all.json');
writeFileSync(cleanedFilePath, JSON.stringify(idioms, null, 2));
console.log(`\n✓ Wrote ${idioms.length} cleaned idioms to idioms-cleaned-all.json`);

console.log('\n✓ Processing complete!');
console.log('\nNext steps:');
console.log('1. Review profanity-review.json');
console.log('2. Decide which idioms to exclude');
console.log('3. Update chunk-idioms.js to use idioms-cleaned-all.json and filter excluded IDs');
