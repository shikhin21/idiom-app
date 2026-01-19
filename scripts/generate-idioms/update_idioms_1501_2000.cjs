
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-1501-2000.json');

const newExamples = {
  "idiom_2338": [
    { "sentence": "His excuse was enough to make a cat laugh." },
    { "sentence": "That outfit is enough to make a cat laugh." }
  ],
  "idiom_2344": [
    { "sentence": "The firefighters created an escape fire to survive the blaze." },
    { "sentence": "Knowing how to make an escape fire can save your life." }
  ],
  "idiom_2351": [
    { "sentence": "He thinks he's Evel Knievel on that motorcycle." },
    { "sentence": "Don't try to be Evel Knievel; just drive safely." }
  ],
  "idiom_2356": [
    { "sentence": "The prisoners were forced to walk the everlasting staircase." },
    { "sentence": "It felt like an everlasting staircase of endless work." }
  ],
  "idiom_2358": [
    { "sentence": "Everybody and his brother was at the concert." },
    { "sentence": "It seems like everybody and his brother is buying that new phone." }
  ],
  "idiom_2364": [
    { "sentence": "She cleaned every old nook and cranny of the house." },
    { "sentence": "They searched every old nook and cranny for the lost ring." }
  ],
  "idiom_2365": [
    { "sentence": "We packed everything and the kitchen sink for the trip." },
    { "sentence": "He threw everything and the kitchen sink at the problem." }
  ],
  "idiom_237": [
    { "sentence": "He went around Robin Hood's barn to get to the point." },
    { "sentence": "Why go around Robin Hood's barn when you can take the direct route?" }
  ],
  "idiom_2371": [
    { "sentence": "The papers were scattered every which where." },
    { "sentence": "People came from every which where to see the show." }
  ],
  "idiom_2375": [
    { "sentence": "We are hoping to exchange contracts next week." },
    { "sentence": "Once we exchange contracts, the deal is legally binding." }
  ],
  "idiom_2377": [
    { "sentence": "The exchange of contracts took place yesterday." },
    { "sentence": "Delays in the exchange of contracts caused a lot of stress." }
  ],
  "idiom_2378": [
    { "sentence": "The victim was killed execution-style." },
    { "sentence": "Police are investigating the execution-style murder." }
  ],
  "idiom_2380": [
    { "sentence": "He's an expensive drunk because he only drinks top-shelf scotch." },
    { "sentence": "Being an expensive drunk can drain your wallet quickly." }
  ],
  "idiom_2388": [
    { "sentence": "The poster was eye-catchingly designed." },
    { "sentence": "She dressed eye-catchingly for the awards ceremony." }
  ],
  "idiom_2391": [
    { "sentence": "We are currently in the eye of the storm, but the wind will pick up again soon." },
    { "sentence": "He found himself in the eye of the storm during the political scandal." }
  ],
  "idiom_2399": [
    { "sentence": "The party is run by faceless men in back rooms." },
    { "sentence": "He warned against the influence of faceless men." }
  ],
  "idiom_240": [
    { "sentence": "The captain shouted orders around the Horn." },
    { "sentence": "Communication around the Horn was difficult in the storm." }
  ],
  "idiom_2406": [
    { "sentence": "In mathematics, understanding the factor space is crucial." },
    { "sentence": "The concept of factor space is used in topology." }
  ],
  "idiom_2409": [
    { "sentence": "He feels like he failed at life because he doesn't have a career." },
    { "sentence": "Don't let one setback make you think you failed at life." }
  ],
  "idiom_241": [
    { "sentence": "We arrived at the station just in time." },
    { "sentence": "They arrived at a decision after hours of debate." }
  ],
  "idiom_2411": [
    { "sentence": "Assume we have a fair coin for this probability problem." },
    { "sentence": "The outcome depends on the toss of a fair coin." }
  ],
  "idiom_2421": [
    { "sentence": "The unexpected bonus turned out to be fairy money; inflation ate it all up." },
    { "sentence": "Don't count on that inheritance; it might be fairy money." }
  ],
  "idiom_2440": [
    { "sentence": "I nearly fell off my chair when I heard the news." },
    { "sentence": "The price was so low I almost fell off my chair." }
  ],
  "idiom_2441": [
    { "sentence": "The bird fell off its perch." },
    { "sentence": "Be careful not to fall off your perch while painting the ceiling." }
  ],
  "idiom_2442": [
    { "sentence": "I got this TV cheap; it fell off the back of a lorry." },
    { "sentence": "Don't ask where it came from; let's just say it fell off the back of a lorry." }
  ],
  "idiom_2451": [
    { "sentence": "He fell out of the ugly tree and hit every branch on the way down." },
    { "sentence": "That dog is so ugly it looks like it fell out of the ugly tree and hit every branch." }
  ],
  "idiom_2453": [
    { "sentence": "Success is about resilience: fall seven times, stand up eight." },
    { "sentence": "Whenever I fail, I remind myself: fall seven times, stand up eight." }
  ],
  "idiom_246": [
    { "sentence": "Everything went arsy varsy when the manager quit." },
    { "sentence": "The room was turned arsy varsy by the children." }
  ],
  "idiom_2469": [
    { "sentence": "He has a serious farmer's tan from working in the fields." },
    { "sentence": "She laughed at his farmer's tan at the beach." }
  ],
  "idiom_2488": [
    { "sentence": "She performs as a faux queen in the drag show." },
    { "sentence": "The competition is open to drag kings and faux queens." }
  ],
  "idiom_2489": [
    { "sentence": "It's feast or famine for freelance writers." },
    { "sentence": "Our sales are either feast or famine." }
  ],
  "idiom_2498": [
    { "sentence": "Moving the factory is just feeding the dragon." },
    { "sentence": "Critics argue that our trade policy is feeding the dragon." }
  ],
  "idiom_2500": [
    { "sentence": "I have to run out and feed the meter." },
    { "sentence": "He forgot to feed the meter and got a ticket." }
  ],
  "idiom_2505": [
    { "sentence": "We had to feel our way through the dark tunnel." },
    { "sentence": "He is still feeling his way in the new job." }
  ],
  "idiom_2510": [
    { "sentence": "He holds the property in fee simple absolute in possession." },
    { "sentence": "Fee simple absolute in possession is the most complete ownership." }
  ],
  "idiom_2514": [
    { "sentence": "Don't forget the fencepost problem when calculating the intervals." },
    { "sentence": "Off-by-one errors are often due to the fencepost problem." }
  ],
  "idiom_2519": [
    { "sentence": "We fetched a compass around the island to avoid the reefs." },
    { "sentence": "And from thence we fetched a compass, and came to Rhegium." }
  ],
  "idiom_2527": [
    { "sentence": "The government fiddled while Rome burned during the crisis." },
    { "sentence": "Don't fiddle while Rome burns; do something!" }
  ],
  "idiom_253": [
    { "sentence": "He's as clever as a cartload of monkeys." },
    { "sentence": "Watch out for her; she's as clever as a cartload of monkeys." }
  ],
  "idiom_2539": [
    { "sentence": "He fights shy of commitment." },
    { "sentence": "Investors are fighting shy of the volatile market." }
  ],
  "idiom_2553": [
    { "sentence": "The director demanded final cut privilege." },
    { "sentence": "The studio took away the director's final cut." }
  ],
  "idiom_2569": [
    { "sentence": "Who is your fine-feathered friend?" },
    { "sentence": "She arrived with a fine-feathered friend." }
  ],
  "idiom_2570": [
    { "sentence": "He thinks fine feathers make fine birds, but character matters more." },
    { "sentence": "Don't be fooled by his suit; fine feathers make fine birds." }
  ],
  "idiom_2590": [
    { "sentence": "Welcome to the first annual charity gala." },
    { "sentence": "They are hosting their first annual barbecue." }
  ],
  "idiom_2592": [
    { "sentence": "Second place is just the first loser." },
    { "sentence": "He hates coming in second, calling it first loser." }
  ],
  "idiom_2595": [
    { "sentence": "The company suffered a first-mover disadvantage as competitors learned from their mistakes." },
    { "sentence": "Sometimes it's better to wait and avoid the first-mover disadvantage." }
  ],
  "idiom_2597": [
    { "sentence": "First off, I want to thank everyone for coming." },
    { "sentence": "First off, let's set some ground rules." }
  ],
  "idiom_260": [
    { "sentence": "He walked in as if someone owns the place." },
    { "sentence": "She orders people around as if she owns the place." }
  ],
  "idiom_2601": [
    { "sentence": "First up, we have the local news." },
    { "sentence": "First up on the agenda is the budget." }
  ],
  "idiom_2602": [
    { "sentence": "He is a fish-blooded killer." },
    { "sentence": "Her fish-blooded reaction to the tragedy was disturbing." }
  ],
  "idiom_2609": [
    { "sentence": "The dealer was caught with a bag of fish scale." },
    { "sentence": "Fish scale is known for its purity and shine." }
  ],
  "idiom_2610": [
    { "sentence": "I can't help you now; I have other fish to fry." },
    { "sentence": "He left the meeting early because he had bigger fish to fry." }
  ],
  "idiom_2615": [
    { "sentence": "We need a candidate who fits the bill perfectly." },
    { "sentence": "This software fits the bill for our needs." }
  ],
  "idiom_2623": [
    { "sentence": "His temper flamed up when he heard the insult." },
    { "sentence": "The old injury flamed up again." }
  ],
  "idiom_2624": [
    { "sentence": "Kipling referred to them as flannelled fools." },
    { "sentence": "The field was full of flannelled fools on Saturday." }
  ],
  "idiom_2626": [
    { "sentence": "I flashed back to my childhood home." },
    { "sentence": "The song made him flash back to his high school prom." }
  ],
  "idiom_2627": [
    { "sentence": "Be careful of the flash for cash scam at intersections." },
    { "sentence": "Insurance companies warn about flash for cash fraudsters." }
  ],
  "idiom_2628": [
    { "sentence": "He likes to go to the club and flash the cash." },
    { "sentence": "Don't flash the cash in this neighborhood." }
  ],
  "idiom_2630": [
    { "sentence": "After the illness, he was flat on his back for weeks." },
    { "sentence": "The lawsuit left the company flat on its back." }
  ],
  "idiom_2633": [
    { "sentence": "The road flattens out after the hill." },
    { "sentence": "We need to flatten out this map." }
  ],
  "idiom_2644": [
    { "sentence": "Trying to convince him is flogging a dead horse." },
    { "sentence": "Stop flogging a dead horse; the decision is made." }
  ],
  "idiom_2646": [
    { "sentence": "The slang term refers to the act of flogging the dolphin." }
  ],
  "idiom_2649": [
    { "sentence": "He floored it to pass the truck." },
    { "sentence": "When the light turned green, she floored it." }
  ],
  "idiom_265": [
    { "sentence": "As I was saying before I was interrupted, we need to cut costs." },
    { "sentence": "As I was saying, the plan is simple." }
  ],
  "idiom_2656": [
    { "sentence": "Without data, we are flying blind." },
    { "sentence": "The pilot had to fly blind through the fog." }
  ],
  "idiom_2664": [
    { "sentence": "Hey, you're flying low." },
    { "sentence": "He didn't realize he was flying low until he got home." }
  ],
  "idiom_2665": [
    { "sentence": "He flew off as soon as he saw the police." },
    { "sentence": "The bird flew off when I approached." }
  ],
  "idiom_2666": [
    { "sentence": "He has a tendency to fly off at a tangent during meetings." },
    { "sentence": "Let's stick to the point and not fly off at a tangent." }
  ],
  "idiom_2668": [
    { "sentence": "The new toy is flying off the shelves." },
    { "sentence": "Tickets flew off the shelves within minutes." }
  ],
  "idiom_2694": [
    { "sentence": "He fooled away his inheritance on gambling." },
    { "sentence": "Don't fool away your time on video games." }
  ],
  "idiom_2695": [
    { "sentence": "Trading your car for that bike was a fool's bargain." },
    { "sentence": "He realized too late that he had made a fool's bargain." }
  ],
  "idiom_2705": [
    { "sentence": "His mistakes were there for all the world to see." },
    { "sentence": "She displayed her award for all the world to see." }
  ],
  "idiom_2709": [
    { "sentence": "Stop trying to force your opinions down my throat." },
    { "sentence": "The media forces these celebrities down our throats." }
  ],
  "idiom_2712": [
    { "sentence": "For chrissake, hurry up!" },
    { "sentence": "Just tell me the truth, for chrissake." }
  ],
  "idiom_2723": [
    { "sentence": "Forget you! I'm done with this." },
    { "sentence": "He said 'forget you' and walked away." }
  ],
  "idiom_2735": [
    { "sentence": "The road forks off to the left." },
    { "sentence": "The river forks off into two streams." }
  ],
  "idiom_2746": [
    { "sentence": "I mean it, for real and for true." },
    { "sentence": "Is that story for real and for true?" }
  ],
  "idiom_2747": [
    { "sentence": "He quit his job for reasons." },
    { "sentence": "I'm not going, for reasons." }
  ],
  "idiom_2754": [
    { "sentence": "That comeback was one for the book." },
    { "sentence": "It was a storm for the book." }
  ],
  "idiom_2758": [
    { "sentence": "For the love of Mike, stop that noise!" },
    { "sentence": "For the love of Pete, just answer the question." }
  ],
  "idiom_2759": [
    { "sentence": "I can't remember his name for the love of me." },
    { "sentence": "For the love of me, I don't know how to fix this." }
  ],
  "idiom_2763": [
    { "sentence": "She said she did it for the plot." },
    { "sentence": "Make a bad decision? Do it for the plot." }
  ],
  "idiom_2765": [
    { "sentence": "Just forgive him for this once." },
    { "sentence": "For this once, I will let it slide." }
  ],
  "idiom_2772": [
    { "sentence": "The project was cancelled for XYZ reasons." },
    { "sentence": "He was fired for XYZ reasons." }
  ],
  "idiom_2778": [
    { "sentence": "The four-minute warning would give people little time to hide." },
    { "sentence": "We lived in fear of the four-minute warning." }
  ],
  "idiom_2784": [
    { "sentence": "The HMS Leopard was a fourth-rate ship." },
    { "sentence": "Fourth-rate ships were often used for convoy protection." }
  ],
  "idiom_2787": [
    { "sentence": "The guard was in a fox sleep, watching through slit eyes." },
    { "sentence": "She pretended to be in a fox sleep to hear their conversation." }
  ],
  "idiom_2791": [
    { "sentence": "There's no such thing as a free lunch." },
    { "sentence": "He's always looking for a free lunch." }
  ],
  "idiom_2794": [
    { "sentence": "It's freezing cold outside." },
    { "sentence": "The water was freezing cold." }
  ],
  "idiom_2802": [
    { "sentence": "Don't fret the gizzard about things you can't control." },
    { "sentence": "She fretted her gizzard over the exam results." }
  ],
  "idiom_2804": [
    { "sentence": "They have a friendship with benefits." },
    { "sentence": "He's looking for a friendship with benefits, nothing serious." }
  ],
  "idiom_2806": [
    { "sentence": "He has friends in low places who can help." },
    { "sentence": "It helps to have friends in low places sometimes." }
  ],
  "idiom_2808": [
    { "sentence": "Frig it, I'm going home." },
    { "sentence": "If it doesn't work, just frig it." }
  ],
  "idiom_281": [
    { "sentence": "He was charged with assault and battery." },
    { "sentence": "The fight resulted in charges of assault and battery." }
  ],
  "idiom_2811": [
    { "sentence": "He knows the subject from A to izzard." },
    { "sentence": "She explained the process from A to izzard." }
  ]
};

try {
  const content = fs.readFileSync(filePath, 'utf8');
  let idioms = JSON.parse(content);
  let updatedCount = 0;

  idioms = idioms.map(idiom => {
    if (newExamples[idiom.id]) {
      if (!idiom.examples || idiom.examples.length === 0) {
         idiom.examples = newExamples[idiom.id];
         updatedCount++;
      }
    }
    return idiom;
  });

  fs.writeFileSync(filePath, JSON.stringify(idioms, null, 2));
  console.log(`Updated ${updatedCount} idioms in ${filePath}`);

} catch (error) {
  console.error("Error updating file:", error);
}
