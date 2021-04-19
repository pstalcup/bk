/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/he/he.js":
/*!*******************************!*\
  !*** ./node_modules/he/he.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
;

(function (root) {
  // Detect free variables `exports`.
  var freeExports = ( false ? 0 : _typeof(exports)) == 'object' && exports; // Detect free variable `module`.

  var freeModule = ( false ? 0 : _typeof(module)) == 'object' && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code,
  // and use it as `root`.

  var freeGlobal = (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g;

  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    root = freeGlobal;
  }
  /*--------------------------------------------------------------------------*/
  // All astral symbols.


  var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // All ASCII symbols (not just printable ASCII) except those listed in the
  // first column of the overrides table.
  // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides

  var regexAsciiWhitelist = /[\x01-\x7F]/g; // All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
  // code points listed in the first column of the overrides table on
  // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.

  var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
  var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
  var encodeMap = {
    '\xAD': 'shy',
    "\u200C": 'zwnj',
    "\u200D": 'zwj',
    "\u200E": 'lrm',
    "\u2063": 'ic',
    "\u2062": 'it',
    "\u2061": 'af',
    "\u200F": 'rlm',
    "\u200B": 'ZeroWidthSpace',
    "\u2060": 'NoBreak',
    "\u0311": 'DownBreve',
    "\u20DB": 'tdot',
    "\u20DC": 'DotDot',
    '\t': 'Tab',
    '\n': 'NewLine',
    "\u2008": 'puncsp',
    "\u205F": 'MediumSpace',
    "\u2009": 'thinsp',
    "\u200A": 'hairsp',
    "\u2004": 'emsp13',
    "\u2002": 'ensp',
    "\u2005": 'emsp14',
    "\u2003": 'emsp',
    "\u2007": 'numsp',
    '\xA0': 'nbsp',
    "\u205F\u200A": 'ThickSpace',
    "\u203E": 'oline',
    '_': 'lowbar',
    "\u2010": 'dash',
    "\u2013": 'ndash',
    "\u2014": 'mdash',
    "\u2015": 'horbar',
    ',': 'comma',
    ';': 'semi',
    "\u204F": 'bsemi',
    ':': 'colon',
    "\u2A74": 'Colone',
    '!': 'excl',
    '\xA1': 'iexcl',
    '?': 'quest',
    '\xBF': 'iquest',
    '.': 'period',
    "\u2025": 'nldr',
    "\u2026": 'mldr',
    '\xB7': 'middot',
    '\'': 'apos',
    "\u2018": 'lsquo',
    "\u2019": 'rsquo',
    "\u201A": 'sbquo',
    "\u2039": 'lsaquo',
    "\u203A": 'rsaquo',
    '"': 'quot',
    "\u201C": 'ldquo',
    "\u201D": 'rdquo',
    "\u201E": 'bdquo',
    '\xAB': 'laquo',
    '\xBB': 'raquo',
    '(': 'lpar',
    ')': 'rpar',
    '[': 'lsqb',
    ']': 'rsqb',
    '{': 'lcub',
    '}': 'rcub',
    "\u2308": 'lceil',
    "\u2309": 'rceil',
    "\u230A": 'lfloor',
    "\u230B": 'rfloor',
    "\u2985": 'lopar',
    "\u2986": 'ropar',
    "\u298B": 'lbrke',
    "\u298C": 'rbrke',
    "\u298D": 'lbrkslu',
    "\u298E": 'rbrksld',
    "\u298F": 'lbrksld',
    "\u2990": 'rbrkslu',
    "\u2991": 'langd',
    "\u2992": 'rangd',
    "\u2993": 'lparlt',
    "\u2994": 'rpargt',
    "\u2995": 'gtlPar',
    "\u2996": 'ltrPar',
    "\u27E6": 'lobrk',
    "\u27E7": 'robrk',
    "\u27E8": 'lang',
    "\u27E9": 'rang',
    "\u27EA": 'Lang',
    "\u27EB": 'Rang',
    "\u27EC": 'loang',
    "\u27ED": 'roang',
    "\u2772": 'lbbrk',
    "\u2773": 'rbbrk',
    "\u2016": 'Vert',
    '\xA7': 'sect',
    '\xB6': 'para',
    '@': 'commat',
    '*': 'ast',
    '/': 'sol',
    'undefined': null,
    '&': 'amp',
    '#': 'num',
    '%': 'percnt',
    "\u2030": 'permil',
    "\u2031": 'pertenk',
    "\u2020": 'dagger',
    "\u2021": 'Dagger',
    "\u2022": 'bull',
    "\u2043": 'hybull',
    "\u2032": 'prime',
    "\u2033": 'Prime',
    "\u2034": 'tprime',
    "\u2057": 'qprime',
    "\u2035": 'bprime',
    "\u2041": 'caret',
    '`': 'grave',
    '\xB4': 'acute',
    "\u02DC": 'tilde',
    '^': 'Hat',
    '\xAF': 'macr',
    "\u02D8": 'breve',
    "\u02D9": 'dot',
    '\xA8': 'die',
    "\u02DA": 'ring',
    "\u02DD": 'dblac',
    '\xB8': 'cedil',
    "\u02DB": 'ogon',
    "\u02C6": 'circ',
    "\u02C7": 'caron',
    '\xB0': 'deg',
    '\xA9': 'copy',
    '\xAE': 'reg',
    "\u2117": 'copysr',
    "\u2118": 'wp',
    "\u211E": 'rx',
    "\u2127": 'mho',
    "\u2129": 'iiota',
    "\u2190": 'larr',
    "\u219A": 'nlarr',
    "\u2192": 'rarr',
    "\u219B": 'nrarr',
    "\u2191": 'uarr',
    "\u2193": 'darr',
    "\u2194": 'harr',
    "\u21AE": 'nharr',
    "\u2195": 'varr',
    "\u2196": 'nwarr',
    "\u2197": 'nearr',
    "\u2198": 'searr',
    "\u2199": 'swarr',
    "\u219D": 'rarrw',
    "\u219D\u0338": 'nrarrw',
    "\u219E": 'Larr',
    "\u219F": 'Uarr',
    "\u21A0": 'Rarr',
    "\u21A1": 'Darr',
    "\u21A2": 'larrtl',
    "\u21A3": 'rarrtl',
    "\u21A4": 'mapstoleft',
    "\u21A5": 'mapstoup',
    "\u21A6": 'map',
    "\u21A7": 'mapstodown',
    "\u21A9": 'larrhk',
    "\u21AA": 'rarrhk',
    "\u21AB": 'larrlp',
    "\u21AC": 'rarrlp',
    "\u21AD": 'harrw',
    "\u21B0": 'lsh',
    "\u21B1": 'rsh',
    "\u21B2": 'ldsh',
    "\u21B3": 'rdsh',
    "\u21B5": 'crarr',
    "\u21B6": 'cularr',
    "\u21B7": 'curarr',
    "\u21BA": 'olarr',
    "\u21BB": 'orarr',
    "\u21BC": 'lharu',
    "\u21BD": 'lhard',
    "\u21BE": 'uharr',
    "\u21BF": 'uharl',
    "\u21C0": 'rharu',
    "\u21C1": 'rhard',
    "\u21C2": 'dharr',
    "\u21C3": 'dharl',
    "\u21C4": 'rlarr',
    "\u21C5": 'udarr',
    "\u21C6": 'lrarr',
    "\u21C7": 'llarr',
    "\u21C8": 'uuarr',
    "\u21C9": 'rrarr',
    "\u21CA": 'ddarr',
    "\u21CB": 'lrhar',
    "\u21CC": 'rlhar',
    "\u21D0": 'lArr',
    "\u21CD": 'nlArr',
    "\u21D1": 'uArr',
    "\u21D2": 'rArr',
    "\u21CF": 'nrArr',
    "\u21D3": 'dArr',
    "\u21D4": 'iff',
    "\u21CE": 'nhArr',
    "\u21D5": 'vArr',
    "\u21D6": 'nwArr',
    "\u21D7": 'neArr',
    "\u21D8": 'seArr',
    "\u21D9": 'swArr',
    "\u21DA": 'lAarr',
    "\u21DB": 'rAarr',
    "\u21DD": 'zigrarr',
    "\u21E4": 'larrb',
    "\u21E5": 'rarrb',
    "\u21F5": 'duarr',
    "\u21FD": 'loarr',
    "\u21FE": 'roarr',
    "\u21FF": 'hoarr',
    "\u2200": 'forall',
    "\u2201": 'comp',
    "\u2202": 'part',
    "\u2202\u0338": 'npart',
    "\u2203": 'exist',
    "\u2204": 'nexist',
    "\u2205": 'empty',
    "\u2207": 'Del',
    "\u2208": 'in',
    "\u2209": 'notin',
    "\u220B": 'ni',
    "\u220C": 'notni',
    "\u03F6": 'bepsi',
    "\u220F": 'prod',
    "\u2210": 'coprod',
    "\u2211": 'sum',
    '+': 'plus',
    '\xB1': 'pm',
    '\xF7': 'div',
    '\xD7': 'times',
    '<': 'lt',
    "\u226E": 'nlt',
    "<\u20D2": 'nvlt',
    '=': 'equals',
    "\u2260": 'ne',
    "=\u20E5": 'bne',
    "\u2A75": 'Equal',
    '>': 'gt',
    "\u226F": 'ngt',
    ">\u20D2": 'nvgt',
    '\xAC': 'not',
    '|': 'vert',
    '\xA6': 'brvbar',
    "\u2212": 'minus',
    "\u2213": 'mp',
    "\u2214": 'plusdo',
    "\u2044": 'frasl',
    "\u2216": 'setmn',
    "\u2217": 'lowast',
    "\u2218": 'compfn',
    "\u221A": 'Sqrt',
    "\u221D": 'prop',
    "\u221E": 'infin',
    "\u221F": 'angrt',
    "\u2220": 'ang',
    "\u2220\u20D2": 'nang',
    "\u2221": 'angmsd',
    "\u2222": 'angsph',
    "\u2223": 'mid',
    "\u2224": 'nmid',
    "\u2225": 'par',
    "\u2226": 'npar',
    "\u2227": 'and',
    "\u2228": 'or',
    "\u2229": 'cap',
    "\u2229\uFE00": 'caps',
    "\u222A": 'cup',
    "\u222A\uFE00": 'cups',
    "\u222B": 'int',
    "\u222C": 'Int',
    "\u222D": 'tint',
    "\u2A0C": 'qint',
    "\u222E": 'oint',
    "\u222F": 'Conint',
    "\u2230": 'Cconint',
    "\u2231": 'cwint',
    "\u2232": 'cwconint',
    "\u2233": 'awconint',
    "\u2234": 'there4',
    "\u2235": 'becaus',
    "\u2236": 'ratio',
    "\u2237": 'Colon',
    "\u2238": 'minusd',
    "\u223A": 'mDDot',
    "\u223B": 'homtht',
    "\u223C": 'sim',
    "\u2241": 'nsim',
    "\u223C\u20D2": 'nvsim',
    "\u223D": 'bsim',
    "\u223D\u0331": 'race',
    "\u223E": 'ac',
    "\u223E\u0333": 'acE',
    "\u223F": 'acd',
    "\u2240": 'wr',
    "\u2242": 'esim',
    "\u2242\u0338": 'nesim',
    "\u2243": 'sime',
    "\u2244": 'nsime',
    "\u2245": 'cong',
    "\u2247": 'ncong',
    "\u2246": 'simne',
    "\u2248": 'ap',
    "\u2249": 'nap',
    "\u224A": 'ape',
    "\u224B": 'apid',
    "\u224B\u0338": 'napid',
    "\u224C": 'bcong',
    "\u224D": 'CupCap',
    "\u226D": 'NotCupCap',
    "\u224D\u20D2": 'nvap',
    "\u224E": 'bump',
    "\u224E\u0338": 'nbump',
    "\u224F": 'bumpe',
    "\u224F\u0338": 'nbumpe',
    "\u2250": 'doteq',
    "\u2250\u0338": 'nedot',
    "\u2251": 'eDot',
    "\u2252": 'efDot',
    "\u2253": 'erDot',
    "\u2254": 'colone',
    "\u2255": 'ecolon',
    "\u2256": 'ecir',
    "\u2257": 'cire',
    "\u2259": 'wedgeq',
    "\u225A": 'veeeq',
    "\u225C": 'trie',
    "\u225F": 'equest',
    "\u2261": 'equiv',
    "\u2262": 'nequiv',
    "\u2261\u20E5": 'bnequiv',
    "\u2264": 'le',
    "\u2270": 'nle',
    "\u2264\u20D2": 'nvle',
    "\u2265": 'ge',
    "\u2271": 'nge',
    "\u2265\u20D2": 'nvge',
    "\u2266": 'lE',
    "\u2266\u0338": 'nlE',
    "\u2267": 'gE',
    "\u2267\u0338": 'ngE',
    "\u2268\uFE00": 'lvnE',
    "\u2268": 'lnE',
    "\u2269": 'gnE',
    "\u2269\uFE00": 'gvnE',
    "\u226A": 'll',
    "\u226A\u0338": 'nLtv',
    "\u226A\u20D2": 'nLt',
    "\u226B": 'gg',
    "\u226B\u0338": 'nGtv',
    "\u226B\u20D2": 'nGt',
    "\u226C": 'twixt',
    "\u2272": 'lsim',
    "\u2274": 'nlsim',
    "\u2273": 'gsim',
    "\u2275": 'ngsim',
    "\u2276": 'lg',
    "\u2278": 'ntlg',
    "\u2277": 'gl',
    "\u2279": 'ntgl',
    "\u227A": 'pr',
    "\u2280": 'npr',
    "\u227B": 'sc',
    "\u2281": 'nsc',
    "\u227C": 'prcue',
    "\u22E0": 'nprcue',
    "\u227D": 'sccue',
    "\u22E1": 'nsccue',
    "\u227E": 'prsim',
    "\u227F": 'scsim',
    "\u227F\u0338": 'NotSucceedsTilde',
    "\u2282": 'sub',
    "\u2284": 'nsub',
    "\u2282\u20D2": 'vnsub',
    "\u2283": 'sup',
    "\u2285": 'nsup',
    "\u2283\u20D2": 'vnsup',
    "\u2286": 'sube',
    "\u2288": 'nsube',
    "\u2287": 'supe',
    "\u2289": 'nsupe',
    "\u228A\uFE00": 'vsubne',
    "\u228A": 'subne',
    "\u228B\uFE00": 'vsupne',
    "\u228B": 'supne',
    "\u228D": 'cupdot',
    "\u228E": 'uplus',
    "\u228F": 'sqsub',
    "\u228F\u0338": 'NotSquareSubset',
    "\u2290": 'sqsup',
    "\u2290\u0338": 'NotSquareSuperset',
    "\u2291": 'sqsube',
    "\u22E2": 'nsqsube',
    "\u2292": 'sqsupe',
    "\u22E3": 'nsqsupe',
    "\u2293": 'sqcap',
    "\u2293\uFE00": 'sqcaps',
    "\u2294": 'sqcup',
    "\u2294\uFE00": 'sqcups',
    "\u2295": 'oplus',
    "\u2296": 'ominus',
    "\u2297": 'otimes',
    "\u2298": 'osol',
    "\u2299": 'odot',
    "\u229A": 'ocir',
    "\u229B": 'oast',
    "\u229D": 'odash',
    "\u229E": 'plusb',
    "\u229F": 'minusb',
    "\u22A0": 'timesb',
    "\u22A1": 'sdotb',
    "\u22A2": 'vdash',
    "\u22AC": 'nvdash',
    "\u22A3": 'dashv',
    "\u22A4": 'top',
    "\u22A5": 'bot',
    "\u22A7": 'models',
    "\u22A8": 'vDash',
    "\u22AD": 'nvDash',
    "\u22A9": 'Vdash',
    "\u22AE": 'nVdash',
    "\u22AA": 'Vvdash',
    "\u22AB": 'VDash',
    "\u22AF": 'nVDash',
    "\u22B0": 'prurel',
    "\u22B2": 'vltri',
    "\u22EA": 'nltri',
    "\u22B3": 'vrtri',
    "\u22EB": 'nrtri',
    "\u22B4": 'ltrie',
    "\u22EC": 'nltrie',
    "\u22B4\u20D2": 'nvltrie',
    "\u22B5": 'rtrie',
    "\u22ED": 'nrtrie',
    "\u22B5\u20D2": 'nvrtrie',
    "\u22B6": 'origof',
    "\u22B7": 'imof',
    "\u22B8": 'mumap',
    "\u22B9": 'hercon',
    "\u22BA": 'intcal',
    "\u22BB": 'veebar',
    "\u22BD": 'barvee',
    "\u22BE": 'angrtvb',
    "\u22BF": 'lrtri',
    "\u22C0": 'Wedge',
    "\u22C1": 'Vee',
    "\u22C2": 'xcap',
    "\u22C3": 'xcup',
    "\u22C4": 'diam',
    "\u22C5": 'sdot',
    "\u22C6": 'Star',
    "\u22C7": 'divonx',
    "\u22C8": 'bowtie',
    "\u22C9": 'ltimes',
    "\u22CA": 'rtimes',
    "\u22CB": 'lthree',
    "\u22CC": 'rthree',
    "\u22CD": 'bsime',
    "\u22CE": 'cuvee',
    "\u22CF": 'cuwed',
    "\u22D0": 'Sub',
    "\u22D1": 'Sup',
    "\u22D2": 'Cap',
    "\u22D3": 'Cup',
    "\u22D4": 'fork',
    "\u22D5": 'epar',
    "\u22D6": 'ltdot',
    "\u22D7": 'gtdot',
    "\u22D8": 'Ll',
    "\u22D8\u0338": 'nLl',
    "\u22D9": 'Gg',
    "\u22D9\u0338": 'nGg',
    "\u22DA\uFE00": 'lesg',
    "\u22DA": 'leg',
    "\u22DB": 'gel',
    "\u22DB\uFE00": 'gesl',
    "\u22DE": 'cuepr',
    "\u22DF": 'cuesc',
    "\u22E6": 'lnsim',
    "\u22E7": 'gnsim',
    "\u22E8": 'prnsim',
    "\u22E9": 'scnsim',
    "\u22EE": 'vellip',
    "\u22EF": 'ctdot',
    "\u22F0": 'utdot',
    "\u22F1": 'dtdot',
    "\u22F2": 'disin',
    "\u22F3": 'isinsv',
    "\u22F4": 'isins',
    "\u22F5": 'isindot',
    "\u22F5\u0338": 'notindot',
    "\u22F6": 'notinvc',
    "\u22F7": 'notinvb',
    "\u22F9": 'isinE',
    "\u22F9\u0338": 'notinE',
    "\u22FA": 'nisd',
    "\u22FB": 'xnis',
    "\u22FC": 'nis',
    "\u22FD": 'notnivc',
    "\u22FE": 'notnivb',
    "\u2305": 'barwed',
    "\u2306": 'Barwed',
    "\u230C": 'drcrop',
    "\u230D": 'dlcrop',
    "\u230E": 'urcrop',
    "\u230F": 'ulcrop',
    "\u2310": 'bnot',
    "\u2312": 'profline',
    "\u2313": 'profsurf',
    "\u2315": 'telrec',
    "\u2316": 'target',
    "\u231C": 'ulcorn',
    "\u231D": 'urcorn',
    "\u231E": 'dlcorn',
    "\u231F": 'drcorn',
    "\u2322": 'frown',
    "\u2323": 'smile',
    "\u232D": 'cylcty',
    "\u232E": 'profalar',
    "\u2336": 'topbot',
    "\u233D": 'ovbar',
    "\u233F": 'solbar',
    "\u237C": 'angzarr',
    "\u23B0": 'lmoust',
    "\u23B1": 'rmoust',
    "\u23B4": 'tbrk',
    "\u23B5": 'bbrk',
    "\u23B6": 'bbrktbrk',
    "\u23DC": 'OverParenthesis',
    "\u23DD": 'UnderParenthesis',
    "\u23DE": 'OverBrace',
    "\u23DF": 'UnderBrace',
    "\u23E2": 'trpezium',
    "\u23E7": 'elinters',
    "\u2423": 'blank',
    "\u2500": 'boxh',
    "\u2502": 'boxv',
    "\u250C": 'boxdr',
    "\u2510": 'boxdl',
    "\u2514": 'boxur',
    "\u2518": 'boxul',
    "\u251C": 'boxvr',
    "\u2524": 'boxvl',
    "\u252C": 'boxhd',
    "\u2534": 'boxhu',
    "\u253C": 'boxvh',
    "\u2550": 'boxH',
    "\u2551": 'boxV',
    "\u2552": 'boxdR',
    "\u2553": 'boxDr',
    "\u2554": 'boxDR',
    "\u2555": 'boxdL',
    "\u2556": 'boxDl',
    "\u2557": 'boxDL',
    "\u2558": 'boxuR',
    "\u2559": 'boxUr',
    "\u255A": 'boxUR',
    "\u255B": 'boxuL',
    "\u255C": 'boxUl',
    "\u255D": 'boxUL',
    "\u255E": 'boxvR',
    "\u255F": 'boxVr',
    "\u2560": 'boxVR',
    "\u2561": 'boxvL',
    "\u2562": 'boxVl',
    "\u2563": 'boxVL',
    "\u2564": 'boxHd',
    "\u2565": 'boxhD',
    "\u2566": 'boxHD',
    "\u2567": 'boxHu',
    "\u2568": 'boxhU',
    "\u2569": 'boxHU',
    "\u256A": 'boxvH',
    "\u256B": 'boxVh',
    "\u256C": 'boxVH',
    "\u2580": 'uhblk',
    "\u2584": 'lhblk',
    "\u2588": 'block',
    "\u2591": 'blk14',
    "\u2592": 'blk12',
    "\u2593": 'blk34',
    "\u25A1": 'squ',
    "\u25AA": 'squf',
    "\u25AB": 'EmptyVerySmallSquare',
    "\u25AD": 'rect',
    "\u25AE": 'marker',
    "\u25B1": 'fltns',
    "\u25B3": 'xutri',
    "\u25B4": 'utrif',
    "\u25B5": 'utri',
    "\u25B8": 'rtrif',
    "\u25B9": 'rtri',
    "\u25BD": 'xdtri',
    "\u25BE": 'dtrif',
    "\u25BF": 'dtri',
    "\u25C2": 'ltrif',
    "\u25C3": 'ltri',
    "\u25CA": 'loz',
    "\u25CB": 'cir',
    "\u25EC": 'tridot',
    "\u25EF": 'xcirc',
    "\u25F8": 'ultri',
    "\u25F9": 'urtri',
    "\u25FA": 'lltri',
    "\u25FB": 'EmptySmallSquare',
    "\u25FC": 'FilledSmallSquare',
    "\u2605": 'starf',
    "\u2606": 'star',
    "\u260E": 'phone',
    "\u2640": 'female',
    "\u2642": 'male',
    "\u2660": 'spades',
    "\u2663": 'clubs',
    "\u2665": 'hearts',
    "\u2666": 'diams',
    "\u266A": 'sung',
    "\u2713": 'check',
    "\u2717": 'cross',
    "\u2720": 'malt',
    "\u2736": 'sext',
    "\u2758": 'VerticalSeparator',
    "\u27C8": 'bsolhsub',
    "\u27C9": 'suphsol',
    "\u27F5": 'xlarr',
    "\u27F6": 'xrarr',
    "\u27F7": 'xharr',
    "\u27F8": 'xlArr',
    "\u27F9": 'xrArr',
    "\u27FA": 'xhArr',
    "\u27FC": 'xmap',
    "\u27FF": 'dzigrarr',
    "\u2902": 'nvlArr',
    "\u2903": 'nvrArr',
    "\u2904": 'nvHarr',
    "\u2905": 'Map',
    "\u290C": 'lbarr',
    "\u290D": 'rbarr',
    "\u290E": 'lBarr',
    "\u290F": 'rBarr',
    "\u2910": 'RBarr',
    "\u2911": 'DDotrahd',
    "\u2912": 'UpArrowBar',
    "\u2913": 'DownArrowBar',
    "\u2916": 'Rarrtl',
    "\u2919": 'latail',
    "\u291A": 'ratail',
    "\u291B": 'lAtail',
    "\u291C": 'rAtail',
    "\u291D": 'larrfs',
    "\u291E": 'rarrfs',
    "\u291F": 'larrbfs',
    "\u2920": 'rarrbfs',
    "\u2923": 'nwarhk',
    "\u2924": 'nearhk',
    "\u2925": 'searhk',
    "\u2926": 'swarhk',
    "\u2927": 'nwnear',
    "\u2928": 'toea',
    "\u2929": 'tosa',
    "\u292A": 'swnwar',
    "\u2933": 'rarrc',
    "\u2933\u0338": 'nrarrc',
    "\u2935": 'cudarrr',
    "\u2936": 'ldca',
    "\u2937": 'rdca',
    "\u2938": 'cudarrl',
    "\u2939": 'larrpl',
    "\u293C": 'curarrm',
    "\u293D": 'cularrp',
    "\u2945": 'rarrpl',
    "\u2948": 'harrcir',
    "\u2949": 'Uarrocir',
    "\u294A": 'lurdshar',
    "\u294B": 'ldrushar',
    "\u294E": 'LeftRightVector',
    "\u294F": 'RightUpDownVector',
    "\u2950": 'DownLeftRightVector',
    "\u2951": 'LeftUpDownVector',
    "\u2952": 'LeftVectorBar',
    "\u2953": 'RightVectorBar',
    "\u2954": 'RightUpVectorBar',
    "\u2955": 'RightDownVectorBar',
    "\u2956": 'DownLeftVectorBar',
    "\u2957": 'DownRightVectorBar',
    "\u2958": 'LeftUpVectorBar',
    "\u2959": 'LeftDownVectorBar',
    "\u295A": 'LeftTeeVector',
    "\u295B": 'RightTeeVector',
    "\u295C": 'RightUpTeeVector',
    "\u295D": 'RightDownTeeVector',
    "\u295E": 'DownLeftTeeVector',
    "\u295F": 'DownRightTeeVector',
    "\u2960": 'LeftUpTeeVector',
    "\u2961": 'LeftDownTeeVector',
    "\u2962": 'lHar',
    "\u2963": 'uHar',
    "\u2964": 'rHar',
    "\u2965": 'dHar',
    "\u2966": 'luruhar',
    "\u2967": 'ldrdhar',
    "\u2968": 'ruluhar',
    "\u2969": 'rdldhar',
    "\u296A": 'lharul',
    "\u296B": 'llhard',
    "\u296C": 'rharul',
    "\u296D": 'lrhard',
    "\u296E": 'udhar',
    "\u296F": 'duhar',
    "\u2970": 'RoundImplies',
    "\u2971": 'erarr',
    "\u2972": 'simrarr',
    "\u2973": 'larrsim',
    "\u2974": 'rarrsim',
    "\u2975": 'rarrap',
    "\u2976": 'ltlarr',
    "\u2978": 'gtrarr',
    "\u2979": 'subrarr',
    "\u297B": 'suplarr',
    "\u297C": 'lfisht',
    "\u297D": 'rfisht',
    "\u297E": 'ufisht',
    "\u297F": 'dfisht',
    "\u299A": 'vzigzag',
    "\u299C": 'vangrt',
    "\u299D": 'angrtvbd',
    "\u29A4": 'ange',
    "\u29A5": 'range',
    "\u29A6": 'dwangle',
    "\u29A7": 'uwangle',
    "\u29A8": 'angmsdaa',
    "\u29A9": 'angmsdab',
    "\u29AA": 'angmsdac',
    "\u29AB": 'angmsdad',
    "\u29AC": 'angmsdae',
    "\u29AD": 'angmsdaf',
    "\u29AE": 'angmsdag',
    "\u29AF": 'angmsdah',
    "\u29B0": 'bemptyv',
    "\u29B1": 'demptyv',
    "\u29B2": 'cemptyv',
    "\u29B3": 'raemptyv',
    "\u29B4": 'laemptyv',
    "\u29B5": 'ohbar',
    "\u29B6": 'omid',
    "\u29B7": 'opar',
    "\u29B9": 'operp',
    "\u29BB": 'olcross',
    "\u29BC": 'odsold',
    "\u29BE": 'olcir',
    "\u29BF": 'ofcir',
    "\u29C0": 'olt',
    "\u29C1": 'ogt',
    "\u29C2": 'cirscir',
    "\u29C3": 'cirE',
    "\u29C4": 'solb',
    "\u29C5": 'bsolb',
    "\u29C9": 'boxbox',
    "\u29CD": 'trisb',
    "\u29CE": 'rtriltri',
    "\u29CF": 'LeftTriangleBar',
    "\u29CF\u0338": 'NotLeftTriangleBar',
    "\u29D0": 'RightTriangleBar',
    "\u29D0\u0338": 'NotRightTriangleBar',
    "\u29DC": 'iinfin',
    "\u29DD": 'infintie',
    "\u29DE": 'nvinfin',
    "\u29E3": 'eparsl',
    "\u29E4": 'smeparsl',
    "\u29E5": 'eqvparsl',
    "\u29EB": 'lozf',
    "\u29F4": 'RuleDelayed',
    "\u29F6": 'dsol',
    "\u2A00": 'xodot',
    "\u2A01": 'xoplus',
    "\u2A02": 'xotime',
    "\u2A04": 'xuplus',
    "\u2A06": 'xsqcup',
    "\u2A0D": 'fpartint',
    "\u2A10": 'cirfnint',
    "\u2A11": 'awint',
    "\u2A12": 'rppolint',
    "\u2A13": 'scpolint',
    "\u2A14": 'npolint',
    "\u2A15": 'pointint',
    "\u2A16": 'quatint',
    "\u2A17": 'intlarhk',
    "\u2A22": 'pluscir',
    "\u2A23": 'plusacir',
    "\u2A24": 'simplus',
    "\u2A25": 'plusdu',
    "\u2A26": 'plussim',
    "\u2A27": 'plustwo',
    "\u2A29": 'mcomma',
    "\u2A2A": 'minusdu',
    "\u2A2D": 'loplus',
    "\u2A2E": 'roplus',
    "\u2A2F": 'Cross',
    "\u2A30": 'timesd',
    "\u2A31": 'timesbar',
    "\u2A33": 'smashp',
    "\u2A34": 'lotimes',
    "\u2A35": 'rotimes',
    "\u2A36": 'otimesas',
    "\u2A37": 'Otimes',
    "\u2A38": 'odiv',
    "\u2A39": 'triplus',
    "\u2A3A": 'triminus',
    "\u2A3B": 'tritime',
    "\u2A3C": 'iprod',
    "\u2A3F": 'amalg',
    "\u2A40": 'capdot',
    "\u2A42": 'ncup',
    "\u2A43": 'ncap',
    "\u2A44": 'capand',
    "\u2A45": 'cupor',
    "\u2A46": 'cupcap',
    "\u2A47": 'capcup',
    "\u2A48": 'cupbrcap',
    "\u2A49": 'capbrcup',
    "\u2A4A": 'cupcup',
    "\u2A4B": 'capcap',
    "\u2A4C": 'ccups',
    "\u2A4D": 'ccaps',
    "\u2A50": 'ccupssm',
    "\u2A53": 'And',
    "\u2A54": 'Or',
    "\u2A55": 'andand',
    "\u2A56": 'oror',
    "\u2A57": 'orslope',
    "\u2A58": 'andslope',
    "\u2A5A": 'andv',
    "\u2A5B": 'orv',
    "\u2A5C": 'andd',
    "\u2A5D": 'ord',
    "\u2A5F": 'wedbar',
    "\u2A66": 'sdote',
    "\u2A6A": 'simdot',
    "\u2A6D": 'congdot',
    "\u2A6D\u0338": 'ncongdot',
    "\u2A6E": 'easter',
    "\u2A6F": 'apacir',
    "\u2A70": 'apE',
    "\u2A70\u0338": 'napE',
    "\u2A71": 'eplus',
    "\u2A72": 'pluse',
    "\u2A73": 'Esim',
    "\u2A77": 'eDDot',
    "\u2A78": 'equivDD',
    "\u2A79": 'ltcir',
    "\u2A7A": 'gtcir',
    "\u2A7B": 'ltquest',
    "\u2A7C": 'gtquest',
    "\u2A7D": 'les',
    "\u2A7D\u0338": 'nles',
    "\u2A7E": 'ges',
    "\u2A7E\u0338": 'nges',
    "\u2A7F": 'lesdot',
    "\u2A80": 'gesdot',
    "\u2A81": 'lesdoto',
    "\u2A82": 'gesdoto',
    "\u2A83": 'lesdotor',
    "\u2A84": 'gesdotol',
    "\u2A85": 'lap',
    "\u2A86": 'gap',
    "\u2A87": 'lne',
    "\u2A88": 'gne',
    "\u2A89": 'lnap',
    "\u2A8A": 'gnap',
    "\u2A8B": 'lEg',
    "\u2A8C": 'gEl',
    "\u2A8D": 'lsime',
    "\u2A8E": 'gsime',
    "\u2A8F": 'lsimg',
    "\u2A90": 'gsiml',
    "\u2A91": 'lgE',
    "\u2A92": 'glE',
    "\u2A93": 'lesges',
    "\u2A94": 'gesles',
    "\u2A95": 'els',
    "\u2A96": 'egs',
    "\u2A97": 'elsdot',
    "\u2A98": 'egsdot',
    "\u2A99": 'el',
    "\u2A9A": 'eg',
    "\u2A9D": 'siml',
    "\u2A9E": 'simg',
    "\u2A9F": 'simlE',
    "\u2AA0": 'simgE',
    "\u2AA1": 'LessLess',
    "\u2AA1\u0338": 'NotNestedLessLess',
    "\u2AA2": 'GreaterGreater',
    "\u2AA2\u0338": 'NotNestedGreaterGreater',
    "\u2AA4": 'glj',
    "\u2AA5": 'gla',
    "\u2AA6": 'ltcc',
    "\u2AA7": 'gtcc',
    "\u2AA8": 'lescc',
    "\u2AA9": 'gescc',
    "\u2AAA": 'smt',
    "\u2AAB": 'lat',
    "\u2AAC": 'smte',
    "\u2AAC\uFE00": 'smtes',
    "\u2AAD": 'late',
    "\u2AAD\uFE00": 'lates',
    "\u2AAE": 'bumpE',
    "\u2AAF": 'pre',
    "\u2AAF\u0338": 'npre',
    "\u2AB0": 'sce',
    "\u2AB0\u0338": 'nsce',
    "\u2AB3": 'prE',
    "\u2AB4": 'scE',
    "\u2AB5": 'prnE',
    "\u2AB6": 'scnE',
    "\u2AB7": 'prap',
    "\u2AB8": 'scap',
    "\u2AB9": 'prnap',
    "\u2ABA": 'scnap',
    "\u2ABB": 'Pr',
    "\u2ABC": 'Sc',
    "\u2ABD": 'subdot',
    "\u2ABE": 'supdot',
    "\u2ABF": 'subplus',
    "\u2AC0": 'supplus',
    "\u2AC1": 'submult',
    "\u2AC2": 'supmult',
    "\u2AC3": 'subedot',
    "\u2AC4": 'supedot',
    "\u2AC5": 'subE',
    "\u2AC5\u0338": 'nsubE',
    "\u2AC6": 'supE',
    "\u2AC6\u0338": 'nsupE',
    "\u2AC7": 'subsim',
    "\u2AC8": 'supsim',
    "\u2ACB\uFE00": 'vsubnE',
    "\u2ACB": 'subnE',
    "\u2ACC\uFE00": 'vsupnE',
    "\u2ACC": 'supnE',
    "\u2ACF": 'csub',
    "\u2AD0": 'csup',
    "\u2AD1": 'csube',
    "\u2AD2": 'csupe',
    "\u2AD3": 'subsup',
    "\u2AD4": 'supsub',
    "\u2AD5": 'subsub',
    "\u2AD6": 'supsup',
    "\u2AD7": 'suphsub',
    "\u2AD8": 'supdsub',
    "\u2AD9": 'forkv',
    "\u2ADA": 'topfork',
    "\u2ADB": 'mlcp',
    "\u2AE4": 'Dashv',
    "\u2AE6": 'Vdashl',
    "\u2AE7": 'Barv',
    "\u2AE8": 'vBar',
    "\u2AE9": 'vBarv',
    "\u2AEB": 'Vbar',
    "\u2AEC": 'Not',
    "\u2AED": 'bNot',
    "\u2AEE": 'rnmid',
    "\u2AEF": 'cirmid',
    "\u2AF0": 'midcir',
    "\u2AF1": 'topcir',
    "\u2AF2": 'nhpar',
    "\u2AF3": 'parsim',
    "\u2AFD": 'parsl',
    "\u2AFD\u20E5": 'nparsl',
    "\u266D": 'flat',
    "\u266E": 'natur',
    "\u266F": 'sharp',
    '\xA4': 'curren',
    '\xA2': 'cent',
    '$': 'dollar',
    '\xA3': 'pound',
    '\xA5': 'yen',
    "\u20AC": 'euro',
    '\xB9': 'sup1',
    '\xBD': 'half',
    "\u2153": 'frac13',
    '\xBC': 'frac14',
    "\u2155": 'frac15',
    "\u2159": 'frac16',
    "\u215B": 'frac18',
    '\xB2': 'sup2',
    "\u2154": 'frac23',
    "\u2156": 'frac25',
    '\xB3': 'sup3',
    '\xBE': 'frac34',
    "\u2157": 'frac35',
    "\u215C": 'frac38',
    "\u2158": 'frac45',
    "\u215A": 'frac56',
    "\u215D": 'frac58',
    "\u215E": 'frac78',
    "\uD835\uDCB6": 'ascr',
    "\uD835\uDD52": 'aopf',
    "\uD835\uDD1E": 'afr',
    "\uD835\uDD38": 'Aopf',
    "\uD835\uDD04": 'Afr',
    "\uD835\uDC9C": 'Ascr',
    '\xAA': 'ordf',
    '\xE1': 'aacute',
    '\xC1': 'Aacute',
    '\xE0': 'agrave',
    '\xC0': 'Agrave',
    "\u0103": 'abreve',
    "\u0102": 'Abreve',
    '\xE2': 'acirc',
    '\xC2': 'Acirc',
    '\xE5': 'aring',
    '\xC5': 'angst',
    '\xE4': 'auml',
    '\xC4': 'Auml',
    '\xE3': 'atilde',
    '\xC3': 'Atilde',
    "\u0105": 'aogon',
    "\u0104": 'Aogon',
    "\u0101": 'amacr',
    "\u0100": 'Amacr',
    '\xE6': 'aelig',
    '\xC6': 'AElig',
    "\uD835\uDCB7": 'bscr',
    "\uD835\uDD53": 'bopf',
    "\uD835\uDD1F": 'bfr',
    "\uD835\uDD39": 'Bopf',
    "\u212C": 'Bscr',
    "\uD835\uDD05": 'Bfr',
    "\uD835\uDD20": 'cfr',
    "\uD835\uDCB8": 'cscr',
    "\uD835\uDD54": 'copf',
    "\u212D": 'Cfr',
    "\uD835\uDC9E": 'Cscr',
    "\u2102": 'Copf',
    "\u0107": 'cacute',
    "\u0106": 'Cacute',
    "\u0109": 'ccirc',
    "\u0108": 'Ccirc',
    "\u010D": 'ccaron',
    "\u010C": 'Ccaron',
    "\u010B": 'cdot',
    "\u010A": 'Cdot',
    '\xE7': 'ccedil',
    '\xC7': 'Ccedil',
    "\u2105": 'incare',
    "\uD835\uDD21": 'dfr',
    "\u2146": 'dd',
    "\uD835\uDD55": 'dopf',
    "\uD835\uDCB9": 'dscr',
    "\uD835\uDC9F": 'Dscr',
    "\uD835\uDD07": 'Dfr',
    "\u2145": 'DD',
    "\uD835\uDD3B": 'Dopf',
    "\u010F": 'dcaron',
    "\u010E": 'Dcaron',
    "\u0111": 'dstrok',
    "\u0110": 'Dstrok',
    '\xF0': 'eth',
    '\xD0': 'ETH',
    "\u2147": 'ee',
    "\u212F": 'escr',
    "\uD835\uDD22": 'efr',
    "\uD835\uDD56": 'eopf',
    "\u2130": 'Escr',
    "\uD835\uDD08": 'Efr',
    "\uD835\uDD3C": 'Eopf',
    '\xE9': 'eacute',
    '\xC9': 'Eacute',
    '\xE8': 'egrave',
    '\xC8': 'Egrave',
    '\xEA': 'ecirc',
    '\xCA': 'Ecirc',
    "\u011B": 'ecaron',
    "\u011A": 'Ecaron',
    '\xEB': 'euml',
    '\xCB': 'Euml',
    "\u0117": 'edot',
    "\u0116": 'Edot',
    "\u0119": 'eogon',
    "\u0118": 'Eogon',
    "\u0113": 'emacr',
    "\u0112": 'Emacr',
    "\uD835\uDD23": 'ffr',
    "\uD835\uDD57": 'fopf',
    "\uD835\uDCBB": 'fscr',
    "\uD835\uDD09": 'Ffr',
    "\uD835\uDD3D": 'Fopf',
    "\u2131": 'Fscr',
    "\uFB00": 'fflig',
    "\uFB03": 'ffilig',
    "\uFB04": 'ffllig',
    "\uFB01": 'filig',
    'fj': 'fjlig',
    "\uFB02": 'fllig',
    "\u0192": 'fnof',
    "\u210A": 'gscr',
    "\uD835\uDD58": 'gopf',
    "\uD835\uDD24": 'gfr',
    "\uD835\uDCA2": 'Gscr',
    "\uD835\uDD3E": 'Gopf',
    "\uD835\uDD0A": 'Gfr',
    "\u01F5": 'gacute',
    "\u011F": 'gbreve',
    "\u011E": 'Gbreve',
    "\u011D": 'gcirc',
    "\u011C": 'Gcirc',
    "\u0121": 'gdot',
    "\u0120": 'Gdot',
    "\u0122": 'Gcedil',
    "\uD835\uDD25": 'hfr',
    "\u210E": 'planckh',
    "\uD835\uDCBD": 'hscr',
    "\uD835\uDD59": 'hopf',
    "\u210B": 'Hscr',
    "\u210C": 'Hfr',
    "\u210D": 'Hopf',
    "\u0125": 'hcirc',
    "\u0124": 'Hcirc',
    "\u210F": 'hbar',
    "\u0127": 'hstrok',
    "\u0126": 'Hstrok',
    "\uD835\uDD5A": 'iopf',
    "\uD835\uDD26": 'ifr',
    "\uD835\uDCBE": 'iscr',
    "\u2148": 'ii',
    "\uD835\uDD40": 'Iopf',
    "\u2110": 'Iscr',
    "\u2111": 'Im',
    '\xED': 'iacute',
    '\xCD': 'Iacute',
    '\xEC': 'igrave',
    '\xCC': 'Igrave',
    '\xEE': 'icirc',
    '\xCE': 'Icirc',
    '\xEF': 'iuml',
    '\xCF': 'Iuml',
    "\u0129": 'itilde',
    "\u0128": 'Itilde',
    "\u0130": 'Idot',
    "\u012F": 'iogon',
    "\u012E": 'Iogon',
    "\u012B": 'imacr',
    "\u012A": 'Imacr',
    "\u0133": 'ijlig',
    "\u0132": 'IJlig',
    "\u0131": 'imath',
    "\uD835\uDCBF": 'jscr',
    "\uD835\uDD5B": 'jopf',
    "\uD835\uDD27": 'jfr',
    "\uD835\uDCA5": 'Jscr',
    "\uD835\uDD0D": 'Jfr',
    "\uD835\uDD41": 'Jopf',
    "\u0135": 'jcirc',
    "\u0134": 'Jcirc',
    "\u0237": 'jmath',
    "\uD835\uDD5C": 'kopf',
    "\uD835\uDCC0": 'kscr',
    "\uD835\uDD28": 'kfr',
    "\uD835\uDCA6": 'Kscr',
    "\uD835\uDD42": 'Kopf',
    "\uD835\uDD0E": 'Kfr',
    "\u0137": 'kcedil',
    "\u0136": 'Kcedil',
    "\uD835\uDD29": 'lfr',
    "\uD835\uDCC1": 'lscr',
    "\u2113": 'ell',
    "\uD835\uDD5D": 'lopf',
    "\u2112": 'Lscr',
    "\uD835\uDD0F": 'Lfr',
    "\uD835\uDD43": 'Lopf',
    "\u013A": 'lacute',
    "\u0139": 'Lacute',
    "\u013E": 'lcaron',
    "\u013D": 'Lcaron',
    "\u013C": 'lcedil',
    "\u013B": 'Lcedil',
    "\u0142": 'lstrok',
    "\u0141": 'Lstrok',
    "\u0140": 'lmidot',
    "\u013F": 'Lmidot',
    "\uD835\uDD2A": 'mfr',
    "\uD835\uDD5E": 'mopf',
    "\uD835\uDCC2": 'mscr',
    "\uD835\uDD10": 'Mfr',
    "\uD835\uDD44": 'Mopf',
    "\u2133": 'Mscr',
    "\uD835\uDD2B": 'nfr',
    "\uD835\uDD5F": 'nopf',
    "\uD835\uDCC3": 'nscr',
    "\u2115": 'Nopf',
    "\uD835\uDCA9": 'Nscr',
    "\uD835\uDD11": 'Nfr',
    "\u0144": 'nacute',
    "\u0143": 'Nacute',
    "\u0148": 'ncaron',
    "\u0147": 'Ncaron',
    '\xF1': 'ntilde',
    '\xD1': 'Ntilde',
    "\u0146": 'ncedil',
    "\u0145": 'Ncedil',
    "\u2116": 'numero',
    "\u014B": 'eng',
    "\u014A": 'ENG',
    "\uD835\uDD60": 'oopf',
    "\uD835\uDD2C": 'ofr',
    "\u2134": 'oscr',
    "\uD835\uDCAA": 'Oscr',
    "\uD835\uDD12": 'Ofr',
    "\uD835\uDD46": 'Oopf',
    '\xBA': 'ordm',
    '\xF3': 'oacute',
    '\xD3': 'Oacute',
    '\xF2': 'ograve',
    '\xD2': 'Ograve',
    '\xF4': 'ocirc',
    '\xD4': 'Ocirc',
    '\xF6': 'ouml',
    '\xD6': 'Ouml',
    "\u0151": 'odblac',
    "\u0150": 'Odblac',
    '\xF5': 'otilde',
    '\xD5': 'Otilde',
    '\xF8': 'oslash',
    '\xD8': 'Oslash',
    "\u014D": 'omacr',
    "\u014C": 'Omacr',
    "\u0153": 'oelig',
    "\u0152": 'OElig',
    "\uD835\uDD2D": 'pfr',
    "\uD835\uDCC5": 'pscr',
    "\uD835\uDD61": 'popf',
    "\u2119": 'Popf',
    "\uD835\uDD13": 'Pfr',
    "\uD835\uDCAB": 'Pscr',
    "\uD835\uDD62": 'qopf',
    "\uD835\uDD2E": 'qfr',
    "\uD835\uDCC6": 'qscr',
    "\uD835\uDCAC": 'Qscr',
    "\uD835\uDD14": 'Qfr',
    "\u211A": 'Qopf',
    "\u0138": 'kgreen',
    "\uD835\uDD2F": 'rfr',
    "\uD835\uDD63": 'ropf',
    "\uD835\uDCC7": 'rscr',
    "\u211B": 'Rscr',
    "\u211C": 'Re',
    "\u211D": 'Ropf',
    "\u0155": 'racute',
    "\u0154": 'Racute',
    "\u0159": 'rcaron',
    "\u0158": 'Rcaron',
    "\u0157": 'rcedil',
    "\u0156": 'Rcedil',
    "\uD835\uDD64": 'sopf',
    "\uD835\uDCC8": 'sscr',
    "\uD835\uDD30": 'sfr',
    "\uD835\uDD4A": 'Sopf',
    "\uD835\uDD16": 'Sfr',
    "\uD835\uDCAE": 'Sscr',
    "\u24C8": 'oS',
    "\u015B": 'sacute',
    "\u015A": 'Sacute',
    "\u015D": 'scirc',
    "\u015C": 'Scirc',
    "\u0161": 'scaron',
    "\u0160": 'Scaron',
    "\u015F": 'scedil',
    "\u015E": 'Scedil',
    '\xDF': 'szlig',
    "\uD835\uDD31": 'tfr',
    "\uD835\uDCC9": 'tscr',
    "\uD835\uDD65": 'topf',
    "\uD835\uDCAF": 'Tscr',
    "\uD835\uDD17": 'Tfr',
    "\uD835\uDD4B": 'Topf',
    "\u0165": 'tcaron',
    "\u0164": 'Tcaron',
    "\u0163": 'tcedil',
    "\u0162": 'Tcedil',
    "\u2122": 'trade',
    "\u0167": 'tstrok',
    "\u0166": 'Tstrok',
    "\uD835\uDCCA": 'uscr',
    "\uD835\uDD66": 'uopf',
    "\uD835\uDD32": 'ufr',
    "\uD835\uDD4C": 'Uopf',
    "\uD835\uDD18": 'Ufr',
    "\uD835\uDCB0": 'Uscr',
    '\xFA': 'uacute',
    '\xDA': 'Uacute',
    '\xF9': 'ugrave',
    '\xD9': 'Ugrave',
    "\u016D": 'ubreve',
    "\u016C": 'Ubreve',
    '\xFB': 'ucirc',
    '\xDB': 'Ucirc',
    "\u016F": 'uring',
    "\u016E": 'Uring',
    '\xFC': 'uuml',
    '\xDC': 'Uuml',
    "\u0171": 'udblac',
    "\u0170": 'Udblac',
    "\u0169": 'utilde',
    "\u0168": 'Utilde',
    "\u0173": 'uogon',
    "\u0172": 'Uogon',
    "\u016B": 'umacr',
    "\u016A": 'Umacr',
    "\uD835\uDD33": 'vfr',
    "\uD835\uDD67": 'vopf',
    "\uD835\uDCCB": 'vscr',
    "\uD835\uDD19": 'Vfr',
    "\uD835\uDD4D": 'Vopf',
    "\uD835\uDCB1": 'Vscr',
    "\uD835\uDD68": 'wopf',
    "\uD835\uDCCC": 'wscr',
    "\uD835\uDD34": 'wfr',
    "\uD835\uDCB2": 'Wscr',
    "\uD835\uDD4E": 'Wopf',
    "\uD835\uDD1A": 'Wfr',
    "\u0175": 'wcirc',
    "\u0174": 'Wcirc',
    "\uD835\uDD35": 'xfr',
    "\uD835\uDCCD": 'xscr',
    "\uD835\uDD69": 'xopf',
    "\uD835\uDD4F": 'Xopf',
    "\uD835\uDD1B": 'Xfr',
    "\uD835\uDCB3": 'Xscr',
    "\uD835\uDD36": 'yfr',
    "\uD835\uDCCE": 'yscr',
    "\uD835\uDD6A": 'yopf',
    "\uD835\uDCB4": 'Yscr',
    "\uD835\uDD1C": 'Yfr',
    "\uD835\uDD50": 'Yopf',
    '\xFD': 'yacute',
    '\xDD': 'Yacute',
    "\u0177": 'ycirc',
    "\u0176": 'Ycirc',
    '\xFF': 'yuml',
    "\u0178": 'Yuml',
    "\uD835\uDCCF": 'zscr',
    "\uD835\uDD37": 'zfr',
    "\uD835\uDD6B": 'zopf',
    "\u2128": 'Zfr',
    "\u2124": 'Zopf',
    "\uD835\uDCB5": 'Zscr',
    "\u017A": 'zacute',
    "\u0179": 'Zacute',
    "\u017E": 'zcaron',
    "\u017D": 'Zcaron',
    "\u017C": 'zdot',
    "\u017B": 'Zdot',
    "\u01B5": 'imped',
    '\xFE': 'thorn',
    '\xDE': 'THORN',
    "\u0149": 'napos',
    "\u03B1": 'alpha',
    "\u0391": 'Alpha',
    "\u03B2": 'beta',
    "\u0392": 'Beta',
    "\u03B3": 'gamma',
    "\u0393": 'Gamma',
    "\u03B4": 'delta',
    "\u0394": 'Delta',
    "\u03B5": 'epsi',
    "\u03F5": 'epsiv',
    "\u0395": 'Epsilon',
    "\u03DD": 'gammad',
    "\u03DC": 'Gammad',
    "\u03B6": 'zeta',
    "\u0396": 'Zeta',
    "\u03B7": 'eta',
    "\u0397": 'Eta',
    "\u03B8": 'theta',
    "\u03D1": 'thetav',
    "\u0398": 'Theta',
    "\u03B9": 'iota',
    "\u0399": 'Iota',
    "\u03BA": 'kappa',
    "\u03F0": 'kappav',
    "\u039A": 'Kappa',
    "\u03BB": 'lambda',
    "\u039B": 'Lambda',
    "\u03BC": 'mu',
    '\xB5': 'micro',
    "\u039C": 'Mu',
    "\u03BD": 'nu',
    "\u039D": 'Nu',
    "\u03BE": 'xi',
    "\u039E": 'Xi',
    "\u03BF": 'omicron',
    "\u039F": 'Omicron',
    "\u03C0": 'pi',
    "\u03D6": 'piv',
    "\u03A0": 'Pi',
    "\u03C1": 'rho',
    "\u03F1": 'rhov',
    "\u03A1": 'Rho',
    "\u03C3": 'sigma',
    "\u03A3": 'Sigma',
    "\u03C2": 'sigmaf',
    "\u03C4": 'tau',
    "\u03A4": 'Tau',
    "\u03C5": 'upsi',
    "\u03A5": 'Upsilon',
    "\u03D2": 'Upsi',
    "\u03C6": 'phi',
    "\u03D5": 'phiv',
    "\u03A6": 'Phi',
    "\u03C7": 'chi',
    "\u03A7": 'Chi',
    "\u03C8": 'psi',
    "\u03A8": 'Psi',
    "\u03C9": 'omega',
    "\u03A9": 'ohm',
    "\u0430": 'acy',
    "\u0410": 'Acy',
    "\u0431": 'bcy',
    "\u0411": 'Bcy',
    "\u0432": 'vcy',
    "\u0412": 'Vcy',
    "\u0433": 'gcy',
    "\u0413": 'Gcy',
    "\u0453": 'gjcy',
    "\u0403": 'GJcy',
    "\u0434": 'dcy',
    "\u0414": 'Dcy',
    "\u0452": 'djcy',
    "\u0402": 'DJcy',
    "\u0435": 'iecy',
    "\u0415": 'IEcy',
    "\u0451": 'iocy',
    "\u0401": 'IOcy',
    "\u0454": 'jukcy',
    "\u0404": 'Jukcy',
    "\u0436": 'zhcy',
    "\u0416": 'ZHcy',
    "\u0437": 'zcy',
    "\u0417": 'Zcy',
    "\u0455": 'dscy',
    "\u0405": 'DScy',
    "\u0438": 'icy',
    "\u0418": 'Icy',
    "\u0456": 'iukcy',
    "\u0406": 'Iukcy',
    "\u0457": 'yicy',
    "\u0407": 'YIcy',
    "\u0439": 'jcy',
    "\u0419": 'Jcy',
    "\u0458": 'jsercy',
    "\u0408": 'Jsercy',
    "\u043A": 'kcy',
    "\u041A": 'Kcy',
    "\u045C": 'kjcy',
    "\u040C": 'KJcy',
    "\u043B": 'lcy',
    "\u041B": 'Lcy',
    "\u0459": 'ljcy',
    "\u0409": 'LJcy',
    "\u043C": 'mcy',
    "\u041C": 'Mcy',
    "\u043D": 'ncy',
    "\u041D": 'Ncy',
    "\u045A": 'njcy',
    "\u040A": 'NJcy',
    "\u043E": 'ocy',
    "\u041E": 'Ocy',
    "\u043F": 'pcy',
    "\u041F": 'Pcy',
    "\u0440": 'rcy',
    "\u0420": 'Rcy',
    "\u0441": 'scy',
    "\u0421": 'Scy',
    "\u0442": 'tcy',
    "\u0422": 'Tcy',
    "\u045B": 'tshcy',
    "\u040B": 'TSHcy',
    "\u0443": 'ucy',
    "\u0423": 'Ucy',
    "\u045E": 'ubrcy',
    "\u040E": 'Ubrcy',
    "\u0444": 'fcy',
    "\u0424": 'Fcy',
    "\u0445": 'khcy',
    "\u0425": 'KHcy',
    "\u0446": 'tscy',
    "\u0426": 'TScy',
    "\u0447": 'chcy',
    "\u0427": 'CHcy',
    "\u045F": 'dzcy',
    "\u040F": 'DZcy',
    "\u0448": 'shcy',
    "\u0428": 'SHcy',
    "\u0449": 'shchcy',
    "\u0429": 'SHCHcy',
    "\u044A": 'hardcy',
    "\u042A": 'HARDcy',
    "\u044B": 'ycy',
    "\u042B": 'Ycy',
    "\u044C": 'softcy',
    "\u042C": 'SOFTcy',
    "\u044D": 'ecy',
    "\u042D": 'Ecy',
    "\u044E": 'yucy',
    "\u042E": 'YUcy',
    "\u044F": 'yacy',
    "\u042F": 'YAcy',
    "\u2135": 'aleph',
    "\u2136": 'beth',
    "\u2137": 'gimel',
    "\u2138": 'daleth'
  };
  var regexEscape = /["&'<>`]/g;
  var escapeMap = {
    '"': '&quot;',
    '&': '&amp;',
    '\'': '&#x27;',
    '<': '&lt;',
    // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
    // following is not strictly necessary unless it’s part of a tag or an
    // unquoted attribute value. We’re only escaping it to support those
    // situations, and for XML support.
    '>': '&gt;',
    // In Internet Explorer ≤ 8, the backtick character can be used
    // to break out of (un)quoted attribute values or HTML comments.
    // See http://html5sec.org/#102, http://html5sec.org/#108, and
    // http://html5sec.org/#133.
    '`': '&#x60;'
  };
  var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
  var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
  var decodeMap = {
    'aacute': '\xE1',
    'Aacute': '\xC1',
    'abreve': "\u0103",
    'Abreve': "\u0102",
    'ac': "\u223E",
    'acd': "\u223F",
    'acE': "\u223E\u0333",
    'acirc': '\xE2',
    'Acirc': '\xC2',
    'acute': '\xB4',
    'acy': "\u0430",
    'Acy': "\u0410",
    'aelig': '\xE6',
    'AElig': '\xC6',
    'af': "\u2061",
    'afr': "\uD835\uDD1E",
    'Afr': "\uD835\uDD04",
    'agrave': '\xE0',
    'Agrave': '\xC0',
    'alefsym': "\u2135",
    'aleph': "\u2135",
    'alpha': "\u03B1",
    'Alpha': "\u0391",
    'amacr': "\u0101",
    'Amacr': "\u0100",
    'amalg': "\u2A3F",
    'amp': '&',
    'AMP': '&',
    'and': "\u2227",
    'And': "\u2A53",
    'andand': "\u2A55",
    'andd': "\u2A5C",
    'andslope': "\u2A58",
    'andv': "\u2A5A",
    'ang': "\u2220",
    'ange': "\u29A4",
    'angle': "\u2220",
    'angmsd': "\u2221",
    'angmsdaa': "\u29A8",
    'angmsdab': "\u29A9",
    'angmsdac': "\u29AA",
    'angmsdad': "\u29AB",
    'angmsdae': "\u29AC",
    'angmsdaf': "\u29AD",
    'angmsdag': "\u29AE",
    'angmsdah': "\u29AF",
    'angrt': "\u221F",
    'angrtvb': "\u22BE",
    'angrtvbd': "\u299D",
    'angsph': "\u2222",
    'angst': '\xC5',
    'angzarr': "\u237C",
    'aogon': "\u0105",
    'Aogon': "\u0104",
    'aopf': "\uD835\uDD52",
    'Aopf': "\uD835\uDD38",
    'ap': "\u2248",
    'apacir': "\u2A6F",
    'ape': "\u224A",
    'apE': "\u2A70",
    'apid': "\u224B",
    'apos': '\'',
    'ApplyFunction': "\u2061",
    'approx': "\u2248",
    'approxeq': "\u224A",
    'aring': '\xE5',
    'Aring': '\xC5',
    'ascr': "\uD835\uDCB6",
    'Ascr': "\uD835\uDC9C",
    'Assign': "\u2254",
    'ast': '*',
    'asymp': "\u2248",
    'asympeq': "\u224D",
    'atilde': '\xE3',
    'Atilde': '\xC3',
    'auml': '\xE4',
    'Auml': '\xC4',
    'awconint': "\u2233",
    'awint': "\u2A11",
    'backcong': "\u224C",
    'backepsilon': "\u03F6",
    'backprime': "\u2035",
    'backsim': "\u223D",
    'backsimeq': "\u22CD",
    'Backslash': "\u2216",
    'Barv': "\u2AE7",
    'barvee': "\u22BD",
    'barwed': "\u2305",
    'Barwed': "\u2306",
    'barwedge': "\u2305",
    'bbrk': "\u23B5",
    'bbrktbrk': "\u23B6",
    'bcong': "\u224C",
    'bcy': "\u0431",
    'Bcy': "\u0411",
    'bdquo': "\u201E",
    'becaus': "\u2235",
    'because': "\u2235",
    'Because': "\u2235",
    'bemptyv': "\u29B0",
    'bepsi': "\u03F6",
    'bernou': "\u212C",
    'Bernoullis': "\u212C",
    'beta': "\u03B2",
    'Beta': "\u0392",
    'beth': "\u2136",
    'between': "\u226C",
    'bfr': "\uD835\uDD1F",
    'Bfr': "\uD835\uDD05",
    'bigcap': "\u22C2",
    'bigcirc': "\u25EF",
    'bigcup': "\u22C3",
    'bigodot': "\u2A00",
    'bigoplus': "\u2A01",
    'bigotimes': "\u2A02",
    'bigsqcup': "\u2A06",
    'bigstar': "\u2605",
    'bigtriangledown': "\u25BD",
    'bigtriangleup': "\u25B3",
    'biguplus': "\u2A04",
    'bigvee': "\u22C1",
    'bigwedge': "\u22C0",
    'bkarow': "\u290D",
    'blacklozenge': "\u29EB",
    'blacksquare': "\u25AA",
    'blacktriangle': "\u25B4",
    'blacktriangledown': "\u25BE",
    'blacktriangleleft': "\u25C2",
    'blacktriangleright': "\u25B8",
    'blank': "\u2423",
    'blk12': "\u2592",
    'blk14': "\u2591",
    'blk34': "\u2593",
    'block': "\u2588",
    'bne': "=\u20E5",
    'bnequiv': "\u2261\u20E5",
    'bnot': "\u2310",
    'bNot': "\u2AED",
    'bopf': "\uD835\uDD53",
    'Bopf': "\uD835\uDD39",
    'bot': "\u22A5",
    'bottom': "\u22A5",
    'bowtie': "\u22C8",
    'boxbox': "\u29C9",
    'boxdl': "\u2510",
    'boxdL': "\u2555",
    'boxDl': "\u2556",
    'boxDL': "\u2557",
    'boxdr': "\u250C",
    'boxdR': "\u2552",
    'boxDr': "\u2553",
    'boxDR': "\u2554",
    'boxh': "\u2500",
    'boxH': "\u2550",
    'boxhd': "\u252C",
    'boxhD': "\u2565",
    'boxHd': "\u2564",
    'boxHD': "\u2566",
    'boxhu': "\u2534",
    'boxhU': "\u2568",
    'boxHu': "\u2567",
    'boxHU': "\u2569",
    'boxminus': "\u229F",
    'boxplus': "\u229E",
    'boxtimes': "\u22A0",
    'boxul': "\u2518",
    'boxuL': "\u255B",
    'boxUl': "\u255C",
    'boxUL': "\u255D",
    'boxur': "\u2514",
    'boxuR': "\u2558",
    'boxUr': "\u2559",
    'boxUR': "\u255A",
    'boxv': "\u2502",
    'boxV': "\u2551",
    'boxvh': "\u253C",
    'boxvH': "\u256A",
    'boxVh': "\u256B",
    'boxVH': "\u256C",
    'boxvl': "\u2524",
    'boxvL': "\u2561",
    'boxVl': "\u2562",
    'boxVL': "\u2563",
    'boxvr': "\u251C",
    'boxvR': "\u255E",
    'boxVr': "\u255F",
    'boxVR': "\u2560",
    'bprime': "\u2035",
    'breve': "\u02D8",
    'Breve': "\u02D8",
    'brvbar': '\xA6',
    'bscr': "\uD835\uDCB7",
    'Bscr': "\u212C",
    'bsemi': "\u204F",
    'bsim': "\u223D",
    'bsime': "\u22CD",
    'bsol': '\\',
    'bsolb': "\u29C5",
    'bsolhsub': "\u27C8",
    'bull': "\u2022",
    'bullet': "\u2022",
    'bump': "\u224E",
    'bumpe': "\u224F",
    'bumpE': "\u2AAE",
    'bumpeq': "\u224F",
    'Bumpeq': "\u224E",
    'cacute': "\u0107",
    'Cacute': "\u0106",
    'cap': "\u2229",
    'Cap': "\u22D2",
    'capand': "\u2A44",
    'capbrcup': "\u2A49",
    'capcap': "\u2A4B",
    'capcup': "\u2A47",
    'capdot': "\u2A40",
    'CapitalDifferentialD': "\u2145",
    'caps': "\u2229\uFE00",
    'caret': "\u2041",
    'caron': "\u02C7",
    'Cayleys': "\u212D",
    'ccaps': "\u2A4D",
    'ccaron': "\u010D",
    'Ccaron': "\u010C",
    'ccedil': '\xE7',
    'Ccedil': '\xC7',
    'ccirc': "\u0109",
    'Ccirc': "\u0108",
    'Cconint': "\u2230",
    'ccups': "\u2A4C",
    'ccupssm': "\u2A50",
    'cdot': "\u010B",
    'Cdot': "\u010A",
    'cedil': '\xB8',
    'Cedilla': '\xB8',
    'cemptyv': "\u29B2",
    'cent': '\xA2',
    'centerdot': '\xB7',
    'CenterDot': '\xB7',
    'cfr': "\uD835\uDD20",
    'Cfr': "\u212D",
    'chcy': "\u0447",
    'CHcy': "\u0427",
    'check': "\u2713",
    'checkmark': "\u2713",
    'chi': "\u03C7",
    'Chi': "\u03A7",
    'cir': "\u25CB",
    'circ': "\u02C6",
    'circeq': "\u2257",
    'circlearrowleft': "\u21BA",
    'circlearrowright': "\u21BB",
    'circledast': "\u229B",
    'circledcirc': "\u229A",
    'circleddash': "\u229D",
    'CircleDot': "\u2299",
    'circledR': '\xAE',
    'circledS': "\u24C8",
    'CircleMinus': "\u2296",
    'CirclePlus': "\u2295",
    'CircleTimes': "\u2297",
    'cire': "\u2257",
    'cirE': "\u29C3",
    'cirfnint': "\u2A10",
    'cirmid': "\u2AEF",
    'cirscir': "\u29C2",
    'ClockwiseContourIntegral': "\u2232",
    'CloseCurlyDoubleQuote': "\u201D",
    'CloseCurlyQuote': "\u2019",
    'clubs': "\u2663",
    'clubsuit': "\u2663",
    'colon': ':',
    'Colon': "\u2237",
    'colone': "\u2254",
    'Colone': "\u2A74",
    'coloneq': "\u2254",
    'comma': ',',
    'commat': '@',
    'comp': "\u2201",
    'compfn': "\u2218",
    'complement': "\u2201",
    'complexes': "\u2102",
    'cong': "\u2245",
    'congdot': "\u2A6D",
    'Congruent': "\u2261",
    'conint': "\u222E",
    'Conint': "\u222F",
    'ContourIntegral': "\u222E",
    'copf': "\uD835\uDD54",
    'Copf': "\u2102",
    'coprod': "\u2210",
    'Coproduct': "\u2210",
    'copy': '\xA9',
    'COPY': '\xA9',
    'copysr': "\u2117",
    'CounterClockwiseContourIntegral': "\u2233",
    'crarr': "\u21B5",
    'cross': "\u2717",
    'Cross': "\u2A2F",
    'cscr': "\uD835\uDCB8",
    'Cscr': "\uD835\uDC9E",
    'csub': "\u2ACF",
    'csube': "\u2AD1",
    'csup': "\u2AD0",
    'csupe': "\u2AD2",
    'ctdot': "\u22EF",
    'cudarrl': "\u2938",
    'cudarrr': "\u2935",
    'cuepr': "\u22DE",
    'cuesc': "\u22DF",
    'cularr': "\u21B6",
    'cularrp': "\u293D",
    'cup': "\u222A",
    'Cup': "\u22D3",
    'cupbrcap': "\u2A48",
    'cupcap': "\u2A46",
    'CupCap': "\u224D",
    'cupcup': "\u2A4A",
    'cupdot': "\u228D",
    'cupor': "\u2A45",
    'cups': "\u222A\uFE00",
    'curarr': "\u21B7",
    'curarrm': "\u293C",
    'curlyeqprec': "\u22DE",
    'curlyeqsucc': "\u22DF",
    'curlyvee': "\u22CE",
    'curlywedge': "\u22CF",
    'curren': '\xA4',
    'curvearrowleft': "\u21B6",
    'curvearrowright': "\u21B7",
    'cuvee': "\u22CE",
    'cuwed': "\u22CF",
    'cwconint': "\u2232",
    'cwint': "\u2231",
    'cylcty': "\u232D",
    'dagger': "\u2020",
    'Dagger': "\u2021",
    'daleth': "\u2138",
    'darr': "\u2193",
    'dArr': "\u21D3",
    'Darr': "\u21A1",
    'dash': "\u2010",
    'dashv': "\u22A3",
    'Dashv': "\u2AE4",
    'dbkarow': "\u290F",
    'dblac': "\u02DD",
    'dcaron': "\u010F",
    'Dcaron': "\u010E",
    'dcy': "\u0434",
    'Dcy': "\u0414",
    'dd': "\u2146",
    'DD': "\u2145",
    'ddagger': "\u2021",
    'ddarr': "\u21CA",
    'DDotrahd': "\u2911",
    'ddotseq': "\u2A77",
    'deg': '\xB0',
    'Del': "\u2207",
    'delta': "\u03B4",
    'Delta': "\u0394",
    'demptyv': "\u29B1",
    'dfisht': "\u297F",
    'dfr': "\uD835\uDD21",
    'Dfr': "\uD835\uDD07",
    'dHar': "\u2965",
    'dharl': "\u21C3",
    'dharr': "\u21C2",
    'DiacriticalAcute': '\xB4',
    'DiacriticalDot': "\u02D9",
    'DiacriticalDoubleAcute': "\u02DD",
    'DiacriticalGrave': '`',
    'DiacriticalTilde': "\u02DC",
    'diam': "\u22C4",
    'diamond': "\u22C4",
    'Diamond': "\u22C4",
    'diamondsuit': "\u2666",
    'diams': "\u2666",
    'die': '\xA8',
    'DifferentialD': "\u2146",
    'digamma': "\u03DD",
    'disin': "\u22F2",
    'div': '\xF7',
    'divide': '\xF7',
    'divideontimes': "\u22C7",
    'divonx': "\u22C7",
    'djcy': "\u0452",
    'DJcy': "\u0402",
    'dlcorn': "\u231E",
    'dlcrop': "\u230D",
    'dollar': '$',
    'dopf': "\uD835\uDD55",
    'Dopf': "\uD835\uDD3B",
    'dot': "\u02D9",
    'Dot': '\xA8',
    'DotDot': "\u20DC",
    'doteq': "\u2250",
    'doteqdot': "\u2251",
    'DotEqual': "\u2250",
    'dotminus': "\u2238",
    'dotplus': "\u2214",
    'dotsquare': "\u22A1",
    'doublebarwedge': "\u2306",
    'DoubleContourIntegral': "\u222F",
    'DoubleDot': '\xA8',
    'DoubleDownArrow': "\u21D3",
    'DoubleLeftArrow': "\u21D0",
    'DoubleLeftRightArrow': "\u21D4",
    'DoubleLeftTee': "\u2AE4",
    'DoubleLongLeftArrow': "\u27F8",
    'DoubleLongLeftRightArrow': "\u27FA",
    'DoubleLongRightArrow': "\u27F9",
    'DoubleRightArrow': "\u21D2",
    'DoubleRightTee': "\u22A8",
    'DoubleUpArrow': "\u21D1",
    'DoubleUpDownArrow': "\u21D5",
    'DoubleVerticalBar': "\u2225",
    'downarrow': "\u2193",
    'Downarrow': "\u21D3",
    'DownArrow': "\u2193",
    'DownArrowBar': "\u2913",
    'DownArrowUpArrow': "\u21F5",
    'DownBreve': "\u0311",
    'downdownarrows': "\u21CA",
    'downharpoonleft': "\u21C3",
    'downharpoonright': "\u21C2",
    'DownLeftRightVector': "\u2950",
    'DownLeftTeeVector': "\u295E",
    'DownLeftVector': "\u21BD",
    'DownLeftVectorBar': "\u2956",
    'DownRightTeeVector': "\u295F",
    'DownRightVector': "\u21C1",
    'DownRightVectorBar': "\u2957",
    'DownTee': "\u22A4",
    'DownTeeArrow': "\u21A7",
    'drbkarow': "\u2910",
    'drcorn': "\u231F",
    'drcrop': "\u230C",
    'dscr': "\uD835\uDCB9",
    'Dscr': "\uD835\uDC9F",
    'dscy': "\u0455",
    'DScy': "\u0405",
    'dsol': "\u29F6",
    'dstrok': "\u0111",
    'Dstrok': "\u0110",
    'dtdot': "\u22F1",
    'dtri': "\u25BF",
    'dtrif': "\u25BE",
    'duarr': "\u21F5",
    'duhar': "\u296F",
    'dwangle': "\u29A6",
    'dzcy': "\u045F",
    'DZcy': "\u040F",
    'dzigrarr': "\u27FF",
    'eacute': '\xE9',
    'Eacute': '\xC9',
    'easter': "\u2A6E",
    'ecaron': "\u011B",
    'Ecaron': "\u011A",
    'ecir': "\u2256",
    'ecirc': '\xEA',
    'Ecirc': '\xCA',
    'ecolon': "\u2255",
    'ecy': "\u044D",
    'Ecy': "\u042D",
    'eDDot': "\u2A77",
    'edot': "\u0117",
    'eDot': "\u2251",
    'Edot': "\u0116",
    'ee': "\u2147",
    'efDot': "\u2252",
    'efr': "\uD835\uDD22",
    'Efr': "\uD835\uDD08",
    'eg': "\u2A9A",
    'egrave': '\xE8',
    'Egrave': '\xC8',
    'egs': "\u2A96",
    'egsdot': "\u2A98",
    'el': "\u2A99",
    'Element': "\u2208",
    'elinters': "\u23E7",
    'ell': "\u2113",
    'els': "\u2A95",
    'elsdot': "\u2A97",
    'emacr': "\u0113",
    'Emacr': "\u0112",
    'empty': "\u2205",
    'emptyset': "\u2205",
    'EmptySmallSquare': "\u25FB",
    'emptyv': "\u2205",
    'EmptyVerySmallSquare': "\u25AB",
    'emsp': "\u2003",
    'emsp13': "\u2004",
    'emsp14': "\u2005",
    'eng': "\u014B",
    'ENG': "\u014A",
    'ensp': "\u2002",
    'eogon': "\u0119",
    'Eogon': "\u0118",
    'eopf': "\uD835\uDD56",
    'Eopf': "\uD835\uDD3C",
    'epar': "\u22D5",
    'eparsl': "\u29E3",
    'eplus': "\u2A71",
    'epsi': "\u03B5",
    'epsilon': "\u03B5",
    'Epsilon': "\u0395",
    'epsiv': "\u03F5",
    'eqcirc': "\u2256",
    'eqcolon': "\u2255",
    'eqsim': "\u2242",
    'eqslantgtr': "\u2A96",
    'eqslantless': "\u2A95",
    'Equal': "\u2A75",
    'equals': '=',
    'EqualTilde': "\u2242",
    'equest': "\u225F",
    'Equilibrium': "\u21CC",
    'equiv': "\u2261",
    'equivDD': "\u2A78",
    'eqvparsl': "\u29E5",
    'erarr': "\u2971",
    'erDot': "\u2253",
    'escr': "\u212F",
    'Escr': "\u2130",
    'esdot': "\u2250",
    'esim': "\u2242",
    'Esim': "\u2A73",
    'eta': "\u03B7",
    'Eta': "\u0397",
    'eth': '\xF0',
    'ETH': '\xD0',
    'euml': '\xEB',
    'Euml': '\xCB',
    'euro': "\u20AC",
    'excl': '!',
    'exist': "\u2203",
    'Exists': "\u2203",
    'expectation': "\u2130",
    'exponentiale': "\u2147",
    'ExponentialE': "\u2147",
    'fallingdotseq': "\u2252",
    'fcy': "\u0444",
    'Fcy': "\u0424",
    'female': "\u2640",
    'ffilig': "\uFB03",
    'fflig': "\uFB00",
    'ffllig': "\uFB04",
    'ffr': "\uD835\uDD23",
    'Ffr': "\uD835\uDD09",
    'filig': "\uFB01",
    'FilledSmallSquare': "\u25FC",
    'FilledVerySmallSquare': "\u25AA",
    'fjlig': 'fj',
    'flat': "\u266D",
    'fllig': "\uFB02",
    'fltns': "\u25B1",
    'fnof': "\u0192",
    'fopf': "\uD835\uDD57",
    'Fopf': "\uD835\uDD3D",
    'forall': "\u2200",
    'ForAll': "\u2200",
    'fork': "\u22D4",
    'forkv': "\u2AD9",
    'Fouriertrf': "\u2131",
    'fpartint': "\u2A0D",
    'frac12': '\xBD',
    'frac13': "\u2153",
    'frac14': '\xBC',
    'frac15': "\u2155",
    'frac16': "\u2159",
    'frac18': "\u215B",
    'frac23': "\u2154",
    'frac25': "\u2156",
    'frac34': '\xBE',
    'frac35': "\u2157",
    'frac38': "\u215C",
    'frac45': "\u2158",
    'frac56': "\u215A",
    'frac58': "\u215D",
    'frac78': "\u215E",
    'frasl': "\u2044",
    'frown': "\u2322",
    'fscr': "\uD835\uDCBB",
    'Fscr': "\u2131",
    'gacute': "\u01F5",
    'gamma': "\u03B3",
    'Gamma': "\u0393",
    'gammad': "\u03DD",
    'Gammad': "\u03DC",
    'gap': "\u2A86",
    'gbreve': "\u011F",
    'Gbreve': "\u011E",
    'Gcedil': "\u0122",
    'gcirc': "\u011D",
    'Gcirc': "\u011C",
    'gcy': "\u0433",
    'Gcy': "\u0413",
    'gdot': "\u0121",
    'Gdot': "\u0120",
    'ge': "\u2265",
    'gE': "\u2267",
    'gel': "\u22DB",
    'gEl': "\u2A8C",
    'geq': "\u2265",
    'geqq': "\u2267",
    'geqslant': "\u2A7E",
    'ges': "\u2A7E",
    'gescc': "\u2AA9",
    'gesdot': "\u2A80",
    'gesdoto': "\u2A82",
    'gesdotol': "\u2A84",
    'gesl': "\u22DB\uFE00",
    'gesles': "\u2A94",
    'gfr': "\uD835\uDD24",
    'Gfr': "\uD835\uDD0A",
    'gg': "\u226B",
    'Gg': "\u22D9",
    'ggg': "\u22D9",
    'gimel': "\u2137",
    'gjcy': "\u0453",
    'GJcy': "\u0403",
    'gl': "\u2277",
    'gla': "\u2AA5",
    'glE': "\u2A92",
    'glj': "\u2AA4",
    'gnap': "\u2A8A",
    'gnapprox': "\u2A8A",
    'gne': "\u2A88",
    'gnE': "\u2269",
    'gneq': "\u2A88",
    'gneqq': "\u2269",
    'gnsim': "\u22E7",
    'gopf': "\uD835\uDD58",
    'Gopf': "\uD835\uDD3E",
    'grave': '`',
    'GreaterEqual': "\u2265",
    'GreaterEqualLess': "\u22DB",
    'GreaterFullEqual': "\u2267",
    'GreaterGreater': "\u2AA2",
    'GreaterLess': "\u2277",
    'GreaterSlantEqual': "\u2A7E",
    'GreaterTilde': "\u2273",
    'gscr': "\u210A",
    'Gscr': "\uD835\uDCA2",
    'gsim': "\u2273",
    'gsime': "\u2A8E",
    'gsiml': "\u2A90",
    'gt': '>',
    'Gt': "\u226B",
    'GT': '>',
    'gtcc': "\u2AA7",
    'gtcir': "\u2A7A",
    'gtdot': "\u22D7",
    'gtlPar': "\u2995",
    'gtquest': "\u2A7C",
    'gtrapprox': "\u2A86",
    'gtrarr': "\u2978",
    'gtrdot': "\u22D7",
    'gtreqless': "\u22DB",
    'gtreqqless': "\u2A8C",
    'gtrless': "\u2277",
    'gtrsim': "\u2273",
    'gvertneqq': "\u2269\uFE00",
    'gvnE': "\u2269\uFE00",
    'Hacek': "\u02C7",
    'hairsp': "\u200A",
    'half': '\xBD',
    'hamilt': "\u210B",
    'hardcy': "\u044A",
    'HARDcy': "\u042A",
    'harr': "\u2194",
    'hArr': "\u21D4",
    'harrcir': "\u2948",
    'harrw': "\u21AD",
    'Hat': '^',
    'hbar': "\u210F",
    'hcirc': "\u0125",
    'Hcirc': "\u0124",
    'hearts': "\u2665",
    'heartsuit': "\u2665",
    'hellip': "\u2026",
    'hercon': "\u22B9",
    'hfr': "\uD835\uDD25",
    'Hfr': "\u210C",
    'HilbertSpace': "\u210B",
    'hksearow': "\u2925",
    'hkswarow': "\u2926",
    'hoarr': "\u21FF",
    'homtht': "\u223B",
    'hookleftarrow': "\u21A9",
    'hookrightarrow': "\u21AA",
    'hopf': "\uD835\uDD59",
    'Hopf': "\u210D",
    'horbar': "\u2015",
    'HorizontalLine': "\u2500",
    'hscr': "\uD835\uDCBD",
    'Hscr': "\u210B",
    'hslash': "\u210F",
    'hstrok': "\u0127",
    'Hstrok': "\u0126",
    'HumpDownHump': "\u224E",
    'HumpEqual': "\u224F",
    'hybull': "\u2043",
    'hyphen': "\u2010",
    'iacute': '\xED',
    'Iacute': '\xCD',
    'ic': "\u2063",
    'icirc': '\xEE',
    'Icirc': '\xCE',
    'icy': "\u0438",
    'Icy': "\u0418",
    'Idot': "\u0130",
    'iecy': "\u0435",
    'IEcy': "\u0415",
    'iexcl': '\xA1',
    'iff': "\u21D4",
    'ifr': "\uD835\uDD26",
    'Ifr': "\u2111",
    'igrave': '\xEC',
    'Igrave': '\xCC',
    'ii': "\u2148",
    'iiiint': "\u2A0C",
    'iiint': "\u222D",
    'iinfin': "\u29DC",
    'iiota': "\u2129",
    'ijlig': "\u0133",
    'IJlig': "\u0132",
    'Im': "\u2111",
    'imacr': "\u012B",
    'Imacr': "\u012A",
    'image': "\u2111",
    'ImaginaryI': "\u2148",
    'imagline': "\u2110",
    'imagpart': "\u2111",
    'imath': "\u0131",
    'imof': "\u22B7",
    'imped': "\u01B5",
    'Implies': "\u21D2",
    'in': "\u2208",
    'incare': "\u2105",
    'infin': "\u221E",
    'infintie': "\u29DD",
    'inodot': "\u0131",
    'int': "\u222B",
    'Int': "\u222C",
    'intcal': "\u22BA",
    'integers': "\u2124",
    'Integral': "\u222B",
    'intercal': "\u22BA",
    'Intersection': "\u22C2",
    'intlarhk': "\u2A17",
    'intprod': "\u2A3C",
    'InvisibleComma': "\u2063",
    'InvisibleTimes': "\u2062",
    'iocy': "\u0451",
    'IOcy': "\u0401",
    'iogon': "\u012F",
    'Iogon': "\u012E",
    'iopf': "\uD835\uDD5A",
    'Iopf': "\uD835\uDD40",
    'iota': "\u03B9",
    'Iota': "\u0399",
    'iprod': "\u2A3C",
    'iquest': '\xBF',
    'iscr': "\uD835\uDCBE",
    'Iscr': "\u2110",
    'isin': "\u2208",
    'isindot': "\u22F5",
    'isinE': "\u22F9",
    'isins': "\u22F4",
    'isinsv': "\u22F3",
    'isinv': "\u2208",
    'it': "\u2062",
    'itilde': "\u0129",
    'Itilde': "\u0128",
    'iukcy': "\u0456",
    'Iukcy': "\u0406",
    'iuml': '\xEF',
    'Iuml': '\xCF',
    'jcirc': "\u0135",
    'Jcirc': "\u0134",
    'jcy': "\u0439",
    'Jcy': "\u0419",
    'jfr': "\uD835\uDD27",
    'Jfr': "\uD835\uDD0D",
    'jmath': "\u0237",
    'jopf': "\uD835\uDD5B",
    'Jopf': "\uD835\uDD41",
    'jscr': "\uD835\uDCBF",
    'Jscr': "\uD835\uDCA5",
    'jsercy': "\u0458",
    'Jsercy': "\u0408",
    'jukcy': "\u0454",
    'Jukcy': "\u0404",
    'kappa': "\u03BA",
    'Kappa': "\u039A",
    'kappav': "\u03F0",
    'kcedil': "\u0137",
    'Kcedil': "\u0136",
    'kcy': "\u043A",
    'Kcy': "\u041A",
    'kfr': "\uD835\uDD28",
    'Kfr': "\uD835\uDD0E",
    'kgreen': "\u0138",
    'khcy': "\u0445",
    'KHcy': "\u0425",
    'kjcy': "\u045C",
    'KJcy': "\u040C",
    'kopf': "\uD835\uDD5C",
    'Kopf': "\uD835\uDD42",
    'kscr': "\uD835\uDCC0",
    'Kscr': "\uD835\uDCA6",
    'lAarr': "\u21DA",
    'lacute': "\u013A",
    'Lacute': "\u0139",
    'laemptyv': "\u29B4",
    'lagran': "\u2112",
    'lambda': "\u03BB",
    'Lambda': "\u039B",
    'lang': "\u27E8",
    'Lang': "\u27EA",
    'langd': "\u2991",
    'langle': "\u27E8",
    'lap': "\u2A85",
    'Laplacetrf': "\u2112",
    'laquo': '\xAB',
    'larr': "\u2190",
    'lArr': "\u21D0",
    'Larr': "\u219E",
    'larrb': "\u21E4",
    'larrbfs': "\u291F",
    'larrfs': "\u291D",
    'larrhk': "\u21A9",
    'larrlp': "\u21AB",
    'larrpl': "\u2939",
    'larrsim': "\u2973",
    'larrtl': "\u21A2",
    'lat': "\u2AAB",
    'latail': "\u2919",
    'lAtail': "\u291B",
    'late': "\u2AAD",
    'lates': "\u2AAD\uFE00",
    'lbarr': "\u290C",
    'lBarr': "\u290E",
    'lbbrk': "\u2772",
    'lbrace': '{',
    'lbrack': '[',
    'lbrke': "\u298B",
    'lbrksld': "\u298F",
    'lbrkslu': "\u298D",
    'lcaron': "\u013E",
    'Lcaron': "\u013D",
    'lcedil': "\u013C",
    'Lcedil': "\u013B",
    'lceil': "\u2308",
    'lcub': '{',
    'lcy': "\u043B",
    'Lcy': "\u041B",
    'ldca': "\u2936",
    'ldquo': "\u201C",
    'ldquor': "\u201E",
    'ldrdhar': "\u2967",
    'ldrushar': "\u294B",
    'ldsh': "\u21B2",
    'le': "\u2264",
    'lE': "\u2266",
    'LeftAngleBracket': "\u27E8",
    'leftarrow': "\u2190",
    'Leftarrow': "\u21D0",
    'LeftArrow': "\u2190",
    'LeftArrowBar': "\u21E4",
    'LeftArrowRightArrow': "\u21C6",
    'leftarrowtail': "\u21A2",
    'LeftCeiling': "\u2308",
    'LeftDoubleBracket': "\u27E6",
    'LeftDownTeeVector': "\u2961",
    'LeftDownVector': "\u21C3",
    'LeftDownVectorBar': "\u2959",
    'LeftFloor': "\u230A",
    'leftharpoondown': "\u21BD",
    'leftharpoonup': "\u21BC",
    'leftleftarrows': "\u21C7",
    'leftrightarrow': "\u2194",
    'Leftrightarrow': "\u21D4",
    'LeftRightArrow': "\u2194",
    'leftrightarrows': "\u21C6",
    'leftrightharpoons': "\u21CB",
    'leftrightsquigarrow': "\u21AD",
    'LeftRightVector': "\u294E",
    'LeftTee': "\u22A3",
    'LeftTeeArrow': "\u21A4",
    'LeftTeeVector': "\u295A",
    'leftthreetimes': "\u22CB",
    'LeftTriangle': "\u22B2",
    'LeftTriangleBar': "\u29CF",
    'LeftTriangleEqual': "\u22B4",
    'LeftUpDownVector': "\u2951",
    'LeftUpTeeVector': "\u2960",
    'LeftUpVector': "\u21BF",
    'LeftUpVectorBar': "\u2958",
    'LeftVector': "\u21BC",
    'LeftVectorBar': "\u2952",
    'leg': "\u22DA",
    'lEg': "\u2A8B",
    'leq': "\u2264",
    'leqq': "\u2266",
    'leqslant': "\u2A7D",
    'les': "\u2A7D",
    'lescc': "\u2AA8",
    'lesdot': "\u2A7F",
    'lesdoto': "\u2A81",
    'lesdotor': "\u2A83",
    'lesg': "\u22DA\uFE00",
    'lesges': "\u2A93",
    'lessapprox': "\u2A85",
    'lessdot': "\u22D6",
    'lesseqgtr': "\u22DA",
    'lesseqqgtr': "\u2A8B",
    'LessEqualGreater': "\u22DA",
    'LessFullEqual': "\u2266",
    'LessGreater': "\u2276",
    'lessgtr': "\u2276",
    'LessLess': "\u2AA1",
    'lesssim': "\u2272",
    'LessSlantEqual': "\u2A7D",
    'LessTilde': "\u2272",
    'lfisht': "\u297C",
    'lfloor': "\u230A",
    'lfr': "\uD835\uDD29",
    'Lfr': "\uD835\uDD0F",
    'lg': "\u2276",
    'lgE': "\u2A91",
    'lHar': "\u2962",
    'lhard': "\u21BD",
    'lharu': "\u21BC",
    'lharul': "\u296A",
    'lhblk': "\u2584",
    'ljcy': "\u0459",
    'LJcy': "\u0409",
    'll': "\u226A",
    'Ll': "\u22D8",
    'llarr': "\u21C7",
    'llcorner': "\u231E",
    'Lleftarrow': "\u21DA",
    'llhard': "\u296B",
    'lltri': "\u25FA",
    'lmidot': "\u0140",
    'Lmidot': "\u013F",
    'lmoust': "\u23B0",
    'lmoustache': "\u23B0",
    'lnap': "\u2A89",
    'lnapprox': "\u2A89",
    'lne': "\u2A87",
    'lnE': "\u2268",
    'lneq': "\u2A87",
    'lneqq': "\u2268",
    'lnsim': "\u22E6",
    'loang': "\u27EC",
    'loarr': "\u21FD",
    'lobrk': "\u27E6",
    'longleftarrow': "\u27F5",
    'Longleftarrow': "\u27F8",
    'LongLeftArrow': "\u27F5",
    'longleftrightarrow': "\u27F7",
    'Longleftrightarrow': "\u27FA",
    'LongLeftRightArrow': "\u27F7",
    'longmapsto': "\u27FC",
    'longrightarrow': "\u27F6",
    'Longrightarrow': "\u27F9",
    'LongRightArrow': "\u27F6",
    'looparrowleft': "\u21AB",
    'looparrowright': "\u21AC",
    'lopar': "\u2985",
    'lopf': "\uD835\uDD5D",
    'Lopf': "\uD835\uDD43",
    'loplus': "\u2A2D",
    'lotimes': "\u2A34",
    'lowast': "\u2217",
    'lowbar': '_',
    'LowerLeftArrow': "\u2199",
    'LowerRightArrow': "\u2198",
    'loz': "\u25CA",
    'lozenge': "\u25CA",
    'lozf': "\u29EB",
    'lpar': '(',
    'lparlt': "\u2993",
    'lrarr': "\u21C6",
    'lrcorner': "\u231F",
    'lrhar': "\u21CB",
    'lrhard': "\u296D",
    'lrm': "\u200E",
    'lrtri': "\u22BF",
    'lsaquo': "\u2039",
    'lscr': "\uD835\uDCC1",
    'Lscr': "\u2112",
    'lsh': "\u21B0",
    'Lsh': "\u21B0",
    'lsim': "\u2272",
    'lsime': "\u2A8D",
    'lsimg': "\u2A8F",
    'lsqb': '[',
    'lsquo': "\u2018",
    'lsquor': "\u201A",
    'lstrok': "\u0142",
    'Lstrok': "\u0141",
    'lt': '<',
    'Lt': "\u226A",
    'LT': '<',
    'ltcc': "\u2AA6",
    'ltcir': "\u2A79",
    'ltdot': "\u22D6",
    'lthree': "\u22CB",
    'ltimes': "\u22C9",
    'ltlarr': "\u2976",
    'ltquest': "\u2A7B",
    'ltri': "\u25C3",
    'ltrie': "\u22B4",
    'ltrif': "\u25C2",
    'ltrPar': "\u2996",
    'lurdshar': "\u294A",
    'luruhar': "\u2966",
    'lvertneqq': "\u2268\uFE00",
    'lvnE': "\u2268\uFE00",
    'macr': '\xAF',
    'male': "\u2642",
    'malt': "\u2720",
    'maltese': "\u2720",
    'map': "\u21A6",
    'Map': "\u2905",
    'mapsto': "\u21A6",
    'mapstodown': "\u21A7",
    'mapstoleft': "\u21A4",
    'mapstoup': "\u21A5",
    'marker': "\u25AE",
    'mcomma': "\u2A29",
    'mcy': "\u043C",
    'Mcy': "\u041C",
    'mdash': "\u2014",
    'mDDot': "\u223A",
    'measuredangle': "\u2221",
    'MediumSpace': "\u205F",
    'Mellintrf': "\u2133",
    'mfr': "\uD835\uDD2A",
    'Mfr': "\uD835\uDD10",
    'mho': "\u2127",
    'micro': '\xB5',
    'mid': "\u2223",
    'midast': '*',
    'midcir': "\u2AF0",
    'middot': '\xB7',
    'minus': "\u2212",
    'minusb': "\u229F",
    'minusd': "\u2238",
    'minusdu': "\u2A2A",
    'MinusPlus': "\u2213",
    'mlcp': "\u2ADB",
    'mldr': "\u2026",
    'mnplus': "\u2213",
    'models': "\u22A7",
    'mopf': "\uD835\uDD5E",
    'Mopf': "\uD835\uDD44",
    'mp': "\u2213",
    'mscr': "\uD835\uDCC2",
    'Mscr': "\u2133",
    'mstpos': "\u223E",
    'mu': "\u03BC",
    'Mu': "\u039C",
    'multimap': "\u22B8",
    'mumap': "\u22B8",
    'nabla': "\u2207",
    'nacute': "\u0144",
    'Nacute': "\u0143",
    'nang': "\u2220\u20D2",
    'nap': "\u2249",
    'napE': "\u2A70\u0338",
    'napid': "\u224B\u0338",
    'napos': "\u0149",
    'napprox': "\u2249",
    'natur': "\u266E",
    'natural': "\u266E",
    'naturals': "\u2115",
    'nbsp': '\xA0',
    'nbump': "\u224E\u0338",
    'nbumpe': "\u224F\u0338",
    'ncap': "\u2A43",
    'ncaron': "\u0148",
    'Ncaron': "\u0147",
    'ncedil': "\u0146",
    'Ncedil': "\u0145",
    'ncong': "\u2247",
    'ncongdot': "\u2A6D\u0338",
    'ncup': "\u2A42",
    'ncy': "\u043D",
    'Ncy': "\u041D",
    'ndash': "\u2013",
    'ne': "\u2260",
    'nearhk': "\u2924",
    'nearr': "\u2197",
    'neArr': "\u21D7",
    'nearrow': "\u2197",
    'nedot': "\u2250\u0338",
    'NegativeMediumSpace': "\u200B",
    'NegativeThickSpace': "\u200B",
    'NegativeThinSpace': "\u200B",
    'NegativeVeryThinSpace': "\u200B",
    'nequiv': "\u2262",
    'nesear': "\u2928",
    'nesim': "\u2242\u0338",
    'NestedGreaterGreater': "\u226B",
    'NestedLessLess': "\u226A",
    'NewLine': '\n',
    'nexist': "\u2204",
    'nexists': "\u2204",
    'nfr': "\uD835\uDD2B",
    'Nfr': "\uD835\uDD11",
    'nge': "\u2271",
    'ngE': "\u2267\u0338",
    'ngeq': "\u2271",
    'ngeqq': "\u2267\u0338",
    'ngeqslant': "\u2A7E\u0338",
    'nges': "\u2A7E\u0338",
    'nGg': "\u22D9\u0338",
    'ngsim': "\u2275",
    'ngt': "\u226F",
    'nGt': "\u226B\u20D2",
    'ngtr': "\u226F",
    'nGtv': "\u226B\u0338",
    'nharr': "\u21AE",
    'nhArr': "\u21CE",
    'nhpar': "\u2AF2",
    'ni': "\u220B",
    'nis': "\u22FC",
    'nisd': "\u22FA",
    'niv': "\u220B",
    'njcy': "\u045A",
    'NJcy': "\u040A",
    'nlarr': "\u219A",
    'nlArr': "\u21CD",
    'nldr': "\u2025",
    'nle': "\u2270",
    'nlE': "\u2266\u0338",
    'nleftarrow': "\u219A",
    'nLeftarrow': "\u21CD",
    'nleftrightarrow': "\u21AE",
    'nLeftrightarrow': "\u21CE",
    'nleq': "\u2270",
    'nleqq': "\u2266\u0338",
    'nleqslant': "\u2A7D\u0338",
    'nles': "\u2A7D\u0338",
    'nless': "\u226E",
    'nLl': "\u22D8\u0338",
    'nlsim': "\u2274",
    'nlt': "\u226E",
    'nLt': "\u226A\u20D2",
    'nltri': "\u22EA",
    'nltrie': "\u22EC",
    'nLtv': "\u226A\u0338",
    'nmid': "\u2224",
    'NoBreak': "\u2060",
    'NonBreakingSpace': '\xA0',
    'nopf': "\uD835\uDD5F",
    'Nopf': "\u2115",
    'not': '\xAC',
    'Not': "\u2AEC",
    'NotCongruent': "\u2262",
    'NotCupCap': "\u226D",
    'NotDoubleVerticalBar': "\u2226",
    'NotElement': "\u2209",
    'NotEqual': "\u2260",
    'NotEqualTilde': "\u2242\u0338",
    'NotExists': "\u2204",
    'NotGreater': "\u226F",
    'NotGreaterEqual': "\u2271",
    'NotGreaterFullEqual': "\u2267\u0338",
    'NotGreaterGreater': "\u226B\u0338",
    'NotGreaterLess': "\u2279",
    'NotGreaterSlantEqual': "\u2A7E\u0338",
    'NotGreaterTilde': "\u2275",
    'NotHumpDownHump': "\u224E\u0338",
    'NotHumpEqual': "\u224F\u0338",
    'notin': "\u2209",
    'notindot': "\u22F5\u0338",
    'notinE': "\u22F9\u0338",
    'notinva': "\u2209",
    'notinvb': "\u22F7",
    'notinvc': "\u22F6",
    'NotLeftTriangle': "\u22EA",
    'NotLeftTriangleBar': "\u29CF\u0338",
    'NotLeftTriangleEqual': "\u22EC",
    'NotLess': "\u226E",
    'NotLessEqual': "\u2270",
    'NotLessGreater': "\u2278",
    'NotLessLess': "\u226A\u0338",
    'NotLessSlantEqual': "\u2A7D\u0338",
    'NotLessTilde': "\u2274",
    'NotNestedGreaterGreater': "\u2AA2\u0338",
    'NotNestedLessLess': "\u2AA1\u0338",
    'notni': "\u220C",
    'notniva': "\u220C",
    'notnivb': "\u22FE",
    'notnivc': "\u22FD",
    'NotPrecedes': "\u2280",
    'NotPrecedesEqual': "\u2AAF\u0338",
    'NotPrecedesSlantEqual': "\u22E0",
    'NotReverseElement': "\u220C",
    'NotRightTriangle': "\u22EB",
    'NotRightTriangleBar': "\u29D0\u0338",
    'NotRightTriangleEqual': "\u22ED",
    'NotSquareSubset': "\u228F\u0338",
    'NotSquareSubsetEqual': "\u22E2",
    'NotSquareSuperset': "\u2290\u0338",
    'NotSquareSupersetEqual': "\u22E3",
    'NotSubset': "\u2282\u20D2",
    'NotSubsetEqual': "\u2288",
    'NotSucceeds': "\u2281",
    'NotSucceedsEqual': "\u2AB0\u0338",
    'NotSucceedsSlantEqual': "\u22E1",
    'NotSucceedsTilde': "\u227F\u0338",
    'NotSuperset': "\u2283\u20D2",
    'NotSupersetEqual': "\u2289",
    'NotTilde': "\u2241",
    'NotTildeEqual': "\u2244",
    'NotTildeFullEqual': "\u2247",
    'NotTildeTilde': "\u2249",
    'NotVerticalBar': "\u2224",
    'npar': "\u2226",
    'nparallel': "\u2226",
    'nparsl': "\u2AFD\u20E5",
    'npart': "\u2202\u0338",
    'npolint': "\u2A14",
    'npr': "\u2280",
    'nprcue': "\u22E0",
    'npre': "\u2AAF\u0338",
    'nprec': "\u2280",
    'npreceq': "\u2AAF\u0338",
    'nrarr': "\u219B",
    'nrArr': "\u21CF",
    'nrarrc': "\u2933\u0338",
    'nrarrw': "\u219D\u0338",
    'nrightarrow': "\u219B",
    'nRightarrow': "\u21CF",
    'nrtri': "\u22EB",
    'nrtrie': "\u22ED",
    'nsc': "\u2281",
    'nsccue': "\u22E1",
    'nsce': "\u2AB0\u0338",
    'nscr': "\uD835\uDCC3",
    'Nscr': "\uD835\uDCA9",
    'nshortmid': "\u2224",
    'nshortparallel': "\u2226",
    'nsim': "\u2241",
    'nsime': "\u2244",
    'nsimeq': "\u2244",
    'nsmid': "\u2224",
    'nspar': "\u2226",
    'nsqsube': "\u22E2",
    'nsqsupe': "\u22E3",
    'nsub': "\u2284",
    'nsube': "\u2288",
    'nsubE': "\u2AC5\u0338",
    'nsubset': "\u2282\u20D2",
    'nsubseteq': "\u2288",
    'nsubseteqq': "\u2AC5\u0338",
    'nsucc': "\u2281",
    'nsucceq': "\u2AB0\u0338",
    'nsup': "\u2285",
    'nsupe': "\u2289",
    'nsupE': "\u2AC6\u0338",
    'nsupset': "\u2283\u20D2",
    'nsupseteq': "\u2289",
    'nsupseteqq': "\u2AC6\u0338",
    'ntgl': "\u2279",
    'ntilde': '\xF1',
    'Ntilde': '\xD1',
    'ntlg': "\u2278",
    'ntriangleleft': "\u22EA",
    'ntrianglelefteq': "\u22EC",
    'ntriangleright': "\u22EB",
    'ntrianglerighteq': "\u22ED",
    'nu': "\u03BD",
    'Nu': "\u039D",
    'num': '#',
    'numero': "\u2116",
    'numsp': "\u2007",
    'nvap': "\u224D\u20D2",
    'nvdash': "\u22AC",
    'nvDash': "\u22AD",
    'nVdash': "\u22AE",
    'nVDash': "\u22AF",
    'nvge': "\u2265\u20D2",
    'nvgt': ">\u20D2",
    'nvHarr': "\u2904",
    'nvinfin': "\u29DE",
    'nvlArr': "\u2902",
    'nvle': "\u2264\u20D2",
    'nvlt': "<\u20D2",
    'nvltrie': "\u22B4\u20D2",
    'nvrArr': "\u2903",
    'nvrtrie': "\u22B5\u20D2",
    'nvsim': "\u223C\u20D2",
    'nwarhk': "\u2923",
    'nwarr': "\u2196",
    'nwArr': "\u21D6",
    'nwarrow': "\u2196",
    'nwnear': "\u2927",
    'oacute': '\xF3',
    'Oacute': '\xD3',
    'oast': "\u229B",
    'ocir': "\u229A",
    'ocirc': '\xF4',
    'Ocirc': '\xD4',
    'ocy': "\u043E",
    'Ocy': "\u041E",
    'odash': "\u229D",
    'odblac': "\u0151",
    'Odblac': "\u0150",
    'odiv': "\u2A38",
    'odot': "\u2299",
    'odsold': "\u29BC",
    'oelig': "\u0153",
    'OElig': "\u0152",
    'ofcir': "\u29BF",
    'ofr': "\uD835\uDD2C",
    'Ofr': "\uD835\uDD12",
    'ogon': "\u02DB",
    'ograve': '\xF2',
    'Ograve': '\xD2',
    'ogt': "\u29C1",
    'ohbar': "\u29B5",
    'ohm': "\u03A9",
    'oint': "\u222E",
    'olarr': "\u21BA",
    'olcir': "\u29BE",
    'olcross': "\u29BB",
    'oline': "\u203E",
    'olt': "\u29C0",
    'omacr': "\u014D",
    'Omacr': "\u014C",
    'omega': "\u03C9",
    'Omega': "\u03A9",
    'omicron': "\u03BF",
    'Omicron': "\u039F",
    'omid': "\u29B6",
    'ominus': "\u2296",
    'oopf': "\uD835\uDD60",
    'Oopf': "\uD835\uDD46",
    'opar': "\u29B7",
    'OpenCurlyDoubleQuote': "\u201C",
    'OpenCurlyQuote': "\u2018",
    'operp': "\u29B9",
    'oplus': "\u2295",
    'or': "\u2228",
    'Or': "\u2A54",
    'orarr': "\u21BB",
    'ord': "\u2A5D",
    'order': "\u2134",
    'orderof': "\u2134",
    'ordf': '\xAA',
    'ordm': '\xBA',
    'origof': "\u22B6",
    'oror': "\u2A56",
    'orslope': "\u2A57",
    'orv': "\u2A5B",
    'oS': "\u24C8",
    'oscr': "\u2134",
    'Oscr': "\uD835\uDCAA",
    'oslash': '\xF8',
    'Oslash': '\xD8',
    'osol': "\u2298",
    'otilde': '\xF5',
    'Otilde': '\xD5',
    'otimes': "\u2297",
    'Otimes': "\u2A37",
    'otimesas': "\u2A36",
    'ouml': '\xF6',
    'Ouml': '\xD6',
    'ovbar': "\u233D",
    'OverBar': "\u203E",
    'OverBrace': "\u23DE",
    'OverBracket': "\u23B4",
    'OverParenthesis': "\u23DC",
    'par': "\u2225",
    'para': '\xB6',
    'parallel': "\u2225",
    'parsim': "\u2AF3",
    'parsl': "\u2AFD",
    'part': "\u2202",
    'PartialD': "\u2202",
    'pcy': "\u043F",
    'Pcy': "\u041F",
    'percnt': '%',
    'period': '.',
    'permil': "\u2030",
    'perp': "\u22A5",
    'pertenk': "\u2031",
    'pfr': "\uD835\uDD2D",
    'Pfr': "\uD835\uDD13",
    'phi': "\u03C6",
    'Phi': "\u03A6",
    'phiv': "\u03D5",
    'phmmat': "\u2133",
    'phone': "\u260E",
    'pi': "\u03C0",
    'Pi': "\u03A0",
    'pitchfork': "\u22D4",
    'piv': "\u03D6",
    'planck': "\u210F",
    'planckh': "\u210E",
    'plankv': "\u210F",
    'plus': '+',
    'plusacir': "\u2A23",
    'plusb': "\u229E",
    'pluscir': "\u2A22",
    'plusdo': "\u2214",
    'plusdu': "\u2A25",
    'pluse': "\u2A72",
    'PlusMinus': '\xB1',
    'plusmn': '\xB1',
    'plussim': "\u2A26",
    'plustwo': "\u2A27",
    'pm': '\xB1',
    'Poincareplane': "\u210C",
    'pointint': "\u2A15",
    'popf': "\uD835\uDD61",
    'Popf': "\u2119",
    'pound': '\xA3',
    'pr': "\u227A",
    'Pr': "\u2ABB",
    'prap': "\u2AB7",
    'prcue': "\u227C",
    'pre': "\u2AAF",
    'prE': "\u2AB3",
    'prec': "\u227A",
    'precapprox': "\u2AB7",
    'preccurlyeq': "\u227C",
    'Precedes': "\u227A",
    'PrecedesEqual': "\u2AAF",
    'PrecedesSlantEqual': "\u227C",
    'PrecedesTilde': "\u227E",
    'preceq': "\u2AAF",
    'precnapprox': "\u2AB9",
    'precneqq': "\u2AB5",
    'precnsim': "\u22E8",
    'precsim': "\u227E",
    'prime': "\u2032",
    'Prime': "\u2033",
    'primes': "\u2119",
    'prnap': "\u2AB9",
    'prnE': "\u2AB5",
    'prnsim': "\u22E8",
    'prod': "\u220F",
    'Product': "\u220F",
    'profalar': "\u232E",
    'profline': "\u2312",
    'profsurf': "\u2313",
    'prop': "\u221D",
    'Proportion': "\u2237",
    'Proportional': "\u221D",
    'propto': "\u221D",
    'prsim': "\u227E",
    'prurel': "\u22B0",
    'pscr': "\uD835\uDCC5",
    'Pscr': "\uD835\uDCAB",
    'psi': "\u03C8",
    'Psi': "\u03A8",
    'puncsp': "\u2008",
    'qfr': "\uD835\uDD2E",
    'Qfr': "\uD835\uDD14",
    'qint': "\u2A0C",
    'qopf': "\uD835\uDD62",
    'Qopf': "\u211A",
    'qprime': "\u2057",
    'qscr': "\uD835\uDCC6",
    'Qscr': "\uD835\uDCAC",
    'quaternions': "\u210D",
    'quatint': "\u2A16",
    'quest': '?',
    'questeq': "\u225F",
    'quot': '"',
    'QUOT': '"',
    'rAarr': "\u21DB",
    'race': "\u223D\u0331",
    'racute': "\u0155",
    'Racute': "\u0154",
    'radic': "\u221A",
    'raemptyv': "\u29B3",
    'rang': "\u27E9",
    'Rang': "\u27EB",
    'rangd': "\u2992",
    'range': "\u29A5",
    'rangle': "\u27E9",
    'raquo': '\xBB',
    'rarr': "\u2192",
    'rArr': "\u21D2",
    'Rarr': "\u21A0",
    'rarrap': "\u2975",
    'rarrb': "\u21E5",
    'rarrbfs': "\u2920",
    'rarrc': "\u2933",
    'rarrfs': "\u291E",
    'rarrhk': "\u21AA",
    'rarrlp': "\u21AC",
    'rarrpl': "\u2945",
    'rarrsim': "\u2974",
    'rarrtl': "\u21A3",
    'Rarrtl': "\u2916",
    'rarrw': "\u219D",
    'ratail': "\u291A",
    'rAtail': "\u291C",
    'ratio': "\u2236",
    'rationals': "\u211A",
    'rbarr': "\u290D",
    'rBarr': "\u290F",
    'RBarr': "\u2910",
    'rbbrk': "\u2773",
    'rbrace': '}',
    'rbrack': ']',
    'rbrke': "\u298C",
    'rbrksld': "\u298E",
    'rbrkslu': "\u2990",
    'rcaron': "\u0159",
    'Rcaron': "\u0158",
    'rcedil': "\u0157",
    'Rcedil': "\u0156",
    'rceil': "\u2309",
    'rcub': '}',
    'rcy': "\u0440",
    'Rcy': "\u0420",
    'rdca': "\u2937",
    'rdldhar': "\u2969",
    'rdquo': "\u201D",
    'rdquor': "\u201D",
    'rdsh': "\u21B3",
    'Re': "\u211C",
    'real': "\u211C",
    'realine': "\u211B",
    'realpart': "\u211C",
    'reals': "\u211D",
    'rect': "\u25AD",
    'reg': '\xAE',
    'REG': '\xAE',
    'ReverseElement': "\u220B",
    'ReverseEquilibrium': "\u21CB",
    'ReverseUpEquilibrium': "\u296F",
    'rfisht': "\u297D",
    'rfloor': "\u230B",
    'rfr': "\uD835\uDD2F",
    'Rfr': "\u211C",
    'rHar': "\u2964",
    'rhard': "\u21C1",
    'rharu': "\u21C0",
    'rharul': "\u296C",
    'rho': "\u03C1",
    'Rho': "\u03A1",
    'rhov': "\u03F1",
    'RightAngleBracket': "\u27E9",
    'rightarrow': "\u2192",
    'Rightarrow': "\u21D2",
    'RightArrow': "\u2192",
    'RightArrowBar': "\u21E5",
    'RightArrowLeftArrow': "\u21C4",
    'rightarrowtail': "\u21A3",
    'RightCeiling': "\u2309",
    'RightDoubleBracket': "\u27E7",
    'RightDownTeeVector': "\u295D",
    'RightDownVector': "\u21C2",
    'RightDownVectorBar': "\u2955",
    'RightFloor': "\u230B",
    'rightharpoondown': "\u21C1",
    'rightharpoonup': "\u21C0",
    'rightleftarrows': "\u21C4",
    'rightleftharpoons': "\u21CC",
    'rightrightarrows': "\u21C9",
    'rightsquigarrow': "\u219D",
    'RightTee': "\u22A2",
    'RightTeeArrow': "\u21A6",
    'RightTeeVector': "\u295B",
    'rightthreetimes': "\u22CC",
    'RightTriangle': "\u22B3",
    'RightTriangleBar': "\u29D0",
    'RightTriangleEqual': "\u22B5",
    'RightUpDownVector': "\u294F",
    'RightUpTeeVector': "\u295C",
    'RightUpVector': "\u21BE",
    'RightUpVectorBar': "\u2954",
    'RightVector': "\u21C0",
    'RightVectorBar': "\u2953",
    'ring': "\u02DA",
    'risingdotseq': "\u2253",
    'rlarr': "\u21C4",
    'rlhar': "\u21CC",
    'rlm': "\u200F",
    'rmoust': "\u23B1",
    'rmoustache': "\u23B1",
    'rnmid': "\u2AEE",
    'roang': "\u27ED",
    'roarr': "\u21FE",
    'robrk': "\u27E7",
    'ropar': "\u2986",
    'ropf': "\uD835\uDD63",
    'Ropf': "\u211D",
    'roplus': "\u2A2E",
    'rotimes': "\u2A35",
    'RoundImplies': "\u2970",
    'rpar': ')',
    'rpargt': "\u2994",
    'rppolint': "\u2A12",
    'rrarr': "\u21C9",
    'Rrightarrow': "\u21DB",
    'rsaquo': "\u203A",
    'rscr': "\uD835\uDCC7",
    'Rscr': "\u211B",
    'rsh': "\u21B1",
    'Rsh': "\u21B1",
    'rsqb': ']',
    'rsquo': "\u2019",
    'rsquor': "\u2019",
    'rthree': "\u22CC",
    'rtimes': "\u22CA",
    'rtri': "\u25B9",
    'rtrie': "\u22B5",
    'rtrif': "\u25B8",
    'rtriltri': "\u29CE",
    'RuleDelayed': "\u29F4",
    'ruluhar': "\u2968",
    'rx': "\u211E",
    'sacute': "\u015B",
    'Sacute': "\u015A",
    'sbquo': "\u201A",
    'sc': "\u227B",
    'Sc': "\u2ABC",
    'scap': "\u2AB8",
    'scaron': "\u0161",
    'Scaron': "\u0160",
    'sccue': "\u227D",
    'sce': "\u2AB0",
    'scE': "\u2AB4",
    'scedil': "\u015F",
    'Scedil': "\u015E",
    'scirc': "\u015D",
    'Scirc': "\u015C",
    'scnap': "\u2ABA",
    'scnE': "\u2AB6",
    'scnsim': "\u22E9",
    'scpolint': "\u2A13",
    'scsim': "\u227F",
    'scy': "\u0441",
    'Scy': "\u0421",
    'sdot': "\u22C5",
    'sdotb': "\u22A1",
    'sdote': "\u2A66",
    'searhk': "\u2925",
    'searr': "\u2198",
    'seArr': "\u21D8",
    'searrow': "\u2198",
    'sect': '\xA7',
    'semi': ';',
    'seswar': "\u2929",
    'setminus': "\u2216",
    'setmn': "\u2216",
    'sext': "\u2736",
    'sfr': "\uD835\uDD30",
    'Sfr': "\uD835\uDD16",
    'sfrown': "\u2322",
    'sharp': "\u266F",
    'shchcy': "\u0449",
    'SHCHcy': "\u0429",
    'shcy': "\u0448",
    'SHcy': "\u0428",
    'ShortDownArrow': "\u2193",
    'ShortLeftArrow': "\u2190",
    'shortmid': "\u2223",
    'shortparallel': "\u2225",
    'ShortRightArrow': "\u2192",
    'ShortUpArrow': "\u2191",
    'shy': '\xAD',
    'sigma': "\u03C3",
    'Sigma': "\u03A3",
    'sigmaf': "\u03C2",
    'sigmav': "\u03C2",
    'sim': "\u223C",
    'simdot': "\u2A6A",
    'sime': "\u2243",
    'simeq': "\u2243",
    'simg': "\u2A9E",
    'simgE': "\u2AA0",
    'siml': "\u2A9D",
    'simlE': "\u2A9F",
    'simne': "\u2246",
    'simplus': "\u2A24",
    'simrarr': "\u2972",
    'slarr': "\u2190",
    'SmallCircle': "\u2218",
    'smallsetminus': "\u2216",
    'smashp': "\u2A33",
    'smeparsl': "\u29E4",
    'smid': "\u2223",
    'smile': "\u2323",
    'smt': "\u2AAA",
    'smte': "\u2AAC",
    'smtes': "\u2AAC\uFE00",
    'softcy': "\u044C",
    'SOFTcy': "\u042C",
    'sol': '/',
    'solb': "\u29C4",
    'solbar': "\u233F",
    'sopf': "\uD835\uDD64",
    'Sopf': "\uD835\uDD4A",
    'spades': "\u2660",
    'spadesuit': "\u2660",
    'spar': "\u2225",
    'sqcap': "\u2293",
    'sqcaps': "\u2293\uFE00",
    'sqcup': "\u2294",
    'sqcups': "\u2294\uFE00",
    'Sqrt': "\u221A",
    'sqsub': "\u228F",
    'sqsube': "\u2291",
    'sqsubset': "\u228F",
    'sqsubseteq': "\u2291",
    'sqsup': "\u2290",
    'sqsupe': "\u2292",
    'sqsupset': "\u2290",
    'sqsupseteq': "\u2292",
    'squ': "\u25A1",
    'square': "\u25A1",
    'Square': "\u25A1",
    'SquareIntersection': "\u2293",
    'SquareSubset': "\u228F",
    'SquareSubsetEqual': "\u2291",
    'SquareSuperset': "\u2290",
    'SquareSupersetEqual': "\u2292",
    'SquareUnion': "\u2294",
    'squarf': "\u25AA",
    'squf': "\u25AA",
    'srarr': "\u2192",
    'sscr': "\uD835\uDCC8",
    'Sscr': "\uD835\uDCAE",
    'ssetmn': "\u2216",
    'ssmile': "\u2323",
    'sstarf': "\u22C6",
    'star': "\u2606",
    'Star': "\u22C6",
    'starf': "\u2605",
    'straightepsilon': "\u03F5",
    'straightphi': "\u03D5",
    'strns': '\xAF',
    'sub': "\u2282",
    'Sub': "\u22D0",
    'subdot': "\u2ABD",
    'sube': "\u2286",
    'subE': "\u2AC5",
    'subedot': "\u2AC3",
    'submult': "\u2AC1",
    'subne': "\u228A",
    'subnE': "\u2ACB",
    'subplus': "\u2ABF",
    'subrarr': "\u2979",
    'subset': "\u2282",
    'Subset': "\u22D0",
    'subseteq': "\u2286",
    'subseteqq': "\u2AC5",
    'SubsetEqual': "\u2286",
    'subsetneq': "\u228A",
    'subsetneqq': "\u2ACB",
    'subsim': "\u2AC7",
    'subsub': "\u2AD5",
    'subsup': "\u2AD3",
    'succ': "\u227B",
    'succapprox': "\u2AB8",
    'succcurlyeq': "\u227D",
    'Succeeds': "\u227B",
    'SucceedsEqual': "\u2AB0",
    'SucceedsSlantEqual': "\u227D",
    'SucceedsTilde': "\u227F",
    'succeq': "\u2AB0",
    'succnapprox': "\u2ABA",
    'succneqq': "\u2AB6",
    'succnsim': "\u22E9",
    'succsim': "\u227F",
    'SuchThat': "\u220B",
    'sum': "\u2211",
    'Sum': "\u2211",
    'sung': "\u266A",
    'sup': "\u2283",
    'Sup': "\u22D1",
    'sup1': '\xB9',
    'sup2': '\xB2',
    'sup3': '\xB3',
    'supdot': "\u2ABE",
    'supdsub': "\u2AD8",
    'supe': "\u2287",
    'supE': "\u2AC6",
    'supedot': "\u2AC4",
    'Superset': "\u2283",
    'SupersetEqual': "\u2287",
    'suphsol': "\u27C9",
    'suphsub': "\u2AD7",
    'suplarr': "\u297B",
    'supmult': "\u2AC2",
    'supne': "\u228B",
    'supnE': "\u2ACC",
    'supplus': "\u2AC0",
    'supset': "\u2283",
    'Supset': "\u22D1",
    'supseteq': "\u2287",
    'supseteqq': "\u2AC6",
    'supsetneq': "\u228B",
    'supsetneqq': "\u2ACC",
    'supsim': "\u2AC8",
    'supsub': "\u2AD4",
    'supsup': "\u2AD6",
    'swarhk': "\u2926",
    'swarr': "\u2199",
    'swArr': "\u21D9",
    'swarrow': "\u2199",
    'swnwar': "\u292A",
    'szlig': '\xDF',
    'Tab': '\t',
    'target': "\u2316",
    'tau': "\u03C4",
    'Tau': "\u03A4",
    'tbrk': "\u23B4",
    'tcaron': "\u0165",
    'Tcaron': "\u0164",
    'tcedil': "\u0163",
    'Tcedil': "\u0162",
    'tcy': "\u0442",
    'Tcy': "\u0422",
    'tdot': "\u20DB",
    'telrec': "\u2315",
    'tfr': "\uD835\uDD31",
    'Tfr': "\uD835\uDD17",
    'there4': "\u2234",
    'therefore': "\u2234",
    'Therefore': "\u2234",
    'theta': "\u03B8",
    'Theta': "\u0398",
    'thetasym': "\u03D1",
    'thetav': "\u03D1",
    'thickapprox': "\u2248",
    'thicksim': "\u223C",
    'ThickSpace': "\u205F\u200A",
    'thinsp': "\u2009",
    'ThinSpace': "\u2009",
    'thkap': "\u2248",
    'thksim': "\u223C",
    'thorn': '\xFE',
    'THORN': '\xDE',
    'tilde': "\u02DC",
    'Tilde': "\u223C",
    'TildeEqual': "\u2243",
    'TildeFullEqual': "\u2245",
    'TildeTilde': "\u2248",
    'times': '\xD7',
    'timesb': "\u22A0",
    'timesbar': "\u2A31",
    'timesd': "\u2A30",
    'tint': "\u222D",
    'toea': "\u2928",
    'top': "\u22A4",
    'topbot': "\u2336",
    'topcir': "\u2AF1",
    'topf': "\uD835\uDD65",
    'Topf': "\uD835\uDD4B",
    'topfork': "\u2ADA",
    'tosa': "\u2929",
    'tprime': "\u2034",
    'trade': "\u2122",
    'TRADE': "\u2122",
    'triangle': "\u25B5",
    'triangledown': "\u25BF",
    'triangleleft': "\u25C3",
    'trianglelefteq': "\u22B4",
    'triangleq': "\u225C",
    'triangleright': "\u25B9",
    'trianglerighteq': "\u22B5",
    'tridot': "\u25EC",
    'trie': "\u225C",
    'triminus': "\u2A3A",
    'TripleDot': "\u20DB",
    'triplus': "\u2A39",
    'trisb': "\u29CD",
    'tritime': "\u2A3B",
    'trpezium': "\u23E2",
    'tscr': "\uD835\uDCC9",
    'Tscr': "\uD835\uDCAF",
    'tscy': "\u0446",
    'TScy': "\u0426",
    'tshcy': "\u045B",
    'TSHcy': "\u040B",
    'tstrok': "\u0167",
    'Tstrok': "\u0166",
    'twixt': "\u226C",
    'twoheadleftarrow': "\u219E",
    'twoheadrightarrow': "\u21A0",
    'uacute': '\xFA',
    'Uacute': '\xDA',
    'uarr': "\u2191",
    'uArr': "\u21D1",
    'Uarr': "\u219F",
    'Uarrocir': "\u2949",
    'ubrcy': "\u045E",
    'Ubrcy': "\u040E",
    'ubreve': "\u016D",
    'Ubreve': "\u016C",
    'ucirc': '\xFB',
    'Ucirc': '\xDB',
    'ucy': "\u0443",
    'Ucy': "\u0423",
    'udarr': "\u21C5",
    'udblac': "\u0171",
    'Udblac': "\u0170",
    'udhar': "\u296E",
    'ufisht': "\u297E",
    'ufr': "\uD835\uDD32",
    'Ufr': "\uD835\uDD18",
    'ugrave': '\xF9',
    'Ugrave': '\xD9',
    'uHar': "\u2963",
    'uharl': "\u21BF",
    'uharr': "\u21BE",
    'uhblk': "\u2580",
    'ulcorn': "\u231C",
    'ulcorner': "\u231C",
    'ulcrop': "\u230F",
    'ultri': "\u25F8",
    'umacr': "\u016B",
    'Umacr': "\u016A",
    'uml': '\xA8',
    'UnderBar': '_',
    'UnderBrace': "\u23DF",
    'UnderBracket': "\u23B5",
    'UnderParenthesis': "\u23DD",
    'Union': "\u22C3",
    'UnionPlus': "\u228E",
    'uogon': "\u0173",
    'Uogon': "\u0172",
    'uopf': "\uD835\uDD66",
    'Uopf': "\uD835\uDD4C",
    'uparrow': "\u2191",
    'Uparrow': "\u21D1",
    'UpArrow': "\u2191",
    'UpArrowBar': "\u2912",
    'UpArrowDownArrow': "\u21C5",
    'updownarrow': "\u2195",
    'Updownarrow': "\u21D5",
    'UpDownArrow': "\u2195",
    'UpEquilibrium': "\u296E",
    'upharpoonleft': "\u21BF",
    'upharpoonright': "\u21BE",
    'uplus': "\u228E",
    'UpperLeftArrow': "\u2196",
    'UpperRightArrow': "\u2197",
    'upsi': "\u03C5",
    'Upsi': "\u03D2",
    'upsih': "\u03D2",
    'upsilon': "\u03C5",
    'Upsilon': "\u03A5",
    'UpTee': "\u22A5",
    'UpTeeArrow': "\u21A5",
    'upuparrows': "\u21C8",
    'urcorn': "\u231D",
    'urcorner': "\u231D",
    'urcrop': "\u230E",
    'uring': "\u016F",
    'Uring': "\u016E",
    'urtri': "\u25F9",
    'uscr': "\uD835\uDCCA",
    'Uscr': "\uD835\uDCB0",
    'utdot': "\u22F0",
    'utilde': "\u0169",
    'Utilde': "\u0168",
    'utri': "\u25B5",
    'utrif': "\u25B4",
    'uuarr': "\u21C8",
    'uuml': '\xFC',
    'Uuml': '\xDC',
    'uwangle': "\u29A7",
    'vangrt': "\u299C",
    'varepsilon': "\u03F5",
    'varkappa': "\u03F0",
    'varnothing': "\u2205",
    'varphi': "\u03D5",
    'varpi': "\u03D6",
    'varpropto': "\u221D",
    'varr': "\u2195",
    'vArr': "\u21D5",
    'varrho': "\u03F1",
    'varsigma': "\u03C2",
    'varsubsetneq': "\u228A\uFE00",
    'varsubsetneqq': "\u2ACB\uFE00",
    'varsupsetneq': "\u228B\uFE00",
    'varsupsetneqq': "\u2ACC\uFE00",
    'vartheta': "\u03D1",
    'vartriangleleft': "\u22B2",
    'vartriangleright': "\u22B3",
    'vBar': "\u2AE8",
    'Vbar': "\u2AEB",
    'vBarv': "\u2AE9",
    'vcy': "\u0432",
    'Vcy': "\u0412",
    'vdash': "\u22A2",
    'vDash': "\u22A8",
    'Vdash': "\u22A9",
    'VDash': "\u22AB",
    'Vdashl': "\u2AE6",
    'vee': "\u2228",
    'Vee': "\u22C1",
    'veebar': "\u22BB",
    'veeeq': "\u225A",
    'vellip': "\u22EE",
    'verbar': '|',
    'Verbar': "\u2016",
    'vert': '|',
    'Vert': "\u2016",
    'VerticalBar': "\u2223",
    'VerticalLine': '|',
    'VerticalSeparator': "\u2758",
    'VerticalTilde': "\u2240",
    'VeryThinSpace': "\u200A",
    'vfr': "\uD835\uDD33",
    'Vfr': "\uD835\uDD19",
    'vltri': "\u22B2",
    'vnsub': "\u2282\u20D2",
    'vnsup': "\u2283\u20D2",
    'vopf': "\uD835\uDD67",
    'Vopf': "\uD835\uDD4D",
    'vprop': "\u221D",
    'vrtri': "\u22B3",
    'vscr': "\uD835\uDCCB",
    'Vscr': "\uD835\uDCB1",
    'vsubne': "\u228A\uFE00",
    'vsubnE': "\u2ACB\uFE00",
    'vsupne': "\u228B\uFE00",
    'vsupnE': "\u2ACC\uFE00",
    'Vvdash': "\u22AA",
    'vzigzag': "\u299A",
    'wcirc': "\u0175",
    'Wcirc': "\u0174",
    'wedbar': "\u2A5F",
    'wedge': "\u2227",
    'Wedge': "\u22C0",
    'wedgeq': "\u2259",
    'weierp': "\u2118",
    'wfr': "\uD835\uDD34",
    'Wfr': "\uD835\uDD1A",
    'wopf': "\uD835\uDD68",
    'Wopf': "\uD835\uDD4E",
    'wp': "\u2118",
    'wr': "\u2240",
    'wreath': "\u2240",
    'wscr': "\uD835\uDCCC",
    'Wscr': "\uD835\uDCB2",
    'xcap': "\u22C2",
    'xcirc': "\u25EF",
    'xcup': "\u22C3",
    'xdtri': "\u25BD",
    'xfr': "\uD835\uDD35",
    'Xfr': "\uD835\uDD1B",
    'xharr': "\u27F7",
    'xhArr': "\u27FA",
    'xi': "\u03BE",
    'Xi': "\u039E",
    'xlarr': "\u27F5",
    'xlArr': "\u27F8",
    'xmap': "\u27FC",
    'xnis': "\u22FB",
    'xodot': "\u2A00",
    'xopf': "\uD835\uDD69",
    'Xopf': "\uD835\uDD4F",
    'xoplus': "\u2A01",
    'xotime': "\u2A02",
    'xrarr': "\u27F6",
    'xrArr': "\u27F9",
    'xscr': "\uD835\uDCCD",
    'Xscr': "\uD835\uDCB3",
    'xsqcup': "\u2A06",
    'xuplus': "\u2A04",
    'xutri': "\u25B3",
    'xvee': "\u22C1",
    'xwedge': "\u22C0",
    'yacute': '\xFD',
    'Yacute': '\xDD',
    'yacy': "\u044F",
    'YAcy': "\u042F",
    'ycirc': "\u0177",
    'Ycirc': "\u0176",
    'ycy': "\u044B",
    'Ycy': "\u042B",
    'yen': '\xA5',
    'yfr': "\uD835\uDD36",
    'Yfr': "\uD835\uDD1C",
    'yicy': "\u0457",
    'YIcy': "\u0407",
    'yopf': "\uD835\uDD6A",
    'Yopf': "\uD835\uDD50",
    'yscr': "\uD835\uDCCE",
    'Yscr': "\uD835\uDCB4",
    'yucy': "\u044E",
    'YUcy': "\u042E",
    'yuml': '\xFF',
    'Yuml': "\u0178",
    'zacute': "\u017A",
    'Zacute': "\u0179",
    'zcaron': "\u017E",
    'Zcaron': "\u017D",
    'zcy': "\u0437",
    'Zcy': "\u0417",
    'zdot': "\u017C",
    'Zdot': "\u017B",
    'zeetrf': "\u2128",
    'ZeroWidthSpace': "\u200B",
    'zeta': "\u03B6",
    'Zeta': "\u0396",
    'zfr': "\uD835\uDD37",
    'Zfr': "\u2128",
    'zhcy': "\u0436",
    'ZHcy': "\u0416",
    'zigrarr': "\u21DD",
    'zopf': "\uD835\uDD6B",
    'Zopf': "\u2124",
    'zscr': "\uD835\uDCCF",
    'Zscr': "\uD835\uDCB5",
    'zwj': "\u200D",
    'zwnj': "\u200C"
  };
  var decodeMapLegacy = {
    'aacute': '\xE1',
    'Aacute': '\xC1',
    'acirc': '\xE2',
    'Acirc': '\xC2',
    'acute': '\xB4',
    'aelig': '\xE6',
    'AElig': '\xC6',
    'agrave': '\xE0',
    'Agrave': '\xC0',
    'amp': '&',
    'AMP': '&',
    'aring': '\xE5',
    'Aring': '\xC5',
    'atilde': '\xE3',
    'Atilde': '\xC3',
    'auml': '\xE4',
    'Auml': '\xC4',
    'brvbar': '\xA6',
    'ccedil': '\xE7',
    'Ccedil': '\xC7',
    'cedil': '\xB8',
    'cent': '\xA2',
    'copy': '\xA9',
    'COPY': '\xA9',
    'curren': '\xA4',
    'deg': '\xB0',
    'divide': '\xF7',
    'eacute': '\xE9',
    'Eacute': '\xC9',
    'ecirc': '\xEA',
    'Ecirc': '\xCA',
    'egrave': '\xE8',
    'Egrave': '\xC8',
    'eth': '\xF0',
    'ETH': '\xD0',
    'euml': '\xEB',
    'Euml': '\xCB',
    'frac12': '\xBD',
    'frac14': '\xBC',
    'frac34': '\xBE',
    'gt': '>',
    'GT': '>',
    'iacute': '\xED',
    'Iacute': '\xCD',
    'icirc': '\xEE',
    'Icirc': '\xCE',
    'iexcl': '\xA1',
    'igrave': '\xEC',
    'Igrave': '\xCC',
    'iquest': '\xBF',
    'iuml': '\xEF',
    'Iuml': '\xCF',
    'laquo': '\xAB',
    'lt': '<',
    'LT': '<',
    'macr': '\xAF',
    'micro': '\xB5',
    'middot': '\xB7',
    'nbsp': '\xA0',
    'not': '\xAC',
    'ntilde': '\xF1',
    'Ntilde': '\xD1',
    'oacute': '\xF3',
    'Oacute': '\xD3',
    'ocirc': '\xF4',
    'Ocirc': '\xD4',
    'ograve': '\xF2',
    'Ograve': '\xD2',
    'ordf': '\xAA',
    'ordm': '\xBA',
    'oslash': '\xF8',
    'Oslash': '\xD8',
    'otilde': '\xF5',
    'Otilde': '\xD5',
    'ouml': '\xF6',
    'Ouml': '\xD6',
    'para': '\xB6',
    'plusmn': '\xB1',
    'pound': '\xA3',
    'quot': '"',
    'QUOT': '"',
    'raquo': '\xBB',
    'reg': '\xAE',
    'REG': '\xAE',
    'sect': '\xA7',
    'shy': '\xAD',
    'sup1': '\xB9',
    'sup2': '\xB2',
    'sup3': '\xB3',
    'szlig': '\xDF',
    'thorn': '\xFE',
    'THORN': '\xDE',
    'times': '\xD7',
    'uacute': '\xFA',
    'Uacute': '\xDA',
    'ucirc': '\xFB',
    'Ucirc': '\xDB',
    'ugrave': '\xF9',
    'Ugrave': '\xD9',
    'uml': '\xA8',
    'uuml': '\xFC',
    'Uuml': '\xDC',
    'yacute': '\xFD',
    'Yacute': '\xDD',
    'yen': '\xA5',
    'yuml': '\xFF'
  };
  var decodeMapNumeric = {
    '0': "\uFFFD",
    '128': "\u20AC",
    '130': "\u201A",
    '131': "\u0192",
    '132': "\u201E",
    '133': "\u2026",
    '134': "\u2020",
    '135': "\u2021",
    '136': "\u02C6",
    '137': "\u2030",
    '138': "\u0160",
    '139': "\u2039",
    '140': "\u0152",
    '142': "\u017D",
    '145': "\u2018",
    '146': "\u2019",
    '147': "\u201C",
    '148': "\u201D",
    '149': "\u2022",
    '150': "\u2013",
    '151': "\u2014",
    '152': "\u02DC",
    '153': "\u2122",
    '154': "\u0161",
    '155': "\u203A",
    '156': "\u0153",
    '158': "\u017E",
    '159': "\u0178"
  };
  var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65000, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
  /*--------------------------------------------------------------------------*/

  var stringFromCharCode = String.fromCharCode;
  var object = {};
  var hasOwnProperty = object.hasOwnProperty;

  var has = function has(object, propertyName) {
    return hasOwnProperty.call(object, propertyName);
  };

  var contains = function contains(array, value) {
    var index = -1;
    var length = array.length;

    while (++index < length) {
      if (array[index] == value) {
        return true;
      }
    }

    return false;
  };

  var merge = function merge(options, defaults) {
    if (!options) {
      return defaults;
    }

    var result = {};
    var key;

    for (key in defaults) {
      // A `hasOwnProperty` check is not needed here, since only recognized
      // option names are used anyway. Any others are ignored.
      result[key] = has(options, key) ? options[key] : defaults[key];
    }

    return result;
  }; // Modified version of `ucs2encode`; see https://mths.be/punycode.


  var codePointToSymbol = function codePointToSymbol(codePoint, strict) {
    var output = '';

    if (codePoint >= 0xD800 && codePoint <= 0xDFFF || codePoint > 0x10FFFF) {
      // See issue #4:
      // “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
      // greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
      // REPLACEMENT CHARACTER.”
      if (strict) {
        parseError('character reference outside the permissible Unicode range');
      }

      return "\uFFFD";
    }

    if (has(decodeMapNumeric, codePoint)) {
      if (strict) {
        parseError('disallowed character reference');
      }

      return decodeMapNumeric[codePoint];
    }

    if (strict && contains(invalidReferenceCodePoints, codePoint)) {
      parseError('disallowed character reference');
    }

    if (codePoint > 0xFFFF) {
      codePoint -= 0x10000;
      output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    output += stringFromCharCode(codePoint);
    return output;
  };

  var hexEscape = function hexEscape(codePoint) {
    return '&#x' + codePoint.toString(16).toUpperCase() + ';';
  };

  var decEscape = function decEscape(codePoint) {
    return '&#' + codePoint + ';';
  };

  var parseError = function parseError(message) {
    throw Error('Parse error: ' + message);
  };
  /*--------------------------------------------------------------------------*/


  var encode = function encode(string, options) {
    options = merge(options, encode.options);
    var strict = options.strict;

    if (strict && regexInvalidRawCodePoint.test(string)) {
      parseError('forbidden code point');
    }

    var encodeEverything = options.encodeEverything;
    var useNamedReferences = options.useNamedReferences;
    var allowUnsafeSymbols = options.allowUnsafeSymbols;
    var escapeCodePoint = options.decimal ? decEscape : hexEscape;

    var escapeBmpSymbol = function escapeBmpSymbol(symbol) {
      return escapeCodePoint(symbol.charCodeAt(0));
    };

    if (encodeEverything) {
      // Encode ASCII symbols.
      string = string.replace(regexAsciiWhitelist, function (symbol) {
        // Use named references if requested & possible.
        if (useNamedReferences && has(encodeMap, symbol)) {
          return '&' + encodeMap[symbol] + ';';
        }

        return escapeBmpSymbol(symbol);
      }); // Shorten a few escapes that represent two symbols, of which at least one
      // is within the ASCII range.

      if (useNamedReferences) {
        string = string.replace(/&gt;\u20D2/g, '&nvgt;').replace(/&lt;\u20D2/g, '&nvlt;').replace(/&#x66;&#x6A;/g, '&fjlig;');
      } // Encode non-ASCII symbols.


      if (useNamedReferences) {
        // Encode non-ASCII symbols that can be replaced with a named reference.
        string = string.replace(regexEncodeNonAscii, function (string) {
          // Note: there is no need to check `has(encodeMap, string)` here.
          return '&' + encodeMap[string] + ';';
        });
      } // Note: any remaining non-ASCII symbols are handled outside of the `if`.

    } else if (useNamedReferences) {
      // Apply named character references.
      // Encode `<>"'&` using named character references.
      if (!allowUnsafeSymbols) {
        string = string.replace(regexEscape, function (string) {
          return '&' + encodeMap[string] + ';'; // no need to check `has()` here
        });
      } // Shorten escapes that represent two symbols, of which at least one is
      // `<>"'&`.


      string = string.replace(/&gt;\u20D2/g, '&nvgt;').replace(/&lt;\u20D2/g, '&nvlt;'); // Encode non-ASCII symbols that can be replaced with a named reference.

      string = string.replace(regexEncodeNonAscii, function (string) {
        // Note: there is no need to check `has(encodeMap, string)` here.
        return '&' + encodeMap[string] + ';';
      });
    } else if (!allowUnsafeSymbols) {
      // Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
      // using named character references.
      string = string.replace(regexEscape, escapeBmpSymbol);
    }

    return string // Encode astral symbols.
    .replace(regexAstralSymbols, function ($0) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      var high = $0.charCodeAt(0);
      var low = $0.charCodeAt(1);
      var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
      return escapeCodePoint(codePoint);
    }) // Encode any remaining BMP symbols that are not printable ASCII symbols
    // using a hexadecimal escape.
    .replace(regexBmpWhitelist, escapeBmpSymbol);
  }; // Expose default options (so they can be overridden globally).


  encode.options = {
    'allowUnsafeSymbols': false,
    'encodeEverything': false,
    'strict': false,
    'useNamedReferences': false,
    'decimal': false
  };

  var decode = function decode(html, options) {
    options = merge(options, decode.options);
    var strict = options.strict;

    if (strict && regexInvalidEntity.test(html)) {
      parseError('malformed character reference');
    }

    return html.replace(regexDecode, function ($0, $1, $2, $3, $4, $5, $6, $7, $8) {
      var codePoint;
      var semicolon;
      var decDigits;
      var hexDigits;
      var reference;
      var next;

      if ($1) {
        reference = $1; // Note: there is no need to check `has(decodeMap, reference)`.

        return decodeMap[reference];
      }

      if ($2) {
        // Decode named character references without trailing `;`, e.g. `&amp`.
        // This is only a parse error if it gets converted to `&`, or if it is
        // followed by `=` in an attribute context.
        reference = $2;
        next = $3;

        if (next && options.isAttributeValue) {
          if (strict && next == '=') {
            parseError('`&` did not start a character reference');
          }

          return $0;
        } else {
          if (strict) {
            parseError('named character reference was not terminated by a semicolon');
          } // Note: there is no need to check `has(decodeMapLegacy, reference)`.


          return decodeMapLegacy[reference] + (next || '');
        }
      }

      if ($4) {
        // Decode decimal escapes, e.g. `&#119558;`.
        decDigits = $4;
        semicolon = $5;

        if (strict && !semicolon) {
          parseError('character reference was not terminated by a semicolon');
        }

        codePoint = parseInt(decDigits, 10);
        return codePointToSymbol(codePoint, strict);
      }

      if ($6) {
        // Decode hexadecimal escapes, e.g. `&#x1D306;`.
        hexDigits = $6;
        semicolon = $7;

        if (strict && !semicolon) {
          parseError('character reference was not terminated by a semicolon');
        }

        codePoint = parseInt(hexDigits, 16);
        return codePointToSymbol(codePoint, strict);
      } // If we’re still here, `if ($7)` is implied; it’s an ambiguous
      // ampersand for sure. https://mths.be/notes/ambiguous-ampersands


      if (strict) {
        parseError('named character reference was not terminated by a semicolon');
      }

      return $0;
    });
  }; // Expose default options (so they can be overridden globally).


  decode.options = {
    'isAttributeValue': false,
    'strict': false
  };

  var escape = function escape(string) {
    return string.replace(regexEscape, function ($0) {
      // Note: there is no need to check `has(escapeMap, $0)` here.
      return escapeMap[$0];
    });
  };
  /*--------------------------------------------------------------------------*/


  var he = {
    'version': '1.2.0',
    'encode': encode,
    'decode': decode,
    'escape': escape,
    'unescape': decode
  }; // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:

  if ( true && _typeof(__webpack_require__.amdO) == 'object' && __webpack_require__.amdO) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return he;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (freeExports && !freeExports.nodeType) {
    if (freeModule) {
      // in Node.js, io.js, or RingoJS v0.8.0+
      freeModule.exports = he;
    } else {
      // in Narwhal or RingoJS v0.7.0-
      for (var key in he) {
        has(he, key) && (freeExports[key] = he[key]);
      }
    }
  } else {
    // in Rhino or a web browser
    root.he = he;
  }
})(this);

/***/ }),

/***/ "./node_modules/libram/dist/Clan.js":
/*!******************************************!*\
  !*** ./node_modules/libram/dist/Clan.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clan": () => (/* binding */ Clan)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_html_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-html-parser */ "./node_modules/node-html-parser/dist/esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/libram/dist/utils.js");
function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



 // It would be fantastic to have this function properly typed
// But until someone can work out how to do it, it gets the
// comment blocks of shame

/* eslint-disable */

function validate(target, propertyName, descriptor) {
  if (!(descriptor === null || descriptor === void 0 ? void 0 : descriptor.value)) return;
  var method = descriptor.value; // @ts-ignore

  descriptor.value = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    } // @ts-ignore


    if (this.id !== (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)()) {
      throw new Error("You are no longer a member of this clan");
    }

    return method.apply(this, args);
  };
}
/* eslint-enable */


var clanIdCache = {};

var toPlayerId = function toPlayerId(player) {
  return typeof player === "string" ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getPlayerId)(player) : player;
};

var Clan =
/** @class */
function () {
  function Clan(id, name) {
    this.id = id;
    this.name = name;
  }
  /**
   * Join a clan and return its instance
   * @param clanIdOrName Clan id or name
   */


  Clan.join = function (clanIdOrName) {
    var clanId;

    if (typeof clanIdOrName === "string") {
      var clanName_1 = clanIdOrName.toLowerCase();

      if (clanName_1 === (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)().toLowerCase()) {
        return Clan.get();
      }

      if (!(clanName_1 in clanIdCache)) {
        var clan = Clan.getWhitelisted().find(function (c) {
          return c.name.toLowerCase() === clanName_1;
        });

        if (!clan) {
          throw new Error("Player is not whitelisted to clan");
        }

        clanIdCache[clanName_1] = clan.id;
      }

      clanId = clanIdCache[clanName_1];
    } else {
      clanId = clanIdOrName;

      if (clanId === (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)()) {
        return Clan.get();
      }
    }

    var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("showclan.php?recruiter=1&whichclan=" + clanId + "&pwd&whichclan=" + clanId + "&action=joinclan&apply=Apply+to+this+Clan&confirm=on");

    if (!result.includes("clanhalltop.gif")) {
      throw new Error("Could not join clan");
    }

    return Clan.get();
  };
  /**
   * Return player's current Clan
   */


  Clan.get = function () {
    return new Clan((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)(), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)());
  };
  /**
   * Get list of clans to which the player is whitelisted
   */


  Clan.getWhitelisted = function () {
    var root = (0,node_html_parser__WEBPACK_IMPORTED_MODULE_1__.parse)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_signup.php"));
    return root.querySelectorAll('select[name="whichclan"] option').map(function (option) {
      var id = Number.parseInt(option.getAttribute("value"));
      var name = option.text;
      return new Clan(id, name);
    });
  };
  /**
   * Join clan
   */


  Clan.prototype.join = function () {
    var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("showclan.php?recruiter=1&whichclan=" + this.id + "&pwd&whichclan=" + this.id + "&action=joinclan&apply=Apply+to+this+Clan&confirm=on");

    if (!result.includes("clanhalltop.gif")) {
      throw new Error("Could not join clan");
    }

    return Clan.get();
  };
  /**
   * Return the monster that is currently in the current clan's fax machine if any
   */


  Clan.prototype.getCurrentFax = function () {
    var logs = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_log.php");
    var lastFax = logs.match(Clan.LOG_FAX_PATTERN);
    if (!lastFax) return null;
    var monsterName = lastFax[3];
    if (!monsterName) return null;
    return Monster.get(monsterName);
  };
  /**
   * List available ranks (name, degree and id) from the current clan
   */


  Clan.prototype.getRanks = function () {
    var root = (0,node_html_parser__WEBPACK_IMPORTED_MODULE_1__.parse)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_whitelist.php"));
    return root.querySelectorAll("select[name=level] option").map(function (option) {
      var match = option.text.match(Clan.WHITELIST_DEGREE_PATTERN);
      var id = option.getAttribute("value");
      if (!match || !id) return null;
      var name = match[1],
          degree = match[2];
      return {
        name: name,
        degree: Number.parseInt(degree),
        id: Number.parseInt(id)
      };
    }).filter(_utils__WEBPACK_IMPORTED_MODULE_2__.notNull);
  };
  /**
   * Add a player to the current clan's whitelist.
   * If the player is already in the whitelist this will change their rank or title.
   * @param player Player id or name
   * @param rankName Rank to give the player. If not provided they will be given the lowest rank
   * @param title Title to give the player. If not provided, will be blank
   */


  Clan.prototype.addPlayerToWhitelist = function (player, rankName, title) {
    if (title === void 0) {
      title = "";
    }

    var playerId = toPlayerId(player);
    var ranks = this.getRanks();
    var rank = rankName ? ranks.find(function (r) {
      return r.name === rankName;
    }) : ranks.sort(function (a, b) {
      return a.degree - b.degree;
    })[0];
    if (!rank) return false;
    var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_whitelist.php?action=add&pwd&addwho=" + playerId + "&level=" + rank.id + "&title=" + title);
    return result.includes("added to whitelist.") || result.includes("That player is already on the whitelist");
  };
  /**
   * Remove a player from the current clan's whitelist
   * @param player Player id or name
   */


  Clan.prototype.removePlayerFromWhitelist = function (player) {
    var playerId = toPlayerId(player);
    var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_whitelist.php?action=updatewl&pwd&who=" + playerId + "&remove=Remove");
    return result.includes("Whitelist updated.");
  };
  /**
   * Return the amount of meat in the current clan's coffer.
   */


  Clan.prototype.getMeatInCoffer = function () {
    var page = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_stash.php");

    var _a = page.match(/Your <b>Clan Coffer<\/b> contains ([\d,]+) Meat./) || ["0", "0"],
        meat = _a[1];

    return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.parseNumber)(meat);
  };
  /**
   * Add the given amount of meat to the current clan's coffer.
   * @param amount Amount of meat to put in coffer
   */


  Clan.prototype.putMeatInCoffer = function (amount) {
    var result = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_stash.php?pwd&action=contribute&howmuch=" + amount);
    return result.includes("You contributed");
  };

  Clan.LOG_FAX_PATTERN = /*#__PURE__*/_wrapRegExp(/([0-9]{2}\/[0-9]{2}\/[0-9]{2}, [0-9]{2}:[0-9]{2}(?:AM|PM): )<a (?:(?!>)[\s\S])+>((?:(?!<)[\s\S])+)<\/a>(?: faxed in a (.*?))<br>/, {
    monster: 3
  });
  Clan.WHITELIST_DEGREE_PATTERN = /*#__PURE__*/_wrapRegExp(/(.*?) \(\xB0([0-9]+)\)/, {
    name: 1,
    degree: 2
  });

  __decorate([validate], Clan.prototype, "getCurrentFax", null);

  __decorate([validate], Clan.prototype, "getRanks", null);

  __decorate([validate], Clan.prototype, "addPlayerToWhitelist", null);

  __decorate([validate], Clan.prototype, "removePlayerFromWhitelist", null);

  __decorate([validate], Clan.prototype, "getMeatInCoffer", null);

  __decorate([validate], Clan.prototype, "putMeatInCoffer", null);

  return Clan;
}();



/***/ }),

/***/ "./node_modules/libram/dist/Copier.js":
/*!********************************************!*\
  !*** ./node_modules/libram/dist/Copier.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./node_modules/libram/dist/utils.js":
/*!*******************************************!*\
  !*** ./node_modules/libram/dist/utils.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "notNull": () => (/* binding */ notNull),
/* harmony export */   "parseNumber": () => (/* binding */ parseNumber),
/* harmony export */   "clamp": () => (/* binding */ clamp)
/* harmony export */ });
function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/***/ }),

/***/ "./node_modules/lodash-es/_Symbol.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_Symbol.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./node_modules/node-html-parser/dist/esm/back.js":
/*!********************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/back.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ arr_back)
/* harmony export */ });
function arr_back(arr) {
  return arr[arr.length - 1];
}

/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommentNode": () => (/* reexport safe */ _nodes_comment__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "HTMLElement": () => (/* reexport safe */ _nodes_html__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "parse": () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "default": () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "valid": () => (/* reexport safe */ _valid__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Node": () => (/* reexport safe */ _nodes_node__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "TextNode": () => (/* reexport safe */ _nodes_text__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "NodeType": () => (/* reexport safe */ _nodes_type__WEBPACK_IMPORTED_MODULE_6__.default)
/* harmony export */ });
/* harmony import */ var _nodes_comment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodes/comment */ "./node_modules/node-html-parser/dist/esm/nodes/comment.js");
/* harmony import */ var _nodes_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodes/html */ "./node_modules/node-html-parser/dist/esm/nodes/html.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse */ "./node_modules/node-html-parser/dist/esm/parse.js");
/* harmony import */ var _valid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./valid */ "./node_modules/node-html-parser/dist/esm/valid.js");
/* harmony import */ var _nodes_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nodes/node */ "./node_modules/node-html-parser/dist/esm/nodes/node.js");
/* harmony import */ var _nodes_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodes/text */ "./node_modules/node-html-parser/dist/esm/nodes/text.js");
/* harmony import */ var _nodes_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nodes/type */ "./node_modules/node-html-parser/dist/esm/nodes/type.js");








/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/matcher.js":
/*!***********************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/matcher.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matcher)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Cache to store generated match functions
 * @type {Object}
 */
var pMatchFunctionCache = {};

function compare_tagname(tag1, tag2) {
  if (!tag1) {
    return !tag2;
  }

  if (!tag2) {
    return !tag1;
  }

  return tag1.toLowerCase() === tag2.toLowerCase();
}
/**
 * Function cache
 */


var functionCache = {
  f145: function f145(el, tagName, classes) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];

    if (el.id !== tagName.substr(1)) {
      return false;
    }

    for (var cls = classes, i = 0; i < cls.length; i++) {
      if (el.classNames.indexOf(cls[i]) === -1) {
        return false;
      }
    }

    return true;
  },
  f45: function f45(el, tagName, classes) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];

    for (var cls = classes, i = 0; i < cls.length; i++) {
      if (el.classNames.indexOf(cls[i]) === -1) {
        return false;
      }
    }

    return true;
  },
  f15: function f15(el, tagName) {
    'use strict';

    tagName = tagName || '';

    if (el.id !== tagName.substr(1)) {
      return false;
    }

    return true;
  },
  f1: function f1(el, tagName) {
    'use strict';

    tagName = tagName || '';

    if (el.id !== tagName.substr(1)) {
      return false;
    }
  },
  f5: function f5() {
    'use strict';

    return true;
  },
  f55: function f55(el, tagName, classes, attr_key) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];
    attr_key = attr_key || '';
    var attrs = el.attributes;
    return attrs.hasOwnProperty(attr_key);
  },
  f245: function f245(el, tagName, classes, attr_key, value) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];
    attr_key = (attr_key || '').toLowerCase();
    value = value || '';
    var attrs = el.attributes;
    return Object.keys(attrs).some(function (key) {
      var val = attrs[key];
      return key.toLowerCase() === attr_key && val === value;
    }); // for (let cls = classes, i = 0; i < cls.length; i++) {if (el.classNames.indexOf(cls[i]) === -1){ return false;}}
    // return true;
  },
  f25: function f25(el, tagName, classes, attr_key, value) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];
    attr_key = (attr_key || '').toLowerCase();
    value = value || '';
    var attrs = el.attributes;
    return Object.keys(attrs).some(function (key) {
      var val = attrs[key];
      return key.toLowerCase() === attr_key && val === value;
    }); // return true;
  },
  f2: function f2(el, tagName, classes, attr_key, value) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];
    attr_key = (attr_key || '').toLowerCase();
    value = value || '';
    var attrs = el.attributes;
    return Object.keys(attrs).some(function (key) {
      var val = attrs[key];
      return key.toLowerCase() === attr_key && val === value;
    });
  },
  f345: function f345(el, tagName, classes) {
    'use strict';

    tagName = tagName || '';
    classes = classes || [];

    if (!compare_tagname(el.tagName, tagName)) {
      return false;
    }

    for (var cls = classes, i = 0; i < cls.length; i++) {
      if (el.classNames.indexOf(cls[i]) === -1) {
        return false;
      }
    }

    return true;
  },
  f35: function f35(el, tagName) {
    'use strict';

    tagName = tagName || '';
    return compare_tagname(el.tagName, tagName);
  },
  f3: function f3(el, tagName) {
    'use strict';

    tagName = tagName || ''; // if (el.tagName !== tagName) {
    // 	return false;
    // }

    return compare_tagname(el.tagName, tagName);
  }
};
/**
 * Matcher class to make CSS match
 *
 * @class Matcher
 */

var Matcher = /*#__PURE__*/function () {
  /**
   * Creates an instance of Matcher.
   * @param {string} selector
   *
   * @memberof Matcher
   */
  function Matcher(selector) {
    _classCallCheck(this, Matcher);

    this.nextMatch = 0;
    this.matchers = selector.split(' ').map(function (matcher) {
      if (pMatchFunctionCache[matcher]) {
        return pMatchFunctionCache[matcher];
      }

      var parts = matcher.split('.');
      var tagName = parts[0];
      var classes = parts.slice(1).sort(); // let source = '"use strict";';

      var function_name = 'f';
      var attr_key = '';
      var value = '';

      if (tagName && tagName !== '*') {
        if (tagName.startsWith('#')) {
          // source += 'if (el.id != ' + JSON.stringify(tagName.substr(1)) + ') return false;';// 1
          function_name += '1';
        } else {
          // https://github.com/taoqf/node-html-parser/issues/86
          // const reg = /\[\s*([\w-]+)(\s*=\s*(((?<quote>'|")\s*(.*)(\k<quote>))|(\S*)))?\s*\]/.exec(tagName);
          // `[a-b]`,`[ a-b ]`,`[a-b=c]`, `[a-b=c'd]`,`[a-b='c\' d"e ']`,`[ a-b = 'c\' d"e ' ]`,`[a-b="c' d\"e " ]`,`[ a-b = "c' d\"e " ]`
          var reg = /\[\s*([\w-]+)(\s*=\s*(('\s*(.*)'|"\s*(.*)")|(\S*)))?\s*\]/.exec(tagName);

          if (reg) {
            attr_key = reg[1];
            value = reg[5] || reg[6] || reg[7]; // source += `let attrs = el.attributes;for (let key in attrs){const val = attrs[key]; if (key == "${attr_key}" && val == "${value}"){return true;}} return false;`;// 2

            function_name += '2';
          } else {
            // source += 'if (el.tagName != ' + JSON.stringify(tagName) + ') return false;';// 3
            function_name += '3';
          }
        }
      }

      if (classes.length > 0) {
        // source += 'for (let cls = ' + JSON.stringify(classes) + ', i = 0; i < cls.length; i++) if (el.classNames.indexOf(cls[i]) === -1) return false;';// 4
        function_name += '4';
      } // source += 'return true;';// 5


      function_name += '5';
      var obj = {
        func: functionCache[function_name],
        tagName: tagName || '',
        classes: classes || '',
        attr_key: attr_key || '',
        value: value || ''
      }; // source = source || '';

      return pMatchFunctionCache[matcher] = obj;
    });
  }
  /**
   * Trying to advance match pointer
   * @param  {HTMLElement} el element to make the match
   * @return {bool}           true when pointer advanced.
   */


  _createClass(Matcher, [{
    key: "advance",
    value: function advance(el) {
      if (this.nextMatch < this.matchers.length && this.matchers[this.nextMatch].func(el, this.matchers[this.nextMatch].tagName, this.matchers[this.nextMatch].classes, this.matchers[this.nextMatch].attr_key, this.matchers[this.nextMatch].value)) {
        this.nextMatch++;
        return true;
      }

      return false;
    }
    /**
     * Rewind the match pointer
     */

  }, {
    key: "rewind",
    value: function rewind() {
      this.nextMatch--;
    }
    /**
     * Trying to determine if match made.
     * @return {bool} true when the match is made
     */

  }, {
    key: "matched",
    get: function get() {
      return this.nextMatch === this.matchers.length;
    }
    /**
     * Rest match pointer.
     * @return {[type]} [description]
     */

  }, {
    key: "reset",
    value: function reset() {
      this.nextMatch = 0;
    }
    /**
     * flush cache to free memory
     */

  }, {
    key: "flushCache",
    value: function flushCache() {
      pMatchFunctionCache = {};
    }
  }]);

  return Matcher;
}();



/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/nodes/comment.js":
/*!*****************************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/nodes/comment.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CommentNode)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./node_modules/node-html-parser/dist/esm/nodes/node.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./node_modules/node-html-parser/dist/esm/nodes/type.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var CommentNode = /*#__PURE__*/function (_Node) {
  _inherits(CommentNode, _Node);

  var _super = _createSuper(CommentNode);

  function CommentNode(rawText) {
    var _this;

    _classCallCheck(this, CommentNode);

    _this = _super.call(this);
    _this.rawText = rawText;
    /**
     * Node Type declaration.
     * @type {Number}
     */

    _this.nodeType = _type__WEBPACK_IMPORTED_MODULE_1__.default.COMMENT_NODE;
    return _this;
  }
  /**
   * Get unescaped text value of current node and its children.
   * @return {string} text content
   */


  _createClass(CommentNode, [{
    key: "text",
    get: function get() {
      return this.rawText;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "<!--".concat(this.rawText, "-->");
    }
  }]);

  return CommentNode;
}(_node__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/nodes/html.js":
/*!**************************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/nodes/html.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLElement),
/* harmony export */   "base_parse": () => (/* binding */ base_parse)
/* harmony export */ });
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node */ "./node_modules/node-html-parser/dist/esm/nodes/node.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type */ "./node_modules/node-html-parser/dist/esm/nodes/type.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text */ "./node_modules/node-html-parser/dist/esm/nodes/text.js");
/* harmony import */ var _matcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../matcher */ "./node_modules/node-html-parser/dist/esm/matcher.js");
/* harmony import */ var _back__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../back */ "./node_modules/node-html-parser/dist/esm/back.js");
/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./comment */ "./node_modules/node-html-parser/dist/esm/nodes/comment.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../parse */ "./node_modules/node-html-parser/dist/esm/parse.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var decode = (he__WEBPACK_IMPORTED_MODULE_0___default().decode);
var kBlockElements = new Map();
kBlockElements.set('DIV', true);
kBlockElements.set('div', true);
kBlockElements.set('P', true);
kBlockElements.set('p', true); // ul: true,
// ol: true,

kBlockElements.set('LI', true);
kBlockElements.set('li', true); // table: true,
// tr: true,

kBlockElements.set('TD', true);
kBlockElements.set('td', true);
kBlockElements.set('SECTION', true);
kBlockElements.set('section', true);
kBlockElements.set('BR', true);
kBlockElements.set('br', true);
/**
 * HTMLElement, which contains a set of children.
 *
 * Note: this is a minimalist implementation, no complete tree
 *   structure provided (no parentNode, nextSibling,
 *   previousSibling etc).
 * @class HTMLElement
 * @extends {Node}
 */

var HTMLElement = /*#__PURE__*/function (_Node) {
  _inherits(HTMLElement, _Node);

  var _super = _createSuper(HTMLElement);

  /**
   * Creates an instance of HTMLElement.
   * @param keyAttrs	id and class attribute
   * @param [rawAttrs]	attributes in string
   *
   * @memberof HTMLElement
   */
  function HTMLElement(tagName, keyAttrs) {
    var _this;

    var rawAttrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, HTMLElement);

    _this = _super.call(this);
    _this.rawAttrs = rawAttrs;
    _this.parentNode = parentNode;
    _this.classNames = [];
    /**
     * Node Type declaration.
     */

    _this.nodeType = _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE;
    _this.rawTagName = tagName;
    _this.rawAttrs = rawAttrs || '';
    _this.childNodes = [];

    if (keyAttrs.id) {
      _this.id = keyAttrs.id;

      if (!rawAttrs) {
        _this.rawAttrs = "id=\"".concat(keyAttrs.id, "\"");
      }
    }

    if (keyAttrs["class"]) {
      _this.classNames = keyAttrs["class"].split(/\s+/);

      if (!rawAttrs) {
        var cls = "class=\"".concat(_this.classNames.join(' '), "\"");

        if (_this.rawAttrs) {
          _this.rawAttrs += " ".concat(cls);
        } else {
          _this.rawAttrs = cls;
        }
      }
    }

    return _this;
  }
  /**
   * Remove current element
   */


  _createClass(HTMLElement, [{
    key: "remove",
    value: function remove() {
      var _this2 = this;

      if (this.parentNode) {
        var children = this.parentNode.childNodes;
        this.parentNode.childNodes = children.filter(function (child) {
          return _this2 !== child;
        });
      }
    }
    /**
     * Remove Child element from childNodes array
     * @param {HTMLElement} node     node to remove
     */

  }, {
    key: "removeChild",
    value: function removeChild(node) {
      this.childNodes = this.childNodes.filter(function (child) {
        return child !== node;
      });
    }
    /**
     * Exchanges given child with new child
     * @param {HTMLElement} oldNode     node to exchange
     * @param {HTMLElement} newNode     new node
     */

  }, {
    key: "exchangeChild",
    value: function exchangeChild(oldNode, newNode) {
      var children = this.childNodes;
      this.childNodes = children.map(function (child) {
        if (child === oldNode) {
          return newNode;
        }

        return child;
      });
    }
  }, {
    key: "tagName",
    get: function get() {
      return this.rawTagName ? this.rawTagName.toUpperCase() : this.rawTagName;
    }
    /**
     * Get escpaed (as-it) text value of current node and its children.
     * @return {string} text content
     */

  }, {
    key: "rawText",
    get: function get() {
      return this.childNodes.reduce(function (pre, cur) {
        return pre += cur.rawText;
      }, '');
    }
  }, {
    key: "textContent",
    get: function get() {
      return this.rawText;
    },
    set: function set(val) {
      var content = [new _text__WEBPACK_IMPORTED_MODULE_3__.default(val)];
      this.childNodes = content;
    }
    /**
     * Get unescaped text value of current node and its children.
     * @return {string} text content
     */

  }, {
    key: "text",
    get: function get() {
      return decode(this.rawText);
    }
    /**
     * Get structured Text (with '\n' etc.)
     * @return {string} structured text
     */

  }, {
    key: "structuredText",
    get: function get() {
      var currentBlock = [];
      var blocks = [currentBlock];

      function dfs(node) {
        if (node.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE) {
          if (kBlockElements.get(node.rawTagName)) {
            if (currentBlock.length > 0) {
              blocks.push(currentBlock = []);
            }

            node.childNodes.forEach(dfs);

            if (currentBlock.length > 0) {
              blocks.push(currentBlock = []);
            }
          } else {
            node.childNodes.forEach(dfs);
          }
        } else if (node.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.TEXT_NODE) {
          if (node.isWhitespace) {
            // Whitespace node, postponed output
            currentBlock.prependWhitespace = true;
          } else {
            var text = node.text;

            if (currentBlock.prependWhitespace) {
              text = " ".concat(text);
              currentBlock.prependWhitespace = false;
            }

            currentBlock.push(text);
          }
        }
      }

      dfs(this);
      return blocks.map(function (block) {
        // Normalize each line's whitespace
        return block.join('').trim().replace(/\s{2,}/g, ' ');
      }).join('\n').replace(/\s+$/, ''); // trimRight;
    }
  }, {
    key: "toString",
    value: function toString() {
      var tag = this.rawTagName;

      if (tag) {
        var is_void = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(tag);
        var attrs = this.rawAttrs ? " ".concat(this.rawAttrs) : '';

        if (is_void) {
          return "<".concat(tag).concat(attrs, ">");
        }

        return "<".concat(tag).concat(attrs, ">").concat(this.innerHTML, "</").concat(tag, ">");
      }

      return this.innerHTML;
    }
  }, {
    key: "innerHTML",
    get: function get() {
      return this.childNodes.map(function (child) {
        return child.toString();
      }).join('');
    }
  }, {
    key: "set_content",
    value: function set_content(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (content instanceof _node__WEBPACK_IMPORTED_MODULE_1__.default) {
        content = [content];
      } else if (typeof content == 'string') {
        var r = (0,_parse__WEBPACK_IMPORTED_MODULE_7__.default)(content, options);
        content = r.childNodes.length ? r.childNodes : [new _text__WEBPACK_IMPORTED_MODULE_3__.default(content)];
      }

      this.childNodes = content;
    }
  }, {
    key: "outerHTML",
    get: function get() {
      return this.toString();
    }
    /**
     * Trim element from right (in block) after seeing pattern in a TextNode.
     * @param  {RegExp} pattern pattern to find
     * @return {HTMLElement}    reference to current node
     */

  }, {
    key: "trimRight",
    value: function trimRight(pattern) {
      for (var i = 0; i < this.childNodes.length; i++) {
        var childNode = this.childNodes[i];

        if (childNode.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE) {
          childNode.trimRight(pattern);
        } else {
          var index = childNode.rawText.search(pattern);

          if (index > -1) {
            childNode.rawText = childNode.rawText.substr(0, index); // trim all following nodes.

            this.childNodes.length = i + 1;
          }
        }
      }

      return this;
    }
    /**
     * Get DOM structure
     * @return {string} strucutre
     */

  }, {
    key: "structure",
    get: function get() {
      var res = [];
      var indention = 0;

      function write(str) {
        res.push('  '.repeat(indention) + str);
      }

      function dfs(node) {
        var idStr = node.id ? "#".concat(node.id) : '';
        var classStr = node.classNames.length ? ".".concat(node.classNames.join('.')) : '';
        write("".concat(node.rawTagName).concat(idStr).concat(classStr));
        indention++;
        node.childNodes.forEach(function (childNode) {
          if (childNode.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE) {
            dfs(childNode);
          } else if (childNode.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.TEXT_NODE) {
            if (!childNode.isWhitespace) {
              write('#text');
            }
          }
        });
        indention--;
      }

      dfs(this);
      return res.join('\n');
    }
    /**
     * Remove whitespaces in this sub tree.
     * @return {HTMLElement} pointer to this
     */

  }, {
    key: "removeWhitespace",
    value: function removeWhitespace() {
      var _this3 = this;

      var o = 0;
      this.childNodes.forEach(function (node) {
        if (node.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.TEXT_NODE) {
          if (node.isWhitespace) {
            return;
          }

          node.rawText = node.rawText.trim();
        } else if (node.nodeType === _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE) {
          node.removeWhitespace();
        }

        _this3.childNodes[o++] = node;
      });
      this.childNodes.length = o;
      return this;
    }
    /**
     * Query CSS selector to find matching nodes.
     * @param  {string}         selector Simplified CSS selector
     * @param  {Matcher}        selector A Matcher instance
     * @return {HTMLElement[]}  matching elements
     */

  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(selector) {
      var _this4 = this;

      var matcher;

      if (selector instanceof _matcher__WEBPACK_IMPORTED_MODULE_4__.default) {
        matcher = selector;
        matcher.reset();
      } else {
        if (selector.includes(',')) {
          var selectors = selector.split(',');
          return Array.from(selectors.reduce(function (pre, cur) {
            var result = _this4.querySelectorAll(cur.trim());

            return result.reduce(function (p, c) {
              return p.add(c);
            }, pre);
          }, new Set()));
        }

        matcher = new _matcher__WEBPACK_IMPORTED_MODULE_4__.default(selector);
      }

      var stack = [];
      return this.childNodes.reduce(function (res, cur) {
        stack.push([cur, 0, false]);

        while (stack.length) {
          var state = (0,_back__WEBPACK_IMPORTED_MODULE_5__.default)(stack); // get last element

          var el = state[0];

          if (state[1] === 0) {
            // Seen for first time.
            if (el.nodeType !== _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE) {
              stack.pop();
              continue;
            }

            var html_el = el;
            state[2] = matcher.advance(html_el);

            if (state[2]) {
              if (matcher.matched) {
                res.push(html_el);
                res.push.apply(res, _toConsumableArray(html_el.querySelectorAll(selector))); // no need to go further.

                matcher.rewind();
                stack.pop();
                continue;
              }
            }
          }

          if (state[1] < el.childNodes.length) {
            stack.push([el.childNodes[state[1]++], 0, false]);
          } else {
            if (state[2]) {
              matcher.rewind();
            }

            stack.pop();
          }
        }

        return res;
      }, []);
    }
    /**
     * Query CSS Selector to find matching node.
     * @param  {string}         selector Simplified CSS selector
     * @param  {Matcher}        selector A Matcher instance
     * @return {HTMLElement}    matching node
     */

  }, {
    key: "querySelector",
    value: function querySelector(selector) {
      var matcher;

      if (selector instanceof _matcher__WEBPACK_IMPORTED_MODULE_4__.default) {
        matcher = selector;
        matcher.reset();
      } else {
        matcher = new _matcher__WEBPACK_IMPORTED_MODULE_4__.default(selector);
      }

      var stack = [];

      var _iterator = _createForOfIteratorHelper(this.childNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          stack.push([node, 0, false]);

          while (stack.length) {
            var state = (0,_back__WEBPACK_IMPORTED_MODULE_5__.default)(stack);
            var el = state[0];

            if (state[1] === 0) {
              // Seen for first time.
              if (el.nodeType !== _type__WEBPACK_IMPORTED_MODULE_2__.default.ELEMENT_NODE) {
                stack.pop();
                continue;
              }

              state[2] = matcher.advance(el);

              if (state[2]) {
                if (matcher.matched) {
                  return el;
                }
              }
            }

            if (state[1] < el.childNodes.length) {
              stack.push([el.childNodes[state[1]++], 0, false]);
            } else {
              if (state[2]) {
                matcher.rewind();
              }

              stack.pop();
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
    /**
     * Append a child node to childNodes
     * @param  {Node} node node to append
     * @return {Node}      node appended
     */

  }, {
    key: "appendChild",
    value: function appendChild(node) {
      // node.parentNode = this;
      this.childNodes.push(node);

      if (node instanceof HTMLElement) {
        node.parentNode = this;
      }

      return node;
    }
    /**
     * Get first child node
     * @return {Node} first child node
     */

  }, {
    key: "firstChild",
    get: function get() {
      return this.childNodes[0];
    }
    /**
     * Get last child node
     * @return {Node} last child node
     */

  }, {
    key: "lastChild",
    get: function get() {
      return (0,_back__WEBPACK_IMPORTED_MODULE_5__.default)(this.childNodes);
    }
    /**
     * Get attributes
     * @return {Object} parsed and unescaped attributes
     */

  }, {
    key: "attributes",
    get: function get() {
      if (this._attrs) {
        return this._attrs;
      }

      this._attrs = {};
      var attrs = this.rawAttributes;

      for (var key in attrs) {
        var val = attrs[key] || '';
        this._attrs[key] = decode(val);
      }

      return this._attrs;
    }
    /**
     * Get escaped (as-it) attributes
     * @return {Object} parsed attributes
     */

  }, {
    key: "rawAttributes",
    get: function get() {
      if (this._rawAttrs) {
        return this._rawAttrs;
      }

      var attrs = {};

      if (this.rawAttrs) {
        var re = /\b([a-z][a-z0-9-_]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/ig;
        var match;

        while (match = re.exec(this.rawAttrs)) {
          attrs[match[1]] = match[2] || match[3] || match[4] || null;
        }
      }

      this._rawAttrs = attrs;
      return attrs;
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(key) {
      var attrs = this.rawAttributes;
      delete attrs[key]; // Update this.attribute

      if (this._attrs) {
        delete this._attrs[key];
      } // Update rawString


      this.rawAttrs = Object.keys(attrs).map(function (name) {
        var val = JSON.stringify(attrs[name]);

        if (val === undefined || val === 'null') {
          return name;
        }

        return "".concat(name, "=").concat(val);
      }).join(' ');
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(key) {
      return key in this.attributes;
    }
    /**
     * Get an attribute
     * @return {string} value of the attribute
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(key) {
      return this.attributes[key];
    }
    /**
     * Set an attribute value to the HTMLElement
     * @param {string} key The attribute name
     * @param {string} value The value to set, or null / undefined to remove an attribute
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (arguments.length < 2) {
        throw new Error('Failed to execute \'setAttribute\' on \'Element\'');
      }

      var attrs = this.rawAttributes;
      attrs[key] = String(value);

      if (this._attrs) {
        this._attrs[key] = decode(attrs[key]);
      } // Update rawString


      this.rawAttrs = Object.keys(attrs).map(function (name) {
        var val = JSON.stringify(attrs[name]);

        if (val === 'null' || val === '""') {
          return name;
        }

        return "".concat(name, "=").concat(val);
      }).join(' ');
    }
    /**
     * Replace all the attributes of the HTMLElement by the provided attributes
     * @param {Attributes} attributes the new attribute set
     */

  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      // Invalidate current this.attributes
      if (this._attrs) {
        delete this._attrs;
      } // Invalidate current this.rawAttributes


      if (this._rawAttrs) {
        delete this._rawAttrs;
      } // Update rawString


      this.rawAttrs = Object.keys(attributes).map(function (name) {
        var val = attributes[name];

        if (val === 'null' || val === '""') {
          return name;
        }

        return "".concat(name, "=").concat(JSON.stringify(String(val)));
      }).join(' ');
    }
  }, {
    key: "insertAdjacentHTML",
    value: function insertAdjacentHTML(where, html) {
      var _this5 = this;

      if (arguments.length < 2) {
        throw new Error('2 arguments required');
      }

      var p = (0,_parse__WEBPACK_IMPORTED_MODULE_7__.default)(html);

      if (where === 'afterend') {
        var _this$parentNode$chil;

        var idx = this.parentNode.childNodes.findIndex(function (child) {
          return child === _this5;
        });

        (_this$parentNode$chil = this.parentNode.childNodes).splice.apply(_this$parentNode$chil, [idx + 1, 0].concat(_toConsumableArray(p.childNodes)));

        p.childNodes.forEach(function (n) {
          if (n instanceof HTMLElement) {
            n.parentNode = _this5.parentNode;
          }
        });
      } else if (where === 'afterbegin') {
        var _this$childNodes;

        (_this$childNodes = this.childNodes).unshift.apply(_this$childNodes, _toConsumableArray(p.childNodes));
      } else if (where === 'beforeend') {
        p.childNodes.forEach(function (n) {
          _this5.appendChild(n);
        });
      } else if (where === 'beforebegin') {
        var _this$parentNode$chil2;

        var _idx = this.parentNode.childNodes.findIndex(function (child) {
          return child === _this5;
        });

        (_this$parentNode$chil2 = this.parentNode.childNodes).splice.apply(_this$parentNode$chil2, [_idx, 0].concat(_toConsumableArray(p.childNodes)));

        p.childNodes.forEach(function (n) {
          if (n instanceof HTMLElement) {
            n.parentNode = _this5.parentNode;
          }
        });
      } else {
        throw new Error("The value provided ('".concat(where, "') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'"));
      } // if (!where || html === undefined || html === null) {
      // 	return;
      // }

    }
  }, {
    key: "nextSibling",
    get: function get() {
      if (this.parentNode) {
        var children = this.parentNode.childNodes;
        var i = 0;

        while (i < children.length) {
          var child = children[i++];

          if (this === child) {
            return children[i] || null;
          }
        }

        return null;
      }
    }
  }, {
    key: "nextElementSibling",
    get: function get() {
      if (this.parentNode) {
        var children = this.parentNode.childNodes;
        var i = 0;
        var find = false;

        while (i < children.length) {
          var child = children[i++];

          if (find) {
            if (child instanceof HTMLElement) {
              return child || null;
            }
          } else if (this === child) {
            find = true;
          }
        }

        return null;
      }
    }
  }]);

  return HTMLElement;
}(_node__WEBPACK_IMPORTED_MODULE_1__.default); // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name



var kMarkupPattern = /<!--[^]*?(?=-->)-->|<(\/?)([a-z][-.:0-9_a-z]*)\s*([^>]*?)(\/?)>/ig; // <(?<tag>[^\s]*)(.*)>(.*)</\k<tag>>
// <([a-z][-.:0-9_a-z]*)\s*\/>
// <(area|base|br|col|hr|img|input|link|meta|source)\s*(.*)\/?>
// <(area|base|br|col|hr|img|input|link|meta|source)\s*(.*)\/?>|<(?<tag>[^\s]*)(.*)>(.*)</\k<tag>>

var kAttributePattern = /(^|\s)(id|class)\s*=\s*("([^"]+)"|'([^']+)'|(\S+))/ig;
var kSelfClosingElements = {
  area: true,
  AREA: true,
  base: true,
  BASE: true,
  br: true,
  BR: true,
  col: true,
  COL: true,
  hr: true,
  HR: true,
  img: true,
  IMG: true,
  input: true,
  INPUT: true,
  link: true,
  LINK: true,
  meta: true,
  META: true,
  source: true,
  SOURCE: true,
  embed: true,
  EMBED: true,
  param: true,
  PARAM: true,
  track: true,
  TRACK: true,
  wbr: true,
  WBR: true
};
var kElementsClosedByOpening = {
  li: {
    li: true,
    LI: true
  },
  LI: {
    li: true,
    LI: true
  },
  p: {
    p: true,
    div: true,
    P: true,
    DIV: true
  },
  P: {
    p: true,
    div: true,
    P: true,
    DIV: true
  },
  b: {
    div: true,
    DIV: true
  },
  B: {
    div: true,
    DIV: true
  },
  td: {
    td: true,
    th: true,
    TD: true,
    TH: true
  },
  TD: {
    td: true,
    th: true,
    TD: true,
    TH: true
  },
  th: {
    td: true,
    th: true,
    TD: true,
    TH: true
  },
  TH: {
    td: true,
    th: true,
    TD: true,
    TH: true
  },
  h1: {
    h1: true,
    H1: true
  },
  H1: {
    h1: true,
    H1: true
  },
  h2: {
    h2: true,
    H2: true
  },
  H2: {
    h2: true,
    H2: true
  },
  h3: {
    h3: true,
    H3: true
  },
  H3: {
    h3: true,
    H3: true
  },
  h4: {
    h4: true,
    H4: true
  },
  H4: {
    h4: true,
    H4: true
  },
  h5: {
    h5: true,
    H5: true
  },
  H5: {
    h5: true,
    H5: true
  },
  h6: {
    h6: true,
    H6: true
  },
  H6: {
    h6: true,
    H6: true
  }
};
var kElementsClosedByClosing = {
  li: {
    ul: true,
    ol: true,
    UL: true,
    OL: true
  },
  LI: {
    ul: true,
    ol: true,
    UL: true,
    OL: true
  },
  a: {
    div: true,
    DIV: true
  },
  A: {
    div: true,
    DIV: true
  },
  b: {
    div: true,
    DIV: true
  },
  B: {
    div: true,
    DIV: true
  },
  i: {
    div: true,
    DIV: true
  },
  I: {
    div: true,
    DIV: true
  },
  p: {
    div: true,
    DIV: true
  },
  P: {
    div: true,
    DIV: true
  },
  td: {
    tr: true,
    table: true,
    TR: true,
    TABLE: true
  },
  TD: {
    tr: true,
    table: true,
    TR: true,
    TABLE: true
  },
  th: {
    tr: true,
    table: true,
    TR: true,
    TABLE: true
  },
  TH: {
    tr: true,
    table: true,
    TR: true,
    TABLE: true
  }
};
var frameflag = 'documentfragmentcontainer';
/**
 * Parses HTML and returns a root element
 * Parse a chuck of HTML source.
 * @param  {string} data      html
 * @return {HTMLElement}      root element
 */

function base_parse(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    lowerCaseTagName: false,
    comment: false
  };
  var elements = options.blockTextElements || {
    script: true,
    noscript: true,
    style: true,
    pre: true
  };
  var element_names = Object.keys(elements);
  var kBlockTextElements = element_names.map(function (it) {
    return new RegExp(it, 'i');
  });
  var kIgnoreElements = element_names.filter(function (it) {
    return elements[it];
  }).map(function (it) {
    return new RegExp(it, 'i');
  });

  function element_should_be_ignore(tag) {
    return kIgnoreElements.some(function (it) {
      return it.test(tag);
    });
  }

  function is_block_text_element(tag) {
    return kBlockTextElements.some(function (it) {
      return it.test(tag);
    });
  }

  var root = new HTMLElement(null, {});
  var currentParent = root;
  var stack = [root];
  var lastTextPos = -1;
  var match; // https://github.com/taoqf/node-html-parser/issues/38

  data = "<".concat(frameflag, ">").concat(data, "</").concat(frameflag, ">");

  while (match = kMarkupPattern.exec(data)) {
    if (lastTextPos > -1) {
      if (lastTextPos + match[0].length < kMarkupPattern.lastIndex) {
        // if has content
        var text = data.substring(lastTextPos, kMarkupPattern.lastIndex - match[0].length);
        currentParent.appendChild(new _text__WEBPACK_IMPORTED_MODULE_3__.default(text));
      }
    }

    lastTextPos = kMarkupPattern.lastIndex;

    if (match[2] === frameflag) {
      continue;
    }

    if (match[0][1] === '!') {
      // this is a comment
      if (options.comment) {
        // Only keep what is in between <!-- and -->
        var _text = data.substring(lastTextPos - 3, lastTextPos - match[0].length + 4);

        currentParent.appendChild(new _comment__WEBPACK_IMPORTED_MODULE_6__.default(_text));
      }

      continue;
    }

    if (options.lowerCaseTagName) {
      match[2] = match[2].toLowerCase();
    }

    if (!match[1]) {
      // not </ tags
      var attrs = {};

      for (var attMatch; attMatch = kAttributePattern.exec(match[3]);) {
        attrs[attMatch[2].toLowerCase()] = attMatch[4] || attMatch[5] || attMatch[6];
      }

      var tagName = currentParent.rawTagName;

      if (!match[4] && kElementsClosedByOpening[tagName]) {
        if (kElementsClosedByOpening[tagName][match[2]]) {
          stack.pop();
          currentParent = (0,_back__WEBPACK_IMPORTED_MODULE_5__.default)(stack);
        }
      } // ignore container tag we add above
      // https://github.com/taoqf/node-html-parser/issues/38


      currentParent = currentParent.appendChild(new HTMLElement(match[2], attrs, match[3]));
      stack.push(currentParent);

      if (is_block_text_element(match[2])) {
        (function () {
          // a little test to find next </script> or </style> ...
          var closeMarkup = "</".concat(match[2], ">");

          var index = function () {
            if (options.lowerCaseTagName) {
              return data.toLocaleLowerCase().indexOf(closeMarkup, kMarkupPattern.lastIndex);
            }

            return data.indexOf(closeMarkup, kMarkupPattern.lastIndex);
          }();

          if (element_should_be_ignore(match[2])) {
            var _text2;

            if (index === -1) {
              // there is no matching ending for the text element.
              _text2 = data.substr(kMarkupPattern.lastIndex);
            } else {
              _text2 = data.substring(kMarkupPattern.lastIndex, index);
            }

            if (_text2.length > 0) {
              currentParent.appendChild(new _text__WEBPACK_IMPORTED_MODULE_3__.default(_text2));
            }
          }

          if (index === -1) {
            lastTextPos = kMarkupPattern.lastIndex = data.length + 1;
          } else {
            lastTextPos = kMarkupPattern.lastIndex = index + closeMarkup.length;
            match[1] = 'true';
          }
        })();
      }
    }

    if (match[1] || match[4] || kSelfClosingElements[match[2]]) {
      // </ or /> or <br> etc.
      while (true) {
        if (currentParent.rawTagName === match[2]) {
          stack.pop();
          currentParent = (0,_back__WEBPACK_IMPORTED_MODULE_5__.default)(stack);
          break;
        } else {
          var _tagName = currentParent.tagName; // Trying to close current tag, and move on

          if (kElementsClosedByClosing[_tagName]) {
            if (kElementsClosedByClosing[_tagName][match[2]]) {
              stack.pop();
              currentParent = (0,_back__WEBPACK_IMPORTED_MODULE_5__.default)(stack);
              continue;
            }
          } // Use aggressive strategy to handle unmatching markups.


          break;
        }
      }
    }
  }

  return stack;
}

/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/nodes/node.js":
/*!**************************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/nodes/node.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Node)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Node Class as base class for TextNode and HTMLElement.
 */
var Node = /*#__PURE__*/function () {
  function Node() {
    _classCallCheck(this, Node);

    this.childNodes = [];
  }

  _createClass(Node, [{
    key: "innerText",
    get: function get() {
      return this.rawText;
    }
  }, {
    key: "textContent",
    get: function get() {
      return this.rawText;
    },
    set: function set(val) {
      this.rawText = val;
    }
  }]);

  return Node;
}();



/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/nodes/text.js":
/*!**************************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/nodes/text.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextNode)
/* harmony export */ });
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type */ "./node_modules/node-html-parser/dist/esm/nodes/type.js");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node */ "./node_modules/node-html-parser/dist/esm/nodes/node.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



/**
 * TextNode to contain a text element in DOM tree.
 * @param {string} value [description]
 */

var TextNode = /*#__PURE__*/function (_Node) {
  _inherits(TextNode, _Node);

  var _super = _createSuper(TextNode);

  function TextNode(rawText) {
    var _this;

    _classCallCheck(this, TextNode);

    _this = _super.call(this);
    _this.rawText = rawText;
    /**
     * Node Type declaration.
     * @type {Number}
     */

    _this.nodeType = _type__WEBPACK_IMPORTED_MODULE_0__.default.TEXT_NODE;
    return _this;
  }
  /**
   * Get unescaped text value of current node and its children.
   * @return {string} text content
   */


  _createClass(TextNode, [{
    key: "text",
    get: function get() {
      return this.rawText;
    }
    /**
     * Detect if the node contains only white space.
     * @return {bool}
     */

  }, {
    key: "isWhitespace",
    get: function get() {
      return /^(\s|&nbsp;)*$/.test(this.rawText);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.text;
    }
  }]);

  return TextNode;
}(_node__WEBPACK_IMPORTED_MODULE_1__.default);



/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/nodes/type.js":
/*!**************************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/nodes/type.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NodeType;

(function (NodeType) {
  NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
  NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
  NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
})(NodeType || (NodeType = {}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NodeType);

/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/parse.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/parse.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _back__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./back */ "./node_modules/node-html-parser/dist/esm/back.js");
/* harmony import */ var _nodes_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodes/html */ "./node_modules/node-html-parser/dist/esm/nodes/html.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/**
 * Parses HTML and returns a root element
 * Parse a chuck of HTML source.
 */

function parse(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    lowerCaseTagName: false,
    comment: false
  };
  var stack = (0,_nodes_html__WEBPACK_IMPORTED_MODULE_1__.base_parse)(data, options);

  var _stack = _slicedToArray(stack, 1),
      root = _stack[0];

  var _loop = function _loop() {
    // Handle each error elements.
    var last = stack.pop();
    var oneBefore = (0,_back__WEBPACK_IMPORTED_MODULE_0__.default)(stack);

    if (last.parentNode && last.parentNode.parentNode) {
      if (last.parentNode === oneBefore && last.tagName === oneBefore.tagName) {
        // Pair error case <h3> <h3> handle : Fixes to <h3> </h3>
        oneBefore.removeChild(last);
        last.childNodes.forEach(function (child) {
          oneBefore.parentNode.appendChild(child);
        });
        stack.pop();
      } else {
        // Single error  <div> <h3> </div> handle: Just removes <h3>
        oneBefore.removeChild(last);
        last.childNodes.forEach(function (child) {
          oneBefore.appendChild(child);
        });
      }
    } else {// If it's final element just skip.
    }
  };

  while (stack.length > 1) {
    _loop();
  } // response.childNodes.forEach((node) => {
  // 	if (node instanceof HTMLElement) {
  // 		node.parentNode = null;
  // 	}
  // });


  return root;
}

/***/ }),

/***/ "./node_modules/node-html-parser/dist/esm/valid.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-html-parser/dist/esm/valid.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ valid)
/* harmony export */ });
/* harmony import */ var _nodes_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodes/html */ "./node_modules/node-html-parser/dist/esm/nodes/html.js");

/**
 * Parses HTML and returns a root element
 * Parse a chuck of HTML source.
 */

function valid(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    lowerCaseTagName: false,
    comment: false
  };
  var stack = (0,_nodes_html__WEBPACK_IMPORTED_MODULE_0__.base_parse)(data, options);
  return Boolean(stack.length === 1);
}

/***/ }),

/***/ "./src/asdon.ts":
/*!**********************!*\
  !*** ./src/asdon.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateFuelEfficiency": () => (/* binding */ calculateFuelEfficiency),
/* harmony export */   "fillAsdonMartinTo": () => (/* binding */ fillAsdonMartinTo),
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var fuelBlacklist = (0,libram__WEBPACK_IMPORTED_MODULE_1__.$items)(_templateObject || (_templateObject = _taggedTemplateLiteral(["cup of \"tea\", thermos of \"whiskey\", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of \"milk\", drive-thru burger, Boulevardier cocktail"])));

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

var potentialFuel = (0,libram__WEBPACK_IMPORTED_MODULE_1__.$items)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([""]))).filter(isFuelItem);

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

/***/ "./src/bkdaily.ts":
/*!************************!*\
  !*** ./src/bkdaily.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var tasks = new Array();

function dailyTask(name, condition, action) {
  var runAtLeastOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var wrappedTask = function wrappedTask() {
    (0,_lib__WEBPACK_IMPORTED_MODULE_1__.log)(_lib__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Running Task ".concat(name));
    var loopCount = 0;

    while (runAtLeastOnce || condition()) {
      runAtLeastOnce = false;

      if (loopCount > 10) {
        throw "Infinite Loop in ".concat(name);
      }

      action();
      loopCount++;
    }
  };

  tasks.push(wrappedTask);
}

dailyTask('raffle house', function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject || (_templateObject = _taggedTemplateLiteral(["raffle ticket"])))) < 11;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('raffle 11');
});
var pyec = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Platinum Yendorian Express Card"])));
dailyTask('pyec', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('expressCardUsed');
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_1__.withStash)([pyec], function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(pyec);
  });
});
var bot = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Bag o' Tricks"])));
dailyTask("bag o' tricks", function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_bagOTricksUsed');
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_1__.withStash)([bot], function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(bot);
  });
});
dailyTask('dinsey garbage', function () {
  return ((0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('stenchAirportAlways') || (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_stenchAirportToday')) && !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_dinseyGarbageDisposed');
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["bag of park garbage"]))));

  (0,_lib__WEBPACK_IMPORTED_MODULE_1__.setChoice)(1067, 6);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=airport_stench&action=airport3_tunnels');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(6);
});
dailyTask('towering inferno', function () {
  return ((0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('hotAirportAlways') || (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_hotAirportToday')) && !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_infernoDiscoVisited');
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)('disco style', false);
  (0,_lib__WEBPACK_IMPORTED_MODULE_1__.setChoice)(1090, 7);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=airport_hot&action=airport4_zone1');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(7);
});

var VolcanoQuest = /*#__PURE__*/function () {
  function VolcanoQuest() {
    _classCallCheck(this, VolcanoQuest);
  }

  _createClass(VolcanoQuest, null, [{
    key: "finishedQuest",
    value: function finishedQuest() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_volcanoItemRedeemed');
    }
  }, {
    key: "hasQuest",
    value: function hasQuest() {
      return libram__WEBPACK_IMPORTED_MODULE_3__.getNumber('_volcanoItem1') !== 0;
    }
  }, {
    key: "getItem",
    value: function getItem(index) {
      var tradeableComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var itemNumber = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(libram__WEBPACK_IMPORTED_MODULE_3__.getString("_volcanoItem".concat(index)));
      var item = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(itemNumber);

      if (tradeableComponent && item === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["SMOOCH bracers"])))) {
        return (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["superheated metal"])));
      }

      return item;
    }
  }, {
    key: "getAmount",
    value: function getAmount(index) {
      var tradeableComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var amount = libram__WEBPACK_IMPORTED_MODULE_3__.getNumber("_volcanoItemCount".concat(index));

      if (tradeableComponent && this.getItem(index) === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["SMOOCH bracers"])))) {
        return amount * 3;
      }

      return amount;
    }
  }, {
    key: "price",
    value: function price(index) {
      var item = this.getItem(index);
      return item.tradeable ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item) * ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) - this.getAmount(index)) : -1;
    }
  }, {
    key: "retrieveItem",
    value: function retrieveItem(index) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(this.getItem(index, false), this.getAmount(index, false));
    }
  }]);

  return VolcanoQuest;
}();

dailyTask('volcoino quest', function () {
  return !VolcanoQuest.finishedQuest() && (!VolcanoQuest.hasQuest() || [1, 2, 3].some(function (i) {
    return VolcanoQuest.getItem(i).tradeable;
  }));
}, function () {
  if (libram__WEBPACK_IMPORTED_MODULE_3__.getNumber('_volcanoItem1') === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=airport_hot&action=airport4_questhub');
  } else {
    var tradeable = [1, 2, 3].filter(function (i) {
      return VolcanoQuest.getItem(i).tradeable;
    });

    if (tradeable.length > 0) {
      var target = tradeable.reduce(function (agg, cur) {
        return VolcanoQuest.price(agg) < VolcanoQuest.price(cur) ? agg : cur;
      });
      VolcanoQuest.retrieveItem(target);
      (0,_lib__WEBPACK_IMPORTED_MODULE_1__.setChoice)(1093, target);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=airport_hot&action=airport4_questhub');
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(target);
    }
  }
});
dailyTask('stickers', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Summon Stickers"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_stickerSummons') < 3;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Summon Stickers"]))));
});
dailyTask('sugar', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Summon Sugar Sheets"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_sugarSummons') < 3;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Summon Sugar Sheets"]))));
});
dailyTask('smiths', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Summon Smithsness"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_smithsnessSummons') < 3;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Summon Smithsness"]))));
});
dailyTask('clip art', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Summon Clip Art"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_clipartSummons') < 3;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('make familiar jacks');
});
dailyTask("Alice's Army", function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Summon Alice's Army Cards"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('grimoire3Summons') < 1;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Summon Alice's Army Cards"]))));
});
var draws = ['Ancestral Recall', 'Island', '952 Mickey Mantle'];
dailyTask('deck of every card', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Deck of Every Card"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_deckCardsDrawn') < 15;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("cheat ".concat(draws.find(function (draw) {
    return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_deckCardsSeen').includes(draw);
  })));
});
dailyTask('Tea trea', function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['potted tea tree'] !== undefined && !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_pottedTeaTreeUsed');
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('teatree royal tea');
});
dailyTask('Swim item', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_olympicSwimmingPoolItemFound');
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('swim item');
}); // note this relies on having Ezandoras bastille script installed

dailyTask('Bastille', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_bastilleGames') == 0;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('bastille muscle');
});
dailyTask('Rainbows Gravity', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('prismaticSummons') < 3;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Rainbow Gravitation"]))));
});

var SpaceGate = /*#__PURE__*/function () {
  function SpaceGate() {
    _classCallCheck(this, SpaceGate);
  }

  _createClass(SpaceGate, null, [{
    key: "available",
    value: function available() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('spacegateAlways') || (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_spacegateToday');
    }
  }, {
    key: "availableVaccines",
    value: function availableVaccines() {
      [1, 2, 3].filter(function (i) {
        return libram__WEBPACK_IMPORTED_MODULE_3__.getBoolean("spacegateVaccine".concat(i));
      });
    }
  }]);

  return SpaceGate;
}();

dailyTask('genie', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_genieWishesUsed') < 3;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('genie item pocket');
});
dailyTask('buy wishes', function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["pocket wish"])))) > 0;
}, function () {
  var pocketWishes = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["pocket wish"]))));

  for (var i = 0; i < pocketWishes; ++i) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('genie meat');
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(Math.floor((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMeat)() / 50000), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["pocket wish"]))), 49999);
}, true);
dailyTask('BACON', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_baconMachineUsed');
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Infinite bacon machine"]))));
});
dailyTask('perfect freeze', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Perfect Freeze"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_perfectFreezeUsed');
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Perfect Freeze"]))));
});
dailyTask('incredible self esteem', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Incredible Self Esteem"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_incredibleSelfEsteemCast');
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Incredible Self Esteem"]))));
});
var numberologyTarget = 14;
dailyTask('numberology', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Calculate the Universe"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_universeCalculated') < (0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('skillLevel144') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.reverseNumberology)()[numberologyTarget] !== undefined;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("numberology ".concat(numberologyTarget));
});

function useCurrency(currency, target, condition) {
  var safeCondition = condition || function () {
    return true;
  };

  var coinmaster = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$coinmasters)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral([""]))).find(function (c) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sellsItem)(c, target);
  });

  if (coinmaster) {
    var price = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sellPrice)(coinmaster, target);
    dailyTask("Spend ".concat(currency, " on ").concat(target), function () {
      return safeCondition() && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(currency) >= price;
    }, function () {
      return coinmaster && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(coinmaster, 1, target);
    });
  }
}

useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Beach Buck"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["one-day ticket to Spring Break Beach"]))));
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Coinspiracy"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["karma shawarma"]))));
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["FunFunds\u2122"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["one-day ticket to Dinseylandfill"]))));
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Volcoino"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["one-day ticket to That 70s Volcano"]))));
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Wal-Mart gift certificate"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["one-day ticket to The Glaciest"]))));
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Freddy Kruegerand"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Hot Dreadsylvanian Cocoa"]))), function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Hot Dreadsylvanian Cocoa"])))) < 5;
});
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Freddy Kruegerand"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["Dreadsylvanian skeleton key"]))), function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Freddy Kruegerand"])))) > 25;
});
useCurrency((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["BACON"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Print Screen Button"]))), function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('_internetPrintScreenButtonBought');
});
function main() {
  (0,_lib__WEBPACK_IMPORTED_MODULE_1__.log)(_lib__WEBPACK_IMPORTED_MODULE_1__.LogLevel.None, 'Running Daily Tasks...');
  (0,_lib__WEBPACK_IMPORTED_MODULE_1__.inClan)((0,libram__WEBPACK_IMPORTED_MODULE_3__.get)('fishClan'), function () {
    return tasks.forEach(function (task) {
      return task();
    });
  });
}

/***/ }),

/***/ "./src/bkdiet.ts":
/*!***********************!*\
  !*** ./src/bkdiet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function fillBooze(amount) {
  if (libram__WEBPACK_IMPORTED_MODULE_2__.getString('fillerBooze') == 'mayo') {
    throw "Shouldn't be filling your liver!";
  }

  var fillerBooze = (0,libram__WEBPACK_IMPORTED_MODULE_2__.get)('fillerBooze', '').split(',').map(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(i);
  });

  if (fillerBooze.length > 0) {
    var currentLiver = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)();

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() - currentLiver < amount) {
      fillerBooze.forEach(function (i) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(i);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drink)(i);
      });
    }
  }
}

function fillFood(amount) {
  if (libram__WEBPACK_IMPORTED_MODULE_2__.getString('fillerBooze') == 'mayo') {
    _lib__WEBPACK_IMPORTED_MODULE_1__.MayoClinic.tryPlace();
    _lib__WEBPACK_IMPORTED_MODULE_1__.MayoClinic.set((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Mayodiol"]))));
  }

  var fillerFood = (0,libram__WEBPACK_IMPORTED_MODULE_2__.get)('fillerFood', '').split(',').map(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(i);
  });

  if (fillerFood.length > 0) {
    var currentStomach = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)();

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)() - currentStomach < amount) {
      fillerFood.forEach(function (i) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(i);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(i);

        if (libram__WEBPACK_IMPORTED_MODULE_2__.getString('fillerBooze') == 'mayo' && (0,libram__WEBPACK_IMPORTED_MODULE_4__.getRemainingLiver)() == 0) {
          _lib__WEBPACK_IMPORTED_MODULE_1__.MayoClinic.set((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Mayonex"]))));
        }
      });
    }
  }
}

function thanksgetting() {
  if (libram__WEBPACK_IMPORTED_MODULE_2__.getString('additionalFullness') === 'mayo') {
    if (!_lib__WEBPACK_IMPORTED_MODULE_1__.MayoClinic.tryPlace()) throw 'Failed to get Mayo Clinic!';
    _lib__WEBPACK_IMPORTED_MODULE_1__.MayoClinic.set((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Mayodiol"]))));
  }

  var thanksGettingFood = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([""]))).filter(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.effectModifier)(i, 'effect') == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Thanksgetting"])));
  });
  thanksGettingFood.forEach(function (i) {
    if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.getRemainingStomach)() < 2 && libram__WEBPACK_IMPORTED_MODULE_2__.getString('additionalFullness') == 'melange' && !(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)('spiceMelangeUsed')) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() < 3) {
        fillBooze(3 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)());
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["spice melange"]))));
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(i);
  });

  if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)('_thanksgettingFoodsEaten') < 9) {
    throw 'Failed to eat all thanksgetting food!';
  }
}

function main(args) {
  if (libram__WEBPACK_IMPORTED_MODULE_2__.getBoolean('getThanksgetting')) {
    thanksgetting();
  }

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)('_voraciTeaUsed')) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["cuppa voraci tea"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["cuppa voraci tea"]))));
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.getRemainingStomach)() > 0) fillFood((0,libram__WEBPACK_IMPORTED_MODULE_4__.getRemainingStomach)());
  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.getRemainingLiver)() > 0) fillBooze((0,libram__WEBPACK_IMPORTED_MODULE_4__.getRemainingLiver)());
}

/***/ }),

/***/ "./src/bkfights.ts":
/*!*************************!*\
  !*** ./src/bkfights.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "freeFightCost": () => (/* binding */ freeFightCost),
/* harmony export */   "pickFreeFightFamiliar": () => (/* binding */ pickFreeFightFamiliar),
/* harmony export */   "main": () => (/* binding */ main)
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
/* harmony import */ var _simulate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simulate */ "./src/simulate.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192, _templateObject193, _templateObject194, _templateObject195, _templateObject196, _templateObject197, _templateObject198, _templateObject199, _templateObject200, _templateObject201, _templateObject202, _templateObject203, _templateObject204, _templateObject205, _templateObject206, _templateObject207, _templateObject208, _templateObject209, _templateObject210, _templateObject211, _templateObject212, _templateObject213, _templateObject214, _templateObject215, _templateObject216, _templateObject217, _templateObject218, _templateObject219, _templateObject220, _templateObject221, _templateObject222, _templateObject223, _templateObject224, _templateObject225, _templateObject226, _templateObject227, _templateObject228, _templateObject229, _templateObject230, _templateObject231, _templateObject232, _templateObject233, _templateObject234, _templateObject235, _templateObject236, _templateObject237, _templateObject238, _templateObject239, _templateObject240, _templateObject241, _templateObject242, _templateObject243, _templateObject244, _templateObject245, _templateObject246, _templateObject247, _templateObject248, _templateObject249, _templateObject250, _templateObject251, _templateObject252, _templateObject253, _templateObject254, _templateObject255, _templateObject256, _templateObject257, _templateObject258, _templateObject259, _templateObject260, _templateObject261, _templateObject262, _templateObject263, _templateObject264, _templateObject265, _templateObject266, _templateObject267, _templateObject268, _templateObject269, _templateObject270, _templateObject271, _templateObject272, _templateObject273, _templateObject274, _templateObject275, _templateObject276, _templateObject277, _templateObject278, _templateObject279, _templateObject280, _templateObject281, _templateObject282, _templateObject283, _templateObject284;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var FREE_STASIS_FAMILIAR = libram__WEBPACK_IMPORTED_MODULE_5__.getFamiliar('freeStasisFamiliar', (0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Cocoabo"]))));
var MELANGE_VALUE = libram__WEBPACK_IMPORTED_MODULE_5__.getNumber('simulationMelangePrice');
var DRUM_MACHINE_COST = libram__WEBPACK_IMPORTED_MODULE_5__.getNumber('simulationDrumMachineCost');
var FREE_FIGHT_SAFETY_THRESHOLD = libram__WEBPACK_IMPORTED_MODULE_5__.getNumber('simulationSafetyThreshold');
var STASIS_FIGHT_VALUE = (0,_simulate__WEBPACK_IMPORTED_MODULE_4__.simulateFamiliarMeat)();
var FREE_FIGHT_COPY_TARGET = libram__WEBPACK_IMPORTED_MODULE_5__.getMonster('freeCopyFight', (0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Witchess Bishop"]))));
var MINIMUM_BUFF_TURNS = libram__WEBPACK_IMPORTED_MODULE_5__.getNumber('freeBuffThreshold');
var INFINITE_LOOP_COUNT = libram__WEBPACK_IMPORTED_MODULE_5__.getNumber('infiniteLoopCount');
var BACKUP_FAMILIAR = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["unspeakachu"]))); // use this when you absolutely need a familiar equipment

var WANDERER_ZONE = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["The Haunted Billiards Room"])));

var debug = function debug(message) {
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Debug, message, 'red');
};

function freeFightCost(useDrumMachine, pickFamiliar) {
  var overrideFamiliar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // TODO: compute marginal MPA of accessories
  var familiarFightValue = 0;

  if (pickFamiliar && (overrideFamiliar || pickFreeFightFamiliar(true) === FREE_STASIS_FAMILIAR)) {
    familiarFightValue = STASIS_FIGHT_VALUE * 2;
  }

  var singleFreeFightCost = familiarFightValue + (useDrumMachine ? MELANGE_VALUE * 0.1 - DRUM_MACHINE_COST : 0) + 1000 * 2 + 200;
  return Math.floor(FREE_FIGHT_SAFETY_THRESHOLD * Math.min(600000, singleFreeFightCost + 3000 * 0.04 + singleFreeFightCost * 0.1));
}

function maybeBjorn(f) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["buddy bjorn"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBjornedFamiliar)() != f) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.bjornifyFamiliar)(f);
  }
}

function maybeEnthrone(f) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["crown of thrones"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEnthronedFamiliar)() != f) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.enthroneFamiliar)(f);
  }
}

function heavyRainFreeFights() {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20) {
    drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["lightning strike"])))));
  }

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)('choiceAdventure970', "1&whichmonster=".concat(FREE_FIGHT_COPY_TARGET.id));
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Rain Man"]))));
    });
  }
}

function bustGhost() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["protonic accelerator pack"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questPAGhost') !== 'unstarted') {
    var ghostLocation = (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('ghostLocation');

    if (ghostLocation && ghostLocation != (0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["none"])))) {
      (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)(ghostLocation, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().perpetualStasis());
    }
  }
}

function fightVoter() {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() % 11 === 1 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_voteFreeFights') < 3) {
    if (!(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\"I Voted!\" sticker"]))))) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('VotingBooth');
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.assert)((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\"I Voted!\" sticker"])))), 'Unable to get Voting Sticker');
    pickFreeFightFamiliar();
    outfit();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["acc1"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\"I Voted!\" sticker"]))));
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)(WANDERER_ZONE, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().perpetualStasis());
  }
}

function shrugStinging() {
  var stingingEffects = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$effects)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Apoplectic with Rage,Barfpits,Berry Thorny,Biologically Shocked,Bone Homie,Boner Battalion,Coal-Powered,Curse of the Black Pearl Onion,Dizzy with Rage,Drenched With Filth,EVISCERATE!,Fangs and Pangs,Frigidalmatian,Gummi Badass,Haiku State of Mind,It's Electric!,Jaba&ntilde;ero Saucesphere,Jalape&ntilde;o Saucesphere,Little Mouse Skull Buddy,Long Live GORF,Mayeaugh,Permanent Halloween,Psalm of Pointiness,Pygmy Drinking Buddy,Quivering with Rage,Scarysauce,Skeletal Cleric,Skeletal Rogue,Skeletal Warrior,Skeletal Wizard,Smokin',Soul Funk,Spiky Frozen Hair,Stinkybeard,Stuck-Up Hair,Can Has Cyborger,Feeling Nervous"], ["Apoplectic with Rage,Barfpits,Berry Thorny,Biologically Shocked,Bone Homie,Boner Battalion,Coal-Powered,Curse of the Black Pearl Onion,Dizzy with Rage,Drenched With Filth,EVISCERATE\\!,Fangs and Pangs,Frigidalmatian,Gummi Badass,Haiku State of Mind,It\\'s Electric\\!,Jaba&ntilde;ero Saucesphere,Jalape&ntilde;o Saucesphere,Little Mouse Skull Buddy,Long Live GORF,Mayeaugh,Permanent Halloween,Psalm of Pointiness,Pygmy Drinking Buddy,Quivering with Rage,Scarysauce,Skeletal Cleric,Skeletal Rogue,Skeletal Warrior,Skeletal Wizard,Smokin\\',Soul Funk,Spiky Frozen Hair,Stinkybeard,Stuck-Up Hair,Can Has Cyborger,Feeling Nervous"])));
  stingingEffects.forEach(function (e) {
    if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)(e)) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["soft green echo eyedrop antidote"])))) == 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(100, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["soft green echo eyedrop antidote"]))));
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("uneffect ".concat(e));
    }
  });
}

function canUseFamiliarEquipment() {
  var badFamiliars = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiars)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["none,Comma Chameleon,Ghost of Crimbo Commerce,Ghost of Crimbo Carols,Ghost of Crimbo Cheer"])));
  var familiar = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)();
  return !badFamiliars.includes(familiar);
}

function outfit() {
  (0,libram__WEBPACK_IMPORTED_MODULE_6__.$slots)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["hat,back,shirt,weapon,offhand,pants,acc1,acc2,acc3"]))).forEach(function (slot) {
    var item = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("free.".concat(slot)));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)(slot) !== item) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, item);
    }
  });

  if (canUseFamiliarEquipment()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["familiar"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('free.familiar')));
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["protonic accelerator pack"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() > (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('nextParanormalActivity') && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questPAGhost') === 'unstarted') {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["back"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["protonic accelerator pack"]))));
  }
}

var steps = [];
var finalSteps = [];
var postSteps = [];

function step(name, condition, setup, before) {
  return function (step_fun) {
    var wrappedStep = function wrappedStep(skiplist, list) {
      if (list) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.None, "".concat(name));
      } else if (skiplist.indexOf(name) === -1) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Info, "executing ".concat(name));
        if (before) before();

        if (condition()) {
          pickFreeFightFamiliar();
          outfit();
          maybeBjorn((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Golden Monkey"]))));
          maybeEnthrone((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Warbear Drone"]))));
          if (setup) setup();
          var infiniteLoopCheck = 0;
          var adventureCheck = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)();

          while (condition()) {
            if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() < adventureCheck && !name.includes('(TURNS)')) {
              throw 'Spent a turn!!!';
            }

            step_fun();
            shrugStinging();
            refreshComma(); // this will only refresh if the active familiar is comma chameleon

            infiniteLoopCheck += 1;

            if (infiniteLoopCheck == INFINITE_LOOP_COUNT) {
              throw "".concat(name, " encountered an infinite loop (maybe?)");
            } else if (infiniteLoopCheck % 10 == 0) {
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('gc; clear;');
            }
          }

          postSteps.forEach(function (post_step_cb) {
            pickFreeFightFamiliar();
            outfit();
            post_step_cb();
          });
        }
      } else {
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Info, "skipping ".concat(name));
      }
    };

    if (name.startsWith('final')) {
      finalSteps.push(wrappedStep);
    } else {
      steps.push(wrappedStep);
    }
  };
}

postSteps.push(heavyRainFreeFights);
postSteps.push(bustGhost);
postSteps.push(function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('clear');
});
postSteps.push(function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('gc');
});

function maybeMacro(propName, target) {
  if (!libram__WEBPACK_IMPORTED_MODULE_5__.getBoolean(propName)) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, target);
  return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item(target);
}

function refreshComma() {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === (0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Comma Chameleon"])))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('charpane.php');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh inv');

    if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('commaFamiliar') !== 'Feather Boa Constrictor') {
      (0,_lib__WEBPACK_IMPORTED_MODULE_3__.assert)((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["velvet choker"])))), 'Must have a velvet choker to refresh your comma chameleon!'); // borrowed from phyllis

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('charpane.php');
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh inv');
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('inv_equip.php?pwd&action=equip&whichitem=962');
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('charpane.php');
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh inv');
    }
  }
}

function pickFreeFightFamiliar() {
  var simulate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var overrideFamiliar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _minimumRelevantBuff = (0,_lib__WEBPACK_IMPORTED_MODULE_3__.minimumRelevantBuff)(),
      _minimumRelevantBuff2 = _slicedToArray(_minimumRelevantBuff, 2),
      minEffect = _minimumRelevantBuff2[0],
      minTurns = _minimumRelevantBuff2[1];

  if (MINIMUM_BUFF_TURNS != -1 && minTurns >= MINIMUM_BUFF_TURNS || overrideFamiliar) {
    var freeFightFamiliar = FREE_STASIS_FAMILIAR;

    if (!simulate) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(freeFightFamiliar);
      refreshComma();
    }

    return freeFightFamiliar;
  } else {
    if (!simulate) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Unspeakachu"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["ittah bittah hookah"]))));
    }

    return (0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Unspeakachu"])));
  }
}

function isMeatFamiliar() {
  return pickFreeFightFamiliar(true) === FREE_STASIS_FAMILIAR;
}

function drumMachineWithMacro(macro) {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().maybeStasis().step(macro).abort(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["drum machine"]))));
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
      (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Debug, "Foldable Copies: ".concat((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('spookyPuttyCopiesMade') + (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_raindohCopiesMade')));
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('spookyPuttyCopiesMade') + (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_raindohCopiesMade') < 6;
    }
  }, {
    key: "copyMacro",
    value: function copyMacro() {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('spookyPuttyCopiesMade') < 5) {
        return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item('spooky putty sheet');
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_raindohCopiesMade') == 0) {
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
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["spooky putty monster"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Rain-Doh box full of monster"])))) > 0;
    }
  }, {
    key: "fight",
    value: function fight() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["spooky putty monster"])))) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["spooky putty monster"]))));
      } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Rain-Doh box full of monster"])))) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Rain-Doh box full of monster"]))));
      } else {
        throw 'No monster to fight';
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
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') < 10;
    }
  }, {
    key: "setupSaber",
    value: function setupSaber() {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["miniature crystal ball"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') == 10) {
        DrunkPygmy.setupFreeFight();
        if (!canUseFamiliarEquipment()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(BACKUP_FAMILIAR);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["miniature crystal ball"]))));
      } else {
        if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["miniature crystal ball"]))))) {
          if (!canUseFamiliarEquipment()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(BACKUP_FAMILIAR);
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["miniature crystal ball"]))));
        }

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Bowl of Scorpions"])))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Bowl of Scorpions"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["weapon"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      }
    }
  }, {
    key: "setupFreeFight",
    value: function setupFreeFight(fights) {
      fights || (fights = 1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["bowling ball"])))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["bowling ball"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(fights, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Bowl of Scorpions"]))));
    }
  }, {
    key: "didSaber",
    value: function didSaber() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL11Worship') !== 'unstarted' && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('_saberForceMonster') === 'drunk pygmy' && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberForceMonsterCount') > 0;
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
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberMod') != 0;
    }
  }, {
    key: "getUpgrade",
    value: function getUpgrade() {
      switch ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberMod')) {
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

      throw "Invalid Saber Mode ".concat((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberMod'));
    }
  }, {
    key: "canGive",
    value: function canGive(mode) {
      var currentUpgrade = CosplaySaber.getUpgrade();
      return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) && (currentUpgrade === SaberUpgrade.Unupgraded || currentUpgrade == mode);
    }
  }, {
    key: "upgrade",
    value: function upgrade(mode) {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) && CosplaySaber.getUpgrade() == SaberUpgrade.Unupgraded) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1386, mode);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('main.php?action=may4');
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(mode);
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
      return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_gingerbreadMobHitUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_shatteringPunchUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["replica bat-oomerang"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_usedReplicaBatoomerang') < 3 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Superduperheated metal"])))) > 0 && isMeatFamiliar() || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["Daily Affirmation: Think Win-Lose"])))) > 0 && isMeatFamiliar();
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_gingerbreadMobHitUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["gingerbread mob hit"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_shatteringPunchUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["shattering punch"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["replica bat-oomerang"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_usedReplicaBatoomerang') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["replica bat-oomerang"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Superduperheated metal"])))) > 0, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["Superduperheated metal"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Daily Affirmation: Think Win-Lose"])))) > 0, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["Daily Affirmation: Think Win-Lose"])))));
    }
  }]);

  return FreeKill;
}();

var Battery = /*#__PURE__*/function () {
  function Battery() {
    _classCallCheck(this, Battery);
  }

  _createClass(Battery, null, [{
    key: "availableCharges",
    value: function availableCharges() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
      return (0,libram__WEBPACK_IMPORTED_MODULE_6__.$items)(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["Battery (AAA),Battery (AA),Battery (D),Battery (9-Volt),Battery (Lantern),Battery (Car)"]))).reduce(function (sum, currentBattery, index) {
        return sum + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(currentBattery) * (index + 1);
      }, 0);
    }
  }, {
    key: "buy",
    value: function buy() {
      (0,libram__WEBPACK_IMPORTED_MODULE_6__.$items)(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["Battery (AAA),Battery (AA),Battery (D),Battery (9-Volt),Battery (Lantern),Battery (Car)"]))).forEach(function (battery, index) {
        var cost = freeFightCost(true, true, true) * (index + 1) / 4;
        debug("Buying ".concat(battery, " @ ").concat(cost));

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(10000, battery, cost);
      });
    }
  }, {
    key: "hasFreeKills",
    value: function hasFreeKills() {
      var charges = Battery.availableCharges();
      debug("Battery Charges Available: ".concat(charges, " (").concat(Math.floor(charges / 4), ")"));
      return isMeatFamiliar() && ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('shockingLickCharges') > 0 || charges >= 4);
    }
  }, {
    key: "untinker",
    value: function untinker() {
      (0,libram__WEBPACK_IMPORTED_MODULE_6__.$items)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["Battery (Car),Battery (Lantern)"]))).forEach(function (battery) {
        debug("Untinkering ".concat(battery));

        while ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)(battery)) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("untinker ".concat(battery));
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
        }
      });

      while ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["Battery (D)"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["Battery (AAA)"]))))) {
        var toPaste = Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["Battery (D)"])))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["Battery (AAA)"])))));
        debug("Pasting ".concat(toPaste, " ").concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["Battery (D)"])))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(toPaste, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["meat paste"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.craft)('combine', toPaste, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["Battery (D)"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["Battery (AAA)"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
      }

      while ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["Battery (D)"]))))) {
        debug("Untinkering ".concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["Battery (D)"])))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("untinker ".concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["Battery (D)"])))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
      }

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["Battery (AAA)"])))) > 1) {
        var _toPaste = Math.floor((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["Battery (AAA)"])))) / 2);

        debug("Pasting ".concat(_toPaste, " ").concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["Battery (AAA)"])))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(_toPaste, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["meat paste"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.craft)('combine', _toPaste, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["Battery (AAA)"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["Battery (AAA)"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
      }

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["Battery (AA)"])))) > 1) {
        var _toPaste2 = Math.floor((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["Battery (AA)"])))) / 2);

        debug("Pasting ".concat(_toPaste2, " ").concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["Battery (AA)"])))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(_toPaste2, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["meat paste"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.craft)('combine', _toPaste2, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["Battery (AA)"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["Battery (AA)"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("refresh inventory");
      }
    }
  }, {
    key: "setupFreeKill",
    value: function setupFreeKill() {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('shockingLickCharges') == 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["Battery (9-Volt)"]))));
      }
    }
  }]);

  return Battery;
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
      debug("Navel ".concat((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_navelRunaways') < 3));
      debug("V Mask ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["V for Vivala Mask"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_vmaskBanisherUsed')));
      debug("Stinky Cheese ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["stinky cheese eye"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_stinkyCheeseBanisherUsed')));
      debug("Lil' Doctor Bag ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_reflexHammerUsed') < 3));
      debug("snokebomb ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["snokebomb"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_snokebombUsed') < 3));
      debug("hatred ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["Feel Hatred"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_feelHatredUsed') < 3));
      debug("KGB ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_kgbTranquilizerDartUses') < 3));
      debug("MMFR ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["mafia middle finger ring"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mafiaMiddleFingerRingUsed')));
      debug("nano ".concat((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["nanorhino"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_nanorhinoCharge') == 100));
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_navelRunaways') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["V for Vivala Mask"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_vmaskBanisherUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["stinky cheese eye"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_stinkyCheeseBanisherUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_reflexHammerUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["snokebomb"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_snokebombUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["Feel Hatred"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_feelHatredUsed') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_kgbTranquilizerDartUses') < 3 || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["mafia middle finger ring"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mafiaMiddleFingerRingUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral(["nanorhino"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_nanorhinoCharge') == 100;
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral(["navel ring of navel gazing"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral(["greatest american pants"])))) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_navelRunaways') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.step('runaway')).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral(["peppermint parasol"])))) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_navelRunaways') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral(["peppermint parasol"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral(["snokebomb"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_snokebombUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral(["snokebomb"]))))).externalIf((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral(["Feel Hatred"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_feelHatredUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral(["Feel Hatred"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral(["V for Vivala Mask"])))) > 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_vmaskBanisherUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral(["Creepy Grin"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral(["stinky cheese eye"])))) > 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_stinkyCheeseBanisherUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral(["Give Your Opponent the Stinkeye"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_reflexHammerUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral(["Reflex Hammer"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))) > 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_kgbTranquilizerDartUses') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral(["KGB tranquilizer dart"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral(["mafia middle finger ring"])))) > 0 && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mafiaMiddleFingerRingUsed'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral(["Show them your ring"]))))).externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() == (0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral(["nanorhino"]))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_nanorhinoCharge') == 100, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral(["Nanobrawny"])))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral(["shell up"]))))).skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral(["Unleash Nanites"]))))).abort();
    }
  }, {
    key: "wrapFreeRun",
    value: function wrapFreeRun(action) {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_navelRunaways') < 3) {
        if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral(["greatest american pants"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral(["Super Vision"]))))) {
          withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral(["pants"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral(["greatest american pants"]))), action);
        } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral(["navel ring of navel gazing"]))))) {
          withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral(["navel ring of navel gazing"]))), action);
        } else {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral(["peppermint parasol"]))));
          action();
        }
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral(["V for Vivala Mask"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_vmaskBanisherUsed')) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral(["V for Vivala Mask"]))), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral(["stinky cheese eye"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_stinkyCheeseBanisherUsed')) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral(["stinky cheese eye"]))), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_reflexHammerUsed') < 3) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_kgbTranquilizerDartUses') < 3) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]))), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral(["mafia middle finger ring"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mafiaMiddleFingerRingUsed')) {
        withEquip((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral(["mafia middle finger ring"]))), action);
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral(["nanorhino"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_nanorhinoCharge') == 100) {
        var f = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral(["nanorhino"]))));
        action();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(f);
      } else {
        action();
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
    key: "retailUnlocked",
    value: function retailUnlocked() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('gingerRetailUnlocked');
    }
  }, {
    key: "totalTurns",
    value: function totalTurns() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('gingerbreadCityAvailable') ? (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('gingerExtraAdventures') ? 30 : 20 : 0;
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
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('gingerbreadCityAvailable') && GingerbreadCity.turnsLeft() > 0;
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

step('eldritch attunment', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral(["Eldritch Attunement"]))));
})(function () {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral(["Eldritch Elixir"])))) < 1) {
    throw 'Get an eldtrich elixir!!';
  } else if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.getRemainingLiver)() < 3) {
    throw 'No space for an eldtirch elixir, and you do not have attunement. Use sobrie tea, melange, etc. to fit it in!';
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drink)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral(["Eldritch Elixir"]))));
});
step('rollover resources', function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20;
})(heavyRainFreeFights);
step('chateau', function () {
  var _ChateauMantegna$pain, _ChateauMantegna$pain2;

  return libram__WEBPACK_IMPORTED_MODULE_8__.have() && !libram__WEBPACK_IMPORTED_MODULE_8__.paintingFought() && ((_ChateauMantegna$pain = libram__WEBPACK_IMPORTED_MODULE_8__.paintingMonster()) === null || _ChateauMantegna$pain === void 0 ? void 0 : (_ChateauMantegna$pain2 = _ChateauMantegna$pain.attributes) === null || _ChateauMantegna$pain2 === void 0 ? void 0 : _ChateauMantegna$pain2.includes('FREE'));
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral(["Pocket Professor"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral(["Pocket Professor Memory Chip"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().professor().spellKill(), function () {
    return libram__WEBPACK_IMPORTED_MODULE_8__.fightPainting();
  });
});
step('fax', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_photocopyUsed');
}, function () {
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.inClan)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('faxClan'), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.faxbot)(FREE_FIGHT_COPY_TARGET, 'Cheesefax');
  });

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_pocketProfessorLectures') < maxProfessorLectures()) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral(["Pocket Professor"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral(["Pocket Professor Memory Chip"]))));
  }
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().professor().step(SpookyPutty.maybeMacro()).maybeStasis().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral(["photocopied monster"]))));
  });
});

var IceSculpture = /*#__PURE__*/function () {
  function IceSculpture() {
    _classCallCheck(this, IceSculpture);
  }

  _createClass(IceSculpture, null, [{
    key: "used",
    value: function used() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_iceSculptureUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral(["ice sculpture"]))));
    }
  }, {
    key: "setup",
    value: function setup() {
      if (!IceSculpture.used()) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral(["unfinished ice sculpture"]))));
      }
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!IceSculpture.used(), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral(["unfinished ice sculpture"])))));
    }
  }]);

  return IceSculpture;
}();

var DCamera = /*#__PURE__*/function () {
  function DCamera() {
    _classCallCheck(this, DCamera);
  }

  _createClass(DCamera, null, [{
    key: "used",
    value: function used() {
      return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_cameraUsed') || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral(["shaking 4-d camera"]))));
    }
  }, {
    key: "setup",
    value: function setup() {
      if (!DCamera.used()) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral(["4-d camera"]))));
      }
    }
  }, {
    key: "maybeMacro",
    value: function maybeMacro() {
      return _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf(!DCamera.used(), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral(["4-d camera"])))));
    }
  }]);

  return DCamera;
}();

step('spooky putty', function () {
  return SpookyPutty.hasFight();
})(function () {
  IceSculpture.setup();
  DCamera.setup();
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_feelNostalgicUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral(["Feel Nostalgic"])))))).step(SpookyPutty.maybeMacro(), IceSculpture.maybeMacro(), DCamera.maybeMacro()).maybeStasis().spellKill(), function () {
    return SpookyPutty.fight();
  });
});
step('camera', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral(["shaking 4-d camera"]))));
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral(["backup camera"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill('Back-Up to your last enemy')).maybeStasis().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral(["shaking 4-d camera"]))));
  });
});
step('sculpture', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral(["ice sculpture"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().maybeStasis().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral(["ice sculpture"]))));
  });
});
step('forest tentacle', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL02Larva') !== 'unstarted' && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_eldritchTentacleFought');
})(function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('place.php?whichplace=forestvillage&action=fv_scientist', false);
  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'No choice?';
  var options = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableChoiceOptions)();
  var choice = [1, 2, 3, 4, 5].find(function (i) {
    return options[i] == 'Can I fight that tentacle you saved for science?';
  }) || 0;

  if (choice) {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(choice);
    });
  }
});
step('summon tentacle', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral(["Evoke Eldritch Horror"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_eldritchHorrorEvoked');
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral(["Evoke Eldritch Horror"]))));
  });
});
step('lynrd snares', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_lynyrdSnareUses') < 3;
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().perpetualStasis().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral(["lynyrd snare"]))));
  });
});
step('bricko', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_brickoFights') < 10;
})(function () {
  var brickoMonster = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral(["BRICKO Ooze"])));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral(["BRICKO reactor"])))) < 4) {
    brickoMonster = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral(["BRICKO Airship"])));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral(["green BRICKO brick"])))) < 18) {
    brickoMonster = (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral(["BRICKO python"])));
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(brickoMonster);
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().perpetualStasis().spellKill(), function () {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(brickoMonster);
  });
});
step('drunk pygmies', function () {
  return DrunkPygmy.freeBanishes();
})(function () {
  DrunkPygmy.setupFreeFight();
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral(["The Hidden Bowling Alley"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername pygmy bowler', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral(["Feel Hatred"]))))).if_('monstername pygmy orderlies', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral(["Snokebomb"]))))).abort());
});
step('drunk pygmy initial saber', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberForceUses') == 0 && ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_drunkPygmyBanishes') < 11 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)('crystalBallMonster') === 'drunk pygmy');
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1387, 2);
})(function () {
  DrunkPygmy.setupSaber();
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral(["The Hidden Bowling Alley"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().externalIf((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject190 || (_templateObject190 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) > 0, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.maybeStasis().skill('Use the Force')).abort());
});
step('drunk pygmy saber copies', function () {
  return DrunkPygmy.didSaber();
})(function () {
  DrunkPygmy.setupFreeFight(2);
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject191 || (_templateObject191 = _taggedTemplateLiteral(["The Hidden Bowling Alley"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral(["The Hidden Bowling Alley"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putCloset)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.itemAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral(["Bowl of Scorpions"])))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject194 || (_templateObject194 = _taggedTemplateLiteral(["Bowl of Scorpions"]))));

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_saberForceUses') < 5) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Debug, 'Sabering pygmies');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject195 || (_templateObject195 = _taggedTemplateLiteral(["weapon"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject196 || (_templateObject196 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject197 || (_templateObject197 = _taggedTemplateLiteral(["The Hidden Bowling Alley"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().skill('Use the Force'));
  } else {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.log)(_lib__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Debug, 'Just killing pygmies');
    DrunkPygmy.setupFreeFight(1);
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject198 || (_templateObject198 = _taggedTemplateLiteral(["The Hidden Bowling Alley"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort());
  }
});
step('drunk pygmy time-spinner', function () {
  return 10 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_timeSpinnerMinutesUsed') > 3;
}, function () {
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1195, 1);
  (0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('choiceAdventure1196', "1&monid=".concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject199 || (_templateObject199 = _taggedTemplateLiteral(["drunk pygmy"]))).id));
})(function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject200 || (_templateObject200 = _taggedTemplateLiteral(["Bowl of Scorpions"]))));
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().abort(), function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject201 || (_templateObject201 = _taggedTemplateLiteral(["time-spinner"]))));
  });
});
step('glark cables', function () {
  return ['step3', 'finished'].includes((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('questL11Ron')) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_glarkCableUses') < 5;
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(5 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_glarkCableUses'), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral(["glark cable"]))), freeFightCost(false, true));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral(["The Red Zeppelin"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().maybeStasis(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject204 || (_templateObject204 = _taggedTemplateLiteral(["glark cable"]))))));
});
step('Kramco', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_sausageFights') == 0;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject205 || (_templateObject205 = _taggedTemplateLiteral(["off-hand"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject206 || (_templateObject206 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject207 || (_templateObject207 = _taggedTemplateLiteral(["Noob Cave"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step('snojo', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_snojoFreeFights') < 10;
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject208 || (_templateObject208 = _taggedTemplateLiteral(["The X-32-F Combat Training Snowman"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().item('seal tooth').repeat());
});
step('free kills', function () {
  return FreeKill.hasFreeKills();
}, function () {
  return pickFreeFightFamiliar();
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(100, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject209 || (_templateObject209 = _taggedTemplateLiteral(["Daily Affirmation: Think Win-Lose"]))), freeFightCost(true, true, true));

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(100, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral(["Superduperheated Metal"]))), freeFightCost(true, true, true));
})(function () {
  drumMachineWithMacro(FreeKill.maybeMacro());
  heavyRainFreeFights();
});
step('batteries', function () {
  return Battery.hasFreeKills();
}, function () {
  return Battery.untinker();
}, function () {
  return Battery.buy();
})(function () {
  Battery.setupFreeKill();
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.assert)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('shockingLickCharges') > 0, 'Must have a lick charge!!');
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject211 || (_templateObject211 = _taggedTemplateLiteral(["Shocking Lick"])))));
  heavyRainFreeFights();
});
step('jokester', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_firedJokestersGun');
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral(["weapon"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral(["The Jokester's gun"]))));
  pickFreeFightFamiliar();
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject214 || (_templateObject214 = _taggedTemplateLiteral(["Fire the Jokester's Gun"])))));
});
step('chest x-ray', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_chestXRayUsed') < 3;
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject215 || (_templateObject215 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject216 || (_templateObject216 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))));
  pickFreeFightFamiliar();
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject217 || (_templateObject217 = _taggedTemplateLiteral(["Chest X-Ray"])))));
});
step('powdered madness', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powderedMadnessUses') < 5 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject218 || (_templateObject218 = _taggedTemplateLiteral(["powdered madness"])))) < freeFightCost(true, true);
}, function () {
  return pickFreeFightFamiliar();
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(5 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powderedMadnessUses'), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject219 || (_templateObject219 = _taggedTemplateLiteral(["powdered madness"]))), freeFightCost(true, true));
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject220 || (_templateObject220 = _taggedTemplateLiteral(["powdered madness"])))));
});
step('asdon martin', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_missileLauncherUsed') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined;
}, function () {
  (0,_asdon__WEBPACK_IMPORTED_MODULE_1__.fillAsdonMartinTo)(100);
  pickFreeFightFamiliar();
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject221 || (_templateObject221 = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"])))));
});
step('never-ending party', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_neverendingPartyFreeTurns') < 10;
}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoices)(new Map([[1322, 2], [1324, 5]]));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral(["The Neverending Party"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step('mushroom garden', function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['packet of mushroom spores'] !== undefined && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mushroomGardenFights') === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_sourceTerminalPortscanUses') == 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)('portscan.edu', 0, 0) === 'portscan.edu';
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate portscan');
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral(["Your Mushroom Garden"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername government agent', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill('Macrometeorite')).if_('!monstername piranha plant', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.abort()).trySkill('Portscan').spellKill());
});
step('LOV', function () {
  return !libram__WEBPACK_IMPORTED_MODULE_9__.isUsed();
})(function () {
  var effect = (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject224 || (_templateObject224 = _taggedTemplateLiteral(["Wandering Eye Surgery"])))) ? 'Open Heart Surgery' : 'Wandering Eye Surgery';
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill(), function () {
    return libram__WEBPACK_IMPORTED_MODULE_9__.fightAll('LOV Epaulettes', effect, 'LOV Extraterrestrial Chocolate');
  });
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'Did not get all the way through LOV.';
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)('choice.php');
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)()) throw 'Did not get all the way through LOV.';
});
step('power pill', function () {
  return ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject225 || (_templateObject225 = _taggedTemplateLiteral(["puck man"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject226 || (_templateObject226 = _taggedTemplateLiteral(["ms. puck man"]))))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powerPillUses') < 20 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject227 || (_templateObject227 = _taggedTemplateLiteral(["power pill"])))) > 0;
}, function () {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject228 || (_templateObject228 = _taggedTemplateLiteral(["puck man"]))))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject229 || (_templateObject229 = _taggedTemplateLiteral(["puck man"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject230 || (_templateObject230 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject231 || (_templateObject231 = _taggedTemplateLiteral(["orange boxing gloves"]))));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral(["ms. puck man"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral(["familiar"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject234 || (_templateObject234 = _taggedTemplateLiteral(["blue pumps"]))));
  }
}, function () {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject235 || (_templateObject235 = _taggedTemplateLiteral(["puck man"])))) || (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject236 || (_templateObject236 = _taggedTemplateLiteral(["ms. puck man"]))))) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(Math.max(0, 20 - (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_powerPillUses') - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject237 || (_templateObject237 = _taggedTemplateLiteral(["power pill"]))))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject238 || (_templateObject238 = _taggedTemplateLiteral(["power pill"]))), freeFightCost(true, false));
  }
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject239 || (_templateObject239 = _taggedTemplateLiteral(["power pill"])))));
});
step('gingerbread city', function () {
  return GingerbreadCity.retailUnlocked() && GingerbreadCity.hasTurns() && (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject240 || (_templateObject240 = _taggedTemplateLiteral(["gingerbread cigarette"]))));
}, function () {}, function () {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_3__.getItem)(GingerbreadCity.turnsLeft(), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject241 || (_templateObject241 = _taggedTemplateLiteral(["gingerbread cigarette"]))), freeFightCost(false, true));
})(function () {
  if (GingerbreadCity.isNoon()) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1204, 1); // find candy

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral(["Gingerbread Train Station"]))), 1, '');
  } else if (GingerbreadCity.isMidnight()) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(1203, 4); // buy cigarettes

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral(["Gingerbread Civic Center"]))), 1, '');
  } else {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject244 || (_templateObject244 = _taggedTemplateLiteral(["Gingerbread Upscale Retail District"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().maybeStasis().item((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject245 || (_templateObject245 = _taggedTemplateLiteral(["gingerbread cigarette"])))).abort());
  }
});
step('deep machine tunnels', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_machineTunnelsAdv') < 5;
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject246 || (_templateObject246 = _taggedTemplateLiteral(["machine elf"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject247 || (_templateObject247 = _taggedTemplateLiteral(["Deep Machine Tunnels"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().spellKill());
});
step('witchess', function () {
  return libram__WEBPACK_IMPORTED_MODULE_10__.fightsDone() < 5;
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.withMacro)(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().maybeStasis().spellKill(), function () {
    return libram__WEBPACK_IMPORTED_MODULE_10__.fightPiece((0,libram__WEBPACK_IMPORTED_MODULE_6__.$monster)(_templateObject248 || (_templateObject248 = _taggedTemplateLiteral(["Witchess Bishop"]))));
  });
});
step('goth kid fishing', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject249 || (_templateObject249 = _taggedTemplateLiteral(["mayfly bait necklace"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mayflySummons') < 30 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_hipsterAdv') < 7;
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject250 || (_templateObject250 = _taggedTemplateLiteral(["Artistic Goth Kid"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject251 || (_templateObject251 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral(["mayfly bait necklace"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral(["Menagerie Level 1"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().maybeStasis(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.if_('monstername fruit golem', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject254 || (_templateObject254 = _taggedTemplateLiteral(["Feel Hatred"])))).abort()).if_('monstername knob goblin mutant', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject255 || (_templateObject255 = _taggedTemplateLiteral(["Snokebomb"])))).abort()).if_('monstername basic elemental', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject256 || (_templateObject256 = _taggedTemplateLiteral(["Summon Mayfly Swarm"])))).abort()).spellKill()));
});
step('kramco fishing', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject257 || (_templateObject257 = _taggedTemplateLiteral(["mayfly bait necklace"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mayflySummons') < 30;
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$slot)(_templateObject258 || (_templateObject258 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject259 || (_templateObject259 = _taggedTemplateLiteral(["mayfly bait necklace"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject260 || (_templateObject260 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
})(function () {
  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject261 || (_templateObject261 = _taggedTemplateLiteral(["Menagerie Level 1"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_('monstername fruit golem', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral(["Feel Hatred"])))).abort()).if_('monstername knob goblin mutant', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral(["Snokebomb"])))).abort()).if_('monstername basic elemental', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.safeStasis().trySkill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject264 || (_templateObject264 = _taggedTemplateLiteral(["Summon Mayfly Swarm"])))).abort()).spellKill());
});
step('final end of day resources', function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myRain)() >= 50 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLightning)() >= 20;
})(heavyRainFreeFights);

function gothMonsterMatch() {
  return 'monstername black crayon*';
}

step('final goth kid fishing', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_hipsterAdv') < 7 && FreeRun.hasFreeRuns();
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject265 || (_templateObject265 = _taggedTemplateLiteral(["Artistic Goth Kid"]))));
})(function () {
  FreeRun.wrapFreeRun(function () {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)(WANDERER_ZONE, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().if_(gothMonsterMatch(), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.spellKill()).step(FreeRun.maybeMacro()).abort());
  });
});
step('final kramco familiar fishing', function () {
  return (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_banderRunaways') < maxFamiliarRuns() || CosplaySaber.canGive(SaberUpgrade.FamiliarWeight) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject266 || (_templateObject266 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_banderRunaways') == maxFamiliarRuns();
}, function () {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject267 || (_templateObject267 = _taggedTemplateLiteral(["Pair of Stomping Boots"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject268 || (_templateObject268 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
  (0,_lib__WEBPACK_IMPORTED_MODULE_3__.setChoice)(885, 4);
})(function () {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_banderRunaways') == maxFamiliarRuns() && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject269 || (_templateObject269 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))) == 0 && CosplaySaber.canGive(SaberUpgrade.FamiliarWeight)) {
    CosplaySaber.upgrade(SaberUpgrade.FamiliarWeight);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.maximize)('familiar weight', false);
  }

  (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$location)(_templateObject270 || (_templateObject270 = _taggedTemplateLiteral(["The Haunted Nursery"]))), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().kramco(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.externalIf((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('bootsCharged'), _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject271 || (_templateObject271 = _taggedTemplateLiteral(["Release The Boots"])))))).if_('monstername creepy doll', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill('Feel Hatred').tryItem('louder than bomb')).if_('monstername Possessed toy chest', _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill('Snokebomb').tryItem('spooky music box mechanism')).step('pickpocket', 'runaway'));
});
step('final kramco free run fishing', function () {
  return FreeRun.hasFreeRuns();
}, function () {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
})(function () {
  FreeRun.wrapFreeRun(function () {
    (0,_combat__WEBPACK_IMPORTED_MODULE_2__.adventureMacro)(WANDERER_ZONE, _combat__WEBPACK_IMPORTED_MODULE_2__.Macro.tentacle().kramco(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.maybeStasis()).step(FreeRun.maybeMacro()).abort());
  });
});

function maxFamiliarRuns() {
  return Math.floor(((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral(["Pair of Stomping Boots"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)()) / 5);
}

function maxProfessorLectures() {
  // assume chip is equipped
  return Math.floor(Math.sqrt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject274 || (_templateObject274 = _taggedTemplateLiteral(["Pocket Professor"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)()));
}

step('final asdon martin', function () {
  return !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_missileLauncherUsed') && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] !== undefined || !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_workshedItemUsed') && (0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject275 || (_templateObject275 = _taggedTemplateLiteral(["Asdon Martin keyfob"]))));
}, function () {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()['Asdon Martin keyfob'] === undefined) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject276 || (_templateObject276 = _taggedTemplateLiteral(["Asdon Martin keyfob"]))));
  }

  (0,_asdon__WEBPACK_IMPORTED_MODULE_1__.fillAsdonMartinTo)(100);
})(function () {
  drumMachineWithMacro(_combat__WEBPACK_IMPORTED_MODULE_2__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_6__.$skill)(_templateObject277 || (_templateObject277 = _taggedTemplateLiteral(["Asdon Martin: Missile Launcher"])))));
});

function setupRobort() {
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_roboDrinks').includes('drive-by shooting')) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject278 || (_templateObject278 = _taggedTemplateLiteral(["drive-by shooting"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('robo drive-by shooting');
  }

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mummeryMods').includes("".concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject279 || (_templateObject279 = _taggedTemplateLiteral(["Robortender"])))))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('mummery meat');
  }

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_feastedFamiliars').includes("".concat((0,libram__WEBPACK_IMPORTED_MODULE_6__.$familiar)(_templateObject280 || (_templateObject280 = _taggedTemplateLiteral(["Robortender"])))))) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_3__.withStash)([(0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject281 || (_templateObject281 = _taggedTemplateLiteral(["Moveable Feast"])))], function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$item)(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral(["Moveable Feast"]))));
    });
  }
}
/*step(
  'pill keeper embezzlers (TURNS)',
  () =>
    (get('currentMojoFilters') == 0 || getRemainingSpleen() >= 3) &&
    property.getBoolean('spendTurns', false) &&
    have($familiar`Robortender`),
  () => {
    useFamiliar($familiar`robortender`);
    setupRobort();
  }
)(() => {
  fightVoter();
  if (mySpleenUse() > 3 && get('currentMojoFilters') < 3) {
    retrieveItem(3, $item`mojo filter`);
    use(3, $item`mojo filter`);
  }
  cliExecute('pillkeeper semirare');
  maximize("meat +equip thor's pliers", false);
  adventureMacro(
    $location`Cobb's Knob Treasury`,
    Macro.tentacle().if_('monstername Knob Goblin Embezzler', Macro.skill('sing along').spellKill()).abort()
  );
});*/


function main() {
  var argString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var skiplist = argString.split(';').map(function (s) {
    return s.trim();
  });
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral(["Steely-Eyed Squint"]))))) throw 'Get Squint first!';
  if (!(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_6__.$effect)(_templateObject284 || (_templateObject284 = _taggedTemplateLiteral(["Eldritch Attunement"]))))) throw 'Get Eldritch Attunement first!';
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('mood apathetic');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('ccs bkfights');

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('sourceTerminalEducate1') !== 'digitize.edu' || (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('sourceTerminalEducate2') !== 'extract.edu') {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('terminal educate digitize; terminal educate extract');
  }

  (0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('hpAutoRecovery', 0.8);
  (0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('hpAutoRecoveryTarget', 0.95);

  if (skiplist.length > 0 && skiplist[0] == 'outfit') {
    pickFreeFightFamiliar();
    outfit();
  } else if (skiplist.length > 0 && skiplist[0] == 'list') {
    finalSteps.forEach(function (step_cb) {
      return step_cb(skiplist, true);
    });
    steps.forEach(function (step_cb) {
      return step_cb(skiplist, true);
    });
  } else if (skiplist.includes('final')) {
    finalSteps.forEach(function (step_cb) {
      return step_cb(skiplist, false);
    });
  } else {
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

"use strict";
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
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/Clan.js");
/* harmony import */ var _combat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combat */ "./src/combat.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




 // borrowed from raidlog parser

function parseImageN(hoboPlace) {
  var regex = new RegExp(/[^\d]*(\d+)o?\.gif/);
  var match = hoboPlace.match(regex);

  if (match) {
    return parseInt(match[1]);
  }

  return -1;
}

var consumables = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Ol' Scratch's Salad Fork,Frosty's Frosty Mug,Jar of Fermented Pickle Juice,Voodoo Snuff,Extra-Greasy Slider,Hodgman's Blanket,Tin Cup of Mulligan Stew,hobo fortress blueprints,stuffed Hodgman"])));
var skills = (0,libram__WEBPACK_IMPORTED_MODULE_3__.$items)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Elron's Explosive Etude,Benetton's Medley of Diversity,The Ballad of Richie Thingfinder,Prelude of Precision,Chorale of Companionship,Hodgman's journal #1: The Lean Times,Hodgman's journal #2: Entrepreneurythmics,Hodgman's journal #3: Pumping Tin,Hodgman's journal #4: View From The Big Top"])));
var hoboLocations = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Burnbarrel Blvd."]))), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Ol' Scratch"]))),
  bossImage: 10,
  container: 4,
  choiceAdventure: 201
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Exposure Esplanade"]))), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Frosty"]))),
  bossImage: 10,
  container: 5,
  choiceAdventure: 202
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["The Heap"]))), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Oscus"]))),
  bossImage: 10,
  container: 6,
  choiceAdventure: 203
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["The Ancient Hobo Burial Ground"]))), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Zombo"]))),
  bossImage: 10,
  container: 7,
  choiceAdventure: 204
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["The Purple Light District"]))), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Chester"]))),
  bossImage: 10,
  container: 8,
  choiceAdventure: 205
}], [(0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Hobopolis Town Square"]))), {
  boss: (0,libram__WEBPACK_IMPORTED_MODULE_3__.$monster)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Hodgman, The Hoboverlord"]))),
  bossImage: 25,
  container: 2,
  choiceAdventure: 200
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
    } else if (imageN > -1) {
      return HoboStatus.NotReady;
    }
  }

  return HoboStatus.Unavailable;
}

function bestItemFamiliar() {
  if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Steam-powered Cheerleader"])))) && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_cheerleaderSteam') > 100) {
    return (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Steam-powered Cheerleader"])));
  }

  return (0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Jumpsuited Hound Dog"])));
}

function turnSafe(name, condition, block) {
  var initialAdventureCount = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)();

  while (condition()) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.assert)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() == initialAdventureCount, "Spent a turn and didn't resolve ".concat(name));
    block();
  }
}

function setupOutfit() {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('bk.weapon')) == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["scratch 'n' sniff sword"])))) {
    // refresh the sticker weapon
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(3, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["scratch 'n' sniff unicorn sticker"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('sticker unicorn, unicorn, unicorn');
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('bk.shirt')) == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["tunac"]))) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["tunac"]))))) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.inClan)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('fishClan'), function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('acquire tunac');
    });
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('bk.familiar')) == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["luck incense"]))) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["luck incense"]))))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$familiar)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["mu"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["box of familiar jacks"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["box of familiar jacks"]))));
  }

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_feastedFamiliars').includes("".concat(bestItemFamiliar()))) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(bestItemFamiliar());
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.withStash)([(0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["moveable feast"])))], function () {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["moveable feast"]))));
    });
  }

  if (!(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mummeryMods').includes("".concat(bestItemFamiliar())) && !(0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_mummeryMods').includes('Item Drop:')) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(bestItemFamiliar());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('mummery item');
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_VYKEACompanionType') === '') {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(37, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["vykea dowel"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(10, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["vykea rail"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('create level 5 lamp');
  }

  if ((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_pantogramModifier') === '') {
    // depends on pantogram.ash
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(11, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["lead necklace"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["tiny dancer"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('pantogram tiny dancer|lead necklace|silent');
  }
}

function outfit() {
  (0,libram__WEBPACK_IMPORTED_MODULE_3__.$slots)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["hat,back,shirt,weapon,off-hand,pants,acc1,acc2,acc3,familiar"]))).forEach(function (slot) {
    var it = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)("bk.".concat(slot)));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(slot, " ").concat(it));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(slot, it);
  });
}

function kill(location) {
  var hoboLocation = hoboLocations.get(location);

  if (hoboLocation) {
    var itemFamiliar = bestItemFamiliar();
    setupOutfit();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(itemFamiliar);
    outfit();
    var otoscopeBoss = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toMonster)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('otoscopeBoss'));

    if (hoboLocation.boss == otoscopeBoss) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$slot)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))));
    }

    if (location == (0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Exposure Esplanade"]))) && !(0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Chilled to the Bone"]))))) {
      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["Louder Than Bomb"]))))) {
        throw 'Unable to get a louder than bomb for getting Chilled to the Bone!';
      } else {
        (0,_lib__WEBPACK_IMPORTED_MODULE_2__.inClan)((0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('chilledClan'), function () {
          turnSafe('Chilled to the Bone', function () {
            return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Chilled to the Bone"]))));
          }, function () {
            (0,_combat__WEBPACK_IMPORTED_MODULE_1__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$location)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Dreadsylvanian Castle"]))), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Louder Than Bomb"])))).abort());
          });
        });
      }

      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Gummi Badass"]))))) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["pocket wish"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('genie effect Gummi Badass');
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Scarysauce"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Jalape\xF1o Saucesphere"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Spiky Shell"]))));

      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Chilled to the Bone"])))) || !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Gummi Badass"]))))) {
        throw "Did not get Chilled to the Bone or Gummi Badass, so we can't kill frosty!";
      }
    }

    var initialAdventureCount = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)();
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(hoboLocation.choiceAdventure, 1);
    var bossMacro = _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.if_("monstername ".concat(hoboLocation.boss), _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.externalIf(hoboLocation.boss == otoscopeBoss && (0,libram__WEBPACK_IMPORTED_MODULE_5__.get)('_otoscopeUsed') < 3, _combat__WEBPACK_IMPORTED_MODULE_1__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_3__.$skill)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["otoscope"]))))).attack().repeat()).item((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Louder Than Bomb"])))).abort();
    turnSafe("Kill ".concat(hoboLocation.boss), function () {
      return status(location) == HoboStatus.BossReady;
    }, function () {
      return (0,_combat__WEBPACK_IMPORTED_MODULE_1__.adventureMacro)(location, bossMacro);
    });
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Killed ".concat(hoboLocation.boss));
    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.setChoice)(hoboLocation.choiceAdventure, 0);

    if ((0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$effect)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Chilled to the Bone"]))))) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["hot Dreadsylvanian cocoa"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["hot Dreadsylvanian cocoa"]))));
    }
  }
}

function printStatus(location) {
  var hoboStatus = status(location);

  switch (hoboStatus) {
    case HoboStatus.Unavailable:
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(location, " unavailable. Are you through the sewers?"), 'purple');
      break;

    case HoboStatus.NotReady:
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(location, " does not have the boss ready."), 'purple');
      break;

    case HoboStatus.BossReady:
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(location, " is ready to kill the boss."), 'lime');
      break;

    case HoboStatus.BossKilled:
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(location, " has already had the boss killed."), 'blue');
  }
}

function main(args) {
  args || (args = 'status');

  if (args.trim() == 'status') {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("In clan ".concat(libram__WEBPACK_IMPORTED_MODULE_6__.Clan.get().name));

    var _iterator = _createForOfIteratorHelper(hoboLocations.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        printStatus(key);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  if (args.trim() == 'drops') {
    consumables.forEach(function (i) {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ": ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(i)));
    });
    skills.forEach(function (i) {
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ": ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(i)));
    });
  }

  if (args.trim() == 'outfit') {
    setupOutfit();
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)(bestItemFamiliar());
    outfit();
    var softshoes = 30 * 2; // doubled by squint

    var friars = 25 * 2; // not doubled by squint

    var baseDrop = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)('Item Drop') + softshoes + friars;
    var foodDrop = baseDrop + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)('Food Drop');
    var boozeDrop = baseDrop + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)('Booze Drop');
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Item Drop: ".concat(baseDrop));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Base Drop: ".concat(Math.floor(baseDrop / 100)));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Food Drop: ".concat(Math.floor(foodDrop / 100)));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Booze Drop: ".concat(Math.floor(boozeDrop / 100)));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Hodgman Food Drop: ".concat(1 + Math.floor((foodDrop - 50) / 150)));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Hodgman Booze Drop: ".concat(1 + Math.floor((boozeDrop - 50) / 150)));
  }

  if (args.trim() == 'kill') {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(10, (0,libram__WEBPACK_IMPORTED_MODULE_3__.$item)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["Louder Than Bomb"]))));
    var drops = new Map();
    var finalDrops = new Map();
    consumables.forEach(function (i) {
      return drops.set(i, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(i));
    });
    skills.forEach(function (i) {
      return drops.set(i, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(i));
    });

    var _iterator2 = _createForOfIteratorHelper(hoboLocations.keys()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _key = _step2.value;
        var lookup = hoboLocations.get(_key);

        if (lookup && status(_key) == HoboStatus.BossReady) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)("<b>Killing ".concat(_key, "</b>"));
          kill(_key);
        } else {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Skipping ".concat(_key));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)('<b>Consumable Drops</b>');
    consumables.forEach(function (i) {
      var current = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(i);
      var prior = drops.get(i) || 0;

      if (current > prior) {
        finalDrops.set("".concat(i), current - prior);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ": ").concat(current - prior));
      }
    });
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)('<b>Skill Drops</b>');
    skills.forEach(function (i) {
      var current = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(i);
      var prior = drops.get(i) || 0;
      drops.set(i, current - prior);

      if (current > prior) {
        finalDrops.set("".concat(i), current - prior);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ": ").concat(current - prior));
      }
    });
    var hoboDrops = JSON.stringify(Array.from(finalDrops.entries()).reduce(function (o, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      o[key] = value;
      return o;
    }, Object.create(null)));
    (0,libram__WEBPACK_IMPORTED_MODULE_5__.set)('_lastHoboDrops', hoboDrops);
  }

  if (args.includes('distro')) {
    var argParts = args.split('|');
    var player = argParts[1];
    var obj = JSON.parse(libram__WEBPACK_IMPORTED_MODULE_5__.getString('_lastHoboDrops', '{}'));
    var dropsMap = new Map();

    var _iterator3 = _createForOfIteratorHelper(Object.getOwnPropertyNames(obj)),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var itemStr = _step3.value;
        dropsMap.set(Item.get(itemStr), obj[itemStr]);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_2__.sendKmail)(player, 'Hobopolis consumable drops', dropsMap);
  }
}

/***/ }),

/***/ "./src/combat.ts":
/*!***********************!*\
  !*** ./src/combat.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
      return this.if_('monstername eldritch tentacle', Macro.step.apply(Macro, arguments).perpetualStasis().spellKill());
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

"use strict";
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
/* harmony export */   "assert": () => (/* binding */ assert),
/* harmony export */   "sendKmail": () => (/* binding */ sendKmail)
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
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Getting ".concat(qty, " ").concat(item, " @ max price ").concat(maxPrice), "blue");
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
function sendKmail(playerName, message, items) {
  var multiKmail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  assert(items.size <= 11 && !multiKmail, 'Can only send 11 items in a single KMail. Use parameter "multiKmail" to send multiple kmails');
  assert(message.length <= 2000, 'KMail text body must be less than 2000 characters');
  var i = 1;
  var encodedPlayer = encodeURIComponent(playerName);
  var encodedMessage = encodeURIComponent(message);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh inventory');
  var params = "towho=".concat(encodedPlayer, "&message=").concat(encodedMessage, "&submit=").concat(encodeURIComponent('Send Message.'));

  var _iterator4 = _createForOfIteratorHelper(items.keys()),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var item = _step4.value;
      var qty = items.get(item);
      var amt = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item);

      if (amt < qty) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Couldn't send ".concat(item, ", didn't have enough, only had ").concat(amt), 'red');
      } else {
        params += "&whichitem".concat(i, "=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(item), "&howmany").concat(i, "=").concat(qty);
        i += 1;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var url = "sendmessage.php?toid=&".concat(params, "&pwd&action=send");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(url, 'red');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)(url, true, true);
}

/***/ }),

/***/ "./src/sewers.ts":
/*!***********************!*\
  !*** ./src/sewers.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/simulate.ts":
/*!*************************!*\
  !*** ./src/simulate.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "simulateFamiliarBoa": () => (/* binding */ simulateFamiliarBoa),
/* harmony export */   "simulateNpzr": () => (/* binding */ simulateNpzr),
/* harmony export */   "simulateStockignMimic": () => (/* binding */ simulateStockignMimic),
/* harmony export */   "simulateFamiliarMeat": () => (/* binding */ simulateFamiliarMeat)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var FREE_STASIS_FAMILIAR = libram__WEBPACK_IMPORTED_MODULE_1__.getFamiliar('freeStasisFamiliar') || (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Cocoabo"])));

function randRange(rMin, rMax) {
  return Math.ceil((rMax - rMin) * Math.random() + rMin);
}

function simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage) {
  var meatDoubleChance = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var mlDamageResistance = Math.min(0.5, 0.04 * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)('Monster Level'));
  var maxHp = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)('Monster Level') + 200;
  var maxTrials = 100000;
  var trials = 0;
  var totalMeat = 0;

  while (trials < maxTrials) {
    var curHp = randRange(maxHp - 15, maxHp + 15);
    var rounds = 0;

    while (curHp > 0 && rounds <= 10) {
      if (Math.random() <= chanceOfAct) {
        var roll = Math.random();

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

function simulateFamiliarBoa() {
  var chanceOfAct = 0.33 + 0.2 + 0.1;
  var chanceOfDamage = 0.5;
  var chanceOfMeat = 0.5;
  var computedWeight = 20 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)() + 5;
  var meat = 5 * computedWeight;

  var damage = function damage() {
    return randRange(computedWeight + 1, computedWeight + 3);
  };

  return simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage);
}
function simulateNpzr() {
  var chanceOfAct = 0.5 + 0.2 + 0.1 + 0.25;
  var chanceOfDamage = 0.22;
  var chanceOfMeat = 0.22;
  var computedWeight = 20 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)() + 5;
  var meat = 6 * computedWeight;

  var damage = function damage() {
    return Math.ceil(1.5 * randRange(computedWeight + 1, computedWeight + 3));
  };

  return simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage);
}
function simulateStockignMimic() {
  var chanceOfAct = 1 / 3 + 0.2 + 0.1 + 0.25;
  var chanceOfDamage = 0.25;
  var chanceOfMeat = 0.25;
  var computedWeight = 100 + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)() + 5;
  var meat = 4 * computedWeight;

  var damage = function damage() {
    return Math.ceil(randRange(computedWeight + 1, computedWeight + 3));
  };

  return simulateFamiliar(chanceOfAct, chanceOfMeat, chanceOfDamage, meat, damage);
}
function simulateFamiliarMeat() {
  if (FREE_STASIS_FAMILIAR === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Comma Chameleon"])))) {
    return simulateFamiliarBoa();
  }

  if (FREE_STASIS_FAMILIAR === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Ninja Pirate Zombie Robot"])))) {
    return simulateNpzr();
  }

  if (FREE_STASIS_FAMILIAR == (0,libram__WEBPACK_IMPORTED_MODULE_2__.$familiar)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Stocking Mimic"])))) {
    return simulateStockignMimic();
  }

  return 0;
}

/***/ }),

/***/ "./src/wl.ts":
/*!*******************!*\
  !*** ./src/wl.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
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
/* harmony import */ var _bkdaily__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bkdaily */ "./src/bkdaily.ts");
/* harmony import */ var _bkdiet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bkdiet */ "./src/bkdiet.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _simulate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./simulate */ "./src/simulate.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












function help() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('bk [mode] [mode args]');
  var table = new _lib__WEBPACK_IMPORTED_MODULE_7__.Table();
  table.row('mode', '', '');
  table.row('help', 'print this help', '');
  table.row('pref', '', '');
  table.row('', 'init', 'initialize the preferences used by this script to their default values');
  table.row('', 'list', 'list the preferences used by this script and their current values');
  table.row('daily', 'Run daily tasks (PYEC, BoT, etc.)', '');
  table.row('fights', '', '');
  table.row('', '(noarg)', 'runs all free fights and daily tasks for the day');
  table.row('', 'list', 'list all fight steps');
  table.row('', 'final', 'uses up all final resources, including familiar runs and free banishes');
  table.row('sewers', 'go through the sewer using familiar runaways', '');
  table.row('boss', '', '');
  table.row('', 'status', 'show the status of the hobo bosses');
  table.row('', 'kill', 'kill the bosses, printing out consumable drops');
  table.row('wl', 'whitelist to the provided clan, list sewer status (valves/grates)', '');
  table.row('minbuff', 'show the minimum buff', '');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(table.render());
}

function preferences(args) {
  var prefDefaults = [['freeFightValue', 40000, 'The Maximimum amount to spend buying free fights'], ['stashClan', '', "The clan to pull shared stash items (moveable feast, bag o' tricks, PYEC)"], ['fishClan', '', 'The clan to pull Clan Fishery Equipment'], ['faxClan', '', 'The clan to recieve faxes in'], ['chilledClan', '', 'The clan with a setup High Kiss Castle, tuned Cold'], ['freeCopyFight', 'Witchess Bishop', 'The monster to rainman/fax for free fights'], ['freeStasisFamiliar', 'Comma Chameleon', 'The familiar to use when running stasis'], ['simulationMelangePrice', '400000', 'The sales price of melange to use when computing what is a cost effective free kill'], ['simulationDrumMachineCost', '4000', 'The cost of drum machines to use when computing what is a cost effective free kill'], ['simulationSafetyThreshold', '1.1', 'Multiplier for the final free fight cost to account'], ['freeBuffThreshold', 25, 'The amount of turns to guarantee of a buff before you run your stasis familiar'], ['freeCrownOfThrones', 'Warbear Drone', 'The familiar to put into your Crown of Thrones (if it is used)'], ['freeBuddyBjorn', 'Golden Monkey', 'The familiar to put in your Buddy Bjorn (if it is used)'], ['getThanksgetting', 'true', 'Whether or not to eat 9 thanksgetting foods'], ['additionalFullness', 'mayo', 'How to get to 18 fullness. Either "melange" or "mayo"'], ['spendTurns', 'true', 'Allow BK to do certain tasks that are high value turns'], ['fillerFood', 'SMOOCH soda', 'Food to fill your remaining stomach with (use a commas to seperate values)'], ['infiniteLoopCount', 100, 'How many times a given block of code is allowed to loop before aborting'], ['fillerBooze', 'mayo', 'Booze to fill your remaining liver with (use a commas to seperate values). If "mayo", it will use food filler'], ['free.hat', 'Crown of Thrones', 'Freefight outfit Hat'], ['free.back', 'Buddy Bjorn', 'Freefight outfit Back (will be flexed to Protonic Accelerator Pack if needed for quest)'], ['free.shirt', "Stephen's Lab Coat", 'Freefight outfit Shirt'], ['free.weapon', "Thor's Pliers", 'Freefight outfit Weapon'], ['free.off-hand', 'KoL Con 13 snowglobe', 'Freefight outfit Offhand'], ['free.pants', 'pantogram pants', 'Freefight outfit Pants'], ['free.acc1', "Mr. Screege's Spectacles", 'Freefight outfit Accessory (1)'], ['free.acc2', "Mr. Cheeng's Spectacles", 'Freefight outfit Accessory (2)'], ['free.acc3', 'Lucky gold ring', 'Freefight outfit Accessory (3) (this will be flexed out for accessoies as needed in some free fights)'], ['free.familiar', 'Ittah Bittah Hookah', 'Freefight outfit Familiar Eqiupment (will be equipped if possible)'], ['otoscopeBoss', 'Oscus', 'The boss against whom to use otoscope'], ['bk.hat', 'Training helmet', 'Bosskilling outfit Hat'], ['bk.back', 'Vampyric Cloake', 'Bosskilling outfit Back'], ['bk.shirt', 'tunac', 'Bosskilling outfit Shirt'], ['bk.weapon', "scratch 'n' sniff sword", 'Bosskilling outfit Weapon'], ['bk.off-hand', 'A Light that Never Goes Out', 'Bosskilling outfit Offhand'], ['bk.pants', 'pantogram pants', 'Bosskilling outfit Pants'], ['bk.acc1', "Mayor Ghost's Sash", 'Bosskilling outfit Accessory (1)'], ['bk.acc2', 'Old Soft Shoes', 'Bosskilling outfit Accessory (2)'], ['bk.acc3', 'Ring of the Skeleton Lord', 'Bosskilling outfit Accessory (3) (this will be flexed out for Lil Doctor Bag as needed)'], ['bk.familiar', 'Luck Incense', 'Bosskilling outfit Familiar']];

  if (args.trim() == 'list') {
    var table = new _lib__WEBPACK_IMPORTED_MODULE_7__.Table();
    table.row('Preference', 'Value', 'Default Value', 'Description');

    var prefValue = function prefValue(r) {
      return r.length > 1 ? (0,libram__WEBPACK_IMPORTED_MODULE_9__.get)("".concat(r[0])) : '';
    };

    prefDefaults.forEach(function (row) {
      return table.row.apply(table, [row[0], prefValue(row)].concat(_toConsumableArray(row.slice(1))));
    });
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.printHtml)(table.render());
  } else if (args.trim() == 'init') {
    prefDefaults.forEach(function (row) {
      return (0,libram__WEBPACK_IMPORTED_MODULE_9__.set)("".concat(row[0]), row[1]);
    });
  }
}

function mall() {
  var inventory = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getInventory)();
  var expensiveItems = [];
  var autoSellItems = [];

  for (var itemStr in inventory) {
    var item = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(itemStr);
    var price = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item);

    if (price > 10000) {
      expensiveItems.push(item);
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.autosellPrice)(item) > 1000) {
      autoSellItems.push(item);
    }
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("You have ".concat(expensiveItems.length, " expensive items. Here are 25:"));
  expensiveItems.slice(0, 25).forEach(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ":").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(i)));
  });
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("You have ".concat(autoSellItems.length, " high autosell items. Here are 25:"));
  autoSellItems.slice(0, 25).forEach(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ":").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.autosellPrice)(i)));
  });
}

function stash() {
  var inventory = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getStash)();
  var expensiveItems = [];
  var PRICE_THRESHOLD = 1000000;

  for (var itemStr in inventory) {
    var qty = inventory[itemStr];
    var item = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(itemStr);
    var price = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(item);

    if (price > PRICE_THRESHOLD || qty && qty * price > PRICE_THRESHOLD) {
      expensiveItems.push(item);
    }
  }

  expensiveItems.forEach(function (i) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(i, ":").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mallPrice)(i)));
  });
}

function kmail() {
  var items = new Map();
  items.set((0,libram__WEBPACK_IMPORTED_MODULE_10__.$item)(_templateObject || (_templateObject = _taggedTemplateLiteral(["seal tooth"]))), 1);
  (0,_lib__WEBPACK_IMPORTED_MODULE_7__.sendKmail)('phreddrickkv2', 'This is a test of my kmail function', items);
}

function main(args) {
  if (!args || args.length == 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("run 'bk help' for help");
  } else {
    (0,_lib__WEBPACK_IMPORTED_MODULE_7__.time)(function () {
      var matchedArgs = args.match(RegExp(/(\w+) ?(.*)/));

      if (matchedArgs) {
        var mode = matchedArgs[1].trim();
        var modeArgs = matchedArgs[2] || '';

        switch (mode) {
          case 'pref':
          case 'prefs':
            preferences(modeArgs);
            break;

          case 'help':
            help();
            break;

          case 'fights':
            (0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.main)(modeArgs);
            break;

          case 'daily':
            (0,_bkdaily__WEBPACK_IMPORTED_MODULE_5__.main)();
            break;

          case 'sewers':
            (0,_sewers__WEBPACK_IMPORTED_MODULE_4__.main)();
            break;

          case 'boss':
            (0,_bkkill__WEBPACK_IMPORTED_MODULE_2__.main)(modeArgs);
            break;

          case 'diet':
            (0,_bkdiet__WEBPACK_IMPORTED_MODULE_6__.main)(modeArgs);
            break;

          case 'wl':
          case 'whitelist':
            (0,_wl__WEBPACK_IMPORTED_MODULE_3__.main)(modeArgs);
            break;

          case 'minbuff':
          case 'genie':
            var threshold = libram__WEBPACK_IMPORTED_MODULE_9__.getNumber('freeBuffThreshold');
            var thresholdEffects = (0,_lib__WEBPACK_IMPORTED_MODULE_7__.buffsBelowThreshold)(threshold, modeArgs);

            if (thresholdEffects.length > 0) {
              thresholdEffects.sort(function (_ref, _ref2) {
                var _ref3 = _slicedToArray(_ref, 2),
                    effectA = _ref3[0],
                    a = _ref3[1];

                var _ref4 = _slicedToArray(_ref2, 2),
                    effectB = _ref4[0],
                    b = _ref4[1];

                return b - a;
              }).forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    minEffect = _ref6[0],
                    minTurns = _ref6[1];

                return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(minEffect, ": ").concat(minTurns, " (").concat(minEffect["default"] || minEffect.note, ")"), minTurns < 20 ? 'red' : 'yellow');
              });
            } else {
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("All relevant buffs exceed threshold of ".concat((0,libram__WEBPACK_IMPORTED_MODULE_9__.get)('freeBuffThreshold'), " turns"));
            }

            if (mode.includes('genie')) {
              thresholdEffects.forEach(function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 2),
                    effect = _ref8[0],
                    turns = _ref8[1];

                var numWishes = Math.ceil((threshold - turns) / 20);
                (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(effect, " is missing ").concat(numWishes, " genie buffs")); //buy(numWishes, $item`pocket wish`, 50000);

                if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("genie effect ".concat(effect))) {
                  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("genie effect ".concat(effect));
                }
              });
            }

            break;

          case 'mall':
            mall();
            break;

          case 'fakehand':
            while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_10__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["fake hand"])))) > 0) {
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_10__.$item)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["fake hand"]))));
            }

            break;

          case 'freefight':
            var perFight = (0,_simulate__WEBPACK_IMPORTED_MODULE_8__.simulateFamiliarMeat)();
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Melange Price: ".concat(libram__WEBPACK_IMPORTED_MODULE_9__.getNumber('simulationMelangePrice')));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Drum Machine Cost: ".concat(libram__WEBPACK_IMPORTED_MODULE_9__.getNumber('simulationDrumMachineCost')));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Simulation Safety Threshold: ".concat(libram__WEBPACK_IMPORTED_MODULE_9__.getNumber('simulationSafetyThreshold')));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Free Fight Values (".concat(perFight, "):"));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('Using Current Familiar', 'Blue');
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Current Familiar Choice: ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.pickFreeFightFamiliar)(true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Drum Machine, Choose Familiar: ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("(Single Battery): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, true) / 4));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Drum Machine, Do not Choose: ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, false)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("No Drum Machine, Choose Familiar: ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(false, true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("No Drum Machine, Do not Choose: ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(false, false)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)('Using Meat Familiar Override');
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Current Familiar Choice (meat familiar): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.pickFreeFightFamiliar)(true, true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Drum Machine, Choose Familiar (meat familiar): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, true, true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("(Single Battery): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, true, true) / 4));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Drum Machine, Do not Choose (meat familiar): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, false, true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("No Drum Machine, Choose Familiar (meat familiar): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(false, true, true)));
            (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("No Drum Machine, Do not Choose (meat familiar): ".concat((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(false, false, true)));

            if (modeArgs.includes('update')) {
              var batteryPrice = Math.floor((0,_bkfights__WEBPACK_IMPORTED_MODULE_1__.freeFightCost)(true, true, true) / 4);
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Updating battery price @ ".concat(batteryPrice), 'red');
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)((0,libram__WEBPACK_IMPORTED_MODULE_10__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Battery (AAA)"]))));
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)('refresh inventory');
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putShop)(batteryPrice, 1, Math.min(5, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_10__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Battery (AAA)"]))))), (0,libram__WEBPACK_IMPORTED_MODULE_10__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Battery (AAA)"]))));
            }

            break;

          case 'stash':
            stash();
            break;

          case 'kmailtest':
            kmail();
        }
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Invalid args ".concat(args));
      }
    });
  }
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;