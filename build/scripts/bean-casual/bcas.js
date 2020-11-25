'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var canadv_ash = require('canadv.ash');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}
function getPropertyInt(name) {
  var default_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var str = Lib.getProperty(name);

  if (str === '') {
    if (default_ === null) Lib.abort("Unknown property ".concat(name, "."));else return default_;
  }

  return parseInt(str, 10);
}
function getPropertyBoolean(name) {
  var default_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var str = Lib.getProperty(name);

  if (str === '') {
    if (default_ === null) Lib.abort("Unknown property ".concat(name, "."));else return default_;
  }

  return str === 'true';
}
var priceCaps = {
  'jar of fermented pickle juice': 75000,
  "Frosty's frosty mug": 45000,
  'extra-greasy slider': 45000,
  "Ol' Scratch's salad fork": 45000,
  'transdermal smoke patch': 7000,
  'voodoo snuff': 36000,
  'blood-drive sticker': 210000,
  'spice melange': 500000,
  'splendid martini': 10000
};
function getCapped(qty, item, maxPrice) {
  if (qty > 15) Lib.abort('bad get!');
  var remaining = qty - Lib.itemAmount(item);
  if (remaining <= 0) return;
  var getCloset = Math.min(remaining, Lib.closetAmount(item));
  if (!Lib.takeCloset(getCloset, item)) Lib.abort('failed to remove from closet');
  remaining -= getCloset;
  if (remaining <= 0) return;
  var getMall = Math.min(remaining, Lib.shopAmount(item));
  if (!Lib.takeShop(getMall, item)) Lib.abort('failed to remove from shop');
  remaining -= getMall;
  if (remaining <= 0) return;
  if (Lib.buy(remaining, item, maxPrice) < remaining) Lib.abort("Mall price too high for ".concat(item.name, "."));
}
function get(qty, item) {
  getCapped(qty, item, priceCaps[item.name]);
}
function drinkSafe(qty, item) {
  get(1, item);
  if (!Lib.drink(qty, item)) Lib.abort('Failed to drink safely');
}
function setChoice(adv, choice) {
  Lib.setProperty("choiceAdventure".concat(adv), "".concat(choice));
}
function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (!tryEnsureEffect(ef, turns)) {
    Lib.abort('Failed to get effect ' + ef.name + '.');
  }
}
function tryEnsureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (Lib.haveEffect(ef) < turns) {
    return !Lib.cliExecute(ef["default"]) || Lib.haveEffect(ef) === 0;
  }

  return true;
}
function tryEnsureSkill(sk) {
  var ef = Lib.toEffect(sk);

  if (Lib.haveSkill(sk) && ef !== Effect.get('none') && Lib.haveEffect(ef) === 0) {
    Lib.useSkill(1, sk);
  }
}
function trySynthesize(ef) {
  if (Lib.haveEffect(ef) === 0 && Lib.haveSkill(Skill.get('Sweet Synthesis'))) Lib.sweetSynthesis(ef);
}
function shrug(ef) {
  if (Lib.haveEffect(ef) > 0) {
    Lib.cliExecute('shrug ' + ef.name);
  }
} // Mechanics for managing song slots.
// We have Stevedave's, Ur-Kel's on at all times during leveling; third and fourth slots are variable.

var songSlots = [Effect.get(["Stevedave's Shanty of Superiority", "Fat Leon's Phat Loot Lyric"]), Effect.get(["Ur-Kel's Aria of Annoyance"]), Effect.get(['Power Ballad of the Arrowsmith', 'The Magical Mojomuscular Melody', 'The Moxious Madrigal', 'Ode to Booze', " Jackasses' Symphony of Destruction"]), Effect.get(["Carlweather's Cantata of Confrontation", 'The Sonata of Sneakiness', 'Polka of Plenty'])];
function openSongSlot(song) {
  var _iterator = _createForOfIteratorHelper(songSlots),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var songSlot = _step.value;

      if (songSlot.includes(song)) {
        var _iterator2 = _createForOfIteratorHelper(songSlot),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var shruggable = _step2.value;
            shrug(shruggable);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function tryEnsureSong(sk) {
  var ef = Lib.toEffect(sk);

  if (Lib.haveEffect(ef) === 0) {
    openSongSlot(ef);

    if (!Lib.cliExecute(ef["default"]) || Lib.haveEffect(ef) === 0) {
      Lib.abort('Failed to get effect ' + ef.name + '.');
    }
  } else {
    Lib.print('Already have effect ' + ef.name + '.');
  }
}
function tryUse(quantity, it) {
  if (Lib.availableAmount(it) > 0) {
    return Lib.use(quantity, it);
  } else {
    return false;
  }
}
function ensureItem(qty, it, maxPrice) {
  var remaining = qty - Lib.itemAmount(it);
  if (remaining <= 0) return;
  var getCloset = Lib.min(remaining, Lib.closetAmount(it));
  if (!Lib.takeCloset(getCloset, it)) Lib.abort();
  remaining -= getCloset;
  if (remaining <= 0) return;
  var getMall = Lib.min(remaining, Lib.shopAmount(it));
  if (!Lib.takeShop(getMall, it)) Lib.abort();
  remaining -= getMall;
  if (remaining <= 0) return;

  if (!Lib.retrieveItem(remaining, it)) {
    if (Lib.buy(remaining, it, maxPrice) < remaining) Lib.abort("Mall price too high for ".concat(it.name, "."));
  }
}
var clanCache = {};
function setClan(target) {
  if (Lib.getClanName() !== target) {
    if (clanCache[target] === undefined) {
      var recruiter = Lib.visitUrl('clan_signup.php');
      var clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      var result;

      while ((result = clanRe.exec(recruiter)) !== null) {
        clanCache[result[2]] = parseInt(result[1], 10);
      }
    }

    Lib.visitUrl("showclan.php?whichclan=".concat(clanCache[target], "&action=joinclan&confirm=on&pwd"));

    if (Lib.getClanName() !== target) {
      Lib.abort("failed to switch clans to ".concat(target, ". Did you spell it correctly? Are you whitelisted?"));
    }
  }

  return true;
}
function maximizeCached(objective) {
  objective += objective.length > 0 ? ', equip Powerful Glove' : 'equip Powerful Glove';
  if (Lib.getProperty('bcasObjective') === objective) return;
  Lib.setProperty('bcasObjective', objective);
  Lib.maximize(objective, false);
}
function getStep(questName) {
  var stringStep = Lib.getProperty(questName);
  if (stringStep === 'unstarted') return -1;else if (stringStep === 'started') return 0;else if (stringStep === 'finished') return 999;else {
    if (stringStep.substring(0, 4) !== 'step') {
      Lib.abort('Quest state parsing error.');
    }

    return stringStep.substring(4).toInt();
  }
}

function intro() {
  setClan('Bonus Adventures from Hell');

  if (getPropertyInt('ClanFortuneConsultUses') < 3) {
    while (getPropertyInt('ClanFortuneConsultUses') < 3) {
      Lib.cliExecute('fortune cheesefax');
      Lib.cliExecute('wait 5');
    }
  } // Chateau juice bar


  Lib.visitUrl('place.php?whichplace=chateau&action=chateauDesk2'); // Sell pork gems

  Lib.visitUrl('tutorial.php?action=toot');
  tryUse(1, Item.get('letter from King Ralph XI'));
  tryUse(1, Item.get('pork elf goodies sack'));
  tryUse(1, Item.get('astral six-pack')); // Buy antique accordion

  ensureItem(1, Item.get('antique accordion'), 2500); // Initialize council.

  Lib.visitUrl('council.php'); // All combat handled by our consult script (bcasCombat.ash).

  Lib.cliExecute('ccs bean-casual'); // Mood handled in ASH.

  Lib.cliExecute('mood apathetic'); // Upgrade saber for fam wt

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

var Macro = /*#__PURE__*/function () {
  function Macro() {
    _classCallCheck(this, Macro);

    _defineProperty(this, "components", []);
  }

  _createClass(Macro, [{
    key: "toString",
    value: function toString() {
      return this.components.join(';');
    }
  }, {
    key: "step",
    value: function step() {
      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      this.components.concat(nextSteps.filter(function (s) {
        return s.length > 0;
      }));
      return this;
    }
  }, {
    key: "submit",
    value: function submit() {
      var _final = this.toString();

      Lib.print("Submitting macro: ".concat(_final));
      return Lib.visitUrl('fight.php?action=macro&macrotext=' + Lib.urlEncode(_final), true, true);
    }
  }, {
    key: "mIf",
    value: function mIf(condition) {
      var _this$step;

      for (var _len2 = arguments.length, next = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        next[_key2 - 1] = arguments[_key2];
      }

      return (_this$step = this.step("if ".concat(condition))).step.apply(_this$step, next).step('endif');
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition) {
      for (var _len3 = arguments.length, next = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        next[_key3 - 1] = arguments[_key3];
      }

      return condition ? this.step.apply(this, next) : this;
    }
  }, {
    key: "repeat",
    value: function repeat() {
      return this.step('repeat');
    }
  }, {
    key: "repeatSubmit",
    value: function repeatSubmit() {
      return this.step('repeat').submit();
    }
  }, {
    key: "skill",
    value: function skill(sk) {
      var name = sk.name.replace('%fn, ', '');
      return this.mIf("hasskill ".concat(name), "skill ".concat(name));
    }
  }, {
    key: "skillRepeat",
    value: function skillRepeat(sk) {
      var name = sk.name.replace('%fn, ', '');
      return this.mIf("hasskill ".concat(name), "skill ".concat(name, ";repeat"));
    }
  }, {
    key: "item",
    value: function item(it) {
      if (Lib.availableAmount(it) > 0) {
        return this.step("use ".concat(it.name));
      } else return this;
    }
  }, {
    key: "kill",
    value: function kill() {
      return this.skill(Skill.get('Stuffed Mortar Shell')).skillRepeat(Skill.get('Saucegeyser')).skillRepeat(Skill.get('Saucestorm'));
    }
  }], [{
    key: "step",
    value: function step() {
      var _Macro;

      return (_Macro = new Macro()).step.apply(_Macro, arguments);
    }
  }, {
    key: "monster",
    value: function monster(foe) {
      return "monstername \"".concat(foe.name, "\"");
    }
  }, {
    key: "mIf",
    value: function mIf(condition) {
      var _Macro2;

      for (var _len4 = arguments.length, next = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        next[_key4 - 1] = arguments[_key4];
      }

      return (_Macro2 = new Macro()).mIf.apply(_Macro2, [condition].concat(next));
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition) {
      var _Macro3;

      for (var _len5 = arguments.length, next = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        next[_key5 - 1] = arguments[_key5];
      }

      return (_Macro3 = new Macro()).externalIf.apply(_Macro3, [condition].concat(next));
    }
  }, {
    key: "skill",
    value: function skill(sk) {
      return new Macro().skill(sk);
    }
  }, {
    key: "skillRepeat",
    value: function skillRepeat(sk) {
      return new Macro().skillRepeat(sk);
    }
  }, {
    key: "item",
    value: function item(it) {
      return new Macro().item(it);
    }
  }, {
    key: "kill",
    value: function kill() {
      return new Macro().kill();
    }
  }]);

  return Macro;
}();
var MODE_NULL = '';
var MODE_CUSTOM = 'custom';
var MODE_RUN_UNLESS_FREE = 'rununlessfree';
var MODE_KILL = 'kill';
function setMode(mode) {
  var arg1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var arg2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  Lib.setProperty('bcas_combatMode', mode);
  if (arg1 !== null) Lib.setProperty('bcas_combatArg1', arg1);
  if (arg2 !== null) Lib.setProperty('bcas_combatArg2', arg2);
}
function adventureMacro(loc, macro) {
  setMode(MODE_CUSTOM, macro.toString());
  Lib.adv1(loc, -1, '');
  setMode(MODE_NULL, '');
}
function adventureKill(loc) {
  adventureMacro(loc, Macro.kill());
}
function adventureCopy(loc, foe) {
  setMode(MODE_CUSTOM, Macro.mIf("!monstername \"".concat(foe.name, "\""), 'abort').skill(Skill.get('Lecture on Relativity')).kill().toString());
  Lib.adv1(loc, -1, '');
  setMode(MODE_NULL, '');
}
function adventureRunUnlessFree(loc) {
  setMode(MODE_RUN_UNLESS_FREE);
  Lib.adv1(loc, -1, '');
  setMode(MODE_NULL);
}

var Stat = /*#__PURE__*/function (_MafiaClass) {
  _inherits(Stat, _MafiaClass);

  var _super = _createSuper(Stat);

  function Stat() {
    _classCallCheck(this, Stat);

    return _super.apply(this, arguments);
  }

  return Stat;
}(MafiaClass);

function levelMood() {
  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  } // Stats.


  tryEnsureSong(Skill.get("Stevedave's Shanty of Superiority"));
  tryEnsureSkill(Skill.get('Song of Bravado'));
  tryEnsureSkill(Skill.get('Get Big'));
  ensureEffect(Effect.get('Having a Ball!'));
  ensureEffect(Effect.get('Tomato Power'));
  ensureEffect(Effect.get('Trivia Master'));
  ensureEffect(Effect.get('Gr8ness'));
  tryEnsureEffect(Effect.get('Favored by Lyle'));
  tryEnsureEffect(Effect.get('Starry-Eyed'));
  tryEnsureSkill(Skill.get('CHEAT CODE: Triple Size'));
  tryEnsureEffect(Effect.get('You Learned Something Maybe!'));
  if (getPropertyBoolean('DaycareToday') && !getPropertyBoolean('DaycareSpa')) Lib.cliExecute('daycare {Lib.myPrimestat()}');

  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  }

  if (Lib.myPrimestat() === Stat.get('Muscle')) {
    tryEnsureSong(Skill.get('The Power Ballad of the Arrowsmith'));
    tryEnsureEffect(Effect.get('Lack of Body-Building'));
    ensureEffect(Effect.get("Go Get 'Em, Tiger!"));
    ensureEffect(Effect.get('Phorcefullness'));
    ensureEffect(Effect.get('Incredibly Hulking'));
  } else if (Lib.myPrimestat() === Stat.get('Mysticality')) {
    tryEnsureSong(Skill.get('The Magical Mojomuscular Melody'));
    tryEnsureEffect(Effect.get("We're All Made of Starfish"));
    tryEnsureSkill(Skill.get('Inscrutable Gaze'));
    ensureEffect(Effect.get('Glittering Eyelashes'));
    ensureEffect(Effect.get('Mystically Oiled'));
    ensureEffect(Effect.get('On The Shoulders Of Giants'));
  } else if (Lib.myPrimestat() === Stat.get('Moxie')) {
    tryEnsureSong(Skill.get('The Moxious Madrigal'));
    tryEnsureEffect(Effect.get('Pomp & Circumsands'));
    ensureEffect(Effect.get('Butt-Rock Hair'));
    ensureEffect(Effect.get('Superhuman Sarcasm'));
    ensureEffect(Effect.get('Cock of the Walk'));
  }

  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  } // ML.


  tryEnsureSong(Skill.get("Ur-Kel's Aria of Annoyance"));
  tryEnsureSkill(Skill.get('Pride of the Puffin'));
  tryEnsureSkill(Skill.get("Drescher's Annoying Noise")); // Combat.

  tryEnsureSkill(Skill.get('Carol of the Hells'));
  ensureEffect(Effect.get('Pisces in the Skyces')); // Misc.

  tryEnsureSong(Skill.get('The Polka of Plenty'));
  tryEnsureSong(Skill.get("Singer's Faithful Ocelot"));
  tryEnsureSkill(Skill.get('Blood Bond'));
  tryEnsureSkill(Skill.get('Empathy of the Newt'));
  tryEnsureSkill(Skill.get('Leash of Linguini'));
  tryEnsureSkill(Skill.get('Carol of the Thrills'));
}

function level() {
  if (Lib.myLevel() >= 13) return; // Put on some basic gear.

  maximizeCached('mp');

  if (Lib.myMp() < 200 && Lib.availableAmount(Item.get('magical sausage')) + Lib.availableAmount(Item.get('magical sausage casing')) > 0) {
    Lib.eat(1, Item.get('magical sausage'));
  } // Start buffing. XP buffs first.


  if (Lib.myPrimestat() === Stat.get('Muscle')) {
    ensureEffect(Effect.get('Muscle Unbound'));
    ensureEffect(Effect.get('Purpose'));
    trySynthesize(Effect.get('Synthesis: Movement'));
  } else if (Lib.myPrimestat() === Stat.get('Mysticality')) {
    ensureEffect(Effect.get('Thaumodynamic'));
    ensureEffect(Effect.get('Category'));
    trySynthesize(Effect.get('Synthesis: Learning'));
  } else if (Lib.myPrimestat() === Stat.get('Moxie')) {
    ensureEffect(Effect.get('So Fresh and So Clean'));
    ensureEffect(Effect.get('Perception'));
    trySynthesize(Effect.get('Synthesis: Style'));
  } // Campsite


  if (Lib.haveEffect(Effect.get("That's Just Cloud-Talk, Man")) === 0) {
    Lib.visitUrl('place.php?whichplace=campaway&action=campawaySky');
  } // Daycare


  if (getPropertyInt('DaycareGymScavenges') === 0) {
    // Free scavenge.
    Lib.visitUrl('choice.php?whichchoice=1336&option=2');
  } // Bastille first.


  if (getPropertyInt('BastilleGames') === 0) {
    if (Lib.availableAmount(Item.get('Bastille Battalion control rig')) === 0) {
      Lib.use(1, Item.get('Bastille Battalion control rig loaner voucher'));
    }

    Lib.cliExecute('bastille {Lib.myPrimestat() === Stat.get(\'Mysticality\') ? "Lib.myst" : Lib.myPrimestat()}');
  } // Chateau rests.


  if (getPropertyBoolean('chateauAvailable')) {
    Lib.buy(1, Item.get('ceiling fan'));

    if (Lib.myPrimestat() === Stat.get('Muscle')) {
      Lib.buy(1, Item.get('electric muscle stimulator'));
    } else if (Lib.myPrimestat() === Stat.get('Mysticality')) {
      Lib.buy(1, Item.get('foreign language tapes'));
    } else if (Lib.myPrimestat() === Stat.get('Moxie')) {
      Lib.buy(1, Item.get('bowl of potpourri'));
    } // Chateau rest


    while (getPropertyInt('timesRested') < Lib.totalFreeRests()) {
      Lib.visitUrl('place.php?whichplace=chateau&action=chateauRestbox');
    }
  }

  Lib.cliExecute('breakfast');

  if (Lib.haveFamiliar(Familiar.get('God Lobster'))) {
    Lib.useFamiliar(Familiar.get('God Lobster'));
    var useGg = Lib.haveSkill(Skill.get('Giant Growth')) && Lib.mallPrice(Item.get('green mana')) < 8000;

    while (Lib.getProperty('GodLobsterFights') < 3) {
      maximizeCached('mainstat, 4exp, equip makeshift garbage shirt'); // Get stats from the fight.

      setChoice(1310, 3);
      levelMood();
      Lib.restoreHp(Lib.myMaxhp());
      if (useGg && Lib.haveEffect(Effect.get('Giant Growth')) === 0) Lib.retrieveItem(1, Item.get('green mana'));
      Lib.visitUrl('main.php?fightgodlobster=1');
      setMode(MODE_CUSTOM, Macro.externalIf(useGg && Lib.haveEffect(Effect.get('Giant Growth')) === 0, 'skill Giant Growth').kill().toString());
      Lib.runCombat();
      Lib.visitUrl('choice.php');
      if (Lib.handlingChoice()) Lib.runChoice(3);
      setMode(MODE_NULL);
    }
  }

  if (getPropertyInt('SausageFights') === 0 && Lib.haveFamiliar(Familiar.get('Pocket Professor')) && Lib.availableAmount(Item.get('Kramco Sausage-o-Matic&trade;')) > 0) {
    Lib.useFamiliar(Familiar.get('Pocket Professor'));
    maximizeCached('mainstat, 4exp, equip makeshift garbage shirt, equip Pocket Professor memory chip, equip Kramco');
    levelMood();
    adventureCopy(Location.get("The Outskirts of Cobb's Knob"), Monster.get('sausage goblin'));
  }

  while (getPropertyInt('NeverendingPartyFreeTurns') < 10) {
    if (!getPropertyBoolean('leafletCompleted') && Lib.myLevel() >= 9) {
      Lib.visitUrl('council.php');
      Lib.cliExecute('leaflet');
    }

    Lib.useFamiliar(Familiar.get('Hovering Sombrero'));
    maximizeCached('mainstat, 4exp, equip makeshift garbage shirt');
    setChoice(1324, 5);
    levelMood();
    adventureKill(Location.get('The Neverending Party'));
  }

  Lib.visitUrl('council.php');
  Lib.print('');
  Lib.print('Done leveling.', 'blue');
  Lib.print('Reached mainstat {Lib.myBasestat(Lib.myPrimestat())}');
}

function moodBaseline() {
  if (Lib.myMp() < 200) {
    Lib.eat(1, Item.get('magical sausage'));
  } // Stats.


  tryEnsureSkill(Skill.get('Get Big')); // Combat.

  tryEnsureSkill(Skill.get('Carol of the Hells')); // Elemental res.

  tryEnsureSkill(Skill.get('Elemental Saucesphere'));
  tryEnsureSkill(Skill.get('Astral Shell')); // Misc.

  tryEnsureSong(Skill.get('The Polka of Plenty'));
  tryEnsureSong(Skill.get("Fat Leon's Phat Loot Lyric"));
  tryEnsureSkill(Skill.get("Singer's Faithful Ocelot"));
  tryEnsureSkill(Skill.get('Blood Bond'));
  tryEnsureSkill(Skill.get('Empathy of the Newt'));
  tryEnsureSkill(Skill.get('Leash of Linguini'));
  tryEnsureSkill(Skill.get('Carol of the Thrills'));
}
function moodNoncombat() {
  moodBaseline();
  tryEnsureSkill(Skill.get('The Sonata of Sneakiness'));
  tryEnsureSkill(Skill.get('Smooth Movement'));
  if (getPropertyBoolean('horseryAvailable') && Lib.getProperty('Horsery') !== 'dark horse') Lib.cliExecute('horsery dark');
}
function billiards() {
  if (!canadv_ash.canAdv(Location.get('The Haunted Kitchen'))) {
    Lib.use(1, Item.get('telegram from Lady Spookyraven'));
  }

  while (Lib.availableAmount(Item.get('Spookyraven billiards room key')) === 0) {
    Lib.useFamiliar(Familiar.get('Exotic Parrot'));
    moodBaseline();
    maximizeCached('hot res 9 min, stench res 9 min, equip Kramco');
    adventureMacro(Location.get('The Haunted Kitchen'), Macro.skillRepeat(Skill.get('Saucestorm')));
  }

  while (Lib.availableAmount(Item.get(7302
  /* Spookyraven library key */
  )) === 0) {
    while (Lib.myInebriety() < 5 && Lib.availableAmount(Item.get('astral pilsner')) > 0) {
      tryEnsureSong(Skill.get('The Ode to Booze'));
      drinkSafe(1, Item.get('astral pilsner'));
    }

    ensureEffect(Effect.get('Chalky Hand'));
    if (Lib.myInebriety() + 13 < 18) Lib.abort("Couldn't get enough pool skill.");
    setChoice(875, 1); // Welcome to our Ool Table

    setChoice(1436, 2); // Maps

    Lib.useFamiliar(Familiar.get('Disgeist'));
    moodNoncombat();
    maximizeCached('-combat');
    adventureMacro(Location.get('The Haunted Billiards Room'), Macro.skill(Skill.get('Saucestorm')));
  }
}
function war() {
  Lib.retrieveItem(1, Item.get('skeletal skiff'));
  Lib.retrieveItem(1, Item.get('beer helmet'));
  Lib.retrieveItem(1, Item.get('distressed denim pants'));
  Lib.retrieveItem(1, Item.get('bejeweled pledge pin'));

  while (Lib.getProperty('warProgress') === 'unstarted') {
    setChoice(142, 3); // Lookout Tower

    setChoice(1433, 3); // Maps

    Lib.useFamiliar(Familiar.get('Disgeist'));
    moodNoncombat();
    maximizeCached('-combat, outfit Frat Warrior Fatigues');
    adventureRunUnlessFree(Location.get('Hippy Camp'));
  }

  if (getPropertyInt('hippiesDefeated') < 1000) {
    var count = clamp((1000 - getPropertyInt('hippiesDefeated')) / 46, 0, 24);
    Lib.retrieveItem(count, Item.get('stuffing fluffer'));
    Lib.use(count, Item.get('stuffing fluffer'));

    while (getPropertyInt('hippiesDefeated') < 1000) {
      Lib.retrieveItem(1, Item.get('stuffing fluffer'));
      Lib.use(1, Item.get('stuffing fluffer'));
    }
  }

  if (Lib.getProperty('warProgress') !== 'finished') {
    moodBaseline();
    maximizeCached('outfit Frat Warrior Fatigues');
    setMode(MODE_KILL);
    Lib.visitUrl('bigisland.php?place=camp&whichcamp=1');
    Lib.visitUrl('bigisland.php?action=bossfight');
    Lib.runCombat();
    setMode(MODE_NULL);
  }
}
function dailyDungeon() {
  while (Lib.availableAmount(Item.get('fat loot token')) < 2 && !getPropertyBoolean('dailyDungeonDone')) {
    if (Lib.availableAmount(Item.get('fat loot token')) === 0) {
      ensureItem(1, Item.get('daily dungeon malware'), 40000);
    }

    setChoice(690, 2); // Chest 5

    setChoice(691, 2); // Chest 10

    setChoice(692, 11); // Lockpicks

    setChoice(693, 2); // Eleven-foot pole

    moodBaseline();
    maximizeCached('equip Ring of Detect Boring Doors');
    adventureMacro(Location.get('The Daily Dungeon'), Macro.item(Item.get('daily dungeon malware')).skill(Skill.get('Saucestorm')));
  }
}
function ores() {
  if (!canadv_ash.canAdv(Location.get('Lair of the Ninja Snowmen'))) {
    Lib.visitUrl('place.php?whichplace=mclargehuge&action=trappercabin');
    Lib.retrieveItem(3, Lib.getProperty('trapperOre').toItem());
    Lib.retrieveItem(3, Item.get('goat cheese'));
    Lib.visitUrl('place.php?whichplace=mclargehuge&action=trappercabin');
  }
}
function bridge() {
  if (getPropertyInt('chasmBridgeProgress') < 30) {
    var count = (34 - getPropertyInt('chasmBridgeProgress')) / 5;
    ensureItem(count, Item.get('smut orc keepsake box'), 20000);
    Lib.use(count, Item.get('smut orc keepsake box'));
    Lib.visitUrl("place.php?whichplace=orcChasm&action=bridge".concat(Lib.getProperty('chasmBridgeProgress')));
  }
}
function aboo() {
  var theoreticalProgress = getPropertyInt('booPeakProgress') - 30 * Lib.availableAmount(Item.get('A-Boo Clue'));

  while (theoreticalProgress > 0) {
    // while blasts through intro adventure here...
    Lib.retrieveItem(1, Item.get('ten-leaf clover'));
    Lib.setProperty('cloverProtectActive', 'false');
    Lib.adv1(Location.get('A-Boo Peak'), -1, '');
    Lib.setProperty('cloverProtectActive', 'true');
    theoreticalProgress = getPropertyInt('booPeakProgress') - 30 * Lib.availableAmount(Item.get('A-Boo Clue'));
  }

  while (getPropertyInt('booPeakProgress') > 0 && Lib.availableAmount(Item.get('A-Boo Clue')) > 0) {
    maximizeCached('0.1hp, spooky res, cold res');
    Lib.use(1, Item.get('A-Boo Clue'));
    Lib.adv1(Location.get('A-Boo Peak'), -1, '');
  }
}
function blackForest() {
  while (getStep('questL11Black') < 2) {
    setChoice(924, 1);
    Lib.useFamiliar(Familiar.get('Reassembled Blackbird'));
    moodBaseline();
    maximizeCached('0.1 combat rate 5 min, equip blackberry galoshes');
    adventureKill(Location.get('The Black Forest'));
  }

  if (getStep('questL11Black') < 3) {
    Lib.retrieveItem(1, Item.get('forged identification documents'));
    Lib.adv1(Location.get('The Shore, Inc. Travel Agency'), -1, '');
  }
}
function shen() {
  if (getStep('questL11Shen') < 1) {
    maximizeCached('');
    adventureRunUnlessFree(Location.get('The Copperhead Club'));
  }
}

function main() {
  Lib.setProperty('bcas_objective', '');
  var dietScript = Lib.getProperty('bcas_diet');

  if (Lib.myMeat() > 5000000) {
    if (getPropertyBoolean('bcas_autoClosetMeat', false)) {
      Lib.cliExecute("closet put ".concat(Lib.myMeat() - 5000000));
    }

    Lib.abort('You have more than 5M liquid meat! ' + 'Put it in the closet to avoid autoscend danger, or set bcas_autoClosetMeat to true and rerun.');
  }

  intro();
  level();
  Lib.print('Refreshing council quests...');
  Lib.visitUrl('council.php');
  if (Lib.myLevel() < 13) Lib.abort('Something went wrong in leveling!');

  if (Lib.getProperty('bcas_lastStockedUp').toInt() < Lib.myAscensions()) {
    var _iterator = _createForOfIteratorHelper(Lib.fileToBuffer('scripts/bean-casual/pulls.txt').split('\n')),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var line = _step.value;
        Lib.print('acquire {line}');
        if (line.length() === 0) continue;
        Lib.cliExecute('acquire {line}');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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

exports.main = main;
