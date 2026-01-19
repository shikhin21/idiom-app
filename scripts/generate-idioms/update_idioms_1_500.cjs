
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-1-500.json');

const newExamples = {
  "idiom_002": [
    { "sentence": "The Chancellor emerged from 11 Downing Street to present the budget to Parliament." },
    { "sentence": "Reporters were waiting outside 11 Downing Street for a statement on the economy." }
  ],
  "idiom_005": [
    { "sentence": "For him, the broken coffee machine was the 13th reason why he decided to quit that day." },
    { "sentence": "She felt that the constant delays were her 13th reason why she should look for a new provider." }
  ],
  "idiom_012": [
    { "sentence": "She arrived at the party a-bling with diamond jewelry." },
    { "sentence": "The rapper's car was all a-bling, turning heads as he drove by." }
  ],
  "idiom_013": [
    { "sentence": "Modern technology is a boon and a bane; it connects us but also distracts us." },
    { "sentence": "Living in the city center is a boon and a bane—convenient but noisy." }
  ],
  "idiom_022": [
    { "sentence": "The company strives to stay above the curve by investing heavily in R&D." },
    { "sentence": "Her performance was consistently above the curve compared to her peers." }
  ],
  "idiom_025": [
    { "sentence": "In medieval times, sitting above the salt indicated high social status." },
    { "sentence": "The guests above the salt were served the finest wines." }
  ],
  "idiom_029": [
    { "sentence": "The landlord was sued for abuse of distress after selling the tenant's goods illegally." },
    { "sentence": "Legal protections exist to prevent the abuse of distress by creditors." }
  ],
  "idiom_042": [
    { "sentence": "Critics accused him of being an activist judge for overturning the legislation." },
    { "sentence": "The senator argued that an activist judge had overstepped their authority." }
  ],
  "idiom_043": [
    { "sentence": "The ruling was criticized as a piece of activist justice rather than sound legal interpretation." },
    { "sentence": "They feared that activist justice would undermine the constitution." }
  ],
  "idiom_048": [
    { "sentence": "Don't act the hypocrite by telling me to eat healthy while you're eating a burger." },
    { "sentence": "He tends to act the hypocrite when discussing environmental issues." }
  ],
  "idiom_059": [
    { "sentence": "He tried to adorn himself with borrowed plumes by taking credit for his team's work." },
    { "sentence": "She was accused of adorning herself with borrowed plumes when she plagiarized the speech." }
  ],
  "idiom_062": [
    { "sentence": "After the incident, the poor dog was afraid of its own shadow." },
    { "sentence": "You can't go through life afraid of your own shadow; you have to take risks." }
  ],
  "idiom_068": [
    { "sentence": "The doctors worked against the clock to save the patient's life." },
    { "sentence": "We are racing against the clock to finish the project by the deadline." }
  ],
  "idiom_069": [
    { "sentence": "The horses struggled against the collar as they pulled the heavy load uphill." },
    { "sentence": "Doing this work feels like pulling against the collar; it's exhausting." }
  ],
  "idiom_079": [
    { "sentence": "By adopting AI early, the firm stayed ahead of the curve." },
    { "sentence": "She reads constantly to keep her skills ahead of the curve." }
  ],
  "idiom_091": [
    { "sentence": "The failing business became an albatross round his neck." },
    { "sentence": "That bad investment has been an albatross round my neck for years." }
  ],
  "idiom_095": [
    { "sentence": "Use the spice sparingly; a little of something goes a long way." },
    { "sentence": "With this strong perfume, a little of something goes a long way." }
  ],
  "idiom_098": [
    { "sentence": "The plague took them, all and some." },
    { "sentence": "They agreed to the terms, all and some." }
  ],
  "idiom_1007": [
    { "sentence": "The judge is expected to bring down the hammer on repeat offenders." },
    { "sentence": "Management decided to bring down the hammer on tardiness." }
  ],
  "idiom_1019": [
    { "sentence": "The economic sanctions were designed to bring the country to its knees." },
    { "sentence": "The scandal brought the powerful corporation to its knees." }
  ],
  "idiom_1026": [
    { "sentence": "The estate was brought to the hammer to pay off the debts." },
    { "sentence": "Several rare paintings will be brought to the hammer at the auction house." }
  ],
  "idiom_103": [
    { "sentence": "When the winning goal was scored, all bedlam broke loose in the stadium." },
    { "sentence": "If the fire alarm goes off, all bedlam breaks loose." }
  ],
  "idiom_1031": [
    { "sentence": "He painted the entire generation with a broad brush, ignoring individual differences." },
    { "sentence": "You can't apply a broad brush approach to such a complex issue." }
  ],
  "idiom_1033": [
    { "sentence": "He's a broad-brusher who misses the nuances of the policy." },
    { "sentence": "Don't be a broad-brusher; look at the specific details." }
  ],
  "idiom_1036": [
    { "sentence": "He has broad shoulders and can handle the extra responsibility." },
    { "sentence": "You need broad shoulders to deal with that kind of public scrutiny." }
  ],
  "idiom_104": [
    { "sentence": "Now that the CEO has resigned, all bets are off regarding the merger." },
    { "sentence": "If it rains, all bets are off for the outdoor concert." }
  ],
  "idiom_1040": [
    { "sentence": "He came from a broken home but managed to build a successful life." },
    { "sentence": "Support services are available for children from broken homes." }
  ],
  "idiom_1041": [
    { "sentence": "After the bankruptcy, he was a broken man." },
    { "sentence": "He returned from the war a broken man." }
  ],
  "idiom_1052": [
    { "sentence": "The transition from brown power to green energy is essential." },
    { "sentence": "The region still relies heavily on brown power plants." }
  ],
  "idiom_1061": [
    { "sentence": "It started to bucket down just as we left the house." },
    { "sentence": "Take an umbrella; it's going to bucket down later." }
  ],
  "idiom_1066": [
    { "sentence": "The young hunter got a bad case of buck fever and missed the shot." },
    { "sentence": "He shook with buck fever when he saw the prize stag." }
  ],
  "idiom_1067": [
    { "sentence": "He's been bucking for a promotion for months." },
    { "sentence": "She is bucking for a discharge from the service." }
  ],
  "idiom_1071": [
    { "sentence": "You've got Buckley's and none of getting that job." },
    { "sentence": "He has two chances: Buckley's and none." }
  ],
  "idiom_1076": [
    { "sentence": "You need to buck up your ideas if you want to pass this course." },
    { "sentence": "The manager told him to buck up his ideas or face disciplinary action." }
  ],
  "idiom_1090": [
    { "sentence": "Launching the startup felt like building the plane while flying it." },
    { "sentence": "We had to build the plane while flying it due to the urgent deadline." }
  ],
  "idiom_1096": [
    { "sentence": "The clinic offers bulk billing for all pension card holders." },
    { "sentence": "Many doctors are moving away from bulk billing." }
  ],
  "idiom_1107": [
    { "sentence": "The fans tried to bum rush the stage." },
    { "sentence": "Security stopped them before they could bum rush the entrance." }
  ],
  "idiom_1117": [
    { "sentence": "She wore a cozy bunny hug to the bonfire." },
    { "sentence": "He pulled on his bunny hug against the chill." }
  ],
  "idiom_1123": [
    { "sentence": "The burning question is whether they will arrive on time." },
    { "sentence": "I have a burning question about the last chapter." }
  ],
  "idiom_1128": [
    { "sentence": "The gossip about him must be burning his ears." },
    { "sentence": "Her ears burned when she heard what they said about her." }
  ],
  "idiom_113": [
    { "sentence": "I'm sorry I'm late. - It's all good, don't worry." },
    { "sentence": "Is everything all good with the project?" }
  ],
  "idiom_1132": [
    { "sentence": "The band really burned the roof off the place last night." },
    { "sentence": "We're going to burn the roof at the party!" }
  ],
  "idiom_1133": [
    { "sentence": "The rocket has a burn time of two minutes." },
    { "sentence": "We need to calculate the burn time for the maneuver." }
  ],
  "idiom_1137": [
    { "sentence": "She burst out laughing when she heard the joke." },
    { "sentence": "I couldn't help but burst out laughing at his expression." }
  ],
  "idiom_1142": [
    { "sentence": "That was a bush league mistake." },
    { "sentence": "Stop acting like this is bush league; be professional." }
  ],
  "idiom_1146": [
    { "sentence": "In the 1920s, being a business girl was a sign of independence." },
    { "sentence": "She works as a business girl in the city." }
  ],
  "idiom_1149": [
    { "sentence": "He threatened to bust a cap in anyone who crossed him." },
    { "sentence": "You don't want to be around when they start busting caps." }
  ],
  "idiom_1156": [
    { "sentence": "I've been busting my balls all week to get this done." },
    { "sentence": "Don't bust my balls about the dishes; I'll do them later." }
  ],
  "idiom_1164": [
    { "sentence": "He accused the grocer of using a butcher's thumb." },
    { "sentence": "Be careful of the butcher's thumb when buying loose produce." }
  ],
  "idiom_1168": [
    { "sentence": "Prosecuting her for such a minor offense is breaking a butterfly upon a wheel." },
    { "sentence": "Don't break a butterfly upon a wheel by being too harsh on the child." }
  ],
  "idiom_1169": [
    { "sentence": "He's trying to butter his bread on both sides by working for both competitors." },
    { "sentence": "You can't butter your bread on both sides and expect people to trust you." }
  ],
  "idiom_1170": [
    { "sentence": "The con artist knew exactly how to butter the cony before the scam." },
    { "sentence": "He made a living by buttering the cony." }
  ],
  "idiom_1176": [
    { "sentence": "It was a very buttoned-down corporate event." },
    { "sentence": "He prefers a buttoned-down style of management." }
  ],
  "idiom_1186": [
    { "sentence": "The investor's strategy is to buy straw hats in winter." },
    { "sentence": "He made his fortune by buying straw hats in winter and selling when the market peaked." }
  ],
  "idiom_1189": [
    { "sentence": "She invested in a buy to let property in the city center." },
    { "sentence": "The buy to let market has cooled down recently." }
  ],
  "idiom_1193": [
    { "sentence": "We escaped the accident by a hair's breadth." },
    { "sentence": "He missed the world record by a hair's breadth." }
  ],
  "idiom_1199": [
    { "sentence": "The horse won the race by an eyelash." },
    { "sentence": "She missed the train by an eyelash." }
  ],
  "idiom_120": [
    { "sentence": "They kept the dispute all in the family." },
    { "sentence": "It's an all in the family business." }
  ],
  "idiom_1208": [
    { "sentence": "He is by no stretch an expert on the subject." },
    { "sentence": "This is by no stretch the best solution." }
  ],
  "idiom_1209": [
    { "sentence": "It was by no stretch of imagination a luxury hotel." },
    { "sentence": "He is not, by no stretch of imagination, a fast runner." }
  ],
  "idiom_1221": [
    { "sentence": "It was a standard, by-the-numbers police investigation." },
    { "sentence": "The movie was a by-the-numbers romantic comedy." }
  ],
  "idiom_1223": [
    { "sentence": "Tourists arrive by the score during the summer." },
    { "sentence": "Errors appeared in the report by the score." }
  ],
  "idiom_1229": [
    { "sentence": "Life isn't all cake and gingerbread." },
    { "sentence": "They thought the job would be cake and gingerbread, but it was hard work." }
  ],
  "idiom_123": [
    { "sentence": "He talks big, but he's all mouth and no trousers." },
    { "sentence": "Don't worry about his threats; he's all mouth and no trousers." }
  ],
  "idiom_1233": [
    { "sentence": "The White House called a lid at 5 PM." },
    { "sentence": "Let's call a lid on this meeting." }
  ],
  "idiom_1238": [
    { "sentence": "I'm tired, so I'm going to call it an early night." },
    { "sentence": "They decided to call it an early night before the storm hit." }
  ],
  "idiom_1239": [
    { "sentence": "It's late; let's call it a night." },
    { "sentence": "After three hours of practice, the band called it a night." }
  ],
  "idiom_1250": [
    { "sentence": "He received his call to the bar last year." },
    { "sentence": "She is studying for her call to the bar." }
  ],
  "idiom_1256": [
    { "sentence": "We decided to camp out in the backyard." },
    { "sentence": "Fans camped out for tickets." }
  ],
  "idiom_1257": [
    { "sentence": "He camped out on the domain name hoping to sell it later." },
    { "sentence": "Don't just camp out on that machine; others need to use it." }
  ],
  "idiom_1260": [
    { "sentence": "If you touch my car, I'll cancel your Christmas." },
    { "sentence": "The boss looked like he was ready to cancel someone's Christmas." }
  ],
  "idiom_1266": [
    { "sentence": "She loves to sing, but she can't carry a tune in a bucket." },
    { "sentence": "I can't carry a tune in a bucket, so I just lip-sync." }
  ],
  "idiom_1274": [
    { "sentence": "He threw his cap over the windmill and quit his job to travel." },
    { "sentence": "It was a cap over the windmill moment for the normally cautious man." }
  ],
  "idiom_1275": [
    { "sentence": "The selection of the new minister was a captain's pick." },
    { "sentence": "The coach's captain's pick surprised everyone." }
  ],
  "idiom_1283": [
    { "sentence": "The shop caters exclusively to the carriage trade." },
    { "sentence": "They lost the carriage trade when they lowered their prices." }
  ],
  "idiom_1289": [
    { "sentence": "We will carry forward the balance to the next month." },
    { "sentence": "Please carry forward this enthusiasm to the next project." }
  ],
  "idiom_1304": [
    { "sentence": "The burglars cased the joint for a week before breaking in." },
    { "sentence": "He looked like he was casing the joint." }
  ],
  "idiom_131": [
    { "sentence": "With a 3-0 lead, it's all over bar the shouting." },
    { "sentence": "The election is all over bar the shouting." }
  ],
  "idiom_1316": [
    { "sentence": "They cast loose the ropes and set sail." },
    { "sentence": "He decided to cast loose from his old life." }
  ],
  "idiom_1318": [
    { "sentence": "He helped the stranger, casting his bread upon the waters." },
    { "sentence": "Cast your bread upon the waters, and it will return to you." }
  ],
  "idiom_1319": [
    { "sentence": "Cast your mind back to the summer of 2010." },
    { "sentence": "I tried to cast my mind back to where I left the keys." }
  ],
  "idiom_132": [
    { "sentence": "The game is all over but the shouting." },
    { "sentence": "It's all over but the shouting for the losing team." }
  ],
  "idiom_1321": [
    { "sentence": "Don't forget to cast your vote on Tuesday." },
    { "sentence": "She cast her vote for the incumbent." }
  ],
  "idiom_1324": [
    { "sentence": "She cast snowballs at his attempts to be friendly." },
    { "sentence": "Don't cast snowballs when someone is trying to help." }
  ],
  "idiom_1332": [
    { "sentence": "I just can't seem to catch a break lately." },
    { "sentence": "He finally caught a break and got the job." }
  ],
  "idiom_1335": [
    { "sentence": "She was trying to catch a date for the evening." },
    { "sentence": "It's dangerous to walk here trying to catch a date." }
  ],
  "idiom_1338": [
    { "sentence": "The skateboarder caught huge air on the half-pipe." },
    { "sentence": "The car caught air as it went over the hill." }
  ],
  "idiom_1343": [
    { "sentence": "He wants to catch big air off that ramp." },
    { "sentence": "They watched the bikers catch big air." }
  ],
  "idiom_1344": [
    { "sentence": "My treadmill is just catching dust in the corner." },
    { "sentence": "Those books are just catching dust on the shelf." }
  ],
  "idiom_1365": [
    { "sentence": "He cat-footed down the hallway to avoid waking anyone." },
    { "sentence": "She cat-footed around the sensitive topic." }
  ],
  "idiom_1368": [
    { "sentence": "There's a cat in the meal-tub; I can feel it." },
    { "sentence": "He suspected a cat in the meal-tub when the deal looked too good." }
  ],
  "idiom_1369": [
    { "sentence": "Buying a used car without checking it is like buying a cat in the sack." },
    { "sentence": "Don't buy a cat in the sack." }
  ],
  "idiom_1370": [
    { "sentence": "He gave his face a cat-lick and ran out the door." },
    { "sentence": "Just a cat-lick will do for now." }
  ],
  "idiom_1378": [
    { "sentence": "The company was caught with its pants down by the sudden market shift." },
    { "sentence": "Don't get caught with your pants down; prepare in advance." }
  ],
  "idiom_1381": [
    { "sentence": "His sophisticated jokes were caviar to the general." },
    { "sentence": "The play was caviar to the general and closed after a week." }
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
