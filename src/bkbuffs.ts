import {
  chew,
  cliExecute,
  drink,
  eat,
  effectModifier,
  fullnessLimit,
  haveEffect,
  haveFamiliar,
  historicalPrice,
  inebrietyLimit,
  itemAmount,
  logprint,
  maximize,
  myDaycount,
  myEffects,
  myFullness,
  myInebriety,
  mySpleenUse,
  numericModifier,
  print,
  printHtml,
  retrieveItem,
  spleenLimit,
  toEffect,
  toInt,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
} from 'kolmafia';
import { $class, $effect, $effects, $familiar, $item, $items, $skill, $skills, get, have } from 'libram';
import { clamp, getItem, MayoClinic, Table, withStash, inClan } from './lib';
//import { drive } from './asdon';

function equipmentItem(itemOrString: Item | string) {
  const item = typeof itemOrString === 'string' ? Item.get(itemOrString) : itemOrString;
  return numericModifier(item, 'item drop');
}

class Override {
  item = 0;
  weight = 0;
  minTurns = 1;
  constructor(item: number, weight = 0, minTurns = 1) {
    this.item = item;
    this.weight = weight;
    this.minTurns = minTurns;
  }
}

const overrides = new Map<Effect, Override>([
  [$effect`Tiffany's Breakfast`, new Override(40, 0)],
  [$effect`Thanksgetting`, new Override(200, 10)],
  [$effect`She Ate Too Much Candy`, new Override(0, 25, 25)],
  [$effect`Cold Hearted`, new Override(0, 10, 20)],
  [$effect`Blue Swayed`, new Override(0, 10, 50)],
  [$effect`Sour Softshoe`, new Override(50, 0, 50)],
  [$effect`Withered Heart`, new Override(20, 0, 20)],
  [$effect`Sole Soul`, new Override(300, 0, 300)],
  [$effect`The HeyDezebound Heart`, new Override(300, 0, 300)],
  [$effect`Puzzle Champ`, new Override(0, 20)],
  [$effect`Bubble Vision`, new Override(80, 0)],
  [$effect`Voracious Gorging`, new Override(40, 0)],
]);

const impossibleEffects = new Set<Effect>([
  $effect`Bounty of Renenutet`, // Ed
  $effect`Of Course It Looks Great`, // AoSP
  $effect`School Spirited`, // KOLHS
  $effect`Jukebox Hero`, // nope
  $effect`Bats Form`, // DG turn into bats
  $effect`Magnetized Ears`,
  $effect`Song of Fortune`,
  $effect`Spice Haze`, // We are PM so we have a spice ghost.
  $effect`Gettin' the Goods`, // G-Lover
  $effect`Green Tongue`, // Can't have both green + black tongue.
  $effect`Blue Tongue`, // Can't have both blue + black tongue.
  $effect`Cold Hearted`, // Can't have both Withered + Cold Heart.
  $effect`Lucky Struck`, // NA
  $effect`Flashy Dance Song`, // portable cassette player
]);

const impossiblePassives = new Set<Skill>([
  ...$skills`Overactive Pheromones, Two Right Feet, Sucker Fingers`, // Nuclear Autumn skills
  $skill`Envy`, // Bad Moon skill
]);

const skipItems = new Set<Item>([$item`The Legendary Beat`, $item`seal eyeball`, $item`evil eyedrops of the ermine`]);

const skipSkills = new Set<Skill>([$skill`Rain Dance`, $skill`Magnetic Ears`]);

const familiarMultiplier = 1.25; // Jumpsuited Hound Dog;

const outfitItemDrop =
  50 + // eldritch hat/pants
  equipmentItem('vampyric cloake') +
  equipmentItem('tunac') +
  75 + // scratch n' sniff sword
  60 + // A Light
  equipmentItem("Mayor Ghost's sash") +
  30 + // old soft shoes
  equipmentItem('ring of the Skeleton Lord') +
  25; // luck incense

const outfitFamiliarWeight = 10; // luck incense

function fairyBonus(weight: number) {
  return Math.sqrt(55 * weight) + weight - 3;
}

function exactPlusItem(drop: number, weight: number) {
  return drop + fairyBonus(familiarMultiplier * weight);
}

function itemDrop(thing: Skill | Effect | Override): number {
  if (thing instanceof Skill) {
    return numericModifier(thing, 'item drop');
  } else if (thing instanceof Effect) {
    const override = overrides.get(thing);
    if (override) return itemDrop(override);
    return numericModifier(thing, 'item drop');
  } else {
    return thing.item;
  }
}

function foodBoozeDrop(thing: Skill | Effect | Override) {
  if (thing instanceof Skill) {
    return numericModifier(thing, 'food drop') + numericModifier(thing, 'booze drop');
  } else if (thing instanceof Effect) {
    return numericModifier(thing, 'food drop') + numericModifier(thing, 'booze drop');
  } else {
    return 0;
  }
}

function familiarWeight(thing: Skill | Effect | Override): number {
  if (thing instanceof Skill) {
    return numericModifier(thing, 'familiar weight');
  } else if (thing instanceof Effect) {
    const override = overrides.get(thing);
    if (override) return familiarWeight(override);
    return numericModifier(thing, 'familiar weight');
  } else {
    return thing.weight;
  }
}

function approxBonus(thing: Skill | Effect) {
  return 2 * itemDrop(thing) + 1.25 * familiarWeight(thing) + 0.2 * foodBoozeDrop(thing);
}

function normalClass(cl: Class) {
  return (
    cl === $class`none` ||
    cl === $class`Seal Clubber` ||
    cl === $class`Turtle Tamer` ||
    cl === $class`Pastamancer` ||
    cl === $class`Sauceror` ||
    cl === $class`Disco Bandit` ||
    cl === $class`Accordion Thief`
  );
}

function safeUseItem(quantity: number, item: Item, maxPrice = 75000) {
  if (getItem(quantity, item, maxPrice) < quantity) {
    print(`Failed to get enough ${item.name}.`, 'red');
    return false;
  }

  //if (!get('_distentionPillUsed')) use(1, $item`distention pill`);
  //if (!get('_syntheticDogHairPillUsed') && myInebriety() >= 1) use(1, $item`synthetic dog hair pill`);
  /*if (!get('spiceMelangeUsed') && myFullness() >= 3 && myInebriety() >= 3) {
    getItem(1, $item`spice melange`, 500000);
    use(1, $item`spice melange`);
  }*/

  if (item.fullness > 0) {
    if (quantity * item.fullness + myFullness() <= fullnessLimit()) {
      eat(quantity, item);
      return true;
    } else {
      return false;
    }
  } else if (item.inebriety > 0) {
    if (quantity * item.inebriety + myInebriety() <= inebrietyLimit()) {
      drink(quantity, item);
      return true;
    } else {
      return false;
    }
  } else if (item.spleen > 0) {
    if (quantity * item.spleen + mySpleenUse() <= spleenLimit()) {
      chew(quantity, item);
      return true;
    } else {
      return false;
    }
  } else {
    use(quantity, item);
    return true;
  }
}

class Option {
  effect: Effect;
  source: Item | Skill | string | (() => void);
  cost: number | null;
  constructor(effect: Effect, source: Item | Skill | string | (() => void) | null = null, cost: number | null = null) {
    this.effect = effect;
    this.source = source ?? effect.default;
    this.cost = cost;
  }

  getCost() {
    if (this.cost) {
      return this.cost;
    } else if (this.source instanceof Item) {
      return historicalPrice(this.source);
    } else {
      return 0;
    }
  }

  getCostWithOrgan() {
    let result = this.getCost();
    if (this.source instanceof Item) {
      result += 25000 * (this.source.fullness + this.source.inebriety) + 10000 * this.source.spleen;
    }
    return result;
  }

  turnsGiven() {
    if (this.source instanceof Item) {
      return numericModifier(this.source, 'Effect Duration');
    } else if (typeof this.source === 'string' && this.source.startsWith('genie effect')) {
      return 20;
    } else {
      return 1;
    }
  }

  countNeeded() {
    const override = overrides.get(this.effect);
    if (!override) return 1;
    return Math.ceil(override.minTurns / this.turnsGiven());
  }

  efficiency() {
    return (this.countNeeded() * this.getCostWithOrgan()) / approxBonus(this.effect);
  }

  execute() {
    if (haveEffect(this.effect) > 0) return;
    print(`Acquiring effect ${this.effect.name}...`, 'blue');
    if (this.source instanceof Item && historicalPrice(this.source) < 50000) {
      safeUseItem(this.countNeeded(), this.source);
    } else if (this.source instanceof Skill) {
      useSkill(1, this.source);
    } else if (typeof this.source === 'string' && !this.source.startsWith('#')) {
      try {
        cliExecute(this.source);
      } catch (e) {
        print(`Couldn't get effect ${this.effect.name}: ${e}`, 'red');
      }
    } else if (typeof this.source === 'function') {
      this.source();
    }
  }
}

const options = new Map<Effect, Option[]>();

function addOption(option: Option) {
  const list = options.get(option.effect);
  if (!list) {
    options.set(option.effect, [option]);
  } else {
    list.push(option);
  }
}

addOption(new Option($effect`Synthesis: Collection`, 'synthesize collection', 13000));
addOption(new Option($effect`Driving Observantly`, 'asdonlib 37; asdonmartin drive observantly', 500));
addOption(new Option($effect`There's No N In Love`));
addOption(new Option($effect`A Girl Named Sue`));
addOption(new Option($effect`Do I Know You From Somewhere?`));
addOption(new Option($effect`Puzzle Champ`));
addOption(new Option($effect`Hustlin'`));
addOption(new Option($effect`Billiards Belligerence`));
addOption(new Option($effect`Video... Games?`));

// 3 turns
addOption(
  new Option(
    $effect`Extra Sensory Perception`,
    '# gong roach itemdrop # 3 turns',
    historicalPrice($item`llama lama gong`)
  )
);
// 0-1 turn
addOption(
  new Option($effect`Snow Fortified`, '# use snow fort; camp rest # 0-1 turns', historicalPrice($item`snow fort`))
);
addOption(new Option($effect`ChibiChanged&trade;`, '# ChibiBuddy buff'));
addOption(new Option($effect`Bat-Adjacent Form`, '# cast Bat Form in combat'));
// 1 turn; open Spookyraven first
addOption(new Option($effect`[1609]Dancin' Fool`, '# Louvre It or Leave It'));
// 1 turn
addOption(
  new Option(
    $effect`Doing The Hustle`,
    '# Discotheque with 2 Disco Style',
    historicalPrice($item`One-day ticket to That 70s Volcano`) * 0.5
  )
);
// 0 turns (XO pocket)
addOption(
  new Option(
    $effect`Tiffany's Breakfast`,
    '# Jar of Psychoses (artist)',
    historicalPrice($item`Jar of psychoses (The Pretentious Artist)`)
  )
);
// 0 turns (do day 1)
addOption(new Option($effect`Wandering Eye Surgery`, '# Get from LOV Emergency Room'));
// 0 turns (do day 2)
addOption(new Option($effect`Open Heart Surgery`, '# Get from LOV Emergency Room'));
// ugh.
addOption(
  new Option(
    $effect`High-Falutin'`,
    '# Grab a free drink from Gingerbread Gallery',
    historicalPrice($item`counterfeit city`)
  )
);
// RO stuff
addOption(
  new Option($effect`Octolus Gift`, '# Equip octolus-skin cloak at RO', historicalPrice($item`Octolus-skin cloak`))
);
addOption(
  new Option($effect`Pajama Party`, '# Equip ratskin pajama pants at RO', historicalPrice($item`Ratskin pajama pants`))
);
addOption(
  new Option(
    $effect`Spirit of Galactic Unity`,
    '# Equip Spacegate scientist insignia at RO',
    historicalPrice($item`Spacegate scientist insignia`)
  )
);
addOption(new Option($effect`familiar.enq`, '# terminal enquiry familiar.enq'));
// addOption(new Option($effect`Fortune of the Wheel`, $item`Gift card`.historical_price() * 70, 'Get X - Wheel of Fortune from DoEC'));

for (const item of Item.all()) {
  if (skipItems.has(item) || (historicalPrice(item) === 0 && !have(item))) continue;
  const effect = effectModifier(item, 'Effect');
  if (!effect || effect === $effect`none` || approxBonus(effect) < 0.001 || impossibleEffects.has(effect)) continue;
  addOption(new Option(effect, item));
}

for (const skill of Skill.all()) {
  if (!normalClass(skill.class) || skipSkills.has(skill)) continue;
  const effect = toEffect(skill);
  if (!effect || effect === $effect`none` || approxBonus(effect) < 0.001) continue;
  addOption(new Option(effect, skill));
}

for (const effect of Effect.all()) {
  if (!effect || effect === $effect`none` || approxBonus(effect) < 0.001) continue;
  if (effect.attributes.includes('nohookah')) continue;
  addOption(new Option(effect, `genie effect ${effect.name}`, 50000));
}

for (const effectOptions of options.values()) {
  effectOptions.sort((x, y) => x.getCostWithOrgan() - y.getCostWithOrgan());
}
const selectedOptions = [...options.values()].map(effectOptions => effectOptions[0]);
selectedOptions.sort(
  (x, y) => x.efficiency() * 10000 - approxBonus(x.effect) - (y.efficiency() * 10000 - approxBonus(y.effect))
);

const passives = Skill.all().filter(
  skill => skill.passive && approxBonus(skill) >= 0.001 && normalClass(skill.class) && !impossiblePassives.has(skill)
);

const rolloverEquipment: Item[] = $items`octolus-skin cloak, ratskin pajama pants, Spacegate scientist insignia`;

export function main(argsString = '') {
  let itemFamiliar = haveFamiliar($familiar`Steam-powered Cheerleader`)
    ? $familiar`Steam-powered Cheerleader`
    : $familiar`Jumpsuited hound dog`;
  const args = argsString
    .trim()
    .split(' ')
    .map(s => s.trim())
    .filter(s => s.length > 0);
  if (args.length === 0) {
    print('usage: bkbuffs ( list | reminders | rollover | execute )');
  } else if (args.includes('rollover')) {
    maximize(
      `adventures, ${rolloverEquipment.map(equip => `equip ${equip.name}`).join(', ')} +switch trick-or-treat`,
      false
    );
  } else if (args.includes('reminder') || args.includes('reminders')) {
    for (const [effect, effectOptions] of options.entries()) {
      if (haveEffect(effect) === 0 && effectOptions.length === 1) {
        const option = effectOptions[0];
        if (typeof option.source === 'string' && option.source.startsWith('# ')) {
          print(`${effect.name}: ${option.source.slice(2)}`);
        }
      }
    }
    if (!get('_feastedFamiliars').includes(itemFamiliar.name)) {
      print('Feast familiar.');
    }
  } else if (args.includes('list')) {
    let currentEffects = myEffects();
    let runningItemDrop = 0;
    let runningFamiliarWeight = 30; // moveable feast
    const table = new Table();

    runningItemDrop += 10;
    table.row(0, exactPlusItem(2 * runningItemDrop, runningFamiliarWeight), 10, 0, 'The Packrat');

    runningItemDrop += 10;
    table.row(0, exactPlusItem(2 * runningItemDrop, runningFamiliarWeight), 10, 0, 'Spice Ghost');

    runningItemDrop += outfitItemDrop;
    runningFamiliarWeight += outfitFamiliarWeight;
    table.row(
      0,
      exactPlusItem(2 * runningItemDrop, runningFamiliarWeight),
      outfitItemDrop,
      outfitFamiliarWeight,
      'Outfit'
    );

    for (const passive of passives) {
      runningItemDrop += itemDrop(passive);
      runningFamiliarWeight += familiarWeight(passive);
      table.row(
        0,
        exactPlusItem(2 * runningItemDrop, runningFamiliarWeight).toFixed(),
        itemDrop(passive),
        familiarWeight(passive),
        passive,
        -1
      );
    }

    let effectTurns = (effect: Effect) =>
      currentEffects[effect.name] || currentEffects[`[${toInt(effect)}]${effect.name}`];
    let threshold = 25;
    let highlight = (turns: Number) =>
      turns < threshold ? `<span style='font-color: red'>${turns}</span>` : turns || 0;

    for (const option of selectedOptions) {
      runningItemDrop += itemDrop(option.effect);
      runningFamiliarWeight += familiarWeight(option.effect);
      table.row(
        option.countNeeded() * option.getCostWithOrgan(),
        exactPlusItem(2 * runningItemDrop, runningFamiliarWeight).toFixed(),
        itemDrop(option.effect),
        familiarWeight(option.effect),
        option.effect.name,
        highlight(effectTurns(option.effect))
      );
    }

    printHtml(table.render());

    print(`drop: ${2 * runningItemDrop}`);
    print(`familiar: ${runningFamiliarWeight} (${familiarMultiplier})`);
    print(`${exactPlusItem(2 * runningItemDrop, runningFamiliarWeight).toFixed()}`);
  } else if (args.includes('execute')) {
    if (!userConfirm('About to spend a crapton of meat. Ready?')) {
      throw 'No user authorization.';
    }

    // Fill liver enough for melange.
    if (myInebriety() < 3) options.get($effect`Sacré Mental`)![0].execute();
    if (myInebriety() < 3) options.get($effect`Haunted Liver`)![0].execute();

    // Thanksgetting.
    if (myDaycount() > 1) {
      const fullnessPerFood = MayoClinic.present() ? 1 : 2;
      const fullnessAvailable =
        fullnessLimit() - myFullness() + (get('spiceMelangeUsed') ? 0 : 3) + (get('_distentionPillUsed') ? 0 : 1);
      if (haveEffect($effect`Thanksgetting`) === 0 && fullnessAvailable >= 9 * fullnessPerFood) {
        if (MayoClinic.present()) MayoClinic.set($item`Mayodiol`);
        for (const item of $items`candied sweet potatoes, green bean casserole, baked stuffing, cranberry cylinder, thanksgiving turkey, mince pie, mashed potatoes, warm gravy, bread roll`) {
          if (MayoClinic.present()) retrieveItem(1, $item`Mayodiol`);
          safeUseItem(1, item, 40000);
        }
      } else {
        print(`Not enough fullness (${fullnessAvailable}) for Thanksgetting!`, 'red');
      }
    }

    //drive($effect`Driving Observantly`, 1);
    //cliExecute("asdonmartin drive observantly");

    // Stock up on pocket wishes.
    const wishCount = selectedOptions.filter(
      o => !have(o.effect) && typeof o.source === 'string' && o.source.startsWith('genie effect')
    ).length;
    const wishesToBuy = wishCount - itemAmount($item`pocket wish`);
    if (wishesToBuy > 0 && !userConfirm(`About to buy ${wishesToBuy} pocket wishes. OK?`)) throw 'No auth.';
    getItem(clamp(wishCount, 0, 200), $item`pocket wish`, 50000);

    // Next do... everything else.
    const skip = new Set<Effect>($effects`Bubble Vision, Thanksgetting`);
    for (const option of selectedOptions) {
      if (skip.has(option.effect)) continue;
      option.execute();
    }

    if (!get('_feastedFamiliars').includes(itemFamiliar.name)) {
      useFamiliar(itemFamiliar);
      withStash([$item`moveable feast`], () => use($item`moveable feast`));
    }
  }
}
