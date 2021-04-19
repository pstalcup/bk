import { drink, eat, effectModifier, myFullness, myInebriety, retrieveItem, toItem, use, buy } from 'kolmafia';
import { $effect, $item, $items, get, getRemainingLiver, getRemainingStomach, property } from 'libram';
import { MayoClinic } from './lib';

function fillBooze(amount: number) {
  if (property.getString('fillerBooze') == 'mayo') {
    throw "Shouldn't be filling your liver!";
  }
  let fillerBooze = get('fillerBooze', '')
    .split(',')
    .map(i => toItem(i));

  if (fillerBooze.length > 0) {
    let currentLiver = myInebriety();
    while (myInebriety() - currentLiver < amount) {
      fillerBooze.forEach(i => {
        retrieveItem(i);
        drink(i);
      });
    }
  }
}

function fillFood(amount: number) {
  if (property.getString('fillerBooze') == 'mayo') {
    MayoClinic.tryPlace();
    MayoClinic.set($item`Mayodiol`);
  }
  let fillerFood = get('fillerFood', '')
    .split(',')
    .map(i => toItem(i));

  if (fillerFood.length > 0) {
    let currentStomach = myFullness();
    while (myFullness() - currentStomach < amount) {
      fillerFood.forEach(i => {
        retrieveItem(i);
        eat(i);
        if (property.getString('fillerBooze') == 'mayo' && getRemainingLiver() == 0) {
          MayoClinic.set($item`Mayonex`);
        }
      });
    }
  }
}

function thanksgetting() {
  if (property.getString('additionalFullness') === 'mayo') {
    if (!MayoClinic.tryPlace()) throw 'Failed to get Mayo Clinic!';
    MayoClinic.set($item`Mayodiol`);
  }
  let thanksGettingFood = $items``.filter(i => effectModifier(i, 'effect') == $effect`Thanksgetting`);

  thanksGettingFood.forEach(i => {
    if (
      getRemainingStomach() < 2 &&
      property.getString('additionalFullness') == 'melange' &&
      !get('spiceMelangeUsed')
    ) {
      if (myInebriety() < 3) {
        fillBooze(3 - myInebriety());
      }
      use($item`spice melange`);
    }
    eat(i);
  });

  if (get('_thanksgettingFoodsEaten') < 9) {
    throw 'Failed to eat all thanksgetting food!';
  }
}

export function main(args: string) {
  if (property.getBoolean('getThanksgetting')) {
    thanksgetting();
  }
  if (!get('_voraciTeaUsed')) {
    buy($item`cuppa voraci tea`);
    use($item`cuppa voraci tea`);
  }
  if (getRemainingStomach() > 0) fillFood(getRemainingStomach());
  if (getRemainingLiver() > 0) fillBooze(getRemainingLiver());
}
