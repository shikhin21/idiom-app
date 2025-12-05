import fs from 'fs';

function detectIdiomType(idiom, definition, examples) {
  // Check if it's a verb phrase (starts with verb)
  const verbStarters = ['break', 'kick', 'pull', 'push', 'throw', 'hold', 'catch', 'cut', 'bite', 'beat',
    'hit', 'run', 'walk', 'jump', 'fall', 'rise', 'turn', 'bend', 'roll', 'spin', 'take', 'make', 'give',
    'get', 'put', 'go', 'come', 'see', 'know', 'think', 'look', 'want', 'use', 'find', 'tell', 'ask',
    'work', 'call', 'try', 'feel', 'leave', 'keep', 'let', 'begin', 'seem', 'help', 'show', 'hear',
    'play', 'move', 'pay', 'meet', 'bring', 'happen', 'sit', 'stand', 'lose', 'add', 'buy', 'speak',
    'open', 'close', 'read', 'write', 'draw', 'paint', 'sing', 'dance'];

  const firstWord = idiom.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
  const isVerbPhrase = verbStarters.includes(firstWord);

  // Check definition for clues
  const defLower = definition.toLowerCase();
  const startsWithTo = defLower.startsWith('to ');
  const hasVerbalMarkers = /\b(to|doing|action|activity)\b/.test(defLower);

  return {
    isVerb: isVerbPhrase || startsWithTo,
    isNoun: !isVerbPhrase && !startsWithTo,
    isAdjective: /^(very|extremely|highly|somewhat)/.test(defLower)
  };
}

function generateLiteralDefinition(idiom, idiomType) {
  const actionVerbs = {
    'break': 'shatter', 'kick': 'strike with foot', 'pull': 'drag', 'push': 'shove',
    'throw': 'toss', 'hold': 'grasp', 'catch': 'capture', 'cut': 'slice',
    'bite': 'chew', 'beat': 'hit repeatedly', 'hit': 'strike', 'run': 'sprint',
    'walk': 'stroll', 'jump': 'leap', 'fall': 'drop', 'rise': 'ascend',
    'turn': 'rotate', 'bend': 'curve', 'roll': 'revolve', 'spin': 'whirl',
    'take': 'grab', 'make': 'create', 'give': 'hand over', 'get': 'obtain'
  };

  const words = idiom.toLowerCase().split(' ');
  const firstWord = words[0].replace(/[^a-z]/g, '');

  if (idiomType.isVerb && actionVerbs[firstWord]) {
    // Create literal verb phrase
    const remaining = words.slice(1).join(' ');
    return `to ${actionVerbs[firstWord]} ${remaining}`.trim();
  }

  if (idiomType.isNoun) {
    // For noun phrases, describe literally
    return `a literal ${idiom.toLowerCase()}`;
  }

  // Default fallback
  return `exactly what "${idiom}" sounds like`;
}

function generatePlausibleWrongDefinitions(idiom, correctDefinition) {
  const wrong = [];

  // Strategy 1: Create vague/generic versions
  const genericPhrases = [
    'to cause problems',
    'to make things better',
    'to create confusion',
    'to achieve success',
    'to face challenges',
    'to avoid responsibility',
    'to take charge',
    'to lose control',
    'to gain advantage',
    'to show weakness',
    'something done carelessly',
    'an unnecessary action',
    'a harmful practice',
    'a beneficial outcome',
    'a common mistake'
  ];

  // Strategy 2: Create action-based wrong meanings
  const actionPhrases = [
    'to attempt unsuccessfully',
    'to prepare for something',
    'to finish something completely',
    'to begin something reluctantly',
    'to continue despite difficulty',
    'to delay an action',
    'to hurry through something',
    'to repeat an error',
    'to ignore a warning',
    'to celebrate prematurely'
  ];

  // Strategy 3: Create state/quality wrong meanings
  const statePhrases = [
    'being overly cautious',
    'being too confident',
    'lacking preparation',
    'having excessive pride',
    'showing poor judgment',
    'demonstrating skill',
    'experiencing confusion',
    'feeling overwhelmed',
    'remaining uncertain',
    'appearing foolish'
  ];

  // Pick 2 different types
  wrong.push(genericPhrases[Math.floor(Math.random() * genericPhrases.length)]);

  if (Math.random() > 0.5) {
    wrong.push(actionPhrases[Math.floor(Math.random() * actionPhrases.length)]);
  } else {
    wrong.push(statePhrases[Math.floor(Math.random() * statePhrases.length)]);
  }

  return wrong;
}

function generateFormErrors(idiom, examples) {
  const errors = [];
  const words = idiom.split(' ');

  // Error type 1: Remove articles
  const withoutArticles = idiom.replace(/\b(a|an|the)\b/gi, '').replace(/\s+/g, ' ').trim();
  if (withoutArticles !== idiom && withoutArticles.length > 0) {
    errors.push(withoutArticles);
  }

  // Error type 2: Wrong tense (if verb present)
  const verbs = {
    'break': 'broke',
    'throw': 'threw',
    'catch': 'caught',
    'hold': 'held',
    'take': 'took',
    'make': 'made',
    'give': 'gave',
    'get': 'got',
    'put': 'putting',
    'run': 'ran',
    'fall': 'fell',
    'rise': 'rose',
    'bite': 'bit',
    'beat': 'beat',
    'cut': 'cutting'
  };

  const firstWord = words[0].toLowerCase();
  if (verbs[firstWord]) {
    const tensedVersion = idiom.replace(new RegExp(`^${firstWord}`, 'i'), verbs[firstWord]);
    errors.push(tensedVersion);
  }

  // Error type 3: Wrong preposition
  const prepositions = ['in', 'on', 'at', 'to', 'from', 'with', 'by', 'of'];
  for (let i = 0; i < words.length; i++) {
    if (prepositions.includes(words[i].toLowerCase())) {
      const wrongPrep = prepositions[Math.floor(Math.random() * prepositions.length)];
      if (wrongPrep !== words[i].toLowerCase()) {
        const modified = [...words];
        modified[i] = wrongPrep;
        errors.push(modified.join(' '));
        break;
      }
    }
  }

  // Error type 4: Partial idiom (missing end)
  if (words.length > 3) {
    errors.push(words.slice(0, -1).join(' '));
  }

  return errors;
}

function generateContextualMisuse(idiom, correctExamples, idiomType) {
  const misuses = [];

  if (idiomType.isVerb) {
    // Verb phrase misuse templates (more variety to ensure uniqueness)
    const verbTemplates = [
      `He tried to ${idiom.toLowerCase()} but failed miserably.`,
      `The instructions said to ${idiom.toLowerCase()} first thing in the morning.`,
      `You should never ${idiom.toLowerCase()} in public.`,
      `She learned to ${idiom.toLowerCase()} at school.`,
      `The manual shows how to ${idiom.toLowerCase()} properly.`,
      `They forgot to ${idiom.toLowerCase()} before leaving.`,
      `I always ${idiom.toLowerCase()} on Mondays.`,
      `Can you teach me to ${idiom.toLowerCase()}?`,
      `Everyone should ${idiom.toLowerCase()} at least once.`,
      `It takes practice to ${idiom.toLowerCase()} correctly.`
    ];

    // Shuffle and take enough to ensure uniqueness
    const shuffled = verbTemplates.sort(() => Math.random() - 0.5);
    misuses.push(...shuffled.slice(0, 5));
  } else if (idiomType.isNoun) {
    // Noun phrase misuse templates (more variety)
    const nounTemplates = [
      `He bought a ${idiom.toLowerCase()} at the store.`,
      `The ${idiom.toLowerCase()} was on sale yesterday.`,
      `She collected several ${idiom.toLowerCase()}s for her hobby.`,
      `That ${idiom.toLowerCase()} looks brand new.`,
      `I've never seen a ${idiom.toLowerCase()} like that before.`,
      `My friend owns three ${idiom.toLowerCase()}s.`,
      `Where can I find a good ${idiom.toLowerCase()}?`,
      `The price of ${idiom.toLowerCase()}s has gone up.`,
      `She lost her ${idiom.toLowerCase()} last week.`,
      `This ${idiom.toLowerCase()} is made of plastic.`
    ];

    const shuffled = nounTemplates.sort(() => Math.random() - 0.5);
    misuses.push(...shuffled.slice(0, 5));
  } else {
    // Adjective/other misuse templates (more variety)
    const genericTemplates = [
      `The situation was very ${idiom.toLowerCase()}.`,
      `That sounds quite ${idiom.toLowerCase()} to me.`,
      `Her approach was ${idiom.toLowerCase()}.`,
      `It's getting more ${idiom.toLowerCase()} every day.`,
      `The results were surprisingly ${idiom.toLowerCase()}.`,
      `He seemed rather ${idiom.toLowerCase()} yesterday.`,
      `This is the most ${idiom.toLowerCase()} thing I've seen.`,
      `She looked ${idiom.toLowerCase()} after the meeting.`,
      `Everything feels ${idiom.toLowerCase()} now.`,
      `That was extremely ${idiom.toLowerCase()}.`
    ];

    const shuffled = genericTemplates.sort(() => Math.random() - 0.5);
    misuses.push(...shuffled.slice(0, 5));
  }

  // Ensure uniqueness
  return [...new Set(misuses)].slice(0, 5);
}

function processIdiomFile(filename) {
  console.log(`Processing ${filename}...`);

  const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
  let processedCount = 0;

  for (const idiom of data) {
    // Detect idiom type
    const idiomType = detectIdiomType(idiom.idiom, idiom.definition, idiom.examples);

    // Generate wrong definitions
    const wrongDefinitions = [];

    // Add literal interpretation
    wrongDefinitions.push(generateLiteralDefinition(idiom.idiom, idiomType));

    // Add plausible fabrications
    wrongDefinitions.push(...generatePlausibleWrongDefinitions(idiom.idiom, idiom.definition));

    // Ensure we have at least 3 unique wrong definitions
    const uniqueWrongDefs = [...new Set(wrongDefinitions)];
    while (uniqueWrongDefs.length < 3) {
      uniqueWrongDefs.push(`incorrect meaning of "${idiom.idiom}"`);
    }

    idiom.wrongDefinitions = uniqueWrongDefs.slice(0, 5);

    // Generate wrong examples
    const wrongExamples = [];

    // Add form errors (mainly for verb phrases)
    if (idiomType.isVerb) {
      wrongExamples.push(...generateFormErrors(idiom.idiom, idiom.examples));
    }

    // Add contextual misuse
    wrongExamples.push(...generateContextualMisuse(idiom.idiom, idiom.examples, idiomType));

    // Ensure we have at least 3 unique wrong examples
    const uniqueWrongExamples = [...new Set(wrongExamples)].filter(ex => ex && ex.length > 0);

    // Add generic fallbacks if needed (shouldn't happen with improved generation)
    const genericFallbacks = [
      `They used "${idiom.idiom}" in the wrong situation.`,
      `She didn't understand what "${idiom.idiom}" meant.`,
      `The phrase "${idiom.idiom}" was misapplied here.`,
      `He confused "${idiom.idiom}" with something else.`
    ];

    let fallbackIndex = 0;
    while (uniqueWrongExamples.length < 3 && fallbackIndex < genericFallbacks.length) {
      uniqueWrongExamples.push(genericFallbacks[fallbackIndex]);
      fallbackIndex++;
    }

    idiom.wrongExamples = uniqueWrongExamples.slice(0, 5);

    processedCount++;
  }

  // Write back to file
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`✓ Processed ${processedCount} idioms in ${filename}`);
}

// Process all idiom files or a specific file from command line
const args = process.argv.slice(2);

if (args.length > 0) {
  // Process specific file provided as argument
  const filename = args[0];
  if (fs.existsSync(filename)) {
    processIdiomFile(filename);
  } else {
    console.error(`File ${filename} not found`);
  }
} else {
  // Process all idiom files
  const idiomDir = 'idioms';
  const files = fs.readdirSync(idiomDir)
    .filter(f => f.startsWith('idioms-') && f.endsWith('.json'))
    .sort();

  console.log(`Found ${files.length} idiom files to process\n`);

  for (const file of files) {
    processIdiomFile(`${idiomDir}/${file}`);
  }

  console.log(`\n✓ All ${files.length} files processed successfully`);
}
