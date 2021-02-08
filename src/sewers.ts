import {
  availableAmount,
  equip,
  familiarWeight,
  maximize,
  print,
  retrieveItem,
  useFamiliar,
  visitUrl,
  weightAdjustment,
} from 'kolmafia';
import { $location, get, $familiar, $item, $slot, $items } from 'libram';
import { adventureMacro, Macro } from './combat';
import { extractInt, memoizeTurncount, setChoice } from './lib';

export const getSewersState = memoizeTurncount(() => {
  const logText = visitUrl('clan_raidlogs.php');
  const grates = extractInt(/opened (a|[0-9]+) sewer grate/g, logText);
  const valves = extractInt(/lowered the water level( [0-9]+ times?)? \(([0-9]+) turn/g, logText, 2);
  return { grates, valves };
});

export function throughSewers() {
  return visitUrl('clan_hobopolis.php').includes('clan_hobopolis.php?place=2');
}

export function sewerAccess() {
  return visitUrl('clan_hobopolis.php').includes('adventure.php?snarfblat=166');
}

export function getSewerItems() {
  return (
    !$items`unfortunate dumplings, sewer wad, bottle of ooze-o, gatorskin umbrella`.some(i => !retrieveItem(1, i)) &&
    retrieveItem(3, $item`oil of oiliness`)
  );
}

export function main() {
  // cage
  setChoice(211, 0);
  setChoice(212, 0);
  // tunnels
  setChoice(197, 1);
  setChoice(198, 1);

  const boots = $familiar`Pair of Stomping Boots`;
  maximize('-combat -weapon -offhand', false);
  useFamiliar(boots);

  while (!throughSewers()) {
    if (!getSewerItems()) {
      throw 'Unable to get sewer items';
    }

    equip($slot`weapon`, $item`gatorskin umbrella`);
    equip($slot`offhand`, $item`hobo code binder`);

    let runcap = Math.floor((familiarWeight(boots) + weightAdjustment()) / 5);
    adventureMacro(
      $location`A Maze of Sewer Tunnels`,
      Macro.externalIf(get('_banderRunaways') < runcap, Macro.step('runaway').abort())
        .externalIf(availableAmount($item`Louder Than Bomb`) > 0, Macro.item($item`Louder Than Bomb`).abort())
        .abort()
    );
  }
}
