(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/libram/dist/Copier.js":
/*!********************************************!*\
  !*** ./node_modules/libram/dist/Copier.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Copier": () => (/* binding */ Copier)
/* harmony export */ });
var Copier =
/** @class */
function () {
  function Copier(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
    this.fightCopy = null;
    this.couldCopy = couldCopy;
    this.prepare = prepare;
    this.canCopy = canCopy;
    this.copiedMonster = copiedMonster;
    if (fightCopy) this.fightCopy = fightCopy;
  }

  return Copier;
}();



/***/ }),

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

/***/ "./node_modules/libram/dist/resources/2015/ChateauMantegna.js":
/*!********************************************************************!*\
  !*** ./node_modules/libram/dist/resources/2015/ChateauMantegna.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "have": () => (/* binding */ have),
/* harmony export */   "paintingMonster": () => (/* binding */ paintingMonster),
/* harmony export */   "paintingFought": () => (/* binding */ paintingFought),
/* harmony export */   "fightPainting": () => (/* binding */ fightPainting)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../property */ "./node_modules/libram/dist/property.js");


function have() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("chateauAvailable");
}
function paintingMonster() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("chateauMonster");
}
function paintingFought() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("_chateauMonsterFought");
}
function fightPainting() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", false);
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
}

/***/ }),

/***/ "./node_modules/libram/dist/resources/2016/Witchess.js":
/*!*************************************************************!*\
  !*** ./node_modules/libram/dist/resources/2016/Witchess.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "item": () => (/* binding */ item),
/* harmony export */   "have": () => (/* binding */ have),
/* harmony export */   "fightsDone": () => (/* binding */ fightsDone),
/* harmony export */   "pieces": () => (/* binding */ pieces),
/* harmony export */   "fightPiece": () => (/* binding */ fightPiece)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../property */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../template-string */ "./node_modules/libram/dist/template-string.js");
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





var item = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__.$item)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Witchess Set"], ["Witchess Set"])));
function have() {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_2__.haveInCampground)(item);
}
function fightsDone() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_3__.get)("_witchessFights");
}
var pieces = Monster.get(["Witchess Pawn", "Witchess Knight", "Witchess Bishop", "Witchess Rook", "Witchess Queen", "Witchess King", "Witchess Witch", "Witchess Ox"]);
function fightPiece(piece) {
  if (!pieces.includes(piece)) throw new Error("That is not a valid piece.");

  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("campground.php?action=witchess").includes("whichchoice value=1181")) {
    throw new Error("Failed to open Witchess.");
  }

  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(1).includes("whichchoice=1182")) {
    throw new Error("Failed to visit shrink ray.");
  }

  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myHash)() + "&whichchoice=1182&piece=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(piece), false).includes(piece.name)) {
    throw new Error("Failed to start fight.");
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/resources/2017/TunnelOfLove.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libram/dist/resources/2017/TunnelOfLove.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "have": () => (/* binding */ have),
/* harmony export */   "isUsed": () => (/* binding */ isUsed),
/* harmony export */   "haveLovEnamorang": () => (/* binding */ haveLovEnamorang),
/* harmony export */   "getLovEnamorangUses": () => (/* binding */ getLovEnamorangUses),
/* harmony export */   "couldUseLoveEnamorang": () => (/* binding */ couldUseLoveEnamorang),
/* harmony export */   "getLovEnamorangMonster": () => (/* binding */ getLovEnamorangMonster),
/* harmony export */   "LovEnamorang": () => (/* binding */ LovEnamorang),
/* harmony export */   "fightAll": () => (/* binding */ fightAll)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Copier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Copier */ "./node_modules/libram/dist/Copier.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../property */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../template-string */ "./node_modules/libram/dist/template-string.js");
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






function have() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("loveTunnelAvailable");
}
function isUsed() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("_loveTunnelUsed");
}
function haveLovEnamorang() {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_2__.have)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__.$item)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["LOV Enamorang"], ["LOV Enamorang"]))));
}
function getLovEnamorangUses() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("_enamorangs");
}
function couldUseLoveEnamorang() {
  return !(0,_lib__WEBPACK_IMPORTED_MODULE_2__.haveWandererCounter)(_lib__WEBPACK_IMPORTED_MODULE_2__.Wanderer.Enamorang) && getLovEnamorangUses() < 3 && haveLovEnamorang();
}
function getLovEnamorangMonster() {
  return (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)("enamorangMonster");
}
var LovEnamorang = new _Copier__WEBPACK_IMPORTED_MODULE_4__.Copier(function () {
  return couldUseLoveEnamorang();
}, null, function () {
  return couldUseLoveEnamorang();
}, function () {
  return getLovEnamorangMonster();
});

function equipmentChoice(equipment) {
  switch (equipment) {
    case "LOV Eardigan":
      return 1;

    case "LOV Epaulettes":
      return 2;

    case "LOV Earring":
      return 3;
  }
}

function effectChoice(effect) {
  switch (effect) {
    case "Lovebotamy":
      return 1;

    case "Open Heart Surgery":
      return 2;

    case "Wandering Eye Surgery":
      return 3;
  }
}

function extraChoice(extra) {
  switch (extra) {
    case "LOV Enamorang":
      return 1;

    case "LOV Emotionizer":
      return 2;

    case "LOV Extraterrestrial Chocolate":
      return 3;

    case "LOV Echinacea Bouquet":
      return 4;

    case "LOV Elephant":
      return 5;

    case "toast":
      return 6;

    case null:
      return 7;
  }
}
/**
 * Fight all LOV monsters and get buffs/equipment.
 * @param equipment Equipment to take from LOV.
 * @param effect Effect to take from LOV.
 * @param extra Extra item to take from LOV.
 */


function fightAll(equipment, effect, extra) {
  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1222", 1); // Entrance

  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1223", 1); // Fight LOV Enforcer

  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1224", equipmentChoice(equipment));
  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1225", 1); // Fight LOV Engineer

  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1226", effectChoice(effect));
  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1227", 1); // Fight LOV Equivocator

  (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)("choiceAdventure1228", extraChoice(extra));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,_template_string__WEBPACK_IMPORTED_MODULE_3__.$location)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["The Tunnel of L.O.V.E."], ["The Tunnel of L.O.V.E."]))), 0, "");
}
var templateObject_1, templateObject_2;

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

/***/ "./src/asdon.ts":
/*!**********************!*\
  !*** ./src/asdon.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateFuelEfficiency": () => (/* binding */ calculateFuelEfficiency),
/* harmony export */   "fillAsdonMartinTo": () => (/* binding */ fillAsdonMartinTo),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
function _templateObject2() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["cup of \"tea\", thermos of \"whiskey\", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of \"milk\", drive-thru burger, Boulevardier cocktail"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var fuelBlacklist = (0,libram__WEBPACK_IMPORTED_MODULE_1__.$items)(_templateObject());

function averageAdventures(it) {
  if (it.adventures.includes('-')) {
    var bounds = it.adventures.split('-');
    return (parseInt(bounds[0], 10) + parseInt(bounds[1], 10)) / 2.0;
  } else {
    return parseInt(it.adventures, 10);
  }
}

function price(item) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)(item) === 0 ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item) : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)(item);
}

function calculateFuelEfficiency(it, targetUnits) {
  var units = averageAdventures(it);
  return price(it) / Math.min(targetUnits, units);
}

function isFuelItem(it) {
  return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.isNpcItem)(it) && it.fullness + it.inebriety > 0 && averageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelBlacklist.includes(it);
}

var potentialFuel = (0,libram__WEBPACK_IMPORTED_MODULE_1__.$items)(_templateObject2()).filter(isFuelItem);

function getBestFuel(targetUnits) {
  var key1 = function key1(item) {
    return -averageAdventures(item);
  };

  var key2 = function key2(item) {
    return calculateFuelEfficiency(item, targetUnits);
  };

  potentialFuel.sort(function (x, y) {
    return key1(x) - key1(y);
  });
  potentialFuel.sort(function (x, y) {
    return key2(x) - key2(y);
  });
  return potentialFuel[0];
}

function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(it), "&go=Convert%21"));
  return result.includes('The display updates with a');
}

function fillAsdonMartinTo(targetUnits) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)() < targetUnits) {
    var remaining = targetUnits - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)();
    var fuel = getBestFuel(remaining);
    var count = Math.ceil(targetUnits / averageAdventures(fuel));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(count, fuel);

    if (!insertFuel(fuel, count)) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('Fuelling failed');
    }
  }
}
function main(args) {
  fillAsdonMartinTo(args.trim().match(/^[0-9]+$/) ? parseInt(args, 10) : 37);
}

/***/ }),

/***/ "./src/bkfights.ts":
/*!*************************!*\
  !*** ./src/bkfights.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/resources/2015/ChateauMantegna.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/resources/2017/TunnelOfLove.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/resources/2016/Witchess.js");
/* harmony import */ var _asdon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asdon */ "./src/asdon.ts");
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./combat */ "./src/combat.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
function _templateObject231() {
  var data = _taggedTemplateLiteral(["Eldritch Attunement"]);

  _templateObject231 = function _templateObject231() {
    return data;
  };

  return data;
}

function _templateObject230() {
  var data = _taggedTemplateLiteral(["Steely-Eyed Squint"]);

  _templateObject230 = function _templateObject230() {
    return data;
  };

  return data;
}

function _templateObject229() {
  var data = _taggedTemplateLiteral(["Platinum Yendorian Express Card"]);

  _templateObject229 = function _templateObject229() {
    return data;
  };

  return data;
}

function _templateObject228() {
  var data = _taggedTemplateLiteral(["SMOOCH soda"]);

  _templateObject228 = function _templateObject228() {
    return data;
  };

  return data;
}

function _templateObject227() {
  var data = _taggedTemplateLiteral(["SMOOCH soda"]);

  _templateObject227 = function _templateObject227() {
    return data;
  };

  return data;
}

function _templateObject226() {
  var data = _taggedTemplateLiteral(["Mayonex"]);

  _templateObject226 = function _templateObject226() {
    return data;
  };

  return data;
}

function _templateObject225() {
  var data = _taggedTemplateLiteral(["Mayonex"]);

  _templateObject225 = function _templateObject225() {
    return data;
  };

  return data;
}

function _templateObject224() {
  var data = _taggedTemplateLiteral(["Mayodiol"]);

  _templateObject224 = function _templateObject224() {
    return data;
  };

  return data;
}

function _templateObject223() {
  var data = _taggedTemplateLiteral(["Mayodiol"]);

  _templateObject223 = function _templateObject223() {
    return data;
  };

  return data;
}

function _templateObject222() {
  var data = _taggedTemplateLiteral(["SMOOCH soda"]);

  _templateObject222 = function _templateObject222() {
    return data;
  };

  return data;
}

function _templateObject221() {
  var data = _taggedTemplateLiteral(["Thanksgetting"]);

  _templateObject221 = function _templateObject221() {
    return data;
  };

  return data;
}

function _templateObject220() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject220 = function _templateObject220() {
    return data;
  };

  return data;
}

function _templateObject219() {
  var data = _taggedTemplateLiteral(["Mayodiol"]);

  _templateObject219 = function _templateObject219() {
    return data;
  };

  return data;
}

function _templateObject218() {
  var data = _taggedTemplateLiteral(["Mayodiol"]);

  _templateObject218 = function _templateObject218() {
    return data;
  };

  return data;
}

function _templateObject217() {
  var data = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"]);

  _templateObject217 = function _templateObject217() {
    return data;
  };

  return data;
}

function _templateObject216() {
  var data = _taggedTemplateLiteral(["Asdon Martin keyfob"]);

  _templateObject216 = function _templateObject216() {
    return data;
  };

  return data;
}

function _templateObject215() {
  var data = _taggedTemplateLiteral(["Summon Mayfly Swarm"]);

  _templateObject215 = function _templateObject215() {
    return data;
  };

  return data;
}

function _templateObject214() {
  var data = _taggedTemplateLiteral(["Release The Boots"]);

  _templateObject214 = function _templateObject214() {
    return data;
  };

  return data;
}

function _templateObject213() {
  var data = _taggedTemplateLiteral(["Menagerie Level 1"]);

  _templateObject213 = function _templateObject213() {
    return data;
  };

  return data;
}

function _templateObject212() {
  var data = _taggedTemplateLiteral(["May the Fourth Cosplay Saber"]);

  _templateObject212 = function _templateObject212() {
    return data;
  };

  return data;
}

function _templateObject211() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject211 = function _templateObject211() {
    return data;
  };

  return data;
}

function _templateObject210() {
  var data = _taggedTemplateLiteral(["May the Fourth Cosplay Saber"]);

  _templateObject210 = function _templateObject210() {
    return data;
  };

  return data;
}

function _templateObject209() {
  var data = _taggedTemplateLiteral(["mayfly bait necklace"]);

  _templateObject209 = function _templateObject209() {
    return data;
  };

  return data;
}

function _templateObject208() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject208 = function _templateObject208() {
    return data;
  };

  return data;
}

function _templateObject207() {
  var data = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]);

  _templateObject207 = function _templateObject207() {
    return data;
  };

  return data;
}

function _templateObject206() {
  var data = _taggedTemplateLiteral(["Pair of Stomping Boots"]);

  _templateObject206 = function _templateObject206() {
    return data;
  };

  return data;
}

function _templateObject205() {
  var data = _taggedTemplateLiteral(["May the Fourth Cosplay Saber"]);

  _templateObject205 = function _templateObject205() {
    return data;
  };

  return data;
}

function _templateObject204() {
  var data = _taggedTemplateLiteral(["Pair of Stomping Boots"]);

  _templateObject204 = function _templateObject204() {
    return data;
  };

  return data;
}

function _templateObject203() {
  var data = _taggedTemplateLiteral(["Menagerie Level 1"]);

  _templateObject203 = function _templateObject203() {
    return data;
  };

  return data;
}

function _templateObject202() {
  var data = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]);

  _templateObject202 = function _templateObject202() {
    return data;
  };

  return data;
}

function _templateObject201() {
  var data = _taggedTemplateLiteral(["Menagerie Level 1"]);

  _templateObject201 = function _templateObject201() {
    return data;
  };

  return data;
}

function _templateObject200() {
  var data = _taggedTemplateLiteral(["Artistic Goth Kid"]);

  _templateObject200 = function _templateObject200() {
    return data;
  };

  return data;
}

function _templateObject199() {
  var data = _taggedTemplateLiteral(["Summon Mayfly Swarm"]);

  _templateObject199 = function _templateObject199() {
    return data;
  };

  return data;
}

function _templateObject198() {
  var data = _taggedTemplateLiteral(["Snokebomb"]);

  _templateObject198 = function _templateObject198() {
    return data;
  };

  return data;
}

function _templateObject197() {
  var data = _taggedTemplateLiteral(["Feel Hatred"]);

  _templateObject197 = function _templateObject197() {
    return data;
  };

  return data;
}

function _templateObject196() {
  var data = _taggedTemplateLiteral(["Menagerie Level 1"]);

  _templateObject196 = function _templateObject196() {
    return data;
  };

  return data;
}

function _templateObject195() {
  var data = _taggedTemplateLiteral(["mayfly bait necklace"]);

  _templateObject195 = function _templateObject195() {
    return data;
  };

  return data;
}

function _templateObject194() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject194 = function _templateObject194() {
    return data;
  };

  return data;
}

function _templateObject193() {
  var data = _taggedTemplateLiteral(["Artistic Goth Kid"]);

  _templateObject193 = function _templateObject193() {
    return data;
  };

  return data;
}

function _templateObject192() {
  var data = _taggedTemplateLiteral(["mayfly bait necklace"]);

  _templateObject192 = function _templateObject192() {
    return data;
  };

  return data;
}

function _templateObject191() {
  var data = _taggedTemplateLiteral(["Witchess Bishop"]);

  _templateObject191 = function _templateObject191() {
    return data;
  };

  return data;
}

function _templateObject190() {
  var data = _taggedTemplateLiteral(["Deep Machine Tunnels"]);

  _templateObject190 = function _templateObject190() {
    return data;
  };

  return data;
}

function _templateObject189() {
  var data = _taggedTemplateLiteral(["machine elf"]);

  _templateObject189 = function _templateObject189() {
    return data;
  };

  return data;
}

function _templateObject188() {
  var data = _taggedTemplateLiteral(["gingerbread cigarette"]);

  _templateObject188 = function _templateObject188() {
    return data;
  };

  return data;
}

function _templateObject187() {
  var data = _taggedTemplateLiteral(["Gingerbread Upscale Retail District"]);

  _templateObject187 = function _templateObject187() {
    return data;
  };

  return data;
}

function _templateObject186() {
  var data = _taggedTemplateLiteral(["Gingerbread Civic Center"]);

  _templateObject186 = function _templateObject186() {
    return data;
  };

  return data;
}

function _templateObject185() {
  var data = _taggedTemplateLiteral(["Gingerbread Train Station"]);

  _templateObject185 = function _templateObject185() {
    return data;
  };

  return data;
}

function _templateObject184() {
  var data = _taggedTemplateLiteral(["gingerbread cigarette"]);

  _templateObject184 = function _templateObject184() {
    return data;
  };

  return data;
}

function _templateObject183() {
  var data = _taggedTemplateLiteral(["gingerbread cigarette"]);

  _templateObject183 = function _templateObject183() {
    return data;
  };

  return data;
}

function _templateObject182() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject182 = function _templateObject182() {
    return data;
  };

  return data;
}

function _templateObject181() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject181 = function _templateObject181() {
    return data;
  };

  return data;
}

function _templateObject180() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject180 = function _templateObject180() {
    return data;
  };

  return data;
}

function _templateObject179() {
  var data = _taggedTemplateLiteral(["orange boxing gloves"]);

  _templateObject179 = function _templateObject179() {
    return data;
  };

  return data;
}

function _templateObject178() {
  var data = _taggedTemplateLiteral(["familiar"]);

  _templateObject178 = function _templateObject178() {
    return data;
  };

  return data;
}

function _templateObject177() {
  var data = _taggedTemplateLiteral(["puck man"]);

  _templateObject177 = function _templateObject177() {
    return data;
  };

  return data;
}

function _templateObject176() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject176 = function _templateObject176() {
    return data;
  };

  return data;
}

function _templateObject175() {
  var data = _taggedTemplateLiteral(["Wandering Eye Surgery"]);

  _templateObject175 = function _templateObject175() {
    return data;
  };

  return data;
}

function _templateObject174() {
  var data = _taggedTemplateLiteral(["Your Mushroom Garden"]);

  _templateObject174 = function _templateObject174() {
    return data;
  };

  return data;
}

function _templateObject173() {
  var data = _taggedTemplateLiteral(["The X-32-F Combat Training Snowman"]);

  _templateObject173 = function _templateObject173() {
    return data;
  };

  return data;
}

function _templateObject172() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject172 = function _templateObject172() {
    return data;
  };

  return data;
}

function _templateObject171() {
  var data = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"]);

  _templateObject171 = function _templateObject171() {
    return data;
  };

  return data;
}

function _templateObject170() {
  var data = _taggedTemplateLiteral(["powdered madness"]);

  _templateObject170 = function _templateObject170() {
    return data;
  };

  return data;
}

function _templateObject169() {
  var data = _taggedTemplateLiteral(["powdered madness"]);

  _templateObject169 = function _templateObject169() {
    return data;
  };

  return data;
}

function _templateObject168() {
  var data = _taggedTemplateLiteral(["powdered madness"]);

  _templateObject168 = function _templateObject168() {
    return data;
  };

  return data;
}

function _templateObject167() {
  var data = _taggedTemplateLiteral(["Chest X-Ray"]);

  _templateObject167 = function _templateObject167() {
    return data;
  };

  return data;
}

function _templateObject166() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject166 = function _templateObject166() {
    return data;
  };

  return data;
}

function _templateObject165() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject165 = function _templateObject165() {
    return data;
  };

  return data;
}

function _templateObject164() {
  var data = _taggedTemplateLiteral(["Fire the Jokester's Gun"]);

  _templateObject164 = function _templateObject164() {
    return data;
  };

  return data;
}

function _templateObject163() {
  var data = _taggedTemplateLiteral(["The Jokester's gun"]);

  _templateObject163 = function _templateObject163() {
    return data;
  };

  return data;
}

function _templateObject162() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject162 = function _templateObject162() {
    return data;
  };

  return data;
}

function _templateObject161() {
  var data = _taggedTemplateLiteral(["Noob Cave"]);

  _templateObject161 = function _templateObject161() {
    return data;
  };

  return data;
}

function _templateObject160() {
  var data = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]);

  _templateObject160 = function _templateObject160() {
    return data;
  };

  return data;
}

function _templateObject159() {
  var data = _taggedTemplateLiteral(["off-hand"]);

  _templateObject159 = function _templateObject159() {
    return data;
  };

  return data;
}

function _templateObject158() {
  var data = _taggedTemplateLiteral(["glark cable"]);

  _templateObject158 = function _templateObject158() {
    return data;
  };

  return data;
}

function _templateObject157() {
  var data = _taggedTemplateLiteral(["The Red Zeppelin"]);

  _templateObject157 = function _templateObject157() {
    return data;
  };

  return data;
}

function _templateObject156() {
  var data = _taggedTemplateLiteral(["glark cable"]);

  _templateObject156 = function _templateObject156() {
    return data;
  };

  return data;
}

function _templateObject155() {
  var data = _taggedTemplateLiteral(["time-spinner"]);

  _templateObject155 = function _templateObject155() {
    return data;
  };

  return data;
}

function _templateObject154() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject154 = function _templateObject154() {
    return data;
  };

  return data;
}

function _templateObject153() {
  var data = _taggedTemplateLiteral(["drunk pygmy"]);

  _templateObject153 = function _templateObject153() {
    return data;
  };

  return data;
}

function _templateObject152() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject152 = function _templateObject152() {
    return data;
  };

  return data;
}

function _templateObject151() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject151 = function _templateObject151() {
    return data;
  };

  return data;
}

function _templateObject150() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject150 = function _templateObject150() {
    return data;
  };

  return data;
}

function _templateObject149() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject149 = function _templateObject149() {
    return data;
  };

  return data;
}

function _templateObject148() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject148 = function _templateObject148() {
    return data;
  };

  return data;
}

function _templateObject147() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject147 = function _templateObject147() {
    return data;
  };

  return data;
}

function _templateObject146() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject146 = function _templateObject146() {
    return data;
  };

  return data;
}

function _templateObject145() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject145 = function _templateObject145() {
    return data;
  };

  return data;
}

function _templateObject144() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject144 = function _templateObject144() {
    return data;
  };

  return data;
}

function _templateObject143() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject143 = function _templateObject143() {
    return data;
  };

  return data;
}

function _templateObject142() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject142 = function _templateObject142() {
    return data;
  };

  return data;
}

function _templateObject141() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject141 = function _templateObject141() {
    return data;
  };

  return data;
}

function _templateObject140() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject140 = function _templateObject140() {
    return data;
  };

  return data;
}

function _templateObject139() {
  var data = _taggedTemplateLiteral(["Snokebomb"]);

  _templateObject139 = function _templateObject139() {
    return data;
  };

  return data;
}

function _templateObject138() {
  var data = _taggedTemplateLiteral(["Feel Hatred"]);

  _templateObject138 = function _templateObject138() {
    return data;
  };

  return data;
}

function _templateObject137() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject137 = function _templateObject137() {
    return data;
  };

  return data;
}

function _templateObject136() {
  var data = _taggedTemplateLiteral(["BRICKO ooze"]);

  _templateObject136 = function _templateObject136() {
    return data;
  };

  return data;
}

function _templateObject135() {
  var data = _taggedTemplateLiteral(["lynyrd snare"]);

  _templateObject135 = function _templateObject135() {
    return data;
  };

  return data;
}

function _templateObject134() {
  var data = _taggedTemplateLiteral(["Evoke Eldritch Horror"]);

  _templateObject134 = function _templateObject134() {
    return data;
  };

  return data;
}

function _templateObject133() {
  var data = _taggedTemplateLiteral(["Evoke Eldritch Horror"]);

  _templateObject133 = function _templateObject133() {
    return data;
  };

  return data;
}

function _templateObject132() {
  var data = _taggedTemplateLiteral(["ice sculpture"]);

  _templateObject132 = function _templateObject132() {
    return data;
  };

  return data;
}

function _templateObject131() {
  var data = _taggedTemplateLiteral(["ice sculpture"]);

  _templateObject131 = function _templateObject131() {
    return data;
  };

  return data;
}

function _templateObject130() {
  var data = _taggedTemplateLiteral(["shaking 4-d camera"]);

  _templateObject130 = function _templateObject130() {
    return data;
  };

  return data;
}

function _templateObject129() {
  var data = _taggedTemplateLiteral(["shaking 4-d camera"]);

  _templateObject129 = function _templateObject129() {
    return data;
  };

  return data;
}

function _templateObject128() {
  var data = _taggedTemplateLiteral(["Feel Nostalgic"]);

  _templateObject128 = function _templateObject128() {
    return data;
  };

  return data;
}

function _templateObject127() {
  var data = _taggedTemplateLiteral(["photocopied monster"]);

  _templateObject127 = function _templateObject127() {
    return data;
  };

  return data;
}

function _templateObject126() {
  var data = _taggedTemplateLiteral(["4-d camera"]);

  _templateObject126 = function _templateObject126() {
    return data;
  };

  return data;
}

function _templateObject125() {
  var data = _taggedTemplateLiteral(["unfinished ice sculpture"]);

  _templateObject125 = function _templateObject125() {
    return data;
  };

  return data;
}

function _templateObject124() {
  var data = _taggedTemplateLiteral(["Pocket Professor Memory Chip"]);

  _templateObject124 = function _templateObject124() {
    return data;
  };

  return data;
}

function _templateObject123() {
  var data = _taggedTemplateLiteral(["familiar"]);

  _templateObject123 = function _templateObject123() {
    return data;
  };

  return data;
}

function _templateObject122() {
  var data = _taggedTemplateLiteral(["Pocket Professor"]);

  _templateObject122 = function _templateObject122() {
    return data;
  };

  return data;
}

function _templateObject121() {
  var data = _taggedTemplateLiteral(["nanorhino"]);

  _templateObject121 = function _templateObject121() {
    return data;
  };

  return data;
}

function _templateObject120() {
  var data = _taggedTemplateLiteral(["nanorhino"]);

  _templateObject120 = function _templateObject120() {
    return data;
  };

  return data;
}

function _templateObject119() {
  var data = _taggedTemplateLiteral(["mafia middle finger ring"]);

  _templateObject119 = function _templateObject119() {
    return data;
  };

  return data;
}

function _templateObject118() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject118 = function _templateObject118() {
    return data;
  };

  return data;
}

function _templateObject117() {
  var data = _taggedTemplateLiteral(["mafia middle finger ring"]);

  _templateObject117 = function _templateObject117() {
    return data;
  };

  return data;
}

function _templateObject116() {
  var data = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]);

  _templateObject116 = function _templateObject116() {
    return data;
  };

  return data;
}

function _templateObject115() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject115 = function _templateObject115() {
    return data;
  };

  return data;
}

function _templateObject114() {
  var data = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]);

  _templateObject114 = function _templateObject114() {
    return data;
  };

  return data;
}

function _templateObject113() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject113 = function _templateObject113() {
    return data;
  };

  return data;
}

function _templateObject112() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject112 = function _templateObject112() {
    return data;
  };

  return data;
}

function _templateObject111() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject111 = function _templateObject111() {
    return data;
  };

  return data;
}

function _templateObject110() {
  var data = _taggedTemplateLiteral(["stinky cheese eye"]);

  _templateObject110 = function _templateObject110() {
    return data;
  };

  return data;
}

function _templateObject109() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject109 = function _templateObject109() {
    return data;
  };

  return data;
}

function _templateObject108() {
  var data = _taggedTemplateLiteral(["stinky cheese eye"]);

  _templateObject108 = function _templateObject108() {
    return data;
  };

  return data;
}

function _templateObject107() {
  var data = _taggedTemplateLiteral(["V for Vivala Mask"]);

  _templateObject107 = function _templateObject107() {
    return data;
  };

  return data;
}

function _templateObject106() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject106 = function _templateObject106() {
    return data;
  };

  return data;
}

function _templateObject105() {
  var data = _taggedTemplateLiteral(["V for Vivala Mask"]);

  _templateObject105 = function _templateObject105() {
    return data;
  };

  return data;
}

function _templateObject104() {
  var data = _taggedTemplateLiteral(["peppermint parasol"]);

  _templateObject104 = function _templateObject104() {
    return data;
  };

  return data;
}

function _templateObject103() {
  var data = _taggedTemplateLiteral(["navel ring of navel gazing"]);

  _templateObject103 = function _templateObject103() {
    return data;
  };

  return data;
}

function _templateObject102() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject102 = function _templateObject102() {
    return data;
  };

  return data;
}

function _templateObject101() {
  var data = _taggedTemplateLiteral(["navel ring of navel gazing"]);

  _templateObject101 = function _templateObject101() {
    return data;
  };

  return data;
}

function _templateObject100() {
  var data = _taggedTemplateLiteral(["greatest american pants"]);

  _templateObject100 = function _templateObject100() {
    return data;
  };

  return data;
}

function _templateObject99() {
  var data = _taggedTemplateLiteral(["pants"]);

  _templateObject99 = function _templateObject99() {
    return data;
  };

  return data;
}

function _templateObject98() {
  var data = _taggedTemplateLiteral(["Super Vision"]);

  _templateObject98 = function _templateObject98() {
    return data;
  };

  return data;
}

function _templateObject97() {
  var data = _taggedTemplateLiteral(["greatest american pants"]);

  _templateObject97 = function _templateObject97() {
    return data;
  };

  return data;
}

function _templateObject96() {
  var data = _taggedTemplateLiteral(["Unleash the Nanites"]);

  _templateObject96 = function _templateObject96() {
    return data;
  };

  return data;
}

function _templateObject95() {
  var data = _taggedTemplateLiteral(["shell up"]);

  _templateObject95 = function _templateObject95() {
    return data;
  };

  return data;
}

function _templateObject94() {
  var data = _taggedTemplateLiteral(["Nanobrawny"]);

  _templateObject94 = function _templateObject94() {
    return data;
  };

  return data;
}

function _templateObject93() {
  var data = _taggedTemplateLiteral(["nanorhino"]);

  _templateObject93 = function _templateObject93() {
    return data;
  };

  return data;
}

function _templateObject92() {
  var data = _taggedTemplateLiteral(["Show them your ring"]);

  _templateObject92 = function _templateObject92() {
    return data;
  };

  return data;
}

function _templateObject91() {
  var data = _taggedTemplateLiteral(["mafia middle finger ring"]);

  _templateObject91 = function _templateObject91() {
    return data;
  };

  return data;
}

function _templateObject90() {
  var data = _taggedTemplateLiteral(["KGB tranquilizer dart"]);

  _templateObject90 = function _templateObject90() {
    return data;
  };

  return data;
}

function _templateObject89() {
  var data = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]);

  _templateObject89 = function _templateObject89() {
    return data;
  };

  return data;
}

function _templateObject88() {
  var data = _taggedTemplateLiteral(["Reflex Hammer"]);

  _templateObject88 = function _templateObject88() {
    return data;
  };

  return data;
}

function _templateObject87() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject87 = function _templateObject87() {
    return data;
  };

  return data;
}

function _templateObject86() {
  var data = _taggedTemplateLiteral(["Give Your Opponent the Stinkeye"]);

  _templateObject86 = function _templateObject86() {
    return data;
  };

  return data;
}

function _templateObject85() {
  var data = _taggedTemplateLiteral(["stinky cheese eye"]);

  _templateObject85 = function _templateObject85() {
    return data;
  };

  return data;
}

function _templateObject84() {
  var data = _taggedTemplateLiteral(["Creepy Grin"]);

  _templateObject84 = function _templateObject84() {
    return data;
  };

  return data;
}

function _templateObject83() {
  var data = _taggedTemplateLiteral(["V for Vivala Mask"]);

  _templateObject83 = function _templateObject83() {
    return data;
  };

  return data;
}

function _templateObject82() {
  var data = _taggedTemplateLiteral(["Feel Hatred"]);

  _templateObject82 = function _templateObject82() {
    return data;
  };

  return data;
}

function _templateObject81() {
  var data = _taggedTemplateLiteral(["Feel Hatred"]);

  _templateObject81 = function _templateObject81() {
    return data;
  };

  return data;
}

function _templateObject80() {
  var data = _taggedTemplateLiteral(["snokebomb"]);

  _templateObject80 = function _templateObject80() {
    return data;
  };

  return data;
}

function _templateObject79() {
  var data = _taggedTemplateLiteral(["snokebomb"]);

  _templateObject79 = function _templateObject79() {
    return data;
  };

  return data;
}

function _templateObject78() {
  var data = _taggedTemplateLiteral(["peppermint parasol"]);

  _templateObject78 = function _templateObject78() {
    return data;
  };

  return data;
}

function _templateObject77() {
  var data = _taggedTemplateLiteral(["peppermint parasol"]);

  _templateObject77 = function _templateObject77() {
    return data;
  };

  return data;
}

function _templateObject76() {
  var data = _taggedTemplateLiteral(["greatest american pants"]);

  _templateObject76 = function _templateObject76() {
    return data;
  };

  return data;
}

function _templateObject75() {
  var data = _taggedTemplateLiteral(["navel ring of navel gazing"]);

  _templateObject75 = function _templateObject75() {
    return data;
  };

  return data;
}

function _templateObject74() {
  var data = _taggedTemplateLiteral(["nanorhino"]);

  _templateObject74 = function _templateObject74() {
    return data;
  };

  return data;
}

function _templateObject73() {
  var data = _taggedTemplateLiteral(["mafia middle finger ring"]);

  _templateObject73 = function _templateObject73() {
    return data;
  };

  return data;
}

function _templateObject72() {
  var data = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]);

  _templateObject72 = function _templateObject72() {
    return data;
  };

  return data;
}

function _templateObject71() {
  var data = _taggedTemplateLiteral(["Feel Hatred"]);

  _templateObject71 = function _templateObject71() {
    return data;
  };

  return data;
}

function _templateObject70() {
  var data = _taggedTemplateLiteral(["snokebomb"]);

  _templateObject70 = function _templateObject70() {
    return data;
  };

  return data;
}

function _templateObject69() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject69 = function _templateObject69() {
    return data;
  };

  return data;
}

function _templateObject68() {
  var data = _taggedTemplateLiteral(["stinky cheese eye"]);

  _templateObject68 = function _templateObject68() {
    return data;
  };

  return data;
}

function _templateObject67() {
  var data = _taggedTemplateLiteral(["V for Vivala Mask"]);

  _templateObject67 = function _templateObject67() {
    return data;
  };

  return data;
}

function _templateObject66() {
  var data = _taggedTemplateLiteral(["replica bat-oomerang"]);

  _templateObject66 = function _templateObject66() {
    return data;
  };

  return data;
}

function _templateObject65() {
  var data = _taggedTemplateLiteral(["shattering punch"]);

  _templateObject65 = function _templateObject65() {
    return data;
  };

  return data;
}

function _templateObject64() {
  var data = _taggedTemplateLiteral(["gingerbread mob hit"]);

  _templateObject64 = function _templateObject64() {
    return data;
  };

  return data;
}

function _templateObject63() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject63 = function _templateObject63() {
    return data;
  };

  return data;
}

function _templateObject62() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject62 = function _templateObject62() {
    return data;
  };

  return data;
}

function _templateObject61() {
  var data = _taggedTemplateLiteral(["miniature crystal ball "]);

  _templateObject61 = function _templateObject61() {
    return data;
  };

  return data;
}

function _templateObject60() {
  var data = _taggedTemplateLiteral(["familiar"]);

  _templateObject60 = function _templateObject60() {
    return data;
  };

  return data;
}

function _templateObject59() {
  var data = _taggedTemplateLiteral(["unspeakachu"]);

  _templateObject59 = function _templateObject59() {
    return data;
  };

  return data;
}

function _templateObject58() {
  var data = _taggedTemplateLiteral(["miniature crystal ball "]);

  _templateObject58 = function _templateObject58() {
    return data;
  };

  return data;
}

function _templateObject57() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject57 = function _templateObject57() {
    return data;
  };

  return data;
}

function _templateObject56() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject56 = function _templateObject56() {
    return data;
  };

  return data;
}

function _templateObject55() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject55 = function _templateObject55() {
    return data;
  };

  return data;
}

function _templateObject54() {
  var data = _taggedTemplateLiteral(["miniature crystal ball"]);

  _templateObject54 = function _templateObject54() {
    return data;
  };

  return data;
}

function _templateObject53() {
  var data = _taggedTemplateLiteral(["miniature crystal ball"]);

  _templateObject53 = function _templateObject53() {
    return data;
  };

  return data;
}

function _templateObject52() {
  var data = _taggedTemplateLiteral(["miniature crystal ball "]);

  _templateObject52 = function _templateObject52() {
    return data;
  };

  return data;
}

function _templateObject51() {
  var data = _taggedTemplateLiteral(["Rain-Doh box full of monster"]);

  _templateObject51 = function _templateObject51() {
    return data;
  };

  return data;
}

function _templateObject50() {
  var data = _taggedTemplateLiteral(["Rain-Doh box full of monster"]);

  _templateObject50 = function _templateObject50() {
    return data;
  };

  return data;
}

function _templateObject49() {
  var data = _taggedTemplateLiteral(["spooky putty monster"]);

  _templateObject49 = function _templateObject49() {
    return data;
  };

  return data;
}

function _templateObject48() {
  var data = _taggedTemplateLiteral(["spooky putty monster"]);

  _templateObject48 = function _templateObject48() {
    return data;
  };

  return data;
}

function _templateObject47() {
  var data = _taggedTemplateLiteral(["Rain-Doh box full of monster"]);

  _templateObject47 = function _templateObject47() {
    return data;
  };

  return data;
}

function _templateObject46() {
  var data = _taggedTemplateLiteral(["spooky putty monster"]);

  _templateObject46 = function _templateObject46() {
    return data;
  };

  return data;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _templateObject45() {
  var data = _taggedTemplateLiteral(["drum machine"]);

  _templateObject45 = function _templateObject45() {
    return data;
  };

  return data;
}

function _templateObject44() {
  var data = _taggedTemplateLiteral(["comma chameleon"]);

  _templateObject44 = function _templateObject44() {
    return data;
  };

  return data;
}

function _templateObject43() {
  var data = _taggedTemplateLiteral(["Warbear Drone"]);

  _templateObject43 = function _templateObject43() {
    return data;
  };

  return data;
}

function _templateObject42() {
  var data = _taggedTemplateLiteral(["Golden Monkey"]);

  _templateObject42 = function _templateObject42() {
    return data;
  };

  return data;
}

function _templateObject41() {
  var data = _taggedTemplateLiteral(["ittah bittah hookah"]);

  _templateObject41 = function _templateObject41() {
    return data;
  };

  return data;
}

function _templateObject40() {
  var data = _taggedTemplateLiteral(["familiar"]);

  _templateObject40 = function _templateObject40() {
    return data;
  };

  return data;
}

function _templateObject39() {
  var data = _taggedTemplateLiteral(["Unspeakachu"]);

  _templateObject39 = function _templateObject39() {
    return data;
  };

  return data;
}

function _templateObject38() {
  var data = _taggedTemplateLiteral(["lucky gold ring"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36() {
  var data = _taggedTemplateLiteral(["Mr. Screege's Spectacles"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["Mr. Cheeng's Spectacles"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["Thor's pliers"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["pantogram pants"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["pants"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["Stephen's Lab Coat"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["Buddy Bjorn"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["back"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["Warbear Drone"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["Golden Monkey"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["ittah bittah hookah"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["familiar"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["Unspeakachu"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["lucky gold ring"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["Mr. Screege's Spectacles"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["acc2"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["Mr. Cheeng's Spectacles"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["acc1"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["Thor's pliers"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["pantogram pants"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["pants"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Stephen's Lab Coat"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["shirt"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Buddy Bjorn"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["back"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Crown of Thrones"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["hat"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Rain Man"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["drum machine"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["lightning strike"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





 //const FREE_FIGHT_COST = 40000; // TODO: don't hardcode this

var FREE_FIGHT_COST = (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("freeFightValue");
var FREE_FIGHT_COPY_TARGET = (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("freeCopyFight");
var MINIMUM_BUFF_TURNS = 16;
var MAXIMIZER_STRING = "item +equip thor's pliers +equip kol con snowglobe +equip lucky gold ring +equip cheeng +equip screege +equip ittah bittah hookah -back -hat";

function maybeBjorn(f) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBjornedFamiliar)() != f) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.bjornifyFamiliar)(f);
  }
}

function maybeEnthrone(f) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEnthronedFamiliar)() != f) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.enthroneFamiliar)(f);
  }
}

var cachedMaximizer = new Map();

function cachedMaximize(maximizeString) {
  if (!cachedMaximizer.has(maximizeString)) {
    var results = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)(maximizeString, 0, 0, true, true); // equipment directives

    var equipmentActions = Slot.all().map(function (s) {
      return "equip ".concat(s);
    }).concat(Slot.all().map(function (s) {
      return "keep ".concat(s);
    }));
    var equipmentResults = results.filter(function (result) {
      equipmentActions.some(function (a) {
        return result.command.startsWith(a);
      });
    });

    var _outfit = new Map();

    var regex = new RegExp('(?:equip|keep) (\w+) .*');
    equipmentResults.forEach(function (equipmentResult) {
      var match = equipmentResult.command.match(regex);

      if (match && match.length > 1) {
        var slot = Slot.get(match[1]);

        _outfit.set(slot, equipmentResult.item);
      }
    });
    cachedMaximizer.set(maximizeString, _outfit);
  }

  var outfit = cachedMaximizer.get(maximizeString);

  if (outfit) {
    var _iterator = _createForOfIteratorHelper(outfit === null || outfit === void 0 ? void 0 : outfit.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            slot = _step$value[0],
            item = _step$value[1];

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, item);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    throw new Error("Error in fetching cached maximize string ".concat(maximizeString));
  }
}

function heavyRainFreeFights() {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20) {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject())), function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject2()));
    });
  }

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('choiceAdventure970', "1&whichmonster=".concat(FREE_FIGHT_COPY_TARGET.id));
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject3()));
    });
  }
}

var steps = [];
var finalSteps = [];

function step(name, condition, setup, before) {
  return function (step_fun) {
    var wrappedStep = function wrappedStep(skiplist, list) {
      if (list) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(name));
      } else if (skiplist.indexOf(name) === -1) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("executing ".concat(name));
        if (before) before();

        if (condition()) {
          //maximize(MAXIMIZER_STRING, false);
          //cachedMaximize(MAXIMIZER_STRING);
          // TODO: refactor this to be better. The maximizer is giving me trouble these days, so just hardcode the equipment
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject4()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject5()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject6()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject7()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject8()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject9()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject10()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject11()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject12()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject13()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject14()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject15()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject16()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject17()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject18()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject19()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject20()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject21()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject22()));
          pickDrumMachineFamiliar();
          maybeBjorn((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject23()));
          maybeEnthrone((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject24()));
          if (setup) setup();

          while (condition()) {
            step_fun();
          } //maximize(MAXIMIZER_STRING, false);
          //cachedMaximize(MAXIMIZER_STRING);          equip($slot`hat`, $item`Crown of Thrones`);


          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject25()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject26()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject27()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject28()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject29()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject30()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject31()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject32()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject33()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject34()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject35()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject36()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject37()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject38()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject39()));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject40()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject41()));
          pickDrumMachineFamiliar();
          maybeBjorn((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject42()));
          maybeEnthrone((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject43()));
          heavyRainFreeFights();
        }
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("skipping ".concat(name));
      }
    };

    if (name.startsWith("final")) {
      finalSteps.push(wrappedStep);
    } else {
      steps.push(wrappedStep);
    }
  };
}

function maybeMacro(property, target) {
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)(property)) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, target);
  return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)(property) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(target) > 0, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item(target));
}

function pickDrumMachineFamiliar() {
  var myEffects = (0,_lib__WEBPACK_IMPORTED_MODULE_3__.myEffectsClean)();
  var relevantBuffs = myEffects.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        effect = _ref2[0],
        turns = _ref2[1];

    return ["Item Drop", "Meat Drop", "Monster Level"].some(function (modifier) {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(effect, modifier) > 0;
    });
  });

  var _relevantBuffs$reduce = relevantBuffs.reduce(function (_ref3, _ref4) {
    var _ref5 = _slicedToArray(_ref3, 2),
        aggEffect = _ref5[0],
        aggTurns = _ref5[1];

    var _ref6 = _slicedToArray(_ref4, 2),
        curEffect = _ref6[0],
        curTurns = _ref6[1];

    return aggTurns > curTurns ? [curEffect, curTurns] : [aggEffect, aggTurns];
  }),
      _relevantBuffs$reduce2 = _slicedToArray(_relevantBuffs$reduce, 2),
      minEffect = _relevantBuffs$reduce2[0],
      minTurns = _relevantBuffs$reduce2[1];

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Minimum effect ".concat(minEffect, " has ").concat(minTurns, " turns"));

  if (minTurns >= MINIMUM_BUFF_TURNS) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject44()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inv");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("charpane.php");

    if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("commaFamiliar") !== "Feather Boa Constrictor") {
      // borrowed from phyllis
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("inv_equip.php?pwd&action=equip&whichitem=962");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("charpane.php");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inv");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("charpane.php");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inv");
    }
  }
}

function drumMachineWithMacro(macro) {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().step(macro).abort(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject45()));
  });
}

var SpookyPutty = /*#__PURE__*/function () {
  function SpookyPutty() {
    _classCallCheck(this, SpookyPutty);
  }

  _createClass(SpookyPutty, null, [{
    key: "hasCopies",
    value: function hasCopies() {
      // TODO: add support for all the spooky items here
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('spookyPuttyCopiesMade') + (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_raindohCopiesMade')));
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('spookyPuttyCopiesMade') + (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_raindohCopiesMade') < 6;
    }
  }, {
    key: "copyMacro",
    value: function copyMacro() {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('spookyPuttyCopiesMade') < 5) {
        return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item('spooky putty sheet');
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_raindohCopiesMade') == 0) {
        return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item('Rain-doh black box');
      } else {
        return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.abort();
      }
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro());
    }
  }, {
    key: "hasFight",
    value: function hasFight() {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject46())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject47())) > 0;
    }
  }, {
    key: "fight",
    value: function fight() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject48())) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject49()));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject50())) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject51()));
      } else {
        throw "No monster to fight";
      }
    }
  }]);

  return SpookyPutty;
}();

var DrunkPygmy = /*#__PURE__*/function () {
  function DrunkPygmy() {
    _classCallCheck(this, DrunkPygmy);
  }

  _createClass(DrunkPygmy, null, [{
    key: "freeBanishes",
    value: function freeBanishes() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('questL11Worship') !== 'unstarted' && ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_drunkPygmyBanishes') < 10 || (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_drunkPygmyBanishes') == 10 && (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject52())));
    }
  }, {
    key: "shouldSaber",
    value: function shouldSaber() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('questL11Worship') !== 'unstarted' && ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_drunkPygmyBanishes') == 10 && !(0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject53())) || (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_drunkPygmyBanishes') == 11 && (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject54())) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("crystalBallMonster") == "drunk pygmy");
    }
  }, {
    key: "setupFreeFight",
    value: function setupFreeFight(fights) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject55())), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject56()));
      fights || (fights = 1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(fights, (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject57()));

      if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_drunkPygmyBanishes') == 10 && (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject58()))) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject59()));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject60()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject61()));
      }
    }
  }, {
    key: "didSaber",
    value: function didSaber() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('questL11Worship') !== 'unstarted' && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('_saberForceMonster') === "drunk pygmy" && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_saberForceMonsterCount') > 0;
    }
  }]);

  return DrunkPygmy;
}();

var SaberUpgrade;

(function (SaberUpgrade) {
  SaberUpgrade[SaberUpgrade["Unupgraded"] = 0] = "Unupgraded";
  SaberUpgrade[SaberUpgrade["Regen"] = 1] = "Regen";
  SaberUpgrade[SaberUpgrade["MonsterLevel"] = 2] = "MonsterLevel";
  SaberUpgrade[SaberUpgrade["Resistance"] = 3] = "Resistance";
  SaberUpgrade[SaberUpgrade["FamiliarWeight"] = 4] = "FamiliarWeight";
})(SaberUpgrade || (SaberUpgrade = {}));

var CosplaySaber = /*#__PURE__*/function () {
  function CosplaySaber() {
    _classCallCheck(this, CosplaySaber);
  }

  _createClass(CosplaySaber, null, [{
    key: "upgradedToday",
    value: function upgradedToday() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_saberMod") != 0;
    }
  }, {
    key: "getUpgrade",
    value: function getUpgrade() {
      switch ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_saberMod")) {
        case 0:
          return SaberUpgrade.Unupgraded;

        case 1:
          return SaberUpgrade.Regen;

        case 2:
          return SaberUpgrade.MonsterLevel;

        case 3:
          return SaberUpgrade.Resistance;

        case 4:
          return SaberUpgrade.FamiliarWeight;
      }

      throw "Invalid Saber Mode ".concat((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_saberMod"));
    }
  }, {
    key: "canGive",
    value: function canGive(mode) {
      var currentUpgrade = CosplaySaber.getUpgrade();
      return (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject62())) && (currentUpgrade === SaberUpgrade.Unupgraded || currentUpgrade == mode);
    }
  }, {
    key: "upgrade",
    value: function upgrade(mode) {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject63())) && CosplaySaber.getUpgrade() == SaberUpgrade.Unupgraded) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1386, mode);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("main.php?action=may4");
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1386, 0);
      }
    }
  }]);

  return CosplaySaber;
}();

var FreeKill = /*#__PURE__*/function () {
  function FreeKill() {
    _classCallCheck(this, FreeKill);
  }

  _createClass(FreeKill, null, [{
    key: "hasFreeKills",
    value: function hasFreeKills() {
      return !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_gingerbreadMobHitUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_shatteringPunchUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_usedReplicaBatoomerang') < 3;
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_gingerbreadMobHitUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject64()))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_shatteringPunchUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject65()))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_usedReplicaBatoomerang') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject66())));
    }
  }]);

  return FreeKill;
}();

var withEquip = function withEquip(slot, item, action) {
  var originalItem = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)(slot);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, item);
  action();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, originalItem);
};

var FreeRun = /*#__PURE__*/function () {
  function FreeRun() {
    _classCallCheck(this, FreeRun);
  }

  _createClass(FreeRun, null, [{
    key: "hasFreeRuns",
    value: function hasFreeRuns() {
      // total: 19 free runs
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_navelRunaways') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject67())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_vmaskBanisherUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject68())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_stinkyCheeseBanisherUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject69())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_reflexHammerUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject70())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_snokebombUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject71())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_feelHatred') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject72())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_kgbTranquilizerDartUses') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject73())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mafiaMiddleFingerRingUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject74())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_nanorhinoCharge") == 100;
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject75())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject76())) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_navelRunaways') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.step("runaway")).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject77())) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_navelRunaways') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject78()))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject79())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_snokebombUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject80()))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject81())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_feelHatredUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject82()))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject83())) > 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_vmaskBanisherUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject84()))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject85())) > 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_stinkyCheeseBanisherUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject86()))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject87())) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_reflexHammerUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject88()))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject89())) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_kgbTranquilizerDartUses') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject90()))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject91())) > 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mafiaMiddleFingerRingUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject92()))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() == (0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject93()) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_nanorhinoCharge") == 100, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$effect)(_templateObject94())), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject95()))).skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject96()))).abort();
    }
  }, {
    key: "wrapFreeRun",
    value: function wrapFreeRun(action) {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_navelRunaways') < 3) {
        if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject97())) && !(0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$effect)(_templateObject98()))) {
          withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject99()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject100()), action);
        } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject101()))) {
          withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject102()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject103()), action);
        } else {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject104()));
          action();
        }
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject105())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_vmaskBanisherUsed')) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject106()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject107()), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject108())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_stinkyCheeseBanisherUsed')) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject109()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject110()), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject111())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_reflexHammerUsed') < 3) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject112()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject113()), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject114())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_kgbTranquilizerDartUses') < 3) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject115()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject116()), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject117())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mafiaMiddleFingerRingUsed')) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject118()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject119()), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject120())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_nanorhinoCharge") == 100) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject121()));
      }
    }
  }]);

  return FreeRun;
}();

var GingerbreadCity = /*#__PURE__*/function () {
  function GingerbreadCity() {
    _classCallCheck(this, GingerbreadCity);
  }

  _createClass(GingerbreadCity, null, [{
    key: "totalTurns",
    value: function totalTurns() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('gingerExtraAdventures') ? 30 : 20;
    }
  }, {
    key: "turnsToday",
    value: function turnsToday() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_gingerbreadCityTurns');
    }
  }, {
    key: "turnsLeft",
    value: function turnsLeft() {
      return GingerbreadCity.totalTurns() - (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_gingerbreadCityTurns');
    }
  }, {
    key: "hasTurns",
    value: function hasTurns() {
      return GingerbreadCity.turnsLeft() > 0;
    }
  }, {
    key: "isNoon",
    value: function isNoon() {
      return GingerbreadCity.turnsToday() == 9;
    }
  }, {
    key: "isMidnight",
    value: function isMidnight() {
      return GingerbreadCity.turnsToday() == 19;
    }
  }]);

  return GingerbreadCity;
}();

step("rollover resources", function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20;
})(heavyRainFreeFights);
step("chateau", function () {
  var _ChateauMantegna$pain, _ChateauMantegna$pain2;

  return libram__WEBPACK_IMPORTED_MODULE_7__.have() && !libram__WEBPACK_IMPORTED_MODULE_7__.paintingFought() && ((_ChateauMantegna$pain = libram__WEBPACK_IMPORTED_MODULE_7__.paintingMonster()) === null || _ChateauMantegna$pain === void 0 ? void 0 : (_ChateauMantegna$pain2 = _ChateauMantegna$pain.attributes) === null || _ChateauMantegna$pain2 === void 0 ? void 0 : _ChateauMantegna$pain2.includes('FREE'));
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject122()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject123()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject124()));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().professor().spellKill(), function () {
    return libram__WEBPACK_IMPORTED_MODULE_7__.fightPainting();
  });
});
step("fax", function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_photocopyUsed');
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.faxbot)(FREE_FIGHT_COPY_TARGET, "Cheesefax");
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().step(maybeMacro('_iceSculptureUsed', (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject125()))).step(maybeMacro('_cameraUsed', (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject126()))).step(SpookyPutty.maybeMacro()).spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject127()));
  });
});
step("spooky putty", function () {
  return SpookyPutty.hasFight();
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_feelNostalgicUsed") < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject128())))).externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro()).spellKill(), function () {
    return SpookyPutty.fight();
  });
});
step("camera", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject129()));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject130()));
  });
});
step("sculpture", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject131()));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject132()));
  });
});
step("forest tentacle", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('questL02Larva') !== 'unstarted' && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_eldritchTentacleFought');
})(function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=forestvillage&action=fv_scientist', false);
  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'No choice?';
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(1);
  });
});
step("summon tentacle", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject133())) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_eldritchHorrorEvoked');
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject134()));
  });
});
step("lynrd snares", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_lynyrdSnareUses") < 3;
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject135()));
  });
});
step("bricko", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_brickoFights') < 10;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('acquire 10 BRICKO ooze');
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject136()));
  });
});
step("drunk pygmies", function () {
  return DrunkPygmy.freeBanishes();
})(function () {
  DrunkPygmy.setupFreeFight();
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject137()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername pygmy bowler', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject138()))).if_('monstername pygmy orderlies', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject139()))).abort());
});
step("drunk pygmy initial saber", function () {
  return DrunkPygmy.shouldSaber();
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject140()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject141()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject142())), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject143()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject144())), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject145()));
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1387, 2);
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject146()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill('Use the Force'));
});
step("drunk pygmy saber copies", function () {
  return DrunkPygmy.didSaber();
})(function () {
  DrunkPygmy.setupFreeFight(2);
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject147()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject148()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject149())), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject150()));

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_saberForceUses') < 5) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Sabering pygmies");
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject151()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill('Use the Force'));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Just killing pygmies");
    DrunkPygmy.setupFreeFight(1);
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject152()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
  }
});
step("drunk pygmy time-spinner", function () {
  return 10 - (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_timeSpinnerMinutesUsed') > 3;
}, function () {
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1195, 1);
  (0,libram__WEBPACK_IMPORTED_MODULE_4__.set)('choiceAdventure1196', "1&monid=".concat((0,libram__WEBPACK_IMPORTED_MODULE_5__.$monster)(_templateObject153()).id));
})(function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject154()));
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort(), function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject155()));
  });
});
step("glark cables", function () {
  return ['step3', 'finished'].includes((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('questL11Ron')) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_glarkCableUses') < 5;
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(5 - (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_glarkCableUses'), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject156()), FREE_FIGHT_COST);
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject157()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().item((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject158())));
});
step("Kramco", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_sausageFights') == 0;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject159()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject160()));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject161()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step("drum machine", function () {
  return FreeKill.hasFreeKills();
}, function () {
  return pickDrumMachineFamiliar();
})(function () {
  drumMachineWithMacro(FreeKill.maybeMacro());
});
step("jokester", function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_firedJokestersGun');
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject162()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject163()));
  pickDrumMachineFamiliar();
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject164())));
});
step("chest x-ray", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_chestXRayUsed') < 3;
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject165()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject166()));
  pickDrumMachineFamiliar();
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject167())));
});
step("powdered madness", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_powderedMadnessUses') < 5 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject168())) < FREE_FIGHT_COST;
}, function () {
  return pickDrumMachineFamiliar();
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(5 - (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_powderedMadnessUses'), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject169()), FREE_FIGHT_COST);
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject170())));
});
step("asdon martin", function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_missileLauncherUsed") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined;
}, function () {
  (0,_asdon__WEBPACK_IMPORTED_MODULE_1__.fillAsdonMartinTo)(100);
  pickDrumMachineFamiliar();
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject171())));
});
step("never-ending party", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_neverendingPartyFreeTurns') < 10;
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoices)(new Map([[1322, 2], [1324, 5]]));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject172()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step("snojo", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_snojoFreeFights') < 10;
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject173()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step("mushroom garden", function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['packet of mushroom spores'] !== undefined && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mushroomGardenFights') === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_sourceTerminalPortscanUses') == 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)('portscan.edu', 0, 0) === 'portscan.edu';
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate portscan');
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject174()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername government agent', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill('Macrometeorite')).if_('!monstername piranha plant', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.abort()).trySkill('Portscan').spellKill());
});
step("LOV", function () {
  return !libram__WEBPACK_IMPORTED_MODULE_8__.isUsed();
})(function () {
  var effect = (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$effect)(_templateObject175())) ? 'Open Heart Surgery' : 'Wandering Eye Surgery';
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return libram__WEBPACK_IMPORTED_MODULE_8__.fightAll('LOV Epaulettes', effect, 'LOV Extraterrestrial Chocolate');
  });
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'Did not get all the way through LOV.';
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('choice.php');
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'Did not get all the way through LOV.';
});
step("power pill", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_powerPillUses') < 20 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject176())) > 0;
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject177()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject178()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject179()));
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(Math.max(0, 20 - (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_powerPillUses') - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject180()))), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject181()), FREE_FIGHT_COST);
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject182())));
});
step("gingerbread city", function () {
  return GingerbreadCity.hasTurns() && (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject183()));
}, function () {}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(GingerbreadCity.turnsLeft(), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject184()), FREE_FIGHT_COST);
})(function () {
  if (GingerbreadCity.isNoon()) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1204, 1); // for now, find out choice number later

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject185()), 1, '');
  } else if (GingerbreadCity.isMidnight()) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1203, 4); // for now, find out choice number later

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject186()), 1, '');
  } else {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject187()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().item((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject188())).abort());
  }
});
step("deep machine tunnels", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_machineTunnelsAdv') < 5;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject189()));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject190()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step("witchess", function () {
  return libram__WEBPACK_IMPORTED_MODULE_9__.fightsDone() < 5;
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return libram__WEBPACK_IMPORTED_MODULE_9__.fightPiece((0,libram__WEBPACK_IMPORTED_MODULE_5__.$monster)(_templateObject191()));
  });
});
step("goth kid fishing", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject192())) && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mayflySummons') < 30 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_hipsterAdv') < 7;
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject193()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject194()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject195()));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject196()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_("monstername fruit golem", _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject197())).abort()).if_("monstername knob goblin mutant", _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject198())).abort()).if_("monstername basic elemental", _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject199())).abort()).spellKill());
});
step("final end of day resources", function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20;
})(heavyRainFreeFights);
step("final goth kid fishing", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_hipsterAdv') < 7 && FreeRun.hasFreeRuns();
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject200()));
})(function () {
  FreeRun.wrapFreeRun(function () {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject201()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_("monstername black crayon*", _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.spellKill()).step(FreeRun.maybeMacro()).abort());
  });
});
step("final kramco free run fishing", function () {
  return FreeRun.hasFreeRuns();
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject202()));
})(function () {
  FreeRun.wrapFreeRun(function () {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject203()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().kramco().step(FreeRun.maybeMacro()).abort());
  });
});

function maxFamiliarRuns() {
  return Math.floor(((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject204())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)()) / 5);
}

step("final kramco familiar fishing", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_banderRunaways") < maxFamiliarRuns() || CosplaySaber.canGive(SaberUpgrade.FamiliarWeight) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject205())) === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_banderRunaways") == maxFamiliarRuns();
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$familiar)(_templateObject206()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject207()));
})(function () {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mayflySummons') < 30) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject208()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject209()));
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_banderRunaways") == maxFamiliarRuns() && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject210())) == 0 && CosplaySaber.canGive(SaberUpgrade.FamiliarWeight)) {
    CosplaySaber.upgrade(SaberUpgrade.FamiliarWeight);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$slot)(_templateObject211()), (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject212()));
  }

  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$location)(_templateObject213()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().kramco(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("bootsCharged"), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject214())))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_mayflySummons') < 30, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.if_("monstername basic elemental", _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject215())).abort())).step("runaway"));
});
step("final asdon martin", function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_missileLauncherUsed") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined || !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_workshedItemUsed") && (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_");
}, function () {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] === undefined) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject216()));
  }

  (0,_asdon__WEBPACK_IMPORTED_MODULE_1__.fillAsdonMartinTo)(100);
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_5__.$skill)(_templateObject217())));
});
step("thanksgetting", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_thanksgettingFoodsEaten") < 9 && (0,libram__WEBPACK_IMPORTED_MODULE_6__.getRemainingStomach)() > 1;
}, function () {
  if (_lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.tryPlace()) {
    _lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.set((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject218()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_thanksgettingFoodsEaten") - 9, (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject219()));
  }
})(function () {
  var thanksgettingStr = (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_thanksgettingFoodsEatenList");
  var thanksgetting = [];

  if (thanksgettingStr) {
    thanksgetting = thanksgettingStr.split(";").map(function (i) {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(i);
    });
  }

  var nextFood = (0,libram__WEBPACK_IMPORTED_MODULE_5__.$items)(_templateObject220()).find(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.effectModifier)(i, "effect") == (0,libram__WEBPACK_IMPORTED_MODULE_5__.$effect)(_templateObject221()) && thanksgetting.indexOf(i) == -1;
  });

  if (nextFood) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(nextFood);
  } else {
    throw "Unable to find a new thanksgetting food!";
  }

  thanksgetting.push(nextFood);
  (0,libram__WEBPACK_IMPORTED_MODULE_4__.set)("_thanksgettingFoodsEatenList", thanksgetting.join(";"));
});
step("smooch soda", function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject222())) < 1000 && (0,libram__WEBPACK_IMPORTED_MODULE_6__.getRemainingStomach)() > 0 || _lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.present() && (0,libram__WEBPACK_IMPORTED_MODULE_6__.getRemainingLiver)() > 0;
})(function () {
  if (_lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.present() && (0,libram__WEBPACK_IMPORTED_MODULE_6__.getRemainingLiver)() > 0) {
    _lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.set((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject223()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject224()));
  } else if (_lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.present()) {
    _lib__WEBPACK_IMPORTED_MODULE_3__.MayoClinic.set((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject225()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject226()));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject227()));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject228()));
});
var pyec = (0,libram__WEBPACK_IMPORTED_MODULE_5__.$item)(_templateObject229());
step("pyec", function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('expressCardUsed');
})(function () {
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.withStash)([pyec], function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(pyec);
  });
});
function main() {
  var argString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var skiplist = argString.split(";").map(function (s) {
    return s.trim();
  });
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$effect)(_templateObject230()))) throw 'Get Squint first!';
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_6__.have)((0,libram__WEBPACK_IMPORTED_MODULE_5__.$effect)(_templateObject231()))) throw 'Get Eldritch Attunement first!';
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('mood apathetic');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('ccs bkfights');

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('sourceTerminalEducate1') !== 'digitize.edu' || (0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('sourceTerminalEducate2') !== 'extract.edu') {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate digitize; terminal educate extract');
  }

  (0,libram__WEBPACK_IMPORTED_MODULE_4__.set)('hpAutoRecovery', 0.8);
  (0,libram__WEBPACK_IMPORTED_MODULE_4__.set)('hpAutoRecoveryTarget', 0.95);

  if (skiplist.length > 0 && skiplist[0] == "list") {
    finalSteps.forEach(function (step_cb) {
      return step_cb(skiplist, true);
    });
    steps.forEach(function (step_cb) {
      return step_cb(skiplist, true);
    });
  } else if (skiplist.includes("final")) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("running final steps...");
    finalSteps.forEach(function (step_cb) {
      return step_cb(skiplist, false);
    });
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("running steps...");
    steps.forEach(function (step_cb) {
      return step_cb(skiplist, false);
    });
  }
}

/***/ }),

/***/ "./src/bkkill.ts":
/*!***********************!*\
  !*** ./src/bkkill.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "status": () => (/* binding */ status),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combat */ "./src/combat.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject46() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject46 = function _templateObject46() {
    return data;
  };

  return data;
}

function _templateObject45() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject45 = function _templateObject45() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject44() {
  var data = _taggedTemplateLiteral(["otoscope"]);

  _templateObject44 = function _templateObject44() {
    return data;
  };

  return data;
}

function _templateObject43() {
  var data = _taggedTemplateLiteral(["Oscus"]);

  _templateObject43 = function _templateObject43() {
    return data;
  };

  return data;
}

function _templateObject42() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject42 = function _templateObject42() {
    return data;
  };

  return data;
}

function _templateObject41() {
  var data = _taggedTemplateLiteral(["Chilled to the Bone"]);

  _templateObject41 = function _templateObject41() {
    return data;
  };

  return data;
}

function _templateObject40() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject40 = function _templateObject40() {
    return data;
  };

  return data;
}

function _templateObject39() {
  var data = _taggedTemplateLiteral(["Dreadsylvanian Castle"]);

  _templateObject39 = function _templateObject39() {
    return data;
  };

  return data;
}

function _templateObject38() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = _taggedTemplateLiteral(["Exposure Esplanade"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36() {
  var data = _taggedTemplateLiteral(["moveable feast"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["moveable feast"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["hat, back, shirt, weapon, offhand, pants, acc1, acc2, acc3"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["box of familiar jacks"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["box of familiar jacks"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["mu"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["luck incense"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["luck incense"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["tunac"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["tunac"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["scratch 'n' sniff unicorn sticker"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["scratch 'n' sniff sword"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["Jumpsuited Hound Dog"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["Steam-powered Cheerleader"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["Steam-powered Cheerleader"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["tin cup of mulligan stew"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Hodgman's blanket"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["Hodgman, The Hoboverlord"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["The Heap"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["extra-greasy slider"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["Chester"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["The Purple Light District"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["voodoo snuff"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Zombo"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Hobopolis Town Square"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["jar of fermented pickle juice"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Oscus"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["frosty's frosty mug"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Frosty"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Exposure Esplanade"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["ol' scratch's salad fork"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Ol' Scratch"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Burnbarrel Blvd."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




 // borrowed from raidlog parser

function parseImageN(hoboPlace) {
  var regex = new RegExp(/[^\d]*(\d+)o?\.gif/);
  var match = hoboPlace.match(regex);

  if (match) {
    return parseInt(match[1]);
  }

  return 0;
}

var hoboLocations = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject()), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject2()),
  bossImage: 10,
  container: 4,
  choiceAdventure: 201,
  bossDrop: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject3()),
  bossDrop2: null
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject4()), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject5()),
  bossImage: 10,
  container: 5,
  choiceAdventure: 202,
  bossDrop: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject6()),
  bossDrop2: null
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject7()), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject8()),
  bossImage: 10,
  container: 6,
  choiceAdventure: 203,
  bossDrop: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject9()),
  bossDrop2: null
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject10()), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject11()),
  bossImage: 10,
  container: 7,
  choiceAdventure: 204,
  bossDrop: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject12()),
  bossDrop2: null
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject13()), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject14()),
  bossImage: 10,
  container: 8,
  choiceAdventure: 205,
  bossDrop: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject15()),
  bossDrop2: null
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject16()), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject17()),
  bossImage: 25,
  container: 2,
  choiceAdventure: 200,
  bossDrop: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject18()),
  bossDrop2: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject19())
}]]);
var HoboStatus;

(function (HoboStatus) {
  HoboStatus[HoboStatus["Unavailable"] = 0] = "Unavailable";
  HoboStatus[HoboStatus["NotReady"] = 1] = "NotReady";
  HoboStatus[HoboStatus["BossReady"] = 2] = "BossReady";
  HoboStatus[HoboStatus["BossKilled"] = 3] = "BossKilled";
})(HoboStatus || (HoboStatus = {}));

function status(location) {
  var hoboLocation = hoboLocations.get(location);

  if (hoboLocation) {
    var imageN = parseImageN((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_hobopolis.php?place=".concat(hoboLocation.container)));

    if (imageN > hoboLocation.bossImage) {
      return HoboStatus.BossKilled;
    } else if (imageN == hoboLocation.bossImage) {
      return HoboStatus.BossReady;
    } else if (imageN > 0) {
      return HoboStatus.NotReady;
    }
  }

  return HoboStatus.Unavailable;
}

function bestItemFamiliar() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject20())) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("_cheerleaderSteam") > 100) {
    return (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject21());
  }

  return (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject22());
}

function setupOutfit() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("bk.weapon") == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject23())) {
    // refresh the sticker weapon
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject24()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("sticker unicorn, unicorn, unicorn");
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("bk.shirt") == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject25()) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject26()))) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.inClan)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("fishClan"), function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("acquire tunac");
    });
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("bk.familiar") == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject27()) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject28()))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject29()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject30()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject31()));
  }
}

function outfit() {
  (0,libram__WEBPACK_IMPORTED_MODULE_3__.$slots)(_templateObject32()).forEach(function (slot) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("bk.".concat(slot)));
  });
}

function kill(location) {
  var hoboLocation = hoboLocations.get(location);

  if (hoboLocation) {
    var itemFamiliar = bestItemFamiliar();
    setupOutfit();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(itemFamiliar);
    outfit();

    if (hoboLocation.boss == (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("otoBoss")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject33()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject34()));
    }

    if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("_feastedFamiliars").includes("".concat(itemFamiliar))) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_2__.withStash)([(0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject35())], function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject36()));
      });
    }

    if (location == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject37())) {
      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject38()))) {
        throw "Unable to get a louder than bomb for getting Chilled to the Bone!";
      } else {
        (0,_lib__WEBPACK_IMPORTED_MODULE_2__.inClan)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("chilledClan"), function () {
          (0,_combat__WEBPACK_IMPORTED_MODULE_1__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject39()), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject40())).abort());
        });
      }

      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject41()))) {
        throw "Did not get Chilled to the Bone, so we can't kill frosty!";
      }
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(hoboLocation.choiceAdventure, 1);
    (0,_combat__WEBPACK_IMPORTED_MODULE_1__.adventureMacro)(location, _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.if_('monstername eldritch tentacle', _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject42()))).if_("monstername ".concat(hoboLocation.boss), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.externalIf(hoboLocation.boss == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject43()), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject44()))).attack().repeat()).abort());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Killed ".concat(hoboLocation.boss));
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(hoboLocation.choiceAdventure, 0);
  }
}

function statusString(location) {
  var hoboStatus = status(location);

  switch (hoboStatus) {
    case HoboStatus.Unavailable:
      return "".concat(location, " unavailable. Are you through the sewers?");

    case HoboStatus.NotReady:
      return "".concat(location, " does not have the boss ready.");

    case HoboStatus.BossReady:
      return "".concat(location, " is ready to kill the boss.");

    case HoboStatus.BossKilled:
      return "".concat(location, " has already had the boss killed.");
  }
}

function main(args) {
  args || (args = "status");

  if (args.trim() == "status") {
    var _iterator = _createForOfIteratorHelper(hoboLocations.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(key, ": ").concat(statusString(key)));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  if (args.trim() == "kill") {
    var ltb = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject45()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(10 - ltb, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject46()));
    var drops = new Map();

    var _iterator2 = _createForOfIteratorHelper(hoboLocations.keys()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _key = _step2.value;
        var lookup = hoboLocations.get(_key);

        if (lookup && status(_key) == HoboStatus.BossReady) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Killing ".concat(_key));
          var bossdrop = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(lookup.bossDrop);
          var bossdrop2 = lookup.bossDrop2 ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(lookup.bossDrop2) : 0;
          kill(_key);
          drops.set(lookup.bossDrop, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(lookup.bossDrop) - bossdrop);

          if (lookup.bossDrop2) {
            drops.set(lookup.bossDrop, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(lookup.bossDrop2) - bossdrop2);
          }
        } else {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Skipping ".concat(_key));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(drops.entries()),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = _slicedToArray(_step3.value, 2),
            drop = _step3$value[0],
            amount = _step3$value[1];

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(drop, ": ").concat(amount));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
}

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
/* harmony export */   "getArg1": () => (/* binding */ getArg1),
/* harmony export */   "getArg2": () => (/* binding */ getArg2),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "withMode": () => (/* binding */ withMode),
/* harmony export */   "withMacro": () => (/* binding */ withMacro),
/* harmony export */   "adventureMode": () => (/* binding */ adventureMode),
/* harmony export */   "adventureRunUnlessFree": () => (/* binding */ adventureRunUnlessFree),
/* harmony export */   "adventureRunOrStasis": () => (/* binding */ adventureRunOrStasis),
/* harmony export */   "adventureMacro": () => (/* binding */ adventureMacro),
/* harmony export */   "adventureMacroAuto": () => (/* binding */ adventureMacroAuto)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject30() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb, divine champagne popper, tattered scrap of paper, GOTO, green smoke bomb"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["Pair of Stomping Boots"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["The Ode to Booze"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["Frumious Bandersnatch"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["Extract Jelly"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["Extract"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["lecture on relativity"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["seal tooth"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["seal tooth"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["Saucegeyser"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["Stuffed Mortar Shell"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["Lunging Thrust-Smack"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Lunging Thrust-Smack"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["Lunging Thrust-Smack"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["Candyblast"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["Fire the Jokester's Gun"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["The Jokester's gun"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Chest X-Ray"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Gingerbread Mob Hit"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Shattering Punch"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Saucegeyser"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Candyblast"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Digitize"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Extract Jelly"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["sleaze hobo"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["stench hobo"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Space Jellyfish"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Extract"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
    key: "collect",
    value: function collect() {
      return this.externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.turboMode)(), Macro.if_('!hpbelow 500', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject())))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject2()), Macro.if_("!hpbelow 500 && (monsterid ".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$monster)(_templateObject3())), " || monsterid ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$monster)(_templateObject4())), ")"), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject5())))).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_sourceTerminalDigitizeMonsterCount') >= 7 && (0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_sourceTerminalDigitizeUses') < 3 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)('Digitize Monster', 0, 0) !== '', Macro.if_("monstername ".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('_sourceTerminalDigitizeMonster')), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject6())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.turboMode)(), Macro.while_("!hpbelow 500 && monsterhpabove ".concat(2 * candyblastDamage(), " && !match \"some of it is even intact\""), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject7()))));
    }
  }, {
    key: "kill",
    value: function kill() {
      return this.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)(), 'attack').if_('monstername sleaze hobo', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject8())).repeat()).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_shatteringPunchUsed') < 3, Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject9())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_gingerbreadMobHitUsed'), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject10())))).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_chestXRayUsed') < 3 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject11())), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject12())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_firedJokestersGun') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject13())), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject14())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_missileLauncherUsed') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)() >= 100, Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject15())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.turboMode)(), Macro.while_('!hpbelow 500 && !match "some of it is even intact"', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject16())))).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject17())).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject18())).if_('monstername spooky hobo', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject19())).repeat()).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject20())).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject21())).attack();
    }
  }, {
    key: "spellKill",
    value: function spellKill() {
      return this.trySkill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucegeyser').repeat();
    }
  }, {
    key: "stasis",
    value: function stasis() {
      var _this$trySkill$item;

      // this method assumes you have enough ml that hte monster will survive for at least 4 rounds
      return (_this$trySkill$item = this.trySkill('Curse of Weaksauce', 'Micrometeorite', 'Love Mosquito').item('time-spinner')).step.apply(_this$trySkill$item, arguments);
    }
  }, {
    key: "safeStasis",
    value: function safeStasis() {
      for (var _len = arguments.length, steps = new Array(_len), _key = 0; _key < _len; _key++) {
        steps[_key] = arguments[_key];
      }

      return this.stasis.apply(this, [Macro.while_("monsterhpabove ".concat(Math.ceil((0,_lib__WEBPACK_IMPORTED_MODULE_1__.effectiveFamiliarWeight)() * 1.1), " and !pastround 10"), Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject22())))].concat(steps));
    }
  }, {
    key: "perpetualStasis",
    value: function perpetualStasis() {
      for (var _len2 = arguments.length, steps = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        steps[_key2] = arguments[_key2];
      }

      return this.stasis.apply(this, [Macro.while_("!pastround 10", Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject23())))].concat(steps));
    }
  }, {
    key: "tentacle",
    value: function tentacle() {
      return this.if_('monstername eldritch tentacle', Macro.perpetualStasis().spellKill()); //return this.if_('monstername eldritch tentacle', Macro.step(...steps).skill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucestorm').repeat());
    }
  }, {
    key: "professor",
    value: function professor() {
      var lecture = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject24());
      return this.if_("hasskill ".concat(lecture), Macro.skill("".concat(lecture)));
    }
  }, {
    key: "kramco",
    value: function kramco() {
      return this.if_('monstername sausage goblin', Macro.step.apply(Macro, arguments).spellKill());
    }
  }], [{
    key: "collect",
    value: function collect() {
      return new Macro().collect();
    }
  }, {
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
    key: "freeRun",
    value: function freeRun() {
      return new Macro().skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject25())).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject26())).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject27())) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effect)(_templateObject28())) > 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject29())), 'runaway').trySkill('Spring-Loaded Front Bumper', 'Reflex Hammer', 'KGB tranquilizer dart', 'Throw Latte on Opponent', 'Snokebomb').tryItem('Louder Than Bomb', 'tattered scrap of paper', 'GOTO', 'green smoke bomb').abort();
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
    key: "perpetualStasis",
    value: function perpetualStasis() {
      return new Macro().perpetualStasis();
    }
  }, {
    key: "tentacle",
    value: function tentacle() {
      var _Macro2;

      return (_Macro2 = new Macro()).tentacle.apply(_Macro2, arguments);
    }
  }, {
    key: "professor",
    value: function professor() {
      return new Macro().professor();
    }
  }, {
    key: "kramco",
    value: function kramco() {
      var _Macro3;

      return (_Macro3 = new Macro()).kramco.apply(_Macro3, arguments);
    }
  }]);

  return Macro;
}(libram__WEBPACK_IMPORTED_MODULE_3__.Macro);
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
function getArg1() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('minehobo_combatArg1');
}
function getArg2() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('minehobo_combatArg2');
}
var freeRunItems = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$items)(_templateObject30());
function main(initialRound, foe) {
  var mode = getMode();

  if (mode === MODE_MACRO) {
    Macro.load().submit();
  } else if (mode === MODE_RUN_UNLESS_FREE) {
    var preMacro = new Macro().step(getArg1());
    var killMacro = new Macro().step(getArg2());

    if (foe.attributes.includes('FREE')) {
      killMacro.submit();
    } else {
      preMacro.submit();

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === Familiar.get('Frumious Bandersnatch') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(Effect.get('Ode to Booze')) > 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_banderRunaways') < (0,_lib__WEBPACK_IMPORTED_MODULE_1__.myFamiliarWeight)() / 5) {
        var banderRunaways = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_banderRunaways');
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runaway)();

        if ((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_banderRunaways') === banderRunaways) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('WARNING: Mafia is not tracking bander runaways correctly.');
          (0,_lib__WEBPACK_IMPORTED_MODULE_1__.setPropertyInt)('_banderRunaways', banderRunaways + 1);
        }
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(Skill.get('Spring-Loaded Front Bumper'))) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, Skill.get('Spring-Loaded Front Bumper'));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(Skill.get('Reflex Hammer')) && (0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_reflexHammerUsed') < 3) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, Skill.get('Reflex Hammer'));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(Skill.get('KGB tranquilizer dart')) && (0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_kgbTranquilizerDartUses') < 3) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, Skill.get('KGB tranquilizer dart'));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(Skill.get('Show them your ring')) && !(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_mafiaMiddleFingerRingUsed')) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, Skill.get('Show them your ring'));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= 50 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(Skill.get('Snokebomb')) && (0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_snokebombUsed') < 3) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, Skill.get('Snokebomb'));
      } else if (freeRunItems.some(function (item) {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item) > 0;
      })) {
        Macro.item(freeRunItems.find(function (item) {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)(item) > 0;
        })).repeat().submit();
      } else {
        // non-free, whatever
        throw "Couldn't find a way to run away for free!";
      }
    }
  } else {
    throw 'Unrecognized mode.';
  }
}
function withMode(action, mode) {
  var arg1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var arg2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  setMode(mode, arg1, arg2);

  try {
    return action();
  } finally {
    multiFight();
    setMode(MODE_NULL);
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
function adventureMode(loc, mode) {
  var arg1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var arg2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return withMode(function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, -1, '');
  }, mode, arg1, arg2);
}
function adventureRunUnlessFree(loc, preMacro, killMacro) {
  adventureMode(loc, MODE_RUN_UNLESS_FREE, preMacro.toString(), killMacro.toString());
}
function adventureRunOrStasis(loc, freeRun) {
  /*if (freeRun) {
    adventureRunUnlessFree(
      loc,
      //myFamiliar() === $familiar`Stocking Mimic` ? Macro.stasis() : Macro.collect(),
      //Macro.stasis().kill()
    );
  } else {
    adventureMacro(loc, Macro.stasis().kill());
  }&*/
}
function adventureMacro(loc, macro) {
  withMode(function () {
    return withMacro(macro, function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, -1, '');
    });
  }, MODE_MACRO);
}
function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bkfights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bkfights */ "./src/bkfights.ts");
/* harmony import */ var _bkkill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bkkill */ "./src/bkkill.ts");
/* harmony import */ var _wl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wl */ "./src/wl.ts");
/* harmony import */ var _sewers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sewers */ "./src/sewers.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









function help() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("bk [mode] [mode args]");
  var table = new _lib__WEBPACK_IMPORTED_MODULE_5__.Table();
  table.row("mode", "", "", "");
  table.row("help", "print this help", "");
  table.row("pref", "", "");
  table.row("", "init", "initialize the preferences used by this script to their default values");
  table.row("", "list", "list the preferences used by this script and their current values");
  table.row("fights", "", "");
  table.row("", "(noarg)", "runs all free fights and daily tasks for the day");
  table.row("", "list", "list all fight steps");
  table.row("", "final", "uses up all final resources, including familiar runs and free banishes");
  table.row("sewers", "go through the sewer using familiar runaways", "");
  table.row("boss", "", "");
  table.row("", "status", "show the status of the hobo bosses");
  table.row("", "kill", "kill the bosses, printing out consumable drops");
  table.row("wl", "whitelist to the provided clan, list sewer status (valves/grates)", "");
  table.row("buff", "(DEPRECATED)", "unmaintained");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(table.render());
}

function preferences(args) {
  var prefDefaults = [["freeFightValue", 40000, "The Maximimum amount to spend buying free fights"], ["fishClan", "", "The clan to pull fish equipment from"], ["stashClan", "", "The clan to pull shared stash items (moveable feast, bag o' tricks, PYEC)"], ["fishClan", "", "The clan to pull Clan Fishery Equipment"], ["chilledClan", "", "The clan with a setup High Kiss Castle, tuned Cold"], ["freeCopyFight", "Witchess Bishop", "The monster to rainman/fax for free fights"], ["bk.hat", "Training helmet", "Bosskilling outfit Hat"], ["bk.back", "Vampyric Cloake", "Bosskilling outfit Back"], ["bk.shirt", "tunac", "Bosskilling outfit Shirt"], ["bk.pants", "pantogram pants", "Bosskilling outfit Pants"], ["bk.acc1", "Mayor Ghost's Sash", "Bosskilling outfit Accessory (1)"], ["bk.acc2", "Old Soft Shoes", "Bosskilling outfit Accessory (2)"], ["bk.acc3", "Ring of the Skeleton Lord", "Bosskilling outfit Accessory (3)"], ["bk.familiar", "Luck Incense", "Bosskilling outfit Familiar"]];

  if (args.trim() == "list") {
    var table = new _lib__WEBPACK_IMPORTED_MODULE_5__.Table();
    table.row("Preference", "Value", "Default Value", "Description");

    var prefValue = function prefValue(r) {
      return r.length > 1 ? (0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("".concat(r[0])) : "";
    };

    prefDefaults.forEach(function (row) {
      return table.row.apply(table, [row[0], prefValue(row)].concat(_toConsumableArray(row.slice(1))));
    });
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(table.render());
  } else if (args.trim() == "init") {
    prefDefaults.forEach(function (row) {
      return (0,libram__WEBPACK_IMPORTED_MODULE_6__.set)("".concat(row[0]), row[1]);
    });
  }
}

function main(args) {
  if (!args || args.length == 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("run 'bk help' for help");
  } else {
    var matchedArgs = args.match(RegExp(/(\w+) ?(.*)/));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(matchedArgs));

    if (matchedArgs) {
      var mode = matchedArgs[1].trim();
      var modeArgs = matchedArgs[2] || "";
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(mode, " ").concat(modeArgs));

      switch (mode) {
        case "pref":
        case "prefs":
          preferences(modeArgs);
          break;

        case "help":
          help();
          break;

        case "fights":
          (0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.main)(modeArgs);
          break;

        case "sewers":
          (0,_sewers__WEBPACK_IMPORTED_MODULE_4__.main)();
          break;

        case "boss":
          (0,_bkkill__WEBPACK_IMPORTED_MODULE_2__.main)(modeArgs);
          break;

        case "wl":
        case "whitelist":
          (0,_wl__WEBPACK_IMPORTED_MODULE_3__.main)(modeArgs);
          break;
      }
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Invalid args ".concat(args));
    }
  }
}

/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/* harmony export */   "withStash": () => (/* binding */ withStash)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _sewers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sewers */ "./src/sewers.ts");
/* harmony import */ var _wl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wl */ "./src/wl.ts");
function _templateObject24() {
  var data = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["Elbow Macaroni"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["The Purple Light District"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["The Heap"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Exposure Esplanade"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["Burnbarrel Blvd."]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["Hobopolis Town Square"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject15() {
  var data = _taggedTemplateLiteral(["The Purple Light District"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["The Heap"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Exposure Esplanade"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Burnbarrel Blvd."]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Jingle Jangle Jingle"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Jingle Jangle Jingle"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Jingle Jangle Jingle"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["hobo nickel, sand dollar"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["magical sausage casing"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["pocket wish"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject4() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["portable Mayo clinic"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["portable Mayo clinic"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["portable Mayo clinic"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var MayoClinic = /*#__PURE__*/function () {
  function MayoClinic() {
    _classCallCheck(this, MayoClinic);
  }

  _createClass(MayoClinic, null, [{
    key: "present",
    value: function present() {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()[(0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject()).name] !== undefined;
    }
  }, {
    key: "canPlace",
    value: function canPlace() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject2())) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("_workshedItemUsed");
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
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject3()));
      }

      return MayoClinic.present();
    }
  }]);

  return MayoClinic;
}();
var effectsLookup = new Map();
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effects)(_templateObject4()).forEach(function (e) {
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
  if (item !== (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject5()) && qty * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item) > 1000000) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('bad get!');

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
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < target && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)() >= 400 && getPropertyInt('_sausagesEaten') < 23 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject6())) > 0) {
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
  var _iterator = _createForOfIteratorHelper((0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject7())),
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
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject8())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("csend to buffy || ".concat(Math.round((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() * 1.1 + 200), " jingle"));

    for (var i = 0; i < 5; i++) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.wait)(3);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh status');
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject9())) > 0) break;
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject10())) === 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('Get Jingle Bells first.');
  }
}

function writeWhiteboard(text) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_basement.php?pwd&action=whitewrite&whiteboard=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(text)), true, true);
}

function recordInstanceState() {
  var lines = ["Ol' Scratch at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject11()))), "Frosty at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject12()))), "Oscus at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject13()))), "Zombo at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject14()))), "Chester at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject15())))];
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
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject16()));
}, 10);
var getImageBb = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject17()));
});
var getImageEe = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject18()));
}, 10);
var getImageHeap = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject19()));
}, 10);
var getImagePld = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject20()));
}, 10);
var getImageAhbg = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject21()));
}, 10);
function wrapMain() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  try {
    turbo = args.includes('turbo');

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject22()) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)() !== (0,libram__WEBPACK_IMPORTED_MODULE_3__.$thrall)(_templateObject23())) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject24()));
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
  var startingClanName = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)();
  (0,_wl__WEBPACK_IMPORTED_MODULE_2__.setClan)(clanName);
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== clanName) throw "Failed to move to clan ".concat(clanName);

  try {
    return action();
  } finally {
    (0,_wl__WEBPACK_IMPORTED_MODULE_2__.setClan)(startingClanName);
  }
}
function withStash(itemsToTake, action) {
  if (itemsToTake.every(function (item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) > 0;
  })) return action();
  var stashClanName = (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('stashClan');
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
function _templateObject10() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["A Maze of Sewer Tunnels"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["hobo code binder"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["offhand"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["gatorskin umbrella"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Pair of Stomping Boots"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["oil of oiliness"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["unfortunate dumplings, sewer wad, bottle of ooze-o, gatorskin umbrella"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

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
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject()).some(function (i) {
    return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, i);
  }) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject2()));
}
function main() {
  // cage
  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(211, 0);
  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(212, 0); // tunnels

  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(197, 1);
  (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(198, 1);
  var boots = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject3());
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)("-combat -weapon -offhand", false);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(boots);

  while (!throughSewers()) {
    if (!getSewerItems()) {
      throw "Unable to get sewer items";
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject4()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject5()));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject6()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject7()));
    var runcap = Math.floor(((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)(boots) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)()) / 5);
    (0,_combat__WEBPACK_IMPORTED_MODULE_1__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject8()), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)("_banderRunaways") < runcap, _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.step("runaway").abort()).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject9())) > 0, _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject10())).abort()).abort());
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()

));