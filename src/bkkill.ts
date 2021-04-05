import {
  availableAmount,
  cliExecute,
  equip,
  getClanName,
  haveEffect,
  myAdventures,
  numericModifier,
  print,
  printHtml,
  retrieveItem,
  setProperty,
  toItem,
  toMonster,
  use,
  useFamiliar,
  visitUrl,
} from 'kolmafia';
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $monster,
  $skill,
  $slot,
  $slots,
  Clan,
  get,
  have,
  set,
} from 'libram';
import { Macro, adventureMacro } from './combat';
import { assert, inClan, setChoice, withStash } from './lib';

// borrowed from raidlog parser
function parseImageN(hoboPlace: string) {
  let regex = new RegExp(/[^\d]*(\d+)o?\.gif/);
  let match = hoboPlace.match(regex);
  if (match) {
    return parseInt(match[1]);
  }
  return -1;
}

type ImageN = number;
type HoboContainer = number;
type HoboLocation = {
  boss: Monster;
  bossImage: ImageN;
  container: HoboContainer;
  choiceAdventure: number;
};

const consumables = $items`Ol' Scratch's Salad Fork,Frosty's Frosty Mug,Jar of Fermented Pickle Juice,Voodoo Snuff,Extra-Greasy Slider,Hodgman's Blanket,Tin Cup of Mulligan Stew,hobo fortress blueprints,stuffed Hodgman`;
const skills = $items`Elron's Explosive Etude,Benetton's Medley of Diversity,The Ballad of Richie Thingfinder,Prelude of Precision,Chorale of Companionship,Hodgman's journal #1: The Lean Times,Hodgman's journal #2: Entrepreneurythmics,Hodgman's journal #3: Pumping Tin,Hodgman's journal #4: View From The Big Top`;

const hoboLocations: Map<Location, HoboLocation> = new Map<Location, HoboLocation>([
  [
    $location`Burnbarrel Blvd.`,
    {
      boss: $monster`Ol' Scratch`,
      bossImage: 10,
      container: 4,
      choiceAdventure: 201,
    },
  ],
  [
    $location`Exposure Esplanade`,
    {
      boss: $monster`Frosty`,
      bossImage: 10,
      container: 5,
      choiceAdventure: 202,
    },
  ],
  [
    $location`The Heap`,
    {
      boss: $monster`Oscus`,
      bossImage: 10,
      container: 6,
      choiceAdventure: 203,
    },
  ],
  [
    $location`The Ancient Hobo Burial Ground`,
    {
      boss: $monster`Zombo`,
      bossImage: 10,
      container: 7,
      choiceAdventure: 204,
    },
  ],
  [
    $location`The Purple Light District`,
    {
      boss: $monster`Chester`,
      bossImage: 10,
      container: 8,
      choiceAdventure: 205,
    },
  ],
  [
    $location`Hobopolis Town Square`,
    {
      boss: $monster`Hodgman, The Hoboverlord`,
      bossImage: 25,
      container: 2,
      choiceAdventure: 200,
    },
  ],
]);

enum HoboStatus {
  Unavailable,
  NotReady,
  BossReady,
  BossKilled,
}

export function status(location: Location) {
  let hoboLocation = hoboLocations.get(location);
  if (hoboLocation) {
    let imageN = parseImageN(visitUrl(`clan_hobopolis.php?place=${hoboLocation.container}`));
    if (imageN > hoboLocation.bossImage) {
      return HoboStatus.BossKilled;
    } else if (imageN == hoboLocation.bossImage) {
      return HoboStatus.BossReady;
    } else if (imageN > -1) {
      return HoboStatus.NotReady;
    }
  }
  return HoboStatus.Unavailable;
}

function bestItemFamiliar() {
  if (have($familiar`Steam-powered Cheerleader`) && get('_cheerleaderSteam') > 100) {
    return $familiar`Steam-powered Cheerleader`;
  }
  return $familiar`Jumpsuited Hound Dog`;
}

function turnSafe(name: string, condition: () => boolean, block: () => void) {
  let initialAdventureCount = myAdventures();
  while (condition()) {
    assert(myAdventures() == initialAdventureCount, `Spent a turn and didn't resolve ${name}`);
    block();
  }
}

function setupOutfit() {
  if (toItem(get('bk.weapon')) == $item`scratch 'n' sniff sword`) {
    // refresh the sticker weapon
    retrieveItem(3, $item`scratch 'n' sniff unicorn sticker`);
    cliExecute('sticker unicorn, unicorn, unicorn');
  }
  if (toItem(get('bk.shirt')) == $item`tunac` && !have($item`tunac`)) {
    inClan(get<string>('fishClan'), () => cliExecute('acquire tunac'));
  }
  if (toItem(get('bk.familiar')) == $item`luck incense` && !have($item`luck incense`)) {
    useFamiliar($familiar`mu`);
    retrieveItem(1, $item`box of familiar jacks`);
    use($item`box of familiar jacks`);
  }
  if (!get('_feastedFamiliars').includes(`${bestItemFamiliar()}`)) {
    useFamiliar(bestItemFamiliar());
    withStash([$item`moveable feast`], () => use($item`moveable feast`));
  }
  if (!get('_mummeryMods').includes(`${bestItemFamiliar()}`) && !get('_mummeryMods').includes('Item Drop:')) {
    useFamiliar(bestItemFamiliar());
    cliExecute('mummery item');
  }
  if (get('_VYKEACompanionType') === '') {
    retrieveItem(37, $item`vykea dowel`);
    retrieveItem(10, $item`vykea rail`);
    cliExecute('create level 5 lamp');
  }
}

function outfit() {
  $slots`hat,back,shirt,weapon,off-hand,pants,acc1,acc2,acc3,familiar`.forEach(slot => {
    let it = toItem(get(`bk.${slot}`));
    print(`${slot} ${it}`);
    equip(slot, it);
  });
}

function kill(location: Location) {
  let hoboLocation = hoboLocations.get(location);
  if (hoboLocation) {
    let itemFamiliar = bestItemFamiliar();
    setupOutfit();
    useFamiliar(itemFamiliar);
    outfit();
    let otoscopeBoss = toMonster(get('otoscopeBoss'));
    if (hoboLocation.boss == otoscopeBoss) {
      equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    }

    if (location == $location`Exposure Esplanade` && !have($effect`Chilled to the Bone`)) {
      if (!retrieveItem(1, $item`Louder Than Bomb`)) {
        throw 'Unable to get a louder than bomb for getting Chilled to the Bone!';
      } else {
        inClan(get('chilledClan'), () => {
          turnSafe(
            'Chilled to the Bone',
            () => !haveEffect($effect`Chilled to the Bone`),
            () => {
              adventureMacro($location`Dreadsylvanian Castle`, Macro.item($item`Louder Than Bomb`).abort());
            }
          );
        });
      }
      if (!haveEffect($effect`Chilled to the Bone`) || !haveEffect($effect`Gummi Badass`)) {
        throw "Did not get Chilled to the Bone or Gummi Badass, so we can't kill frosty!";
      }
    }
    let initialAdventureCount = myAdventures();
    setChoice(hoboLocation.choiceAdventure, 1);
    let bossMacro = Macro.if_(
      `monstername ${hoboLocation.boss}`,
      Macro.externalIf(hoboLocation.boss == otoscopeBoss && get('_otoscopeUsed') < 3, Macro.skill($skill`otoscope`))
        .attack()
        .repeat()
    )
      .item($item`Louder Than Bomb`)
      .abort();

    turnSafe(
      `Kill ${hoboLocation.boss}`,
      () => status(location) == HoboStatus.BossReady,
      () => adventureMacro(location, bossMacro)
    );

    print(`Killed ${hoboLocation.boss}`);
    setChoice(hoboLocation.choiceAdventure, 0);

    if (have($effect`Chilled to the Bone`)) {
      retrieveItem(1, $item`hot Dreadsylvanian cocoa`);
      use($item`hot Dreadsylvanian cocoa`);
    }
  }
}

function printStatus(location: Location) {
  let hoboStatus = status(location);
  switch (hoboStatus) {
    case HoboStatus.Unavailable:
      print(`${location} unavailable. Are you through the sewers?`, 'purple');
      break;
    case HoboStatus.NotReady:
      print(`${location} does not have the boss ready.`, 'purple');
      break;
    case HoboStatus.BossReady:
      print(`${location} is ready to kill the boss.`, 'lime');
      break;
    case HoboStatus.BossKilled:
      print(`${location} has already had the boss killed.`, 'blue');
  }
}

export function main(args: string) {
  args ||= 'status';
  if (args.trim() == 'status') {
    print(`In clan ${Clan.get().name}`);
    for (let key of hoboLocations.keys()) {
      printStatus(key);
    }
  }
  if (args.trim() == 'drops') {
    consumables.forEach(i => print(`${i}: ${availableAmount(i)}`));
    skills.forEach(i => print(`${i}: ${availableAmount(i)}`));
  }
  if (args.trim() == 'outfit') {
    setupOutfit();
    useFamiliar(bestItemFamiliar());
    outfit();

    let softshoes = 30 * 2; // doubled by squint
    let friars = 25 * 2; // not doubled by squint

    let baseDrop = numericModifier('Item Drop') + softshoes + friars;
    let foodDrop = baseDrop + numericModifier('Food Drop');
    let boozeDrop = baseDrop + numericModifier('Booze Drop');

    print(`Item Drop: ${baseDrop}`);
    print(`Base Drop: ${Math.floor(baseDrop / 100)}`);
    print(`Food Drop: ${Math.floor(foodDrop / 100)}`);
    print(`Booze Drop: ${Math.floor(boozeDrop / 100)}`);
    print(`Hodgman Food Drop: ${1 + Math.floor((foodDrop - 50) / 150)}`);
    print(`Hodgman Booze Drop: ${1 + Math.floor((boozeDrop - 50) / 150)}`);
  }
  if (args.trim() == 'kill') {
    let ltb = availableAmount($item`Louder Than Bomb`);
    retrieveItem(10 - ltb, $item`Louder Than Bomb`);

    let drops = new Map<Item, number>();
    let finalDrops = new Map<string, number>();

    consumables.forEach(i => drops.set(i, availableAmount(i)));
    skills.forEach(i => drops.set(i, availableAmount(i)));

    for (let key of hoboLocations.keys()) {
      let lookup = hoboLocations.get(key);

      if (lookup && status(key) == HoboStatus.BossReady) {
        printHtml(`<b>Killing ${key}</b>`);
        kill(key);
      } else {
        print(`Skipping ${key}`);
      }
    }
    printHtml('<b>Consumable Drops</b>');
    consumables.forEach(i => {
      let current = availableAmount(i);
      let prior = drops.get(i) || 0;
      if (current > prior) {
        finalDrops.set(`${i}`, current - prior);
        print(`${i}: ${current - prior}`);
      }
    });
    printHtml('<b>Skill Drops</b>');
    skills.forEach(i => {
      let current = availableAmount(i);
      let prior = drops.get(i) || 0;
      drops.set(i, current - prior);
      if (current > prior) {
        finalDrops.set(`${i}`, current - prior);
        print(`${i}: ${current - prior}`);
      }
    });
    let hoboDrops = JSON.stringify(
      Array.from(finalDrops.entries()).reduce((o, [key, value]) => {
        o[key] = value;
        return o;
      }, Object.create(null))
    );
    set('_lastHoboDrops', hoboDrops);
  }
}
