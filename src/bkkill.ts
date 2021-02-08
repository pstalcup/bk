import { availableAmount, cliExecute, equip, haveEffect, maximize, print, retrieveItem, stringModifier, use, useFamiliar, visitUrl } from "kolmafia";
import { $effect, $familiar, $item, $location, $monster, $skill, $slot, $slots, Clan, get, have } from "libram";
import { Macro, adventureMacro } from "./combat";
import { inClan, setChoice, withStash } from "./lib";

// borrowed from raidlog parser
function parseImageN(hoboPlace: string) {
  let regex = new RegExp(/[^\d]*(\d+)o?\.gif/);
  let match = hoboPlace.match(regex);
  if(match) {
    return parseInt(match[1]);
  }
  return 0; 
}

type ImageN = number;
type HoboContainer = number; 
type HoboLocation = {boss : Monster, bossImage: ImageN, container: HoboContainer, choiceAdventure: number, bossDrop: Item, bossDrop2: Item | null}

const hoboLocations :Map<Location, HoboLocation> = new Map<Location, HoboLocation>([
  [$location`Burnbarrel Blvd.`, 
    {boss: $monster`Ol' Scratch`, bossImage: 10, container: 4, choiceAdventure: 201, bossDrop: $item`ol' scratch's salad fork`, bossDrop2: null}],
  [$location`Exposure Esplanade`, 
    {boss: $monster`Frosty`, bossImage: 10, container: 5, choiceAdventure: 202, bossDrop: $item`frosty's frosty mug`, bossDrop2: null}],
  [$location`The Ancient Hobo Burial Ground`, 
    {boss: $monster`Oscus`, bossImage: 10, container: 6, choiceAdventure: 203, bossDrop: $item`jar of fermented pickle juice`, bossDrop2: null}],
  [$location`Hobopolis Town Square`, 
    {boss: $monster`Zombo`, bossImage: 10, container: 7, choiceAdventure: 204, bossDrop: $item`voodoo snuff`, bossDrop2: null}],
  [$location`The Purple Light District`, 
    {boss: $monster`Chester`, bossImage: 10, container: 8, choiceAdventure: 205, bossDrop: $item`extra-greasy slider`, bossDrop2: null}],
  [$location`The Heap`, 
    {boss: $monster`Hodgman, The Hoboverlord`, bossImage: 25, container: 2, choiceAdventure: 200, bossDrop: $item`Hodgman's blanket`, bossDrop2: $item`tin cup of mulligan stew`}],
])

enum HoboStatus {
  Unavailable,
  NotReady,
  BossReady,
  BossKilled
}

export function status(location: Location) {
  let hoboLocation = hoboLocations.get(location);
  if(hoboLocation) {
    let imageN = parseImageN(visitUrl(`clan_hobopolis.php?place=${hoboLocation.container}`))
    if(imageN > hoboLocation.bossImage) {
      return HoboStatus.BossKilled;
    } else if(imageN == hoboLocation.bossImage) {
      return HoboStatus.BossReady;
    } else if(imageN > 0) {
      return HoboStatus.NotReady; 
    }
  }
  return HoboStatus.Unavailable;
}

function bestItemFamiliar() {
  if(have($familiar`Steam-powered Cheerleader`) && get("_cheerleaderSteam") > 100) {
    return $familiar`Steam-powered Cheerleader`; 
  }
  return $familiar`Jumpsuited Hound Dog`; 
}

function setupOutfit() {
  if(get<Item>("bk.weapon") == $item`scratch 'n' sniff sword`) {
    // refresh the sticker weapon
    retrieveItem(3, $item`scratch 'n' sniff unicorn sticker`);
    cliExecute("sticker unicorn, unicorn, unicorn");
  }
  if(get<Item>("bk.shirt") == $item`tunac` && !have($item`tunac`)) {
    inClan(get<string>("fishClan"), () => cliExecute("acquire tunac")); 
  }
  if(get<Item>("bk.familiar") == $item`luck incense` && !have($item`luck incense`)) {
    useFamiliar($familiar`mu`);
    retrieveItem(1, $item`box of familiar jacks`);
    use($item`box of familiar jacks`);
  }
}

function outfit() {
  $slots`hat, back, shirt, weapon, offhand, pants, acc1, acc2, acc3`.forEach((slot) => equip(slot, get<Item>(`bk.${slot}`)))
}

function kill(location: Location) {
  let hoboLocation = hoboLocations.get(location);
  if(hoboLocation) {
    let itemFamiliar = bestItemFamiliar();
    setupOutfit();
    useFamiliar(itemFamiliar); 
    outfit();
    if(hoboLocation.boss == get<Monster>("otoBoss")) {
      equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    }

    if(!get("_feastedFamiliars").includes(`${itemFamiliar}`)) {
      withStash([$item`moveable feast`], () => use($item`moveable feast`)); 
    }

    if(location == $location`Exposure Esplanade`) {
      if(!retrieveItem(1, $item`Louder Than Bomb`)) {
        throw "Unable to get a louder than bomb for getting Chilled to the Bone!"; 
      } else {
        inClan(get("chilledClan"), () => {
          adventureMacro($location`Dreadsylvanian Castle`, Macro.item($item`Louder Than Bomb`).abort());
        });
      }
      if(!haveEffect($effect`Chilled to the Bone`)) {
        throw "Did not get Chilled to the Bone, so we can't kill frosty!"
      }
    }
    setChoice(hoboLocation.choiceAdventure, 1); 
    adventureMacro(location, Macro.if_('monstername eldritch tentacle', Macro.item($item`Louder Than Bomb`)).if_(`monstername ${hoboLocation.boss}`, 
      Macro.externalIf(hoboLocation.boss == $monster`Oscus`, Macro.skill($skill`otoscope`)).attack().repeat()).abort())
    print(`Killed ${hoboLocation.boss}`);
    setChoice(hoboLocation.choiceAdventure, 0); 
  }
}

function statusString(location: Location) {
  let hoboStatus = status(location);
  switch(hoboStatus) {
    case HoboStatus.Unavailable:
      return `${location} unavailable. Are you through the sewers?`
    case HoboStatus.NotReady:
      return `${location} does not have the boss ready.`
    case HoboStatus.BossReady:
      return `${location} is ready to kill the boss.`
    case HoboStatus.BossKilled:
      return `${location} has already had the boss killed.`
  }
}

export function main(args: string) {
  args ||= "status"; 
  if(args.trim() == "status") {
    for(let key of hoboLocations.keys()) {
      print(`${key}: ${statusString(key)}`);
    }
  }
  if(args.trim() == "kill") {
    let ltb = availableAmount($item`Louder Than Bomb`);
    retrieveItem(10 - ltb, $item`Louder Than Bomb`);

    let drops = new Map<Item, number>();
    for(let key of hoboLocations.keys()) {
      let lookup = hoboLocations.get(key);
      
      
      if(lookup && status(key) == HoboStatus.BossReady) {
        print(`Killing ${key}`);
        let bossdrop = availableAmount(lookup.bossDrop); 
        let bossdrop2 = lookup.bossDrop2 ? availableAmount(lookup.bossDrop2) : 0; 
        kill(key); 
        drops.set(lookup.bossDrop, availableAmount(lookup.bossDrop) - bossdrop);
        if(lookup.bossDrop2) {
          drops.set(lookup.bossDrop, availableAmount(lookup.bossDrop2) - bossdrop2);
        }
      } else { 
        print(`Skipping ${key}`);
      }
    }
    for(let [drop, amount] of drops.entries()) {
      print(`${drop}: ${amount}`)
    }
  }
}