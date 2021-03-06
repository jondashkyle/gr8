var lib = require('./helpers')
var defaultUtils = require('./utils')
var defaultOptions = require('./defaults')
var getBreakpoints = require('./breakpoints')

module.exports = function (options) {
  var opts = lib.extend(defaultOptions, options)
  var utilities = lib.squish(defaultUtils, {
    stopWhen: lib.isUtil
  })

  function getFallbackUnit (unit) {
    unit = unit || ''
    return unit === true ? opts.unit : unit
  }

  function getUnit (val, unit) {
    return val ? getFallbackUnit(unit) : ''
  }

  function getTransformedVal (val, transform) {
    return lib.isFcn(transform) ? transform(val) : val
  }

  function makeDeclaration (prop, val) {
    return prop + ':' + val
  }

  function makeDeclarationBlock (util) {
    var val = getTransformedVal(util.val, util.transform)
    var unit = getUnit(util.val, util.unit)

    return lib.alwaysArr(util.prop).map(function (prop) {
      return makeDeclaration(prop, (val + unit))
    }).join(';')
  }

  function makeClassSelector (scope, prefix) {
    return '.' + (scope ? scope + '-' + prefix : prefix)
  }

  function makeAttrSelector (scope, prefix) {
    return '[' + scope + '~="' + prefix + '"]'
  }

  function makeSelector (prefix, scope) {
    return lib.alwaysArr(prefix).map(function (p) {
      if (scope && opts.attribute) {
        return makeAttrSelector(scope, p)
      } else {
        return makeClassSelector(scope, p)
      }
    }).join(' ')
  }

  function makeRule (util, scope) {
    return makeSelector(util.prefix, scope)
      + util.suffix
      + '{'
      + lib.strip(util.declaration)
      + '}'
  }

  function makeRuleObj (prefix, suffix, declaration) {
    return {
      prefix: prefix || '',
      suffix: suffix || '',
      declaration: declaration || ''
    }
  }

  function simpleUtil (util) {
    if (util.prefix && lib.isStr(util.declaration)) {
      return makeRuleObj(util.prefix, util.suffix, util.declaration)
    }
  }

  function canGenerate (util) {
    function hasPrefixOrProp () {
      return lib.exists(util.prefix) || lib.exists(util.prop)
    }

    return lib.exists(util.vals) && hasPrefixOrProp()
  }

  function makePrefixer (util) {
    return function makePrefix (valObj) {
      var thisPrefix = util.prefix || lib.abbreviate(util.prop)
      var thisVal = lib.getKeyOrVal(valObj)
      return [ thisPrefix, thisVal ].join(util.hyphenate ? '-' : '')
    }
  }

  function complexUtil (util) {
    if (canGenerate(util)) {
      var makePrefix = makePrefixer(util)
      return lib.alwaysArr(lib.arrOfObjs(util.vals)).map(function (val) {
        var thisValObj = lib.getValObj(val)
        var thisPrefix = makePrefix(thisValObj)
        var thisDeclaration = lib.isFcn(util.declaration)
          ? util.declaration(thisValObj.val)
          : makeDeclarationBlock(lib.extend(util, { val: thisValObj.val }))
        return makeRuleObj(thisPrefix, util.suffix, thisDeclaration)
      })
    } else {
      console.warn('\
        Unable to generate styles for ' + JSON.stringify(util) + '.\
        Missing values, prefix, or prop.\
      ')
    }
  }

  function getUtil (util) {
    return simpleUtil(util) || complexUtil(util)
  }

  function expandUtils (utils) {
    utils = lib.squish(utils, {
      includeArrays: true,
      stopWhen: lib.isUtil
    })

    Object.keys(utils).forEach(function (key) {
      if (lib.isFcn(utils[key])) {
        utils[key] = utils[key](opts)
      }
    })

    return lib.squish(utils, {
      includeArrays: true,
      stopWhen: lib.isUtil
    })
  }

  function setUtilOption (util) {
    return opts[util.option]
      ? lib.extend(util, { vals: opts[util.option]})
      : util
  }

  function formatUtil (util) {
    if (lib.isArr(util.prop)) {
      return util.prop.map(function (prop) {
        return getUtil(lib.extend(util, { prop: prop }))
      }).reduce(lib.flatten, [])
    } else {
      return getUtil(util)
    }
  }

  function getFormattedUtils () {
    var expandedUtils = expandUtils(utilities)
    var utilsArr = lib.objToArr(expandedUtils)

    var utils = utilsArr
      .filter(lib.removeEmpty)
      .map(setUtilOption)
      .map(formatUtil)
      .reduce(lib.flatten, [])
      .filter(lib.removeEmpty)

    return utils ? utils : []
  }

  function filterNested (bp, utils) {
    if (!bp.key && opts.nested) {
      return utils.filter(function (util) {
        return !(lib.isArr(util.prefix) &&
          ['c12', 'co12'].indexOf(util.prefix[0]) >= 0)
      })
    }
    return utils
  }

  function makeCss () {
    var utils = getFormattedUtils()
    var brpts = getBreakpoints(opts)

    var css = brpts.map(function (bp) {
      var thisUtils = filterNested(bp, utils)
      return [
        bp.open,
        thisUtils.map(function (util) {
          return makeRule(util, bp.key)
        }).join('\n'),
        bp.close
      ].join('\n')
    }).join('')

    return css.replace(/^\s*[\r\n]/gm, '')
  }

  // gr8 public api
  var api = {}

  api.add = function (util) {
    var hash = lib.hash(JSON.stringify(util))
    utilities['z' + hash] = util
  }

  api.remove = function (key) {
    lib.alwaysArr(key).forEach(function (k) {
      if (k in utilities) {
        delete utilities[k]
      }
    })
  }

  api.reset = function () {
    utilities = {}
  }

  api.toString = function () {
    return makeCss()
  }

  api.attach = function () {
    var styleNode = document.createElement('style')
    styleNode.setAttribute('data-gr8-css', '')
    styleNode.innerHTML = makeCss()
    document.head.appendChild(styleNode)
    return styleNode
  }

  api.utils = function () {
    return getFormattedUtils()
  }

  return api
}
