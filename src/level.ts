import {MODE_CUSTOM, MODE_NULL, adventureCopy, adventureKill, setMode, Macro} from './combat';
import {
  tryEnsureSong,
  tryEnsureSkill,
  ensureEffect,
  tryEnsureEffect,
  getPropertyBoolean,
  trySynthesize,
  getPropertyInt,
  maximizeCached,
  setChoice,
} from './lib';

declare class Stat extends MafiaClass {}

function levelMood() {
  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  }

  // Stats.
  tryEnsureSong(Skill.get("Stevedave's Shanty of Superiority"));
  tryEnsureSkill(Skill.get('Song of Bravado'));
  tryEnsureSkill(Skill.get('Get Big'));
  ensureEffect(Effect.get('Having a Ball!'));
  ensureEffect(Effect.get('Tomato Power'));
  ensureEffect(Effect.get('Trivia Master'));
  ensureEffect(Effect.get('Gr8ness'));
  tryEnsureEffect(Effect.get('Favored by Lyle'));
  tryEnsureEffect(Effect.get('Starry-Eyed'));
  tryEnsureSkill(Skill.get('CHEAT CODE: Triple Size'));
  tryEnsureEffect(Effect.get('You Learned Something Maybe!'));
  if (getPropertyBoolean('DaycareToday') && !getPropertyBoolean('DaycareSpa'))
    Lib.cliExecute('daycare {Lib.myPrimestat()}');

  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  }
  if (Lib.myPrimestat() === Stat.get('Muscle')) {
    tryEnsureSong(Skill.get('The Power Ballad of the Arrowsmith'));
    tryEnsureEffect(Effect.get('Lack of Body-Building'));
    ensureEffect(Effect.get("Go Get 'Em, Tiger!"));
    ensureEffect(Effect.get('Phorcefullness'));
    ensureEffect(Effect.get('Incredibly Hulking'));
  } else if (Lib.myPrimestat() === Stat.get('Mysticality')) {
    tryEnsureSong(Skill.get('The Magical Mojomuscular Melody'));
    tryEnsureEffect(Effect.get("We're All Made of Starfish"));
    tryEnsureSkill(Skill.get('Inscrutable Gaze'));
    ensureEffect(Effect.get('Glittering Eyelashes'));
    ensureEffect(Effect.get('Mystically Oiled'));
    ensureEffect(Effect.get('On The Shoulders Of Giants'));
  } else if (Lib.myPrimestat() === Stat.get('Moxie')) {
    tryEnsureSong(Skill.get('The Moxious Madrigal'));
    tryEnsureEffect(Effect.get('Pomp & Circumsands'));
    ensureEffect(Effect.get('Butt-Rock Hair'));
    ensureEffect(Effect.get('Superhuman Sarcasm'));
    ensureEffect(Effect.get('Cock of the Walk'));
  }

  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  }

  // ML.
  tryEnsureSong(Skill.get("Ur-Kel's Aria of Annoyance"));
  tryEnsureSkill(Skill.get('Pride of the Puffin'));
  tryEnsureSkill(Skill.get("Drescher's Annoying Noise"));

  // Combat.
  tryEnsureSkill(Skill.get('Carol of the Hells'));
  ensureEffect(Effect.get('Pisces in the Skyces'));

  // Misc.
  tryEnsureSong(Skill.get('The Polka of Plenty'));
  tryEnsureSong(Skill.get("Singer's Faithful Ocelot"));
  tryEnsureSkill(Skill.get('Blood Bond'));
  tryEnsureSkill(Skill.get('Empathy of the Newt'));
  tryEnsureSkill(Skill.get('Leash of Linguini'));
  tryEnsureSkill(Skill.get('Carol of the Thrills'));
}

export function level() {
  if (Lib.myLevel() >= 13) return;

  // Put on some basic gear.
  maximizeCached('mp');
  if (
    Lib.myMp() < 200 &&
    Lib.availableAmount(Item.get('magical sausage')) + Lib.availableAmount(Item.get('magical sausage casing')) > 0
  ) {
    Lib.eat(1, Item.get('magical sausage'));
  }

  // Start buffing. XP buffs first.
  if (Lib.myPrimestat() === Stat.get('Muscle')) {
    ensureEffect(Effect.get('Muscle Unbound'));
    ensureEffect(Effect.get('Purpose'));
    trySynthesize(Effect.get('Synthesis: Movement'));
  } else if (Lib.myPrimestat() === Stat.get('Mysticality')) {
    ensureEffect(Effect.get('Thaumodynamic'));
    ensureEffect(Effect.get('Category'));
    trySynthesize(Effect.get('Synthesis: Learning'));
  } else if (Lib.myPrimestat() === Stat.get('Moxie')) {
    ensureEffect(Effect.get('So Fresh and So Clean'));
    ensureEffect(Effect.get('Perception'));
    trySynthesize(Effect.get('Synthesis: Style'));
  }

  // Campsite
  if (Lib.haveEffect(Effect.get("That's Just Cloud-Talk, Man")) === 0) {
    Lib.visitUrl('place.php?whichplace=campaway&action=campawaySky');
  }

  // Daycare
  if (getPropertyInt('DaycareGymScavenges') === 0) {
    // Free scavenge.
    Lib.visitUrl('choice.php?whichchoice=1336&option=2');
  }

  // Bastille first.
  if (getPropertyInt('BastilleGames') === 0) {
    if (Lib.availableAmount(Item.get('Bastille Battalion control rig')) === 0) {
      Lib.use(1, Item.get('Bastille Battalion control rig loaner voucher'));
    }
    Lib.cliExecute('bastille {Lib.myPrimestat() === Stat.get(\'Mysticality\') ? "Lib.myst" : Lib.myPrimestat()}');
  }

  // Chateau rests.
  if (getPropertyBoolean('chateauAvailable')) {
    Lib.buy(1, Item.get('ceiling fan'));
    if (Lib.myPrimestat() === Stat.get('Muscle')) {
      Lib.buy(1, Item.get('electric muscle stimulator'));
    } else if (Lib.myPrimestat() === Stat.get('Mysticality')) {
      Lib.buy(1, Item.get('foreign language tapes'));
    } else if (Lib.myPrimestat() === Stat.get('Moxie')) {
      Lib.buy(1, Item.get('bowl of potpourri'));
    }
    // Chateau rest
    while (getPropertyInt('timesRested') < Lib.totalFreeRests()) {
      Lib.visitUrl('place.php?whichplace=chateau&action=chateauRestbox');
    }
  }

  Lib.cliExecute('breakfast');

  if (Lib.haveFamiliar(Familiar.get('God Lobster'))) {
    Lib.useFamiliar(Familiar.get('God Lobster'));
    const useGg = Lib.haveSkill(Skill.get('Giant Growth')) && Lib.mallPrice(Item.get('green mana')) < 8000;

    while (Lib.getProperty('GodLobsterFights') < 3) {
      maximizeCached('mainstat, 4exp, equip makeshift garbage shirt');
      // Get stats from the fight.
      setChoice(1310, 3);
      levelMood();
      Lib.restoreHp(Lib.myMaxhp());
      if (useGg && Lib.haveEffect(Effect.get('Giant Growth')) === 0) Lib.retrieveItem(1, Item.get('green mana'));
      Lib.visitUrl('main.php?fightgodlobster=1');
      setMode(
        MODE_CUSTOM,
        Macro.externalIf(useGg && Lib.haveEffect(Effect.get('Giant Growth')) === 0, 'skill Giant Growth')
          .kill()
          .toString()
      );
      Lib.runCombat();
      Lib.visitUrl('choice.php');
      if (Lib.handlingChoice()) Lib.runChoice(3);
      setMode(MODE_NULL);
    }
  }

  if (
    getPropertyInt('SausageFights') === 0 &&
    Lib.haveFamiliar(Familiar.get('Pocket Professor')) &&
    Lib.availableAmount(Item.get('Kramco Sausage-o-Matic&trade;')) > 0
  ) {
    Lib.useFamiliar(Familiar.get('Pocket Professor'));
    maximizeCached('mainstat, 4exp, equip makeshift garbage shirt, equip Pocket Professor memory chip, equip Kramco');
    levelMood();
    adventureCopy(Location.get("The Outskirts of Cobb's Knob"), Monster.get('sausage goblin'));
  }

  while (getPropertyInt('NeverendingPartyFreeTurns') < 10) {
    if (!getPropertyBoolean('leafletCompleted') && Lib.myLevel() >= 9) {
      Lib.visitUrl('council.php');
      Lib.cliExecute('leaflet');
    }
    Lib.useFamiliar(Familiar.get('Hovering Sombrero'));
    maximizeCached('mainstat, 4exp, equip makeshift garbage shirt');
    setChoice(1324, 5);
    levelMood();
    adventureKill(Location.get('The Neverending Party'));
  }

  Lib.visitUrl('council.php');

  Lib.print('');
  Lib.print('Done leveling.', 'blue');
  Lib.print('Reached mainstat {Lib.myBasestat(Lib.myPrimestat())}');
}
