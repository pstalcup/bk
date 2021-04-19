import {
  availableAmount,
  buy,
  buyPrice,
  cliExecute,
  craft,
  getCampground,
  handlingChoice,
  mallPrice,
  maximize,
  myMeat,
  print,
  retrieveItem,
  reverseNumberology,
  runChoice,
  sellPrice,
  sellsItem,
  toInt,
  toItem,
  use,
  useSkill,
  visitUrl,
} from 'kolmafia';
import { $coinmasters, $item, $skill, get, have, property } from 'libram';
import { castArray } from 'lodash-es';
import { inClan, LogLevel, setChoice, withStash, log } from './lib';

let tasks = new Array<() => void>();

function dailyTask(name: string, condition: () => boolean, action: () => void, runAtLeastOnce = false) {
  let wrappedTask = () => {
    log(LogLevel.Debug, `Running Task ${name}`);
    let loopCount = 0;
    while (runAtLeastOnce || condition()) {
      runAtLeastOnce = false;
      if (loopCount > 10) {
        throw `Infinite Loop in ${name}`;
      }
      action();
      loopCount++;
    }
  };
  tasks.push(wrappedTask);
}

dailyTask(
  'raffle house',
  () => availableAmount($item`raffle ticket`) < 11,
  () => cliExecute('raffle 11')
);

const pyec = $item`Platinum Yendorian Express Card`;
dailyTask(
  'pyec',
  () => !get('expressCardUsed'),
  () => withStash([pyec], () => use(pyec))
);

const bot = $item`Bag o' Tricks`;
dailyTask(
  "bag o' tricks",
  () => !get('_bagOTricksUsed'),
  () => withStash([bot], () => use(bot))
);

dailyTask(
  'dinsey garbage',
  () => (get('stenchAirportAlways') || get('_stenchAirportToday')) && !get('_dinseyGarbageDisposed'),
  () => {
    retrieveItem($item`bag of park garbage`);
    setChoice(1067, 6);
    visitUrl('place.php?whichplace=airport_stench&action=airport3_tunnels');
    runChoice(6);
  }
);

dailyTask(
  'towering inferno',
  () => (get('hotAirportAlways') || get('_hotAirportToday')) && !get('_infernoDiscoVisited'),
  () => {
    maximize('disco style', false);
    setChoice(1090, 7);
    visitUrl('place.php?whichplace=airport_hot&action=airport4_zone1');
    runChoice(7);
  }
);

class VolcanoQuest {
  static finishedQuest() {
    return get('_volcanoItemRedeemed');
  }

  static hasQuest() {
    return property.getNumber('_volcanoItem1') !== 0;
  }

  static getItem(index: number, tradeableComponent: boolean = true) {
    let itemNumber: number = toInt(property.getString(`_volcanoItem${index}`));
    let item = toItem(itemNumber);
    if (tradeableComponent && item === $item`SMOOCH bracers`) {
      return $item`superheated metal`;
    }
    return item;
  }

  static getAmount(index: number, tradeableComponent: boolean = true) {
    let amount = property.getNumber(`_volcanoItemCount${index}`);
    if (tradeableComponent && this.getItem(index) === $item`SMOOCH bracers`) {
      return amount * 3;
    }
    return amount;
  }

  static price(index: number) {
    let item = this.getItem(index);
    return item.tradeable ? mallPrice(item) * (availableAmount(item) - this.getAmount(index)) : -1;
  }

  static retrieveItem(index: number) {
    retrieveItem(this.getItem(index, false), this.getAmount(index, false));
  }
}

dailyTask(
  'volcoino quest',
  () =>
    !VolcanoQuest.finishedQuest() &&
    (!VolcanoQuest.hasQuest() || [1, 2, 3].some(i => VolcanoQuest.getItem(i).tradeable)),
  () => {
    if (property.getNumber('_volcanoItem1') === 0) {
      visitUrl('place.php?whichplace=airport_hot&action=airport4_questhub');
    } else {
      let tradeable = [1, 2, 3].filter(i => VolcanoQuest.getItem(i).tradeable);
      if (tradeable.length > 0) {
        let target = tradeable.reduce((agg, cur) => (VolcanoQuest.price(agg) < VolcanoQuest.price(cur) ? agg : cur));
        VolcanoQuest.retrieveItem(target);
        setChoice(1093, target);
        visitUrl('place.php?whichplace=airport_hot&action=airport4_questhub');
        runChoice(target);
      }
    }
  }
);

dailyTask(
  'stickers',
  () => have($skill`Summon Stickers`) && get('_stickerSummons') < 3,
  () => useSkill($skill`Summon Stickers`)
);

dailyTask(
  'sugar',
  () => have($skill`Summon Sugar Sheets`) && get('_sugarSummons') < 3,
  () => useSkill($skill`Summon Sugar Sheets`)
);

dailyTask(
  'smiths',
  () => have($skill`Summon Smithsness`) && get('_smithsnessSummons') < 3,
  () => useSkill($skill`Summon Smithsness`)
);

dailyTask(
  'clip art',
  () => have($skill`Summon Clip Art`) && get('_clipartSummons') < 3,
  () => cliExecute('make familiar jacks')
);

dailyTask(
  "Alice's Army",
  () => have($skill`Summon Alice's Army Cards`) && get('grimoire3Summons') < 1,
  () => useSkill($skill`Summon Alice's Army Cards`)
);

let draws = ['Ancestral Recall', 'Island', '952 Mickey Mantle'];
dailyTask(
  'deck of every card',
  () => have($item`Deck of Every Card`) && get('_deckCardsDrawn') < 15,
  () => cliExecute(`cheat ${draws.find(draw => !get('_deckCardsSeen').includes(draw))}`)
);

dailyTask(
  'Tea trea',
  () => getCampground()['potted tea tree'] !== undefined && !get('_pottedTeaTreeUsed'),
  () => cliExecute('teatree royal tea')
);

dailyTask(
  'Swim item',
  () => !get('_olympicSwimmingPoolItemFound'),
  () => cliExecute('swim item')
);

// note this relies on having Ezandoras bastille script installed
dailyTask(
  'Bastille',
  () => get('_bastilleGames') == 0,
  () => cliExecute('bastille muscle')
);

dailyTask(
  'Rainbows Gravity',
  () => get('prismaticSummons') < 3,
  () => useSkill($skill`Rainbow Gravitation`)
);

class SpaceGate {
  static available() {
    return get('spacegateAlways') || get('_spacegateToday');
  }

  static availableVaccines() {
    [1, 2, 3].filter(i => property.getBoolean(`spacegateVaccine${i}`));
  }
}

dailyTask(
  'genie',
  () => get('_genieWishesUsed') < 3,
  () => cliExecute('genie item pocket')
);

dailyTask(
  'buy wishes',
  () => availableAmount($item`pocket wish`) > 0,
  () => {
    let pocketWishes = availableAmount($item`pocket wish`);
    for (var i = 0; i < pocketWishes; ++i) {
      cliExecute('genie meat');
    }
    buy(Math.floor(myMeat() / 50000), $item`pocket wish`, 49999);
  },
  true
);

dailyTask(
  'BACON',
  () => !get('_baconMachineUsed'),
  () => use($item`Infinite bacon machine`)
);

dailyTask(
  'perfect freeze',
  () => have($skill`Perfect Freeze`) && !get('_perfectFreezeUsed'),
  () => useSkill($skill`Perfect Freeze`)
);

dailyTask(
  'incredible self esteem',
  () => have($skill`Incredible Self Esteem`) && !get('_incredibleSelfEsteemCast'),
  () => useSkill($skill`Incredible Self Esteem`)
);

let numberologyTarget = 14;
dailyTask(
  'numberology',
  () =>
    have($skill`Calculate the Universe`) &&
    get('_universeCalculated') < get('skillLevel144') &&
    reverseNumberology()[numberologyTarget] !== undefined,
  () => cliExecute(`numberology ${numberologyTarget}`)
);

function useCurrency(currency: Item, target: Item, condition?: (() => boolean) | null) {
  let safeCondition = condition || (() => true);
  let coinmaster = $coinmasters``.find(c => sellsItem(c, target));
  if (coinmaster) {
    let price = sellPrice(coinmaster, target);
    dailyTask(
      `Spend ${currency} on ${target}`,
      () => safeCondition() && availableAmount(currency) >= price,
      () => coinmaster && buy(coinmaster, 1, target)
    );
  }
}

useCurrency($item`Beach Buck`, $item`one-day ticket to Spring Break Beach`);
useCurrency($item`Coinspiracy`, $item`karma shawarma`);
useCurrency($item`FunFunds™`, $item`one-day ticket to Dinseylandfill`);
useCurrency($item`Volcoino`, $item`one-day ticket to That 70s Volcano`);
useCurrency($item`Wal-Mart gift certificate`, $item`one-day ticket to The Glaciest`);
useCurrency(
  $item`Freddy Kruegerand`,
  $item`Hot Dreadsylvanian Cocoa`,
  () => availableAmount($item`Hot Dreadsylvanian Cocoa`) < 5
);
useCurrency(
  $item`Freddy Kruegerand`,
  $item`Dreadsylvanian skeleton key`,
  () => availableAmount($item`Freddy Kruegerand`) > 25
);
useCurrency($item`BACON`, $item`Print Screen Button`, () => !get('_internetPrintScreenButtonBought'));

export function main() {
  log(LogLevel.None, 'Running Daily Tasks...');
  inClan(get('fishClan'), () => tasks.forEach(task => task()));
}
