import {
  availableAmount,
  cliExecute,
  equip,
  getClanName,
  haveEffect,
  print,
  printHtml,
  retrieveItem,
  toItem,
  toMonster,
  use,
  useFamiliar,
  visitUrl,
} from 'kolmafia';
import { $effect, $familiar, $item, $items, $location, $monster, $skill, $slot, $slots, Clan, get, have } from 'libram';
import { Macro, adventureMacro } from './combat';
import { inClan, setChoice, withStash } from './lib';

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

    if (!get('_feastedFamiliars').includes(`${itemFamiliar}`)) {
      withStash([$item`moveable feast`], () => use($item`moveable feast`));
    }

    if (location == $location`Exposure Esplanade` && !have($effect`Chilled to the Bone`)) {
      if (!retrieveItem(1, $item`Louder Than Bomb`)) {
        throw 'Unable to get a louder than bomb for getting Chilled to the Bone!';
      } else {
        inClan(get('chilledClan'), () => {
          adventureMacro($location`Dreadsylvanian Castle`, Macro.item($item`Louder Than Bomb`).abort());
        });
      }
      if (!haveEffect($effect`Chilled to the Bone`)) {
        throw "Did not get Chilled to the Bone, so we can't kill frosty!";
      }
    }
    while (status(location) == HoboStatus.BossReady) {
      setChoice(hoboLocation.choiceAdventure, 1);
      adventureMacro(
        location,
        Macro.if_('monstername eldritch tentacle', Macro.item($item`Louder Than Bomb`))
          .if_(
            `monstername ${hoboLocation.boss}`,
            Macro.externalIf(hoboLocation.boss == otoscopeBoss, Macro.skill($skill`otoscope`))
              .attack()
              .repeat()
          )
          .abort()
      );
      print(`Killed ${hoboLocation.boss}`);
      setChoice(hoboLocation.choiceAdventure, 0);
    }
    if (have($effect`Chilled to the Bone`)) {
      retrieveItem(1, $item`hot Dreadsylvanian cocoa`);
      use($item`hot Dreadsylvanian cocoa`);
    }
  }
}

function statusString(location: Location) {
  let hoboStatus = status(location);
  switch (hoboStatus) {
    case HoboStatus.Unavailable:
      return `${location} unavailable. Are you through the sewers?`;
    case HoboStatus.NotReady:
      return `${location} does not have the boss ready.`;
    case HoboStatus.BossReady:
      return `${location} is ready to kill the boss.`;
    case HoboStatus.BossKilled:
      return `${location} has already had the boss killed.`;
  }
}

export function main(args: string) {
  args ||= 'status';
  if (args.trim() == 'status') {
    print(`In clan ${Clan.get().name}`);
    for (let key of hoboLocations.keys()) {
      print(`${key}: ${statusString(key)}`);
    }
  }
  if (args.trim() == 'drops') {
    consumables.forEach(i => print(`${i}: ${availableAmount(i)}`));
    skills.forEach(i => print(`${i}: ${availableAmount(i)}`));
  }
  if (args.trim() == 'kill') {
    let ltb = availableAmount($item`Louder Than Bomb`);
    retrieveItem(10 - ltb, $item`Louder Than Bomb`);

    let drops = new Map<Item, number>();

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
        print(`${i}: ${current - prior}`);
      }
    });
    printHtml('<b>Skill Drops</b>');
    skills.forEach(i => {
      let current = availableAmount(i);
      let prior = drops.get(i) || 0;
      if (current > prior) {
        print(`${i}: ${current - prior}`);
      }
    });
  }
}
