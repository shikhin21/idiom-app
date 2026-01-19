
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-2501-3000.json');

const newExamples = {
  "idiom_3325": [
    { "sentence": "With a cold like that, you have a good voice to beg bacon." },
    { "sentence": "He sang so badly they said he had a good voice to beg bacon." }
  ],
  "idiom_3329": [
    { "sentence": "The project went off into the weeds due to lack of direction." },
    { "sentence": "Don't go off into the weeds; stick to the main topic." }
  ],
  "idiom_3331": [
    { "sentence": "He decided to go his own way and start a business." },
    { "sentence": "Teenagers often want to go their own way." }
  ],
  "idiom_3334": [
    { "sentence": "The boys went on the mitch instead of going to maths class." },
    { "sentence": "He was caught going on the mitch." }
  ],
  "idiom_3336": [
    { "sentence": "That old car is go or blow." },
    { "sentence": "Buying a used car can be a go or blow situation." }
  ],
  "idiom_3338": [
    { "sentence": "It's gooseberry season, so the papers are full of silly stories." },
    { "sentence": "The Loch Ness Monster sighting was typical of gooseberry season." }
  ],
  "idiom_3342": [
    { "sentence": "She wanted her career to go out with a bang." },
    { "sentence": "The fireworks show went out with a bang." }
  ],
  "idiom_3343": [
    { "sentence": "That fashion went out with the ark." },
    { "sentence": "His ideas about management went out with the ark." }
  ],
  "idiom_3351": [
    { "sentence": "The budget deficit is the gorilla in the room." },
    { "sentence": "Nobody wanted to mention the gorilla in the room." }
  ],
  "idiom_3353": [
    { "sentence": "We are just going round in circles with this argument." },
    { "sentence": "Without a plan, you'll just go round in circles." }
  ],
  "idiom_3354": [
    { "sentence": "Spare me the gory details of your surgery." },
    { "sentence": "The news report gave all the gory details of the accident." }
  ],
  "idiom_3377": [
    { "sentence": "The king was forced to go to Canossa." },
    { "sentence": "He had to go to Canossa and apologize to his boss." }
  ],
  "idiom_3382": [
    { "sentence": "He ran away to go to sea at sixteen." },
    { "sentence": "Generations of his family have gone to sea." }
  ],
  "idiom_3398": [
    { "sentence": "He went tutti-frutti when he saw the damage." },
    { "sentence": "Don't go tutti-frutti over a small mistake." }
  ],
  "idiom_3406": [
    { "sentence": "I didn't have the data, so I had to go with my gut." },
    { "sentence": "Sometimes it's best to go with your gut instinct." }
  ],
  "idiom_3411": [
    { "sentence": "He has no principles; he just goes with the wind." },
    { "sentence": "The boat went with the wind across the lake." }
  ],
  "idiom_3419": [
    { "sentence": "This comment section is going to be good; grab the popcorn." },
    { "sentence": "Grab the popcorn, the show is about to start." }
  ],
  "idiom_3429": [
    { "sentence": "The hospital reported a rise in granny dumping." },
    { "sentence": "Granny dumping is a tragic symptom of a failing care system." }
  ],
  "idiom_343": [
    { "sentence": "The dog was at his heels." },
    { "sentence": "Competition is at our heels." }
  ],
  "idiom_3436": [
    { "sentence": "He operates as a gray hat hacker." },
    { "sentence": "The character is a gray hat, neither good nor bad." }
  ],
  "idiom_344": [
    { "sentence": "He was at spearpoint during the negotiations." },
    { "sentence": "She found herself at spearpoint of the new initiative." }
  ],
  "idiom_3440": [
    { "sentence": "The tax cuts greased the skids for economic growth." },
    { "sentence": "His connections greased the skids for his promotion." }
  ],
  "idiom_3451": [
    { "sentence": "He is as green as grass and knows nothing about the business." },
    { "sentence": "Don't be green as grass; do your research." }
  ],
  "idiom_3456": [
    { "sentence": "His grave was still green in earth." },
    { "sentence": "She mourned while he was green in earth." }
  ],
  "idiom_3458": [
    { "sentence": "He enjoyed a green old age, gardening every day." },
    { "sentence": "May we all be blessed with a green old age." }
  ],
  "idiom_346": [
    { "sentence": "Atta girl! You did great." },
    { "sentence": "He shouted 'atta girl' from the sidelines." }
  ],
  "idiom_3461": [
    { "sentence": "She was green with envy over his new car." },
    { "sentence": "His success made them green with envy." }
  ],
  "idiom_3463": [
    { "sentence": "Use your little grey cells to solve the puzzle." },
    { "sentence": "It requires a lot of grey cells to understand quantum physics." }
  ],
  "idiom_3468": [
    { "sentence": "He operated the grinding machine in the factory." },
    { "sentence": "Sparks flew from the grinding machine." }
  ],
  "idiom_3469": [
    { "sentence": "They were grinding the corn all night." },
    { "sentence": "The slang refers to grinding the corn." }
  ],
  "idiom_3473": [
    { "sentence": "The winning run scored on a ground ball with eyes." },
    { "sentence": "Sometimes you just need a ground ball with eyes." }
  ],
  "idiom_3477": [
    { "sentence": "Tell him the truth; grow a pair!" },
    { "sentence": "He finally grew a pair and quit his awful job." }
  ],
  "idiom_3484": [
    { "sentence": "You need to grow some balls and ask her out." },
    { "sentence": "He told the coward to grow some balls." }
  ],
  "idiom_3494": [
    { "sentence": "The broker was fined for gun jumping." },
    { "sentence": "Gun jumping violates securities laws." }
  ],
  "idiom_3495": [
    { "sentence": "He was married to the gunner's daughter for his insubordination." },
    { "sentence": "The old sailor remembered the gunner's daughter." }
  ],
  "idiom_3498": [
    { "sentence": "The gut factor played a large role in his decision." },
    { "sentence": "Ignore the gut factor and look at the numbers." }
  ],
  "idiom_350": [
    { "sentence": "He spent years at the coal face of the industry." },
    { "sentence": "Managers should spend some time at the coal face." }
  ],
  "idiom_3501": [
    { "sentence": "He decided to gut out the pain and finish the race." },
    { "sentence": "We have to gut out these tough times." }
  ],
  "idiom_3504": [
    { "sentence": "It was a gut-wrenching decision to close the business." },
    { "sentence": "The movie had a gut-wrenching ending." }
  ],
  "idiom_351": [
    { "sentence": "My car is at the disposal of the guests." },
    { "sentence": "He placed himself at the disposal of the committee." }
  ],
  "idiom_3511": [
    { "sentence": "That ghost story was a real hair-raiser." },
    { "sentence": "The ride was a hair-raiser." }
  ],
  "idiom_3517": [
    { "sentence": "Look at that fuzzy hairy molly on the leaf." },
    { "sentence": "Don't touch the hairy molly; it might sting." }
  ],
  "idiom_3527": [
    { "sentence": "The food was halfway decent, but not great." },
    { "sentence": "If the weather is halfway decent, we'll go for a walk." }
  ],
  "idiom_3531": [
    { "sentence": "They hammered away at the details until late at night." },
    { "sentence": "He kept hammering away at the same point." }
  ],
  "idiom_3535": [
    { "sentence": "It was handbags at dawn between the two rivals." },
    { "sentence": "The argument was just handbags at dawn, nothing serious." }
  ],
  "idiom_3539": [
    { "sentence": "The police worked hand-in-glove with the community." },
    { "sentence": "Corruption and crime often go hand-in-glove." }
  ],
  "idiom_3550": [
    { "sentence": "The boss handed him his head for that mistake." },
    { "sentence": "If you mess this up, they'll hand you your head." }
  ],
  "idiom_3557": [
    { "sentence": "He saw the handwriting on the wall and resigned." },
    { "sentence": "The handwriting on the wall spells trouble for the company." }
  ],
  "idiom_3573": [
    { "sentence": "She hung on every word of his story." },
    { "sentence": "The audience hung on every word of the speech." }
  ],
  "idiom_3584": [
    { "sentence": "After 20 seasons, he decided to hang up his boots." },
    { "sentence": "It's time to hang up my boots and enjoy retirement." }
  ],
  "idiom_3591": [
    { "sentence": "He's a happy chappy today." },
    { "sentence": "Look at that happy chappy with his ice cream." }
  ],
  "idiom_3594": [
    { "sentence": "When I'm stressed, I go to my happy place." },
    { "sentence": "Imagine a beach; find your happy place." }
  ],
  "idiom_3596": [
    { "sentence": "The sergeant was hard as nails." },
    { "sentence": "She's hard as nails in negotiations." }
  ],
  "idiom_3601": [
    { "sentence": "He is a hard-nosed businessman." },
    { "sentence": "We need a hard-nosed approach to solve this." }
  ],
  "idiom_3605": [
    { "sentence": "Will it rain? Hard telling, not knowing." },
    { "sentence": "Where did he go? Hard telling, not knowing." }
  ],
  "idiom_3608": [
    { "sentence": "He keeps harping on one string about the budget." },
    { "sentence": "Stop harping on one string; we get it." }
  ],
  "idiom_3609": [
    { "sentence": "She harps on the same string every meeting." },
    { "sentence": "It's annoying when someone harps on the same string." }
  ],
  "idiom_3620": [
    { "sentence": "Let's grab a bite before the movie." },
    { "sentence": "He didn't have time to have a bite." }
  ],
  "idiom_3626": [
    { "sentence": "We had a gas at the party." },
    { "sentence": "It was a gas hanging out with you." }
  ],
  "idiom_3633": [
    { "sentence": "He's having a hard time finding a job." },
    { "sentence": "She had a hard time with the math problem." }
  ],
  "idiom_364": [
    { "sentence": "He was at the receiving end of her anger." },
    { "sentence": "The city was at the receiving end of the hurricane." }
  ],
  "idiom_3643": [
    { "sentence": "He had an easy time of it in college." },
    { "sentence": "Don't think you'll have an easy time of it here." }
  ],
  "idiom_3645": [
    { "sentence": "If you think I'm paying, you have another thing coming." },
    { "sentence": "He has another thing coming if he expects a raise." }
  ],
  "idiom_3653": [
    { "sentence": "I'll have a stab at fixing it." },
    { "sentence": "Why don't you have a stab at the answer?" }
  ],
  "idiom_3655": [
    { "sentence": "The toddler had a tantrum in the store." },
    { "sentence": "Don't have a tantrum just because you lost." }
  ],
  "idiom_3656": [
    { "sentence": "They had a thin time of it during the recession." },
    { "sentence": "Farmers are having a thin time of it this year." }
  ],
  "idiom_3659": [
    { "sentence": "She really had a time of it with that illness." },
    { "sentence": "We had a time of it getting here in the snow." }
  ],
  "idiom_3676": [
    { "sentence": "She seems to have it all: career, family, and wealth." },
    { "sentence": "You can't have it all, you have to choose." }
  ],
  "idiom_3688": [
    { "sentence": "That guy has more money than God." },
    { "sentence": "Even if I had more money than God, I wouldn't buy that." }
  ],
  "idiom_3692": [
    { "sentence": "With those risky investments, he has one foot on a banana peel." },
    { "sentence": "The minister has one foot on a banana peel after the scandal." }
  ],
  "idiom_3696": [
    { "sentence": "After winning the lottery, he has his bread buttered for life." },
    { "sentence": "She married rich and has her bread buttered for life." }
  ],
  "idiom_3700": [
    { "sentence": "He had his ears pinned back by the teacher." },
    { "sentence": "Expect to have your ears pinned back if you're late." }
  ],
  "idiom_3701": [
    { "sentence": "The sniper had his finger on the trigger." },
    { "sentence": "Don't have your finger on the trigger unless you're ready to shoot." }
  ],
  "idiom_3702": [
    { "sentence": "He has his fingers in many pies, from real estate to restaurants." },
    { "sentence": "She's busy because she has her fingers in many pies." }
  ],
  "idiom_3710": [
    { "sentence": "Despite her age, she has her mind about her." },
    { "sentence": "He doesn't have his mind about him today." }
  ],
  "idiom_3725": [
    { "sentence": "The old explorer has seen his last gum tree." },
    { "sentence": "He looks like he's seen his last gum tree." }
  ],
  "idiom_3727": [
    { "sentence": "Girl, you need to have several seats." },
    { "sentence": "He was talking nonsense, so I told him to have several seats." }
  ],
  "idiom_3733": [
    { "sentence": "I don't want to have his blood on my head." },
    { "sentence": "If you let him drive drunk, you'll have his blood on your head." }
  ],
  "idiom_3739": [
    { "sentence": "I've made my offer; now you have the ball in your court." },
    { "sentence": "He has the ball in his court to make the next move." }
  ],
  "idiom_3740": [
    { "sentence": "This old car has the biscuit." },
    { "sentence": "I think I've had the biscuit; I'm exhausted." }
  ],
  "idiom_3749": [
    { "sentence": "He had the wind up about the meeting." },
    { "sentence": "Don't have the wind up; it's safe." }
  ],
  "idiom_3752": [
    { "sentence": "Since retiring, he has time on his hands." },
    { "sentence": "I have too much time on my hands." }
  ],
  "idiom_3753": [
    { "sentence": "We have time on our side, so let's be thorough." },
    { "sentence": "Youth means having time on your side." }
  ],
  "idiom_3758": [
    { "sentence": "I'd hazard a guess that he's late." },
    { "sentence": "If I had to hazard a guess, I'd say it's going to rain." }
  ],
  "idiom_3776": [
    { "sentence": "He's a complete head-the-ball." },
    { "sentence": "Don't listen to that head-the-ball." }
  ],
  "idiom_3790": [
    { "sentence": "The news of the accident was heart-shattering." },
    { "sentence": "She let out a heart-shattering cry." }
  ],
  "idiom_3795": [
    { "sentence": "This box is heavy as a dead donkey." },
    { "sentence": "I can't lift it; it's heavy as a dead donkey." }
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
