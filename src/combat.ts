import {
  adv1,
  choiceFollowsFight,
  getCampground,
  getCounters,
  getFuel,
  getProperty,
  haveEffect,
  haveEquipped,
  haveFamiliar,
  haveSkill,
  inebrietyLimit,
  inMultiFight,
  itemAmount,
  myFamiliar,
  myInebriety,
  myMp,
  numericModifier,
  print,
  runaway,
  runCombat,
  setProperty,
  toInt,
  useSkill,
  visitUrl,
} from 'kolmafia';
import { $effect, $familiar, $item, $items, $monster, $skill, Macro as LibramMacro, banishedMonsters } from 'libram';
import { getPropertyBoolean, getPropertyInt, myFamiliarWeight, setPropertyInt, turboMode } from './lib';

// multiFight() stolen from Aenimus: https://github.com/Aenimus/aen_cocoabo_farm/blob/master/scripts/aen_combat.ash.
// Thanks! Licensed under MIT license.
function multiFight() {
  while (inMultiFight()) runCombat();
  if (choiceFollowsFight()) visitUrl('choice.php');
}

function candyblastDamage() {
  const spellDamagePercent = numericModifier('spell damage percent');
  const multiplier = (100 + spellDamagePercent) / 100;
  return Math.ceil(multiplier * 48);
}

export class Macro extends LibramMacro {
  submit() {
    print(`Submitting macro: ${this.toString()}`);
    return super.submit();
  }

  collect() {
    return this.externalIf(!turboMode(), Macro.if_('!hpbelow 500', Macro.skill($skill`Extract`)))
      .externalIf(
        myFamiliar() === $familiar`Space Jellyfish`,
        Macro.if_(
          `!hpbelow 500 && (monsterid ${toInt($monster`stench hobo`)} || monsterid ${toInt($monster`sleaze hobo`)})`,
          Macro.skill($skill`Extract Jelly`)
        )
      )
      .externalIf(
        getPropertyInt('_sourceTerminalDigitizeMonsterCount') >= 7 &&
        getPropertyInt('_sourceTerminalDigitizeUses') < 3 &&
        getCounters('Digitize Monster', 0, 0) !== '',
        Macro.if_(
          `monstername ${getProperty('_sourceTerminalDigitizeMonster')}`,
          Macro.skill($skill`Digitize`)
        )
      )
      .externalIf(
        !turboMode(),
        Macro.while_(
          `!hpbelow 500 && monsterhpabove ${2 * candyblastDamage()} && !match "some of it is even intact"`,
          Macro.skill($skill`Candyblast`)
        )
      );
  }

  static collect() {
    return new Macro().collect();
  }

  stasis() {
    return this.externalIf(myInebriety() > inebrietyLimit(), 'attack')
      .externalIf(
        myFamiliar() === $familiar`Stocking Mimic`,
        Macro.if_(
          '!hpbelow 500',
          Macro.skill($skill`Curse of Weaksauce`)
            .skill($skill`Micrometeorite`)
        )
      )
      .externalIf(!turboMode(), Macro.skill($skill`Entangling Noodles`))
      .collect()
      .externalIf(
        myFamiliar() === $familiar`Stocking Mimic`,
        Macro.while_(
          '!pastround 9 && !hpbelow 500 && (!monstername "normal hobo" || monsterhpabove 200)',
          Macro.item($item`seal tooth`)
        )
      );
  }

  static stasis() {
    return new Macro().stasis();
  }

  static nonFree() {
    return '!monstername "witchess" && !monstername "sausage goblin" && !monstername "black crayon"';
  }

  kill() {
    return this.externalIf(myInebriety() > inebrietyLimit(), 'attack')
      .if_('monstername sleaze hobo', Macro.skill($skill`Saucegeyser`).repeat())
      .externalIf(
        getPropertyInt('_shatteringPunchUsed') < 3,
        Macro.if_(Macro.nonFree(), Macro.skill($skill`Shattering Punch`))
      )
      .externalIf(
        !getPropertyBoolean('_gingerbreadMobHitUsed'),
        Macro.if_(Macro.nonFree(), Macro.skill($skill`Gingerbread Mob Hit`))
      )
      .externalIf(
        getPropertyInt('_chestXRayUsed') < 3 && haveEquipped($item`Lil' Doctor™ bag`),
        Macro.if_(Macro.nonFree(), Macro.skill($skill`Chest X-Ray`))
      )
      .externalIf(
        !getPropertyBoolean('_firedJokestersGun') && haveEquipped($item`The Jokester's gun`),
        Macro.if_(Macro.nonFree(), Macro.skill($skill`Fire the Jokester's Gun`))
      )
      .externalIf(
        !getPropertyBoolean('_missileLauncherUsed') &&
        getCampground()['Asdon Martin keyfob'] !== undefined &&
        getFuel() >= 100,
        Macro.if_(Macro.nonFree(), Macro.skill($skill`Asdon Martin: Missile Launcher`))
      )
      .externalIf(
        !turboMode(),
        Macro.while_('!hpbelow 500 && !match "some of it is even intact"', Macro.skill($skill`Candyblast`))
      )
      .skill($skill`Lunging Thrust-Smack`)
      .skill($skill`Lunging Thrust-Smack`)
      .if_('monstername spooky hobo', Macro.skill($skill`Lunging Thrust-Smack`).repeat())
      .skill($skill`Stuffed Mortar Shell`)
      .skill($skill`Saucegeyser`)
      .attack();
  }

  static kill() {
    return new Macro().kill();
  }

  static freeRun() {
    return new Macro()
      .skill($skill`Extract`)
      .skill($skill`Extract Jelly`)
      .externalIf(
        (haveFamiliar($familiar`Frumious Bandersnatch`) && haveEffect($effect`The Ode to Booze`) > 0) ||
        haveFamiliar($familiar`Pair of Stomping Boots`),
        'runaway'
      )
      .trySkill(
        'Spring-Loaded Front Bumper',
        'Reflex Hammer',
        'KGB tranquilizer dart',
        'Throw Latte on Opponent',
        'Snokebomb',
      )
      .tryItem('Louder Than Bomb', 'tattered scrap of paper', 'GOTO', 'green smoke bomb')
      .abort();
  }

  spellKill() {
    return this.skill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucegeyser').repeat();
  }

  static spellKill() {
    return new Macro().spellKill();
  }

  tentacle() {
    return this.if_('monstername eldritch tentacle', Macro.skill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucestorm').repeat());
  }

  professor() {
    let lecture = toInt($skill`lecture on relativity`);
    return this.if_(`hasskill ${lecture}`, Macro.skill(`${lecture}`))
  }

  /*profCopy() {
    return this.if_('hasskill ')
  }*/

  static tentacle() {
    return new Macro().tentacle();
  }
}

export const MODE_NULL = '';
export const MODE_MACRO = 'macro';
export const MODE_FIND_MONSTER_THEN = 'findthen';
export const MODE_RUN_UNLESS_FREE = 'rununlessfree';
type CombatMode = '' | 'macro' | 'findthen' | 'rununlessfree';

export function setMode(mode: CombatMode, arg1: string | null = null, arg2: string | null = null) {
  setProperty('minehobo_combatMode', mode);
  if (arg1 !== null) setProperty('minehobo_combatArg1', arg1);
  if (arg2 !== null) setProperty('minehobo_combatArg2', arg2);
}

export function getMode() {
  return getProperty('minehobo_combatMode');
}

export function getArg1() {
  return getProperty('minehobo_combatArg1');
}

export function getArg2() {
  return getProperty('minehobo_combatArg2');
}

const freeRunItems = $items`Louder Than Bomb, divine champagne popper, tattered scrap of paper, GOTO, green smoke bomb`;
export function main(initialRound: number, foe: Monster) {
  const mode = getMode();
  if (mode === MODE_MACRO) {
    Macro.load().submit();
  } else if (mode === MODE_RUN_UNLESS_FREE) {
    const preMacro = new Macro().step(getArg1());
    const killMacro = new Macro().step(getArg2());
    if (foe.attributes.includes('FREE')) {
      killMacro.submit();
    } else {
      preMacro.submit();
      if (
        myFamiliar() === Familiar.get('Frumious Bandersnatch') &&
        haveEffect(Effect.get('Ode to Booze')) > 0 &&
        getPropertyInt('_banderRunaways') < myFamiliarWeight() / 5
      ) {
        const banderRunaways = getPropertyInt('_banderRunaways');
        runaway();
        if (getPropertyInt('_banderRunaways') === banderRunaways) {
          print('WARNING: Mafia is not tracking bander runaways correctly.');
          setPropertyInt('_banderRunaways', banderRunaways + 1);
        }
      } else if (haveSkill(Skill.get('Spring-Loaded Front Bumper'))) {
        useSkill(1, Skill.get('Spring-Loaded Front Bumper'));
      } else if (haveSkill(Skill.get('Reflex Hammer')) && getPropertyInt('_reflexHammerUsed') < 3) {
        useSkill(1, Skill.get('Reflex Hammer'));
      } else if (haveSkill(Skill.get('KGB tranquilizer dart')) && getPropertyInt('_kgbTranquilizerDartUses') < 3) {
        useSkill(1, Skill.get('KGB tranquilizer dart'));
      } else if (haveSkill(Skill.get('Show them your ring')) && !getPropertyBoolean('_mafiaMiddleFingerRingUsed')) {
        useSkill(1, Skill.get('Show them your ring'));
      } else if (myMp() >= 50 && haveSkill(Skill.get('Snokebomb')) && getPropertyInt('_snokebombUsed') < 3) {
        useSkill(1, Skill.get('Snokebomb'));
      } else if (freeRunItems.some((item: Item) => itemAmount(item) > 0)) {
        Macro.item(freeRunItems.find((item: Item) => itemAmount(item) > 0) as Item).repeat().submit();
      } else {
        // non-free, whatever
        throw "Couldn't find a way to run away for free!";
      }
    }
  } else {
    throw 'Unrecognized mode.';
  }
}

export function withMode<T>(action: () => T, mode: CombatMode, arg1: string | null = null, arg2: string | null = null) {
  setMode(mode, arg1, arg2);
  try {
    return action();
  } finally {
    multiFight();
    setMode(MODE_NULL);
  }
}

export function withMacro<T>(macro: Macro, action: () => T) {
  try {
    macro.save();
    setMode(MODE_MACRO);
    return action();
  } finally {
    multiFight();
    Macro.clearSaved();
  }
}

export function adventureMode(loc: Location, mode: CombatMode, arg1: string | null = null, arg2: string | null = null) {
  return withMode(() => {
    adv1(loc, -1, '');
  }, mode, arg1, arg2);
}

export function adventureRunUnlessFree(loc: Location, preMacro: Macro, killMacro: Macro) {
  adventureMode(loc, MODE_RUN_UNLESS_FREE, preMacro.toString(), killMacro.toString());
}

export function adventureRunOrStasis(loc: Location, freeRun: boolean) {
  if (freeRun) {
    adventureRunUnlessFree(
      loc,
      myFamiliar() === $familiar`Stocking Mimic` ? Macro.stasis() : Macro.collect(),
      Macro.stasis().kill()
    );
  } else {
    adventureMacro(loc, Macro.stasis().kill());
  }
}

export function adventureMacro(loc: Location, macro: Macro) {
  withMode(() => withMacro(macro, () => adv1(loc, -1, '')), MODE_MACRO);
}

export function adventureMacroAuto(loc: Location, autoMacro: Macro, nextMacro: Macro | null = null) {
  nextMacro = nextMacro ?? Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}
