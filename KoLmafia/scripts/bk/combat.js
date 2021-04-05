/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/libram/dist/combat.js":
/*!********************************************!*\
  !*** ./node_modules/libram/dist/combat.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMacroId": () => (/* binding */ getMacroId),
/* harmony export */   "Macro": () => (/* binding */ Macro),
/* harmony export */   "banishedMonsters": () => (/* binding */ banishedMonsters),
/* harmony export */   "adventureMacro": () => (/* binding */ adventureMacro),
/* harmony export */   "adventureMacroAuto": () => (/* binding */ adventureMacroAuto)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};

var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};




var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name Script Autoattack Macro.
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var macroMatches = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"" + MACRO_NAME + "\"]/@value");

  if (macroMatches.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=0&name=" + MACRO_NAME + "&macrotext=abort&action=save");
    return parseInt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? Item.get(itemOrName) : itemOrName;
}

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return item.name;
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(" && ");
  } else {
    return "hascombatitem " + itemOrItems;
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) ? skill.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(skill);
}
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */


var Macro =
/** @class */
function () {
  function Macro() {
    this.components = [];
  }
  /**
   * Convert macro to string.
   */


  Macro.prototype.toString = function () {
    return this.components.join(";");
  };
  /**
   * Save a macro to a Mafia property for use in a consult script.
   */


  Macro.prototype.save = function () {
    (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)(Macro.SAVED_MACRO_PROPERTY, this.toString());
  };
  /**
   * Load a saved macro from the Mafia property.
   */


  Macro.load = function () {
    var _a;

    return (_a = new this()).step.apply(_a, (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)(Macro.SAVED_MACRO_PROPERTY).split(";"));
  };
  /**
   * Clear the saved macro in the Mafia property.
   */


  Macro.clearSaved = function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    var nextStepsStrings = (_a = []).concat.apply(_a, nextSteps.map(function (x) {
      return x instanceof Macro ? x.components : [x];
    }));

    this.components = __spreadArrays(this.components, nextStepsStrings.filter(function (s) {
      return s.length > 0;
    }));
    return this;
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    return (_a = new this()).step.apply(_a, nextSteps);
  };
  /**
   * Submit the built macro to KoL. Only works inside combat.
   */


  Macro.prototype.submit = function () {
    var _final = this.toString();

    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("fight.php?action=macro&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(_final), true, true);
  };
  /**
   * Set this macro as a KoL native autoattack.
   */


  Macro.prototype.setAutoAttack = function () {
    if (Macro.cachedMacroId === null) Macro.cachedMacroId = getMacroId();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() === 99000000 + Macro.cachedMacroId && this.toString() === Macro.cachedAutoAttack) {
      // This macro is already set. Don"t make the server request.
      return;
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=" + Macro.cachedMacroId + "&name=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(MACRO_NAME) + "&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.toString()) + "&action=save", true, true);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account.php?am=1&action=autoattack&value=" + (99000000 + Macro.cachedMacroId) + "&ajax=1");
    Macro.cachedAutoAttack = this.toString();
  };
  /**
   * Add an "abort" step to this macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.abort = function () {
    return this.step("abort");
  };
  /**
   * Create a new macro with an "abort" step.
   * @returns {Macro} This object itself.
   */


  Macro.abort = function () {
    return new this().abort();
  };
  /**
   * Add an "if" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.if_ = function (condition, ifTrue) {
    return this.step("if " + condition).step(ifTrue).step("endif");
  };
  /**
   * Create a new macro with an "if" statement.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.if_ = function (condition, ifTrue) {
    return new this().if_(condition, ifTrue);
  };
  /**
   * Add a "while" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.while_ = function (condition, contents) {
    return this.step("while " + condition).step(contents).step("endwhile");
  };
  /**
   * Create a new macro with a "while" statement.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.while_ = function (condition, contents) {
    return new this().while_(condition, contents);
  };
  /**
   * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.externalIf = function (condition, ifTrue) {
    return condition ? this.step(ifTrue) : this;
  };
  /**
   * Create a new macro with a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.externalIf = function (condition, ifTrue) {
    return new this().externalIf(condition, ifTrue);
  };
  /**
   * Add a repeat step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.repeat = function () {
    return this.step("repeat");
  };
  /**
   * Add one or more skill cast steps to the macro.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.skill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return "skill " + skillBallsMacroName(skill);
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.skill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).skill.apply(_a, skills);
  };
  /**
   * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill));
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkill.apply(_a, skills);
  };
  /**
   * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkillRepeat = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill).repeat());
    }));
  };
  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkillRepeat = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkillRepeat.apply(_a, skills);
  };
  /**
   * Add one or more item steps to the macro.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.item = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (itemOrItems) {
      return "use " + itemOrItemsBallsMacroName(itemOrItems);
    }));
  };
  /**
   * Create a new macro with one or more item steps.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.item = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).item.apply(_a, items);
  };
  /**
   * Add one or more item steps to the macro, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.tryItem = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (item) {
      return Macro.if_("hascombatitem " + itemOrItemsBallsMacroPredicate(item), "use " + itemOrItemsBallsMacroName(item));
    }));
  };
  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.tryItem = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).tryItem.apply(_a, items);
  };
  /**
   * Add an attack step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.attack = function () {
    return this.step("attack");
  };
  /**
   * Create a new macro with an attack step.
   * @returns {Macro} This object itself.
   */


  Macro.attack = function () {
    return new this().attack();
  };

  Macro.SAVED_MACRO_PROPERTY = "libram_savedMacro";
  Macro.cachedMacroId = null;
  Macro.cachedAutoAttack = null;
  return Macro;
}();


function banishedMonsters() {
  var banishedstring = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("banishedMonsters");
  var banishedComponents = banishedstring.split(":");
  var result = new Map();
  if (banishedComponents.length < 3) return result;

  for (var idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    var foe = Monster.get(banishedComponents[idx * 3]);
    var banisher = banishedComponents[idx * 3 + 1]; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

    var banisherItem = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(banisher);
    var banisherObject = [(0,_template_string__WEBPACK_IMPORTED_MODULE_2__.$item)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["none"], ["none"]))), null].includes(banisherItem) ? Skill.get(banisher) : banisherItem;
    result.set(banisherObject, foe);
  }

  return result;
}
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

function adventureMacro(loc, macro) {
  macro.save();

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, 0, "");

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro, nextMacro) {
  if (nextMacro === void 0) {
    nextMacro = null;
  }

  nextMacro = nextMacro !== null && nextMacro !== void 0 ? nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/lib.js":
/*!*****************************************!*\
  !*** ./node_modules/libram/dist/lib.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSongLimit": () => (/* binding */ getSongLimit),
/* harmony export */   "isSong": () => (/* binding */ isSong),
/* harmony export */   "getActiveEffects": () => (/* binding */ getActiveEffects),
/* harmony export */   "getActiveSongs": () => (/* binding */ getActiveSongs),
/* harmony export */   "getSongCount": () => (/* binding */ getSongCount),
/* harmony export */   "getMonsterLocations": () => (/* binding */ getMonsterLocations),
/* harmony export */   "getRemainingLiver": () => (/* binding */ getRemainingLiver),
/* harmony export */   "getRemainingStomach": () => (/* binding */ getRemainingStomach),
/* harmony export */   "getRemainingSpleen": () => (/* binding */ getRemainingSpleen),
/* harmony export */   "have": () => (/* binding */ have),
/* harmony export */   "haveInCampground": () => (/* binding */ haveInCampground),
/* harmony export */   "Wanderer": () => (/* binding */ Wanderer),
/* harmony export */   "haveCounter": () => (/* binding */ haveCounter),
/* harmony export */   "getTotalFamiliarWanderers": () => (/* binding */ getTotalFamiliarWanderers),
/* harmony export */   "haveWandererCounter": () => (/* binding */ haveWandererCounter),
/* harmony export */   "isVoteWandererNow": () => (/* binding */ isVoteWandererNow),
/* harmony export */   "isWandererNow": () => (/* binding */ isWandererNow),
/* harmony export */   "getKramcoWandererChance": () => (/* binding */ getKramcoWandererChance),
/* harmony export */   "getFamiliarWandererChance": () => (/* binding */ getFamiliarWandererChance),
/* harmony export */   "getWandererChance": () => (/* binding */ getWandererChance),
/* harmony export */   "isCurrentFamiliar": () => (/* binding */ isCurrentFamiliar),
/* harmony export */   "getFoldGroup": () => (/* binding */ getFoldGroup),
/* harmony export */   "getZapGroup": () => (/* binding */ getZapGroup)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};




/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 */

function getSongLimit() {
  return 3 + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.booleanModifier)("Four Songs") ? 1 : 0) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  var skill = skillOrEffect instanceof Effect ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toSkill)(skillOrEffect) : skillOrEffect;
  return skill["class"] === (0,_template_string__WEBPACK_IMPORTED_MODULE_1__.$class)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Accordion Thief"], ["Accordion Thief"]))) && skill.buff;
}
/**
 * List all active Effects
 */

function getActiveEffects() {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEffects)()).map(function (e) {
    return Effect.get(e);
  });
}
/**
 * List currently active Accordion Thief songs
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(function (location) {
    return monster.name in (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.appearanceRates)(location);
  });
}
/**
 * Return the player's remaining liver space
 */

function getRemainingLiver() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)();
}
/**
 * Return the player's remaining stomach space
 */

function getRemainingStomach() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fullnessLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)();
}
/**
 * Return the player's remaining spleen space
 */

function getRemainingSpleen() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.spleenLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySpleenUse)();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 */

function have(thing, quantity) {
  if (quantity === void 0) {
    quantity = 1;
  }

  if (thing instanceof Effect) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof Familiar) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)(thing);
  }

  if (thing instanceof Item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof Servant) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveServant)(thing);
  }

  if (thing instanceof Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(thing);
  }

  if (thing instanceof Thrall) {
    var thrall = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 */

function haveInCampground(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()).map(function (i) {
    return Item.get(i);
  }).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 */

function haveCounter(counterName, minTurns, maxTurns) {
  if (minTurns === void 0) {
    minTurns = 0;
  }

  if (maxTurns === void 0) {
    maxTurns = 500;
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Returns the player's total number of Artistic Goth Kid and/or Mini-Hipster
 * wanderers encountered today
 */

function getTotalFamiliarWanderers() {
  var hipsterFights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_hipsterAdv");
  var gothFights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_gothKidFights");
  return hipsterFights + gothFights;
}
/**
 * Return whether the player has the queried wandering counter
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 */

function isVoteWandererNow() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() % 11 == 1;
}
/**
 * For deterministic wanderers:
 * Return whether the player will encounter the queried wanderer on the next turn
 *
 * For variable wanderers (window):
 * Return whether the player is within an encounter window for the queried wanderer
 *
 * For variable wanderers (chance per turn):
 * Returns true unless the player has exhausted the number of wanderers possible
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer == Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return getTotalFamiliarWanderers() < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 */

function getKramcoWandererChance() {
  var fights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_sausageFights");
  var lastFight = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_lastSausageMonsterTurn");
  var totalTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)();

  if (fights < 1) {
    return lastFight === totalTurns && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 */

function getFamiliarWandererChance() {
  var totalFights = getTotalFamiliarWanderers();
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)();
    return 1.0 / window;
  }

  return 0.0;
}
function isCurrentFamiliar(familiar) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === familiar;
}
function getFoldGroup(item) {
  return Object.entries((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getRelated)(item, "fold")).sort(function (_a, _b) {
    var a = _a[1];
    var b = _b[1];
    return a - b;
  }).map(function (_a) {
    var i = _a[0];
    return Item.get(i);
  });
}
function getZapGroup(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getRelated)(item, "zap")).map(function (i) {
    return Item.get(i);
  });
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/property.js":
/*!**********************************************!*\
  !*** ./node_modules/libram/dist/property.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPropertyGetter": () => (/* binding */ createPropertyGetter),
/* harmony export */   "createMafiaClassPropertyGetter": () => (/* binding */ createMafiaClassPropertyGetter),
/* harmony export */   "getString": () => (/* binding */ getString),
/* harmony export */   "getCommaSeparated": () => (/* binding */ getCommaSeparated),
/* harmony export */   "getBoolean": () => (/* binding */ getBoolean),
/* harmony export */   "getNumber": () => (/* binding */ getNumber),
/* harmony export */   "getBounty": () => (/* binding */ getBounty),
/* harmony export */   "getClass": () => (/* binding */ getClass),
/* harmony export */   "getCoinmaster": () => (/* binding */ getCoinmaster),
/* harmony export */   "getEffect": () => (/* binding */ getEffect),
/* harmony export */   "getElement": () => (/* binding */ getElement),
/* harmony export */   "getFamiliar": () => (/* binding */ getFamiliar),
/* harmony export */   "getItem": () => (/* binding */ getItem),
/* harmony export */   "getLocation": () => (/* binding */ getLocation),
/* harmony export */   "getMonster": () => (/* binding */ getMonster),
/* harmony export */   "getPhylum": () => (/* binding */ getPhylum),
/* harmony export */   "getServant": () => (/* binding */ getServant),
/* harmony export */   "getSkill": () => (/* binding */ getSkill),
/* harmony export */   "getSlot": () => (/* binding */ getSlot),
/* harmony export */   "getStat": () => (/* binding */ getStat),
/* harmony export */   "getThrall": () => (/* binding */ getThrall),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "set": () => (/* binding */ set)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propertyTyping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propertyTyping */ "./node_modules/libram/dist/propertyTyping.js");


var createPropertyGetter = function createPropertyGetter(transform) {
  return function (property, default_) {
    var value = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(property);

    if (default_ !== undefined && value === "") {
      return default_;
    }

    return transform(value, property);
  };
};
var createMafiaClassPropertyGetter = function createMafiaClassPropertyGetter(Type) {
  return createPropertyGetter(function (value) {
    var v = Type.get(value);
    return v === Type.get("none") ? null : v;
  });
};
var getString = createPropertyGetter(function (value) {
  return value;
});
var getCommaSeparated = createPropertyGetter(function (value) {
  return value.split(/, ?/);
});
var getBoolean = createPropertyGetter(function (value) {
  return value === "true";
});
var getNumber = createPropertyGetter(function (value) {
  return Number(value);
});
var getBounty = createMafiaClassPropertyGetter(Bounty);
var getClass = createMafiaClassPropertyGetter(Class);
var getCoinmaster = createMafiaClassPropertyGetter(Coinmaster);
var getEffect = createMafiaClassPropertyGetter(Effect);
var getElement = createMafiaClassPropertyGetter(Element);
var getFamiliar = createMafiaClassPropertyGetter(Familiar);
var getItem = createMafiaClassPropertyGetter(Item);
var getLocation = createMafiaClassPropertyGetter(Location);
var getMonster = createMafiaClassPropertyGetter(Monster);
var getPhylum = createMafiaClassPropertyGetter(Phylum);
var getServant = createMafiaClassPropertyGetter(Servant);
var getSkill = createMafiaClassPropertyGetter(Skill);
var getSlot = createMafiaClassPropertyGetter(Slot);
var getStat = createMafiaClassPropertyGetter(Stat);
var getThrall = createMafiaClassPropertyGetter(Thrall);
function get(property, _default) {
  var value = getString(property);

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isMonsterProperty)(property)) {
    return getMonster(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isLocationProperty)(property)) {
    return getLocation(property, _default);
  }

  if (value === "") {
    return _default === undefined ? "" : _default;
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isBooleanProperty)(property, value)) {
    return getBoolean(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isNumericProperty)(property, value)) {
    return getNumber(property, _default);
  }

  return value;
}
function set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(property, stringValue);
}

/***/ }),

/***/ "./node_modules/libram/dist/propertyTyping.js":
/*!****************************************************!*\
  !*** ./node_modules/libram/dist/propertyTyping.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumericProperty": () => (/* binding */ isNumericProperty),
/* harmony export */   "isBooleanProperty": () => (/* binding */ isBooleanProperty),
/* harmony export */   "isLocationProperty": () => (/* binding */ isLocationProperty),
/* harmony export */   "isMonsterProperty": () => (/* binding */ isMonsterProperty)
/* harmony export */ });
function isNumericProperty(property, value) {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}
var fakeBooleans = ["trackVoteMonster", "_jickJarAvailable"];
function isBooleanProperty(property, value) {
  if (fakeBooleans.includes(property)) return false;
  return ["true", "false"].includes(value);
}
var otherLocations = ["nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom"];
function isLocationProperty(property) {
  return otherLocations.includes(property) || property.endsWith("Location");
}
var otherMonsters = ["romanticTarget"];
function isMonsterProperty(property) {
  if (otherMonsters.includes(property)) return true;
  return property.endsWith("Monster");
}

/***/ }),

/***/ "./node_modules/libram/dist/template-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/libram/dist/template-string.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$bounty": () => (/* binding */ $bounty),
/* harmony export */   "$bounties": () => (/* binding */ $bounties),
/* harmony export */   "$class": () => (/* binding */ $class),
/* harmony export */   "$classes": () => (/* binding */ $classes),
/* harmony export */   "$coinmaster": () => (/* binding */ $coinmaster),
/* harmony export */   "$coinmasters": () => (/* binding */ $coinmasters),
/* harmony export */   "$effect": () => (/* binding */ $effect),
/* harmony export */   "$effects": () => (/* binding */ $effects),
/* harmony export */   "$element": () => (/* binding */ $element),
/* harmony export */   "$elements": () => (/* binding */ $elements),
/* harmony export */   "$familiar": () => (/* binding */ $familiar),
/* harmony export */   "$familiars": () => (/* binding */ $familiars),
/* harmony export */   "$item": () => (/* binding */ $item),
/* harmony export */   "$items": () => (/* binding */ $items),
/* harmony export */   "$location": () => (/* binding */ $location),
/* harmony export */   "$locations": () => (/* binding */ $locations),
/* harmony export */   "$monster": () => (/* binding */ $monster),
/* harmony export */   "$monsters": () => (/* binding */ $monsters),
/* harmony export */   "$phylum": () => (/* binding */ $phylum),
/* harmony export */   "$phyla": () => (/* binding */ $phyla),
/* harmony export */   "$servant": () => (/* binding */ $servant),
/* harmony export */   "$servants": () => (/* binding */ $servants),
/* harmony export */   "$skill": () => (/* binding */ $skill),
/* harmony export */   "$skills": () => (/* binding */ $skills),
/* harmony export */   "$slot": () => (/* binding */ $slot),
/* harmony export */   "$slots": () => (/* binding */ $slots),
/* harmony export */   "$stat": () => (/* binding */ $stat),
/* harmony export */   "$stats": () => (/* binding */ $stats),
/* harmony export */   "$thrall": () => (/* binding */ $thrall),
/* harmony export */   "$thralls": () => (/* binding */ $thralls)
/* harmony export */ });
var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var concatTemplateString = function concatTemplateString(literals) {
  var placeholders = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    placeholders[_i - 1] = arguments[_i];
  }

  return literals.reduce(function (acc, literal, i) {
    return acc + literal + (placeholders[i] || "");
  }, "");
};

var createSingleConstant = function createSingleConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));
    return Type.get(input);
  };
};

var createPluralConstant = function createPluralConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));

    if (input === "") {
      return Type.all();
    }

    return Type.get(input.split(","));
  };
};
/**
 * A Bounty specified by name.
 */


var $bounty = createSingleConstant(Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 */

var $bounties = createPluralConstant(Bounty);
/**
 * A Class specified by name.
 */

var $class = createSingleConstant(Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 */

var $classes = createPluralConstant(Class);
/**
 * A Coinmaster specified by name.
 */

var $coinmaster = createSingleConstant(Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 */

var $coinmasters = createPluralConstant(Coinmaster);
/**
 * An Effect specified by name.
 */

var $effect = createSingleConstant(Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 */

var $effects = createPluralConstant(Effect);
/**
 * An Element specified by name.
 */

var $element = createSingleConstant(Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 */

var $elements = createPluralConstant(Element);
/**
 * A Familiar specified by name.
 */

var $familiar = createSingleConstant(Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 */

var $familiars = createPluralConstant(Familiar);
/**
 * An Item specified by name.
 */

var $item = createSingleConstant(Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 */

var $items = createPluralConstant(Item);
/**
 * A Location specified by name.
 */

var $location = createSingleConstant(Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 */

var $locations = createPluralConstant(Location);
/**
 * A Monster specified by name.
 */

var $monster = createSingleConstant(Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 */

var $monsters = createPluralConstant(Monster);
/**
 * A Phylum specified by name.
 */

var $phylum = createSingleConstant(Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 */

var $phyla = createPluralConstant(Phylum);
/**
 * A Servant specified by name.
 */

var $servant = createSingleConstant(Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 */

var $servants = createPluralConstant(Servant);
/**
 * A Skill specified by name.
 */

var $skill = createSingleConstant(Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 */

var $skills = createPluralConstant(Skill);
/**
 * A Slot specified by name.
 */

var $slot = createSingleConstant(Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 */

var $slots = createPluralConstant(Slot);
/**
 * A Stat specified by name.
 */

var $stat = createSingleConstant(Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 */

var $stats = createPluralConstant(Stat);
/**
 * A Thrall specified by name.
 */

var $thrall = createSingleConstant(Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 */

var $thralls = createPluralConstant(Thrall);

/***/ }),

/***/ "./node_modules/lodash-es/_Symbol.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_Symbol.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");

/** Built-in value references. */

var _Symbol = _root_js__WEBPACK_IMPORTED_MODULE_0__.default.Symbol;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Symbol);

/***/ }),

/***/ "./node_modules/lodash-es/_apply.js":
/*!******************************************!*\
  !*** ./node_modules/lodash-es/_apply.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apply);

/***/ }),

/***/ "./node_modules/lodash-es/_arrayFilter.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_arrayFilter.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayFilter);

/***/ }),

/***/ "./node_modules/lodash-es/_arrayMap.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_arrayMap.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayMap);

/***/ }),

/***/ "./node_modules/lodash-es/_baseGetTag.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseGetTag.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");
/* harmony import */ var _getRawTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getRawTag.js */ "./node_modules/lodash-es/_getRawTag.js");
/* harmony import */ var _objectToString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_objectToString.js */ "./node_modules/lodash-es/_objectToString.js");



/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__.default ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__.default.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? (0,_getRawTag_js__WEBPACK_IMPORTED_MODULE_1__.default)(value) : (0,_objectToString_js__WEBPACK_IMPORTED_MODULE_2__.default)(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGetTag);

/***/ }),

/***/ "./node_modules/lodash-es/_baseIsNative.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_baseIsNative.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/lodash-es/isFunction.js");
/* harmony import */ var _isMasked_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isMasked.js */ "./node_modules/lodash-es/_isMasked.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");
/* harmony import */ var _toSource_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_toSource.js */ "./node_modules/lodash-es/_toSource.js");




/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(value) || (0,_isMasked_js__WEBPACK_IMPORTED_MODULE_1__.default)(value)) {
    return false;
  }

  var pattern = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_2__.default)(value) ? reIsNative : reIsHostCtor;
  return pattern.test((0,_toSource_js__WEBPACK_IMPORTED_MODULE_3__.default)(value));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseIsNative);

/***/ }),

/***/ "./node_modules/lodash-es/_baseProperty.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_baseProperty.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseProperty);

/***/ }),

/***/ "./node_modules/lodash-es/_baseRest.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_baseRest.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./identity.js */ "./node_modules/lodash-es/identity.js");
/* harmony import */ var _overRest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_overRest.js */ "./node_modules/lodash-es/_overRest.js");
/* harmony import */ var _setToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setToString.js */ "./node_modules/lodash-es/_setToString.js");



/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */

function baseRest(func, start) {
  return (0,_setToString_js__WEBPACK_IMPORTED_MODULE_0__.default)((0,_overRest_js__WEBPACK_IMPORTED_MODULE_1__.default)(func, start, _identity_js__WEBPACK_IMPORTED_MODULE_2__.default), func + '');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseRest);

/***/ }),

/***/ "./node_modules/lodash-es/_baseSetToString.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_baseSetToString.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant.js */ "./node_modules/lodash-es/constant.js");
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_defineProperty.js */ "./node_modules/lodash-es/_defineProperty.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity.js */ "./node_modules/lodash-es/identity.js");



/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */

var baseSetToString = !_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.default ? _identity_js__WEBPACK_IMPORTED_MODULE_1__.default : function (func, string) {
  return (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.default)(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__.default)(string),
    'writable': true
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseSetToString);

/***/ }),

/***/ "./node_modules/lodash-es/_baseTimes.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_baseTimes.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseTimes);

/***/ }),

/***/ "./node_modules/lodash-es/_coreJsData.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_coreJsData.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");

/** Used to detect overreaching core-js shims. */

var coreJsData = _root_js__WEBPACK_IMPORTED_MODULE_0__.default["__core-js_shared__"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coreJsData);

/***/ }),

/***/ "./node_modules/lodash-es/_defineProperty.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_defineProperty.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ "./node_modules/lodash-es/_getNative.js");


var defineProperty = function () {
  try {
    var func = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__.default)(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defineProperty);

/***/ }),

/***/ "./node_modules/lodash-es/_freeGlobal.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_freeGlobal.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);

/***/ }),

/***/ "./node_modules/lodash-es/_getNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getNative.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsNative_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseIsNative.js */ "./node_modules/lodash-es/_baseIsNative.js");
/* harmony import */ var _getValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getValue.js */ "./node_modules/lodash-es/_getValue.js");


/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */

function getNative(object, key) {
  var value = (0,_getValue_js__WEBPACK_IMPORTED_MODULE_0__.default)(object, key);
  return (0,_baseIsNative_js__WEBPACK_IMPORTED_MODULE_1__.default)(value) ? value : undefined;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getNative);

/***/ }),

/***/ "./node_modules/lodash-es/_getRawTag.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getRawTag.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");

/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__.default ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__.default.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRawTag);

/***/ }),

/***/ "./node_modules/lodash-es/_getValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_getValue.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getValue);

/***/ }),

/***/ "./node_modules/lodash-es/_isMasked.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_isMasked.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _coreJsData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_coreJsData.js */ "./node_modules/lodash-es/_coreJsData.js");

/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData_js__WEBPACK_IMPORTED_MODULE_0__.default && _coreJsData_js__WEBPACK_IMPORTED_MODULE_0__.default.keys && _coreJsData_js__WEBPACK_IMPORTED_MODULE_0__.default.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isMasked);

/***/ }),

/***/ "./node_modules/lodash-es/_objectToString.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_objectToString.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (objectToString);

/***/ }),

/***/ "./node_modules/lodash-es/_overRest.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_overRest.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apply_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_apply.js */ "./node_modules/lodash-es/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return (0,_apply_js__WEBPACK_IMPORTED_MODULE_0__.default)(func, this, otherArgs);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (overRest);

/***/ }),

/***/ "./node_modules/lodash-es/_root.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/_root.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_freeGlobal.js */ "./node_modules/lodash-es/_freeGlobal.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__.default || freeSelf || Function('return this')();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);

/***/ }),

/***/ "./node_modules/lodash-es/_setToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_setToString.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseSetToString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseSetToString.js */ "./node_modules/lodash-es/_baseSetToString.js");
/* harmony import */ var _shortOut_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_shortOut.js */ "./node_modules/lodash-es/_shortOut.js");


/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */

var setToString = (0,_shortOut_js__WEBPACK_IMPORTED_MODULE_0__.default)(_baseSetToString_js__WEBPACK_IMPORTED_MODULE_1__.default);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setToString);

/***/ }),

/***/ "./node_modules/lodash-es/_shortOut.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_shortOut.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shortOut);

/***/ }),

/***/ "./node_modules/lodash-es/_toSource.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_toSource.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toSource);

/***/ }),

/***/ "./node_modules/lodash-es/constant.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/constant.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constant);

/***/ }),

/***/ "./node_modules/lodash-es/identity.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/identity.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);

/***/ }),

/***/ "./node_modules/lodash-es/isArrayLike.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/isArrayLike.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/lodash-es/isFunction.js");
/* harmony import */ var _isLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isLength.js */ "./node_modules/lodash-es/isLength.js");


/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && (0,_isLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(value.length) && !(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLike);

/***/ }),

/***/ "./node_modules/lodash-es/isArrayLikeObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash-es/isArrayLikeObject.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArrayLike.js */ "./node_modules/lodash-es/isArrayLike.js");
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");


/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */

function isArrayLikeObject(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(value) && (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__.default)(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLikeObject);

/***/ }),

/***/ "./node_modules/lodash-es/isFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/isFunction.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");


/** `Object#toString` result references. */

var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__.default)(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);

/***/ }),

/***/ "./node_modules/lodash-es/isLength.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isLength.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLength);

/***/ }),

/***/ "./node_modules/lodash-es/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isObject.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);

/***/ }),

/***/ "./node_modules/lodash-es/isObjectLike.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/isObjectLike.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjectLike);

/***/ }),

/***/ "./node_modules/lodash-es/unzip.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/unzip.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayFilter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayFilter.js */ "./node_modules/lodash-es/_arrayFilter.js");
/* harmony import */ var _arrayMap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_arrayMap.js */ "./node_modules/lodash-es/_arrayMap.js");
/* harmony import */ var _baseProperty_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_baseProperty.js */ "./node_modules/lodash-es/_baseProperty.js");
/* harmony import */ var _baseTimes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseTimes.js */ "./node_modules/lodash-es/_baseTimes.js");
/* harmony import */ var _isArrayLikeObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArrayLikeObject.js */ "./node_modules/lodash-es/isArrayLikeObject.js");





/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max;
/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @memberOf _
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * _.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */

function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }

  var length = 0;
  array = (0,_arrayFilter_js__WEBPACK_IMPORTED_MODULE_0__.default)(array, function (group) {
    if ((0,_isArrayLikeObject_js__WEBPACK_IMPORTED_MODULE_1__.default)(group)) {
      length = nativeMax(group.length, length);
      return true;
    }
  });
  return (0,_baseTimes_js__WEBPACK_IMPORTED_MODULE_2__.default)(length, function (index) {
    return (0,_arrayMap_js__WEBPACK_IMPORTED_MODULE_3__.default)(array, (0,_baseProperty_js__WEBPACK_IMPORTED_MODULE_4__.default)(index));
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unzip);

/***/ }),

/***/ "./node_modules/lodash-es/zip.js":
/*!***************************************!*\
  !*** ./node_modules/lodash-es/zip.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseRest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseRest.js */ "./node_modules/lodash-es/_baseRest.js");
/* harmony import */ var _unzip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unzip.js */ "./node_modules/lodash-es/unzip.js");


/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 */

var zip = (0,_baseRest_js__WEBPACK_IMPORTED_MODULE_0__.default)(_unzip_js__WEBPACK_IMPORTED_MODULE_1__.default);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zip);

/***/ }),

/***/ "./src/combat.ts":
/*!***********************!*\
  !*** ./src/combat.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Macro": () => (/* binding */ Macro),
/* harmony export */   "MODE_NULL": () => (/* binding */ MODE_NULL),
/* harmony export */   "MODE_MACRO": () => (/* binding */ MODE_MACRO),
/* harmony export */   "MODE_FIND_MONSTER_THEN": () => (/* binding */ MODE_FIND_MONSTER_THEN),
/* harmony export */   "MODE_RUN_UNLESS_FREE": () => (/* binding */ MODE_RUN_UNLESS_FREE),
/* harmony export */   "setMode": () => (/* binding */ setMode),
/* harmony export */   "getMode": () => (/* binding */ getMode),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "withMacro": () => (/* binding */ withMacro),
/* harmony export */   "adventureMacro": () => (/* binding */ adventureMacro)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // import { get } from 'lodash-es';

 // multiFight() stolen from Aenimus: https://github.com/Aenimus/aen_cocoabo_farm/blob/master/scripts/aen_combat.ash.
// Thanks! Licensed under MIT license.

function multiFight() {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('choice.php');
}

function candyblastDamage() {
  var spellDamagePercent = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)('spell damage percent');
  var multiplier = (100 + spellDamagePercent) / 100;
  return Math.ceil(multiplier * 48);
}

var Macro = /*#__PURE__*/function (_LibramMacro) {
  _inherits(Macro, _LibramMacro);

  var _super = _createSuper(Macro);

  function Macro() {
    _classCallCheck(this, Macro);

    return _super.apply(this, arguments);
  }

  _createClass(Macro, [{
    key: "submit",
    value: function submit() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Submitting macro: ".concat(this.toString()));
      return _get(_getPrototypeOf(Macro.prototype), "submit", this).call(this);
    }
  }, {
    key: "kill",
    value: function kill() {
      return this.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)(), 'attack').if_('monstername sleaze hobo', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Saucegeyser"])))).repeat()).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_shatteringPunchUsed') < 3, Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Shattering Punch"])))))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_gingerbreadMobHitUsed'), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Gingerbread Mob Hit"])))))).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_chestXRayUsed') < 3 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Chest X-Ray"])))))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_firedJokestersGun') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["The Jokester's gun"])))), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Fire the Jokester's Gun"])))))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_missileLauncherUsed') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)() >= 100, Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"])))))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.turboMode)(), Macro.while_('!hpbelow 500 && !match "some of it is even intact"', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Candyblast"])))))).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Lunging Thrust-Smack"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Lunging Thrust-Smack"])))).if_('monstername spooky hobo', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Lunging Thrust-Smack"])))).repeat()).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Stuffed Mortar Shell"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Saucegeyser"])))).attack();
    }
  }, {
    key: "spellKill",
    value: function spellKill() {
      return this.trySkill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucegeyser').repeat();
    }
  }, {
    key: "stasis",
    value: function stasis() {
      var _reduce;

      var mark = "final".concat(Math.random().toString(36).substr(2, 5));

      for (var _len = arguments.length, steps = new Array(_len), _key = 0; _key < _len; _key++) {
        steps[_key] = arguments[_key];
      }

      return (_reduce = [Macro.trySkill('Curse of Weaksauce'), Macro.trySkill('Micrometeorite'), Macro.trySkill('Love Mosquito'), Macro.trySkill('Extract'), Macro.tryItem('time-spinner')].reduce(function (currentMacro, nextStep) {
        return currentMacro.step("goto ".concat(mark, " !monsterhpabove ").concat(Math.ceil((0,_lib__WEBPACK_IMPORTED_MODULE_1__.effectiveFamiliarWeight)() * 0.75)), nextStep);
      }, this)).step.apply(_reduce, ["mark ".concat(mark)].concat(steps));
    }
  }, {
    key: "safeStasis",
    value: function safeStasis() {
      for (var _len2 = arguments.length, steps = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        steps[_key2] = arguments[_key2];
      }

      return this.stasis.apply(this, [Macro.while_("monsterhpabove ".concat(Math.ceil((0,_lib__WEBPACK_IMPORTED_MODULE_1__.effectiveFamiliarWeight)() * 0.75), " and !pastround 10"), Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["seal tooth"])))))].concat(steps));
    }
  }, {
    key: "perpetualStasis",
    value: function perpetualStasis() {
      for (var _len3 = arguments.length, steps = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        steps[_key3] = arguments[_key3];
      }

      return this.stasis.apply(this, [Macro.while_("!pastround 10", Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["seal tooth"])))))].concat(steps));
    }
  }, {
    key: "maybeStasis",
    value: function maybeStasis() {
      var stasisFamiliars = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiars)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Cocoabo,Ninja Pirate Zombie Robot,Stocking Mimic,Feather Boa Constrictor"])));

      if (stasisFamiliars.includes((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)()) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Comma Chameleon"]))) && stasisFamiliars.map(function (f) {
        return "".concat(f);
      }).includes((0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('commaFamiliar'))) {
        return this.safeStasis.apply(this, arguments);
      }

      return this.step.apply(this, arguments);
    }
  }, {
    key: "tentacle",
    value: function tentacle() {
      return this.if_('monstername eldritch tentacle', Macro.step.apply(Macro, arguments).perpetualStasis().spellKill()); //return this.if_('monstername eldritch tentacle', Macro.step(...steps).skill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucestorm').repeat());
    }
  }, {
    key: "professor",
    value: function professor() {
      var lecture = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["lecture on relativity"])));
      return this.if_("hasskill ".concat(lecture), Macro.skill("".concat(lecture)));
    }
  }, {
    key: "kramco",
    value: function kramco() {
      return this.if_('monstername sausage goblin', Macro.step.apply(Macro, arguments).spellKill());
    }
  }], [{
    key: "nonFree",
    value: function nonFree() {
      return '!monstername "witchess" && !monstername "sausage goblin" && !monstername "black crayon"';
    }
  }, {
    key: "kill",
    value: function kill() {
      return new Macro().kill();
    }
  }, {
    key: "spellKill",
    value: function spellKill() {
      return new Macro().spellKill();
    }
  }, {
    key: "stasis",
    value: function stasis() {
      var _Macro;

      return (_Macro = new Macro()).stasis.apply(_Macro, arguments);
    }
  }, {
    key: "safeStasis",
    value: function safeStasis() {
      var _Macro2;

      return (_Macro2 = new Macro()).safeStasis.apply(_Macro2, arguments);
    }
  }, {
    key: "perpetualStasis",
    value: function perpetualStasis() {
      return new Macro().perpetualStasis();
    }
  }, {
    key: "maybeStasis",
    value: function maybeStasis() {
      var _Macro3;

      return (_Macro3 = new Macro()).maybeStasis.apply(_Macro3, arguments);
    }
  }, {
    key: "tentacle",
    value: function tentacle() {
      var _Macro4;

      return (_Macro4 = new Macro()).tentacle.apply(_Macro4, arguments);
    }
  }, {
    key: "professor",
    value: function professor() {
      return new Macro().professor();
    }
  }, {
    key: "kramco",
    value: function kramco() {
      var _Macro5;

      return (_Macro5 = new Macro()).kramco.apply(_Macro5, arguments);
    }
  }]);

  return Macro;
}(libram__WEBPACK_IMPORTED_MODULE_4__.Macro);
var MODE_NULL = '';
var MODE_MACRO = 'macro';
var MODE_FIND_MONSTER_THEN = 'findthen';
var MODE_RUN_UNLESS_FREE = 'rununlessfree';
function setMode(mode) {
  var arg1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var arg2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_combatMode', mode);
  if (arg1 !== null) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_combatArg1', arg1);
  if (arg2 !== null) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_combatArg2', arg2);
}
function getMode() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('minehobo_combatMode');
}
function main(initialRound, foe, page) {
  if (foe === Monster.get('time-spinner prank')) {
    var prankerMatch = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(page, '//span[@id="monname"]/text()');

    if (prankerMatch.length > 0) {
      var prankers = libram__WEBPACK_IMPORTED_MODULE_3__.getString('_timePranks').split(',').filter(function (s) {
        return s.length > 0;
      }).concat(prankerMatch);
      (0,libram__WEBPACK_IMPORTED_MODULE_3__.set)('_timePranks', prankers.join(','));
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('Unable to track time pranker!');
    }
  }

  var mode = getMode();

  if (mode === MODE_MACRO) {
    Macro.load().submit();
  } else {
    throw 'Unrecognized mode.';
  }
}
function withMacro(macro, action) {
  try {
    macro.save();
    setMode(MODE_MACRO);
    return action();
  } finally {
    multiFight();
    Macro.clearSaved();
  }
}
function adventureMacro(loc, macro) {
  withMacro(macro, function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, -1, '');
  });
}

/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogLevel": () => (/* binding */ LogLevel),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "MayoClinic": () => (/* binding */ MayoClinic),
/* harmony export */   "myEffectsClean": () => (/* binding */ myEffectsClean),
/* harmony export */   "Table": () => (/* binding */ Table),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "getPropertyString": () => (/* binding */ getPropertyString),
/* harmony export */   "getPropertyInt": () => (/* binding */ getPropertyInt),
/* harmony export */   "getPropertyBoolean": () => (/* binding */ getPropertyBoolean),
/* harmony export */   "setPropertyInt": () => (/* binding */ setPropertyInt),
/* harmony export */   "setChoice": () => (/* binding */ setChoice),
/* harmony export */   "setChoices": () => (/* binding */ setChoices),
/* harmony export */   "getChoice": () => (/* binding */ getChoice),
/* harmony export */   "cheapest": () => (/* binding */ cheapest),
/* harmony export */   "getItem": () => (/* binding */ getItem),
/* harmony export */   "sausageMp": () => (/* binding */ sausageMp),
/* harmony export */   "myFamiliarWeight": () => (/* binding */ myFamiliarWeight),
/* harmony export */   "lastWasCombat": () => (/* binding */ lastWasCombat),
/* harmony export */   "unclosetNickels": () => (/* binding */ unclosetNickels),
/* harmony export */   "stopAt": () => (/* binding */ stopAt),
/* harmony export */   "mustStop": () => (/* binding */ mustStop),
/* harmony export */   "turboMode": () => (/* binding */ turboMode),
/* harmony export */   "ensureJingle": () => (/* binding */ ensureJingle),
/* harmony export */   "recordInstanceState": () => (/* binding */ recordInstanceState),
/* harmony export */   "getImage": () => (/* binding */ getImage),
/* harmony export */   "memoizeTurncount": () => (/* binding */ memoizeTurncount),
/* harmony export */   "getImageTownsquare": () => (/* binding */ getImageTownsquare),
/* harmony export */   "getImageBb": () => (/* binding */ getImageBb),
/* harmony export */   "getImageEe": () => (/* binding */ getImageEe),
/* harmony export */   "getImageHeap": () => (/* binding */ getImageHeap),
/* harmony export */   "getImagePld": () => (/* binding */ getImagePld),
/* harmony export */   "getImageAhbg": () => (/* binding */ getImageAhbg),
/* harmony export */   "wrapMain": () => (/* binding */ wrapMain),
/* harmony export */   "extractInt": () => (/* binding */ extractInt),
/* harmony export */   "printLines": () => (/* binding */ printLines),
/* harmony export */   "effectiveFamiliarWeight": () => (/* binding */ effectiveFamiliarWeight),
/* harmony export */   "inClan": () => (/* binding */ inClan),
/* harmony export */   "withStash": () => (/* binding */ withStash),
/* harmony export */   "buffsBelowThreshold": () => (/* binding */ buffsBelowThreshold),
/* harmony export */   "minimumRelevantBuff": () => (/* binding */ minimumRelevantBuff),
/* harmony export */   "time": () => (/* binding */ time),
/* harmony export */   "assert": () => (/* binding */ assert)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var _sewers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sewers */ "./src/sewers.ts");
/* harmony import */ var _wl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wl */ "./src/wl.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["None"] = -1] = "None";
  LogLevel[LogLevel["Info"] = 0] = "Info";
  LogLevel[LogLevel["Debug"] = 1] = "Debug";
})(LogLevel || (LogLevel = {}));

var log = function () {
  var printLevel = LogLevel.None;

  switch ((0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('bkLogLevel').toLowerCase()) {
    case 'debug':
      printLevel = LogLevel.Debug;
      break;

    case 'info':
      printLevel = LogLevel.Info;
      break;
  }

  return function (level, message, color) {
    if (printLevel >= level) {
      if (color) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(message, color);
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(message);
      }
    }
  };
}();


var MayoClinic = /*#__PURE__*/function () {
  function MayoClinic() {
    _classCallCheck(this, MayoClinic);
  }

  _createClass(MayoClinic, null, [{
    key: "present",
    value: function present() {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()[(0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject || (_templateObject = _taggedTemplateLiteral(["portable Mayo clinic"]))).name] !== undefined;
    }
  }, {
    key: "canPlace",
    value: function canPlace() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.have)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["portable Mayo clinic"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_workshedItemUsed');
    }
  }, {
    key: "set",
    value: function set(item) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("mayominder ".concat(item));
    }
  }, {
    key: "tryPlace",
    value: function tryPlace() {
      if (!MayoClinic.present() && MayoClinic.canPlace()) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["portable Mayo clinic"]))));
      }

      return MayoClinic.present();
    }
  }]);

  return MayoClinic;
}();
var effectsLookup = new Map();
(0,libram__WEBPACK_IMPORTED_MODULE_4__.$effects)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([""]))).forEach(function (e) {
  var currentMap = effectsLookup.get(e.name) || new Map();
  currentMap.set((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(e), e);
  effectsLookup.set(e.name, currentMap);
});
function myEffectsClean() {
  var currentEffects = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEffects)();
  var cleanEffects = new Array();
  var duplicateEffectRegex = new RegExp(/^\[(\d*)\](.*)$/);

  for (var effectStr in currentEffects) {
    var effectMatch = effectStr.match(duplicateEffectRegex);

    if (effectMatch && effectMatch.length > 1) {
      var effectId = parseInt(effectMatch[1]);
      cleanEffects.push([(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toEffect)(effectId), currentEffects[effectStr]]);
    } else {
      cleanEffects.push([(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toEffect)(effectStr), currentEffects[effectStr]]);
    }
  }

  return cleanEffects;
}
var Table = /*#__PURE__*/function () {
  function Table() {
    _classCallCheck(this, Table);

    _defineProperty(this, "rows", []);
  }

  _createClass(Table, [{
    key: "row",
    value: function row() {
      for (var _len = arguments.length, cells = new Array(_len), _key = 0; _key < _len; _key++) {
        cells[_key] = arguments[_key];
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.logprint)(cells.join('\t'));
      this.rows.push(cells);
    }
  }, {
    key: "render",
    value: function render() {
      var rowsHtml = this.rows.map(function (cells) {
        return "<tr><td>".concat(cells.map(function (cell) {
          return cell.toString();
        }).join('</td><td>'), "</td></tr>");
      });
      return "<table border=\"1\"><tbody>".concat(rowsHtml.join(''), "</table></tbody>");
    }
  }]);

  return Table;
}();
function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}
function getPropertyString(name) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);
  return str === '' && def !== null ? def : str;
}
function getPropertyInt(name) {
  var default_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);

  if (str === '') {
    if (default_ === null) throw "Unknown property ".concat(name, ".");else return default_;
  }

  return parseInt(str, 10);
}
function getPropertyBoolean(name) {
  var default_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);

  if (str === '') {
    if (default_ === null) throw "Unknown property ".concat(name, ".");else return default_;
  }

  return str === 'true';
}
function setPropertyInt(name, value) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(name, value.toString());
}
function setChoice(adv, choice) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)("choiceAdventure".concat(adv), "".concat(choice));
}
function setChoices(choices) {
  choices.forEach(function (adv, choice) {
    setChoice(adv, choice);
  });
}
function getChoice(adv) {
  return getPropertyInt("choiceAdventure".concat(adv));
}
function cheapest() {
  for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    items[_key2] = arguments[_key2];
  }

  var prices = items.map(function (it) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(it);
  });
  var pricesChecked = prices.map(function (p) {
    return p < 100 ? 999999999 : p;
  });
  var minIndex = pricesChecked.reduce(function (i, x, j) {
    return pricesChecked[i] < x ? i : j;
  }, 0);
  return items[minIndex];
}
function getItem(qty, item, maxPrice) {
  if (item !== (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["pocket wish"]))) && qty * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item) > 1000000) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('bad get!');

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(qty, item);
  } catch (e) {}

  var remaining = qty - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item);
  if (remaining <= 0) return qty;
  var getCloset = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.closetAmount)(item));
  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeCloset)(getCloset, item)) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('failed to remove from closet');
  remaining -= getCloset;
  if (remaining <= 0) return qty;
  var getMall = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(item));

  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)(getMall, item)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh shop');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh inventory');
    remaining = qty - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item);
    getMall = Math.min(remaining, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(item));
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)(getMall, item)) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('failed to remove from shop');
  }

  remaining -= getMall;
  if (remaining <= 0) return qty;
  remaining -= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(remaining, item, maxPrice);
  if (remaining > 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Mall price too high for ".concat(item, "."));
  return qty - remaining;
}
function sausageMp(target) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < target && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)() >= 400 && getPropertyInt('_sausagesEaten') < 23 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["magical sausage casing"])))) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(1, Item.get('magical sausage'));
  }
}
function myFamiliarWeight() {
  var familiar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (familiar === null) familiar = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)();
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)(familiar) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)();
}
function lastWasCombat() {
  return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLocation)().noncombatQueue.includes((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('lastEncounter'));
}
function unclosetNickels() {
  var _iterator = _createForOfIteratorHelper((0,libram__WEBPACK_IMPORTED_MODULE_4__.$items)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["hobo nickel, sand dollar"])))),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.closetAmount)(item), item);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function stopAt(args) {
  var stopTurncount = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() * 1.1 + 50;

  if (Number.isFinite(parseInt(args, 10))) {
    stopTurncount = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() + parseInt(args, 10);
  }

  return Math.round(stopTurncount);
}
function mustStop(stopTurncount) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() >= stopTurncount || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() === 0;
}
var turbo = true;
function turboMode() {
  return turbo;
}
function ensureJingle() {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Jingle Jangle Jingle"])))) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("csend to buffy || ".concat(Math.round((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() * 1.1 + 200), " jingle"));

    for (var i = 0; i < 5; i++) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.wait)(3);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh status');
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Jingle Jangle Jingle"])))) > 0) break;
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Jingle Jangle Jingle"])))) === 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('Get Jingle Bells first.');
  }
}

function writeWhiteboard(text) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_basement.php?pwd&action=whitewrite&whiteboard=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(text)), true, true);
}

function recordInstanceState() {
  var lines = ["Ol' Scratch at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Burnbarrel Blvd."]))))), "Frosty at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Exposure Esplanade"]))))), "Oscus at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["The Heap"]))))), "Zombo at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]))))), "Chester at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["The Purple Light District"])))))];
  var whiteboard = '';
  var date = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.formatDateTime)('yyyyMMdd', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.todayToString)(), 'yyyy-MM-dd');
  whiteboard += "Status as of ".concat(date, " ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.timeToString)(), ":\n");

  for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
    var line = _lines[_i];
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(line);
    whiteboard += "".concat(line, "\n");
  }

  writeWhiteboard(whiteboard);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('"Mining" complete.');
}
var places = {
  'Hobopolis Town Square': {
    name: 'townsquare',
    number: 2
  },
  'Burnbarrel Blvd.': {
    name: 'burnbarrelblvd',
    number: 4
  },
  'Exposure Esplanade': {
    name: 'exposureesplanade',
    number: 5
  },
  'The Heap': {
    name: 'theheap',
    number: 6
  },
  'The Ancient Hobo Burial Ground': {
    name: 'burialground',
    number: 7
  },
  'The Purple Light District': {
    name: 'purplelightdistrict',
    number: 8
  }
};
function getImage(location) {
  var _places$location$toSt = places[location.toString()],
      name = _places$location$toSt.name,
      number = _places$location$toSt.number;
  var text = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_hobopolis.php?place=".concat(number));
  var match = text.match(new RegExp("".concat(name, "([0-9]+)o?.gif")));
  if (!match) return -1;
  return parseInt(match[1], 10);
}
var memoizeStore = new Map();
function memoizeTurncount(func) {
  var turnThreshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var forceUpdate = function forceUpdate() {
    var result = func.apply(void 0, arguments);
    memoizeStore.set(func, [(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)(), result]);
    return result;
  };

  var result = function result() {
    var _ref = memoizeStore.get(func) || [-1, null],
        _ref2 = _slicedToArray(_ref, 2),
        lastTurncount = _ref2[0],
        lastResult = _ref2[1];

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() >= lastTurncount + turnThreshold) {
      return forceUpdate.apply(void 0, arguments);
    } else {
      return lastResult;
    }
  };

  result.forceUpdate = forceUpdate;
  return result;
}
var getImageTownsquare = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Hobopolis Town Square"]))));
}, 10);
var getImageBb = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Burnbarrel Blvd."]))));
});
var getImageEe = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Exposure Esplanade"]))));
}, 10);
var getImageHeap = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["The Heap"]))));
}, 10);
var getImagePld = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["The Purple Light District"]))));
}, 10);
var getImageAhbg = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]))));
}, 10);
function wrapMain() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  try {
    turbo = args.includes('turbo');

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Pastamancer"]))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)() !== (0,libram__WEBPACK_IMPORTED_MODULE_4__.$thrall)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Elbow Macaroni"])))) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]))));
    }

    ensureJingle();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('counters nowarn Fortune Cookie');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('mood apathetic');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('ccs minehobo2');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate digitize; terminal educate extract');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('hpAutoRecovery', turbo ? '0.5' : '0.8');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('hpAutoRecoveryTarget', '0.95');
    action();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('Done mining.');
  } finally {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setAutoAttack)(0);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_lastObjective', '');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_lastStats', '');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_lastFamiliar', '');
    unclosetNickels();
    if ((0,_sewers__WEBPACK_IMPORTED_MODULE_1__.throughSewers)()) recordInstanceState();
  }
}
function extractInt(regex, text) {
  var group = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!regex.global) throw 'Regexes must be global.';
  var result = 0;
  var match;

  while ((match = regex.exec(text)) !== null) {
    if (match[group] === 'a') {
      result += 1;
    } else {
      result += parseInt(match[group], 10);
    }
  }

  return result;
}
function printLines() {
  for (var _len3 = arguments.length, lines = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    lines[_key3] = arguments[_key3];
  }

  for (var _i2 = 0, _lines2 = lines; _i2 < _lines2.length; _i2++) {
    var line = _lines2[_i2];
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.logprint)(line);
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(lines.map(function (line) {
    return line.replace('<', '&lt;');
  }).join('\n'));
}
function effectiveFamiliarWeight() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)()) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)();
}
function inClan(clanName, action) {
  clanName = clanName.toLowerCase();
  var startingClanName = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)().toLowerCase();
  if (startingClanName !== clanName) (0,_wl__WEBPACK_IMPORTED_MODULE_2__.setClan)(clanName);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)().toLowerCase() !== clanName) {
    throw "Failed to move to clan ".concat(clanName, " (currently in ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)(), ")");
  }

  try {
    return action();
  } finally {
    if (startingClanName !== clanName) (0,_wl__WEBPACK_IMPORTED_MODULE_2__.setClan)(startingClanName);
  }
}
function withStash(itemsToTake, action) {
  if (itemsToTake.every(function (item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) > 0;
  })) return action();
  var stashClanName = (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('stashClan');
  if (stashClanName === '') throw "No clan specified to borrow from the stash";
  return inClan(stashClanName, function () {
    var quantitiesTaken = new Map();

    try {
      var _iterator2 = _createForOfIteratorHelper(itemsToTake),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== stashClanName) throw "Wrong clan! Don't take stuff out of the stash here!";
          var succeeded = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeStash)(1, item);

          if (succeeded) {
            var _quantitiesTaken$get;

            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Took ".concat(item.plural, " from stash."), 'blue');
            quantitiesTaken.set(item, ((_quantitiesTaken$get = quantitiesTaken.get(item)) !== null && _quantitiesTaken$get !== void 0 ? _quantitiesTaken$get : 0) + (succeeded ? 1 : 0));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return action();
    } finally {
      var _iterator3 = _createForOfIteratorHelper(quantitiesTaken.entries()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              _item = _step3$value[0],
              quantityTaken = _step3$value[1];

          // eslint-disable-next-line no-unsafe-finally
          if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== stashClanName) throw "Wrong clan! Don't put stuff back in the stash here!";
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(quantityTaken, _item);
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putStash)(quantityTaken, _item);
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Returned ".concat(quantityTaken, " ").concat(_item.plural, " to stash."), 'blue');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  });
}
function buffsBelowThreshold(threshold, modifierStr) {
  var myEffects = myEffectsClean();
  var modifiers = modifierStr ? modifierStr.split(';') : [];
  modifiers = modifiers.length === 0 ? ['Item Drop', 'Meat Drop', 'Monster Level', 'Booze Drop', 'Food Drop', 'Familiar Weight'] : modifiers;
  return myEffects.filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        effect = _ref4[0],
        turns = _ref4[1];

    return modifiers.some(function (modifier) {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(effect, modifier) > 0 && turns < threshold;
    });
  });
}
function minimumRelevantBuff(modifierStr) {
  var myEffects = myEffectsClean();
  var modifiers = modifierStr ? modifierStr.split(';') : [];
  modifiers = modifiers.length === 0 ? ['Item Drop', 'Meat Drop', 'Monster Level'] : modifiers;
  var relevantBuffs = myEffects.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        effect = _ref6[0],
        turns = _ref6[1];

    return modifiers.some(function (modifier) {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(effect, modifier) > 0;
    });
  });

  var _relevantBuffs$reduce = relevantBuffs.reduce(function (_ref7, _ref8) {
    var _ref9 = _slicedToArray(_ref7, 2),
        aggEffect = _ref9[0],
        aggTurns = _ref9[1];

    var _ref10 = _slicedToArray(_ref8, 2),
        curEffect = _ref10[0],
        curTurns = _ref10[1];

    return aggTurns > curTurns ? [curEffect, curTurns] : [aggEffect, aggTurns];
  }),
      _relevantBuffs$reduce2 = _slicedToArray(_relevantBuffs$reduce, 2),
      minEffect = _relevantBuffs$reduce2[0],
      minTurns = _relevantBuffs$reduce2[1];

  return [minEffect, minTurns];
}
function time(action, level) {
  var startTime = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.nowToInt)();
  var retVal = action();
  var totalTime = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.nowToInt)() - startTime;
  if (level === undefined) level = LogLevel.Debug;

  if (totalTime < 1000) {
    log(level, "Took ".concat(totalTime, " ms"));
  } else if (totalTime < 60 * 1000) {
    log(level, "Took ".concat(totalTime / 1000, " Seconds"));
  } else if (totalTime < 60 * 60 * 1000) {
    log(level, "Took ".concat(totalTime / (60 * 1000), " Minutes"));
  }

  return retVal;
}
function assert(condition, message) {
  var assertCondition = condition;

  if (condition && typeof condition === 'function') {
    var _assertCondition = condition();
  }

  if (!assertCondition) {
    throw message;
  }
}

/***/ }),

/***/ "./src/sewers.ts":
/*!***********************!*\
  !*** ./src/sewers.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSewersState": () => (/* binding */ getSewersState),
/* harmony export */   "throughSewers": () => (/* binding */ throughSewers),
/* harmony export */   "sewerAccess": () => (/* binding */ sewerAccess),
/* harmony export */   "getSewerItems": () => (/* binding */ getSewerItems),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combat */ "./src/combat.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var getSewersState = (0,_lib__WEBPACK_IMPORTED_MODULE_2__.memoizeTurncount)(function () {
  var logText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_raidlogs.php');
  var grates = (0,_lib__WEBPACK_IMPORTED_MODULE_2__.extractInt)(/opened (a|[0-9]+) sewer grate/g, logText);
  var valves = (0,_lib__WEBPACK_IMPORTED_MODULE_2__.extractInt)(/lowered the water level( [0-9]+ times?)? \(([0-9]+) turn/g, logText, 2);
  return {
    grates: grates,
    valves: valves
  };
});
function throughSewers() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_hobopolis.php').includes('clan_hobopolis.php?place=2');
}
function sewerAccess() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_hobopolis.php').includes('adventure.php?snarfblat=166');
}
function getSewerItems() {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject || (_templateObject = _taggedTemplateLiteral(["unfortunate dumplings, sewer wad, bottle of ooze-o, gatorskin umbrella"]))).some(function (i) {
    return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, i);
  }) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["oil of oiliness"]))));
}
function main() {
  // cage
  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(211, 0);
  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(212, 0); // tunnels

  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(197, 1);
  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(198, 1);
  var boots = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Pair of Stomping Boots"])));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)('-combat -weapon -offhand', false);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(boots);

  while (!throughSewers()) {
    if (!getSewerItems()) {
      throw 'Unable to get sewer items';
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["weapon"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["gatorskin umbrella"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["offhand"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["hobo code binder"]))));
    var runcap = Math.floor(((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)(boots) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)()) / 5);
    (0,_combat__WEBPACK_IMPORTED_MODULE_1__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["A Maze of Sewer Tunnels"]))), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_banderRunaways') < runcap, _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.step('runaway').abort()).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Louder Than Bomb"])))) > 0, _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Louder Than Bomb"])))).abort()).abort());
  }
}

/***/ }),

/***/ "./src/wl.ts":
/*!*******************!*\
  !*** ./src/wl.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setClan": () => (/* binding */ setClan),
/* harmony export */   "printClanStatus": () => (/* binding */ printClanStatus),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony import */ var lodash_es_zip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash-es/zip */ "./node_modules/lodash-es/zip.js");
/* harmony import */ var _sewers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sewers */ "./src/sewers.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






function getClanCache() {
  var targetClanName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var clanCache = new Map(JSON.parse((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyString)('minehobo_clanCache', '[]')));

  if (Object.keys(clanCache).length === 0 || targetClanName !== null && !clanCache.has(targetClanName)) {
    var recruiter = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_signup.php');
    var clanIds = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(recruiter, '//select[@name="whichclan"]/option/@value').map(function (s) {
      return parseInt(s, 10);
    });
    var clanNames = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(recruiter, '//select[@name="whichclan"]/option/text()');
    clanCache = new Map((0,lodash_es_zip__WEBPACK_IMPORTED_MODULE_3__.default)(clanNames, clanIds));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('minehobo_clanCache', JSON.stringify(_toConsumableArray(clanCache.entries())));
  return clanCache;
}

function getTargetClanName(target) {
  var clanCache = getClanCache();

  var targetClanNames = _toConsumableArray(clanCache.keys()).filter(function (name) {
    return name.toLowerCase().includes(target.toLowerCase());
  });

  if (targetClanNames.length === 0) {
    throw "You're not in any clan named like ".concat(target, ".");
  } else if (targetClanNames.length >= 2) {
    throw "You're in multiple clans named like ".concat(target, ": ").concat(targetClanNames);
  }

  return targetClanNames[0];
}

function setClan(target) {
  var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var targetClanName = getTargetClanName(target);

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== targetClanName) {
    if (verbose) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Switching to clan: ".concat(targetClanName, "."));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("showclan.php?whichclan=".concat(getClanCache(targetClanName).get(targetClanName), "&action=joinclan&confirm=on&pwd"));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== targetClanName) {
      throw "Failed to switch clans to ".concat(target, ". Did you spell it correctly? Are you whitelisted?");
    }

    if (verbose) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('Successfully switched clans.', 'green');
  } else {
    if (verbose) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already in clan ".concat(targetClanName, "."), 'blue');
  }

  return true;
}
function printClanStatus() {
  var raidlogs = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_raidlogs.php');
  var bosses = ["Ol' Scratch", 'Frosty', 'Oscus', 'Zombo', 'Chester', 'Hodgman'];
  var bossRe = new RegExp("defeated +(".concat(bosses.join('|'), ")"), 'g');
  var bossCount = (raidlogs.match(bossRe) || []).length;

  if (bossCount >= 4) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)("<b>Hobopolis cleared. ".concat(bossCount, " bosses defeated.</b>"));
  } else if (!raidlogs.includes('made it through the sewer')) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)('<b>Fresh instance.</b>');
  } else {
    var whiteboardMatch = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_basement.php?whiteboard=1').match('<textarea[^>]*name=whiteboard[^>]*>([^<]*)</textarea>');

    if (whiteboardMatch) {
      var _iterator = _createForOfIteratorHelper(whiteboardMatch[1].split('\n')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          if (line.trim().length > 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(line);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  var sewers = (0,_sewers__WEBPACK_IMPORTED_MODULE_2__.getSewersState)();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Sewers at ".concat(sewers.grates, " grates, ").concat(sewers.valves, " valves"));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)();
}
function main() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (target !== null) setClan(target);
  printClanStatus();
}

/***/ }),

/***/ "kolmafia":
/*!***************************!*\
  !*** external "kolmafia" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("kolmafia");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/combat.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;