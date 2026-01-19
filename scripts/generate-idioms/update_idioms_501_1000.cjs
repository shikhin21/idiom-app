
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-501-1000.json');

const newExamples = {
  "idiom_1399": [
    { "sentence": "We need a change of tack if we want to reach the younger audience." },
    { "sentence": "After the initial failure, a complete change of tack was necessary." }
  ],
  "idiom_1400": [
    { "sentence": "The general decided to change his battery and attack from the flank." },
    { "sentence": "If this strategy doesn't work, we'll have to change our battery." }
  ],
  "idiom_1403": [
    { "sentence": "The factory will change over to the new production line next month." },
    { "sentence": "It took a while to change over from the old software." }
  ],
  "idiom_1410": [
    { "sentence": "I try to avoid eye contact with the charity muggers on the high street." },
    { "sentence": "He was stopped by a charity mugger asking for a monthly donation." }
  ],
  "idiom_1414": [
    { "sentence": "He could charm the birds from the trees with his smooth talk." },
    { "sentence": "She has a smile that could charm the birds from the trees." }
  ],
  "idiom_1422": [
    { "sentence": "He lost everything chasing the dragon." },
    { "sentence": "The documentary explored the lives of those chasing the dragon." }
  ],
  "idiom_1426": [
    { "sentence": "Don't buy just one; they are cheaper by the dozen." },
    { "sentence": "We bought the eggs because they were cheaper by the dozen." }
  ],
  "idiom_1432": [
    { "sentence": "You'd better check the math on that invoice." },
    { "sentence": "I checked the math three times, and it still doesn't add up." }
  ],
  "idiom_1433": [
    { "sentence": "Security checked us through quickly." },
    { "sentence": "They checked the cargo through without inspection." }
  ],
  "idiom_1435": [
    { "sentence": "Come here, you cheeky monkey!" },
    { "sentence": "That cheeky monkey hid my keys again." }
  ],
  "idiom_145": [
    { "sentence": "He promised to help, but he's all talk and no cider." },
    { "sentence": "The politician was all talk and no cider." }
  ],
  "idiom_1457": [
    { "sentence": "His threat to quit was just China's final warning; he's still here." },
    { "sentence": "Don't worry about it; it's another China's final warning." }
  ],
  "idiom_1459": [
    { "sentence": "She gave me a Chinese compliment about my 'brave' fashion choice." },
    { "sentence": "It sounded nice, but I suspect it was a Chinese compliment." }
  ],
  "idiom_1461": [
    { "sentence": "The new contract forces us into Chinese overtime." },
    { "sentence": "He's earning less per hour due to Chinese overtime rules." }
  ],
  "idiom_1465": [
    { "sentence": "The scandal revealed a chink in the armor of the popular candidate." },
    { "sentence": "We found a chink in their armor and exploited it." }
  ],
  "idiom_1466": [
    { "sentence": "We need to chink up these cracks before winter." },
    { "sentence": "They chinked up the log cabin with mud." }
  ],
  "idiom_1474": [
    { "sentence": "That umbrella is as useful as a chocolate teapot in this hurricane." },
    { "sentence": "Buying him a book he's already read is like a chocolate teapot." }
  ],
  "idiom_148": [
    { "sentence": "He showed up with professional clubs but played like a beginner—all the gear and no idea." },
    { "sentence": "Don't be all the gear and no idea; learn the basics first." }
  ],
  "idiom_1484": [
    { "sentence": "He realized college wasn't for him and became a Christmas graduate." },
    { "sentence": "The university is worried about the number of Christmas graduates." }
  ],
  "idiom_1485": [
    { "sentence": "The budget became a Christmas tree bill with something for everyone." },
    { "sentence": "Senators hung so many amendments on it that it turned into a Christmas tree bill." }
  ],
  "idiom_1494": [
    { "sentence": "The company circled the wagons to defend against the hostile takeover." },
    { "sentence": "When the scandal broke, the family circled the wagons." }
  ],
  "idiom_1505": [
    { "sentence": "After the cleaning, the room was as clean as a whistle." },
    { "sentence": "His record is clean as a whistle." }
  ],
  "idiom_1518": [
    { "sentence": "Please help me clear the table after dinner." },
    { "sentence": "The waiter cleared the table efficiently." }
  ],
  "idiom_1530": [
    { "sentence": "It's not perfect, but it's close enough for government work." },
    { "sentence": "I measured it by eye—close enough for government work." }
  ],
  "idiom_1537": [
    { "sentence": "Fishing is prohibited during the close season." },
    { "sentence": "They do maintenance on the stadium during the close season." }
  ],
  "idiom_1539": [
    { "sentence": "We need to close the books on this fiscal year." },
    { "sentence": "Let's close the books on this unfortunate incident." }
  ],
  "idiom_154": [
    { "sentence": "You went all the way to Egery and back just to get milk?" },
    { "sentence": "He took us all the way to Egery and back to avoid the traffic." }
  ],
  "idiom_1540": [
    { "sentence": "He closed the face of the bat to guide the ball." },
    { "sentence": "Closing the face too early resulted in a hook." }
  ],
  "idiom_1543": [
    { "sentence": "I cast a clothespin vote because both candidates were terrible." },
    { "sentence": "It was a clothespin vote for many disillusioned voters." }
  ],
  "idiom_1546": [
    { "sentence": "She was on cloud seven after winning the lottery." },
    { "sentence": "He's been floating on cloud seven since the engagement." }
  ],
  "idiom_1560": [
    { "sentence": "The snake coiled up ready to strike." },
    { "sentence": "Please coil up the garden hose." }
  ],
  "idiom_1563": [
    { "sentence": "The story gave me cold chills." },
    { "sentence": "He felt cold chills running down his spine." }
  ],
  "idiom_1569": [
    { "sentence": "He is a cold-livered killer." },
    { "sentence": "Her cold-livered response shocked everyone." }
  ],
  "idiom_1573": [
    { "sentence": "She gave him the cold treatment after the argument." },
    { "sentence": "I didn't expect the cold treatment from my old friend." }
  ],
  "idiom_1587": [
    { "sentence": "The team came back from the dead to win the match." },
    { "sentence": "His career came back from the dead with that hit movie." }
  ],
  "idiom_1590": [
    { "sentence": "It was coming down in stair rods, so we stayed inside." },
    { "sentence": "The rain came down in stair rods, flooding the street." }
  ],
  "idiom_1598": [
    { "sentence": "Where did you get that license? Did it come from a Cracker Jack box?" },
    { "sentence": "This cheap watch looks like it came from a Cracker Jack box." }
  ],
  "idiom_160": [
    { "sentence": "The business went all to smash after the fire." },
    { "sentence": "His plans have gone all to smash." }
  ],
  "idiom_1600": [
    { "sentence": "Fashion often comes full circle." },
    { "sentence": "The story comes full circle at the end." }
  ],
  "idiom_1618": [
    { "sentence": "She used to be shy, but she's really come out of her shell." },
    { "sentence": "University helped him come out of his shell." }
  ],
  "idiom_1636": [
    { "sentence": "We had a come to Jesus meeting about his performance." },
    { "sentence": "He needs a come to Jesus moment to get his life on track." }
  ],
  "idiom_1647": [
    { "sentence": "The dictator came to power in a military coup." },
    { "sentence": "The party came to power promising reform." }
  ],
  "idiom_1660": [
    { "sentence": "We searched everywhere but came up with snake eyes." },
    { "sentence": "Every idea we tried came up with snake eyes." }
  ],
  "idiom_1669": [
    { "sentence": "She celebrated her baby's coming into the world." },
    { "sentence": "His coming into the world was a joyous occasion." }
  ],
  "idiom_1670": [
    { "sentence": "Two coffees, coming right up!" },
    { "sentence": "Your order is coming right up." }
  ],
  "idiom_1674": [
    { "sentence": "It's just a common or garden variety cold." },
    { "sentence": "Nothing special, just a common or garden variety spider." }
  ],
  "idiom_1675": [
    { "sentence": "They lived in a commune and shared a common purse." },
    { "sentence": "Expenses were paid from the common purse." }
  ],
  "idiom_1685": [
    { "sentence": "Can you help me connect up the printer?" },
    { "sentence": "We need to connect up the new system with the old one." }
  ],
  "idiom_1699": [
    { "sentence": "You need to cop yourself on and start acting like an adult." },
    { "sentence": "Cop yourself on! That's a dangerous thing to do." }
  ],
  "idiom_1705": [
    { "sentence": "I'll just have a glass of corporation pop, please." },
    { "sentence": "Nothing beats a cold glass of corporation pop." }
  ],
  "idiom_1714": [
    { "sentence": "He loves karaoke but couldn't carry a note in a bucket." },
    { "sentence": "Don't ask her to sing; she couldn't carry a note in a bucket." }
  ],
  "idiom_1731": [
    { "sentence": "He went into the bushes to cover his feet." },
    { "sentence": "Saul went in to cover his feet." }
  ],
  "idiom_1734": [
    { "sentence": "He smoked a pack of cowboy killers a day." },
    { "sentence": "Can I bum a cowboy killer?" }
  ],
  "idiom_1741": [
    { "sentence": "He cracked a fat watching the show." },
    { "sentence": "The teenage boy was embarrassed to crack a fat in class." }
  ],
  "idiom_1746": [
    { "sentence": "Wait until the ice is thick enough so you don't crack through." },
    { "sentence": "The sun finally cracked through the clouds." }
  ],
  "idiom_1752": [
    { "sentence": "The slang term refers to the act of cranking one's hog." }
  ],
  "idiom_1759": [
    { "sentence": "You have to crawl before you walk; learn the basics first." },
    { "sentence": "Don't rush into advanced calculus; crawl before you walk." }
  ],
  "idiom_1760": [
    { "sentence": "I was so embarrassed I just wanted to crawl into a hole." },
    { "sentence": "He made a mistake and wanted to crawl into a hole and die." }
  ],
  "idiom_1770": [
    { "sentence": "I'm a creature of habit; I have the same breakfast every day." },
    { "sentence": "Cats are creatures of habit." }
  ],
  "idiom_1771": [
    { "sentence": "The agency is a creature of statute and has only the powers granted by law." },
    { "sentence": "As a creature of statute, the corporation must follow regulations." }
  ],
  "idiom_1778": [
    { "sentence": "I promise I won't tell anyone, cross my heart." },
    { "sentence": "Cross my heart, I didn't eat the last cookie." }
  ],
  "idiom_1779": [
    { "sentence": "I swear it's the truth, cross my heart and hope to die." },
    { "sentence": "She made him promise, cross my heart and hope to die." }
  ],
  "idiom_1781": [
    { "sentence": "He argued that the new tax policy was a cross of gold for the working class." },
    { "sentence": "Do not crucify mankind upon a cross of gold." }
  ],
  "idiom_1792": [
    { "sentence": "He's not the type to cross the Thames for a cause." },
    { "sentence": "They wouldn't cross the Thames to help." }
  ],
  "idiom_1793": [
    { "sentence": "After years of study, he decided to cross the Tiber and become Catholic." },
    { "sentence": "Several Anglican priests crossed the Tiber." }
  ],
  "idiom_1795": [
    { "sentence": "It's a heavy cross to take up, but someone has to do it." },
    { "sentence": "Caregiving can be a difficult cross to take up." }
  ],
  "idiom_1800": [
    { "sentence": "You really crushed it during that presentation!" },
    { "sentence": "Go out there and crush it!" }
  ],
  "idiom_1805": [
    { "sentence": "The opposition party cried foul over the election results." },
    { "sentence": "Don't cry foul just because you lost." }
  ],
  "idiom_1808": [
    { "sentence": "She cried herself to sleep after the breakup." },
    { "sentence": "The child cried himself to sleep missing his mother." }
  ],
  "idiom_1816": [
    { "sentence": "Cue up the next track." },
    { "sentence": "He cued up for the shot." }
  ],
  "idiom_1822": [
    { "sentence": "Police are cracking down on curb crawlers in the area." },
    { "sentence": "He was arrested for being a curb crawler." }
  ],
  "idiom_183": [
    { "sentence": "Get out of here, and I don't mean maybe!" },
    { "sentence": "I'm going to finish this today, and I don't mean maybe." }
  ],
  "idiom_1830": [
    { "sentence": "He cut a dash in his new suit." },
    { "sentence": "She really cuts a dash on the dance floor." }
  ],
  "idiom_1835": [
    { "sentence": "The hurricane cut a swath of destruction through the island." },
    { "sentence": "He cut a swath through the crowd to get to the bar." }
  ],
  "idiom_1836": [
    { "sentence": "To deny one's heritage is to cut away one's soul." },
    { "sentence": "Working there felt like it was cutting away my soul." }
  ],
  "idiom_1843": [
    { "sentence": "In that culture, they tend to cut down the tall poppy." },
    { "sentence": "Don't show off too much, or they'll cut down the tall poppy." }
  ],
  "idiom_1851": [
    { "sentence": "Who cut one loose? It smells terrible in here." },
    { "sentence": "He laughed so hard he cut one loose." }
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
