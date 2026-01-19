import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IDIOMS_DIR = path.join(__dirname, 'idioms');

/**
 * Generate 2-3 example sentences for an idiom
 */
function generateExamples(idiom, definition) {
  const examples = [];

  // Create contextual examples based on the idiom and definition
  const contexts = [
    // Professional/work contexts
    {
      template: (idiom) => `After months of hard work, she finally ${idiom} and got promoted.`,
      check: (def) => def.match(/succeed|achieve|accomplish|complete/i)
    },
    {
      template: (idiom) => `The manager told us to ${idiom} before the deadline.`,
      check: (def) => def.match(/hurry|quick|fast|urgent/i)
    },
    {
      template: (idiom) => `He tried to ${idiom} during the meeting, but everyone saw through it.`,
      check: (def) => def.match(/deceive|lie|trick|fool|pretend/i)
    },
    {
      template: (idiom) => `Don't ${idiom} just because things got difficult.`,
      check: (def) => def.match(/quit|give up|surrender|abandon/i)
    },

    // Emotional/social contexts
    {
      template: (idiom) => `She was so angry that she ${idiom} and stormed out.`,
      check: (def) => def.match(/angry|mad|furious|upset/i)
    },
    {
      template: (idiom) => `When he heard the news, he ${idiom} with joy.`,
      check: (def) => def.match(/happy|joyful|excited|pleased/i)
    },
    {
      template: (idiom) => `I didn't mean to ${idiom}, but the secret just came out.`,
      check: (def) => def.match(/reveal|tell|disclose|expose/i)
    },
    {
      template: (idiom) => `They always ${idiom} whenever they're together.`,
      check: (def) => def.match(/argue|fight|disagree|quarrel/i)
    },

    // Advice/warning contexts
    {
      template: (idiom) => `My grandmother always told me to ${idiom}.`,
      check: (def) => def.match(/advice|wise|careful|prudent/i)
    },
    {
      template: (idiom) => `If you ${idiom}, you'll regret it later.`,
      check: (def) => def.match(/mistake|error|wrong|bad/i)
    },
    {
      template: (idiom) => `The teacher warned us not to ${idiom} during the exam.`,
      check: (def) => def.match(/cheat|dishonest|unfair/i)
    },

    // Descriptive/observation contexts
    {
      template: (idiom) => `The situation has ${idiom} over the past year.`,
      check: (def) => def.match(/change|transform|evolve|develop/i)
    },
    {
      template: (idiom) => `You can tell he's ${idiom} by the way he acts.`,
      check: (def) => def.match(/characteristic|typical|nature|manner/i)
    },
    {
      template: (idiom) => `This project is ${idiom} and needs immediate attention.`,
      check: (def) => def.match(/important|critical|urgent|serious/i)
    },

    // General action contexts
    {
      template: (idiom) => `We need to ${idiom} before it's too late.`,
      check: () => true
    },
    {
      template: (idiom) => `He tends to ${idiom} whenever he's under pressure.`,
      check: () => true
    },
    {
      template: (idiom) => `It's important to ${idiom} in situations like this.`,
      check: () => true
    }
  ];

  // Find 2-3 matching contexts
  const matchingContexts = contexts.filter(ctx => ctx.check(definition));
  const selectedContexts = matchingContexts.slice(0, 2);

  // If we don't have enough matching contexts, add generic ones
  if (selectedContexts.length < 2) {
    const genericContexts = contexts.filter(ctx => ctx.check(definition) === true);
    selectedContexts.push(...genericContexts.slice(0, 2 - selectedContexts.length));
  }

  // Generate examples
  for (const context of selectedContexts) {
    examples.push({
      sentence: context.template(idiom),
      usedIdiom: idiom
    });
  }

  // Always add one more generic example
  const genericTemplates = [
    `She decided to ${idiom} despite the consequences.`,
    `I've never seen anyone ${idiom} quite like that before.`,
    `They say it's better to ${idiom} than to do nothing at all.`,
    `Everyone was surprised when he ${idiom} yesterday.`,
    `The best time to ${idiom} is when you're ready.`
  ];

  examples.push({
    sentence: genericTemplates[Math.floor(Math.random() * genericTemplates.length)].replace('${idiom}', idiom),
    usedIdiom: idiom
  });

  return examples.slice(0, 3);
}

/**
 * Process a single idiom file
 */
function processFile(filename) {
  const filePath = path.join(IDIOMS_DIR, filename);
  console.log(`\nProcessing ${filename}...`);

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updatedCount = 0;

  for (const idiom of data) {
    if (idiom.examples && idiom.examples.length === 0) {
      idiom.examples = generateExamples(idiom.idiom, idiom.definition);
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✓ Generated examples for ${updatedCount} idioms`);
  } else {
    console.log(`✓ No idioms with empty examples`);
  }

  return updatedCount;
}

/**
 * Main function
 */
function main() {
  console.log('Generating examples for idioms with empty examples arrays...\n');

  const files = fs.readdirSync(IDIOMS_DIR)
    .filter(f => f.startsWith('idioms-') && f.endsWith('.json'))
    .sort();

  let totalUpdated = 0;

  for (const file of files) {
    totalUpdated += processFile(file);
  }

  console.log(`\n✓ Complete! Generated examples for ${totalUpdated} idioms across ${files.length} files.`);
}

main();
