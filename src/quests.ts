import { canAdv } from 'canadv.ash';
import { adventureMacro, adventureRunUnlessFree, Macro } from './combat';
import * as Combat from './combat';

import {
  clamp,
  drinkSafe,
  ensureEffect,
  get as getItem,
  getPropertyBoolean,
  getPropertyInt,
  questStep,
  maximizeCached,
  setChoice,
  tryEnsureSkill,
  tryEnsureSong,
  tryEnsureEffect,
  getCapped,
} from './lib';
import {
  myMp,
  eat,
  getProperty,
  cliExecute,
  use,
  availableAmount,
  useFamiliar,
  myInebriety,
  abort,
  retrieveItem,
  visitUrl,
  runCombat,
  setProperty,
  adv1,
  mallPrice,
  create,
  haveFamiliar,
  weightAdjustment,
  familiarWeight,
  getCampground,
} from 'kolmafia';
import { $item, $skill, $location, $familiar, $effect, get, set } from 'libram/src';

export function moodBaseline() {
  if (myMp() < 200) {
    eat(1, $item`magical sausage`);
  }

  // Stats.
  tryEnsureSkill($skill`Get Big`);

  // Combat.
  tryEnsureSkill($skill`Carol of the Hells`);

  // Elemental res.
  tryEnsureSkill($skill`Elemental Saucesphere`);
  tryEnsureSkill($skill`Astral Shell`);

  // Misc.
  tryEnsureSong($skill`The Polka of Plenty`);
  tryEnsureSkill($skill`Singer's Faithful Ocelot`);
  tryEnsureSkill($skill`Blood Bond`);
  tryEnsureSkill($skill`Empathy of the Newt`);
  tryEnsureSkill($skill`Leash of Linguini`);
}

export function moodNoncombat() {
  moodBaseline();
  tryEnsureSkill($skill`The Sonata of Sneakiness`);
  tryEnsureSkill($skill`Smooth Movement`);
  if (getPropertyBoolean('horseryAvailable') && getProperty('_horsery') !== 'dark horse') cliExecute('horsery dark');
}

export function addFamiliarWeight() {
  tryEnsureEffect($effect`Chorale of Companionship`);
  tryEnsureEffect($effect`Billiards Belligerence`);
  tryEnsureEffect($effect`Do I Know You From Somewhere?`);
  if (getCampground()['Witchess Set'] !== undefined && get('puzzleChampBonus') === 20 && !get('_witchessBuff')) {
    tryEnsureEffect($effect`Puzzle Champ`);
  }
  if (getCampground()['Witchess Set'] !== undefined && get('puzzleChampBonus') === 20 && !get('_witchessBuff')) {
    tryEnsureEffect($effect`Puzzle Champ`);
  }
}

export function billiards() {
  if (!canAdv($location`The Haunted Kitchen`)) {
    use(1, $item`telegram from Lady Spookyraven`);
  }

  while (availableAmount($item`Spookyraven billiards room key`) === 0) {
    useFamiliar($familiar`Exotic Parrot`);
    moodBaseline();
    maximizeCached('hot res 9 min, stench res 9 min, equip Kramco');
    adventureMacro($location`The Haunted Kitchen`, Macro.skill($skill`Saucestorm`).repeat());
  }

  while (availableAmount(Item.get(7302 /* Spookyraven library key */)) === 0) {
    while (myInebriety() < 5 && availableAmount($item`astral pilsner`) > 0) {
      tryEnsureSong($skill`The Ode to Booze`);
      drinkSafe(1, $item`astral pilsner`);
    }

    ensureEffect($effect`Chalky Hand`);

    if (myInebriety() + 13 < 18) abort("Couldn't get enough pool skill.");

    setChoice(875, 1); // Welcome to our Ool Table
    setChoice(1436, 2); // Maps
    useFamiliar($familiar`Disgeist`);
    moodNoncombat();
    maximizeCached('-combat');
    adventureMacro($location`The Haunted Billiards Room`, Macro.skill($skill`Saucestorm`));
  }
}

export function airship() {
  if (questStep('questL10Garbage') < 7) {
    if (questStep('questL10Garbage') < 1) use(1, $item`enchanted bean`);

    const freeRunFamiliar = haveFamiliar($familiar`Frumious Bandersnatch`)
      ? $familiar`Frumious Bandersnatch`
      : $familiar`Pair of Stomping Boots`;
    if (!get<boolean>('_bcas_banderRunawaysUsed') && haveFamiliar(freeRunFamiliar)) {
      useFamiliar(freeRunFamiliar);
      moodNoncombat();
      addFamiliarWeight();
      maximizeCached('familiar weight, -combat');
      const myFamiliarWeight = familiarWeight(freeRunFamiliar) + weightAdjustment();

      while (
        questStep('questL10Garbage') < 7 &&
        getPropertyInt('_banderRunaways') < Math.floor(myFamiliarWeight / 5) &&
        (freeRunFamiliar !== $familiar`Frumious Bandersnatch` || tryEnsureSong($skill`The Ode to Booze`))
      ) {
        moodNoncombat();
        addFamiliarWeight();
        adventureMacro($location`The Penultimate Fantasy Airship`, Macro.runaway());
      }

      set('_bcas_banderRunawaysUsed', true);
    }
  }
}

function ensureFluffers(flufferCount: number) {
  const neededFluffers = flufferCount - availableAmount($item`stuffing fluffer`);
  const stuffingFlufferSources: [Item, number][] = [
    [$item`cashew`, 3],
    [$item`stuffing fluffer`, 1],
    [$item`cornucopia`, (1 / 3.5) * 3],
  ];
  stuffingFlufferSources.sort(([item1, mult1], [item2, mult2]) => mallPrice(item1) * mult1 - mallPrice(item2) * mult2);
  const [stuffingFlufferSource, sourceMultiplier] = stuffingFlufferSources[0];

  const neededOfSource = Math.ceil(neededFluffers * sourceMultiplier);
  getItem(neededOfSource, stuffingFlufferSource);
  if (stuffingFlufferSource === $item`cornucopia`) {
    use(neededOfSource, $item`cornucopia`);
  }
  if (stuffingFlufferSource !== $item`stuffing fluffer`) {
    create(neededFluffers, $item`stuffing fluffer`);
  }
}

export function war() {
  retrieveItem(1, $item`skeletal skiff`);
  retrieveItem(1, $item`beer helmet`);
  retrieveItem(1, $item`distressed denim pants`);
  retrieveItem(1, $item`bejeweled pledge pin`);

  while (getProperty('warProgress') === 'unstarted') {
    setChoice(142, 3); // Lookout Tower
    setChoice(1433, 3); // Maps
    useFamiliar($familiar`Disgeist`);
    moodNoncombat();
    maximizeCached('-combat, outfit Frat Warrior Fatigues');
    adventureRunUnlessFree($location`Hippy Camp`);
  }

  if (getPropertyInt('hippiesDefeated') < 1000) {
    const count = clamp((1000 - getPropertyInt('hippiesDefeated')) / 46, 0, 24);

    ensureFluffers(count);
    use(count, $item`stuffing fluffer`);
    while (getPropertyInt('hippiesDefeated') < 1000) {
      ensureFluffers(1);
      use(1, $item`stuffing fluffer`);
    }
  }

  if (getProperty('warProgress') !== 'finished') {
    moodBaseline();
    maximizeCached('outfit Frat Warrior Fatigues');
    Combat.setMode(Combat.MODE_MACRO);
    Macro.kill().save();
    visitUrl('bigisland.php?place=camp&whichcamp=1');
    visitUrl('bigisland.php?action=bossfight');
    runCombat();
    Combat.setMode(Combat.MODE_NULL);
  }
}

export function dailyDungeon() {
  while (availableAmount($item`fat loot token`) < 2 && !getPropertyBoolean('dailyDungeonDone')) {
    if (availableAmount($item`fat loot token`) === 0) {
      getCapped(1, $item`daily dungeon malware`, 40000);
    }
    setChoice(690, 2); // Chest 5
    setChoice(691, 2); // Chest 10
    setChoice(692, 11); // Lockpicks
    setChoice(693, 2); // Eleven-foot pole
    moodBaseline();
    maximizeCached('equip Ring of Detect Boring Doors');
    adventureMacro(
      $location`The Daily Dungeon`,
      Macro.externalIf(
        !get('_dailyDungeonMalwareUsed'),
        Macro.item($item`daily dungeon malware`)
      ).kill()
    );
  }
}

export function ores() {
  if (!canAdv($location`Lair of the Ninja Snowmen`)) {
    visitUrl('place.php?whichplace=mclargehuge&action=trappercabin');
    retrieveItem(3, Item.get(getProperty('trapperOre')));
    retrieveItem(3, $item`goat cheese`);
    visitUrl('place.php?whichplace=mclargehuge&action=trappercabin');
  }
}

export function bridge() {
  if (getPropertyInt('chasmBridgeProgress') < 30) {
    const count = (34 - getPropertyInt('chasmBridgeProgress')) / 5;
    getCapped(count, $item`smut orc keepsake box`, 20000);
    use(count, $item`smut orc keepsake box`);
    visitUrl(`place.php ? whichplace = orc_chasm & action=bridge${getProperty('chasmBridgeProgress')}`);
  }
}

export function aboo() {
  let theoreticalProgress = getPropertyInt('booPeakProgress') - 30 * availableAmount($item`A-Boo Clue`);
  while (theoreticalProgress > 0) {
    // while blasts through intro adventure here...
    retrieveItem(1, $item`ten-leaf clover`);
    setProperty('cloverProtectActive', 'false');
    adv1($location`A-Boo Peak`, -1, '');
    setProperty('cloverProtectActive', 'true');
    theoreticalProgress = getPropertyInt('booPeakProgress') - 30 * availableAmount($item`A-Boo Clue`);
  }

  while (getPropertyInt('booPeakProgress') > 0 && availableAmount($item`A-Boo Clue`) > 0) {
    maximizeCached('0.1hp, spooky res, cold res');
    use(1, $item`A-Boo Clue`);
    adv1($location`A-Boo Peak`, -1, '');
  }
}

export function blackForest() {
  while (questStep('questL11Black') < 2) {
    setChoice(924, 1);
    useFamiliar($familiar`Reassembled Blackbird`);
    moodBaseline();
    maximizeCached('0.1 combat rate 5 min, equip blackberry galoshes');
    adventureMacro($location`The Black Forest`, Macro.kill());
  }

  if (questStep('questL11Black') < 3) {
    retrieveItem(1, $item`forged identification documents`);
    adv1($location`The Shore, Inc.Travel Agency`, -1, '');
  }
}

export function shen() {
  if (questStep('questL11Shen') < 1) {
    maximizeCached('');
    adventureRunUnlessFree($location`The Copperhead Club`);
  }
}
