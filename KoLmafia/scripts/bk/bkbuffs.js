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

/***/ "./src/bkbuffs.ts":
/*!************************!*\
  !*** ./src/bkbuffs.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var _bkfights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bkfights */ "./src/bkfights.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
function _templateObject89() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject89 = function _templateObject89() {
    return data;
  };

  return data;
}

function _templateObject88() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject88 = function _templateObject88() {
    return data;
  };

  return data;
}

function _templateObject87() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject87 = function _templateObject87() {
    return data;
  };

  return data;
}

function _templateObject86() {
  var data = _taggedTemplateLiteral(["moevable feast"]);

  _templateObject86 = function _templateObject86() {
    return data;
  };

  return data;
}

function _templateObject85() {
  var data = _taggedTemplateLiteral(["moveable feast"]);

  _templateObject85 = function _templateObject85() {
    return data;
  };

  return data;
}

function _templateObject84() {
  var data = _taggedTemplateLiteral(["Bubble Vision, Thanksgetting"]);

  _templateObject84 = function _templateObject84() {
    return data;
  };

  return data;
}

function _templateObject83() {
  var data = _taggedTemplateLiteral(["pocket wish"]);

  _templateObject83 = function _templateObject83() {
    return data;
  };

  return data;
}

function _templateObject82() {
  var data = _taggedTemplateLiteral(["pocket wish"]);

  _templateObject82 = function _templateObject82() {
    return data;
  };

  return data;
}

function _templateObject81() {
  var data = _taggedTemplateLiteral(["candied sweet potatoes, green bean casserole, baked stuffing, cranberry cylinder, thanksgiving turkey, mince pie, mashed potatoes, warm gravy, bread roll"]);

  _templateObject81 = function _templateObject81() {
    return data;
  };

  return data;
}

function _templateObject80() {
  var data = _taggedTemplateLiteral(["Thanksgetting"]);

  _templateObject80 = function _templateObject80() {
    return data;
  };

  return data;
}

function _templateObject79() {
  var data = _taggedTemplateLiteral(["Haunted Liver"]);

  _templateObject79 = function _templateObject79() {
    return data;
  };

  return data;
}

function _templateObject78() {
  var data = _taggedTemplateLiteral(["Sacr\xE9 Mental"]);

  _templateObject78 = function _templateObject78() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject77() {
  var data = _taggedTemplateLiteral(["Jumpsuited hound dog"]);

  _templateObject77 = function _templateObject77() {
    return data;
  };

  return data;
}

function _templateObject76() {
  var data = _taggedTemplateLiteral(["Steam-powered Cheerleader"]);

  _templateObject76 = function _templateObject76() {
    return data;
  };

  return data;
}

function _templateObject75() {
  var data = _taggedTemplateLiteral(["Steam-powered Cheerleader"]);

  _templateObject75 = function _templateObject75() {
    return data;
  };

  return data;
}

function _templateObject74() {
  var data = _taggedTemplateLiteral(["octolus-skin cloak, ratskin pajama pants, Spacegate scientist insignia"]);

  _templateObject74 = function _templateObject74() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _templateObject73() {
  var data = _taggedTemplateLiteral(["familiar.enq"]);

  _templateObject73 = function _templateObject73() {
    return data;
  };

  return data;
}

function _templateObject72() {
  var data = _taggedTemplateLiteral(["Spacegate scientist insignia"]);

  _templateObject72 = function _templateObject72() {
    return data;
  };

  return data;
}

function _templateObject71() {
  var data = _taggedTemplateLiteral(["Spirit of Galactic Unity"]);

  _templateObject71 = function _templateObject71() {
    return data;
  };

  return data;
}

function _templateObject70() {
  var data = _taggedTemplateLiteral(["Ratskin pajama pants"]);

  _templateObject70 = function _templateObject70() {
    return data;
  };

  return data;
}

function _templateObject69() {
  var data = _taggedTemplateLiteral(["Pajama Party"]);

  _templateObject69 = function _templateObject69() {
    return data;
  };

  return data;
}

function _templateObject68() {
  var data = _taggedTemplateLiteral(["Octolus-skin cloak"]);

  _templateObject68 = function _templateObject68() {
    return data;
  };

  return data;
}

function _templateObject67() {
  var data = _taggedTemplateLiteral(["Octolus Gift"]);

  _templateObject67 = function _templateObject67() {
    return data;
  };

  return data;
}

function _templateObject66() {
  var data = _taggedTemplateLiteral(["counterfeit city"]);

  _templateObject66 = function _templateObject66() {
    return data;
  };

  return data;
}

function _templateObject65() {
  var data = _taggedTemplateLiteral(["High-Falutin'"]);

  _templateObject65 = function _templateObject65() {
    return data;
  };

  return data;
}

function _templateObject64() {
  var data = _taggedTemplateLiteral(["Open Heart Surgery"]);

  _templateObject64 = function _templateObject64() {
    return data;
  };

  return data;
}

function _templateObject63() {
  var data = _taggedTemplateLiteral(["Wandering Eye Surgery"]);

  _templateObject63 = function _templateObject63() {
    return data;
  };

  return data;
}

function _templateObject62() {
  var data = _taggedTemplateLiteral(["Jar of psychoses (The Pretentious Artist)"]);

  _templateObject62 = function _templateObject62() {
    return data;
  };

  return data;
}

function _templateObject61() {
  var data = _taggedTemplateLiteral(["Tiffany's Breakfast"]);

  _templateObject61 = function _templateObject61() {
    return data;
  };

  return data;
}

function _templateObject60() {
  var data = _taggedTemplateLiteral(["One-day ticket to That 70s Volcano"]);

  _templateObject60 = function _templateObject60() {
    return data;
  };

  return data;
}

function _templateObject59() {
  var data = _taggedTemplateLiteral(["Doing The Hustle"]);

  _templateObject59 = function _templateObject59() {
    return data;
  };

  return data;
}

function _templateObject58() {
  var data = _taggedTemplateLiteral(["[1609]Dancin' Fool"]);

  _templateObject58 = function _templateObject58() {
    return data;
  };

  return data;
}

function _templateObject57() {
  var data = _taggedTemplateLiteral(["Bat-Adjacent Form"]);

  _templateObject57 = function _templateObject57() {
    return data;
  };

  return data;
}

function _templateObject56() {
  var data = _taggedTemplateLiteral(["ChibiChanged&trade;"]);

  _templateObject56 = function _templateObject56() {
    return data;
  };

  return data;
}

function _templateObject55() {
  var data = _taggedTemplateLiteral(["snow fort"]);

  _templateObject55 = function _templateObject55() {
    return data;
  };

  return data;
}

function _templateObject54() {
  var data = _taggedTemplateLiteral(["Snow Fortified"]);

  _templateObject54 = function _templateObject54() {
    return data;
  };

  return data;
}

function _templateObject53() {
  var data = _taggedTemplateLiteral(["llama lama gong"]);

  _templateObject53 = function _templateObject53() {
    return data;
  };

  return data;
}

function _templateObject52() {
  var data = _taggedTemplateLiteral(["Extra Sensory Perception"]);

  _templateObject52 = function _templateObject52() {
    return data;
  };

  return data;
}

function _templateObject51() {
  var data = _taggedTemplateLiteral(["Video... Games?"]);

  _templateObject51 = function _templateObject51() {
    return data;
  };

  return data;
}

function _templateObject50() {
  var data = _taggedTemplateLiteral(["Billiards Belligerence"]);

  _templateObject50 = function _templateObject50() {
    return data;
  };

  return data;
}

function _templateObject49() {
  var data = _taggedTemplateLiteral(["Hustlin'"]);

  _templateObject49 = function _templateObject49() {
    return data;
  };

  return data;
}

function _templateObject48() {
  var data = _taggedTemplateLiteral(["Puzzle Champ"]);

  _templateObject48 = function _templateObject48() {
    return data;
  };

  return data;
}

function _templateObject47() {
  var data = _taggedTemplateLiteral(["Do I Know You From Somewhere?"]);

  _templateObject47 = function _templateObject47() {
    return data;
  };

  return data;
}

function _templateObject46() {
  var data = _taggedTemplateLiteral(["A Girl Named Sue"]);

  _templateObject46 = function _templateObject46() {
    return data;
  };

  return data;
}

function _templateObject45() {
  var data = _taggedTemplateLiteral(["There's No N In Love"]);

  _templateObject45 = function _templateObject45() {
    return data;
  };

  return data;
}

function _templateObject44() {
  var data = _taggedTemplateLiteral(["Driving Observantly"]);

  _templateObject44 = function _templateObject44() {
    return data;
  };

  return data;
}

function _templateObject43() {
  var data = _taggedTemplateLiteral(["Synthesis: Collection"]);

  _templateObject43 = function _templateObject43() {
    return data;
  };

  return data;
}

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _templateObject42() {
  var data = _taggedTemplateLiteral(["spice melange"]);

  _templateObject42 = function _templateObject42() {
    return data;
  };

  return data;
}

function _templateObject41() {
  var data = _taggedTemplateLiteral(["spice melange"]);

  _templateObject41 = function _templateObject41() {
    return data;
  };

  return data;
}

function _templateObject40() {
  var data = _taggedTemplateLiteral(["Accordion Thief"]);

  _templateObject40 = function _templateObject40() {
    return data;
  };

  return data;
}

function _templateObject39() {
  var data = _taggedTemplateLiteral(["Disco Bandit"]);

  _templateObject39 = function _templateObject39() {
    return data;
  };

  return data;
}

function _templateObject38() {
  var data = _taggedTemplateLiteral(["Sauceror"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36() {
  var data = _taggedTemplateLiteral(["Turtle Tamer"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["Seal Clubber"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["none"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["Magnetic Ears"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["Rain Dance"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["evil eyedrops of the ermine"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["seal eyeball"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["The Legendary Beat"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["Envy"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["Overactive Pheromones, Two Right Feet, Sucker Fingers"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject26() {
  var data = _taggedTemplateLiteral(["Flashy Dance Song"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["Lucky Struck"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["Cold Hearted"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["Blue Tongue"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["Green Tongue"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["Gettin' the Goods"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["Spice Haze"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["Song of Fortune"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Magnetized Ears"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["Bats Form"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["Jukebox Hero"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["School Spirited"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["Of Course It Looks Great"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["Bounty of Renenutet"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Voracious Gorging"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Bubble Vision"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Puzzle Champ"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["The HeyDezebound Heart"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Sole Soul"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Withered Heart"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Sour Softshoe"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Blue Swayed"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Cold Hearted"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["She Ate Too Much Candy"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Thanksgetting"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Tiffany's Breakfast"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 //import { drive } from './asdon';

function equipmentItem(itemOrString) {
  var item = typeof itemOrString === 'string' ? Item.get(itemOrString) : itemOrString;
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(item, 'item drop');
}

var Override = function Override(item) {
  var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var minTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  _classCallCheck(this, Override);

  _defineProperty(this, "item", 0);

  _defineProperty(this, "weight", 0);

  _defineProperty(this, "minTurns", 1);

  this.item = item;
  this.weight = weight;
  this.minTurns = minTurns;
};

var overrides = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject()), new Override(40, 0)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject2()), new Override(200, 10)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject3()), new Override(0, 25, 25)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject4()), new Override(0, 10, 20)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject5()), new Override(0, 10, 50)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject6()), new Override(50, 0, 50)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject7()), new Override(20, 0, 20)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject8()), new Override(300, 0, 300)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject9()), new Override(300, 0, 300)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject10()), new Override(0, 20)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject11()), new Override(80, 0)], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject12()), new Override(40, 0)]]);
var impossibleEffects = new Set([(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject13()), // Ed
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject14()), // AoSP
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject15()), // KOLHS
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject16()), // nope
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject17()), // DG turn into bats
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject18()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject19()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject20()), // We are PM so we have a spice ghost.
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject21()), // G-Lover
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject22()), // Can't have both green + black tongue.
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject23()), // Can't have both blue + black tongue.
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject24()), // Can't have both Withered + Cold Heart.
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject25()), // NA
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject26()) // portable cassette player
]);
var impossiblePassives = new Set([].concat(_toConsumableArray((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skills)(_templateObject27())), [// Nuclear Autumn skills
(0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject28()) // Bad Moon skill
]));
var skipItems = new Set([(0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject29()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject30()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject31())]);
var skipSkills = new Set([(0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject32()), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject33())]);
var familiarMultiplier = 1.25; // Jumpsuited Hound Dog;

var outfitItemDrop = 50 + // eldritch hat/pants
equipmentItem('vampyric cloake') + equipmentItem('tunac') + 75 + // scratch n' sniff sword
60 + // A Light
equipmentItem("Mayor Ghost's sash") + 30 + // old soft shoes
equipmentItem('ring of the Skeleton Lord') + 25; // luck incense

var outfitFamiliarWeight = 10; // luck incense

function fairyBonus(weight) {
  return Math.sqrt(55 * weight) + weight - 3;
}

function exactPlusItem(drop, weight) {
  return drop + fairyBonus(familiarMultiplier * weight);
}

function itemDrop(thing) {
  if (thing instanceof Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'item drop');
  } else if (thing instanceof Effect) {
    var override = overrides.get(thing);
    if (override) return itemDrop(override);
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'item drop');
  } else {
    return thing.item;
  }
}

function foodBoozeDrop(thing) {
  if (thing instanceof Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'food drop') + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'booze drop');
  } else if (thing instanceof Effect) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'food drop') + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'booze drop');
  } else {
    return 0;
  }
}

function familiarWeight(thing) {
  if (thing instanceof Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'familiar weight');
  } else if (thing instanceof Effect) {
    var override = overrides.get(thing);
    if (override) return familiarWeight(override);
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(thing, 'familiar weight');
  } else {
    return thing.weight;
  }
}

function approxBonus(thing) {
  return 2 * itemDrop(thing) + 1.25 * familiarWeight(thing) + 0.2 * foodBoozeDrop(thing);
}

function normalClass(cl) {
  return cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject34()) || cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject35()) || cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject36()) || cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject37()) || cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject38()) || cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject39()) || cl === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$class)(_templateObject40());
}

function safeUseItem(quantity, item) {
  var maxPrice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 75000;

  if ((0,_lib__WEBPACK_IMPORTED_MODULE_2__.getItem)(quantity, item, maxPrice) < quantity) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Failed to get enough ".concat(item.name, "."), 'red');
    return false;
  } //if (!get('_distentionPillUsed')) use(1, $item`distention pill`);
  //if (!get('_syntheticDogHairPillUsed') && myInebriety() >= 1) use(1, $item`synthetic dog hair pill`);


  if (!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('spiceMelangeUsed') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)() >= 3 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() >= 3) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.getItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject41()), 500000);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject42()));
  }

  if (item.fullness > 0) {
    if (quantity * item.fullness + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fullnessLimit)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(quantity, item);
      return true;
    } else {
      return false;
    }
  } else if (item.inebriety > 0) {
    if (quantity * item.inebriety + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drink)(quantity, item);
      return true;
    } else {
      return false;
    }
  } else if (item.spleen > 0) {
    if (quantity * item.spleen + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySpleenUse)() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.spleenLimit)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.chew)(quantity, item);
      return true;
    } else {
      return false;
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(quantity, item);
    return true;
  }
}

var Option = /*#__PURE__*/function () {
  function Option(effect) {
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var cost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Option);

    _defineProperty(this, "effect", void 0);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "cost", void 0);

    this.effect = effect;
    this.source = source !== null && source !== void 0 ? source : effect["default"];
    this.cost = cost;
  }

  _createClass(Option, [{
    key: "getCost",
    value: function getCost() {
      if (this.cost) {
        return this.cost;
      } else if (this.source instanceof Item) {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)(this.source);
      } else {
        return 0;
      }
    }
  }, {
    key: "getCostWithOrgan",
    value: function getCostWithOrgan() {
      var result = this.getCost();

      if (this.source instanceof Item) {
        result += 25000 * (this.source.fullness + this.source.inebriety) + 10000 * this.source.spleen;
      }

      return result;
    }
  }, {
    key: "turnsGiven",
    value: function turnsGiven() {
      if (this.source instanceof Item) {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)(this.source, 'Effect Duration');
      } else if (typeof this.source === 'string' && this.source.startsWith('genie effect')) {
        return 20;
      } else {
        return 1;
      }
    }
  }, {
    key: "countNeeded",
    value: function countNeeded() {
      var override = overrides.get(this.effect);
      if (!override) return 1;
      return Math.ceil(override.minTurns / this.turnsGiven());
    }
  }, {
    key: "efficiency",
    value: function efficiency() {
      return this.countNeeded() * this.getCostWithOrgan() / approxBonus(this.effect);
    }
  }, {
    key: "execute",
    value: function execute() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(this.effect) > 0) return;
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Acquiring effect ".concat(this.effect.name, "..."), 'blue');

      if (this.source instanceof Item && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)(this.source) < 50000) {
        safeUseItem(this.countNeeded(), this.source);
      } else if (this.source instanceof Skill) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, this.source);
      } else if (typeof this.source === 'string' && !this.source.startsWith('#')) {
        try {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(this.source);
        } catch (e) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Couldn't get effect ".concat(this.effect.name, ": ").concat(e), 'red');
        }
      } else if (typeof this.source === 'function') {
        this.source();
      }
    }
  }]);

  return Option;
}();

var options = new Map();

function addOption(option) {
  var list = options.get(option.effect);

  if (!list) {
    options.set(option.effect, [option]);
  } else {
    list.push(option);
  }
}

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject43()), 'synthesize collection', 13000));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject44()), 'asdonlib 37; asdonmartin drive observantly', 500));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject45())));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject46())));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject47())));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject48())));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject49())));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject50())));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject51()))); // 3 turns

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject52()), '# gong roach itemdrop # 3 turns', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject53())))); // 0-1 turn

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject54()), '# use snow fort; camp rest # 0-1 turns', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject55()))));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject56()), '# ChibiBuddy buff'));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject57()), '# cast Bat Form in combat')); // 1 turn; open Spookyraven first

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject58()), '# Louvre It or Leave It')); // 1 turn

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject59()), '# Discotheque with 2 Disco Style', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject60())) * 0.5)); // 0 turns (XO pocket)

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject61()), '# Jar of Psychoses (artist)', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject62())))); // 0 turns (do day 1)

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject63()), '# Get from LOV Emergency Room')); // 0 turns (do day 2)

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject64()), '# Get from LOV Emergency Room')); // ugh.

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject65()), '# Grab a free drink from Gingerbread Gallery', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject66())))); // RO stuff

addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject67()), '# Equip octolus-skin cloak at RO', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject68()))));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject69()), '# Equip ratskin pajama pants at RO', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject70()))));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject71()), '# Equip Spacegate scientist insignia at RO', (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject72()))));
addOption(new Option((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject73()), '# terminal enquiry familiar.enq')); // addOption(new Option($effect`Fortune of the Wheel`, $item`Gift card`.historical_price() * 70, 'Get X - Wheel of Fortune from DoEC'));

var _iterator = _createForOfIteratorHelper(Item.all()),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var item = _step.value;
    if (skipItems.has(item) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.historicalPrice)(item) === 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.have)(item)) continue;
    var effect = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.effectModifier)(item, 'Effect');
    if (!effect || effect === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject87()) || approxBonus(effect) < 0.001 || impossibleEffects.has(effect)) continue;
    addOption(new Option(effect, item));
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var _iterator2 = _createForOfIteratorHelper(Skill.all()),
    _step2;

try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var skill = _step2.value;
    if (!normalClass(skill["class"]) || skipSkills.has(skill)) continue;

    var _effect = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toEffect)(skill);

    if (!_effect || _effect === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject88()) || approxBonus(_effect) < 0.001) continue;
    addOption(new Option(_effect, skill));
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

var _iterator3 = _createForOfIteratorHelper(Effect.all()),
    _step3;

try {
  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
    var _effect2 = _step3.value;
    if (!_effect2 || _effect2 === (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject89()) || approxBonus(_effect2) < 0.001) continue;
    if (_effect2.attributes.includes('nohookah')) continue;
    addOption(new Option(_effect2, "genie effect ".concat(_effect2.name), 50000));
  }
} catch (err) {
  _iterator3.e(err);
} finally {
  _iterator3.f();
}

var _iterator4 = _createForOfIteratorHelper(options.values()),
    _step4;

try {
  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
    var effectOptions = _step4.value;
    effectOptions.sort(function (x, y) {
      return x.getCostWithOrgan() - y.getCostWithOrgan();
    });
  }
} catch (err) {
  _iterator4.e(err);
} finally {
  _iterator4.f();
}

var selectedOptions = _toConsumableArray(options.values()).map(function (effectOptions) {
  return effectOptions[0];
});

selectedOptions.sort(function (x, y) {
  return x.efficiency() * 10000 - approxBonus(x.effect) - (y.efficiency() * 10000 - approxBonus(y.effect));
});
var passives = Skill.all().filter(function (skill) {
  return skill.passive && approxBonus(skill) >= 0.001 && normalClass(skill["class"]) && !impossiblePassives.has(skill);
});
var rolloverEquipment = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject74());

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

function main() {
  var argsString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var itemFamiliar = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject75())) ? (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject76()) : (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject77());
  var args = argsString.trim().split(' ').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s.length > 0;
  });

  if (args.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('usage: bkbuffs ( list | reminders | rollover | execute )');
  } else if (args.includes('rollover')) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)("adventures, ".concat(rolloverEquipment.map(function (equip) {
      return "equip ".concat(equip.name);
    }).join(', '), " +switch trick-or-treat"), false);
  } else if (args.includes('reminder') || args.includes('reminders')) {
    var _iterator5 = _createForOfIteratorHelper(options.entries()),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
            effect = _step5$value[0],
            effectOptions = _step5$value[1];

        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(effect) === 0 && effectOptions.length === 1) {
          var option = effectOptions[0];

          if (typeof option.source === 'string' && option.source.startsWith('# ')) {
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(effect.name, ": ").concat(option.source.slice(2)));
          }
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    if (!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_feastedFamiliars').includes(itemFamiliar.name)) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('Feast familiar.');
    }
  } else if (args.includes('list')) {
    var currentEffects = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEffects)();
    var runningItemDrop = 0;
    var runningFamiliarWeight = 30; // moveable feast

    var table = new Table();
    runningItemDrop += 10;
    table.row(0, exactPlusItem(2 * runningItemDrop, runningFamiliarWeight), 10, 0, 'The Packrat');
    runningItemDrop += 10;
    table.row(0, exactPlusItem(2 * runningItemDrop, runningFamiliarWeight), 10, 0, 'Spice Ghost');
    runningItemDrop += outfitItemDrop;
    runningFamiliarWeight += outfitFamiliarWeight;
    table.row(0, exactPlusItem(2 * runningItemDrop, runningFamiliarWeight), outfitItemDrop, outfitFamiliarWeight, 'Outfit');

    var _iterator6 = _createForOfIteratorHelper(passives),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var passive = _step6.value;
        runningItemDrop += itemDrop(passive);
        runningFamiliarWeight += familiarWeight(passive);
        table.row(0, exactPlusItem(2 * runningItemDrop, runningFamiliarWeight).toFixed(), itemDrop(passive), familiarWeight(passive), passive, -1);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    var effectTurns = function effectTurns(effect) {
      return currentEffects[effect.name] || currentEffects["[".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(effect), "]").concat(effect.name)];
    };

    var threshold = 25;

    var highlight = function highlight(turns) {
      return turns < threshold ? "<span style='font-color: red'>".concat(turns, "</span>") : turns || 0;
    };

    var _iterator7 = _createForOfIteratorHelper(selectedOptions),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _option = _step7.value;
        runningItemDrop += itemDrop(_option.effect);
        runningFamiliarWeight += familiarWeight(_option.effect);
        table.row(_option.countNeeded() * _option.getCostWithOrgan(), exactPlusItem(2 * runningItemDrop, runningFamiliarWeight).toFixed(), itemDrop(_option.effect), familiarWeight(_option.effect), _option.effect.name, highlight(effectTurns(_option.effect)));
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(table.render());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("drop: ".concat(2 * runningItemDrop));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("familiar: ".concat(runningFamiliarWeight, " (").concat(familiarMultiplier, ")"));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(exactPlusItem(2 * runningItemDrop, runningFamiliarWeight).toFixed()));
  } else if (args.includes('execute')) {
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.userConfirm)('About to spend a crapton of meat. Ready?')) {
      throw 'No user authorization.';
    } // Fill liver enough for melange.


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() < 3) options.get((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject78()))[0].execute();
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() < 3) options.get((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject79()))[0].execute(); // Thanksgetting.

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myDaycount)() > 1) {
      var fullnessAvailable = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fullnessLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)() + ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('spiceMelangeUsed') ? 0 : 3) + ((0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_distentionPillUsed') ? 0 : 1);

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject80())) === 0 && fullnessAvailable >= 18) {
        var _iterator8 = _createForOfIteratorHelper((0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject81())),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var item = _step8.value;
            safeUseItem(1, item, 40000);
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Not enough fullness (".concat(fullnessAvailable, ") for Thanksgetting!"), 'red');
      }
    } //drive($effect`Driving Observantly`, 1);
    //cliExecute("asdonmartin drive observantly"); 
    // Stock up on pocket wishes.


    var wishCount = selectedOptions.filter(function (o) {
      return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.have)(o.effect) && typeof o.source === 'string' && o.source.startsWith('genie effect');
    }).length;
    var wishesToBuy = wishCount - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject82()));
    if (wishesToBuy > 0 && !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.userConfirm)("About to buy ".concat(wishesToBuy, " pocket wishes. OK?"))) throw 'No auth.';
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.getItem)((0,_lib__WEBPACK_IMPORTED_MODULE_2__.clamp)(wishCount, 0, 200), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject83()), 50000); // Next do... everything else.

    var skip = new Set((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effects)(_templateObject84()));

    var _iterator9 = _createForOfIteratorHelper(selectedOptions),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _option2 = _step9.value;
        if (skip.has(_option2.effect)) continue;

        _option2.execute();
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    if (!(0,libram__WEBPACK_IMPORTED_MODULE_4__.get)('_feastedFamiliars').includes(itemFamiliar.name)) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(itemFamiliar);
      (0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.withStash)([(0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject85())], function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject86()));
      });
    }
  }
}

/***/ }),

/***/ "./src/bkfights.ts":
/*!*************************!*\
  !*** ./src/bkfights.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withStash": () => (/* binding */ withStash)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/resources/2015/ChateauMantegna.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/resources/2017/TunnelOfLove.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/resources/2016/Witchess.js");
/* harmony import */ var _asdon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asdon */ "./src/asdon.ts");
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./combat */ "./src/combat.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony import */ var _wl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wl */ "./src/wl.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject91() {
  var data = _taggedTemplateLiteral(["Platinum Yendorian Express Card"]);

  _templateObject91 = function _templateObject91() {
    return data;
  };

  return data;
}

function _templateObject90() {
  var data = _taggedTemplateLiteral(["Witchess Bishop"]);

  _templateObject90 = function _templateObject90() {
    return data;
  };

  return data;
}

function _templateObject89() {
  var data = _taggedTemplateLiteral(["Deep Machine Tunnels"]);

  _templateObject89 = function _templateObject89() {
    return data;
  };

  return data;
}

function _templateObject88() {
  var data = _taggedTemplateLiteral(["machine elf"]);

  _templateObject88 = function _templateObject88() {
    return data;
  };

  return data;
}

function _templateObject87() {
  var data = _taggedTemplateLiteral(["gingerbread cigarette"]);

  _templateObject87 = function _templateObject87() {
    return data;
  };

  return data;
}

function _templateObject86() {
  var data = _taggedTemplateLiteral(["Gingerbread Upscale Retail District"]);

  _templateObject86 = function _templateObject86() {
    return data;
  };

  return data;
}

function _templateObject85() {
  var data = _taggedTemplateLiteral(["Gingerbread Civic Center"]);

  _templateObject85 = function _templateObject85() {
    return data;
  };

  return data;
}

function _templateObject84() {
  var data = _taggedTemplateLiteral(["Gingerbread Train Station"]);

  _templateObject84 = function _templateObject84() {
    return data;
  };

  return data;
}

function _templateObject83() {
  var data = _taggedTemplateLiteral(["gingerbread cigarette"]);

  _templateObject83 = function _templateObject83() {
    return data;
  };

  return data;
}

function _templateObject82() {
  var data = _taggedTemplateLiteral(["gingerbread cigarette"]);

  _templateObject82 = function _templateObject82() {
    return data;
  };

  return data;
}

function _templateObject81() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject81 = function _templateObject81() {
    return data;
  };

  return data;
}

function _templateObject80() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject80 = function _templateObject80() {
    return data;
  };

  return data;
}

function _templateObject79() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject79 = function _templateObject79() {
    return data;
  };

  return data;
}

function _templateObject78() {
  var data = _taggedTemplateLiteral(["puck man"]);

  _templateObject78 = function _templateObject78() {
    return data;
  };

  return data;
}

function _templateObject77() {
  var data = _taggedTemplateLiteral(["power pill"]);

  _templateObject77 = function _templateObject77() {
    return data;
  };

  return data;
}

function _templateObject76() {
  var data = _taggedTemplateLiteral(["Wandering Eye Surgery"]);

  _templateObject76 = function _templateObject76() {
    return data;
  };

  return data;
}

function _templateObject75() {
  var data = _taggedTemplateLiteral(["Your Mushroom Garden"]);

  _templateObject75 = function _templateObject75() {
    return data;
  };

  return data;
}

function _templateObject74() {
  var data = _taggedTemplateLiteral(["The X-32-F Combat Training Snowman"]);

  _templateObject74 = function _templateObject74() {
    return data;
  };

  return data;
}

function _templateObject73() {
  var data = _taggedTemplateLiteral(["The Neverending Party"]);

  _templateObject73 = function _templateObject73() {
    return data;
  };

  return data;
}

function _templateObject72() {
  var data = _taggedTemplateLiteral(["Missle Launcher"]);

  _templateObject72 = function _templateObject72() {
    return data;
  };

  return data;
}

function _templateObject71() {
  var data = _taggedTemplateLiteral(["powdered madness"]);

  _templateObject71 = function _templateObject71() {
    return data;
  };

  return data;
}

function _templateObject70() {
  var data = _taggedTemplateLiteral(["powdered madness"]);

  _templateObject70 = function _templateObject70() {
    return data;
  };

  return data;
}

function _templateObject69() {
  var data = _taggedTemplateLiteral(["powdered madness"]);

  _templateObject69 = function _templateObject69() {
    return data;
  };

  return data;
}

function _templateObject68() {
  var data = _taggedTemplateLiteral(["Chest X-Ray"]);

  _templateObject68 = function _templateObject68() {
    return data;
  };

  return data;
}

function _templateObject67() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject67 = function _templateObject67() {
    return data;
  };

  return data;
}

function _templateObject66() {
  var data = _taggedTemplateLiteral(["acc3"]);

  _templateObject66 = function _templateObject66() {
    return data;
  };

  return data;
}

function _templateObject65() {
  var data = _taggedTemplateLiteral(["Fire the Jokester's Gun"]);

  _templateObject65 = function _templateObject65() {
    return data;
  };

  return data;
}

function _templateObject64() {
  var data = _taggedTemplateLiteral(["The Jokester's gun"]);

  _templateObject64 = function _templateObject64() {
    return data;
  };

  return data;
}

function _templateObject63() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject63 = function _templateObject63() {
    return data;
  };

  return data;
}

function _templateObject62() {
  var data = _taggedTemplateLiteral(["Noob Cave"]);

  _templateObject62 = function _templateObject62() {
    return data;
  };

  return data;
}

function _templateObject61() {
  var data = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]);

  _templateObject61 = function _templateObject61() {
    return data;
  };

  return data;
}

function _templateObject60() {
  var data = _taggedTemplateLiteral(["off-hand"]);

  _templateObject60 = function _templateObject60() {
    return data;
  };

  return data;
}

function _templateObject59() {
  var data = _taggedTemplateLiteral(["glark cable"]);

  _templateObject59 = function _templateObject59() {
    return data;
  };

  return data;
}

function _templateObject58() {
  var data = _taggedTemplateLiteral(["The Red Zeppelin"]);

  _templateObject58 = function _templateObject58() {
    return data;
  };

  return data;
}

function _templateObject57() {
  var data = _taggedTemplateLiteral(["glark cable"]);

  _templateObject57 = function _templateObject57() {
    return data;
  };

  return data;
}

function _templateObject56() {
  var data = _taggedTemplateLiteral(["time-spinner"]);

  _templateObject56 = function _templateObject56() {
    return data;
  };

  return data;
}

function _templateObject55() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject55 = function _templateObject55() {
    return data;
  };

  return data;
}

function _templateObject54() {
  var data = _taggedTemplateLiteral(["drunk pygmy"]);

  _templateObject54 = function _templateObject54() {
    return data;
  };

  return data;
}

function _templateObject53() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject53 = function _templateObject53() {
    return data;
  };

  return data;
}

function _templateObject52() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject52 = function _templateObject52() {
    return data;
  };

  return data;
}

function _templateObject51() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject51 = function _templateObject51() {
    return data;
  };

  return data;
}

function _templateObject50() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject50 = function _templateObject50() {
    return data;
  };

  return data;
}

function _templateObject49() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject49 = function _templateObject49() {
    return data;
  };

  return data;
}

function _templateObject48() {
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject48 = function _templateObject48() {
    return data;
  };

  return data;
}

function _templateObject47() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject47 = function _templateObject47() {
    return data;
  };

  return data;
}

function _templateObject46() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject46 = function _templateObject46() {
    return data;
  };

  return data;
}

function _templateObject45() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject45 = function _templateObject45() {
    return data;
  };

  return data;
}

function _templateObject44() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject44 = function _templateObject44() {
    return data;
  };

  return data;
}

function _templateObject43() {
  var data = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]);

  _templateObject43 = function _templateObject43() {
    return data;
  };

  return data;
}

function _templateObject42() {
  var data = _taggedTemplateLiteral(["weapon"]);

  _templateObject42 = function _templateObject42() {
    return data;
  };

  return data;
}

function _templateObject41() {
  var data = _taggedTemplateLiteral(["snokebomb"]);

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
  var data = _taggedTemplateLiteral(["The Hidden Bowling Alley"]);

  _templateObject39 = function _templateObject39() {
    return data;
  };

  return data;
}

function _templateObject38() {
  var data = _taggedTemplateLiteral(["BRICKO ooze"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = _taggedTemplateLiteral(["lynyrd snare"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36() {
  var data = _taggedTemplateLiteral(["Evoke Eldritch Horror"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = _taggedTemplateLiteral(["Evoke Eldritch Horror"]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = _taggedTemplateLiteral(["ice sculpture"]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = _taggedTemplateLiteral(["ice sculpture"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = _taggedTemplateLiteral(["shaking 4-d camera"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["shaking 4-d camera"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["photocopied monster"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["4-d camera"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["unfinished ice sculpture"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["Pocket Professor"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["replica bat-oomerang"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["shattering punch"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["gingerbread mob hit"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["drunk pygmy"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["crystal ball"]);

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
  var data = _taggedTemplateLiteral(["crystal ball"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["Bowl of Scorpions"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["bowling ball"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["crystal ball"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["crystal ball"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["crystal ball"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["Rain-Doh box full of monster"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Rain-Doh box full of monster"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["spooky putty monster"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["spooky putty monster"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Rain-Doh box full of monster"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["spooky putty monster"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["drum machine"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Eldritch Attunement"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Steely-Eyed Squint"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Witchess Bishop"]);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function withStash(itemsToTake, action) {
  if (itemsToTake.every(function (item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) > 0;
  })) return action();
  var stashClanName = (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('stashClan');
  if (stashClanName === '') return null;
  var startingClanName = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)();
  (0,_wl__WEBPACK_IMPORTED_MODULE_4__.setClan)(stashClanName);
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== stashClanName) throw "Wrong clan! Don't take stuff out of the stash here!";
  var quantitiesTaken = new Map();

  try {
    var _iterator = _createForOfIteratorHelper(itemsToTake),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== stashClanName) throw "Wrong clan! Don't take stuff out of the stash here!";
        var succeeded = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeStash)(1, item);

        if (succeeded) {
          var _quantitiesTaken$get;

          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Took ".concat(item.plural, " from stash."), 'blue');
          quantitiesTaken.set(item, ((_quantitiesTaken$get = quantitiesTaken.get(item)) !== null && _quantitiesTaken$get !== void 0 ? _quantitiesTaken$get : 0) + (succeeded ? 1 : 0));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return action();
  } finally {
    var _iterator2 = _createForOfIteratorHelper(quantitiesTaken.entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            _item = _step2$value[0],
            quantityTaken = _step2$value[1];

        // eslint-disable-next-line no-unsafe-finally
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== stashClanName) throw "Wrong clan! Don't put stuff back in the stash here!";
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(quantityTaken, _item);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putStash)(quantityTaken, _item);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Returned ".concat(quantityTaken, " ").concat(_item.plural, " to stash."), 'blue');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    (0,_wl__WEBPACK_IMPORTED_MODULE_4__.setClan)(startingClanName);
  }
}
var steps = [];

function dec() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("dec");
  return function (t, pk, d) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(t);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(pk);
  };
}

var Test = _decorate(null, function (_initialize) {
  var Test = function Test() {
    _classCallCheck(this, Test);

    _initialize(this);
  };

  return {
    F: Test,
    d: [{
      kind: "method",
      decorators: [dec()],
      key: "test",
      value: function test() {}
    }]
  };
});

var t = new Test();
t.test();

function step(condition, setup, before) {
  //print("STEP")
  return function (target, propertyKey, descriptor) {
    //print(target);
    //print(propertyKey);
    //print(descriptor);
    steps.push(propertyKey);
    var method = descriptor.value;

    descriptor.value = function () {
      if (before) before();

      if (condition()) {
        if (setup) setup();

        while (condition()) {
          method();
        }

        while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20) {
          (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject())), function () {
            return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject2()));
          });
        }

        while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('choiceAdventure970', "1&whichmonster=".concat(FREE_FIGHT_COPY_TARGET.id));
          (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
            return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject3()));
          });
        }
      }
    };
  };
}

function has(target) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(target) > 0;
}

var HEAVY_RAIN = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myPath)() == "Heavy Rains";
var PROFESSOR_COPIES = true;
var FREE_FIGHT_COST = 40000; // TODO: don't hardcode this

var FREE_FIGHT_COPY_TARGET = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject4());
if (!(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject5()))) throw 'Get Squint first!';
if (!(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject6()))) throw 'Get Eldritch Attunement first!';
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('mood apathetic');
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('ccs bkfights');

if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('sourceTerminalEducate1') !== 'digitize.edu' || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('sourceTerminalEducate2') !== 'extract.edu') {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate digitize; terminal educate extract');
}

(0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('hpAutoRecovery', 0.8);
(0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('hpAutoRecoveryTarget', 0.95);

function maybeMacro(property, target) {
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)(property)) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, target);
  return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)(property) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(target) > 0, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item(target));
}

function drumMachineWithMacro(macro) {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().step(macro).abort(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject7()));
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
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('spookyPuttyCopiesMade') + (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_raindohCopiesMade') < 6;
    }
  }, {
    key: "copyMacro",
    value: function copyMacro() {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('spookyPuttyCopiesMade') < 5) {
        return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item('spooky putty sheet');
      } else if (true) {
        return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item('Rain-doh black box');
      } else {}
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro());
    }
  }, {
    key: "hasFight",
    value: function hasFight() {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject8())) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject9())) > 0;
    }
  }, {
    key: "fight",
    value: function fight() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject10())) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject11()));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject12())) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject13()));
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
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL11Worship') !== 'unstarted' && ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') < 10 || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') == 10 && has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject14())));
    }
  }, {
    key: "shouldSaber",
    value: function shouldSaber() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL11Worship') !== 'unstarted' && ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') == 10 && !has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject15())) || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') == 11 && has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject16())));
    }
  }, {
    key: "setupFreeFight",
    value: function setupFreeFight(fights) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject17())), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject18()));
      fights || (fights = 1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(fights, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject19()));

      if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') == 10 && has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject20()))) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject21()), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject22()));
      }
    }
  }, {
    key: "didSaber",
    value: function didSaber() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL11Worship') !== 'unstarted' && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberForceMonster') == (0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject23());
    }
  }]);

  return DrunkPygmy;
}();

var FreeKill = /*#__PURE__*/function () {
  function FreeKill() {
    _classCallCheck(this, FreeKill);
  }

  _createClass(FreeKill, null, [{
    key: "hasFreeKills",
    value: function hasFreeKills() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_gingerbreadMobHitUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_shatteringPunchUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_usedReplicaBatoomerang') < 3;
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_gingerbreadMobHitUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject24()))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_shatteringPunchUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject25()))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_usedReplicaBatoomerang') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject26())));
    }
  }]);

  return FreeKill;
}();

var GingerbreadCity = /*#__PURE__*/function () {
  function GingerbreadCity() {
    _classCallCheck(this, GingerbreadCity);
  }

  _createClass(GingerbreadCity, null, [{
    key: "totalTurns",
    value: function totalTurns() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('gingerExtraAdventures') ? 30 : 20;
    }
  }, {
    key: "turnsToday",
    value: function turnsToday() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_gingerbreadCityTurns');
    }
  }, {
    key: "turnsLeft",
    value: function turnsLeft() {
      return GingerbreadCity.totalTurns() - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_gingerbreadCityTurns');
    }
  }, {
    key: "hasTurns",
    value: function hasTurns() {
      return GingerbreadCity.turnsLeft() > 0;
    }
  }]);

  return GingerbreadCity;
}();

var FreeFights = _decorate(null, function (_initialize2) {
  var FreeFights = function FreeFights() {
    _classCallCheck(this, FreeFights);

    _initialize2(this);
  };

  return {
    F: FreeFights,
    d: [{
      kind: "method",
      decorators: [step(function () {
        var _ChateauMantegna$pain, _ChateauMantegna$pain2;

        return libram__WEBPACK_IMPORTED_MODULE_8__.have() && !libram__WEBPACK_IMPORTED_MODULE_8__.paintingFought() && ((_ChateauMantegna$pain = libram__WEBPACK_IMPORTED_MODULE_8__.paintingMonster()) === null || _ChateauMantegna$pain === void 0 ? void 0 : (_ChateauMantegna$pain2 = _ChateauMantegna$pain.attributes) === null || _ChateauMantegna$pain2 === void 0 ? void 0 : _ChateauMantegna$pain2.includes('FREE'));
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject27()));
      })],
      key: "chateau",
      value: function chateau() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().professor().spellKill(), function () {
          return libram__WEBPACK_IMPORTED_MODULE_8__.fightPainting();
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_photocopyUsed');
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.faxbot)(FREE_FIGHT_COPY_TARGET, "Cheesefax");
      })],
      key: "fax",
      value: function fax() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().step(maybeMacro('_iceSculptureUsed', (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject28()))).step(maybeMacro('_cameraUsed', (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject29()))).step(SpookyPutty.maybeMacro()).spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject30()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return SpookyPutty.hasFight();
      })],
      key: "spookyPutty",
      value: function spookyPutty() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().externalIf(SpookyPutty.hasCopies(), SpookyPutty.copyMacro()), function () {
          return SpookyPutty.fight();
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject31()));
      })],
      key: "camera",
      value: function camera() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject32()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject33()));
      })],
      key: "sculpture",
      value: function sculpture() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject34()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL02Larva') !== 'unstarted' && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_eldritchTentacleFought');
      })],
      key: "forestTentacle",
      value: function forestTentacle() {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=forestvillage&action=fv_scientist', false);
        if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'No choice?';
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(1);
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject35())) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_eldritchHorrorEvoked');
      })],
      key: "skillTentacle",
      value: function skillTentacle() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject36()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("_lynyrdSnareUses") < 3;
      })],
      key: "lynrdSnares",
      value: function lynrdSnares() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject37()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_brickoFights') < 10;
      })],
      key: "bricko",
      value: function bricko() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject38()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return DrunkPygmy.freeBanishes();
      })],
      key: "drunkPygmy",
      value: function drunkPygmy() {
        DrunkPygmy.setupFreeFight();
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject39()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername pygmy bowler', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject40()))).if_('monstername orderlies', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject41()))).abort());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return DrunkPygmy.shouldSaber();
      }, function () {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject42()), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject43()));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject44())), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject45()));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject46())), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject47()));
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1387, 2);
      })],
      key: "drunkPygmySaberCopySetup",
      value: function drunkPygmySaberCopySetup() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject48()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill('Use the Force'));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return DrunkPygmy.didSaber();
      })],
      key: "drunkPygmySaberCopy",
      value: function drunkPygmySaberCopy() {
        DrunkPygmy.setupFreeFight(2);
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject49()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject50()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject51())), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject52()));
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject53()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill('Use the Force'));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return 10 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_timeSpinnerMinutesUsed') > 3;
      }, function () {
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1195, 1);
        (0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('choiceAdventure1196', "1&monid=".concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject54()).id));
      })],
      key: "drunkPygmyTimeSpinner",
      value: function drunkPygmyTimeSpinner() {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject55()));
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort(), function () {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject56()));
        });
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return ['step3', 'finished'].includes((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL11Ron')) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_glarkCableUses') < 5;
      }, function () {
        return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(5 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_glarkCableUses'), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject57()), FREE_FIGHT_COST);
      })],
      key: "glarkCables",
      value: function glarkCables() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject58()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject59())));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_sausageFights') == 0;
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject60()), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject61()));
      })],
      key: "kramco",
      value: function kramco() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject62()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return FreeKill.hasFreeKills();
      })],
      key: "freeKills",
      value: function freeKills() {
        drumMachineWithMacro(FreeKill.maybeMacro());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_firedJokestersGun');
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject63()), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject64()));
      })],
      key: "jokester",
      value: function jokester() {
        drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject65())));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_chestXRayUsed') < 3;
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject66()), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject67()));
      })],
      key: "chestXRay",
      value: function chestXRay() {
        drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject68())));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powderedMadnessUses') < 5 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject69())) < FREE_FIGHT_COST;
      }, function () {
        return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(5 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powderedMadnessUses'), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject70()), FREE_FIGHT_COST);
      })],
      key: "powderedMadness",
      value: function powderedMadness() {
        drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject71())));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined;
      }, function () {
        return (0,_asdon__WEBPACK_IMPORTED_MODULE_1__.fillAsdonMartinTo)(100);
      })],
      key: "asdon",
      value: function asdon() {
        drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject72())));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_neverendingPartyFreeTurns') < 10;
      }, function () {
        return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoices)(new Map([[1322, 2], [1324, 5]]));
      })],
      key: "nep",
      value: function nep() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject73()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_snojoFreeFights') < 10;
      })],
      key: "snojo",
      value: function snojo() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject74()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['packet of mushroom spores'] !== undefined && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mushroomGardenFights') === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_sourceTerminalPortscanUses') == 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)('portscan.edu', 0, 0) === 'portscan.edu';
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate portscan');
      })],
      key: "mushroomGarden",
      value: function mushroomGarden() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject75()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername government agent', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill('Macrometeorite')).if_('!monstername piranha plant', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.abort()).trySkill('Portscan').spellKill());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return libram__WEBPACK_IMPORTED_MODULE_9__.isUsed();
      }, function () {})],
      key: "lov",
      value: function lov() {
        var effect = (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject76())) ? 'Open Heart Surgery' : 'Wandering Eye Surgery';
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return libram__WEBPACK_IMPORTED_MODULE_9__.fightAll('LOV Epaulettes', effect, 'LOV Extraterrestrial Chocolate');
        });
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'Did not get all the way through LOV.';
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('choice.php');
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'Did not get all the way through LOV.';
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powerPillUses') < 20 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject77())) > 0;
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject78()));
      }, function () {
        return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(Math.max(0, 20 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powerPillUses') - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject79()))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject80()), FREE_FIGHT_COST);
      })],
      key: "powerPill",
      value: function powerPill() {
        drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject81())));
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return GingerbreadCity.hasTurns() && has((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject82()));
      }, function () {}, function () {
        return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(GingerbreadCity.turnsLeft(), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject83()), FREE_FIGHT_COST);
      })],
      key: "gingerBreadCity",
      value: function gingerBreadCity() {
        if (GingerbreadCity.turnsToday() == 9) {
          (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1204, 1); // for now, find out choice number later

          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject84()), 1, '');
        } else if (GingerbreadCity.turnsToday() == 19) {
          (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1203, 4); // for now, find out choice number later

          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject85()), 1, '');
        } else {
          (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject86()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject87())).abort());
        }
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_machineTunnelsAdv') < 5;
      }, function () {
        return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject88()));
      })],
      key: "machineElf",
      value: function machineElf() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject89()), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
      }
    }, {
      kind: "method",
      decorators: [step(function () {
        return libram__WEBPACK_IMPORTED_MODULE_10__.fightsDone() < 5;
      })],
      key: "witchess",
      value: function witchess() {
        (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
          return libram__WEBPACK_IMPORTED_MODULE_10__.fightPiece((0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject90()));
        });
      }
    }]
  };
});

var ff = new FreeFights();
steps.forEach(function (step) {
  return ff[step]();
}); // 40	20	0	0	PYEC

if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('expressCardUsed')) {
  var pyec = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject91());
  withStash([pyec], function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(pyec);
  });
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

function _templateObject32() {
  var data = _taggedTemplateLiteral(["Louder Than Bomb, divine champagne popper, tattered scrap of paper, GOTO, green smoke bomb"]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = _taggedTemplateLiteral(["Pair of Stomping Boots"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = _taggedTemplateLiteral(["The Ode to Booze"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = _taggedTemplateLiteral(["Frumious Bandersnatch"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = _taggedTemplateLiteral(["Extract Jelly"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = _taggedTemplateLiteral(["Extract"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = _taggedTemplateLiteral(["lecture on relativity"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = _taggedTemplateLiteral(["Saucegeyser"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = _taggedTemplateLiteral(["Stuffed Mortar Shell"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = _taggedTemplateLiteral(["Lunging Thrust-Smack"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = _taggedTemplateLiteral(["Lunging Thrust-Smack"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["Lunging Thrust-Smack"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["Candyblast"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Fire the Jokester's Gun"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["The Jokester's gun"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["Chest X-Ray"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["Gingerbread Mob Hit"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["Shattering Punch"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Saucegeyser"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["stocking mimic"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["feather boa constrictor"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["ninja pirate zombie robot"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["cocoabo"]);

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
    key: "stasis",
    value: function stasis() {
      var cocoaboLike = [(0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject8()), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject9()), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject10()), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject11())];
    }
  }, {
    key: "kill",
    value: function kill() {
      return this.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)(), 'attack').if_('monstername sleaze hobo', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject12())).repeat()).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_shatteringPunchUsed') < 3, Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject13())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_gingerbreadMobHitUsed'), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject14())))).externalIf((0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyInt)('_chestXRayUsed') < 3 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject15())), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject16())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_firedJokestersGun') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEquipped)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject17())), Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject18())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.getPropertyBoolean)('_missileLauncherUsed') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)() >= 100, Macro.if_(Macro.nonFree(), Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject19())))).externalIf(!(0,_lib__WEBPACK_IMPORTED_MODULE_1__.turboMode)(), Macro.while_('!hpbelow 500 && !match "some of it is even intact"', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject20())))).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject21())).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject22())).if_('monstername spooky hobo', Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject23())).repeat()).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject24())).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject25())).attack();
    }
  }, {
    key: "spellKill",
    value: function spellKill() {
      return this.skill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucegeyser').repeat();
    }
  }, {
    key: "tentacle",
    value: function tentacle() {
      return this.if_('monstername eldritch tentacle', Macro.skill('Curse of Weaksauce', 'Micrometeorite', 'Stuffed Mortar Shell', 'Saucestorm').repeat());
    }
  }, {
    key: "professor",
    value: function professor() {
      var lecture = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject26());
      return this.if_("hasskill ".concat(lecture), Macro.skill("".concat(lecture)));
    }
  }], [{
    key: "collect",
    value: function collect() {
      return new Macro().collect();
    }
  }, {
    key: "stasis",
    value: function stasis() {
      return new Macro().stasis();
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
      return new Macro().skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject27())).skill((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject28())).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject29())) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effect)(_templateObject30())) > 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject31())), 'runaway').trySkill('Spring-Loaded Front Bumper', 'Reflex Hammer', 'KGB tranquilizer dart', 'Throw Latte on Opponent', 'Snokebomb').tryItem('Louder Than Bomb', 'tattered scrap of paper', 'GOTO', 'green smoke bomb').abort();
    }
  }, {
    key: "spellKill",
    value: function spellKill() {
      return new Macro().spellKill();
    }
  }, {
    key: "tentacle",
    value: function tentacle() {
      return new Macro().tentacle();
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
var freeRunItems = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$items)(_templateObject32());
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

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/* harmony export */   "printLines": () => (/* binding */ printLines)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _sewers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sewers */ "./src/sewers.ts");
function _templateObject20() {
  var data = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["Elbow Macaroni"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["Pastamancer"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["The Purple Light District"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["The Heap"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["Exposure Esplanade"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["Burnbarrel Blvd."]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Hobopolis Town Square"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject11() {
  var data = _taggedTemplateLiteral(["The Purple Light District"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["The Heap"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Exposure Esplanade"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Burnbarrel Blvd."]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Jingle Jangle Jingle"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Jingle Jangle Jingle"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Jingle Jangle Jingle"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["hobo nickel, sand dollar"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["magical sausage casing"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["pocket wish"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




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
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
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
  if (item !== (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject()) && qty * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item) > 1000000) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('bad get!');

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
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < target && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)() >= 400 && getPropertyInt('_sausagesEaten') < 23 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject2())) > 0) {
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
  var _iterator = _createForOfIteratorHelper((0,libram__WEBPACK_IMPORTED_MODULE_2__.$items)(_templateObject3())),
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
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effect)(_templateObject4())) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("csend to buffy || ".concat(Math.round((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() * 1.1 + 200), " jingle"));

    for (var i = 0; i < 5; i++) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.wait)(3);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh status');
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effect)(_templateObject5())) > 0) break;
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effect)(_templateObject6())) === 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.abort)('Get Jingle Bells first.');
  }
}

function writeWhiteboard(text) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_basement.php?pwd&action=whitewrite&whiteboard=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(text)), true, true);
}

function recordInstanceState() {
  var lines = ["Ol' Scratch at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject7()))), "Frosty at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject8()))), "Oscus at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject9()))), "Zombo at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject10()))), "Chester at image ".concat(getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject11())))];
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
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject12()));
}, 10);
var getImageBb = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject13()));
});
var getImageEe = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject14()));
}, 10);
var getImageHeap = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject15()));
}, 10);
var getImagePld = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject16()));
}, 10);
var getImageAhbg = memoizeTurncount(function () {
  return getImage((0,libram__WEBPACK_IMPORTED_MODULE_2__.$location)(_templateObject17()));
}, 10);
function wrapMain() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  try {
    turbo = args.includes('turbo');

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$class)(_templateObject18()) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)() !== (0,libram__WEBPACK_IMPORTED_MODULE_2__.$thrall)(_templateObject19())) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject20()));
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
  for (var _len2 = arguments.length, lines = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    lines[_key2] = arguments[_key2];
  }

  for (var _i2 = 0, _lines2 = lines; _i2 < _lines2.length; _i2++) {
    var line = _lines2[_i2];
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.logprint)(line);
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(lines.map(function (line) {
    return line.replace('<', '&lt;');
  }).join('\n'));
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
/* harmony export */   "sewerAccess": () => (/* binding */ sewerAccess)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");


var getSewersState = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.memoizeTurncount)(function () {
  var logText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('clan_raidlogs.php');
  var grates = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.extractInt)(/opened (a|[0-9]+) sewer grate/g, logText);
  var valves = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.extractInt)(/lowered the water level( [0-9]+ times?)? \(([0-9]+) turn/g, logText, 2);
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
/* harmony export */   "farmingClans": () => (/* binding */ farmingClans),
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
var farmingClans = ['The Beanery', 'The Marketeers', 'worthawholebean Side Clan', 'The Old Saloon', 'Aftercorers', 'Abstract Singleton Train'];
function main() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (target !== null) setClan(target);
  if (farmingClans.includes((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)())) printClanStatus();
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
/******/ 	return __webpack_require__("./src/bkbuffs.ts");
/******/ })()

));