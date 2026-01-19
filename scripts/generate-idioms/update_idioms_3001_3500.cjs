
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-3001-3500.json');

const newExamples = {
  "idiom_3803": [
    { "sentence": "The peasant woman was heavy with child." },
    { "sentence": "She walked slowly, being heavy with child." }
  ],
  "idiom_3805": [
    { "sentence": "The prank turned into a heffalump trap for him." },
    { "sentence": "He fell right into his own heffalump trap." }
  ],
  "idiom_3816": [
    { "sentence": "She took off her bike helmet and tried to fix her helmet hair." },
    { "sentence": "Sorry about the helmet hair; I rode my scooter here." }
  ],
  "idiom_3817": [
    { "sentence": "He's always willing to help a lame dog over a stile." },
    { "sentence": "It was just a small act of helping a lame dog over a stile." }
  ],
  "idiom_3821": [
    { "sentence": "The festival adds some herbs and spices to the town's culture." },
    { "sentence": "We need more herbs and spices in this boring presentation." }
  ],
  "idiom_383": [
    { "sentence": "He's just an average joe trying to make a living." },
    { "sentence": "The policy appeals to the average joe." }
  ],
  "idiom_384": [
    { "sentence": "We need to average up the costs for the report." },
    { "sentence": "The investor averaged up by buying more shares." }
  ],
  "idiom_3844": [
    { "sentence": "She is very high on the totem pole in that company." },
    { "sentence": "He wants to be high on the totem pole one day." }
  ],
  "idiom_3851": [
    { "sentence": "The garden is beautiful in high summer." },
    { "sentence": "It was high summer and the heat was intense." }
  ],
  "idiom_3854": [
    { "sentence": "The politician claimed he was hiking the Appalachian Trail." },
    { "sentence": "The phrase 'hiking the Appalachian Trail' became a euphemism." }
  ],
  "idiom_3861": [
    { "sentence": "The small company is hitting above its weight." },
    { "sentence": "He hits above his weight in intellectual debates." }
  ],
  "idiom_3866": [
    { "sentence": "The team is hitting below its weight this season." },
    { "sentence": "With that budget, the film hit below its weight." }
  ],
  "idiom_3871": [
    { "sentence": "They really hit it up at the party." },
    { "sentence": "I hope we hit it up when we meet." }
  ],
  "idiom_388": [
    { "sentence": "As they say, a week is a long time in politics." },
    { "sentence": "The polls changed drastically; a week is a long time in politics." }
  ],
  "idiom_389": [
    { "sentence": "He's just like his father; a wild goose never laid a tame egg." },
    { "sentence": "Don't expect him to be different; a wild goose never laid a tame egg." }
  ],
  "idiom_3895": [
    { "sentence": "Their marriage hit the rocks after a year." },
    { "sentence": "The negotiations hit the rocks." }
  ],
  "idiom_3898": [
    { "sentence": "The new book hits the shelves next week." },
    { "sentence": "When does the product hit the shelves?" }
  ],
  "idiom_3899": [
    { "sentence": "Shoppers lined up before the game hit the shops." },
    { "sentence": "The fashion line hits the shops in spring." }
  ],
  "idiom_3902": [
    { "sentence": "The toy will hit the stores before Christmas." },
    { "sentence": "Fans waited for the album to hit the stores." }
  ],
  "idiom_3903": [
    { "sentence": "The police hit the streets to find the suspect." },
    { "sentence": "Salespeople hit the streets to promote the new offer." }
  ],
  "idiom_3908": [
    { "sentence": "He acts like he was hit with the stupid stick." },
    { "sentence": "Did you get hit with the stupid stick today?" }
  ],
  "idiom_3933": [
    { "sentence": "Tell him to hold his jaw." },
    { "sentence": "He held his jaw to avoid an argument." }
  ],
  "idiom_3935": [
    { "sentence": "If you hold your mouth right, you might catch a fish." },
    { "sentence": "It takes skill and holding your mouth right." }
  ],
  "idiom_396": [
    { "sentence": "The typo in the memo was the baby elephant in the room." },
    { "sentence": "Nobody mentioned the baby elephant in the room." }
  ],
  "idiom_3969": [
    { "sentence": "Holy catfish! Did you see that?" },
    { "sentence": "Holy catfish, that was close." }
  ],
  "idiom_3974": [
    { "sentence": "Holy crud, I forgot my keys." },
    { "sentence": "Holy crud, look at the size of that thing." }
  ],
  "idiom_3975": [
    { "sentence": "Holy doodle, what happened here?" },
    { "sentence": "Holy doodle, that's expensive." }
  ],
  "idiom_3977": [
    { "sentence": "Holy macaroni, that's amazing!" },
    { "sentence": "Holy macaroni, I can't believe we won." }
  ],
  "idiom_3988": [
    { "sentence": "The home team has the advantage." },
    { "sentence": "Cheer for the home team." }
  ],
  "idiom_3992": [
    { "sentence": "He spent the weekend working on his honey do list." },
    { "sentence": "My honey do list is getting longer." }
  ],
  "idiom_4002": [
    { "sentence": "Just hop off and leave me alone." },
    { "sentence": "I told him to hop off." }
  ],
  "idiom_4004": [
    { "sentence": "They were caught hopping the wag." },
    { "sentence": "He used to hop the wag to go fishing." }
  ],
  "idiom_4006": [
    { "sentence": "The neighbors were doing some horizontal dancing." },
    { "sentence": "Horizontal dancing is a euphemism." }
  ],
  "idiom_401": [
    { "sentence": "He acted like a back-cloth star, stealing the scene." },
    { "sentence": "Don't be a back-cloth star; let others shine." }
  ],
  "idiom_4014": [
    { "sentence": "The knight bought new horse armor." },
    { "sentence": "The DLC for horse armor was controversial." }
  ],
  "idiom_4026": [
    { "sentence": "He got all hot and bothered about the delay." },
    { "sentence": "Don't get hot and bothered over nothing." }
  ],
  "idiom_4030": [
    { "sentence": "Keep passing to him; he has the hot hand." },
    { "sentence": "The shooter had a hot hand in the fourth quarter." }
  ],
  "idiom_4032": [
    { "sentence": "The hot-mouthed horse refused to obey." },
    { "sentence": "He was a hot-mouthed rebel." }
  ],
  "idiom_4033": [
    { "sentence": "This news is hot off the presses." },
    { "sentence": "Get your copy hot off the presses." }
  ],
  "idiom_4043": [
    { "sentence": "They threw a house cooling party before moving out." },
    { "sentence": "The house cooling party was a bittersweet farewell." }
  ],
  "idiom_4046": [
    { "sentence": "They bought a mansion but are now house poor." },
    { "sentence": "Being house poor means no money for vacations." }
  ],
  "idiom_4050": [
    { "sentence": "Complaining to them is just howling at the moon." },
    { "sentence": "He's howling at the moon if he thinks they'll listen." }
  ],
  "idiom_4056": [
    { "sentence": "She signed the letter with hugs and kisses." },
    { "sentence": "Sending you hugs and kisses." }
  ],
  "idiom_4061": [
    { "sentence": "He hunched over his desk working late." },
    { "sentence": "Don't hunch over; stand up straight." }
  ],
  "idiom_4062": [
    { "sentence": "The hunger sauce of the bacon frying woke him up." },
    { "sentence": "Good marketing is the hunger sauce for the product." }
  ],
  "idiom_4065": [
    { "sentence": "He's just a hurler on the ditch with no real experience." },
    { "sentence": "Ignore the hurlers on the ditch and focus on the game." }
  ],
  "idiom_4067": [
    { "sentence": "The army is all about hurry up and wait." },
    { "sentence": "We rushed to the airport just to hurry up and wait." }
  ],
  "idiom_4069": [
    { "sentence": "I didn't mean to hurt your feelings." },
    { "sentence": "His harsh words hurt her feelings." }
  ],
  "idiom_407": [
    { "sentence": "After that goal, they are back in the game." },
    { "sentence": "With the new loan, the business is back in the game." }
  ],
  "idiom_4071": [
    { "sentence": "The market was hustly-bustly with shoppers." },
    { "sentence": "I enjoy the hustly-bustly atmosphere of the city." }
  ],
  "idiom_4072": [
    { "sentence": "Can you hutch up a bit so I can sit down?" },
    { "sentence": "We hutched up to make room for everyone." }
  ],
  "idiom_4079": [
    { "sentence": "She was described as an ice maiden due to her cold demeanor." },
    { "sentence": "The ice maiden thawed when she saw the puppy." }
  ],
  "idiom_408": [
    { "sentence": "After a vacation, he's back in the groove." },
    { "sentence": "The band is back in the groove with their new album." }
  ],
  "idiom_4085": [
    { "sentence": "The toddler wore idiot mittens to play in the snow." },
    { "sentence": "He lost his gloves because he didn't have idiot mittens." }
  ],
  "idiom_4088": [
    { "sentence": "He says it's safe, but I don't know about that." },
    { "sentence": "I don't know about that; it sounds risky." }
  ],
  "idiom_4093": [
    { "sentence": "I might be late, so if I'm not there, start without me." },
    { "sentence": "If I'm not there, start without me; I have another meeting." }
  ],
  "idiom_4096": [
    { "sentence": "She gave him a look, and if looks could kill, he'd be dead." },
    { "sentence": "If looks could kill, the room would be empty." }
  ],
  "idiom_4097": [
    { "sentence": "I can work late if need be." },
    { "sentence": "We will hire more staff if need be." }
  ],
  "idiom_4101": [
    { "sentence": "If these walls could talk, what stories they would tell." },
    { "sentence": "It's an old hotel; if these walls could talk..." }
  ],
  "idiom_4102": [
    { "sentence": "I didn't name names, but if the shoe fits..." },
    { "sentence": "You think I'm talking about you? Well, if the shoe fits." }
  ],
  "idiom_4105": [
    { "sentence": "If you believe that, I have a bridge to sell you." },
    { "sentence": "He thinks he won the lottery via email? I have a bridge to sell him." }
  ],
  "idiom_4106": [
    { "sentence": "Don't ask me about policy; I just work here." },
    { "sentence": "I just work here, so I follow the rules." }
  ],
  "idiom_4111": [
    { "sentence": "Well, I'll be danged! You made it." },
    { "sentence": "I'll be danged if I know the answer." }
  ],
  "idiom_4116": [
    { "sentence": "Where did you hide it? I'm not telling you." },
    { "sentence": "I'm not telling you my password." }
  ],
  "idiom_4117": [
    { "sentence": "Don't mess with me; I'm not the one." },
    { "sentence": "He told the rude customer, 'I'm not the one.'" }
  ],
  "idiom_4124": [
    { "sentence": "The old man is now in Abraham's bosom." },
    { "sentence": "May he rest in Abraham's bosom." }
  ],
  "idiom_4127": [
    { "sentence": "We are in a fix with this broken engine." },
    { "sentence": "He got himself in a fix by lying." }
  ],
  "idiom_4130": [
    { "sentence": "He wandered around in a fog all day." },
    { "sentence": "I'm in a fog without my coffee." }
  ],
  "idiom_4132": [
    { "sentence": "Will I do that? In a hen's hiney!" },
    { "sentence": "In a hen's hiney I will help him." }
  ],
  "idiom_4133": [
    { "sentence": "I'm in a jam and need a ride." },
    { "sentence": "Call me if you're ever in a jam." }
  ],
  "idiom_4134": [
    { "sentence": "As a singer, she is in a league of her own." },
    { "sentence": "That restaurant is in a league of its own." }
  ],
  "idiom_4138": [
    { "sentence": "They celebrated in a major key." },
    { "sentence": "The project was launched in a major key." }
  ],
  "idiom_4139": [
    { "sentence": "Her room is in a mess." },
    { "sentence": "The economy is in a mess." }
  ],
  "idiom_4140": [
    { "sentence": "The party was held in a minor key." },
    { "sentence": "He spoke in a minor key, barely audible." }
  ],
  "idiom_4142": [
    { "sentence": "It was just a bit of the old in and out." },
    { "sentence": "Clockwork Orange refers to the old in and out." }
  ],
  "idiom_4150": [
    { "sentence": "In a pig's patoot I'll lend you money." },
    { "sentence": "Will I go? In a pig's patoot." }
  ],
  "idiom_4154": [
    { "sentence": "I feel like I'm in a rut at work." },
    { "sentence": "Let's try something new to get out of this rut." }
  ],
  "idiom_4155": [
    { "sentence": "I'll be there in a snap." },
    { "sentence": "The problem was solved in a snap." }
  ],
  "idiom_4157": [
    { "sentence": "He was thrown in at the deep end on his first day." },
    { "sentence": "Learning by being in at the deep end is effective but stressful." }
  ],
  "idiom_416": [
    { "sentence": "The team won back-to-back-to-back championships." },
    { "sentence": "He hit back-to-back-to-back home runs." }
  ],
  "idiom_4160": [
    { "sentence": "The house is in bad shape." },
    { "sentence": "After the flu, he was in bad shape." }
  ],
  "idiom_4165": [
    { "sentence": "That was a Mistake in capital letters." },
    { "sentence": "He is a Trouble in capital letters." }
  ],
  "idiom_4166": [
    { "sentence": "The traffic inched along the highway." },
    { "sentence": "We inched along the ledge." }
  ],
  "idiom_4169": [
    { "sentence": "He inched back from the edge." },
    { "sentence": "The car inched back into the spot." }
  ],
  "idiom_4170": [
    { "sentence": "They moved the heavy piano inch by inch." },
    { "sentence": "We are making progress, inch by inch." }
  ],
  "idiom_4171": [
    { "sentence": "The soldier inched forward through the grass." },
    { "sentence": "Sales inched forward this quarter." }
  ],
  "idiom_4173": [
    { "sentence": "Prices are inching up." },
    { "sentence": "The cat inched up to the bird." }
  ],
  "idiom_4178": [
    { "sentence": "He is in deep with the wrong crowd." },
    { "sentence": "I'm in deep with this project." }
  ],
  "idiom_4188": [
    { "sentence": "Don't worry, I never miss." },
    { "sentence": "He claimed 'I never miss' when asked about the details." }
  ],
  "idiom_4191": [
    { "sentence": "The land is held in fee." },
    { "sentence": "He owns the property in fee." }
  ],
  "idiom_4192": [
    { "sentence": "The soldiers were in fighting trim." },
    { "sentence": "Get the team in fighting trim for the finals." }
  ],
  "idiom_4202": [
    { "sentence": "He is in good odor with the boss." },
    { "sentence": "Keep yourself in good odor by working hard." }
  ],
  "idiom_4203": [
    { "sentence": "The machine is in good sorts." },
    { "sentence": "She seems in good sorts today." }
  ],
  "idiom_4209": [
    { "sentence": "I'll have it done in jig time." },
    { "sentence": "They finished the job in jig time." }
  ],
  "idiom_4210": [
    { "sentence": "Please ink in your answers." },
    { "sentence": "I inked in the drawing." }
  ],
  "idiom_4214": [
    { "sentence": "Explain it in laywoman's terms." },
    { "sentence": "In laywoman's terms, it's broken." }
  ],
  "idiom_422": [
    { "sentence": "He knows the manual backwards and forwards." },
    { "sentence": "She paced backwards and forwards." }
  ],
  "idiom_4227": [
    { "sentence": "The snake swallowed the egg in one bite." },
    { "sentence": "He ate the cookie in one bite." }
  ],
  "idiom_423": [
    { "sentence": "The bacon-faced man smiled." },
    { "sentence": "He was a jolly, bacon-faced fellow." }
  ],
  "idiom_4231": [
    { "sentence": "He ran out in his bare skin." },
    { "sentence": "They swam in their bare skin." }
  ],
  "idiom_4237": [
    { "sentence": "I'll get to it in my own good time." },
    { "sentence": "She finished the work in her own good time." }
  ],
  "idiom_4239": [
    { "sentence": "The mayor is in the developer's pocket." },
    { "sentence": "He has the judge in his pocket." }
  ],
  "idiom_4247": [
    { "sentence": "The stolen car was parked in plain view." },
    { "sentence": "He hid the key in plain view." }
  ],
  "idiom_4250": [
    { "sentence": "It was the worst storm in recent memory." },
    { "sentence": "No one in recent memory has done that." }
  ],
  "idiom_4251": [
    { "sentence": "He finished the race in record time." },
    { "sentence": "We cleaned the house in record time." }
  ],
  "idiom_427": [
    { "sentence": "He fell into bad company." },
    { "sentence": "Bad company corrupts good character." }
  ],
  "idiom_4271": [
    { "sentence": "We have a large installed base of users." },
    { "sentence": "Support for the installed base is crucial." }
  ],
  "idiom_4273": [
    { "sentence": "She took the criticism in stride." },
    { "sentence": "He took the changes in stride and kept working." }
  ],
  "idiom_4274": [
    { "sentence": "Don't insult my intelligence with that lie." },
    { "sentence": "That explanation insults everyone's intelligence." }
  ],
  "idiom_4277": [
    { "sentence": "The company is finally in the black." },
    { "sentence": "We need to get our accounts in the black." }
  ],
  "idiom_4281": [
    { "sentence": "The movie is in the can." },
    { "sentence": "With that scene finished, the episode is in the can." }
  ],
  "idiom_4285": [
    { "sentence": "The politician is in the dock for corruption." },
    { "sentence": "He put the theory in the dock." }
  ],
  "idiom_4289": [
    { "sentence": "She is in the driving seat of the project." },
    { "sentence": "Now that he's manager, he's in the driving seat." }
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
