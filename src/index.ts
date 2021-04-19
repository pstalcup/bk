import {
  autosellPrice,
  availableAmount,
  buy,
  cliExecute,
  equip,
  getInventory,
  getStash,
  mallPrice,
  print,
  printHtml,
  putShop,
  takeShop,
  toInt,
  toItem,
  visitUrl,
} from 'kolmafia';
import { freeFightCost, main as fightMain, pickFreeFightFamiliar } from './bkfights';
import { main as killMain } from './bkkill';
import { main as wlMain } from './wl';
import { main as sewerMain } from './sewers';
import { main as dailyMain } from './bkdaily';
import { main as dietMain } from './bkdiet';
import { buffsBelowThreshold, sendKmail, Table, time } from './lib';
import { get, set, property, $item, have } from 'libram';
import { simulateFamiliarMeat } from './simulate';

function help() {
  print('bk [mode] [mode args]');
  let table = new Table();
  table.row('mode', '', '');
  table.row('help', 'print this help', '');
  table.row('pref', '', '');
  table.row('', 'init', 'initialize the preferences used by this script to their default values');
  table.row('', 'list', 'list the preferences used by this script and their current values');
  table.row('daily', 'Run daily tasks (PYEC, BoT, etc.)', '');
  table.row('fights', '', '');
  table.row('', '(noarg)', 'runs all free fights and daily tasks for the day');
  table.row('', 'list', 'list all fight steps');
  table.row('', 'final', 'uses up all final resources, including familiar runs and free banishes');
  table.row('sewers', 'go through the sewer using familiar runaways', '');
  table.row('boss', '', '');
  table.row('', 'status', 'show the status of the hobo bosses');
  table.row('', 'kill', 'kill the bosses, printing out consumable drops');
  table.row('wl', 'whitelist to the provided clan, list sewer status (valves/grates)', '');
  table.row('minbuff', 'show the minimum buff', '');
  printHtml(table.render());
}

function preferences(args: String) {
  let prefDefaults = [
    ['freeFightValue', 40000, 'The Maximimum amount to spend buying free fights'],
    ['stashClan', '', "The clan to pull shared stash items (moveable feast, bag o' tricks, PYEC)"],
    ['fishClan', '', 'The clan to pull Clan Fishery Equipment'],
    ['faxClan', '', 'The clan to recieve faxes in'],
    ['chilledClan', '', 'The clan with a setup High Kiss Castle, tuned Cold'],
    ['freeCopyFight', 'Witchess Bishop', 'The monster to rainman/fax for free fights'],
    ['freeStasisFamiliar', 'Comma Chameleon', 'The familiar to use when running stasis'],
    [
      'simulationMelangePrice',
      '400000',
      'The sales price of melange to use when computing what is a cost effective free kill',
    ],
    [
      'simulationDrumMachineCost',
      '4000',
      'The cost of drum machines to use when computing what is a cost effective free kill',
    ],
    ['simulationSafetyThreshold', '1.1', 'Multiplier for the final free fight cost to account'],
    ['freeBuffThreshold', 25, 'The amount of turns to guarantee of a buff before you run your stasis familiar'],
    ['freeCrownOfThrones', 'Warbear Drone', 'The familiar to put into your Crown of Thrones (if it is used)'],
    ['freeBuddyBjorn', 'Golden Monkey', 'The familiar to put in your Buddy Bjorn (if it is used)'],
    ['getThanksgetting', 'true', 'Whether or not to eat 9 thanksgetting foods'],
    ['additionalFullness', 'mayo', 'How to get to 18 fullness. Either "melange" or "mayo"'],
    ['spendTurns', 'true', 'Allow BK to do certain tasks that are high value turns'],
    ['fillerFood', 'SMOOCH soda', 'Food to fill your remaining stomach with (use a commas to seperate values)'],
    ['infiniteLoopCount', 100, 'How many times a given block of code is allowed to loop before aborting'],
    [
      'fillerBooze',
      'mayo',
      'Booze to fill your remaining liver with (use a commas to seperate values). If "mayo", it will use food filler',
    ],
    ['free.hat', 'Crown of Thrones', 'Freefight outfit Hat'],
    [
      'free.back',
      'Buddy Bjorn',
      'Freefight outfit Back (will be flexed to Protonic Accelerator Pack if needed for quest)',
    ],
    ['free.shirt', "Stephen's Lab Coat", 'Freefight outfit Shirt'],
    ['free.weapon', "Thor's Pliers", 'Freefight outfit Weapon'],
    ['free.off-hand', 'KoL Con 13 snowglobe', 'Freefight outfit Offhand'],
    ['free.pants', 'pantogram pants', 'Freefight outfit Pants'],
    ['free.acc1', "Mr. Screege's Spectacles", 'Freefight outfit Accessory (1)'],
    ['free.acc2', "Mr. Cheeng's Spectacles", 'Freefight outfit Accessory (2)'],
    [
      'free.acc3',
      'Lucky gold ring',
      'Freefight outfit Accessory (3) (this will be flexed out for accessoies as needed in some free fights)',
    ],
    ['free.familiar', 'Ittah Bittah Hookah', 'Freefight outfit Familiar Eqiupment (will be equipped if possible)'],
    ['otoscopeBoss', 'Oscus', 'The boss against whom to use otoscope'],
    ['bk.hat', 'Training helmet', 'Bosskilling outfit Hat'],
    ['bk.back', 'Vampyric Cloake', 'Bosskilling outfit Back'],
    ['bk.shirt', 'tunac', 'Bosskilling outfit Shirt'],
    ['bk.weapon', "scratch 'n' sniff sword", 'Bosskilling outfit Weapon'],
    ['bk.off-hand', 'A Light that Never Goes Out', 'Bosskilling outfit Offhand'],
    ['bk.pants', 'pantogram pants', 'Bosskilling outfit Pants'],
    ['bk.acc1', "Mayor Ghost's Sash", 'Bosskilling outfit Accessory (1)'],
    ['bk.acc2', 'Old Soft Shoes', 'Bosskilling outfit Accessory (2)'],
    [
      'bk.acc3',
      'Ring of the Skeleton Lord',
      'Bosskilling outfit Accessory (3) (this will be flexed out for Lil Doctor Bag as needed)',
    ],
    ['bk.familiar', 'Luck Incense', 'Bosskilling outfit Familiar'],
  ];
  if (args.trim() == 'list') {
    let table = new Table();
    table.row('Preference', 'Value', 'Default Value', 'Description');
    let prefValue = (r: Array<string | number>) => (r.length > 1 ? get<string>(`${r[0]}`) : '');
    prefDefaults.forEach(row => table.row(row[0], prefValue(row), ...row.slice(1)));
    printHtml(table.render());
  } else if (args.trim() == 'init') {
    prefDefaults.forEach(row => set(`${row[0]}`, row[1]));
  }
}

function mall() {
  let inventory = getInventory();
  let expensiveItems: Array<Item> = [];
  let autoSellItems: Array<Item> = [];
  for (let itemStr in inventory) {
    let item = toItem(itemStr);
    let price = mallPrice(item);
    if (price > 10000) {
      expensiveItems.push(item);
    }
    if (autosellPrice(item) > 1000) {
      autoSellItems.push(item);
    }
  }
  print(`You have ${expensiveItems.length} expensive items. Here are 25:`);
  expensiveItems.slice(0, 25).forEach(i => print(`${i}:${mallPrice(i)}`));
  print(`You have ${autoSellItems.length} high autosell items. Here are 25:`);
  autoSellItems.slice(0, 25).forEach(i => print(`${i}:${autosellPrice(i)}`));
}

function stash() {
  let inventory = getStash();
  let expensiveItems: Array<Item> = [];
  const PRICE_THRESHOLD = 1000000;
  for (let itemStr in inventory) {
    let qty = inventory[itemStr];
    let item = toItem(itemStr);
    let price = mallPrice(item);
    if (price > PRICE_THRESHOLD || (qty && qty * price > PRICE_THRESHOLD)) {
      expensiveItems.push(item);
    }
  }
  expensiveItems.forEach(i => print(`${i}:${mallPrice(i)}`));
}

function kmail() {
  let items = new Map<Item, number>();
  items.set($item`seal tooth`, 1);

  sendKmail('phreddrickkv2', 'This is a test of my kmail function', items);
}

export function main(args: string) {
  if (!args || args.length == 0) {
    print("run 'bk help' for help");
  } else {
    time(() => {
      let matchedArgs = args.match(RegExp(/(\w+) ?(.*)/));
      if (matchedArgs) {
        let mode = matchedArgs[1].trim();
        let modeArgs = matchedArgs[2] || '';

        switch (mode) {
          case 'pref':
          case 'prefs':
            preferences(modeArgs);
            break;
          case 'help':
            help();
            break;
          case 'fights':
            fightMain(modeArgs);
            break;
          case 'daily':
            dailyMain();
            break;
          case 'sewers':
            sewerMain();
            break;
          case 'boss':
            killMain(modeArgs);
            break;
          case 'diet':
            dietMain(modeArgs);
            break;
          case 'wl':
          case 'whitelist':
            wlMain(modeArgs);
            break;
          case 'minbuff':
          case 'genie':
            let threshold = property.getNumber('freeBuffThreshold');
            let thresholdEffects = buffsBelowThreshold(threshold, modeArgs);
            if (thresholdEffects.length > 0) {
              thresholdEffects
                .sort(([effectA, a]: [Effect, number], [effectB, b]: [Effect, number]) => b - a)
                .forEach(([minEffect, minTurns]: [Effect, number]) =>
                  print(
                    `${minEffect}: ${minTurns} (${minEffect.default || minEffect.note})`,
                    minTurns < 20 ? 'red' : 'yellow'
                  )
                );
            } else {
              print(`All relevant buffs exceed threshold of ${get('freeBuffThreshold')} turns`);
            }
            if (mode.includes('genie')) {
              thresholdEffects.forEach(([effect, turns]: [Effect, number]) => {
                let numWishes = Math.ceil((threshold - turns) / 20);
                print(`${effect} is missing ${numWishes} genie buffs`);
                //buy(numWishes, $item`pocket wish`, 50000);

                if (!cliExecute(`genie effect ${effect}`)) {
                  print(`genie effect ${effect}`);
                }
              });
            }
            break;
          case 'mall':
            mall();
            break;
          case 'fakehand':
            while (availableAmount($item`fake hand`) > 0) {
              equip($item`fake hand`);
            }
            break;
          case 'freefight':
            let perFight = simulateFamiliarMeat();
            print(`Melange Price: ${property.getNumber('simulationMelangePrice')}`);
            print(`Drum Machine Cost: ${property.getNumber('simulationDrumMachineCost')}`);
            print(`Simulation Safety Threshold: ${property.getNumber('simulationSafetyThreshold')}`);
            print(`Free Fight Values (${perFight}):`);
            print('Using Current Familiar', 'Blue');
            print(`Current Familiar Choice: ${pickFreeFightFamiliar(true)}`);
            print(`Drum Machine, Choose Familiar: ${freeFightCost(true, true)}`);
            print(`(Single Battery): ${freeFightCost(true, true) / 4}`);
            print(`Drum Machine, Do not Choose: ${freeFightCost(true, false)}`);
            print(`No Drum Machine, Choose Familiar: ${freeFightCost(false, true)}`);
            print(`No Drum Machine, Do not Choose: ${freeFightCost(false, false)}`);
            print('Using Meat Familiar Override');
            print(`Current Familiar Choice (meat familiar): ${pickFreeFightFamiliar(true, true)}`);
            print(`Drum Machine, Choose Familiar (meat familiar): ${freeFightCost(true, true, true)}`);
            print(`(Single Battery): ${freeFightCost(true, true, true) / 4}`);
            print(`Drum Machine, Do not Choose (meat familiar): ${freeFightCost(true, false, true)}`);
            print(`No Drum Machine, Choose Familiar (meat familiar): ${freeFightCost(false, true, true)}`);
            print(`No Drum Machine, Do not Choose (meat familiar): ${freeFightCost(false, false, true)}`);

            if (modeArgs.includes('update')) {
              let batteryPrice = Math.floor(freeFightCost(true, true, true) / 4);
              print(`Updating battery price @ ${batteryPrice}`, 'red');
              takeShop($item`Battery (AAA)`);
              cliExecute('refresh inventory');
              putShop(batteryPrice, 1, Math.min(5, availableAmount($item`Battery (AAA)`)), $item`Battery (AAA)`);
            }

            break;
          case 'stash':
            stash();
            break;
          case 'kmailtest':
            kmail();
        }
      } else {
        print(`Invalid args ${args}`);
      }
    });
  }
}
