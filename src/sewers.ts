import { visitUrl } from "kolmafia";
import { extractInt, memoizeTurncount } from "./lib";

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