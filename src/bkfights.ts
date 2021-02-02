import {
  availableAmount,
  cliExecute,
  cliExecuteOutput,
  equip,
  faxbot,
  getCampground,
  getClanName,
  getCounters,
  handlingChoice,
  itemAmount,
  mallPrice,
  myAscensions,
  myClass,
  myLightning,
  myRain,
  outfit,
  print,
  putCloset,
  putStash,
  retrieveItem,
  runChoice,
  takeStash,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
  setProperty as setPropertyMafia,
  abort as mafiaAbort,
  haveFamiliar,
  adv1,
  myPath,
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
  banishedMonsters,
  property,
} from 'libram';
import { abort } from 'process';
import { fillAsdonMartinTo } from './asdon';
import { adventureMacro, Macro, withMacro } from './combat';
import { getItem, setChoice, setChoices } from './lib';
import { setClan } from './wl';

export function withStash<T>(itemsToTake: Item[], action: () => T) {
  if (itemsToTake.every(item => availableAmount(item) > 0)) return action();

  const stashClanName = get<string>('stashClan');
  if (stashClanName === '') return null;

  const startingClanName = getClanName();
  setClan(stashClanName);
  if (getClanName() !== stashClanName) throw "Wrong clan! Don't take stuff out of the stash here!";
  const quantitiesTaken = new Map<Item, number>();
  try {
    for (const item of itemsToTake) {
      if (getClanName() !== stashClanName) throw "Wrong clan! Don't take stuff out of the stash here!";
      const succeeded = takeStash(1, item);
      if (succeeded) {
        print(`Took ${item.plural} from stash.`, 'blue');
        quantitiesTaken.set(item, (quantitiesTaken.get(item) ?? 0) + (succeeded ? 1 : 0));
      }
    }
    return action();
  } finally {
    for (const [item, quantityTaken] of quantitiesTaken.entries()) {
      // eslint-disable-next-line no-unsafe-finally
      if (getClanName() !== stashClanName) throw "Wrong clan! Don't put stuff back in the stash here!";
      retrieveItem(quantityTaken, item);
      putStash(quantityTaken, item);
      print(`Returned ${quantityTaken} ${item.plural} to stash.`, 'blue');
    }
    setClan(startingClanName);
  }
}

let steps: Array<string> = []; 

function dec() {
  print("dec"); 
  return function(t: any, pk: string, d: PropertyDescriptor) {
    print(t);
    print(pk); 
  }
}

class Test {
  @dec()
  test() {

  }
}

let t = new Test(); 
t.test(); 

function step(condition: () => boolean | null | undefined, setup?: () => void, before?: () => void) {
  //print("STEP")
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    //print(target);
    //print(propertyKey);
    //print(descriptor);
    steps.push(propertyKey); 
    let method = descriptor.value; 
    descriptor.value = function() {
      if(before) before(); 
      if(condition()) {
        if(setup) setup();

        while(condition()) {
          method();
        }

        while(myLightning() >= 20) {
          withMacro(
            Macro.tentacle()
            .skill($skill`lightning strike`),
            () => use($item`drum machine`)
          );
        }
        while(myRain() >= 50) {
          setPropertyMafia('choiceAdventure970', `1&whichmonster=${FREE_FIGHT_COPY_TARGET.id}`);
          withMacro(
            Macro.tentacle().spellKill(), 
            () => useSkill($skill`Rain Man`)
          )
        }
      }
    }
  }
}

function has(target: Item) {
  return availableAmount(target) > 0; 
}

const HEAVY_RAIN = myPath() == "Heavy Rains"; 
const PROFESSOR_COPIES = true; 
const FREE_FIGHT_COST = 40000; // TODO: don't hardcode this
let FREE_FIGHT_COPY_TARGET = $monster`Witchess Bishop`; 

if (!have($effect`Steely-Eyed Squint`)) throw 'Get Squint first!';
if (!have($effect`Eldritch Attunement`)) throw 'Get Eldritch Attunement first!';

cliExecute('mood apathetic');
cliExecute('ccs bkfights');
if (get('sourceTerminalEducate1') !== 'digitize.edu' || get('sourceTerminalEducate2') !== 'extract.edu') {
  cliExecute('terminal educate digitize; terminal educate extract');
}
set('hpAutoRecovery', 0.8);
set('hpAutoRecoveryTarget', 0.95);


function maybeMacro(property: string, target: Item) {
  if(!get(property)) retrieveItem(1, target);
  return Macro.externalIf(get<boolean>(property) && availableAmount(target) > 0, Macro.item(target)); 
}

function drumMachineWithMacro(macro: Macro) {
  withMacro(Macro.tentacle().step(macro).abort(), () => use($item`drum machine`));
}

class SpookyPutty {
  static hasCopies() {
    // TODO: add support for all the spooky items here

    return get('spookyPuttyCopiesMade') + get('_raindohCopiesMade') < 6;
  }

  static copyMacro() {
    if(get('spookyPuttyCopiesMade') < 5) {
      return Macro.item('spooky putty sheet');
    } else if('_raindohCopiesMade') {
      return Macro.item('Rain-doh black box');
    } else {
      throw "No copier available"; 
    }
  }

  static maybeMacro() {
    return Macro.externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro());
  }

  static hasFight() {
    return availableAmount($item`spooky putty monster`) + availableAmount($item`Rain-Doh box full of monster`) > 0; 
  }

  static fight() {
    if(availableAmount($item`spooky putty monster`) > 0) {
      use($item`spooky putty monster`);
    } else if (availableAmount($item`Rain-Doh box full of monster`) > 0) {
      use($item`Rain-Doh box full of monster`);
    } else {
      throw "No monster to fight"; 
    }
  }
}

class DrunkPygmy {
  static freeBanishes() {
    return get('questL11Worship') !== 'unstarted' && (get('_drunkPygmyBanishes') < 10 || (get('_drunkPygmyBanishes') == 10 && has($item`crystal ball`)))
  }

  static shouldSaber() {
    return get('questL11Worship') !== 'unstarted' && ((get('_drunkPygmyBanishes') == 10 && !has($item`crystal ball`)) || (get('_drunkPygmyBanishes') == 11 && has($item`crystal ball`)))
  }

  static setupFreeFight(fights?: number) {
    putCloset(itemAmount($item`bowling ball`), $item`bowling ball`);
    fights ||= 1; 
    retrieveItem(fights, $item`Bowl of Scorpions`);
    if(get('_drunkPygmyBanishes') == 10 && has($item`crystal ball`)) {
      equip($slot`familiar`, $item`crystal ball`)
    }
  }

  static didSaber() {
    return get('questL11Worship') !== 'unstarted' && get('_saberForceMonster') == $monster`drunk pygmy`;
  }
}

class FreeKill {
  static hasFreeKills() {
    return get('_gingerbreadMobHitUsed') || get('_shatteringPunchUsed') < 3 || get('_usedReplicaBatoomerang') < 3 
  }

  static maybeMacro() {
    return Macro
            .externalIf(get('_gingerbreadMobHitUsed'), Macro.skill($skill`gingerbread mob hit`))
            .externalIf(get('_shatteringPunchUsed') < 3, Macro.skill($skill`shattering punch`))
            .externalIf(get('_usedReplicaBatoomerang') < 3, Macro.item($item`replica bat-oomerang`))
  }
}

class GingerbreadCity {
  static totalTurns() {
    return get('gingerExtraAdventures') ? 30 : 20; 
  }

  static turnsToday() {
    return get('_gingerbreadCityTurns');
  }

  static turnsLeft() {
    return GingerbreadCity.totalTurns() - get('_gingerbreadCityTurns'); 
  }

  static hasTurns() { 
    return GingerbreadCity.turnsLeft() > 0;
  }
}

class FreeFights {
  @step(
    () => ChateauMantegna.have() && !ChateauMantegna.paintingFought() && ChateauMantegna.paintingMonster()?.attributes?.includes('FREE'),
    () => useFamiliar($familiar`Pocket Professor`)
  )
  chateau() {
    withMacro(Macro.tentacle().professor().spellKill(), () => ChateauMantegna.fightPainting());
  }

  @step(() => !get('_photocopyUsed'), () => faxbot(FREE_FIGHT_COPY_TARGET, "Cheesefax"))
  fax() {
    withMacro(
      Macro.tentacle()
        .step(maybeMacro('_iceSculptureUsed', $item`unfinished ice sculpture`))
        .step(maybeMacro('_cameraUsed', $item`4-d camera`))
        .step(SpookyPutty.maybeMacro())
        .spellKill(),
      () => use($item`photocopied monster`)
    );
  }

  @step(() => SpookyPutty.hasFight())
  spookyPutty() {
    withMacro(
      Macro.tentacle().externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro()),
      () => SpookyPutty.fight()
    );
  }

  @step(() => has($item`shaking 4-d camera`))
  camera() {
    withMacro(Macro.tentacle().spellKill(), () => use($item`shaking 4-d camera`))
  }

  @step(() => has($item`ice sculpture`))
  sculpture() {
    withMacro(Macro.tentacle().spellKill(), () => use($item`ice sculpture`))
  }

  @step(() => get('questL02Larva') !== 'unstarted' && !get('_eldritchTentacleFought'))
  forestTentacle() {
    visitUrl('place.php?whichplace=forestvillage&action=fv_scientist', false);
    if (!handlingChoice()) throw 'No choice?';
    withMacro(Macro.tentacle().spellKill(), () => runChoice(1));
  }

  @step(() => have($skill`Evoke Eldritch Horror`) && !get('_eldritchHorrorEvoked'))
  skillTentacle() {
    withMacro(Macro.tentacle().spellKill(), () => useSkill($skill`Evoke Eldritch Horror`));
  }
  
  @step(() => get("_lynyrdSnareUses") < 3)
  lynrdSnares() {
    withMacro(Macro.tentacle().spellKill(), () => use($item`lynyrd snare`));
  }

  @step(() => get('_brickoFights') < 10)
  bricko() {
    withMacro(Macro.tentacle().spellKill(), () => use($item`BRICKO ooze`));
  }

  @step(() => DrunkPygmy.freeBanishes())
  drunkPygmy() {
    DrunkPygmy.setupFreeFight();
    adventureMacro($location`The Hidden Bowling Alley`,
      Macro.tentacle()
      .if_('monstername pygmy bowler', Macro.item($item`Louder Than Bomb`))
      .if_('monstername orderlies', Macro.skill($skill`snokebomb`))
      .abort());
  }

  @step(
    () => DrunkPygmy.shouldSaber(),
    () => {
      equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
      putCloset(itemAmount($item`bowling ball`), $item`bowling ball`);
      putCloset(itemAmount($item`Bowl of Scorpions`), $item`Bowl of Scorpions`);
      setChoice(1387, 2);
    }
  )
  drunkPygmySaberCopySetup() {
    adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().skill('Use the Force'));
  }

  @step(() => DrunkPygmy.didSaber())
  drunkPygmySaberCopy() {
    DrunkPygmy.setupFreeFight(2);
    adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
    adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
    putCloset(itemAmount($item`Bowl of Scorpions`), $item`Bowl of Scorpions`);
    adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().skill('Use the Force'));
  }

  @step(
    () => 10 - get('_timeSpinnerMinutesUsed') > 3,
    () => {
      setChoice(1195, 1);
      set<string>('choiceAdventure1196', `1&monid=${$monster`drunk pygmy`.id}`);
    }
  )
  drunkPygmyTimeSpinner() {
    retrieveItem(1, $item`Bowl of Scorpions`);
    withMacro(Macro.tentacle().abort(), () => { use($item`time-spinner`)})
  }

  @step(
    () => ['step3', 'finished'].includes(get('questL11Ron')) && get('_glarkCableUses') < 5,
    () => getItem(5 - get('_glarkCableUses'), $item`glark cable`, FREE_FIGHT_COST)
  )
  glarkCables() {
    adventureMacro($location`The Red Zeppelin`, Macro.tentacle().item($item`glark cable`));
  }

  @step(
    () => get('_sausageFights') == 0,
    () => equip($slot`off-hand`, $item`Kramco Sausage-o-Matic™`)
  )
  kramco() {
    adventureMacro($location`Noob Cave`, Macro.tentacle().spellKill());
  }

  @step(() => FreeKill.hasFreeKills())
  freeKills() {
    drumMachineWithMacro(FreeKill.maybeMacro());
  }

  @step(() => get('_firedJokestersGun'), () => equip($slot`weapon`, $item`The Jokester's gun`))
  jokester() {
    drumMachineWithMacro(Macro.trySkill($skill`Fire the Jokester's Gun`))
  }

  @step(() => get('_chestXRayUsed') < 3, () => equip($slot`acc3`, $item`Lil' Doctor™ bag`))
  chestXRay() {
    drumMachineWithMacro(Macro.trySkill($skill`Chest X-Ray`)); 
  }

  @step(() => get('_powderedMadnessUses') < 5 && mallPrice($item`powdered madness`) < FREE_FIGHT_COST, () => getItem(5 - get('_powderedMadnessUses'), $item`powdered madness`, FREE_FIGHT_COST))
  powderedMadness() {
    drumMachineWithMacro(Macro.item($item`powdered madness`));
  }

  @step(() => getCampground()['Asdon Martin keyfob'] !== undefined, () => fillAsdonMartinTo(100))
  asdon() {
    drumMachineWithMacro(Macro.skill($skill`Missle Launcher`));
  }

  @step(() => get('_neverendingPartyFreeTurns') < 10, () => setChoices(new Map([[1322, 2], [1324, 5]])))
  nep() {
    adventureMacro($location`The Neverending Party`, Macro.tentacle().spellKill());
  }

  @step(() => get('_snojoFreeFights') < 10)
  snojo() {
    adventureMacro($location`The X-32-F Combat Training Snowman`, Macro.tentacle().spellKill());
  }
 
  @step(
    () => getCampground()['packet of mushroom spores'] !== undefined && (get('_mushroomGardenFights') === 0 && get('_sourceTerminalPortscanUses') == 0) || getCounters('portscan.edu', 0, 0) === 'portscan.edu',
    () => cliExecute('terminal educate portscan')
  )
  mushroomGarden() {
    adventureMacro(
      $location`Your Mushroom Garden`,
      Macro.tentacle()
        .if_('monstername government agent', Macro.skill('Macrometeorite'))
        .if_('!monstername piranha plant', Macro.abort())
        .trySkill('Portscan')
        .spellKill()
    );
  }

  @step(
    () => TunnelOfLove.isUsed(),
    () => {}
  )
  lov() {
    const effect = have($effect`Wandering Eye Surgery`) ? 'Open Heart Surgery' : 'Wandering Eye Surgery';
    withMacro(Macro.tentacle().spellKill(), () =>
      TunnelOfLove.fightAll('LOV Epaulettes', effect, 'LOV Extraterrestrial Chocolate')
    );
  
    if (handlingChoice()) throw 'Did not get all the way through LOV.';
    visitUrl('choice.php');
    if (handlingChoice()) throw 'Did not get all the way through LOV.';
  }

  @step(
    () => get('_powerPillUses') < 20 && availableAmount($item`power pill`) > 0, 
    () => useFamiliar($familiar`puck man`), 
    () => getItem(Math.max(0, 20 - get('_powerPillUses') - availableAmount($item`power pill`)), $item`power pill`, FREE_FIGHT_COST)
  )
  powerPill() {
    drumMachineWithMacro(Macro.item($item`power pill`)); 
  }

  @step(
    () => GingerbreadCity.hasTurns() && has($item`gingerbread cigarette`), 
    () => {}, 
    () => getItem(GingerbreadCity.turnsLeft(), $item`gingerbread cigarette`, FREE_FIGHT_COST))
  gingerBreadCity() {
    if(GingerbreadCity.turnsToday() == 9) {
      setChoice(1204, 1); // for now, find out choice number later
      adv1($location`Gingerbread Train Station`, 1, ''); 
    } else if(GingerbreadCity.turnsToday() == 19) {
      setChoice(1203, 4); // for now, find out choice number later
      adv1($location`Gingerbread Civic Center`, 1, ''); 
    } else {
      adventureMacro($location`Gingerbread Upscale Retail District`, Macro.tentacle().item($item`gingerbread cigarette`).abort())
    }
  }

  @step(() => get('_machineTunnelsAdv') < 5, () => useFamiliar($familiar`machine elf`))
  machineElf() {
    adventureMacro($location`Deep Machine Tunnels`, Macro.tentacle().spellKill());
  }

  @step(() => Witchess.fightsDone() < 5)
  witchess() {
    withMacro(Macro.tentacle().spellKill(), () => Witchess.fightPiece($monster`Witchess Bishop`));
  }
}

let ff = new FreeFights(); 

steps.forEach((step) => ff[step as keyof FreeFights]());

// 40	20	0	0	PYEC
if (!get('expressCardUsed')) {
  const pyec = $item`Platinum Yendorian Express Card`;
  withStash([pyec], () => use(pyec));
}