import {
  inMultiFight,
  runCombat,
  choiceFollowsFight,
  visitUrl,
  print,
  urlEncode,
  availableAmount,
  setProperty,
  getProperty,
  getLocationMonsters,
  myLocation,
  toMonster,
  myMp,
  haveSkill,
  useSkill,
  myFamiliar,
  haveEffect,
  runaway,
  abort,
  handlingChoice,
  lastChoice,
  count,
  availableChoiceOptions,
  runChoice,
  adv1,
} from 'kolmafia';
import { $skill, $familiar, $effect } from 'libram/src';
import { getPropertyInt, myFamiliarWeight, setPropertyInt } from './lib';

// multiFight() stolen from Aenimus: https://github.com/Aenimus/aen_cocoabo_farm/blob/master/scripts/aen_combat.ash.
// Thanks! Licensed under MIT license.
function multiFight() {
  while (inMultiFight()) runCombat();
  if (choiceFollowsFight()) visitUrl('choice.php');
}

export class Macro {
  components: string[] = [];

  toString() {
    return this.components.join(';');
  }

  step(...nextSteps: string[]) {
    this.components = this.components.concat(nextSteps.filter(s => s.length > 0));
    return this;
  }

  static step(...nextSteps: string[]) {
    return new Macro().step(...nextSteps);
  }

  submit() {
    const final = this.toString();
    print(`Submitting macro: ${final}`);
    return visitUrl('fight.php?action=macro&macrotext=' + urlEncode(final), true, true);
  }

  static monster(foe: Monster) {
    return `monstername "${foe.name}`;
  }

  mIf(condition: string, ...next: string[]) {
    return this.step(`if ${condition}`)
      .step(...next)
      .step('endif');
  }

  static mIf(condition: string, ...next: string[]) {
    return new Macro().mIf(condition, ...next);
  }

  externalIf(condition: boolean, ...next: string[]) {
    return condition ? this.step(...next) : this;
  }

  static externalIf(condition: boolean, ...next: string[]) {
    return new Macro().externalIf(condition, ...next);
  }

  repeat() {
    return this.step('repeat');
  }

  repeatSubmit() {
    return this.step('repeat').submit();
  }

  skill(sk: Skill) {
    const name = sk.name.replace('%fn, ', '');
    return this.mIf(`hasskill ${name}`, `skill ${name}`);
  }

  static skill(sk: Skill) {
    return new Macro().skill(sk);
  }

  skillRepeat(sk: Skill) {
    const name = sk.name.replace('%fn, ', '');
    return this.mIf(`hasskill ${name}`, `skill ${name};repeat`);
  }

  static skillRepeat(sk: Skill) {
    return new Macro().skillRepeat(sk);
  }

  item(it: Item) {
    if (availableAmount(it) > 0) {
      return this.step(`use ${it.name}`);
    } else return this;
  }

  static item(it: Item) {
    return new Macro().item(it);
  }

  kill() {
    return this.skill($skill`Stuffed Mortar Shell`)
      .skillRepeat($skill`Saucegeyser`)
      .skillRepeat($skill`Saucestorm`);
  }

  static kill() {
    return new Macro().kill();
  }
}

export const MODE_NULL = '';
export const MODE_CUSTOM = 'custom';
export const MODE_FIND_MONSTER_THEN = 'findthen';
export const MODE_RUN_UNLESS_FREE = 'rununlessfree';
export const MODE_KILL = 'kill';

export function setMode(mode: string, arg1: string | null = null, arg2: string | null = null) {
  setProperty('bcas_combatMode', mode);
  if (arg1 !== null) setProperty('bcas_combatArg1', arg1);
  if (arg2 !== null) setProperty('bcas_combatArg2', arg2);
}

export function getMode() {
  return getProperty('bcas_combatMode');
}

export function getArg1() {
  return getProperty('bcas_combatArg1');
}

export function getArg2() {
  return getProperty('bcas_combatArg2');
}

function banishedMonsters() {
  const banishedstring = getProperty('banishedMonsters');
  const banishedComponents = banishedstring.split(':');
  const result: { [index: string]: Monster } = {};
  if (banishedComponents.length < 3) return result;
  for (let idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    const foe = Monster.get(banishedComponents[idx * 3]);
    const banisher = banishedComponents[idx * 3 + 1];
    print(`Banished ${foe.name} using ${banisher}`);
    result[banisher] = foe;
  }
  return result;
}

function usedBanisherInZone(banished: { [index: string]: Monster }, banisher: string, loc: Location) {
  print(`Checking to see if we've used ${banisher} in ${loc}.`);
  if (banished[banisher] === undefined) return false;
  print(`Used it to banish ${banished[banisher].name}`);
  return getLocationMonsters(loc)[banished[banisher].name] === undefined;
}

export function main(initround: number, foe: Monster) {
  const mode = getMode();
  const loc = myLocation();
  if (mode === MODE_CUSTOM) {
    Macro.step(getArg1()).repeatSubmit();
  } else if (mode === MODE_FIND_MONSTER_THEN) {
    const monsterId = parseInt(getArg1(), 10);
    const desired = toMonster(monsterId);
    const banished = banishedMonsters();
    if (foe === desired) {
      setProperty('bcas_combatFound', 'true');
      new Macro().step(getArg2()).repeatSubmit();
    } else if (
      myMp() >= 50 &&
      haveSkill($skill`Snokebomb`) &&
      getPropertyInt('_snokebombUsed') < 3 &&
      !usedBanisherInZone(banished, 'snokebomb', loc)
    ) {
      useSkill(1, $skill`Snokebomb`);
      /* } else if (haveSkill($skill`Reflex Hammer`) && getPropertyInt("ReflexHammerUsed") < 3 && !usedBanisherInZone(banished, "Reflex Hammer", loc)) {
          useSkill(1, $skill`Reflex Hammer`); */
    } else if (haveSkill($skill`Macrometeorite`) && getPropertyInt('_macrometeoriteUses') < 10) {
      useSkill(1, $skill`Macrometeorite`);
    } else if (
      haveSkill($skill`CHEAT CODE: Replace Enemy`) &&
      getPropertyInt('_powerfulGloveBatteryPowerUsed') <= 80
    ) {
      const originalBattery = getPropertyInt('_powerfulGloveBatteryPowerUsed');
      useSkill(1, $skill`CHEAT CODE: Replace Enemy`);
      const newBattery = getPropertyInt('_powerfulGloveBatteryPowerUsed');
      if (newBattery === originalBattery) {
        print('WARNING: Mafia is not updating PG battery charge.');
        setProperty('_powerfulGloveBatteryPowerUsed', '' + (newBattery + 10));
      }
      // Hopefully at this point it comes back to the consult script.
    }
  } else if (mode === MODE_RUN_UNLESS_FREE) {
    if (foe.attributes.includes('FREE')) {
      new Macro()
        .skill($skill`Curse of Weaksauce`)
        .skill($skill`Sing Along`)
        .skill($skill`Saucegeyser`)
        .repeatSubmit();
    } else if (
      myFamiliar() === $familiar`Frumious Bandersnatch` &&
      haveEffect($effect`Ode to Booze`) > 0 &&
      getPropertyInt('_banderRunaways') < myFamiliarWeight() / 5
    ) {
      const banderRunaways = getPropertyInt('_banderRunaways');
      runaway();
      if (getPropertyInt('_banderRunaways') === banderRunaways) {
        print('WARNING: Mafia is not tracking bander runaways correctly.');
        setPropertyInt('_banderRunaways', banderRunaways + 1);
      }
    } else if (haveSkill($skill`Reflex Hammer`) && getPropertyInt('_reflexHammerUsed') < 3) {
      useSkill(1, $skill`Reflex Hammer`);
    } else if (myMp() >= 50 && haveSkill($skill`Snokebomb`) && getPropertyInt('_snokebombUsed') < 3) {
      useSkill(1, $skill`Snokebomb`);
    } else {
      // non-free, whatever
      runaway();
    }
  } else if (mode === MODE_KILL) {
    Macro.kill().submit();
  } else {
    abort('Unrecognized mode.');
  }

  multiFight();
}

export function saberYr() {
  if (!handlingChoice()) abort('No choice?');
  if (lastChoice() === 1387 && count(availableChoiceOptions()) > 0) {
    runChoice(3);
  }
}

export function adventureMacro(loc: Location, macro: Macro) {
  setMode(MODE_CUSTOM, macro.toString());
  adv1(loc, -1, '');
  setMode(MODE_NULL, '');
}

export function adventureKill(loc: Location) {
  adventureMacro(loc, Macro.kill());
}

function findMonsterThen(loc: Location, foe: Monster, macro: Macro) {
  setMode(MODE_FIND_MONSTER_THEN, foe.id.toString(), macro.toString());
  setProperty('bcas_combatFound', 'false');
  while (getProperty('bcas_combatFound') !== 'true') {
    adv1(loc, -1, '');
  }
  setMode(MODE_NULL, '');
}

export function findMonsterSaberYr(loc: Location, foe: Monster) {
  setProperty('choiceAdventure1387', '3');
  findMonsterThen(loc, foe, Macro.skill($skill`Use the Force`));
}

export function adventureCopy(loc: Location, foe: Monster) {
  setMode(
    MODE_CUSTOM,
    Macro.mIf(`!monstername "${foe.name}`, 'abort').skill($skill`Lecture on Relativity`).kill().toString()
  );
  adv1(loc, -1, '');
  setMode(MODE_NULL, '');
}

export function adventureRunUnlessFree(loc: Location) {
  setMode(MODE_RUN_UNLESS_FREE);
  adv1(loc, -1, '');
  setMode(MODE_NULL);
}
