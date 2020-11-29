import { canAdv } from 'canadv.ash';
import { adventureMacro, adventureRunUnlessFree, adventureKill, Macro } from './combat';
import * as Combat from './combat';

import {
  clamp,
  drinkSafe,
  ensureEffect,
  ensureItem,
  getPropertyBoolean,
  getPropertyInt,
  getStep,
  maximizeCached,
  setChoice,
  tryEnsureSkill,
  tryEnsureSong,
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
} from 'kolmafia';
import { $item, $skill, $location, $familiar, $effect } from 'libram/src';

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
  tryEnsureSong($skill`Fat Leon's Phat Loot Lyric`);
  tryEnsureSkill($skill`Singer's Faithful Ocelot`);
  tryEnsureSkill($skill`Blood Bond`);
  tryEnsureSkill($skill`Empathy of the Newt`);
  tryEnsureSkill($skill`Leash of Linguini`);
}

export function moodNoncombat() {
  moodBaseline();
  tryEnsureSkill($skill`The Sonata of Sneakiness`);
  tryEnsureSkill($skill`Smooth Movement`);
  if (getPropertyBoolean('horseryAvailable') && getProperty('Horsery') !== 'dark horse') cliExecute('horsery dark');
}

export function billiards() {
  if (!canAdv($location`The Haunted Kitchen`)) {
    use(1, $item`telegram from Lady Spookyraven`);
  }

  while (availableAmount($item`Spookyraven billiards room key`) === 0) {
    useFamiliar($familiar`Exotic Parrot`);
    moodBaseline();
    maximizeCached('hot res 9 min, stench res 9 min, equip Kramco');
    adventureMacro($location`The Haunted Kitchen`, Macro.skillRepeat($skill`Saucestorm`));
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
    retrieveItem(count, $item`stuffing fluffer`);
    use(count, $item`stuffing fluffer`);
    while (getPropertyInt('hippiesDefeated') < 1000) {
      retrieveItem(1, $item`stuffing fluffer`);
      use(1, $item`stuffing fluffer`);
    }
  }

  if (getProperty('warProgress') !== 'finished') {
    moodBaseline();
    maximizeCached('outfit Frat Warrior Fatigues');
    Combat.setMode(Combat.MODE_KILL);
    visitUrl('bigisland.php?place=camp&whichcamp=1');
    visitUrl('bigisland.php?action=bossfight');
    runCombat();
    Combat.setMode(Combat.MODE_NULL);
  }
}

export function dailyDungeon() {
  while (availableAmount($item`fat loot token`) < 2 && !getPropertyBoolean('dailyDungeonDone')) {
    if (availableAmount($item`fat loot token`) === 0) {
      ensureItem(1, $item`daily dungeon malware`, 40000);
    }
    setChoice(690, 2); // Chest 5
    setChoice(691, 2); // Chest 10
    setChoice(692, 11); // Lockpicks
    setChoice(693, 2); // Eleven-foot pole
    moodBaseline();
    maximizeCached('equip Ring of Detect Boring Doors');
    adventureMacro(
      $location`The Daily Dungeon`,
      Macro.item($item`daily dungeon malware`).skill($skill`Saucestorm`)
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
    ensureItem(count, $item`smut orc keepsake box`, 20000);
    use(count, $item`smut orc keepsake box`);
    visitUrl(`place.php?whichplace=orcChasm&action=bridge${getProperty('chasmBridgeProgress')}`);
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
  while (getStep('questL11Black') < 2) {
    setChoice(924, 1);
    useFamiliar($familiar`Reassembled Blackbird`);
    moodBaseline();
    maximizeCached('0.1 combat rate 5 min, equip blackberry galoshes');
    adventureKill($location`The Black Forest`);
  }

  if (getStep('questL11Black') < 3) {
    retrieveItem(1, $item`forged identification documents`);
    adv1($location`The Shore, Inc. Travel Agency`, -1, '');
  }
}

export function shen() {
  if (getStep('questL11Shen') < 1) {
    maximizeCached('');
    adventureRunUnlessFree($location`The Copperhead Club`);
  }
}
