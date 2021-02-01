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
} from 'libram';
import { abort } from 'process';
import { fillAsdonMartinTo } from './asdon';
import { adventureMacro, Macro, withMacro } from './combat';
import { getItem, setChoice } from './lib';
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


function step(condition: () => boolean | null | undefined, setup?: () => void) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if(condition()) {
      if(setup) setup();

      while(condition()) {
        descriptor.value();
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

function has(target: Item) {
  return availableAmount(target) > 0; 
}

const HEAVY_RAIN = myPath() == "Heavy Rains"; 
const PROFESSOR_COPIES = true; 
const FREE_FIGHT_COST = 40000; // TODO: don't hardcode this
let FREE_FIGHT_COPY_TARGET = $monster`Witchess Bishop`; 

if (!have($effect`Steely-Eyed Squint`)) throw 'Get Squint first!';
if (!have($effect`Eldritch Attunement`)) throw 'Get Eldritch Attunement first!';

let oldCCS = cliExecuteOutput("ccs").replace("CCS is ", ""); 
set('choiceAdventureScript', 'bkchoice')

cliExecute('mood apathetic');
cliExecute('ccs bkfights');
if (get('sourceTerminalEducate1') !== 'digitize.edu' || get('sourceTerminalEducate2') !== 'extract.edu') {
  cliExecute('terminal educate digitize; terminal educate extract');
}
set('hpAutoRecovery', 0.8);
set('hpAutoRecoveryTarget', 0.95);


function freeFightWrap<T>(action: () => T) {
  let ret = null; 
  try {
    ret = action(); 
  } finally {
    useFamiliar($familiar`Unspeakachu`);
    if(HEAVY_RAIN) {
      equip($slot`weapon`, $item`Thor's Pliers`);
    } else {
      equip($slot`weapon`, $item`Fourth of May Cosplay Saber`)
    }
    if(availableAmount($item`KoL Con 13 snowglobe`) > 0) {
      equip($slot`offhand`, $item`KoL Con 13 snowglobe`);
    }
    equip($slot`pants`, $item`pantogram pants`);
    equip($slot`acc1`, $item`lucky gold ring`);
    equip($slot`acc2`, $item`Mr. Cheeng's spectacles`);
    equip($slot`acc3`, $item`Mr. Screege's spectacles`);
    equip($slot`familiar`, $item`ittah bittah hookah`);

    if(HEAVY_RAIN) {
      heavyRainResources();
    }
  }
  return ret; 
}

heavyRainResources();

function maybeMacro(property: string, target: Item) {
  if(!get(property)) retrieveItem(1, target);
  return Macro.externalIf(get<boolean>(property) && availableAmount(target) > 0, Macro.item(target)); 
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

class FreeFights {
  @step(() => ChateauMantegna.have() && !ChateauMantegna.paintingFought() && ChateauMantegna.paintingMonster()?.attributes?.includes('FREE'))
  chateau() {
    withMacro(Macro.tentacle().spellKill(), () => ChateauMantegna.fightPainting());
  }

  @step(
    () => !get('_photocopyUsed'),
    () => faxbot(FREE_FIGHT_COPY_TARGET, "Cheesefax")
  )
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
      Macro.tentacle().step(SpookyPutty.maybeMacro()),
      () => SpookyPutty.fight()
    );
  }

  @step(() => has($item`shaking 4-d camera`))
  camera() {

  }
}

// 0	1	0	0	Chateau painting
if (
  ChateauMantegna.have() &&
  !ChateauMantegna.paintingFought() &&
  ChateauMantegna.paintingMonster()?.attributes?.includes('FREE')
) {
  withMacro(Macro.tentacle().spellKill(), () => ChateauMantegna.fightPainting());
}

let hasPuttyCopies = () => ((availableAmount($item`spooky putty sheet`) == 1 || availableAmount($item`spooky putty monster`) == 1) && get('spookyPuttyCopiesMade') < 5);
let hasRaindohCopies = () => (availableAmount($item`Rain-doh black box`) == 1 && get('spookyPuttyCopiesMade') == 5 && get('_raindohCopiesMade') == 0)

// 1	1	0	0	Fax machine
if (!get('_photocopyUsed')) {
  faxbot(FREE_FIGHT_COPY_TARGET, "Cheesefax");
  if (!get('_iceSculptureUsed')) retrieveItem(1, $item`unfinished ice sculpture`);
  if (!get('_cameraUsed')) retrieveItem(1, $item`4-d camera`);
  // TODO: Add Spooky Putty (broken right now)
  withMacro(
    Macro.tentacle()
      .externalIf(!get('_iceSculptureUsed'), Macro.item('unfinished ice sculpture'))
      .externalIf(!get('_cameraUsed'), Macro.item('4-d camera'))
      .externalIf(hasPuttyCopies(), Macro.item('spooky putty sheet'))
      .spellKill(),
    () => use($item`photocopied monster`)
  );
}

while(availableAmount($item`spooky putty monster`) > 0) {
  withMacro(
    Macro.tentacle()
      .externalIf(hasPuttyCopies(), Macro.item('spooky putty sheet'))
      .externalIf(hasRaindohCopies(), Macro.item('Rain-doh black box'))
      .spellKill(), () => use($item`spooky putty monster`));
}
if(availableAmount($item`Rain-Doh box full of monster`) > 0) {
  withMacro(Macro.tentacle().spellKill(), () => use($item`Rain-Doh box full of monster`));
}

// 2	1	0	0	ice sculpture	15k
if (!get('_iceSculptureUsed') && have($item`ice sculpture`)) {
  withMacro(Macro.tentacle().spellKill(), () => use($item`ice sculpture`));
}

// 1	1	0	0	4-d camera	8k
if (!get('_cameraUsed') && have($item`shaking 4-d camera`)) {
  freeFightWrap(()=>{
    if(PROFESSOR_COPIES && haveFamiliar($familiar`pocket professor`)) {
      useFamiliar($familiar`pocket professor`);
    } else {
      withMacro(Macro.tentacle().professor().spellKill(), () => use($item`shaking 4-d camera`));
    }
  });
}

// 1	2	0	0	Tentacle fights
if (get('questL02Larva') !== 'unstarted' && !get('_eldritchTentacleFought')) {
  visitUrl('place.php?whichplace=forestvillage&action=fv_scientist', false);
  if (!handlingChoice()) throw 'No choice?';
  withMacro(Macro.tentacle().spellKill(), () => runChoice(1));
}
if (have($skill`Evoke Eldritch Horror`) && !get('_eldritchHorrorEvoked')) {
  withMacro(Macro.tentacle().spellKill(), () => useSkill($skill`Evoke Eldritch Horror`));
}

// 4	3	0	0	Lynyrd	using a lynyrd snare
while (get('_lynyrdSnareUses') < 3) {
  withMacro(Macro.tentacle().spellKill(), () => use($item`lynyrd snare`));
}

// 6	10	0	0	Infernal Seals	variety of items; must be Seal Clubber for 5, must also have Claw of the Infernal Seal in inventory for 10.
const maxSeals = have($item`Claw of the Infernal Seal`) ? 10 : 5;
if (
  myClass() === $class`Seal Clubber` &&
  get('_sealsSummoned') < maxSeals &&
  get('lastGuildStoreOpen') === myAscensions()
) {
  equip($item`porcelain police baton`);
  while (get('_sealsSummoned') < 10) {
    retrieveItem(1, $item`figurine of a wretched-looking seal`);
    retrieveItem(1, $item`seal-blubber candle`);
    withMacro(Macro.tentacle().spellKill(), () => {
      if (!use(1, $item`figurine of a wretched-looking seal`)) {
        set('_sealsSummoned', 10);
      }
    });
  }
}

// 9	10	0	0	BRICKO monsters	BRICKO bricks; can copy additional oozes or bats
while (get('_brickoFights') < 10) {
  withMacro(Macro.tentacle().spellKill(), () => use($item`BRICKO ooze`));
}


heavyRainResources();

// 11	11	0	0	drunk pygmy	with Bowl of Scorpions in inventory, fight ends instantly
// 14	10	0	0	Saber copy drunk pygmy	10 drunk pygmies
// 14	1	0	0	miniature crystal ball	another drunk pygmy

if (get('questL11Worship') !== 'unstarted') {
  let pygmyBanishSaberCount = 10; 
  while (get('_drunkPygmyBanishes') < 10) {
    putCloset(itemAmount($item`bowling ball`), $item`bowling ball`);
    retrieveItem(10 - get('_drunkPygmyBanishes'), $item`Bowl of Scorpions`);
    adventureMacro($location`The Hidden Bowling Alley`, 
    Macro.tentacle()
      .externalIf(!banishedMonsters().has($skill`snokebomb`), Macro.trySkill($skill`snokebomb`))
      .externalIf(!banishedMonsters().has($item`Louder Than Bomb`), Macro.tryItem($item`Louder than bomb`))
      .abort());
  }
  if(availableAmount($item`miniature crystal ball`) > 0 && get('_drunkPygmyBanishes') == 10 ) {
    pygmyBanishSaberCount = 11; 
    freeFightWrap(() => {
      equip($slot`familiar`, $item`miniature crystal ball`);
      putCloset(itemAmount($item`bowling ball`), $item`bowling ball`);
      retrieveItem(1, $item`Bowl of Scorpions`);
      adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
    });
  }
  if (get('_drunkPygmyBanishes') === pygmyBanishSaberCount && get('_saberForceUses') < 5) {
    freeFightWrap(() => {
      equip($slot`weapon`, $item`Fourth of May Cosplay Saber`);
      setChoice(1387, 2);
      putCloset(itemAmount($item`bowling ball`), $item`bowling ball`);
      putCloset(itemAmount($item`Bowl of Scorpions`), $item`Bowl of Scorpions`);
      adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().skill('Use the Force'));
      while (get('_saberForceUses') < 5) {
        retrieveItem(2, $item`Bowl of Scorpions`);
        adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
        adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
        putCloset(itemAmount($item`Bowl of Scorpions`), $item`Bowl of Scorpions`);
        adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().skill('Use the Force'));
      }
      retrieveItem(3, $item`Bowl of Scorpions`);
      adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
      adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
      adventureMacro($location`The Hidden Bowling Alley`, Macro.tentacle().abort());
    }); 
  }
  while(10 - get('_timeSpinnerMinutesUsed') > 3) {
    setChoice(1195, 1);
    retrieveItem(1, $item`Bowl of Scorpions`);
    set<string>('choiceAdventure1196', `1&monid=${$monster`drunk pygmy`.id}`)
    withMacro(Macro.tentacle().abort(), () => { use($item`time-spinner`)})
  }
}

if (['step3', 'finished'].includes(get('questL11Ron'))) {
  getItem(5 - get('_glarkCableUses'), $item`glark cable`, 20000);
  while (get('_glarkCableUses') < 5) {
    adventureMacro(
      $location`The Red Zeppelin`,
      Macro.tentacle()
        .externalIf(
          get('questL11Ron') === 'step3',
          Macro.if_(
            'monstername red butler || monstername man with the red buttons || monstername red skeleton',
            Macro.item('Louder Than Bomb')
          )
        )
        .item('glark cable')
    );
  }
}

// 16	6	0	0	Sausage goblin	Must have a Kramco Sausage-o-Matic™ equipped.
if (get('_sausageFights') === 0) {
  freeFightWrap(() => {
    equip($item`Kramco Sausage-o-Matic™`);
    adventureMacro($location`Noob Cave`, Macro.tentacle().spellKill());
  })
}

// 18	5	0	0	Glark cable	combat item	against any non-instakillable mobs in mobs in The Red Zeppelin
// FIXME: import canadv

// 16	3	0	0	Shattering Punch	combat skill	Snojo skill, tradable
// 23	1	0	0	Gingerbread Mob Hit	combat skill	Gingerbread City leaderboard reward skill, tradable skillbook
while (!get('_gingerbreadMobHitUsed') || get('_shatteringPunchUsed') < 3 || get('_usedReplicaBatoomerang') < 3) {
  withMacro(
    Macro.tentacle()
      .trySkill($skill`Gingerbread Mob Hit`)
      .trySkill($skill`Shattering Punch`)
      .item($item`replica bat-oomerang`)
      .abort(),
    () => use($item`drum machine`)
  );
}

// 22	1	0	0	Fire the Jokester's Gun	combat skill	must have The Jokester's gun equipped (Batfellow content, tradable)
// 22	3	0	0	Chest X-Ray	combat skill	must have a Lil' Doctor™ bag equipped
if (!get('_firedJokestersGun') || get('_chestXRayUsed') < 3) {
  freeFightWrap(() => {
    equip($item`The Jokester's gun`);
    equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    while (!get('_firedJokestersGun') || get('_chestXRayUsed') < 3) {
      withMacro(
        Macro.tentacle()
          .trySkill($skill`Fire the Jokester's Gun`)
          .skill($skill`Chest X-Ray`)
          .abort(),
        () => use($item`drum machine`)
      );
    }
  });
}


heavyRainResources();

// 19	5	0	0	Powdered madness	combat item	can only be obtained through the mall or from the Red-Nosed Snapper - 40,000 each
if (get('_powderedMadnessUses') < 5 && mallPrice($item`powdered madness`) < 40000) {
  const usesAvailable = 5 - get('_powderedMadnessUses');
  getItem(usesAvailable, $item`powdered madness`, 25000);
  while (itemAmount($item`powdered madness`) > 0 && get('_powderedMadnessUses') < 5) {
    withMacro(
      Macro.tentacle()
        .item($item`powdered madness`)
        .abort(),
      () => use($item`drum machine`)
    );
  }
}

// 25	1	0	0	Asdon Martin: Missile Launcher	combat skill	must have Asdon Martin installed in your workshed; instantly forces all items to drop; costs 100 "fuel"
if (getCampground()['Asdon Martin keyfob'] !== undefined && !get('_missileLauncherUsed')) {
  fillAsdonMartinTo(100);
  withMacro(Macro.tentacle().skill($skill`Missile Launcher`), () => use($item`drum machine`));
}

// 21	10	0	0	Partygoers from The Neverending Party	must have used a Neverending Party invitation envelope.
while (get('_neverendingPartyFreeTurns') < 10) {
  setChoice(1322, 2); // reject quest.
  setChoice(1324, 5); // pick fight.
  adventureMacro($location`The Neverending Party`, Macro.tentacle().spellKill());
}

while (get('_snojoFreeFights') < 10) {
  adventureMacro($location`The X-32-F Combat Training Snowman`, Macro.tentacle().spellKill());
}

heavyRainResources(); 

// 24	1	0	0	piranha plant	Must have Your Mushroom Garden as your garden. 5/day only in Path of the Plumber.
// 24	3	0	0	Portscan/Macro
// FIXME: Portscan three times instead of twice
if (getCampground()['packet of mushroom spores'] !== undefined && get('_mushroomGardenFights') === 0) {
  cliExecute('terminal educate portscan');
  while (get('_mushroomGardenFights') === 0 || getCounters('portscan.edu', 0, 0) === 'portscan.edu') {
    adventureMacro(
      $location`Your Mushroom Garden`,
      Macro.tentacle()
        .if_('monstername government agent', Macro.skill('Macrometeorite'))
        .if_('!monstername piranha plant', Macro.abort())
        .trySkill('Portscan')
        .spellKill()
    );
  }
}

// 25	3	0	0	L.O.V. Enemies	must have the Tunnel of L.O.V.E. or use a LOV Entrance Pass
if (!TunnelOfLove.isUsed()) {
  const effect = have($effect`Wandering Eye Surgery`) ? 'Open Heart Surgery' : 'Wandering Eye Surgery';
  withMacro(Macro.tentacle().spellKill(), () =>
    TunnelOfLove.fightAll('LOV Epaulettes', effect, 'LOV Extraterrestrial Chocolate')
  );

  if (handlingChoice()) throw 'Did not get all the way through LOV.';
  visitUrl('choice.php');
  if (handlingChoice()) throw 'Did not get all the way through LOV.';
}

heavyRainResources();

getItem(Math.max(0, 20 - get('_powerPillUses') - availableAmount($item`power pill`)), $item`power pill`, FREE_FIGHT_COST);

while(get('_powerPillUses') < 20 && availableAmount($item`power pill`) > 0) {
  freeFightWrap(() => {
    useFamiliar($familiar`puck man`);
    withMacro(
      Macro.tentacle()
        .item($item`power pill`)
        .abort(),
      () => use($item`drum machine`)
    );
  });
}

let gingerbreadTurns = (get('gingerExtraAdventures') ? 30 : 20) - get('_gingerbreadCityTurns'); 
if(availableAmount($item`gingerbread cigarette`) < gingerbreadTurns) {
  getItem(gingerbreadTurns - availableAmount($item`gingerbread cigarette`), $item`gingerbread cigarette`, FREE_FIGHT_COST); 
}

if(availableAmount($item`gingerbread cigarette`) > 0 && get('_gingerbreadCityTurns') < 9) {
  while(availableAmount($item`gingerbread cigarette`) > 0 && get('_gingerbreadCityTurns') < 9) {
    adventureMacro($location`Gingerbread Upscale Retail District`, Macro.tentacle().item($item`gingerbread cigarette`));
  }
  // random candy
  adv1($location`Gingerbread Train Station`, 1, ''); 
  setChoice(1204, 0); // for now, find out choice number later
}

if (availableAmount($item`gingerbread cigarette`) > 0 && get('_gingerbreadCityTurns') < 19) {
  while(availableAmount($item`gingerbread cigarette`) > 0 && get('_gingerbreadCityTurns') < 19) {
    adventureMacro($location`Gingerbread Upscale Retail District`, Macro.tentacle().item($item`gingerbread cigarette`));
    heavyRainResources(); 
  }
  // buy cigarettes
  setChoice(1203, 0); // for now, find out choice number later
  adv1($location`Gingerbread Civic Center`, 1, ''); 
}

while(availableAmount($item`gingerbread cigarette`) > 0 && get('_gingerbreadCityTurns') < gingerbreadTurns) {
  adventureMacro($location`Gingerbread Upscale Retail District`, Macro.tentacle().item($item`gingerbread cigarette`));
}

while(get('_machineTunnelsAdv') < 5) {
  freeFightWrap(() => {
    useFamiliar($familiar`machine elf`);
    adventureMacro($location`Deep Machine Tunnels`, Macro.tentacle().spellKill());
  })
}

// 28	5	0	0	Witchess pieces	must have a Witchess Set; can copy for more
while (Witchess.fightsDone() < 5) {
  withMacro(Macro.tentacle().spellKill(), () => Witchess.fightPiece($monster`Witchess Bishop`));
}

heavyRainResources();

// 40	20	0	0	PYEC
if (!get('expressCardUsed')) {
  const pyec = $item`Platinum Yendorian Express Card`;
  withStash([pyec], () => use(pyec));
}

// 27	5	0	0	Spooky Putty
// 35	4	0	0	Law of Averages

// 3	3	0	0	Digitize
// 2	1	0	0	pulled green taffy	1k
// 3	1	0	0	LOV Enamorang
// 23	3	0	0	Vote Monsters	Must have an "I Voted!" sticker equipped on the scheduled encounters. The scheduled encounters take place each adventure after your total lifetime turncount modulo 11 equals 1 (similar to the Lights Out encounters). After the first 3 encounters, the monsters become un-free.
