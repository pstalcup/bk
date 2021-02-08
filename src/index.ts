import { print, printHtml } from 'kolmafia';
import { main as fightMain } from './bkfights';
import { main as killMain } from './bkkill';
import { main as buffMain } from './bkbuffs';
import { main as wlMain } from './wl';
import { main as sewerMain } from './sewers';
import { minimumRelevantBuff, Table } from './lib';
import { get, set } from 'libram';

function help() {
  print('bk [mode] [mode args]');
  let table = new Table();
  table.row('mode', '', '', '');
  table.row('help', 'print this help', '');
  table.row('pref', '', '');
  table.row('', 'init', 'initialize the preferences used by this script to their default values');
  table.row('', 'list', 'list the preferences used by this script and their current values');
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
    ['fishClan', '', 'The clan to pull fish equipment from'],
    ['stashClan', '', "The clan to pull shared stash items (moveable feast, bag o' tricks, PYEC)"],
    ['fishClan', '', 'The clan to pull Clan Fishery Equipment'],
    ['chilledClan', '', 'The clan with a setup High Kiss Castle, tuned Cold'],
    ['freeCopyFight', 'Witchess Bishop', 'The monster to rainman/fax for free fights'],
    ['freeStasisFamiliar', 'Comma Chameleon', 'The familiar to use when running stasis'],
    ['freeBuffThreshold', 25, 'The amount of turns to guarantee of a buff before you run your stasis familiar'],
    ['freeCrownOfThrones', 'Warbear Drone', 'The familiar to put into your Crown of Thrones (if it is used)'],
    ['freeBuddyBjorn', 'Golden Monkey', 'The familiar to put in your Buddy Bjorn (if it is used)'],
    ['free.hat', 'Crown of Thrones', 'Freefight outfit Hat'],
    ['free.back', 'Buddy Bjorn', 'Freefight outfit Back'],
    ['free.shirt', "Stephen's Lab Coat", 'Freefight outfit Shirt'],
    ['free.weapon', "Thor's Pliers", 'Freefight outfit Weapon'],
    ['free.offhand', 'KoL Con 13 snowglobe', 'Bosskilling outfit Offhand'],
    ['free.pants', 'pantogram pants', 'Freefight outfit Pants'],
    ['free.acc1', "Mr. Screege's Spectacles", 'Freefight outfit Accessory (1)'],
    ['free.acc2', "Mr. Cheeng's Spectacles", 'Freefight outfit Accessory (2)'],
    [
      'free.acc3',
      'Lucky gold ring',
      'Freefight outfit Accessory (3) (this will be flexed out for accessoies as needed in some free fights)',
    ],
    ['free.familiar', 'Ittah Bittah Hookah', 'Freefight outfit Familiar Eqiupment (will be equipped if possible)'],
    ['bk.hat', 'Training helmet', 'Bosskilling outfit Hat'],
    ['bk.back', 'Vampyric Cloake', 'Bosskilling outfit Back'],
    ['bk.shirt', 'tunac', 'Bosskilling outfit Shirt'],
    ['bk.weapon', "scratch 'n' sniff sword", 'Bosskilling outfit Weapon'],
    ['bk.offhand', 'A Light that Never Goes Out', 'Bosskilling outfit Offhand'],
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

export function main(args: string) {
  if (!args || args.length == 0) {
    print("run 'bk help' for help");
  } else {
    let matchedArgs = args.match(RegExp(/(\w+) ?(.*)/));
    print(`${matchedArgs}`);
    if (matchedArgs) {
      let mode = matchedArgs[1].trim();
      let modeArgs = matchedArgs[2] || '';
      print(`${mode} ${modeArgs}`);

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
        case 'sewers':
          sewerMain();
          break;
        case 'boss':
          killMain(modeArgs);
          break;
        case 'wl':
        case 'whitelist':
          wlMain(modeArgs);
          break;
        case 'minbuff':
          let [minEffect, minTurns] = minimumRelevantBuff();
          print(`${minEffect}: ${minTurns}`);
      }
    } else {
      print(`Invalid args ${args}`);
    }
  }
}
