import { writeFileSync } from "fs";
import { JSDOM } from "jsdom";

// ============================================================================
// Types
// ============================================================================

interface Example {
  sentence: string;
  usedIdiom?: string;
}

interface Idiom {
  id: string;
  idiom: string;
  definition: string;
  wrongDefinitions: string[];
  examples: Example[];
  wrongExamples: string[];
}

interface CategoryMember {
  pageid: number;
  ns: number;
  title: string;
}

interface CategoryResponse {
  query?: {
    categorymembers?: CategoryMember[];
  };
  continue?: {
    cmcontinue?: string;
  };
}

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
  // API endpoints
  MEDIAWIKI_API: "https://en.wiktionary.org/w/api.php",
  REST_API: "https://en.wiktionary.org/api/rest_v1",

  // Rate limiting
  REQUEST_DELAY_MS: 250,

  // Category to fetch
  CATEGORY: "Category:English_idioms",

  // Output file
  OUTPUT_FILE: "idioms-raw.json",

  // Max idioms to fetch (set to Infinity for all)
  MAX_IDIOMS: Infinity,

  // User agent for polite requests
  USER_AGENT: "IdiomFetcherBot/1.0 (Educational project; polite crawling)",
};

// ============================================================================
// Utility Functions
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(index: number): string {
  return `idiom_${String(index + 1).padStart(3, "0")}`;
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\[\d+\]/g, "") // Remove reference markers like [1]
    .replace(/\u00A0/g, " ") // Replace non-breaking spaces
    .trim();
}

/**
 * Find the inflected form of the idiom used in a sentence
 */
function findUsedIdiom(sentence: string, idiom: string): string | undefined {
  const lowerSentence = sentence.toLowerCase();
  const lowerIdiom = idiom.toLowerCase();

  // Direct match
  if (lowerSentence.includes(lowerIdiom)) {
    // Find the actual case-preserved version in the sentence
    const startIdx = lowerSentence.indexOf(lowerIdiom);
    return sentence.substring(startIdx, startIdx + idiom.length);
  }

  // Try common verb inflections for idioms starting with common verbs
  const verbPatterns: Record<string, string[]> = {
    get: ["gets", "got", "getting", "gotten"],
    take: ["takes", "took", "taking", "taken"],
    make: ["makes", "made", "making"],
    give: ["gives", "gave", "giving", "given"],
    break: ["breaks", "broke", "breaking", "broken"],
    keep: ["keeps", "kept", "keeping"],
    let: ["lets", "letting"],
    put: ["puts", "putting"],
    bring: ["brings", "brought", "bringing"],
    cut: ["cuts", "cutting"],
    run: ["runs", "ran", "running"],
    hit: ["hits", "hitting"],
    blow: ["blows", "blew", "blowing", "blown"],
    throw: ["throws", "threw", "throwing", "thrown"],
    pull: ["pulls", "pulled", "pulling"],
    push: ["pushes", "pushed", "pushing"],
    turn: ["turns", "turned", "turning"],
    kick: ["kicks", "kicked", "kicking"],
    beat: ["beats", "beating", "beaten"],
    bite: ["bites", "bit", "biting", "bitten"],
    catch: ["catches", "caught", "catching"],
    hold: ["holds", "held", "holding"],
    have: ["has", "had", "having"],
    be: ["is", "are", "was", "were", "being", "been"],
    go: ["goes", "went", "going", "gone"],
    come: ["comes", "came", "coming"],
    see: ["sees", "saw", "seeing", "seen"],
    play: ["plays", "played", "playing"],
    call: ["calls", "called", "calling"],
    drop: ["drops", "dropped", "dropping"],
    spill: ["spills", "spilled", "spilling", "spilt"],
    burn: ["burns", "burned", "burning", "burnt"],
    pass: ["passes", "passed", "passing"],
    cross: ["crosses", "crossed", "crossing"],
    jump: ["jumps", "jumped", "jumping"],
    miss: ["misses", "missed", "missing"],
    add: ["adds", "added", "adding"],
    lose: ["loses", "lost", "losing"],
    win: ["wins", "won", "winning"],
    pay: ["pays", "paid", "paying"],
    find: ["finds", "found", "finding"],
    leave: ["leaves", "left", "leaving"],
    feel: ["feels", "felt", "feeling"],
    think: ["thinks", "thought", "thinking"],
    speak: ["speaks", "spoke", "speaking", "spoken"],
    talk: ["talks", "talked", "talking"],
    tell: ["tells", "told", "telling"],
    sit: ["sits", "sat", "sitting"],
    stand: ["stands", "stood", "standing"],
    walk: ["walks", "walked", "walking"],
    eat: ["eats", "ate", "eating", "eaten"],
    drink: ["drinks", "drank", "drinking", "drunk"],
    sleep: ["sleeps", "slept", "sleeping"],
    wake: ["wakes", "woke", "waking", "woken"],
    set: ["sets", "setting"],
    read: ["reads", "reading"],
    write: ["writes", "wrote", "writing", "written"],
    draw: ["draws", "drew", "drawing", "drawn"],
    open: ["opens", "opened", "opening"],
    close: ["closes", "closed", "closing"],
    shut: ["shuts", "shutting"],
    stick: ["sticks", "stuck", "sticking"],
    strike: ["strikes", "struck", "striking", "stricken"],
    fall: ["falls", "fell", "falling", "fallen"],
    rise: ["rises", "rose", "rising", "risen"],
    raise: ["raises", "raised", "raising"],
    lay: ["lays", "laid", "laying"],
    lie: ["lies", "lay", "lying", "lain"],
    shoot: ["shoots", "shot", "shooting"],
    fly: ["flies", "flew", "flying", "flown"],
    swim: ["swims", "swam", "swimming", "swum"],
    drive: ["drives", "drove", "driving", "driven"],
    ride: ["rides", "rode", "riding", "ridden"],
    wear: ["wears", "wore", "wearing", "worn"],
    tear: ["tears", "tore", "tearing", "torn"],
    hang: ["hangs", "hung", "hanging", "hanged"],
    ring: ["rings", "rang", "ringing", "rung"],
    sing: ["sings", "sang", "singing", "sung"],
    begin: ["begins", "began", "beginning", "begun"],
    show: ["shows", "showed", "showing", "shown"],
    grow: ["grows", "grew", "growing", "grown"],
    know: ["knows", "knew", "knowing", "known"],
    light: ["lights", "lit", "lighting", "lighted"],
    build: ["builds", "built", "building"],
    send: ["sends", "sent", "sending"],
    spend: ["spends", "spent", "spending"],
    bend: ["bends", "bent", "bending"],
    lend: ["lends", "lent", "lending"],
    mean: ["means", "meant", "meaning"],
    meet: ["meets", "met", "meeting"],
    cost: ["costs", "costing"],
    lead: ["leads", "led", "leading"],
    say: ["says", "said", "saying"],
    sell: ["sells", "sold", "selling"],
    buy: ["buys", "bought", "buying"],
    feed: ["feeds", "fed", "feeding"],
    teach: ["teaches", "taught", "teaching"],
    learn: ["learns", "learned", "learning", "learnt"],
    seek: ["seeks", "sought", "seeking"],
    fight: ["fights", "fought", "fighting"],
    dig: ["digs", "dug", "digging"],
    shake: ["shakes", "shook", "shaking", "shaken"],
    freeze: ["freezes", "froze", "freezing", "frozen"],
    choose: ["chooses", "chose", "choosing", "chosen"],
    steal: ["steals", "stole", "stealing", "stolen"],
    hide: ["hides", "hid", "hiding", "hidden"],
    forgive: ["forgives", "forgave", "forgiving", "forgiven"],
    forget: ["forgets", "forgot", "forgetting", "forgotten"],
    prove: ["proves", "proved", "proving", "proven"],
    move: ["moves", "moved", "moving"],
    live: ["lives", "lived", "living"],
    love: ["loves", "loved", "loving"],
    hate: ["hates", "hated", "hating"],
    want: ["wants", "wanted", "wanting"],
    need: ["needs", "needed", "needing"],
    try: ["tries", "tried", "trying"],
    use: ["uses", "used", "using"],
    work: ["works", "worked", "working"],
    help: ["helps", "helped", "helping"],
    start: ["starts", "started", "starting"],
    stop: ["stops", "stopped", "stopping"],
    change: ["changes", "changed", "changing"],
    look: ["looks", "looked", "looking"],
    wait: ["waits", "waited", "waiting"],
    carry: ["carries", "carried", "carrying"],
    clear: ["clears", "cleared", "clearing"],
    cover: ["covers", "covered", "covering"],
    fill: ["fills", "filled", "filling"],
    kill: ["kills", "killed", "killing"],
    save: ["saves", "saved", "saving"],
    serve: ["serves", "served", "serving"],
    pick: ["picks", "picked", "picking"],
    tie: ["ties", "tied", "tying"],
    clean: ["cleans", "cleaned", "cleaning"],
    cook: ["cooks", "cooked", "cooking"],
    fix: ["fixes", "fixed", "fixing"],
    mix: ["mixes", "mixed", "mixing"],
    test: ["tests", "tested", "testing"],
    check: ["checks", "checked", "checking"],
    touch: ["touches", "touched", "touching"],
    point: ["points", "pointed", "pointing"],
    count: ["counts", "counted", "counting"],
  };

  const idiomWords = lowerIdiom.split(" ");
  const firstWord = idiomWords[0];

  if (verbPatterns[firstWord]) {
    for (const inflection of verbPatterns[firstWord]) {
      const inflectedIdiom = [inflection, ...idiomWords.slice(1)].join(" ");
      if (lowerSentence.includes(inflectedIdiom)) {
        const startIdx = lowerSentence.indexOf(inflectedIdiom);
        return sentence.substring(startIdx, startIdx + inflectedIdiom.length);
      }
    }
  }

  // Check for possessive forms (e.g., "one's" -> "his", "her", "their", etc.)
  if (lowerIdiom.includes("one's")) {
    const possessives = [
      "my",
      "your",
      "his",
      "her",
      "its",
      "our",
      "their",
      "someone's",
      "somebody's",
    ];
    for (const poss of possessives) {
      const variant = lowerIdiom.replace("one's", poss);
      if (lowerSentence.includes(variant)) {
        const startIdx = lowerSentence.indexOf(variant);
        return sentence.substring(startIdx, startIdx + variant.length);
      }
    }
  }

  return undefined;
}

// ============================================================================
// API Functions
// ============================================================================

async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<Response | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": CONFIG.USER_AGENT,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        return response;
      }

      if (response.status === 429) {
        // Rate limited, wait longer
        console.log(`  Rate limited, waiting ${(i + 1) * 1000}ms...`);
        await sleep((i + 1) * 1000);
        continue;
      }

      if (response.status === 404) {
        return null;
      }

      console.log(`  HTTP ${response.status}, retrying...`);
      await sleep(500);
    } catch (error) {
      console.log(`  Network error, retrying (${i + 1}/${retries})...`);
      await sleep(500);
    }
  }
  return null;
}

/**
 * Fetch all page titles from the English idioms category
 */
async function fetchCategoryMembers(): Promise<string[]> {
  const titles: string[] = [];
  let continueToken: string | undefined;

  console.log("Fetching idiom titles from category...");

  do {
    const params = new URLSearchParams({
      action: "query",
      list: "categorymembers",
      cmtitle: CONFIG.CATEGORY,
      cmlimit: "500",
      cmtype: "page",
      format: "json",
    });

    if (continueToken) {
      params.set("cmcontinue", continueToken);
    }

    const url = `${CONFIG.MEDIAWIKI_API}?${params.toString()}`;
    const response = await fetchWithRetry(url);

    if (!response) {
      console.error("Failed to fetch category members");
      break;
    }

    const data: CategoryResponse = await response.json();

    if (data.query?.categorymembers) {
      for (const member of data.query.categorymembers) {
        // Skip namespace pages (categories, templates, etc.)
        if (member.ns === 0) {
          titles.push(member.title);
        }
      }
    }

    continueToken = data.continue?.cmcontinue;
    console.log(`  Fetched ${titles.length} titles so far...`);

    await sleep(CONFIG.REQUEST_DELAY_MS);
  } while (continueToken && titles.length < CONFIG.MAX_IDIOMS);

  return titles.slice(0, CONFIG.MAX_IDIOMS);
}

/**
 * Fetch and parse HTML content for an idiom page
 */
async function fetchIdiomPage(title: string): Promise<string | null> {
  const encodedTitle = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `${CONFIG.REST_API}/page/html/${encodedTitle}`;

  const response = await fetchWithRetry(url);
  if (!response) {
    return null;
  }

  return response.text();
}

// ============================================================================
// Parsing Functions
// ============================================================================

/**
 * Check if a title looks like a valid idiom
 */
function isValidIdiomTitle(title: string): boolean {
  // Skip single words (not idioms)
  if (!title.includes(" ") && !title.includes("-")) {
    return false;
  }

  // Skip titles with certain patterns that indicate non-idiom entries
  const skipPatterns = [
    /^Appendix:/i,
    /^Category:/i,
    /^Template:/i,
    /^Wiktionary:/i,
    /^Index:/i,
    /^Citations:/i,
    /^Reconstruction:/i,
    /^Rhymes:/i,
    /^Thesaurus:/i,
  ];

  return !skipPatterns.some((pattern) => pattern.test(title));
}

/**
 * Parse the HTML content to extract idiom data
 */
function parseIdiomHtml(
  html: string,
  title: string
): { definition: string; examples: Example[] } | null {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Find the English section
  const englishHeader = doc.querySelector('h2[id="English"]');
  if (!englishHeader) {
    // Try alternate selector
    const allH2s = doc.querySelectorAll("h2");
    let foundEnglish = false;
    for (const h2 of allH2s) {
      if (h2.textContent?.includes("English")) {
        foundEnglish = true;
        break;
      }
    }
    if (!foundEnglish) {
      return null;
    }
  }

  // Find definition - look for ordered lists after "Verb", "Phrase", "Idiom", etc. headers
  let definition = "";
  const examples: Example[] = [];

  // Strategy 1: Look for definition lists (dl/dd)
  const definitionLists = doc.querySelectorAll("ol > li");

  for (const li of definitionLists) {
    // Skip if this is in a non-English section
    let parent = li.parentElement;
    let inEnglishSection = true;

    while (parent) {
      const prevH2 = parent.previousElementSibling;
      if (
        prevH2?.tagName === "H2" &&
        !prevH2.textContent?.includes("English")
      ) {
        inEnglishSection = false;
        break;
      }
      parent = parent.parentElement;
    }

    if (!inEnglishSection) continue;

    // Get the text content, excluding nested lists (examples)
    const clone = li.cloneNode(true) as Element;

    // Remove example lists and quotations
    clone.querySelectorAll("ul, dl, .h-quotation").forEach((el) => el.remove());

    const text = cleanText(clone.textContent || "");

    // Skip empty or very short definitions
    if (text.length < 5) continue;

    // Skip if it looks like a grammatical note
    if (
      text.startsWith("(") &&
      text.endsWith(")") &&
      !text.includes(" ") === false
    ) {
      continue;
    }

    // Clean up the definition
    let cleanDef = text
      .replace(/^\([^)]+\)\s*/, "") // Remove leading parenthetical (like "(idiomatic)")
      .replace(/^[,;]\s*/, "") // Remove leading punctuation
      .trim();

    // Capitalize first letter if needed
    if (cleanDef.length > 0) {
      cleanDef = cleanDef.charAt(0).toUpperCase() + cleanDef.slice(1);
    }

    // Add period if missing
    if (cleanDef.length > 0 && !/[.!?]$/.test(cleanDef)) {
      cleanDef += ".";
    }

    if (cleanDef.length > 10) {
      definition = cleanDef;
      break;
    }
  }

  // If no definition found via ol/li, try other methods
  if (!definition) {
    // Try finding glosses
    const glosses = doc.querySelectorAll(".gloss-content, .e-translation");
    for (const gloss of glosses) {
      const text = cleanText(gloss.textContent || "");
      if (text.length > 10) {
        definition =
          text.charAt(0).toUpperCase() +
          text.slice(1) +
          (/[.!?]$/.test(text) ? "" : ".");
        break;
      }
    }
  }

  // Extract examples
  const exampleElements = doc.querySelectorAll(
    ".h-usage-example, .e-example, .h-quotation .e-quotation"
  );

  for (const exEl of exampleElements) {
    let exampleText = cleanText(exEl.textContent || "");

    // Clean up example text
    exampleText = exampleText
      .replace(/^\d{4}[,:]?\s*/, "") // Remove year prefixes
      .replace(/^["'"']|["'"']$/g, "") // Remove surrounding quotes
      .replace(/\s*[—–-]\s*[A-Z][^.]*$/, "") // Remove attribution
      .trim();

    // Skip if too short or doesn't look like a sentence
    if (exampleText.length < 15) continue;

    // Ensure it ends with punctuation
    if (!/[.!?]$/.test(exampleText)) {
      exampleText += ".";
    }

    // Capitalize first letter
    exampleText = exampleText.charAt(0).toUpperCase() + exampleText.slice(1);

    // Check if the idiom (or a variant) is used in the example
    const usedIdiom = findUsedIdiom(exampleText, title);

    const example: Example = {
      sentence: exampleText,
    };

    if (usedIdiom && usedIdiom.toLowerCase() !== title.toLowerCase()) {
      example.usedIdiom = usedIdiom;
    }

    // Avoid duplicates
    if (!examples.some((e) => e.sentence === exampleText)) {
      examples.push(example);
    }

    // Limit to 3 examples
    if (examples.length >= 3) break;
  }

  // If still no examples, try dl/dd pairs
  if (examples.length === 0) {
    const dlElements = doc.querySelectorAll("dl");
    for (const dl of dlElements) {
      const dd = dl.querySelector("dd");
      if (dd) {
        let text = cleanText(dd.textContent || "");
        if (text.length > 20 && text.length < 500) {
          text =
            text.charAt(0).toUpperCase() +
            text.slice(1) +
            (/[.!?]$/.test(text) ? "" : ".");
          const usedIdiom = findUsedIdiom(text, title);

          const example: Example = { sentence: text };
          if (usedIdiom && usedIdiom.toLowerCase() !== title.toLowerCase()) {
            example.usedIdiom = usedIdiom;
          }

          if (!examples.some((e) => e.sentence === text)) {
            examples.push(example);
          }

          if (examples.length >= 3) break;
        }
      }
    }
  }

  if (!definition) {
    return null;
  }

  return { definition, examples };
}

// ============================================================================
// Main Processing
// ============================================================================

async function processIdioms(): Promise<Idiom[]> {
  const idioms: Idiom[] = [];

  // Fetch all idiom titles
  const titles = await fetchCategoryMembers();
  console.log(`\nFound ${titles.length} potential idiom pages\n`);

  // Filter valid idiom titles
  const validTitles = titles.filter(isValidIdiomTitle);
  console.log(`${validTitles.length} titles look like valid idioms\n`);

  let processed = 0;
  let successful = 0;
  let failed = 0;

  for (const title of validTitles) {
    processed++;
    process.stdout.write(
      `\rProcessing ${processed}/${validTitles.length}: ${title.substring(0, 40).padEnd(40)}...`
    );

    try {
      const html = await fetchIdiomPage(title);

      if (!html) {
        failed++;
        continue;
      }

      const parsed = parseIdiomHtml(html, title);

      if (!parsed) {
        failed++;
        continue;
      }

      const idiom: Idiom = {
        id: generateId(successful),
        idiom: title,
        definition: parsed.definition,
        wrongDefinitions: [],
        examples: parsed.examples,
        wrongExamples: [],
      };

      idioms.push(idiom);
      successful++;
    } catch (error) {
      failed++;
      console.error(`\n  Error processing "${title}":`, error);
    }

    // Rate limiting
    await sleep(CONFIG.REQUEST_DELAY_MS);
  }

  console.log(`\n\nProcessing complete!`);
  console.log(`  Successful: ${successful}`);
  console.log(`  Failed/Skipped: ${failed}`);

  return idioms;
}

// ============================================================================
// Entry Point
// ============================================================================

async function main(): Promise<void> {
  console.log("=".repeat(60));
  console.log("Wiktionary Idiom Fetcher");
  console.log("=".repeat(60));
  console.log();

  const startTime = Date.now();

  try {
    const idioms = await processIdioms();

    // Sort by id for consistent ordering
    idioms.sort((a, b) => a.id.localeCompare(b.id));

    // Write to file
    const outputPath = CONFIG.OUTPUT_FILE;
    writeFileSync(outputPath, JSON.stringify(idioms, null, 2), "utf-8");

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\nOutput written to: ${outputPath}`);
    console.log(`Total idioms: ${idioms.length}`);
    console.log(`Time elapsed: ${elapsed}s`);

    // Show a sample
    if (idioms.length > 0) {
      console.log("\n--- Sample idiom ---");
      console.log(JSON.stringify(idioms[0], null, 2));
    }
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
