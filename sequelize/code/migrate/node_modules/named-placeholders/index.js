// based on code from Brian White @mscdex mariasql library - https://github.com/mscdex/node-mariasql/blob/master/lib/Client.js#L272-L332
// License: https://github.com/mscdex/node-mariasql/blob/master/LICENSE

var RE_PARAM = /(?:\?)|(?::(\d+|(?:[a-zA-Z][a-zA-Z0-9_]*)))/g,
    DQUOTE = 34,
    SQUOTE = 39,
    BSLASH = 92;

var parse = function(query) {
  var cqfn;
  if (this._queryCache && (cqfn = this._queryCache.get(query)))
    return cqfn;

  var ppos = RE_PARAM.exec(query), curpos = 0, start = 0, end, parts = [],
      i, chr, inQuote = false, escape = false, qchr, tokens = [], qcnt = 0, fn;
  var lastTokenEndPos = 0;

  if (ppos) {
    do {
      for (i=curpos,end=ppos.index; i<end; ++i) {
        chr = query.charCodeAt(i);
        if (chr === BSLASH)
          escape = !escape;
        else {
          if (escape) {
            escape = false;
            continue;
          }
          if (inQuote && chr === qchr) {
            if (query.charCodeAt(i + 1) === qchr) {
              // quote escaped via "" or ''
              ++i;
              continue;
            }
            inQuote = false;
          } else if (chr === DQUOTE || chr === SQUOTE) {
            inQuote = true;
            qchr = chr;
          }
        }
      }
      if (!inQuote) {
        parts.push(query.substring(start, end));
        tokens.push(ppos[0].length === 1 ? qcnt++ : ppos[1]);
        start = end + ppos[0].length;
        lastTokenEndPos = start;
      }
      curpos = end + ppos[0].length;
    } while (ppos = RE_PARAM.exec(query));

    if (tokens.length) {
      if (curpos < query.length)
        parts.push(query.substring(lastTokenEndPos));
      return [parts, tokens];
    }
  }
  return [query];
};

var EMPTY_LRU_FN = function(key, value) {};

var createCompiler = function(config) {
  if (!config)
    config = {};
  if (!config.placeholder) {
    config.placeholder = '?';
  }
  var ncache = 100;
  var cache;
  if (typeof config.cache === 'number')
    ncache = config.cache;
  if (typeof config.cache === 'object')
    cache = config.cache;
  if (config.cache !== false && !cache) {
    cache = require('lru-cache')({ max: ncache, dispose: EMPTY_LRU_FN });
  }

  function toArrayParams(tree, params) {
    var arr = [];
    if (tree.length == 1)
      return [tree[0], []];

    if (typeof params == 'undefined')
      throw new Error('Named query contains placeholders, but parameters object is undefined');

    var tokens = tree[1];
    for (var i=0; i < tokens.length; ++i)
      arr.push(params[tokens[i]]);
    return [tree[0], arr];
  }

  function noTailingSemicolon(s) {
    if (s.slice(-1) == ':')
      return s.slice(0, -1);
    return s;
  }

  function join(tree) {
    if (tree.length == 1)
      return tree;

    var unnamed = noTailingSemicolon(tree[0][0]);
    for (var i=1; i < tree[0].length; ++i) {
      if (tree[0][i-1].slice(-1) == ':') {
        unnamed += config.placeholder;
      }
      unnamed += config.placeholder;
      unnamed += noTailingSemicolon(tree[0][i]);
    }

    var last = tree[0][tree[0].length -1];
    if (tree[0].length == tree[1].length) {
      if (last.slice(-1) == ':') {
        unnamed += config.placeholder;
      }
      unnamed += config.placeholder;
    }
    return [unnamed, tree[1]];
  }

  var compile = function(query, paramsObj) {
    var tree;
    if (cache && (tree = cache.get(query))) {
      return toArrayParams(tree, paramsObj)
    }
    tree = join(parse(query));
    cache && cache.set(query, tree);
    return toArrayParams(tree, paramsObj);
  }

  compile.parse = parse;
  return compile;
}

// named :one :two to postgres-style numbered $1 $2 $3
var toNumbered = function(q, params) {
  var tree = parse(q);
  var paramsArr = [];
  if (tree.length == 1)
    return [tree[0], paramsArr];

  var pIndexes = {};
  var pLastIndex = 0;
  var qs = '';
  var varIndex;
  var varNames = [];
  for (var i=0; i < tree[0].length; ++i) {
    varIndex = pIndexes[tree[1][i]];
    if (!varIndex) {
      varIndex = ++pLastIndex;
      pIndexes[tree[1][i]] = varIndex;
    }
    if (tree[1][i]) {
      varNames[varIndex - 1] = tree[1][i];
      qs += tree[0][i] + '$' + varIndex;
    } else {
      qs += tree[0][i];
    }
  }
  paramsArr = varNames.map(function(n) {
    return params[n];
  });
  return [qs, paramsArr];
}

module.exports = createCompiler;
module.exports.toNumbered = toNumbered;
