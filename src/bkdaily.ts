import { print, use } from 'kolmafia';
import { $item, get, have } from 'libram';
import { withStash } from './lib';

let tasks = new Array<() => void>();

function dailyTask(name: string, condition: () => boolean, action: () => void) {
  let wrappedTask = () => {
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

export function main() {
  tasks.forEach(task => task());
}
