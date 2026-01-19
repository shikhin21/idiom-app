
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'idioms', 'idioms-2001-2500.json');

const newExamples = {
  "idiom_2814": [
    { "sentence": "He works in the fields from can see to can't see." },
    { "sentence": "They were searching for the missing child from can see to can't see." }
  ],
  "idiom_2817": [
    { "sentence": "Farmers work from dawn to dusk during harvest season." },
    { "sentence": "The festival runs from dawn to dusk on Saturday." }
  ],
  "idiom_2830": [
    { "sentence": "I knew it was a bad idea from the gecko (get-go)." },
    { "sentence": "He was lying from the gecko." }
  ],
  "idiom_2842": [
    { "sentence": "The judge threw out the evidence as fruit of the poisonous tree." },
    { "sentence": "Any confession obtained after the illegal search is fruit of the poisonous tree." }
  ],
  "idiom_2843": [
    { "sentence": "They welcomed the fruit of the union, a baby girl." },
    { "sentence": "He is the fruit of the union between two powerful families." }
  ],
  "idiom_285": [
    { "sentence": "He assumed room temperature after the shootout." },
    { "sentence": "We don't want anyone to assume room temperature on this mission." }
  ],
  "idiom_286": [
    { "sentence": "She assumed the mantle of leadership after the CEO resigned." },
    { "sentence": "He was reluctant to assume the mantle of family patriarch." }
  ],
  "idiom_2863": [
    { "sentence": "Instead of fixing the leak, they fudged the issue by placing a bucket under it." },
    { "sentence": "The politician fudged the issue when asked about taxes." }
  ],
  "idiom_2882": [
    { "sentence": "The fully rigged ship sailed into the harbor." },
    { "sentence": "He built a model of a fully rigged galleon." }
  ],
  "idiom_2887": [
    { "sentence": "There was some funny stuff going on with the accounting." },
    { "sentence": "I suspect funny stuff in the recent election." }
  ],
  "idiom_2888": [
    { "sentence": "That smell would gag a dog off a gut wagon." },
    { "sentence": "His cooking is enough to gag a dog off a gut wagon." }
  ],
  "idiom_2889": [
    { "sentence": "He's been single for months and is gagging for it." },
    { "sentence": "They were gagging for a drink after the long hike." }
  ],
  "idiom_2891": [
    { "sentence": "He gained time by working in the prison library." },
    { "sentence": "With good behavior, you can gain time and be released early." }
  ],
  "idiom_2892": [
    { "sentence": "The memory was gall and wormwood to him." },
    { "sentence": "Defeat was gall and wormwood for the proud champion." }
  ],
  "idiom_2899": [
    { "sentence": "The neighborhood kids ganged up to build a fort." },
    { "sentence": "Several companies ganged up to lobby against the new law." }
  ],
  "idiom_2900": [
    { "sentence": "They ganged up on the new student." },
    { "sentence": "Don't gang up on me with your questions." }
  ],
  "idiom_2906": [
    { "sentence": "The chairperson gaveled the meeting to order." },
    { "sentence": "She struggled to gavel the unruly crowd to order." }
  ],
  "idiom_2908": [
    { "sentence": "David Bowie was a famous gender bender in the 70s." },
    { "sentence": "The fashion show featured gender bender styles." }
  ],
  "idiom_2909": [
    { "sentence": "He won the genetic lottery with those looks and intelligence." },
    { "sentence": "Health is often just a matter of the genetic lottery." }
  ],
  "idiom_2910": [
    { "sentence": "Despite his size, he is as gentle as a lamb." },
    { "sentence": "The fierce dog turned out to be gentle as a lamb." }
  ],
  "idiom_2915": [
    { "sentence": "He folded his German virgin pre-flop." },
    { "sentence": "A German virgin isn't a very strong starting hand." }
  ],
  "idiom_2918": [
    { "sentence": "The addict was desperate to get a fix." },
    { "sentence": "I need to get a fix of caffeine before I can work." }
  ],
  "idiom_2924": [
    { "sentence": "I'm trying to get a line on a good mechanic." },
    { "sentence": "Police are trying to get a line on the suspect's whereabouts." }
  ],
  "idiom_2926": [
    { "sentence": "The crowd really got amongst it at the festival." },
    { "sentence": "There's plenty of food, so get amongst it." }
  ],
  "idiom_2936": [
    { "sentence": "After the bankruptcy, he decided to get back on the horse that bucked him." },
    { "sentence": "It's scary, but you have to get back on the horse that bucked you." }
  ],
  "idiom_294": [
    { "sentence": "His mood changes as the wind blows." },
    { "sentence": "We'll make a decision as the wind blows." }
  ],
  "idiom_2943": [
    { "sentence": "I need to go home and get changed before dinner." },
    { "sentence": "Get changed into your gym clothes." }
  ],
  "idiom_2949": [
    { "sentence": "I'm getting grey hair from raising these teenagers." },
    { "sentence": "This project is giving me grey hair." }
  ],
  "idiom_2957": [
    { "sentence": "We must ensure these weapons don't get into the wrong hands." },
    { "sentence": "If this information gets into the wrong hands, it could be disastrous." }
  ],
  "idiom_2960": [
    { "sentence": "He's a hustler; he gets it how he lives." },
    { "sentence": "In this neighborhood, you get it how you live." }
  ],
  "idiom_2963": [
    { "sentence": "He got life for the murder." },
    { "sentence": "She's afraid she'll get life if convicted." }
  ],
  "idiom_2965": [
    { "sentence": "He gets misty whenever he talks about his late wife." },
    { "sentence": "The movie ending made everyone get misty." }
  ],
  "idiom_2969": [
    { "sentence": "He needs to get off his high horse and listen to us." },
    { "sentence": "She got off her high horse and apologized." }
  ],
  "idiom_2974": [
    { "sentence": "Don't get your bowels in an uproar over a small mistake." },
    { "sentence": "He got his bowels in an uproar when he saw the bill." }
  ],
  "idiom_2978": [
    { "sentence": "Our team got their clock cleaned in the playoffs." },
    { "sentence": "He tried to box the champion and got his clock cleaned." }
  ],
  "idiom_2981": [
    { "sentence": "He got his fill of adventure and returned home." },
    { "sentence": "I've got my fill of your complaints." }
  ],
  "idiom_2982": [
    { "sentence": "We're late; get your finger out!" },
    { "sentence": "If they don't get their finger out, they'll lose the contract." }
  ],
  "idiom_2994": [
    { "sentence": "He got his marching orders after the scandal." },
    { "sentence": "The coach got his marching orders after a losing season." }
  ],
  "idiom_2995": [
    { "sentence": "That comment really got my monkey up." },
    { "sentence": "Don't get his monkey up, or he'll yell." }
  ],
  "idiom_301": [
    { "sentence": "She watched the parade at a distance." },
    { "sentence": "Keep him at a distance; he's trouble." }
  ],
  "idiom_3010": [
    { "sentence": "We need to get on the stick if we want to finish by noon." },
    { "sentence": "Get on the stick and clean your room." }
  ],
  "idiom_3015": [
    { "sentence": "Get out of my face before I lose my temper." },
    { "sentence": "He told the paparazzi to get out of his face." }
  ],
  "idiom_3016": [
    { "sentence": "Get out of my sight! I never want to see you again." },
    { "sentence": "She banished him, screaming 'Get out of my sight!'" }
  ],
  "idiom_3039": [
    { "sentence": "He got the bullet for stealing from the register." },
    { "sentence": "I'm worried I might get the bullet next week." }
  ],
  "idiom_3040": [
    { "sentence": "Half the department got the chop yesterday." },
    { "sentence": "If sales don't improve, we'll all get the chop." }
  ],
  "idiom_3047": [
    { "sentence": "Come on, get the lead out! We're late." },
    { "sentence": "He told the workers to get the lead out." }
  ],
  "idiom_3053": [
    { "sentence": "He got the sack for being consistently late." },
    { "sentence": "She's afraid she'll get the sack." }
  ],
  "idiom_3055": [
    { "sentence": "He got the wind up when he heard the noise downstairs." },
    { "sentence": "The rumors put the wind up the investors." }
  ],
  "idiom_3056": [
    { "sentence": "We need to get the word out about the fundraiser." },
    { "sentence": "Social media helps get the word out quickly." }
  ],
  "idiom_3065": [
    { "sentence": "That song really gets underneath my skin." },
    { "sentence": "Don't let his comments get underneath your skin." }
  ],
  "idiom_3067": [
    { "sentence": "She has a lot of get-up-and-go." },
    { "sentence": "He lost his get-up-and-go after the illness." }
  ],
  "idiom_3069": [
    { "sentence": "You won the lottery? Get up the yard!" },
    { "sentence": "Get up the yard, you're having me on." }
  ],
  "idiom_3070": [
    { "sentence": "Farmers have to get up with the chickens." },
    { "sentence": "I hate getting up with the chickens on weekends." }
  ],
  "idiom_3082": [
    { "sentence": "His ex-wife was the ghost at the feast." },
    { "sentence": "The looming deadline was a ghost at the feast during the party." }
  ],
  "idiom_3083": [
    { "sentence": "The scandal was a ghost from his past." },
    { "sentence": "She was haunted by a ghost from her past." }
  ],
  "idiom_3093": [
    { "sentence": "Great job! Gimme a five!" },
    { "sentence": "He held up his hand and said, 'Gimme a five.'" }
  ],
  "idiom_3096": [
    { "sentence": "We need to ginger up the meeting with some debate." },
    { "sentence": "They added spices to ginger up the stew." }
  ],
  "idiom_3111": [
    { "sentence": "The coach gave the players curry at half-time." },
    { "sentence": "He really gave me curry for being late." }
  ],
  "idiom_312": [
    { "sentence": "At any given moment, thousands of planes are in the air." },
    { "sentence": "I can leave at any given moment." }
  ],
  "idiom_3120": [
    { "sentence": "He gave it the gun and sped away." },
    { "sentence": "Give it the gun to get up this hill." }
  ],
  "idiom_3121": [
    { "sentence": "The new director gave life to the stagnant project." },
    { "sentence": "Her performance gave life to the character." }
  ],
  "idiom_3125": [
    { "sentence": "Since her promotion, she's been giving herself airs." },
    { "sentence": "Don't give yourself airs; you're no better than us." }
  ],
  "idiom_3134": [
    { "sentence": "If you let them stay up late once, they'll want to every night; give someone an inch and someone will take a mile." },
    { "sentence": "He's the type where if you give someone an inch, someone will take a mile." }
  ],
  "idiom_3136": [
    { "sentence": "He plans to give her a ring on Valentine's Day." },
    { "sentence": "Give me a ring sometime (call me)." }
  ],
  "idiom_3139": [
    { "sentence": "The boss gave him beans for the mistake." },
    { "sentence": "She gave the dog beans for digging in the garden." }
  ],
  "idiom_3140": [
    { "sentence": "Give him enough rope and he'll hang himself." },
    { "sentence": "I'll give them enough rope to see if they can handle it." }
  ],
  "idiom_3141": [
    { "sentence": "This computer is giving me grey hair." },
    { "sentence": "Her teenage son is giving her grey hair." }
  ],
  "idiom_3145": [
    { "sentence": "The owner gave the manager his head to run the shop." },
    { "sentence": "Sometimes it's best to give a horse his head." }
  ],
  "idiom_3158": [
    { "sentence": "We should give her her flowers while she's still here to appreciate them." },
    { "sentence": "He deserves to be given his flowers for that achievement." }
  ],
  "idiom_3171": [
    { "sentence": "They decided to give the axe to the new TV show." },
    { "sentence": "He was given the axe after the merger." }
  ],
  "idiom_3178": [
    { "sentence": "He was given the sack for stealing." },
    { "sentence": "I'm afraid I'll be given the sack." }
  ],
  "idiom_318": [
    { "sentence": "We were talking at cross-purposes and getting nowhere." },
    { "sentence": "They argued for hours, but were at cross-purposes." }
  ],
  "idiom_3187": [
    { "sentence": "Glory be! You actually cleaned your room." },
    { "sentence": "Glory be to God." }
  ],
  "idiom_3191": [
    { "sentence": "Guilt gnawed his vitals." },
    { "sentence": "The secret was gnawing her vitals." }
  ],
  "idiom_3193": [
    { "sentence": "We went all around the Wrekin to get here." },
    { "sentence": "Don't go all around the Wrekin; just say it." }
  ],
  "idiom_3200": [
    { "sentence": "I decided to go along with the gag to see where it went." },
    { "sentence": "He wouldn't go along with the gag." }
  ],
  "idiom_3201": [
    { "sentence": "Stop going around the houses and answer the question." },
    { "sentence": "He went around the houses before admitting the truth." }
  ],
  "idiom_3212": [
    { "sentence": "Many old traditions have gone by the wayside." },
    { "sentence": "His diet went by the wayside during the holidays." }
  ],
  "idiom_3213": [
    { "sentence": "If you don't like it, go climb a tree." },
    { "sentence": "He told the rude customer to go climb a tree." }
  ],
  "idiom_3216": [
    { "sentence": "If anything happens to him, God forfend, I don't know what I'll do." },
    { "sentence": "God forfend that we should fail." }
  ],
  "idiom_3217": [
    { "sentence": "Pay attention to the small stuff; God is in the detail." },
    { "sentence": "The plan looks good, but remember, God is in the detail." }
  ],
  "idiom_3219": [
    { "sentence": "His career went down in flames after the scandal." },
    { "sentence": "The project went down in flames." }
  ],
  "idiom_3226": [
    { "sentence": "The economy is going down the toilet." },
    { "sentence": "His reputation went down the toilet." }
  ],
  "idiom_3231": [
    { "sentence": "He thinks he's God's gift to men." },
    { "sentence": "She acts like she's God's gift to men." }
  ],
  "idiom_3233": [
    { "sentence": "It's the God's honest truth." },
    { "sentence": "I swear, it's the God's honest truth." }
  ],
  "idiom_3241": [
    { "sentence": "The antique table went for a song at the auction." },
    { "sentence": "We bought the house for a song." }
  ],
  "idiom_3244": [
    { "sentence": "He told his boss to go forth and multiply." },
    { "sentence": "If he bothers you, just tell him to go forth and multiply." }
  ],
  "idiom_3247": [
    { "sentence": "The jury found him not guilty, and he was allowed to go free." },
    { "sentence": "After the war, the prisoners went free." }
  ],
  "idiom_3249": [
    { "sentence": "He went from zero to hero with that winning goal." },
    { "sentence": "The movie is about a nobody who goes from zero to hero." }
  ],
  "idiom_3253": [
    { "sentence": "The company decided to go green to save money and the planet." },
    { "sentence": "We are going green by recycling more." }
  ],
  "idiom_3263": [
    { "sentence": "They decided to go in the out door." },
    { "sentence": "Slang for anal sex: going in the out door." }
  ],
  "idiom_3265": [
    { "sentence": "I decided to go in with him on the investment." },
    { "sentence": "Will you go in with me on a birthday gift for Mom?" }
  ],
  "idiom_3267": [
    { "sentence": "He told the annoying salesman to go jump off a building." },
    { "sentence": "I'm not doing that; go jump off a building." }
  ],
  "idiom_3269": [
    { "sentence": "She was accused of gold-digging." },
    { "sentence": "He's just gold-digging for an inheritance." }
  ],
  "idiom_3271": [
    { "sentence": "The batsman was out for a golden duck." },
    { "sentence": "He suffered the embarrassment of a golden duck." }
  ],
  "idiom_3275": [
    { "sentence": "He received a substantial golden hello to join the firm." },
    { "sentence": "Golden hellos are common in high finance." }
  ],
  "idiom_3291": [
    { "sentence": "His fortune was gone with the wind." },
    { "sentence": "Our plans are gone with the wind." }
  ],
  "idiom_3293": [
    { "sentence": "This discussion is going nowhere fast." },
    { "sentence": "We're stuck in traffic and going nowhere fast." }
  ],
  "idiom_3303": [
    { "sentence": "It's not perfect, but it's good enough for jazz." },
    { "sentence": "Fix it up so it's good enough for jazz." }
  ],
  "idiom_331": [
    { "sentence": "The world is at his feet." },
    { "sentence": "She has the audience at her feet." }
  ],
  "idiom_3310": [
    { "sentence": "He has a good head on his shoulders." },
    { "sentence": "Trust her; she has a good head on her shoulders." }
  ],
  "idiom_3316": [
    { "sentence": "Goodness gracious me, look at the time!" },
    { "sentence": "Goodness gracious me, what a mess." }
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
