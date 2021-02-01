import { getClanName, print, printHtml, setProperty, visitUrl, xpath } from 'kolmafia';
import { getPropertyString } from './lib';
import zip from 'lodash-es/zip';
import { getSewersState } from './sewers';

function getClanCache(targetClanName: string | null = null) {
  let clanCache = new Map<string, number>(JSON.parse(getPropertyString('minehobo_clanCache', '[]')));
  if (Object.keys(clanCache).length === 0 || (targetClanName !== null && !clanCache.has(targetClanName))) {
    const recruiter = visitUrl('clan_signup.php');
    const clanIds: number[] = xpath(recruiter, '//select[@name="whichclan"]/option/@value').map((s: string) =>
      parseInt(s, 10)
    );
    const clanNames: string[] = xpath(recruiter, '//select[@name="whichclan"]/option/text()');
    clanCache = new Map<string, number>(zip(clanNames, clanIds) as [string, number][]);
  }
  setProperty('minehobo_clanCache', JSON.stringify([...clanCache.entries()]));
  return clanCache;
}

function getTargetClanName(target: string) {
  const clanCache = getClanCache();
  const targetClanNames = [...clanCache.keys()].filter((name: string) =>
    name.toLowerCase().includes(target.toLowerCase())
  );
  if (targetClanNames.length === 0) {
    throw `You're not in any clan named like ${target}.`;
  } else if (targetClanNames.length >= 2) {
    throw `You're in multiple clans named like ${target}: ${targetClanNames}`;
  }
  return targetClanNames[0];
}

export function setClan(target: string, verbose = true) {
  const targetClanName = getTargetClanName(target);
  if (getClanName() !== targetClanName) {
    if (verbose) print(`Switching to clan: ${targetClanName}.`);
    visitUrl(
      `showclan.php?whichclan=${getClanCache(targetClanName).get(targetClanName)}&action=joinclan&confirm=on&pwd`
    );
    if (getClanName() !== targetClanName) {
      throw `Failed to switch clans to ${target}. Did you spell it correctly? Are you whitelisted?`;
    }
    if (verbose) print('Successfully switched clans.', 'green');
  } else {
    if (verbose) print(`Already in clan ${targetClanName}.`, 'blue');
  }
  return true;
}

export function printClanStatus() {
  const raidlogs = visitUrl('clan_raidlogs.php');
  const bosses = ["Ol' Scratch", 'Frosty', 'Oscus', 'Zombo', 'Chester', 'Hodgman'];
  const bossRe = new RegExp(`defeated +(${bosses.join('|')})`, 'g');
  const bossCount = (raidlogs.match(bossRe) || []).length;
  if (bossCount >= 4) {
    printHtml(`<b>Hobopolis cleared. ${bossCount} bosses defeated.</b>`);
  } else if (!raidlogs.includes('made it through the sewer')) {
    printHtml('<b>Fresh instance.</b>');
  } else {
    const whiteboardMatch = visitUrl('clan_basement.php?whiteboard=1').match(
      '<textarea[^>]*name=whiteboard[^>]*>([^<]*)</textarea>'
    );
    if (whiteboardMatch) {
      for (const line of whiteboardMatch[1].split('\n')) {
        if (line.trim().length > 0) print(line);
      }
    }
  }
  const sewers = getSewersState();
  print(`Sewers at ${sewers.grates} grates, ${sewers.valves} valves`);
  print();
}

export const farmingClans = [
  'The Beanery',
  'The Marketeers',
  'worthawholebean Side Clan',
  'The Old Saloon',
  'Aftercorers',
  'Abstract Singleton Train',
];
export function main(target: string | null = null) {
  if (target !== null) setClan(target);
  if (farmingClans.includes(getClanName())) printClanStatus();
}
