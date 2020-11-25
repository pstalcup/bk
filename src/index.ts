import {intro} from './intro';
import {level} from './level';
import {getPropertyBoolean} from './lib';
import {billiards, war, dailyDungeon, ores, bridge, aboo, blackForest, shen} from './quests';

export function main() {
  Lib.setProperty('bcas_objective', '');
  const dietScript = Lib.getProperty('bcas_diet');

  if (Lib.myMeat() > 5000000) {
    if (getPropertyBoolean('bcas_autoClosetMeat', false)) {
      const closetAmount = Lib.myMeat() - 5 * 1000 * 1000;
      Lib.print(`You have more than 5M liquid meat! Putting ${closetAmount} in the closet automatically.`, 'blue');
      Lib.cliExecute(`closet put ${closetAmount} meat`);
    } else {
      Lib.abort(
        'You have more than 5M liquid meat! ' +
          'Put it in the closet to avoid autoscend danger, or set bcas_autoClosetMeat to true and rerun.'
      );
    }
  }

  intro();
  level();

  Lib.print('Refreshing council quests...');
  Lib.visitUrl('council.php');

  if (Lib.myLevel() < 13) Lib.abort('Something went wrong in leveling!');

  if (Lib.getProperty('bcas_lastStockedUp').toInt() < Lib.myAscensions()) {
    for (const line of Lib.fileToBuffer('data/bean-casual/pulls.txt').split('\n')) {
      Lib.print('acquire {line}');
      if (line.length() === 0) continue;
      Lib.cliExecute('acquire {line}');
    }
    Lib.setProperty('bcas_lastStockedUp', Lib.myAscensions());
  }

  billiards();

  if (Lib.myInebriety() <= 5 && Lib.myFullness() <= 0) {
    if (dietScript === '') {
      Lib.abort('Set property "bcas_diet" with your diet script, or consume your diet and rerun.');
    }
    Lib.cliExecute(dietScript);
  }

  war();
  dailyDungeon();
  ores();
  bridge();
  aboo();
  blackForest();
  shen();

  Lib.setProperty('auto_abooclover', 'true');

  Lib.cliExecute('autoscend');
}
