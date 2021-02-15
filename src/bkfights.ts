import {
  availableAmount,
  cliExecute,
  equip,
  faxbot,
  getCampground,
  getCounters,
  handlingChoice,
  itemAmount,
  mallPrice,
  myLightning,
  myRain,
  print,
  putCloset,
  retrieveItem,
  runChoice,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
  setProperty as setPropertyMafia,
  adv1,
  getProperty,
  myBjornedFamiliar,
  bjornifyFamiliar,
  myEnthronedFamiliar,
  enthroneFamiliar,
  familiarWeight,
  weightAdjustment,
  equippedAmount,
  equippedItem,
  eat,
  effectModifier,
  toItem,
  myFamiliar,
  toMonster,
  toFamiliar,
  availableChoiceOptions,
  buy,
  totalTurnsPlayed,
  maximize,
} from 'kolmafia';
import {
  $class,
  $effect,
  $familiar,
  $item,
  $location,
  $monster,
  $skill,
  $slot,
  ChateauMantegna,
  get,
  have,
  set,
  TunnelOfLove,
  Witchess,
  getRemainingStomach,
  getRemainingLiver,
  $items,
  $slots,
  getRemainingSpleen,
  property,
} from 'libram';
import { fillAsdonMartinTo } from './asdon';
import { adventureMacro, Macro, withMacro } from './combat';
import { getItem, inClan, log, LogLevel, minimumRelevantBuff, setChoice, setChoices } from './lib';

//const FREE_FIGHT_COST = 40000; // TODO: don't hardcode this
const FREE_FIGHT_COST = get<number>('freeFightValue');
const FREE_FIGHT_COPY_TARGET = toMonster(get('freeCopyFight'));
const MINIMUM_BUFF_TURNS = get<number>('freeBuffThreshold');

let debug = function (message: string) {
  log(LogLevel.Debug, message, 'red');
};

function maybeBjorn(f: Familiar) {
  if (equippedAmount($item`buddy bjorn`) > 0 && myBjornedFamiliar() != f) {
    bjornifyFamiliar(f);
  }
}

function maybeEnthrone(f: Familiar) {
  if (equippedAmount($item`crown of thrones`) > 0 && myEnthronedFamiliar() != f) {
    enthroneFamiliar(f);
  }
}
function heavyRainFreeFights() {
  while (myLightning() >= 20) {
    withMacro(Macro.tentacle().skill($skill`lightning strike`), () => use($item`drum machine`));
  }
  while (myRain() >= 50) {
    setPropertyMafia('choiceAdventure970', `1&whichmonster=${FREE_FIGHT_COPY_TARGET.id}`);
    withMacro(Macro.tentacle().spellKill(), () => useSkill($skill`Rain Man`));
  }
}

function bustGhost() {
  if (have($item`protonic accelerator pack`) && get('questPAGhost') !== 'unstarted') {
    let ghostLocation = get('ghostLocation');
    if (ghostLocation && ghostLocation != $location`none`) {
      adventureMacro(ghostLocation, Macro.tentacle().perpetualStasis());
    }
  }
}

function outfit() {
  $slots`hat,back,shirt,weapon,offhand,pants,acc1,acc2,acc3`.forEach(slot => equip(slot, toItem(get(`free.${slot}`))));
  if (myFamiliar() !== $familiar`none` && myFamiliar() !== $familiar`Comma Chameleon`) {
    equip($slot`familiar`, toItem(get('free.familiar')));
  }
  if (
    have($item`protonic accelerator pack`) &&
    totalTurnsPlayed() > get('nextParanormalActivity') &&
    get('questPAGhost') === 'unstarted'
  ) {
    equip($slot`back`, $item`protonic accelerator pack`);
  }
}

let steps: Array<(skiplist: Array<string>, list: boolean) => void> = [];
let finalSteps: Array<(skiplist: Array<string>, list: boolean) => void> = [];
let postSteps: Array<() => void> = [];

function step(name: string, condition: () => boolean | null | undefined, setup?: () => void, before?: () => void) {
  return function (step_fun: () => void) {
    let wrappedStep = function (skiplist: Array<string>, list: boolean) {
      if (list) {
        log(LogLevel.None, `${name}`);
      } else if (skiplist.indexOf(name) === -1) {
        log(LogLevel.Info, `executing ${name}`);
        if (before) before();
        if (condition()) {
          pickFreeFightFamiliar();
          outfit();

          maybeBjorn($familiar`Golden Monkey`);
          maybeEnthrone($familiar`Warbear Drone`);

          if (setup) setup();

          let infiniteLoopCheck = 0;

          while (condition()) {
            step_fun();
            refreshComma(); // this will only refresh if the active familiar is comma chameleon
            infiniteLoopCheck += 1;
            if (infiniteLoopCheck == 100) {
              throw `${name} encountered an infinite loop (maybe?)`;
            }
          }

          postSteps.forEach(post_step_cb => {
            pickFreeFightFamiliar();
            outfit();
            post_step_cb();
          });
        }
      } else {
        log(LogLevel.Info, `skipping ${name}`);
      }
    };
    if (name.startsWith('final')) {
      finalSteps.push(wrappedStep);
    } else {
      steps.push(wrappedStep);
    }
  };
}

postSteps.push(heavyRainFreeFights);
postSteps.push(bustGhost);

function maybeMacro(property: string, target: Item) {
  if (!get(property)) retrieveItem(1, target);
  return Macro.externalIf(!get<boolean>(property) && availableAmount(target) > 0, Macro.item(target));
}

function refreshComma() {
  if (myFamiliar() === $familiar`Comma Chameleon`) {
    visitUrl('charpane.php');
    cliExecute('refresh inv');
    if (get('commaFamiliar') !== 'Feather Boa Constrictor') {
      // borrowed from phyllis
      visitUrl('charpane.php');
      cliExecute('refresh inv');
      visitUrl('inv_equip.php?pwd&action=equip&whichitem=962');
      visitUrl('charpane.php');
      cliExecute('refresh inv');
    }
  }
}

function pickFreeFightFamiliar() {
  let [minEffect, minTurns] = minimumRelevantBuff();

  log(LogLevel.Info, `${minEffect} Has ${minTurns} turns`);

  if (minTurns >= MINIMUM_BUFF_TURNS) {
    let freeFightFamiliar = toFamiliar(get('freeStasisFamiliar'));
    log(LogLevel.Debug, `Free Fight Familiar: ${freeFightFamiliar}`);
    useFamiliar(freeFightFamiliar);
    refreshComma();
  } else {
    useFamiliar($familiar`Unspeakachu`);
    equip($slot`familiar`, $item`ittah bittah hookah`);
  }
}

function drumMachineWithMacro(macro: Macro) {
  withMacro(Macro.tentacle().maybeStasis().step(macro).abort(), () => use($item`drum machine`));
}

class SpookyPutty {
  static hasCopies() {
    // TODO: add support for all the spooky items here
    log(LogLevel.Debug, `Foldable Copies: ${get('spookyPuttyCopiesMade') + get('_raindohCopiesMade')}`);
    return get('spookyPuttyCopiesMade') + get('_raindohCopiesMade') < 6;
  }

  static copyMacro() {
    if (get('spookyPuttyCopiesMade') < 5) {
      return Macro.item('spooky putty sheet');
    } else if (get('_raindohCopiesMade') == 0) {
      return Macro.item('Rain-doh black box');
    } else {
      return Macro.abort();
    }
  }

  static maybeMacro() {
    return Macro.externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro());
  }

  static hasFight() {
    return availableAmount($item`spooky putty monster`) + availableAmount($item`Rain-Doh box full of monster`) > 0;
  }

  static fight() {
    if (availableAmount($item`spooky putty monster`) > 0) {
      use($item`spooky putty monster`);
    } else if (availableAmount($item`Rain-Doh box full of monster`) > 0) {
      use($item`Rain-Doh box full of monster`);
    } else {
      throw 'No monster to fight';
    }
  }
}

class DrunkPygmy {
  static freeBanishes() {
    return get('_drunkPygmyBanishes') < 10;
  }

  static setupSaber() {
    if (have($item`miniature crystal ball`) && get('_drunkPygmyBanishes') == 10) {
      DrunkPygmy.setupFreeFight();
      useFamiliar($familiar`unspeakachu`);
      equip($slot`familiar`, $item`miniature crystal ball`);
    } else {
      if (have($item`miniature crystal ball`)) {
        useFamiliar($familiar`unspeakachu`);
        equip($slot`familiar`, $item`miniature crystal ball`);
      }
      putCloset(itemAmount($item`Bowl of Scorpions`), $item`Bowl of Scorpions`);
      equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
    }
  }

  static setupFreeFight(fights?: number) {
    fights ||= 1;
    putCloset(itemAmount($item`bowling ball`), $item`bowling ball`);
    retrieveItem(fights, $item`Bowl of Scorpions`);
  }

  static didSaber() {
    return (
      get('questL11Worship') !== 'unstarted' &&
      getProperty('_saberForceMonster') === 'drunk pygmy' &&
      get('_saberForceMonsterCount') > 0
    );
  }
}

enum SaberUpgrade {
  Unupgraded = 0,
  Regen = 1,
  MonsterLevel = 2,
  Resistance = 3,
  FamiliarWeight = 4,
}
class CosplaySaber {
  static upgradedToday() {
    return get('_saberMod') != 0;
  }

  static getUpgrade() {
    switch (get('_saberMod')) {
      case 0:
        return SaberUpgrade.Unupgraded;
      case 1:
        return SaberUpgrade.Regen;
      case 2:
        return SaberUpgrade.MonsterLevel;
      case 3:
        return SaberUpgrade.Resistance;
      case 4:
        return SaberUpgrade.FamiliarWeight;
    }
    throw `Invalid Saber Mode ${get('_saberMod')}`;
  }

  static canGive(mode: SaberUpgrade) {
    let currentUpgrade = CosplaySaber.getUpgrade();
    return (
      have($item`Fourth of May Cosplay Saber`) && (currentUpgrade === SaberUpgrade.Unupgraded || currentUpgrade == mode)
    );
  }

  static upgrade(mode: SaberUpgrade) {
    if (have($item`Fourth of May Cosplay Saber`) && CosplaySaber.getUpgrade() == SaberUpgrade.Unupgraded) {
      setChoice(1386, mode);
      visitUrl('main.php?action=may4');
      if (handlingChoice()) runChoice(mode);
      setChoice(1386, 0);
    }
  }
}

class FreeKill {
  static hasFreeKills() {
    return (
      !get('_gingerbreadMobHitUsed') ||
      get('_shatteringPunchUsed') < 3 ||
      (have($item`replica bat-oomerang`) && get('_usedReplicaBatoomerang') < 3) ||
      availableAmount($item`Superduperheated metal`) > 0 ||
      availableAmount($item`Daily Affirmation: Think Win-Lose`) > 0
    );
  }

  static maybeMacro() {
    return Macro.externalIf(!get('_gingerbreadMobHitUsed'), Macro.skill($skill`gingerbread mob hit`))
      .externalIf(get('_shatteringPunchUsed') < 3, Macro.skill($skill`shattering punch`))
      .externalIf(
        have($item`replica bat-oomerang`) && get('_usedReplicaBatoomerang') < 3,
        Macro.item($item`replica bat-oomerang`)
      )
      .externalIf(availableAmount($item`Superduperheated metal`) > 0, Macro.item($item`Superduperheated metal`))
      .externalIf(
        availableAmount($item`Daily Affirmation: Think Win-Lose`) > 0,
        Macro.item($item`Daily Affirmation: Think Win-Lose`)
      );
  }
}

let withEquip = (slot: Slot, item: Item, action: () => void) => {
  let originalItem = equippedItem(slot);
  equip(slot, item);
  action();
  equip(slot, originalItem);
};

class FreeRun {
  static hasFreeRuns() {
    debug(`Navel ${get('_navelRunaways') < 3}`);
    debug(`V Mask ${have($item`V for Vivala Mask`) && !get('_vmaskBanisherUsed')}`);
    debug(`Stinky Cheese ${have($item`stinky cheese eye`) && !get('_stinkyCheeseBanisherUsed')}`);
    debug(`Lil' Doctor Bag ${have($item`Lil' Doctor™ bag`) && get('_reflexHammerUsed') < 3}`);
    debug(`snokebomb ${have($skill`snokebomb`) && get('_snokebombUsed') < 3}`);
    debug(`hatred ${have($skill`Feel Hatred`) && get('_feelHatredUsed') < 3}`);
    debug(`KGB ${have($item`Kremlin's Greatest Briefcase`) && get('_kgbTranquilizerDartUses') < 3}`);
    debug(`MMFR ${have($item`mafia middle finger ring`) && !get('_mafiaMiddleFingerRingUsed')}`);
    debug(`nano ${have($familiar`nanorhino`) && get('_nanorhinoCharge') == 100}`);
    return (
      get('_navelRunaways') < 3 ||
      (have($item`V for Vivala Mask`) && !get('_vmaskBanisherUsed')) ||
      (have($item`stinky cheese eye`) && !get('_stinkyCheeseBanisherUsed')) ||
      (have($item`Lil' Doctor™ bag`) && get('_reflexHammerUsed') < 3) ||
      (have($skill`snokebomb`) && get('_snokebombUsed') < 3) ||
      (have($skill`Feel Hatred`) && get('_feelHatredUsed') < 3) ||
      (have($item`Kremlin's Greatest Briefcase`) && get('_kgbTranquilizerDartUses') < 3) ||
      (have($item`mafia middle finger ring`) && !get('_mafiaMiddleFingerRingUsed')) ||
      (have($familiar`nanorhino`) && get('_nanorhinoCharge') == 100)
    );
  }

  static maybeMacro() {
    return Macro.externalIf(
      equippedAmount($item`navel ring of navel gazing`) + equippedAmount($item`greatest american pants`) > 0 &&
        get('_navelRunaways') < 3,
      Macro.step('runaway')
    )
      .externalIf(
        availableAmount($item`peppermint parasol`) > 0 && get('_navelRunaways') < 3,
        Macro.item($item`peppermint parasol`)
      )
      .externalIf(have($skill`snokebomb`) && get('_snokebombUsed') < 3, Macro.skill($skill`snokebomb`))
      .externalIf(have($skill`Feel Hatred`) && get('_feelHatredUsed') < 3, Macro.skill($skill`Feel Hatred`))
      .externalIf(
        equippedAmount($item`V for Vivala Mask`) > 0 && !get('_vmaskBanisherUsed'),
        Macro.skill($skill`Creepy Grin`)
      )
      .externalIf(
        equippedAmount($item`stinky cheese eye`) > 0 && !get('_stinkyCheeseBanisherUsed'),
        Macro.skill($skill`Give Your Opponent the Stinkeye`)
      )
      .externalIf(
        equippedAmount($item`Lil' Doctor™ bag`) > 0 && get('_reflexHammerUsed') < 3,
        Macro.skill($skill`Reflex Hammer`)
      )
      .externalIf(
        equippedAmount($item`Kremlin's Greatest Briefcase`) > 0 && get('_kgbTranquilizerDartUses') < 3,
        Macro.skill($skill`KGB tranquilizer dart`)
      )
      .externalIf(
        equippedAmount($item`mafia middle finger ring`) > 0 && !get('_mafiaMiddleFingerRingUsed'),
        Macro.skill($skill`Show them your ring`)
      )
      .externalIf(
        myFamiliar() == $familiar`nanorhino` && get('_nanorhinoCharge') == 100,
        Macro.externalIf(!have($effect`Nanobrawny`), Macro.skill($skill`shell up`)).skill($skill`Unleash Nanites`)
      )
      .abort();
  }

  static wrapFreeRun(action: () => void) {
    if (get('_navelRunaways') < 3) {
      if (have($item`greatest american pants`) && !have($effect`Super Vision`)) {
        withEquip($slot`pants`, $item`greatest american pants`, action);
      } else if (have($item`navel ring of navel gazing`)) {
        withEquip($slot`acc3`, $item`navel ring of navel gazing`, action);
      } else {
        retrieveItem($item`peppermint parasol`);
        action();
      }
    } else if (have($item`V for Vivala Mask`) && !get('_vmaskBanisherUsed')) {
      withEquip($slot`acc3`, $item`V for Vivala Mask`, action);
    } else if (have($item`stinky cheese eye`) && !get('_stinkyCheeseBanisherUsed')) {
      withEquip($slot`acc3`, $item`stinky cheese eye`, action);
    } else if (have($item`Lil' Doctor™ bag`) && get('_reflexHammerUsed') < 3) {
      withEquip($slot`acc3`, $item`Lil' Doctor™ bag`, action);
    } else if (have($item`Kremlin's Greatest Briefcase`) && get('_kgbTranquilizerDartUses') < 3) {
      withEquip($slot`acc3`, $item`Kremlin's Greatest Briefcase`, action);
    } else if (have($item`mafia middle finger ring`) && !get('_mafiaMiddleFingerRingUsed')) {
      withEquip($slot`acc3`, $item`mafia middle finger ring`, action);
    } else if (have($familiar`nanorhino`) && get('_nanorhinoCharge') == 100) {
      let f = myFamiliar();
      useFamiliar($familiar`nanorhino`);
      action();
      useFamiliar(f);
    } else {
      action();
    }
  }
}

class GingerbreadCity {
  static retailUnlocked() {
    return get('gingerRetailUnlocked');
  }

  static totalTurns() {
    return get('gingerbreadCityAvailable') ? (get('gingerExtraAdventures') ? 30 : 20) : 0;
  }

  static turnsToday() {
    return get('_gingerbreadCityTurns');
  }

  static turnsLeft() {
    return GingerbreadCity.totalTurns() - get('_gingerbreadCityTurns');
  }

  static hasTurns() {
    return get('gingerbreadCityAvailable') && GingerbreadCity.turnsLeft() > 0;
  }

  static isNoon() {
    return GingerbreadCity.turnsToday() == 9;
  }

  static isMidnight() {
    return GingerbreadCity.turnsToday() == 19;
  }
}

step('rollover resources', () => myRain() >= 50 || myLightning() >= 20)(heavyRainFreeFights);

step(
  'chateau',
  () =>
    ChateauMantegna.have() &&
    !ChateauMantegna.paintingFought() &&
    ChateauMantegna.paintingMonster()?.attributes?.includes('FREE'),
  () => {
    useFamiliar($familiar`Pocket Professor`);
    equip($slot`familiar`, $item`Pocket Professor Memory Chip`);
  }
)(() => {
  withMacro(Macro.tentacle().professor().spellKill(), () => ChateauMantegna.fightPainting());
});

step(
  'fax',
  () => !get('_photocopyUsed'),
  () => inClan(get('faxClan'), () => faxbot(FREE_FIGHT_COPY_TARGET, 'Cheesefax'))
)(() => {
  withMacro(
    Macro.tentacle()
      .step(maybeMacro('_iceSculptureUsed', $item`unfinished ice sculpture`))
      .step(maybeMacro('_cameraUsed', $item`4-d camera`))
      .step(SpookyPutty.maybeMacro())
      .maybeStasis()
      .spellKill(),
    () => use($item`photocopied monster`)
  );
});

step('spooky putty', () => SpookyPutty.hasFight())(() => {
  withMacro(
    Macro.tentacle(Macro.externalIf(get('_feelNostalgicUsed') < 3, Macro.skill($skill`Feel Nostalgic`)))
      .externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro())
      .maybeStasis()
      .spellKill(),
    () => SpookyPutty.fight()
  );
});

step('camera', () => have($item`shaking 4-d camera`))(() => {
  withMacro(Macro.tentacle().maybeStasis().spellKill(), () => use($item`shaking 4-d camera`));
});

step('sculpture', () => have($item`ice sculpture`))(() => {
  withMacro(Macro.tentacle().maybeStasis().spellKill(), () => use($item`ice sculpture`));
});

step(
  'forest tentacle',
  () => get('questL02Larva') !== 'unstarted' && !get('_eldritchTentacleFought')
)(() => {
  visitUrl('place.php?whichplace=forestvillage&action=fv_scientist', false);
  if (!handlingChoice()) throw 'No choice?';
  let options = availableChoiceOptions();
  let choice = [1, 2, 3, 4, 5].find(i => options[i] == 'Can I fight that tentacle you saved for science?') || 0;
  if (choice) {
    withMacro(Macro.tentacle().spellKill(), () => runChoice(choice));
  }
});

step(
  'summon tentacle',
  () => have($skill`Evoke Eldritch Horror`) && !get('_eldritchHorrorEvoked')
)(() => {
  withMacro(Macro.tentacle().spellKill(), () => useSkill($skill`Evoke Eldritch Horror`));
});

step(
  'lynrd snares',
  () => get('_lynyrdSnareUses') < 3
)(() => {
  withMacro(Macro.tentacle().spellKill(), () => use($item`lynyrd snare`));
});

step(
  'bricko',
  () => get('_brickoFights') < 10,
  () => cliExecute('acquire 10 BRICKO ooze')
)(() => {
  withMacro(Macro.tentacle().spellKill(), () => use($item`BRICKO ooze`));
});

step('drunk pygmies', () => DrunkPygmy.freeBanishes())(() => {
  DrunkPygmy.setupFreeFight();
  adventureMacro(
    $location`The Hidden Bowling Alley`,
    Macro.tentacle()
      .if_('monstername pygmy bowler', Macro.skill($skill`Feel Hatred`))
      .if_('monstername pygmy orderlies', Macro.skill($skill`Snokebomb`))
      .abort()
  );
});

step(
  'drunk pygmy initial saber',
  () =>
    get('_saberForceUses') == 0 &&
    (get('_drunkPygmyBanishes') < 11 || getProperty('crystalBallMonster') === 'drunk pygmy'),
  () => setChoice(1387, 2)
)(() => {
  DrunkPygmy.setupSaber();
  adventureMacro(
    $location`The Hidden Bowling Alley`,
    Macro.tentacle()
      .externalIf(equippedAmount($item`Fourth of May Cosplay Saber`) > 0, Macro.skill('Use the Force'))
      .abort()
  );
});

step('drunk pygmy saber copies', () => DrunkPygmy.didSaber())(() => {
  DrunkPygmy.setupFreeFight(2);
  adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
  adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
  putCloset(itemAmount($item`Bowl of Scorpions`), $item`Bowl of Scorpions`);
  if (get('_saberForceUses') < 5) {
    log(LogLevel.Debug, 'Sabering pygmies');
    equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
    adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().skill('Use the Force'));
  } else {
    log(LogLevel.Debug, 'Just killing pygmies');
    DrunkPygmy.setupFreeFight(1);
    adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
  }
});

step(
  'drunk pygmy time-spinner',
  () => 10 - get('_timeSpinnerMinutesUsed') > 3,
  () => {
    setChoice(1195, 1);
    set<string>('choiceAdventure1196', `1&monid=${$monster`drunk pygmy`.id}`);
  }
)(() => {
  retrieveItem(1, $item`Bowl of Scorpions`);
  withMacro(Macro.tentacle().abort(), () => {
    use($item`time-spinner`);
  });
});

step(
  'glark cables',
  () => ['step3', 'finished'].includes(get('questL11Ron')) && get('_glarkCableUses') < 5,
  () => getItem(5 - get('_glarkCableUses'), $item`glark cable`, FREE_FIGHT_COST)
)(() => {
  adventureMacro($location`The Red Zeppelin`, Macro.tentacle().item($item`glark cable`));
});

step(
  'Kramco',
  () => get('_sausageFights') == 0,
  () => equip($slot`off-hand`, $item`Kramco Sausage-o-Matic™`)
)(() => {
  adventureMacro($location`Noob Cave`, Macro.tentacle().spellKill());
});

step(
  'free kills',
  () => FreeKill.hasFreeKills(),
  () => pickFreeFightFamiliar(),
  () => {
    buy(100, $item`Daily Affirmation: Think Win-Lose`, FREE_FIGHT_COST);
    buy(100, $item`Superduperheated Metal`, FREE_FIGHT_COST);
  }
)(() => {
  drumMachineWithMacro(FreeKill.maybeMacro());
});

step(
  'jokester',
  () => !get('_firedJokestersGun'),
  () => {
    equip($slot`weapon`, $item`The Jokester's gun`);
    pickFreeFightFamiliar();
  }
)(() => {
  drumMachineWithMacro(Macro.trySkill($skill`Fire the Jokester's Gun`));
});

step(
  'chest x-ray',
  () => get('_chestXRayUsed') < 3,
  () => {
    equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    pickFreeFightFamiliar();
  }
)(() => {
  drumMachineWithMacro(Macro.trySkill($skill`Chest X-Ray`));
});

step(
  'powdered madness',
  () => get('_powderedMadnessUses') < 5 && mallPrice($item`powdered madness`) < FREE_FIGHT_COST,
  () => pickFreeFightFamiliar(),
  () => getItem(5 - get('_powderedMadnessUses'), $item`powdered madness`, FREE_FIGHT_COST)
)(() => {
  drumMachineWithMacro(Macro.item($item`powdered madness`));
});

step(
  'asdon martin',
  () => !get('_missileLauncherUsed') && getCampground()['Asdon Martin keyfob'] !== undefined,
  () => {
    fillAsdonMartinTo(100);
    pickFreeFightFamiliar();
  }
)(() => {
  drumMachineWithMacro(Macro.skill($skill`Asdon Martin: Missile Launcher`));
});

step(
  'never-ending party',
  () => get('_neverendingPartyFreeTurns') < 10,
  () =>
    setChoices(
      new Map([
        [1322, 2],
        [1324, 5],
      ])
    )
)(() => {
  adventureMacro($location`The Neverending Party`, Macro.tentacle().spellKill());
});

step(
  'snojo',
  () => get('_snojoFreeFights') < 10
)(() => {
  adventureMacro($location`The X-32-F Combat Training Snowman`, Macro.tentacle().spellKill());
});

step(
  'mushroom garden',
  () =>
    (getCampground()['packet of mushroom spores'] !== undefined &&
      get('_mushroomGardenFights') === 0 &&
      get('_sourceTerminalPortscanUses') == 0) ||
    getCounters('portscan.edu', 0, 0) === 'portscan.edu',
  () => cliExecute('terminal educate portscan')
)(() => {
  adventureMacro(
    $location`Your Mushroom Garden`,
    Macro.tentacle()
      .if_('monstername government agent', Macro.skill('Macrometeorite'))
      .if_('!monstername piranha plant', Macro.abort())
      .trySkill('Portscan')
      .spellKill()
  );
});

step(
  'LOV',
  () => !TunnelOfLove.isUsed()
)(() => {
  const effect = have($effect`Wandering Eye Surgery`) ? 'Open Heart Surgery' : 'Wandering Eye Surgery';
  withMacro(Macro.tentacle().spellKill(), () =>
    TunnelOfLove.fightAll('LOV Epaulettes', effect, 'LOV Extraterrestrial Chocolate')
  );

  if (handlingChoice()) throw 'Did not get all the way through LOV.';
  visitUrl('choice.php');
  if (handlingChoice()) throw 'Did not get all the way through LOV.';
});

step(
  'power pill',
  () =>
    (have($familiar`puck man`) || have($familiar`ms. puck man`)) &&
    get('_powerPillUses') < 20 &&
    availableAmount($item`power pill`) > 0,
  () => {
    if (have($familiar`puck man`)) {
      useFamiliar($familiar`puck man`);
      equip($slot`familiar`, $item`orange boxing gloves`);
    } else {
      useFamiliar($familiar`ms. puck man`);
      equip($slot`familiar`, $item`blue pumps`);
    }
  },
  () => {
    if (have($familiar`puck man`) || have($familiar`ms. puck man`)) {
      getItem(
        Math.max(0, 20 - get('_powerPillUses') - availableAmount($item`power pill`)),
        $item`power pill`,
        FREE_FIGHT_COST
      );
    }
  }
)(() => {
  drumMachineWithMacro(Macro.item($item`power pill`));
});

step(
  'gingerbread city',
  () => GingerbreadCity.retailUnlocked() && GingerbreadCity.hasTurns() && have($item`gingerbread cigarette`),
  () => {},
  () => getItem(GingerbreadCity.turnsLeft(), $item`gingerbread cigarette`, FREE_FIGHT_COST)
)(() => {
  if (GingerbreadCity.isNoon()) {
    setChoice(1204, 1); // find candy
    adv1($location`Gingerbread Train Station`, 1, '');
  } else if (GingerbreadCity.isMidnight()) {
    setChoice(1203, 4); // buy cigarettes
    adv1($location`Gingerbread Civic Center`, 1, '');
  } else {
    adventureMacro(
      $location`Gingerbread Upscale Retail District`,
      Macro.tentacle()
        .maybeStasis()
        .item($item`gingerbread cigarette`)
        .abort()
    );
  }
});

step(
  'deep machine tunnels',
  () => get('_machineTunnelsAdv') < 5,
  () => useFamiliar($familiar`machine elf`)
)(() => {
  adventureMacro($location`Deep Machine Tunnels`, Macro.tentacle().spellKill());
});

step(
  'witchess',
  () => Witchess.fightsDone() < 5
)(() => {
  withMacro(Macro.tentacle().maybeStasis().spellKill(), () => Witchess.fightPiece($monster`Witchess Bishop`));
});

step(
  'goth kid fishing',
  () => have($item`mayfly bait necklace`) && get('_mayflySummons') < 30 && get('_hipsterAdv') < 7,
  () => {
    useFamiliar($familiar`Artistic Goth Kid`);
    equip($slot`acc3`, $item`mayfly bait necklace`);
  }
)(() => {
  adventureMacro(
    $location`Menagerie Level 1`,
    Macro.tentacle()
      .if_('monstername fruit golem', Macro.trySkill($skill`Feel Hatred`).abort())
      .if_('monstername knob goblin mutant', Macro.trySkill($skill`Snokebomb`).abort())
      .if_('monstername basic elemental', Macro.trySkill($skill`Summon Mayfly Swarm`).abort())
      .spellKill()
  );
});

step('final end of day resources', () => myRain() >= 50 || myLightning() >= 20)(heavyRainFreeFights);

step(
  'final goth kid fishing',
  () => get('_hipsterAdv') < 7 && FreeRun.hasFreeRuns(),
  () => useFamiliar($familiar`Artistic Goth Kid`)
)(() => {
  FreeRun.wrapFreeRun(() => {
    adventureMacro(
      $location`Menagerie Level 1`,
      Macro.tentacle().if_('monstername black crayon*', Macro.spellKill()).step(FreeRun.maybeMacro()).abort()
    );
  });
});

step(
  'final kramco free run fishing',
  () => FreeRun.hasFreeRuns(),
  () => equip($item`Kramco Sausage-o-Matic™`)
)(() => {
  FreeRun.wrapFreeRun(() => {
    adventureMacro(
      $location`Menagerie Level 1`,
      Macro.tentacle().kramco(Macro.maybeStasis()).step(FreeRun.maybeMacro()).abort()
    );
  });
});

function maxFamiliarRuns() {
  return Math.floor((familiarWeight($familiar`Pair of Stomping Boots`) + weightAdjustment()) / 5);
}

step(
  'final kramco familiar fishing',
  () =>
    get('_banderRunaways') < maxFamiliarRuns() ||
    (CosplaySaber.canGive(SaberUpgrade.FamiliarWeight) &&
      equippedAmount($item`Fourth of May Cosplay Saber`) === 0 &&
      get('_banderRunaways') == maxFamiliarRuns()),
  () => {
    useFamiliar($familiar`Pair of Stomping Boots`);
    equip($item`Kramco Sausage-o-Matic™`);
  }
)(() => {
  if (get('_mayflySummons') < 30) {
    equip($slot`acc3`, $item`mayfly bait necklace`);
  }
  if (
    get('_banderRunaways') == maxFamiliarRuns() &&
    equippedAmount($item`Fourth of May Cosplay Saber`) == 0 &&
    CosplaySaber.canGive(SaberUpgrade.FamiliarWeight)
  ) {
    CosplaySaber.upgrade(SaberUpgrade.FamiliarWeight);
    equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
  }
  adventureMacro(
    $location`Menagerie Level 1`,
    Macro.tentacle()
      .kramco(Macro.externalIf(get('bootsCharged'), Macro.skill($skill`Release The Boots`)))
      .externalIf(
        get('_mayflySummons') < 30,
        Macro.if_('monstername basic elemental', Macro.trySkill($skill`Summon Mayfly Swarm`).abort())
      )
      .step('runaway')
  );
});

step(
  'final asdon martin',
  () =>
    (!get('_missileLauncherUsed') && getCampground()['Asdon Martin keyfob'] !== undefined) ||
    (!get('_workshedItemUsed') && have($item`Asdon Martin keyfob`)),
  () => {
    if (getCampground()['Asdon Martin keyfob'] === undefined) {
      use($item`Asdon Martin keyfob`);
    }
    fillAsdonMartinTo(100);
  }
)(() => {
  drumMachineWithMacro(Macro.skill($skill`Asdon Martin: Missile Launcher`));
});

step(
  'pill keeper embezzlers',
  () => getRemainingSpleen() >= 3 && property.getBoolean('spendTurns', false) && have($familiar`Robortender`),
  () => {
    useFamiliar($familiar`robortender`);
    if (!get('_roboDrinks').includes('drive-by shooting')) {
      retrieveItem(1, $item`drive-by shooting`);
      cliExecute('robo drive-by shooting');
    }
    maximize("meat +equip thor's pliers +equip mafia pointer finger ring", false);
  }
)(() => {
  cliExecute('pillkeeper semirare');
  adventureMacro(
    $location`Cobb's Knob Treasury`,
    Macro.tentacle().if_('monstername Knob Goblin Embezzler', Macro.spellKill()).abort()
  );
});

export function main(argString = '') {
  let skiplist = argString.split(';').map(s => s.trim());
  if (!have($effect`Steely-Eyed Squint`)) throw 'Get Squint first!';
  if (!have($effect`Eldritch Attunement`)) throw 'Get Eldritch Attunement first!';

  cliExecute('mood apathetic');
  cliExecute('ccs bkfights');
  if (get('sourceTerminalEducate1') !== 'digitize.edu' || get('sourceTerminalEducate2') !== 'extract.edu') {
    cliExecute('terminal educate digitize; terminal educate extract');
  }
  set('hpAutoRecovery', 0.8);
  set('hpAutoRecoveryTarget', 0.95);

  if (skiplist.length > 0 && skiplist[0] == 'list') {
    finalSteps.forEach(step_cb => step_cb(skiplist, true));
    steps.forEach(step_cb => step_cb(skiplist, true));
  } else if (skiplist.includes('final')) {
    finalSteps.forEach(step_cb => step_cb(skiplist, false));
  } else {
    steps.forEach(step_cb => step_cb(skiplist, false));
  }
}
