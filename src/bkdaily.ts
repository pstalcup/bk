import { maximize, print, retrieveItem, use, useSkill, visitUrl } from 'kolmafia';
import { $item, $skill, get, have } from 'libram';
import { log } from 'libram/dist/console';
import { LogLevel, setChoice, withStash } from './lib';

let tasks = new Array<() => void>();

function dailyTask(name: string, condition: () => boolean, action: () => void) {
  let wrappedTask = () => {
    log(LogLevel.Debug, `Running Task ${name}`);
    let loopCount = 0;
    while (condition()) {
      if (loopCount > 100) {
        throw `Infinite Loop in ${name}`;
      }
      action();
      loopCount++;
    }
  };
  tasks.push(wrappedTask);
}

const pyec = $item`Platinum Yendorian Express Card`;
dailyTask(
  'pyec',
  () => !get('expressCardUsed'),
  () => withStash([pyec], () => use(pyec))
);

const bot = $item`Bag o' Tricks`;
dailyTask(
  "bag o' tricks",
  () => !get('_bagOTricksUsed') && have(bot),
  () => use(bot)
);

dailyTask(
  'dinsey garbage',
  () => (get('stenchAirportAlways') || get('_stenchAirportToday')) && !get('_dinseyGarbageDisposed'),
  () => {
    retrieveItem($item`bag of park garbage`);
    setChoice(1067, 6);
    visitUrl('place.php?whichplace=airport_stench&action=airport3_tunnels');
  }
);

dailyTask(
  'towering inferno',
  () => (get('hotAirportAlways') || get('_hotAirportToday')) && !get('_infernoDiscoVisited'),
  () => {
    maximize('disco style', false);
    setChoice(1090, 7);
    visitUrl('place.php?whichplace=airport_hot&action=airport4_zone1');
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
  () => useSkill($skill`Summon Clip Art`)
);

dailyTask(
  "Alice's Army",
  () => have($skill`Summon Alice's Army Cards`) && get('grimoire3Summons') < 1,
  () => useSkill($skill`Summon Alice's Army Cards`)
);

export function main() {
  log(LogLevel.None, 'Running Daily Tasks...');
  tasks.forEach(task => task());
}
