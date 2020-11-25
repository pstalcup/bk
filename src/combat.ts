import {getPropertyInt, myFamiliarWeight} from './lib';

// multiFight() stolen from Aenimus: https://github.com/Aenimus/aen_cocoabo_farm/blob/master/scripts/aen_combat.ash.
// Thanks! Licensed under MIT license.
function multiFight() {
  while (Lib.inMultiFight()) Lib.runCombat();
  if (Lib.choiceFollowsFight()) Lib.visitUrl('choice.php');
}

export class Macro {
  components: string[] = [];

  toString() {
    return this.components.join(';');
  }

  step(...nextSteps: string[]) {
    this.components.concat(nextSteps.filter(s => s.length > 0));
    return this;
  }

  static step(...nextSteps: string[]) {
    return new Macro().step(...nextSteps);
  }

  submit() {
    const final = this.toString();
    Lib.print(`Submitting macro: ${final}`);
    return Lib.visitUrl('fight.php?action=macro&macrotext=' + Lib.urlEncode(final), true, true);
  }

  static monster(foe: Monster) {
    return `monstername "${foe.name}"`;
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
    if (Lib.availableAmount(it) > 0) {
      return this.step(`use ${it.name}`);
    } else return this;
  }

  static item(it: Item) {
    return new Macro().item(it);
  }

  kill() {
    return this.skill(Skill.get('Stuffed Mortar Shell'))
      .skillRepeat(Skill.get('Saucegeyser'))
      .skillRepeat(Skill.get('Saucestorm'));
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
  Lib.setProperty('bcas_combatMode', mode);
  if (arg1 !== null) Lib.setProperty('bcas_combatArg1', arg1);
  if (arg2 !== null) Lib.setProperty('bcas_combatArg2', arg2);
}

export function getMode() {
  return Lib.getProperty('bcas_combatMode');
}

export function getArg1() {
  return Lib.getProperty('bcas_combatArg1');
}

export function getArg2() {
  return Lib.getProperty('bcas_combatArg2');
}

function banishedMonsters() {
  const banishedstring = Lib.getProperty('banishedMonsters');
  const banishedComponents = banishedstring.split(':');
  const result: {[index: string]: Monster} = {};
  if (banishedComponents.count() < 3) return result;
  for (let idx = 0; idx < banishedComponents.count() / 3 - 1; idx++) {
    const foe = banishedComponents[idx * 3].toMonster();
    const banisher = banishedComponents[idx * 3 + 1];
    Lib.print(`Banished ${foe.name} using ${banisher}`);
    result[banisher] = foe;
  }
  return result;
}

function usedBanisherInZone(banished: {[index: string]: Monster}, banisher: string, loc: Location) {
  Lib.print(`Checking to see if we've used ${banisher} in ${loc}.`);
  if (banished[banisher] === undefined) return false;
  Lib.print(`Used it to banish ${banished[banisher].name}`);
  return Lib.getLocationMonsters(loc)[banished[banisher].name] === undefined;
}

export function main(initround: number, foe: Monster) {
  const mode = getMode();
  const loc = Lib.myLocation();
  if (mode === MODE_CUSTOM) {
    Macro.step(getArg1()).repeatSubmit();
  } else if (mode === MODE_FIND_MONSTER_THEN) {
    const monsterId = parseInt(getArg1(), 10);
    const desired = Lib.toMonster(monsterId);
    const banished = banishedMonsters();
    if (foe === desired) {
      Lib.setProperty('bcas_combatFound', 'true');
      new Macro().step(getArg2()).repeatSubmit();
    } else if (
      Lib.myMp() >= 50 &&
      Lib.haveSkill(Skill.get('Snokebomb')) &&
      getPropertyInt('_snokebombUsed') < 3 &&
      !usedBanisherInZone(banished, 'snokebomb', loc)
    ) {
      Lib.useSkill(1, Skill.get('Snokebomb'));
      /* } else if (haveSkill(Skill.get('Reflex Hammer')) && getPropertyInt("ReflexHammerUsed") < 3 && !usedBanisherInZone(banished, "Reflex Hammer", loc)) {
          Lib.useSkill(1, Skill.get('Reflex Hammer')); */
    } else if (Lib.haveSkill(Skill.get('Macrometeorite')) && getPropertyInt('_macrometeoriteUses') < 10) {
      Lib.useSkill(1, Skill.get('Macrometeorite'));
    } else if (
      Lib.haveSkill(Skill.get('CHEAT CODE: Replace Enemy')) &&
      getPropertyInt('_powerfulGloveBatteryPowerUsed') <= 80
    ) {
      const originalBattery = getPropertyInt('_powerfulGloveBatteryPowerUsed');
      Lib.useSkill(1, Skill.get('CHEAT CODE: Replace Enemy'));
      const newBattery = getPropertyInt('_powerfulGloveBatteryPowerUsed');
      if (newBattery === originalBattery) {
        Lib.print('WARNING: Mafia is not updating PG battery charge.');
        Lib.setProperty('_powerfulGloveBatteryPowerUsed', '' + (newBattery + 10));
      }
      // Hopefully at this point it comes back to the consult script.
    }
  } else if (mode === MODE_RUN_UNLESS_FREE) {
    if (foe.attributes.includes('FREE')) {
      new Macro()
        .skill(Skill.get('Curse of Weaksauce'))
        .skill(Skill.get('Sing Along'))
        .skill(Skill.get('Saucegeyser'))
        .repeatSubmit();
    } else if (
      Lib.myFamiliar() === Familiar.get('Frumious Bandersnatch') &&
      Lib.haveEffect(Effect.get('Ode to Booze')) > 0 &&
      getPropertyInt('_banderRunaways') < myFamiliarWeight() / 5
    ) {
      const banderRunaways = getPropertyInt('_banderRunaways');
      Lib.runaway();
      if (getPropertyInt('_banderRunaways') === banderRunaways) {
        Lib.print('WARNING: Mafia is not tracking bander runaways correctly.');
        Lib.setProperty('_banderRunaways', banderRunaways + 1);
      }
    } else if (Lib.haveSkill(Skill.get('Reflex Hammer')) && getPropertyInt('_reflexHammerUsed') < 3) {
      Lib.useSkill(1, Skill.get('Reflex Hammer'));
    } else if (Lib.myMp() >= 50 && Lib.haveSkill(Skill.get('Snokebomb')) && getPropertyInt('_snokebombUsed') < 3) {
      Lib.useSkill(1, Skill.get('Snokebomb'));
    } else {
      // non-free, whatever
      Lib.runaway();
    }
  } else if (mode === MODE_KILL) {
    Macro.kill().submit();
  } else {
    Lib.abort('Unrecognized mode.');
  }

  multiFight();
}

export function saberYr() {
  if (!Lib.handlingChoice()) Lib.abort('No choice?');
  if (Lib.lastChoice() === 1387 && Lib.count(Lib.availableChoiceOptions()) > 0) {
    Lib.runChoice(3);
  }
}

export function adventureMacro(loc: Location, macro: Macro) {
  setMode(MODE_CUSTOM, macro.toString());
  Lib.adv1(loc, -1, '');
  setMode(MODE_NULL, '');
}

export function adventureKill(loc: Location) {
  adventureMacro(loc, Macro.kill());
}

function findMonsterThen(loc: Location, foe: Monster, macro: Macro) {
  setMode(MODE_FIND_MONSTER_THEN, foe.id.toString(), macro.toString());
  Lib.setProperty('bcas_combatFound', 'false');
  while (Lib.getProperty('bcas_combatFound') !== 'true') {
    Lib.adv1(loc, -1, '');
  }
  setMode(MODE_NULL, '');
}

export function findMonsterSaberYr(loc: Location, foe: Monster) {
  Lib.setProperty('choiceAdventure1387', '3');
  findMonsterThen(loc, foe, Macro.skill(Skill.get('Use the Force')));
}

export function adventureCopy(loc: Location, foe: Monster) {
  setMode(
    MODE_CUSTOM,
    Macro.mIf(`!monstername "${foe.name}"`, 'abort').skill(Skill.get('Lecture on Relativity')).kill().toString()
  );
  Lib.adv1(loc, -1, '');
  setMode(MODE_NULL, '');
}

export function adventureRunUnlessFree(loc: Location) {
  setMode(MODE_RUN_UNLESS_FREE);
  Lib.adv1(loc, -1, '');
  setMode(MODE_NULL);
}
