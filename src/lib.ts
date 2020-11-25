export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function getPropertyString(name: string, def: string) {
  const str = Lib.getProperty(name);
  return str === '' ? def : str;
}

export function getPropertyInt(name: string, default_: number | null = null): number {
  const str = Lib.getProperty(name);
  if (str === '') {
    if (default_ === null) Lib.abort(`Unknown property ${name}.`);
    else return default_;
  }
  return parseInt(str, 10);
}

export function getPropertyBoolean(name: string, default_: boolean | null = null) {
  const str = Lib.getProperty(name);
  if (str === '') {
    if (default_ === null) Lib.abort(`Unknown property ${name}.`);
    else return default_;
  }
  return str === 'true';
}

export function itemPriority(...items: Item[]): Item {
  if (items.length === 1) return items[0];
  else return Lib.itemAmount(items[0]) > 0 ? items[0] : itemPriority(...items.slice(1));
}

export function cheaper(...items: Item[]) {
  if (items.length === 1) return items[0];
  else return Lib.itemAmount(items[0]) > 0 ? items[0] : itemPriority(...items.slice(1));
}

const priceCaps: {[index: string]: number} = {
  'jar of fermented pickle juice': 75000,
  "Frosty's frosty mug": 45000,
  'extra-greasy slider': 45000,
  "Ol' Scratch's salad fork": 45000,
  'transdermal smoke patch': 7000,
  'voodoo snuff': 36000,
  'blood-drive sticker': 210000,
  'spice melange': 500000,
  'splendid martini': 10000,
};

export function getCapped(qty: number, item: Item, maxPrice: number) {
  if (qty > 15) Lib.abort('bad get!');

  let remaining = qty - Lib.itemAmount(item);
  if (remaining <= 0) return;

  const getCloset = Math.min(remaining, Lib.closetAmount(item));
  if (!Lib.takeCloset(getCloset, item)) Lib.abort('failed to remove from closet');
  remaining -= getCloset;
  if (remaining <= 0) return;

  const getMall = Math.min(remaining, Lib.shopAmount(item));
  if (!Lib.takeShop(getMall, item)) Lib.abort('failed to remove from shop');
  remaining -= getMall;
  if (remaining <= 0) return;

  if (Lib.buy(remaining, item, maxPrice) < remaining) Lib.abort(`Mall price too high for ${item.name}.`);
}

export function get(qty: number, item: Item) {
  getCapped(qty, item, priceCaps[item.name]);
}

export function eatSafe(qty: number, item: Item) {
  get(1, item);
  if (!Lib.eat(qty, item)) Lib.abort('Failed to eat safely');
}

export function drinkSafe(qty: number, item: Item) {
  get(1, item);
  if (!Lib.drink(qty, item)) Lib.abort('Failed to drink safely');
}

export function chewSafe(qty: number, item: Item) {
  get(1, item);
  if (!Lib.chew(qty, item)) Lib.abort('Failed to chew safely');
}

export function eatSpleen(qty: number, item: Item) {
  if (Lib.mySpleenUse() < 5) Lib.abort('No spleen to clear with this.');
  eatSafe(qty, item);
}

export function drinkSpleen(qty: number, item: Item) {
  if (Lib.mySpleenUse() < 5) Lib.abort('No spleen to clear with this.');
  drinkSafe(qty, item);
}

export function adventureGain(item: Item) {
  if (item.adventures.includes('-')) {
    const [min, max] = item.adventures.split('-').map(s => parseInt(s, 10));
    return (min + max) / 2.0;
  } else {
    return parseInt(item.adventures, 10);
  }
}

function propTrue(prop: string | boolean) {
  if (typeof prop === 'boolean') {
    return prop as boolean;
  } else {
    return getPropertyBoolean(prop as string);
  }
}

export function useIfUnused(item: Item, prop: string | boolean, maxPrice: number) {
  if (!propTrue(prop)) {
    if (Lib.mallPrice(item) <= maxPrice) {
      getCapped(1, item, maxPrice);
      Lib.use(1, item);
    } else {
      Lib.print(`Skipping ${item.name}; too expensive (${Lib.mallPrice(item)} > ${maxPrice}).`);
    }
  }
}

export function totalAmount(item: Item): number {
  return Lib.shopAmount(item) + Lib.itemAmount(item);
}

export function setChoice(adv: number, choice: number) {
  Lib.setProperty(`choiceAdventure${adv}`, `${choice}`);
}

export function myFamiliarWeight() {
  return Lib.familiarWeight(Lib.myFamiliar()) + Lib.weightAdjustment();
}

export function ensureEffect(ef: Effect, turns = 1) {
  if (!tryEnsureEffect(ef, turns)) {
    Lib.abort('Failed to get effect ' + ef.name + '.');
  }
}

export function tryEnsureEffect(ef: Effect, turns = 1) {
  if (Lib.haveEffect(ef) < turns) {
    return !Lib.cliExecute(ef.default) || Lib.haveEffect(ef) === 0;
  }
  return true;
}

export function tryEnsureSkill(sk: Skill) {
  const ef = Lib.toEffect(sk);
  if (Lib.haveSkill(sk) && ef !== Effect.get('none') && Lib.haveEffect(ef) === 0) {
    Lib.useSkill(1, sk);
  }
}

export function trySynthesize(ef: Effect) {
  if (Lib.haveEffect(ef) === 0 && Lib.haveSkill(Skill.get('Sweet Synthesis'))) Lib.sweetSynthesis(ef);
}

export function shrug(ef: Effect) {
  if (Lib.haveEffect(ef) > 0) {
    Lib.cliExecute('shrug ' + ef.name);
  }
}

// Mechanics for managing song slots.
// We have Stevedave's, Ur-Kel's on at all times during leveling; third and fourth slots are variable.
const songSlots: Effect[][] = [
  Effect.get(["Stevedave's Shanty of Superiority", "Fat Leon's Phat Loot Lyric"]),
  Effect.get(["Ur-Kel's Aria of Annoyance"]),
  Effect.get([
    'Power Ballad of the Arrowsmith',
    'The Magical Mojomuscular Melody',
    'The Moxious Madrigal',
    'Ode to Booze',
    " Jackasses' Symphony of Destruction",
  ]),
  Effect.get(["Carlweather's Cantata of Confrontation", 'The Sonata of Sneakiness', 'Polka of Plenty']),
];
export function openSongSlot(song: Effect) {
  for (const songSlot of songSlots) {
    if (songSlot.includes(song)) {
      for (const shruggable of songSlot) {
        shrug(shruggable);
      }
    }
  }
}

export function tryEnsureSong(sk: Skill) {
  const ef = Lib.toEffect(sk);
  if (Lib.haveEffect(ef) === 0) {
    openSongSlot(ef);
    if (!Lib.cliExecute(ef.default) || Lib.haveEffect(ef) === 0) {
      Lib.abort('Failed to get effect ' + ef.name + '.');
    }
  } else {
    Lib.print('Already have effect ' + ef.name + '.');
  }
}

export function ensureOde(turns = 1) {
  while (Lib.haveEffect(Effect.get('Ode to Booze')) < turns) {
    openSongSlot(Effect.get('Ode to Booze'));
    if (!Lib.useSkill(1, Skill.get('The Ode to Booze'))) Lib.abort("Couldn't get Ode for some reason.");
  }
}

export function tryUse(quantity: number, it: Item) {
  if (Lib.availableAmount(it) > 0) {
    return Lib.use(quantity, it);
  } else {
    return false;
  }
}

export function ensureItem(qty: number, it: Item, maxPrice: number) {
  let remaining = qty - Lib.itemAmount(it);
  if (remaining <= 0) return;

  const getCloset = Lib.min(remaining, Lib.closetAmount(it));
  if (!Lib.takeCloset(getCloset, it)) Lib.abort();
  remaining -= getCloset;
  if (remaining <= 0) return;

  const getMall = Lib.min(remaining, Lib.shopAmount(it));
  if (!Lib.takeShop(getMall, it)) Lib.abort();
  remaining -= getMall;
  if (remaining <= 0) return;

  if (!Lib.retrieveItem(remaining, it)) {
    if (Lib.buy(remaining, it, maxPrice) < remaining) Lib.abort(`Mall price too high for ${it.name}.`);
  }
}

const clanCache: {[index: string]: number} = {};
export function setClan(target: string) {
  if (Lib.getClanName() !== target) {
    if (clanCache[target] === undefined) {
      const recruiter = Lib.visitUrl('clan_signup.php');
      const clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      let result;
      while ((result = clanRe.exec(recruiter)) !== null) {
        clanCache[result[2]] = parseInt(result[1], 10);
      }
    }

    Lib.visitUrl(`showclan.php?whichclan=${clanCache[target]}&action=joinclan&confirm=on&pwd`);
    if (Lib.getClanName() !== target) {
      Lib.abort(`failed to switch clans to ${target}. Did you spell it correctly? Are you whitelisted?`);
    }
  }
  return true;
}

export function maximizeCached(objective: string) {
  objective += objective.length > 0 ? ', equip Powerful Glove' : 'equip Powerful Glove';
  if (Lib.getProperty('bcas_objective') === objective) return;
  Lib.setProperty('bcas_objective', objective);
  Lib.maximize(objective, false);
}

export function getStep(questName: string) {
  const stringStep = Lib.getProperty(questName);
  if (stringStep === 'unstarted') return -1;
  else if (stringStep === 'started') return 0;
  else if (stringStep === 'finished') return 999;
  else {
    if (stringStep.substring(0, 4) !== 'step') {
      Lib.abort('Quest state parsing error.');
    }
    return stringStep.substring(4).toInt();
  }
}
