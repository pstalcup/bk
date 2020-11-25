import {canAdv} from 'canadv.ash';
import {adventureMacro, adventureRunUnlessFree, adventureKill, Macro} from './combat';
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

export function moodBaseline() {
  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  }

  // Stats.
  tryEnsureSkill(Skill.get('Get Big'));

  // Combat.
  tryEnsureSkill(Skill.get('Carol of the Hells'));

  // Elemental res.
  tryEnsureSkill(Skill.get('Elemental Saucesphere'));
  tryEnsureSkill(Skill.get('Astral Shell'));

  // Misc.
  tryEnsureSong(Skill.get('The Polka of Plenty'));
  tryEnsureSong(Skill.get("Fat Leon's Phat Loot Lyric"));
  tryEnsureSkill(Skill.get("Singer's Faithful Ocelot"));
  tryEnsureSkill(Skill.get('Blood Bond'));
  tryEnsureSkill(Skill.get('Empathy of the Newt'));
  tryEnsureSkill(Skill.get('Leash of Linguini'));
}

export function moodNoncombat() {
  moodBaseline();
  tryEnsureSkill(Skill.get('The Sonata of Sneakiness'));
  tryEnsureSkill(Skill.get('Smooth Movement'));
  if (getPropertyBoolean('horseryAvailable') && Lib.getProperty('Horsery') !== 'dark horse')
    Lib.cliExecute('horsery dark');
}

export function billiards() {
  if (!canAdv(Location.get('The Haunted Kitchen'))) {
    Lib.use(1, Item.get('telegram from Lady Spookyraven'));
  }

  while (Lib.availableAmount(Item.get('Spookyraven billiards room key')) === 0) {
    Lib.useFamiliar(Familiar.get('Exotic Parrot'));
    moodBaseline();
    maximizeCached('hot res 9 min, stench res 9 min, equip Kramco');
    adventureMacro(Location.get('The Haunted Kitchen'), Macro.skillRepeat(Skill.get('Saucestorm')));
  }

  while (Lib.availableAmount(Item.get(7302 /* Spookyraven library key */)) === 0) {
    while (Lib.myInebriety() < 5 && Lib.availableAmount(Item.get('astral pilsner')) > 0) {
      tryEnsureSong(Skill.get('The Ode to Booze'));
      drinkSafe(1, Item.get('astral pilsner'));
    }

    ensureEffect(Effect.get('Chalky Hand'));

    if (Lib.myInebriety() + 13 < 18) Lib.abort("Couldn't get enough pool skill.");

    setChoice(875, 1); // Welcome to our Ool Table
    setChoice(1436, 2); // Maps
    Lib.useFamiliar(Familiar.get('Disgeist'));
    moodNoncombat();
    maximizeCached('-combat');
    adventureMacro(Location.get('The Haunted Billiards Room'), Macro.skill(Skill.get('Saucestorm')));
  }
}

export function war() {
  Lib.retrieveItem(1, Item.get('skeletal skiff'));
  Lib.retrieveItem(1, Item.get('beer helmet'));
  Lib.retrieveItem(1, Item.get('distressed denim pants'));
  Lib.retrieveItem(1, Item.get('bejeweled pledge pin'));

  while (Lib.getProperty('warProgress') === 'unstarted') {
    setChoice(142, 3); // Lookout Tower
    setChoice(1433, 3); // Maps
    Lib.useFamiliar(Familiar.get('Disgeist'));
    moodNoncombat();
    maximizeCached('-combat, outfit Frat Warrior Fatigues');
    adventureRunUnlessFree(Location.get('Hippy Camp'));
  }

  if (getPropertyInt('hippiesDefeated') < 1000) {
    const count = clamp((1000 - getPropertyInt('hippiesDefeated')) / 46, 0, 24);
    Lib.retrieveItem(count, Item.get('stuffing fluffer'));
    Lib.use(count, Item.get('stuffing fluffer'));
    while (getPropertyInt('hippiesDefeated') < 1000) {
      Lib.retrieveItem(1, Item.get('stuffing fluffer'));
      Lib.use(1, Item.get('stuffing fluffer'));
    }
  }

  if (Lib.getProperty('warProgress') !== 'finished') {
    moodBaseline();
    maximizeCached('outfit Frat Warrior Fatigues');
    Combat.setMode(Combat.MODE_KILL);
    Lib.visitUrl('bigisland.php?place=camp&whichcamp=1');
    Lib.visitUrl('bigisland.php?action=bossfight');
    Lib.runCombat();
    Combat.setMode(Combat.MODE_NULL);
  }
}

export function dailyDungeon() {
  while (Lib.availableAmount(Item.get('fat loot token')) < 2 && !getPropertyBoolean('dailyDungeonDone')) {
    if (Lib.availableAmount(Item.get('fat loot token')) === 0) {
      ensureItem(1, Item.get('daily dungeon malware'), 40000);
    }
    setChoice(690, 2); // Chest 5
    setChoice(691, 2); // Chest 10
    setChoice(692, 11); // Lockpicks
    setChoice(693, 2); // Eleven-foot pole
    moodBaseline();
    maximizeCached('equip Ring of Detect Boring Doors');
    adventureMacro(
      Location.get('The Daily Dungeon'),
      Macro.item(Item.get('daily dungeon malware')).skill(Skill.get('Saucestorm'))
    );
  }
}

export function ores() {
  if (!canAdv(Location.get('Lair of the Ninja Snowmen'))) {
    Lib.visitUrl('place.php?whichplace=mclargehuge&action=trappercabin');
    Lib.retrieveItem(3, Lib.getProperty('trapperOre').toItem());
    Lib.retrieveItem(3, Item.get('goat cheese'));
    Lib.visitUrl('place.php?whichplace=mclargehuge&action=trappercabin');
  }
}

export function bridge() {
  if (getPropertyInt('chasmBridgeProgress') < 30) {
    const count = (34 - getPropertyInt('chasmBridgeProgress')) / 5;
    ensureItem(count, Item.get('smut orc keepsake box'), 20000);
    Lib.use(count, Item.get('smut orc keepsake box'));
    Lib.visitUrl(`place.php?whichplace=orcChasm&action=bridge${Lib.getProperty('chasmBridgeProgress')}`);
  }
}

export function aboo() {
  let theoreticalProgress = getPropertyInt('booPeakProgress') - 30 * Lib.availableAmount(Item.get('A-Boo Clue'));
  while (theoreticalProgress > 0) {
    // while blasts through intro adventure here...
    Lib.retrieveItem(1, Item.get('ten-leaf clover'));
    Lib.setProperty('cloverProtectActive', 'false');
    Lib.adv1(Location.get('A-Boo Peak'), -1, '');
    Lib.setProperty('cloverProtectActive', 'true');
    theoreticalProgress = getPropertyInt('booPeakProgress') - 30 * Lib.availableAmount(Item.get('A-Boo Clue'));
  }

  while (getPropertyInt('booPeakProgress') > 0 && Lib.availableAmount(Item.get('A-Boo Clue')) > 0) {
    maximizeCached('0.1hp, spooky res, cold res');
    Lib.use(1, Item.get('A-Boo Clue'));
    Lib.adv1(Location.get('A-Boo Peak'), -1, '');
  }
}

export function blackForest() {
  while (getStep('questL11Black') < 2) {
    setChoice(924, 1);
    Lib.useFamiliar(Familiar.get('Reassembled Blackbird'));
    moodBaseline();
    maximizeCached('0.1 combat rate 5 min, equip blackberry galoshes');
    adventureKill(Location.get('The Black Forest'));
  }

  if (getStep('questL11Black') < 3) {
    Lib.retrieveItem(1, Item.get('forged identification documents'));
    Lib.adv1(Location.get('The Shore, Inc. Travel Agency'), -1, '');
  }
}

export function shen() {
  if (getStep('questL11Shen') < 1) {
    maximizeCached('');
    adventureRunUnlessFree(Location.get('The Copperhead Club'));
  }
}
