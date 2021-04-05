import { familiarWeight, numericModifier, weightAdjustment } from 'kolmafia';
import { $familiar, property } from 'libram';

const FREE_STASIS_FAMILIAR = property.getFamiliar('freeStasisFamiliar') || $familiar`Cocoabo`;

function randRange(rMin: number, rMax: number) {
  return Math.ceil((rMax - rMin) * Math.random() + rMin);
}

function simulateFamiliar(
  chanceOfAct: number,
  chanceOfMeat: number,
  chanceOfDamage: number,
  meat: number,
  damage: () => number,
  meatDoubleChance: number = 0
) {
  let mlDamageResistance = Math.min(0.5, 0.04 * numericModifier('Monster Level'));

  let maxHp = numericModifier('Monster Level') + 200;
  let maxTrials = 100000;
  let trials = 0;
  let totalMeat = 0;

  while (trials < maxTrials) {
    let curHp = randRange(maxHp - 15, maxHp + 15);
    let rounds = 0;
    while (curHp > 0 && rounds <= 10) {
      if (Math.random() <= chanceOfAct) {
        let roll = Math.random();
        if (roll <= chanceOfDamage) {
          curHp -= damage() * mlDamageResistance;
        } else if (roll <= chanceOfDamage + chanceOfMeat) {
          totalMeat += meat;
          if (roll <= meatDoubleChance) {
            totalMeat += meat;
          }
        }
      }
      curHp -= 100;
    }
    trials++;
  }
  return totalMeat / maxTrials;
}

export function simulateFamiliarBoa() {
  let chanceOfAct = 0.33 + 0.2 + 0.1;
  let chanceOfDamage = 0.5;
  let chanceOfMeat = 0.5;
  let computedWeight = 20 + weightAdjustment() + 5;
  let meat = 5 * computedWeight;

  let damage = () => randRange(computedWeight + 1, computedWeight + 3);

  return simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage);
}

export function simulateNpzr() {
  let chanceOfAct = 0.5 + 0.2 + 0.1 + 0.25;
  let chanceOfDamage = 0.22;
  let chanceOfMeat = 0.22;
  let computedWeight = 20 + weightAdjustment() + 5;

  let meat = 6 * computedWeight;

  let damage = () => Math.ceil(1.5 * randRange(computedWeight + 1, computedWeight + 3));

  return simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage);
}

export function simulateStockignMimic() {
  let chanceOfAct = 1 / 3 + 0.2 + 0.1 + 0.25;
  let chanceOfDamage = 0.25;
  let chanceOfMeat = 0.25;
  let computedWeight = 100 + weightAdjustment() + 5;

  let meat = 4 * computedWeight;
  let damage = () => Math.ceil(randRange(computedWeight + 1, computedWeight + 3));

  return simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage);
}

export function simulateFamiliarMeat() {
  if (FREE_STASIS_FAMILIAR === $familiar`Comma Chameleon`) {
    return simulateFamiliarBoa();
  }
  if (FREE_STASIS_FAMILIAR === $familiar`Ninja Pirate Zombie Robot`) {
    return simulateNpzr();
  }
  if (FREE_STASIS_FAMILIAR == $familiar`Stocking Mimic`) {
    return simulateStockignMimic();
  }
  return 0;
}
