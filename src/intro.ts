import {setClan, getPropertyInt, tryUse, ensureItem} from './lib';

export function intro() {
  setClan('Bonus Adventures from Hell');
  if (getPropertyInt('ClanFortuneConsultUses') < 3) {
    while (getPropertyInt('ClanFortuneConsultUses') < 3) {
      Lib.cliExecute('fortune cheesefax');
      Lib.cliExecute('wait 5');
    }
  }

  // Chateau juice bar
  Lib.visitUrl('place.php?whichplace=chateau&action=chateauDesk2');

  // Sell pork gems
  Lib.visitUrl('tutorial.php?action=toot');
  tryUse(1, Item.get('letter from King Ralph XI'));
  tryUse(1, Item.get('pork elf goodies sack'));

  tryUse(1, Item.get('astral six-pack'));

  // Buy antique accordion
  ensureItem(1, Item.get('antique accordion'), 2500);

  // Initialize council.
  Lib.visitUrl('council.php');

  // All combat handled by our consult script (bcasCombat.ash).
  Lib.cliExecute('ccs bean-casual');

  // Mood handled in ASH.
  Lib.cliExecute('mood apathetic');

  // Upgrade saber for fam wt
  if (Lib.availableAmount(Item.get('Fourth of May Cosplay Saber')) > 0) {
    Lib.visitUrl('main.php?action=may4');
    Lib.runChoice(4);
  }

  if (Lib.getProperty('boomBoxSong') !== 'Food Vibrations') {
    Lib.cliExecute('boombox food');
  }

  Lib.setProperty('hpAutoRecovery', '0.8');
  Lib.setProperty('hpAutoRecovery', '0.3');
}
