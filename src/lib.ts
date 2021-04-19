import {
  abort,
  availableAmount,
  buy,
  cliExecute,
  closetAmount,
  eat,
  effectModifier,
  familiarWeight,
  formatDateTime,
  gamedayToInt,
  gametimeToInt,
  getCampground,
  getClanName,
  getProperty,
  haveEffect,
  itemAmount,
  logprint,
  mallPrice,
  myAdventures,
  myClass,
  myEffectiveFamiliar,
  myEffects,
  myFamiliar,
  myLocation,
  myMaxmp,
  myMp,
  myThrall,
  myTurncount,
  nowToInt,
  numericModifier,
  print,
  printHtml,
  putStash,
  retrieveItem,
  setAutoAttack,
  setProperty,
  shopAmount,
  takeCloset,
  takeShop,
  takeStash,
  timeToString,
  todayToString,
  toEffect,
  toInt,
  urlEncode,
  use,
  useSkill,
  visitUrl,
  wait,
  weightAdjustment,
} from 'kolmafia';
import { $class, $effect, $effects, $item, $items, $location, $skill, $thrall, get, have } from 'libram';
import { getSewersState, throughSewers } from './sewers';
import { setClan } from './wl';

export enum LogLevel {
  None = -1,
  Info = 0,
  Debug = 1,
}
let log = (function () {
  let printLevel = LogLevel.None;
  switch (get<string>('bkLogLevel').toLowerCase()) {
    case 'debug':
      printLevel = LogLevel.Debug;
      break;
    case 'info':
      printLevel = LogLevel.Info;
      break;
  }

  return function (level: LogLevel, message: string, color?: string | null) {
    if (printLevel >= level) {
      if (color) {
        print(message, color);
      } else {
        print(message);
      }
    }
  };
})();
export { log };

export class MayoClinic {
  static present() {
    return getCampground()[$item`portable Mayo clinic`.name] !== undefined;
  }

  static canPlace() {
    return have($item`portable Mayo clinic`) && !get('_workshedItemUsed');
  }

  static set(item: Item) {
    cliExecute(`mayominder ${item}`);
  }

  static tryPlace() {
    if (!MayoClinic.present() && MayoClinic.canPlace()) {
      use($item`portable Mayo clinic`);
    }
    return MayoClinic.present();
  }
}

const effectsLookup: Map<String, Map<Number, Effect>> = new Map();
$effects``.forEach(e => {
  let currentMap = effectsLookup.get(e.name) || new Map<Number, Effect>();
  currentMap.set(toInt(e), e);
  effectsLookup.set(e.name, currentMap);
});

export function myEffectsClean() {
  let currentEffects = myEffects();
  let cleanEffects: Array<[Effect, number]> = new Array();
  let duplicateEffectRegex = new RegExp(/^\[(\d*)\](.*)$/);

  for (const effectStr in currentEffects) {
    let effectMatch = effectStr.match(duplicateEffectRegex);
    if (effectMatch && effectMatch.length > 1) {
      let effectId = parseInt(effectMatch[1]);
      cleanEffects.push([toEffect(effectId), currentEffects[effectStr]]);
    } else {
      cleanEffects.push([toEffect(effectStr), currentEffects[effectStr]]);
    }
  }

  return cleanEffects;
}
export class Table {
  rows: (object | string | number)[][] = [];

  row(...cells: (object | string | number)[]) {
    logprint(cells.join('\t'));
    this.rows.push(cells);
  }

  render() {
    const rowsHtml = this.rows.map(
      cells => `<tr><td>${cells.map(cell => cell.toString()).join('</td><td>')}</td></tr>`
    );
    return `<table border="1"><tbody>${rowsHtml.join('')}</table></tbody>`;
  }
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function getPropertyString(name: string, def: string | null = null): string {
  const str = getProperty(name);
  return str === '' && def !== null ? def : str;
}

export function getPropertyInt(name: string, default_: number | null = null): number {
  const str = getProperty(name);
  if (str === '') {
    if (default_ === null) throw `Unknown property ${name}.`;
    else return default_;
  }
  return parseInt(str, 10);
}

export function getPropertyBoolean(name: string, default_: boolean | null = null) {
  const str = getProperty(name);
  if (str === '') {
    if (default_ === null) throw `Unknown property ${name}.`;
    else return default_;
  }
  return str === 'true';
}

export function setPropertyInt(name: string, value: number) {
  setProperty(name, value.toString());
}

export function setChoice(adv: number, choice: number) {
  setProperty(`choiceAdventure${adv}`, `${choice}`);
}

export function setChoices(choices: Map<number, number>) {
  choices.forEach((adv, choice) => {
    setChoice(adv, choice);
  });
}

export function getChoice(adv: number) {
  return getPropertyInt(`choiceAdventure${adv}`);
}

export function cheapest(...items: Item[]) {
  const prices = items.map(it => mallPrice(it));
  const pricesChecked = prices.map(p => (p < 100 ? 999999999 : p));
  const minIndex = pricesChecked.reduce((i, x, j) => (pricesChecked[i] < x ? i : j), 0);
  return items[minIndex];
}

export function getItem(qty: number, item: Item, maxPrice: number) {
  print(`Getting ${qty} ${item} @ max price ${maxPrice}`, `blue`);
  if (item !== $item`pocket wish` && qty * mallPrice(item) > 1000000) abort('bad get!');

  try {
    retrieveItem(qty, item);
  } catch (e) {}

  let remaining = qty - itemAmount(item);
  if (remaining <= 0) return qty;

  const getCloset = Math.min(remaining, closetAmount(item));
  if (!takeCloset(getCloset, item)) abort('failed to remove from closet');
  remaining -= getCloset;
  if (remaining <= 0) return qty;

  let getMall = Math.min(remaining, shopAmount(item));
  if (!takeShop(getMall, item)) {
    cliExecute('refresh shop');
    cliExecute('refresh inventory');
    remaining = qty - itemAmount(item);
    getMall = Math.min(remaining, shopAmount(item));
    if (!takeShop(getMall, item)) abort('failed to remove from shop');
  }
  remaining -= getMall;
  if (remaining <= 0) return qty;

  remaining -= buy(remaining, item, maxPrice);
  if (remaining > 0) print(`Mall price too high for ${item}.`);
  return qty - remaining;
}

export function sausageMp(target: number) {
  if (
    myMp() < target &&
    myMaxmp() >= 400 &&
    getPropertyInt('_sausagesEaten') < 23 &&
    availableAmount($item`magical sausage casing`) > 0
  ) {
    eat(1, Item.get('magical sausage'));
  }
}

export function myFamiliarWeight(familiar: Familiar | null = null) {
  if (familiar === null) familiar = myFamiliar();
  return familiarWeight(familiar) + weightAdjustment();
}

export function lastWasCombat() {
  return !myLocation().noncombatQueue.includes(getProperty('lastEncounter'));
}

export function unclosetNickels() {
  for (const item of $items`hobo nickel, sand dollar`) {
    takeCloset(closetAmount(item), item);
  }
}

export function stopAt(args: string) {
  let stopTurncount = myTurncount() + myAdventures() * 1.1 + 50;
  if (Number.isFinite(parseInt(args, 10))) {
    stopTurncount = myTurncount() + parseInt(args, 10);
  }
  return Math.round(stopTurncount);
}

export function mustStop(stopTurncount: number) {
  return myTurncount() >= stopTurncount || myAdventures() === 0;
}

let turbo = true;
export function turboMode() {
  return turbo;
}

export function ensureJingle() {
  if (haveEffect($effect`Jingle Jangle Jingle`) === 0) {
    cliExecute(`csend to buffy || ${Math.round(myAdventures() * 1.1 + 200)} jingle`);
    for (let i = 0; i < 5; i++) {
      wait(3);
      cliExecute('refresh status');
      if (haveEffect($effect`Jingle Jangle Jingle`) > 0) break;
    }
    if (haveEffect($effect`Jingle Jangle Jingle`) === 0) abort('Get Jingle Bells first.');
  }
}

function writeWhiteboard(text: string) {
  visitUrl(`clan_basement.php?pwd&action=whitewrite&whiteboard=${urlEncode(text)}`, true, true);
}

export function recordInstanceState() {
  const lines = [
    `Ol' Scratch at image ${getImage($location`Burnbarrel Blvd.`)}`,
    `Frosty at image ${getImage($location`Exposure Esplanade`)}`,
    `Oscus at image ${getImage($location`The Heap`)}`,
    `Zombo at image ${getImage($location`The Ancient Hobo Burial Ground`)}`,
    `Chester at image ${getImage($location`The Purple Light District`)}`,
  ];
  let whiteboard = '';
  const date = formatDateTime('yyyyMMdd', todayToString(), 'yyyy-MM-dd');
  whiteboard += `Status as of ${date} ${timeToString()}:\n`;
  for (const line of lines) {
    print(line);
    whiteboard += `${line}\n`;
  }
  writeWhiteboard(whiteboard);
  print('"Mining" complete.');
}

const places: { [index: string]: { name: string; number: number } } = {
  'Hobopolis Town Square': {
    name: 'townsquare',
    number: 2,
  },
  'Burnbarrel Blvd.': {
    name: 'burnbarrelblvd',
    number: 4,
  },
  'Exposure Esplanade': {
    name: 'exposureesplanade',
    number: 5,
  },
  'The Heap': {
    name: 'theheap',
    number: 6,
  },
  'The Ancient Hobo Burial Ground': {
    name: 'burialground',
    number: 7,
  },
  'The Purple Light District': {
    name: 'purplelightdistrict',
    number: 8,
  },
};
export function getImage(location: Location) {
  const { name, number } = places[location.toString()];
  const text = visitUrl(`clan_hobopolis.php?place=${number}`);
  const match = text.match(new RegExp(`${name}([0-9]+)o?.gif`));
  if (!match) return -1;
  return parseInt(match[1], 10);
}

const memoizeStore = new Map<() => unknown, [number, unknown]>();
export function memoizeTurncount<T>(func: (...args: []) => T, turnThreshold = 1) {
  const forceUpdate = (...args: []) => {
    const result = func(...args);
    memoizeStore.set(func, [myTurncount(), result]);
    return result;
  };
  const result = (...args: []) => {
    const [lastTurncount, lastResult] = memoizeStore.get(func) || [-1, null];
    if (myTurncount() >= lastTurncount + turnThreshold) {
      return forceUpdate(...args);
    } else {
      return lastResult as T;
    }
  };
  result.forceUpdate = forceUpdate;
  return result;
}

export const getImageTownsquare = memoizeTurncount(() => getImage($location`Hobopolis Town Square`), 10);
export const getImageBb = memoizeTurncount(() => getImage($location`Burnbarrel Blvd.`));
export const getImageEe = memoizeTurncount(() => getImage($location`Exposure Esplanade`), 10);
export const getImageHeap = memoizeTurncount(() => getImage($location`The Heap`), 10);
export const getImagePld = memoizeTurncount(() => getImage($location`The Purple Light District`), 10);
export const getImageAhbg = memoizeTurncount(() => getImage($location`The Ancient Hobo Burial Ground`), 10);

export function wrapMain(args = '', action: () => void) {
  try {
    turbo = args.includes('turbo');
    if (myClass() === $class`Pastamancer` && myThrall() !== $thrall`Elbow Macaroni`) {
      useSkill(1, $skill`Bind Undead Elbow Macaroni`);
    }
    ensureJingle();
    cliExecute('counters nowarn Fortune Cookie');
    cliExecute('mood apathetic');
    cliExecute('ccs minehobo2');
    cliExecute('terminal educate digitize; terminal educate extract');
    setProperty('hpAutoRecovery', turbo ? '0.5' : '0.8');
    setProperty('hpAutoRecoveryTarget', '0.95');
    action();
    print('Done mining.');
  } finally {
    setAutoAttack(0);
    setProperty('minehobo_lastObjective', '');
    setProperty('minehobo_lastStats', '');
    setProperty('minehobo_lastFamiliar', '');
    unclosetNickels();
    if (throughSewers()) recordInstanceState();
  }
}

export function extractInt(regex: RegExp, text: string, group = 1) {
  if (!regex.global) throw 'Regexes must be global.';
  let result = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[group] === 'a') {
      result += 1;
    } else {
      result += parseInt(match[group], 10);
    }
  }
  return result;
}

export function printLines(...lines: string[]) {
  for (const line of lines) {
    logprint(line);
  }
  printHtml(lines.map(line => line.replace('<', '&lt;')).join('\n'));
}

export function effectiveFamiliarWeight() {
  return familiarWeight(myFamiliar()) + weightAdjustment();
}

export function inClan<T>(clanName: string, action: () => T) {
  clanName = clanName.toLowerCase();
  const startingClanName = getClanName().toLowerCase();
  if (startingClanName !== clanName) setClan(clanName);
  if (getClanName().toLowerCase() !== clanName) {
    throw `Failed to move to clan ${clanName} (currently in ${getClanName()})`;
  }
  try {
    return action();
  } finally {
    if (startingClanName !== clanName) setClan(startingClanName);
  }
}

export function withStash<T>(itemsToTake: Item[], action: () => T) {
  if (itemsToTake.every(item => availableAmount(item) > 0)) return action();

  const stashClanName = get<string>('stashClan');
  if (stashClanName === '') throw `No clan specified to borrow from the stash`;

  return inClan(stashClanName, () => {
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
    }
  });
}

export function buffsBelowThreshold(threshold: number, modifierStr?: string) {
  let myEffects = myEffectsClean();
  let modifiers = modifierStr ? modifierStr.split(';') : [];
  modifiers =
    modifiers.length === 0
      ? ['Item Drop', 'Meat Drop', 'Monster Level', 'Booze Drop', 'Food Drop', 'Familiar Weight']
      : modifiers;

  return myEffects.filter(([effect, turns]: [Effect, number]) =>
    modifiers.some(modifier => numericModifier(effect, modifier) > 0 && turns < threshold)
  );
}

export function minimumRelevantBuff(modifierStr?: string) {
  let myEffects = myEffectsClean();
  let modifiers = modifierStr ? modifierStr.split(';') : [];
  modifiers = modifiers.length === 0 ? ['Item Drop', 'Meat Drop', 'Monster Level'] : modifiers;
  let relevantBuffs = myEffects.filter(([effect, turns]: [Effect, number]) =>
    modifiers.some(modifier => numericModifier(effect, modifier) > 0)
  );

  let [
    minEffect,
    minTurns,
  ] = relevantBuffs.reduce(([aggEffect, aggTurns]: [Effect, number], [curEffect, curTurns]: [Effect, number]) =>
    aggTurns > curTurns ? [curEffect, curTurns] : [aggEffect, aggTurns]
  );
  return [minEffect, minTurns];
}

export function time<T>(action: () => T, level?: LogLevel): T {
  let startTime = nowToInt();
  let retVal = action();
  let totalTime = nowToInt() - startTime;
  if (level === undefined) level = LogLevel.Debug;
  if (totalTime < 1000) {
    log(level, `Took ${totalTime} ms`);
  } else if (totalTime < 60 * 1000) {
    log(level, `Took ${totalTime / 1000} Seconds`);
  } else if (totalTime < 60 * 60 * 1000) {
    log(level, `Took ${totalTime / (60 * 1000)} Minutes`);
  }
  return retVal;
}

export function assert(condition: boolean | (() => boolean), message: string) {
  let assertCondition = condition;
  if (condition && typeof condition === 'function') {
    let assertCondition = condition();
  }
  if (!assertCondition) {
    throw message;
  }
}

export function sendKmail(playerName: string, message: string, items: Map<Item, number>, multiKmail: boolean = false) {
  assert(
    items.size <= 11 && !multiKmail,
    'Can only send 11 items in a single KMail. Use parameter "multiKmail" to send multiple kmails'
  );
  assert(message.length <= 2000, 'KMail text body must be less than 2000 characters');
  let i = 1;
  let encodedPlayer = encodeURIComponent(playerName);
  let encodedMessage = encodeURIComponent(message);
  cliExecute('refresh inventory');
  let params = `towho=${encodedPlayer}&message=${encodedMessage}&submit=${encodeURIComponent('Send Message.')}`;
  for (let item of items.keys()) {
    let qty = items.get(item)!;
    let amt = availableAmount(item);
    if (amt < qty) {
      print(`Couldn't send ${item}, didn't have enough, only had ${amt}`, 'red');
    } else {
      params += `&whichitem${i}=${toInt(item)}&howmany${i}=${qty}`;
      i += 1;
    }
  }
  let url = `sendmessage.php?toid=&${params}&pwd&action=send`;
  print(url, 'red');
  visitUrl(url, true, true);
}
