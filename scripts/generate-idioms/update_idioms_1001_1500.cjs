
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-1001-1500.json');

const newExamples = {
  "idiom_187": [
    { "sentence": "They sell candles, incense, and such at the local market." },
    { "sentence": "We discussed politics, economics, and such during the meeting." }
  ],
  "idiom_1884": [
    { "sentence": "He knew he was dancing with the devil by borrowing money from the loan shark." },
    { "sentence": "Driving at those speeds on icy roads is just dancing with the devil." }
  ],
  "idiom_1885": [
    { "sentence": "Truly, a Daniel come to judgment! He solved the dispute fairly." },
    { "sentence": "We need a Daniel come to judgment to sort out this legal mess." }
  ],
  "idiom_1887": [
    { "sentence": "He hasn't darkened a church door in twenty years." },
    { "sentence": "She promised her mother she would darken a church door on Easter." }
  ],
  "idiom_1891": [
    { "sentence": "The dragonflies dart about over the pond." },
    { "sentence": "She watched the children dart about the playground." }
  ],
  "idiom_1893": [
    { "sentence": "The rejection letter dashed his hopes of attending the university." },
    { "sentence": "The sudden rain dashed our hopes for a picnic." }
  ],
  "idiom_1895": [
    { "sentence": "Every daughter of Eve has faced similar challenges." },
    { "sentence": "She is a true daughter of Eve, full of curiosity." }
  ],
  "idiom_1903": [
    { "sentence": "We have to be in the fields by day-clean." },
    { "sentence": "He rose at day-clean to start his chores." }
  ],
  "idiom_1906": [
    { "sentence": "I'm a day lark, so I'm usually in bed by 9 PM." },
    { "sentence": "The gym is full of day larks at 5 AM." }
  ],
  "idiom_1909": [
    { "sentence": "You can call me day or night if you need help." },
    { "sentence": "The convenience store is open day or night." }
  ],
  "idiom_1911": [
    { "sentence": "In days of yore, knights roamed the land." },
    { "sentence": "This castle stands as a monument to days of yore." }
  ],
  "idiom_1913": [
    { "sentence": "That argument is dead and buried; let's move on." },
    { "sentence": "The old proposal is dead and buried now." }
  ],
  "idiom_1914": [
    { "sentence": "After the marathon, he was dead asleep for twelve hours." },
    { "sentence": "Don't wake him; he's dead asleep." }
  ],
  "idiom_192": [
    { "sentence": "I'll play angel's advocate and suggest that this plan might actually work well." },
    { "sentence": "Instead of criticizing, try being the angel's advocate for once." }
  ],
  "idiom_1925": [
    { "sentence": "The investment turned out to be a dead loss." },
    { "sentence": "The whole trip was a dead loss due to the weather." }
  ],
  "idiom_1928": [
    { "sentence": "That feud is dead 'n' buried." },
    { "sentence": "Forget about it, it's dead 'n' buried." }
  ],
  "idiom_193": [
    { "sentence": "The prisoner had to angle for farthings to survive." },
    { "sentence": "It was a pitiful sight to see them angling for farthings from the tower." }
  ],
  "idiom_1935": [
    { "sentence": "The pilot performed a miraculous deadstick landing on the highway." },
    { "sentence": "Engine failure forced a deadstick landing in a field." }
  ],
  "idiom_1941": [
    { "sentence": "The dealer dealt a hand to each player." },
    { "sentence": "Life has dealt him a tough hand." }
  ],
  "idiom_1944": [
    { "sentence": "The project suffered death by a thousand paper cuts due to constant minor changes." },
    { "sentence": "It wasn't one big failure, but death by a thousand paper cuts." }
  ],
  "idiom_1946": [
    { "sentence": "You look like death warmed up; go home and rest." },
    { "sentence": "He came into work looking like death warmed up." }
  ],
  "idiom_1947": [
    { "sentence": "The investigators combed the debris field for clues." },
    { "sentence": "The explosion left a large debris field." }
  ],
  "idiom_1949": [
    { "sentence": "A decimal dozen of roses." },
    { "sentence": "He ordered a decimal dozen." }
  ],
  "idiom_1959": [
    { "sentence": "The software is designed to degrade gracefully under heavy load." },
    { "sentence": "Even if the server fails, the app should degrade gracefully." }
  ],
  "idiom_1960": [
    { "sentence": "I got a bad case of Delhi belly during my trip." },
    { "sentence": "Avoid tap water to prevent Delhi belly." }
  ],
  "idiom_1961": [
    { "sentence": "She delights in painting landscapes." },
    { "sentence": "He delights in teasing his younger brother." }
  ],
  "idiom_1966": [
    { "sentence": "He seems to suffer from Derangement Syndrome whenever that politician is mentioned." },
    { "sentence": "The debate quickly devolved into Derangement Syndrome." }
  ],
  "idiom_197": [
    { "sentence": "Learning French gave him another string to his bow." },
    { "sentence": "It's always good to have another string to one's bow in this job market." }
  ],
  "idiom_1970": [
    { "sentence": "He seemed charming, but he was a devil in disguise." },
    { "sentence": "That seemingly easy loan was a devil in disguise." }
  ],
  "idiom_1973": [
    { "sentence": "He had the devil's luck to survive the crash." },
    { "sentence": "With a bit of devil's luck, we might make it on time." }
  ],
  "idiom_1976": [
    { "sentence": "The discussion is dialing towards a compromise." },
    { "sentence": "Public opinion seems to be dialing towards stricter laws." }
  ],
  "idiom_1980": [
    { "sentence": "The memo was sent out 'dictated but not read'." },
    { "sentence": "He was in such a rush the letter went out dictated but not read." }
  ],
  "idiom_1988": [
    { "sentence": "He dug a hole for himself by lying to his boss." },
    { "sentence": "Stop digging a hole for yourself and just admit the mistake." }
  ],
  "idiom_1992": [
    { "sentence": "She dug herself in a hole with that comment." },
    { "sentence": "Every time he speaks, he digs himself in a hole." }
  ],
  "idiom_1993": [
    { "sentence": "The toddler dug his heels in and refused to leave the park." },
    { "sentence": "The union dug its heels in during the negotiations." }
  ],
  "idiom_2006": [
    { "sentence": "He dipped out of the party early." },
    { "sentence": "She dipped out before the bill arrived." }
  ],
  "idiom_2007": [
    { "sentence": "The journalist claimed to have a dirt file on the celebrity." },
    { "sentence": "They keep a dirt file on all their political opponents." }
  ],
  "idiom_2019": [
    { "sentence": "When the police arrived, the suspect did a bunk." },
    { "sentence": "He did a bunk with the company funds." }
  ],
  "idiom_202": [
    { "sentence": "This job offer is the answer to my prayers." },
    { "sentence": "The rain was the answer to the farmers' prayers." }
  ],
  "idiom_2024": [
    { "sentence": "The kids were doing cartwheels on the lawn." },
    { "sentence": "She was so happy she felt like doing cartwheels." }
  ],
  "idiom_2025": [
    { "sentence": "He won't take his own advice; doctors make the worst patients." },
    { "sentence": "Trying to treat a surgeon is hard; doctors make the worst patients." }
  ],
  "idiom_2027": [
    { "sentence": "Don't let them do you down; you're talented." },
    { "sentence": "He always tries to do down his colleagues." }
  ],
  "idiom_2030": [
    { "sentence": "Is he happy about the raise? Does the Pope wear a funny hat?" },
    { "sentence": "Will I be there? Does the Pope wear a funny hat?" }
  ],
  "idiom_2032": [
    { "sentence": "They work well as a dog and cat team." },
    { "sentence": "The detectives were a classic dog and cat pair." }
  ],
  "idiom_2034": [
    { "sentence": "He dogged around his mentor to learn the trade." },
    { "sentence": "She's been dogging around the manager for a promotion." }
  ],
  "idiom_2042": [
    { "sentence": "Now that he's won the election, he's like the dog who caught the tire." },
    { "sentence": "I got the job, but now I feel like the dog who caught the tire." }
  ],
  "idiom_2049": [
    { "sentence": "You want me to do what? Do me a lemon!" },
    { "sentence": "Do me a lemon, I'm not paying that much." }
  ],
  "idiom_2055": [
    { "sentence": "Don't call me sir, I work for a living, sergeant." },
    { "sentence": "He corrected the recruit: 'Don't call me sir, I work for a living!'" }
  ],
  "idiom_2057": [
    { "sentence": "Good luck in there, and don't drop the soap." },
    { "sentence": "The comedian made a crude joke about not dropping the soap." }
  ],
  "idiom_2063": [
    { "sentence": "You're fired! And don't let the door hit you on the way out." },
    { "sentence": "I'm leaving, and I won't let the door hit me on the way out." }
  ],
  "idiom_2065": [
    { "sentence": "I broke a glass. - Don't sweat it, it was cheap." },
    { "sentence": "Don't sweat it; we have plenty of time." }
  ],
  "idiom_2084": [
    { "sentence": "He really did her wrong by cheating on her." },
    { "sentence": "I feel like I did him wrong by accusing him." }
  ],
  "idiom_2089": [
    { "sentence": "We need to do the dash before the cops come." },
    { "sentence": "He did the dash as soon as the bell rang." }
  ],
  "idiom_2092": [
    { "sentence": "Will you do the honors and carve the turkey?" },
    { "sentence": "He did the honors of pouring the champagne." }
  ],
  "idiom_2096": [
    { "sentence": "It's not enough to post online; you have to do the work." },
    { "sentence": "She is committed to doing the work for racial justice." }
  ],
  "idiom_2104": [
    { "sentence": "That dress is a real double taker." },
    { "sentence": "The similarity was a double taker." }
  ],
  "idiom_2107": [
    { "sentence": "He is a dough-faced politician who changes his views for votes." },
    { "sentence": "I can't stand his dough-faced flattery." }
  ],
  "idiom_2111": [
    { "sentence": "She has done well for herself in the city." },
    { "sentence": "He moved abroad and did well for himself." }
  ],
  "idiom_2115": [
    { "sentence": "He gave money to a down-and-outer on the street." },
    { "sentence": "The shelter helps down-and-outers get back on their feet." }
  ],
  "idiom_212": [
    { "sentence": "I explained it twice, but he wasn't any the wiser." },
    { "sentence": "Are you any the wiser about what happened?" }
  ],
  "idiom_2123": [
    { "sentence": "After losing his job, he was down on his uppers." },
    { "sentence": "They were down on their uppers but still hopeful." }
  ],
  "idiom_2124": [
    { "sentence": "The whole plan went down the cludgie." },
    { "sentence": "That's money down the cludgie." }
  ],
  "idiom_214": [
    { "sentence": "She was dismissed as an ape leader by the village gossips." },
    { "sentence": "In the play, the character is a bitter ape leader." }
  ],
  "idiom_2140": [
    { "sentence": "The ad campaign tries too hard to be down with the kids." },
    { "sentence": "He thinks he's down with the kids because he uses slang." }
  ],
  "idiom_2146": [
    { "sentence": "He's such a drama king about everything." },
    { "sentence": "Don't be a drama king; it's just a scratch." }
  ],
  "idiom_2150": [
    { "sentence": "To say he's a genius is drawing a long bow." },
    { "sentence": "You're drawing a long bow with that comparison." }
  ],
  "idiom_2157": [
    { "sentence": "The umpires drew stumps due to bad light." },
    { "sentence": "It's getting late; let's draw stumps on this meeting." }
  ],
  "idiom_2165": [
    { "sentence": "She arrived at the gala dressed to kill." },
    { "sentence": "He was dressed to kill for his date." }
  ],
  "idiom_2166": [
    { "sentence": "She worries about becoming a dried-fish woman." },
    { "sentence": "The drama portrays the life of a so-called dried-fish woman." }
  ],
  "idiom_217": [
    { "sentence": "I appeal from Philip drunk to Philip sober; please reconsider in the morning." },
    { "sentence": "It was a case of appealing from Philip drunk to Philip sober." }
  ],
  "idiom_2171": [
    { "sentence": "This pub is my favorite drinking hole." },
    { "sentence": "They met at their local drinking hole." }
  ],
  "idiom_2172": [
    { "sentence": "He sat in the corner, drinking with the flies." },
    { "sentence": "I'd rather go out than stay home drinking with the flies." }
  ],
  "idiom_2177": [
    { "sentence": "The drive-by media moved on to the next scandal." },
    { "sentence": "Don't believe everything you hear from the drive-by media." }
  ],
  "idiom_2185": [
    { "sentence": "High demand drove up the prices." },
    { "sentence": "Speculation drove up the stock value." }
  ],
  "idiom_2187": [
    { "sentence": "I think I've dropped a bollock with these calculations." },
    { "sentence": "He dropped a huge bollock by forgetting the tickets." }
  ],
  "idiom_2192": [
    { "sentence": "She dropped a hint about what she wanted for her birthday." },
    { "sentence": "He kept dropping hints, but I didn't catch on." }
  ],
  "idiom_2193": [
    { "sentence": "He's in the bathroom dropping a log." },
    { "sentence": "I need to go drop a log." }
  ],
  "idiom_2208": [
    { "sentence": "Let's drop the topic before we start arguing." },
    { "sentence": "He refused to drop the topic of politics." }
  ],
  "idiom_2210": [
    { "sentence": "He dropped trow for the doctor." },
    { "sentence": "The prankster dropped trow in public." }
  ],
  "idiom_2213": [
    { "sentence": "Coffee is my drug of choice." },
    { "sentence": "Heroin was his drug of choice." }
  ],
  "idiom_2215": [
    { "sentence": "My parents drummed into me the importance of honesty." },
    { "sentence": "The rules were drummed into the recruits." }
  ],
  "idiom_2224": [
    { "sentence": "We ducked down behind the wall." },
    { "sentence": "He ducked down to avoid the flying ball." }
  ],
  "idiom_2225": [
    { "sentence": "He's been ducked off at his cabin for weeks." },
    { "sentence": "The suspect is ducked off somewhere in the city." }
  ],
  "idiom_2226": [
    { "sentence": "Let's duck off to the cinema." },
    { "sentence": "He ducked off before the work started." }
  ],
  "idiom_2229": [
    { "sentence": "Fixing this car is duck soup." },
    { "sentence": "Compared to the last exam, this one was duck soup." }
  ],
  "idiom_2238": [
    { "sentence": "The flood response showed the true Dunkirk spirit." },
    { "sentence": "We need a bit of Dunkirk spirit to get through this crisis." }
  ],
  "idiom_2240": [
    { "sentence": "There are dust mice under the bed." },
    { "sentence": "She swept up the dust mice." }
  ],
  "idiom_2248": [
    { "sentence": "He is a dyed-in-the-wool conservative." },
    { "sentence": "She is a dyed-in-the-wool fan of the team." }
  ],
  "idiom_2251": [
    { "sentence": "The batter hit a dying quail to shallow center." },
    { "sentence": "It wasn't a hard hit, just a dying quail." }
  ],
  "idiom_2255": [
    { "sentence": "He eagled out right before his 18th birthday." },
    { "sentence": "Many scouts aim to eagle out." }
  ],
  "idiom_2256": [
    { "sentence": "He worked hard to eagle up." },
    { "sentence": "She eagled up last year." }
  ],
  "idiom_2261": [
    { "sentence": "Suddenly, there was an ear-piercing scream." },
    { "sentence": "The alarm made an ear-piercing noise." }
  ],
  "idiom_2264": [
    { "sentence": "He wears large ear tunnels." },
    { "sentence": "She bought a new pair of wooden ear tunnels." }
  ],
  "idiom_2267": [
    { "sentence": "The con artist saw him as an easy mark." },
    { "sentence": "Tourists are often easy marks for pickpockets." }
  ],
  "idiom_2271": [
    { "sentence": "The unguarded warehouse was easy pickings for thieves." },
    { "sentence": "They thought the weak team would be easy pickings." }
  ],
  "idiom_2274": [
    { "sentence": "Don't panic; just eat the elephant one bite at a time." },
    { "sentence": "Writing a book is hard, but you eat the elephant one bite at a time." }
  ],
  "idiom_2278": [
    { "sentence": "He had to eat dirt and apologize." },
    { "sentence": "I made him eat dirt for his insults." }
  ],
  "idiom_2279": [
    { "sentence": "She's eating for two now." },
    { "sentence": "You don't really need to eat for two in the first trimester." }
  ],
  "idiom_228": [
    { "sentence": "The character was portrayed as an arch doxy of the underworld." },
    { "sentence": "She ruled the gang like an arch doxy." }
  ],
  "idiom_2281": [
    { "sentence": "I made a mistake, and now I have to eat it." },
    { "sentence": "He told me to eat it when I complained." }
  ],
  "idiom_2283": [
    { "sentence": "You can't eat your cake and have it too." },
    { "sentence": "He wants to keep his freedom and be married—eat his cake and have it too." }
  ],
  "idiom_2285": [
    { "sentence": "The depressed officer ate his gun." },
    { "sentence": "It's a tragedy when someone feels driven to eat their gun." }
  ],
  "idiom_229": [
    { "sentence": "I called you three times! Are you deaf?" },
    { "sentence": "Turn down the music! Are you deaf?" }
  ],
  "idiom_2291": [
    { "sentence": "Cutting research funding is eating our seed corn." },
    { "sentence": "We shouldn't eat our seed corn for short-term profits." }
  ],
  "idiom_2304": [
    { "sentence": "He lives out on the edge of the earth." },
    { "sentence": "It felt like we sailed to the edge of the earth." }
  ],
  "idiom_2305": [
    { "sentence": "This place is at the edge of the world." },
    { "sentence": "They traveled to the edge of the world to find it." }
  ],
  "idiom_2313": [
    { "sentence": "Information travels fast on the electronic superhighway." },
    { "sentence": "He was an early pioneer of the electronic superhighway." }
  ],
  "idiom_2325": [
    { "sentence": "Using a supercomputer for simple addition is employing a steam engine to crack a nut." },
    { "sentence": "Don't employ a steam engine to crack a nut; use a simple hammer." }
  ],
  "idiom_2329": [
    { "sentence": "His apology was just empty words." },
    { "sentence": "I'm tired of your empty words; show me action." }
  ],
  "idiom_2330": [
    { "sentence": "All his plans ended in smoke." },
    { "sentence": "The investment ended in smoke." }
  ],
  "idiom_2331": [
    { "sentence": "The party ended in tears when the fight started." },
    { "sentence": "It will all end in tears if you're not careful." }
  ],
  "idiom_2335": [
    { "sentence": "He's like the Energizer bunny; he never stops." },
    { "sentence": "She kept going like the Energizer bunny." }
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
