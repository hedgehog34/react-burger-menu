(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BurgerMenu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":7,"_process":2}],4:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":7}],5:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))
},{"./checkPropTypes":3,"./lib/ReactPropTypesSecret":7,"_process":2,"object-assign":1}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))
},{"./factoryWithThrowingShims":4,"./factoryWithTypeCheckers":5,"_process":2}],7:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],8:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function:
        while (_again) {
            var object = _x, property = _x2, receiver = _x3;
            _again = false;
            if (object === null)
                object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    _x = parent;
                    _x2 = property;
                    _x3 = receiver;
                    _again = true;
                    desc = parent = undefined;
                    continue _function;
                }
            } else if ('value' in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        }
};
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var _react = typeof window !== 'undefined' ? window['React'] : typeof global !== 'undefined' ? global['React'] : null;
var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _propTypes2 = _interopRequireDefault(_propTypes);
var BurgerIcon = function (_Component) {
        _inherits(BurgerIcon, _Component);
        function BurgerIcon(props) {
            _classCallCheck(this, BurgerIcon);
            _get(Object.getPrototypeOf(BurgerIcon.prototype), 'constructor', this).call(this, props);
            this.state = { hover: false };
        }
        _createClass(BurgerIcon, [
            {
                key: 'getLineStyle',
                value: function getLineStyle(index) {
                    return {
                        position: 'absolute',
                        height: '20%',
                        left: 0,
                        right: 0,
                        top: 20 * (index * 2) + '%',
                        opacity: this.state.hover ? 0.6 : 1
                    };
                }
            },
            {
                key: 'handleHover',
                value: function handleHover() {
                    this.setState({ hover: !this.state.hover });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var _props = this.props;
                    var styles = _props.styles;
                    var customIcon = _props.customIcon;
                    var onClick = _props.onClick;
                    var bmIcon = styles.bmIcon;
                    var bmBurgerBars = styles.bmBurgerBars;
                    var bmBurgerButton = styles.bmBurgerButton;
                    var icon = undefined;
                    var buttonStyle = {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            border: 'none',
                            textIndent: -9999,
                            background: 'transparent',
                            outline: 'none'
                        };
                    if (customIcon) {
                        var extraProps = {
                                className: 'bm-icon',
                                style: _extends({
                                    width: '100%',
                                    height: '100%'
                                }, bmIcon)
                            };
                        icon = _react2['default'].cloneElement(customIcon, extraProps);
                    } else {
                        icon = _react2['default'].createElement('span', null, _react2['default'].createElement('span', {
                            className: 'bm-burger-bars',
                            style: _extends({}, this.getLineStyle(0), bmBurgerBars)
                        }), _react2['default'].createElement('span', {
                            className: 'bm-burger-bars',
                            style: _extends({}, this.getLineStyle(1), bmBurgerBars)
                        }), _react2['default'].createElement('span', {
                            className: 'bm-burger-bars',
                            style: _extends({}, this.getLineStyle(2), bmBurgerBars)
                        }));
                    }
                    return _react2['default'].createElement('div', {
                        className: 'bm-burger-button',
                        style: _extends({ zIndex: 1 }, bmBurgerButton)
                    }, icon, _react2['default'].createElement('button', {
                        className: 'bm-burger-button__button',
                        onClick: onClick,
                        onMouseEnter: function () {
                            return _this.handleHover();
                        },
                        onMouseLeave: function () {
                            return _this.handleHover();
                        },
                        style: buttonStyle
                    }, 'Open Menu'));
                }
            }
        ]);
        return BurgerIcon;
    }(_react.Component);
exports['default'] = BurgerIcon;
BurgerIcon.propTypes = {
    customIcon: _propTypes2['default'].element,
    styles: _propTypes2['default'].object
};
BurgerIcon.defaultProps = { styles: {} };
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"prop-types":6}],9:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports['default'] = {
    slide: require('./menus/slide'),
    stack: require('./menus/stack'),
    elastic: require('./menus/elastic'),
    bubble: require('./menus/bubble'),
    push: require('./menus/push'),
    squeeze: require('./menus/squeeze'),
    pushRotate: require('./menus/pushRotate'),
    scaleDown: require('./menus/scaleDown'),
    scaleRotate: require('./menus/scaleRotate'),
    fallDown: require('./menus/fallDown')
};
module.exports = exports['default'];
},{"./menus/bubble":13,"./menus/elastic":14,"./menus/fallDown":15,"./menus/push":16,"./menus/pushRotate":17,"./menus/scaleDown":18,"./menus/scaleRotate":19,"./menus/slide":20,"./menus/squeeze":21,"./menus/stack":22}],10:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function:
        while (_again) {
            var object = _x, property = _x2, receiver = _x3;
            _again = false;
            if (object === null)
                object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    _x = parent;
                    _x2 = property;
                    _x3 = receiver;
                    _again = true;
                    desc = parent = undefined;
                    continue _function;
                }
            } else if ('value' in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        }
};
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var _react = typeof window !== 'undefined' ? window['React'] : typeof global !== 'undefined' ? global['React'] : null;
var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var CrossIcon = function (_Component) {
        _inherits(CrossIcon, _Component);
        function CrossIcon() {
            _classCallCheck(this, CrossIcon);
            _get(Object.getPrototypeOf(CrossIcon.prototype), 'constructor', this).apply(this, arguments);
        }
        _createClass(CrossIcon, [
            {
                key: 'getCrossStyle',
                value: function getCrossStyle(type) {
                    return {
                        position: 'absolute',
                        width: 3,
                        height: 14,
                        transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var customIcon = _props.customIcon;
                    var styles = _props.styles;
                    var onClick = _props.onClick;
                    var bmCross = styles.bmCross;
                    var bmCrossButton = styles.bmCrossButton;
                    var icon = undefined;
                    var buttonWrapperStyle = {
                            position: 'absolute',
                            width: 24,
                            height: 24,
                            right: 8,
                            top: 8
                        };
                    var buttonStyle = {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            border: 'none',
                            textIndent: -9999,
                            background: 'transparent',
                            outline: 'none'
                        };
                    if (customIcon) {
                        var extraProps = {
                                className: 'bm-cross',
                                style: _extends({
                                    width: '100%',
                                    height: '100%'
                                }, bmCross)
                            };
                        icon = (0, _react.cloneElement)(customIcon, extraProps);
                    } else {
                        icon = _react2['default'].createElement('span', {
                            style: {
                                position: 'absolute',
                                top: '6px',
                                right: '14px'
                            }
                        }, _react2['default'].createElement('span', {
                            className: 'bm-cross',
                            style: _extends({}, this.getCrossStyle('before'), bmCross)
                        }), _react2['default'].createElement('span', {
                            className: 'bm-cross',
                            style: _extends({}, this.getCrossStyle('after'), bmCross)
                        }));
                    }
                    return _react2['default'].createElement('div', {
                        className: 'bm-cross-button',
                        style: _extends({}, buttonWrapperStyle, bmCrossButton)
                    }, icon, _react2['default'].createElement('button', {
                        onClick: onClick,
                        style: buttonStyle
                    }, 'Close Menu'));
                }
            }
        ]);
        return CrossIcon;
    }(_react.Component);
exports['default'] = CrossIcon;
CrossIcon.propTypes = {
    customIcon: _propTypes.element,
    styles: _propTypes.object
};
CrossIcon.defaultProps = { styles: {} };
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"prop-types":6}],11:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var styles = {
        overlay: function overlay(isOpen) {
            return {
                position: 'fixed',
                zIndex: 1,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                MozTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                MsTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                OTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                WebkitTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                transform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
            };
        },
        menuWrap: function menuWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    right: 0,
                    zIndex: 2,
                    width: width,
                    height: '100%',
                    MozTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                    transform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                    transition: 'all 0.2s'
                };
            case 'bottom':
                return {
                    position: 'fixed',
                    bottom: 0,
                    zIndex: 2,
                    width: '100%',
                    height: height,
                    MozTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    transform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    transition: 'all 0.2s'
                };
            case 'top':
                return {
                    position: 'fixed',
                    top: 0,
                    zIndex: 2,
                    width: '100%',
                    height: height,
                    MozTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    transform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    transition: 'all 0.2s'
                };
            default:
                return {
                    position: 'fixed',
                    right: 'inherit',
                    zIndex: 2,
                    width: width,
                    height: '100%',
                    MozTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                    transition: 'all 0.2s'
                };
            }
        },
        menu: function menu() {
            return {
                height: '100%',
                boxSizing: 'border-box'
            };
        },
        itemList: function itemList(isOpen, width, height, position) {
            return { height: '100%' };
        },
        item: function item() {
            return {
                display: 'block',
                outline: 'none'
            };
        },
        dragHandle: function dragHandle() {
            return {
                zIndex: 1,
                position: 'fixed',
                top: 0,
                bottom: 0
            };
        }
    };
exports['default'] = styles;
module.exports = exports['default'];
},{}],12:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function:
        while (_again) {
            var object = _x, property = _x2, receiver = _x3;
            _again = false;
            if (object === null)
                object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    _x = parent;
                    _x2 = property;
                    _x3 = receiver;
                    _again = true;
                    desc = parent = undefined;
                    continue _function;
                }
            } else if ('value' in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        }
};
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var _react = typeof window !== 'undefined' ? window['React'] : typeof global !== 'undefined' ? global['React'] : null;
var _react2 = _interopRequireDefault(_react);
var _reactDom = typeof window !== 'undefined' ? window['ReactDOM'] : typeof global !== 'undefined' ? global['ReactDOM'] : null;
var _reactDom2 = _interopRequireDefault(_reactDom);
var _propTypes = require('prop-types');
var _propTypes2 = _interopRequireDefault(_propTypes);
var _baseStyles = require('./baseStyles');
var _baseStyles2 = _interopRequireDefault(_baseStyles);
var _BurgerIcon = require('./BurgerIcon');
var _BurgerIcon2 = _interopRequireDefault(_BurgerIcon);
var _CrossIcon = require('./CrossIcon');
var _CrossIcon2 = _interopRequireDefault(_CrossIcon);
exports['default'] = function (styles) {
    var Menu = function (_Component) {
            _inherits(Menu, _Component);
            function Menu(props) {
                _classCallCheck(this, Menu);
                _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
                this.state = {
                    isOpen: props && typeof props.isOpen !== 'undefined' ? props.isOpen : false,
                    sidebarWidth: props.width,
                    touchIdentifier: null,
                    touchStartX: null,
                    touchStartY: null,
                    touchCurrentX: null,
                    touchCurrentY: null,
                    dragSupported: false
                };
                this.onTouchStart = this.onTouchStart.bind(this);
                this.onTouchMove = this.onTouchMove.bind(this);
                this.onTouchEnd = this.onTouchEnd.bind(this);
                this.onScroll = this.onScroll.bind(this);
                this.saveSidebarRef = this.saveSidebarRef.bind(this);
            }
            _createClass(Menu, [
                {
                    key: 'toggleMenu',
                    value: function toggleMenu() {
                        var _this = this;
                        var newState = { isOpen: !this.state.isOpen };
                        this.applyWrapperStyles();
                        this.setState(newState, function () {
                            _this.props.onStateChange(newState);
                            _this.timeoutId && clearTimeout(_this.timeoutId);
                            _this.timeoutId = setTimeout(function () {
                                _this.timeoutId = null;
                                if (!newState.isOpen) {
                                    _this.clearWrapperStyles();
                                }
                            }, 500);
                        });
                    }
                },
                {
                    key: 'applyWrapperStyles',
                    value: function applyWrapperStyles() {
                        if (styles.pageWrap && this.props.pageWrapId) {
                            this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
                        }
                        if (styles.outerContainer && this.props.outerContainerId) {
                            this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
                        }
                    }
                },
                {
                    key: 'clearWrapperStyles',
                    value: function clearWrapperStyles() {
                        if (styles.pageWrap && this.props.pageWrapId) {
                            this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, false);
                        }
                        if (styles.outerContainer && this.props.outerContainerId) {
                            this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, false);
                        }
                    }
                },
                {
                    key: 'handleExternalWrapper',
                    value: function handleExternalWrapper(id, wrapperStyles, set) {
                        var html = document.querySelector('html');
                        var body = document.querySelector('body');
                        var wrapper = document.getElementById(id);
                        if (!wrapper) {
                            if (!this.state.isOpen)
                                console.error('Element with ID \'' + id + '\' not found');
                            return;
                        }
                        var builtStyles = this.getStyle(wrapperStyles);
                        for (var prop in builtStyles) {
                            if (builtStyles.hasOwnProperty(prop)) {
                                wrapper.style[prop] = set ? builtStyles[prop] : '';
                            }
                        }
                        [
                            html,
                            body
                        ].forEach(function (element) {
                            element.style['overflow-x'] = set ? 'hidden' : '';
                        });
                    }
                },
                {
                    key: 'getStyles',
                    value: function getStyles(el, index, inline, children) {
                        var propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());
                        var output = _baseStyles2['default'][el] ? this.getStyle(_baseStyles2['default'][el]) : {};
                        if (styles[el]) {
                            output = _extends({}, output, this.getStyle(styles[el], index + 1, children));
                        }
                        if (this.props.styles[propName]) {
                            output = _extends({}, output, this.props.styles[propName]);
                        }
                        if (inline) {
                            output = _extends({}, output, inline);
                        }
                        return output;
                    }
                },
                {
                    key: 'getStyle',
                    value: function getStyle(style, index, children) {
                        var _props = this.props;
                        var width = _props.width;
                        var height = _props.height;
                        if (typeof width !== 'string')
                            width = width + 'px';
                        if (typeof height !== 'string')
                            height = height + 'px';
                        return style(this.state.isOpen, width, height, this.props.position, this.props.breakpoint, index, children);
                    }
                },
                {
                    key: 'listenForClose',
                    value: function listenForClose(e) {
                        e = e || window.event;
                        if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
                            this.toggleMenu();
                        }
                    }
                },
                {
                    key: 'componentWillMount',
                    value: function componentWillMount() {
                        if (!styles) {
                            throw new Error('No styles supplied');
                        }
                        if (this.props.isOpen) {
                            this.toggleMenu();
                        }
                    }
                },
                {
                    key: 'componentDidMount',
                    value: function componentDidMount() {
                        if (this.props.customOnKeyDown) {
                            window.onkeydown = this.props.customOnKeyDown;
                        } else if (!this.props.disableCloseOnEsc) {
                            window.onkeydown = this.listenForClose.bind(this);
                        }
                        if (this.props.isOpen) {
                            this.toggleMenu();
                        }
                        this.setState({ dragSupported: typeof window === 'object' && 'ontouchstart' in window });
                        this.saveSidebarWidth();
                    }
                },
                {
                    key: 'componentWillUnmount',
                    value: function componentWillUnmount() {
                        window.onkeydown = null;
                        this.clearWrapperStyles();
                    }
                },
                {
                    key: 'componentDidUpdate',
                    value: function componentDidUpdate() {
                        var _this2 = this;
                        if (styles.svg) {
                            (function () {
                                var morphShape = _reactDom2['default'].findDOMNode(_this2, 'bm-morph-shape');
                                var path = styles.svg.lib(morphShape).select('path');
                                if (_this2.state.isOpen) {
                                    styles.svg.animate(path);
                                } else {
                                    setTimeout(function () {
                                        path.attr('d', styles.svg.pathInitial);
                                    }, 300);
                                }
                            }());
                        }
                        if (!this.isTouching()) {
                            this.saveSidebarWidth();
                        }
                    }
                },
                {
                    key: 'componentWillReceiveProps',
                    value: function componentWillReceiveProps(nextProps) {
                        if (typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== this.state.isOpen) {
                            this.toggleMenu();
                        }
                    }
                },
                {
                    key: 'isTouching',
                    value: function isTouching() {
                        return this.state.touchIdentifier !== null;
                    }
                },
                {
                    key: 'onTouchStart',
                    value: function onTouchStart(ev) {
                        if (!this.isTouching()) {
                            var touch = ev.targetTouches[0];
                            this.setState({
                                touchIdentifier: touch.identifier,
                                touchStartX: touch.clientX,
                                touchStartY: touch.clientY,
                                touchCurrentX: touch.clientX,
                                touchCurrentY: touch.clientY
                            });
                        }
                    }
                },
                {
                    key: 'onTouchMove',
                    value: function onTouchMove(ev) {
                        if (this.isTouching()) {
                            for (var ind = 0; ind < ev.targetTouches.length; ind++) {
                                if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
                                    this.setState({
                                        touchCurrentX: ev.targetTouches[ind].clientX,
                                        touchCurrentY: ev.targetTouches[ind].clientY
                                    });
                                    break;
                                }
                            }
                        }
                    }
                },
                {
                    key: 'onTouchEnd',
                    value: function onTouchEnd() {
                        if (this.isTouching()) {
                            var touchWidth = this.touchSidebarWidth();
                            if (this.state.isOpen && touchWidth < this.state.sidebarWidth - this.props.dragToggleDistance || !this.state.isOpen && touchWidth > this.props.dragToggleDistance) {
                                this.toggleMenu();
                            }
                            this.setState({
                                touchIdentifier: null,
                                touchStartX: null,
                                touchStartY: null,
                                touchCurrentX: null,
                                touchCurrentY: null
                            });
                        }
                    }
                },
                {
                    key: 'touchSidebarWidth',
                    value: function touchSidebarWidth() {
                        if (this.props.position === 'right') {
                            if (this.state.isOpen && window.innerWidth - this.state.touchStartX < this.state.sidebarWidth) {
                                if (this.state.touchCurrentX > this.state.touchStartX) {
                                    return this.state.sidebarWidth + this.state.touchStartX - this.state.touchCurrentX;
                                }
                                return this.state.sidebarWidth;
                            }
                            return Math.min(window.innerWidth - this.state.touchCurrentX, this.state.sidebarWidth);
                        }
                        if (this.props.position === 'left') {
                            if (this.state.isOpen && this.state.touchStartX < this.state.sidebarWidth) {
                                if (this.state.touchCurrentX > this.state.touchStartX) {
                                    return this.state.sidebarWidth;
                                }
                                return this.state.sidebarWidth - this.state.touchStartX + this.state.touchCurrentX;
                            }
                        }
                        return Math.min(this.state.touchCurrentX, this.state.sidebarWidth);
                    }
                },
                {
                    key: 'onScroll',
                    value: function onScroll() {
                        if (this.isTouching() && this.inCancelDistanceOnScroll()) {
                            this.setState({
                                touchIdentifier: null,
                                touchStartX: null,
                                touchStartY: null,
                                touchCurrentX: null,
                                touchCurrentY: null
                            });
                        }
                    }
                },
                {
                    key: 'inCancelDistanceOnScroll',
                    value: function inCancelDistanceOnScroll() {
                        var _state = this.state;
                        var touchCurrentX = _state.touchCurrentX;
                        var touchStartX = _state.touchStartX;
                        var position = this.props.position;
                        var CANCEL_DISTANCE_ON_SCROLL = 20;
                        var cancelDistanceOnScroll = undefined;
                        if (position === 'right') {
                            cancelDistanceOnScroll = Math.abs(touchCurrentX - touchStartX) < CANCEL_DISTANCE_ON_SCROLL;
                        } else if (position === 'left') {
                            cancelDistanceOnScroll = Math.abs(touchStartX - touchCurrentX) < CANCEL_DISTANCE_ON_SCROLL;
                        } else
                            return;
                        return cancelDistanceOnScroll;
                    }
                },
                {
                    key: 'saveSidebarWidth',
                    value: function saveSidebarWidth() {
                        var width = this.sidebar.offsetWidth;
                        if (width !== this.state.sidebarWidth) {
                            this.setState({ sidebarWidth: width });
                        }
                    }
                },
                {
                    key: 'saveSidebarRef',
                    value: function saveSidebarRef(node) {
                        this.sidebar = node;
                    }
                },
                {
                    key: 'render',
                    value: function render() {
                        var _this3 = this;
                        var _state2 = this.state;
                        var isOpen = _state2.isOpen;
                        var dragSupported = _state2.dragSupported;
                        var _props2 = this.props;
                        var touchHandleWidth = _props2.touchHandleWidth;
                        var position = _props2.position;
                        var noOverlay = _props2.noOverlay;
                        var id = _props2.id;
                        var className = _props2.className;
                        var customCrossIcon = _props2.customCrossIcon;
                        var customBurgerIcon = _props2.customBurgerIcon;
                        var children = _props2.children;
                        var propsStyles = _props2.styles;
                        var rootProps = {};
                        var dragHandle = undefined;
                        if (dragSupported) {
                            if (isOpen) {
                                rootProps.onTouchStart = this.onTouchStart;
                                rootProps.onTouchMove = this.onTouchMove;
                                rootProps.onTouchEnd = this.onTouchEnd;
                                rootProps.onTouchCancel = this.onTouchEnd;
                                rootProps.onScroll = this.onScroll;
                            } else {
                                var dragHandleStyle = this.getStyles('dragHandle');
                                dragHandleStyle.width = touchHandleWidth;
                                if (position === 'left') {
                                    dragHandleStyle.left = 0;
                                } else if (position === 'right') {
                                    dragHandleStyle.right = 0;
                                }
                                dragHandle = position === 'left' && _react2['default'].createElement('div', {
                                    style: dragHandleStyle,
                                    onTouchStart: this.onTouchStart,
                                    onTouchMove: this.onTouchMove,
                                    onTouchEnd: this.onTouchEnd,
                                    onTouchCancel: this.onTouchEnd
                                });
                            }
                        }
                        return _react2['default'].createElement('div', rootProps, dragHandle, !noOverlay && _react2['default'].createElement('div', {
                            className: 'bm-overlay',
                            onClick: function () {
                                return _this3.toggleMenu();
                            },
                            style: this.getStyles('overlay')
                        }), _react2['default'].createElement('div', {
                            id: id,
                            className: 'bm-menu-wrap ' + (className || ''),
                            style: this.getStyles('menuWrap')
                        }, styles.svg ? _react2['default'].createElement('div', {
                            className: 'bm-morph-shape',
                            style: this.getStyles('morphShape')
                        }, _react2['default'].createElement('svg', {
                            width: '100%',
                            height: '100%',
                            viewBox: '0 0 100 800',
                            preserveAspectRatio: 'none'
                        }, _react2['default'].createElement('path', { d: styles.svg.pathInitial }))) : null, _react2['default'].createElement('div', {
                            className: 'bm-menu',
                            style: this.getStyles('menu'),
                            ref: this.saveSidebarRef
                        }, _react2['default'].createElement('nav', {
                            className: 'bm-item-list',
                            style: this.getStyles('itemList')
                        }, _react.Children.map(children, function (item, index) {
                            if (item) {
                                var kids = children.length;
                                var extraProps = {
                                        key: index,
                                        style: _this3.getStyles('item', index, item.props.style, kids)
                                    };
                                return (0, _react.cloneElement)(item, extraProps);
                            }
                        }))), customCrossIcon !== false && _react2['default'].createElement(_CrossIcon2['default'], {
                            onClick: function () {
                                return _this3.toggleMenu();
                            },
                            styles: propsStyles,
                            customIcon: customCrossIcon
                        })), customBurgerIcon !== false && _react2['default'].createElement(_BurgerIcon2['default'], {
                            onClick: function () {
                                return _this3.toggleMenu();
                            },
                            styles: propsStyles,
                            customIcon: customBurgerIcon
                        }));
                    }
                }
            ]);
            return Menu;
        }(_react.Component);
    Menu.propTypes = {
        breakpoint: _propTypes2['default'].number,
        className: _propTypes2['default'].string,
        customBurgerIcon: _propTypes2['default'].oneOfType([
            _propTypes2['default'].element,
            _propTypes2['default'].oneOf([false])
        ]),
        customCrossIcon: _propTypes2['default'].oneOfType([
            _propTypes2['default'].element,
            _propTypes2['default'].oneOf([false])
        ]),
        customOnKeyDown: _propTypes2['default'].func,
        disableCloseOnEsc: _propTypes2['default'].bool,
        dragToggleDistance: _propTypes2['default'].number,
        height: _propTypes2['default'].oneOfType([
            _propTypes2['default'].number,
            _propTypes2['default'].string
        ]),
        id: _propTypes2['default'].string,
        isOpen: _propTypes2['default'].bool,
        noOverlay: _propTypes2['default'].bool,
        onStateChange: _propTypes2['default'].func,
        outerContainerId: styles && styles.outerContainer ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
        pageWrapId: styles && styles.pageWrap ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
        position: _propTypes2['default'].oneOf([
            'right',
            'left',
            'bottom',
            'top'
        ]),
        styles: _propTypes2['default'].object,
        touchHandleWidth: _propTypes2['default'].number,
        width: _propTypes2['default'].oneOfType([
            _propTypes2['default'].number,
            _propTypes2['default'].string
        ])
    };
    Menu.defaultProps = {
        breakpoint: 960,
        disableCloseOnEsc: false,
        dragToggleDistance: 30,
        height: 350,
        id: '',
        noOverlay: false,
        onStateChange: function onStateChange() {
        },
        outerContainerId: '',
        pageWrapId: '',
        position: 'left',
        styles: {},
        touchHandleWidth: 100,
        width: 300
    };
    return Menu;
};
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./BurgerIcon":8,"./CrossIcon":10,"./baseStyles":11,"prop-types":6}],13:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _snapsvgImporter = require('../snapsvgImporter');
var _snapsvgImporter2 = _interopRequireDefault(_snapsvgImporter);
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        svg: {
            lib: _snapsvgImporter2['default'],
            pathInitial: 'M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z',
            pathOpen: 'M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z',
            animate: function animate(path) {
                var pos = 0;
                var steps = this.pathOpen.split(';');
                var stepsTotal = steps.length;
                var mina = window.mina;
                var nextStep = function nextStep() {
                    if (pos > stepsTotal - 1)
                        return;
                    path.animate({ path: steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function () {
                        nextStep();
                    });
                    pos++;
                };
                nextStep();
            }
        },
        morphShape: function morphShape(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    right: 'inherit',
                    left: 0,
                    MozTransform: 'rotateY(180deg)',
                    MsTransform: 'rotateY(180deg)',
                    OTransform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                    transform: 'rotateY(180deg)'
                };
            case 'left':
                return {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    right: 0,
                    left: 0,
                    MozTransform: 'rotateY(0deg)',
                    MsTransform: 'rotateY(0deg)',
                    OTransform: 'rotateY(0deg)',
                    WebkitTransform: 'rotateY(0deg)',
                    transform: 'rotateY(0deg)'
                };
            case 'bottom':
            case 'top':
                return {
                    position: 'fixed',
                    width: '100%',
                    height: 'calc(' + height + ' - 120px)',
                    right: 'inherit',
                    left: 'inherit',
                    MozTransform: 'rotateY(90deg)',
                    MsTransform: 'rotateY(90deg)',
                    OTransform: 'rotateY(90deg)',
                    WebkitTransform: 'rotateY(90deg)',
                    transform: 'rotateY(90deg)'
                };
            }
        },
        menuWrap: function menuWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            }
        },
        menu: function menu(isOpen, width, height, position) {
            width -= 140;
            switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            case 'left':
                return {
                    position: 'fixed',
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            case 'bottom':
            case 'top':
                return;
            }
        },
        item: function item(isOpen, width, height, position) {
            width -= 140;
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            case 'bottom':
            case 'top':
                return {
                    transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            }
        },
        closeButton: function closeButton(isOpen, width, height, position) {
            width -= 140;
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
            }
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12,"../snapsvgImporter":23}],14:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _snapsvgImporter = require('../snapsvgImporter');
var _snapsvgImporter2 = _interopRequireDefault(_snapsvgImporter);
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        svg: {
            lib: _snapsvgImporter2['default'],
            pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
            pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
            animate: function animate(path) {
                path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
            }
        },
        morphShape: function morphShape(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    width: 120,
                    height: '100%',
                    right: 'inherit',
                    left: 0,
                    MozTransform: 'rotateY(180deg)',
                    MsTransform: 'rotateY(180deg)',
                    OTransform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                    transform: 'rotateY(180deg)'
                };
            case 'left':
                return {
                    position: 'fixed',
                    width: 120,
                    height: '100%',
                    right: 0,
                    left: 'inherit',
                    MozTransform: '',
                    MsTransform: '',
                    OTransform: '',
                    WebkitTransform: '',
                    transform: ''
                };
            case 'bottom':
            case 'top':
                return {
                    position: 'fixed',
                    width: '100%',
                    height: 'calc(' + height + ' - 120px)',
                    right: 'inherit',
                    left: 'inherit',
                    MozTransform: 'rotateY(90deg)',
                    MsTransform: 'rotateY(90deg)',
                    OTransform: 'rotateY(90deg)',
                    WebkitTransform: 'rotateY(90deg)',
                    transform: 'rotateY(90deg)'
                };
            }
        },
        menuWrap: function menuWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    transition: 'all 0.3s'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transition: 'all 0.3s'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            }
        },
        menu: function menu(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    right: 0,
                    width: 'calc(100% - 120px)',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                };
            case 'left':
                return {
                    position: 'fixed',
                    right: 'inherit',
                    width: 'calc(100% - 120px)',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                };
            case 'bottom':
                return {
                    position: 'fixed',
                    right: 'inherit',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                };
            }
        },
        itemList: function itemList(isOpen, width, height, position) {
            if (position === 'right') {
                return {
                    position: 'relative',
                    left: '-110px',
                    width: '170%',
                    overflow: 'auto'
                };
            }
        },
        pageWrap: function pageWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    transform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
                };
            default:
                return;
            }
        },
        outerContainer: function outerContainer(isOpen) {
            return { overflow: isOpen ? '' : 'hidden' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12,"../snapsvgImporter":23}],15:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        menuWrap: function menuWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    transform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    transition: 'all 0.5s ease-in-out'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    transform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    transition: 'all 0.5s ease-in-out'
                };
            }
        },
        pageWrap: function pageWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: 'all 0.5s'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: 'all 0.5s'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    transition: 'all 0.5s'
                };
            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: 'all 0.5s'
                };
            }
        },
        outerContainer: function outerContainer(isOpen) {
            return {
                perspective: '1500px',
                perspectiveOrigin: '0% 50%',
                overflow: isOpen ? '' : 'hidden'
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],16:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: 'all 0.5s'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: 'all 0.5s'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    transition: 'all 0.5s'
                };
            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: 'all 0.5s'
                };
            }
        },
        itemList: function itemList(isOpen, width, height, position) {
            return { overflow: 'hidden' };
        },
        outerContainer: function outerContainer(isOpen) {
            return { overflow: isOpen ? '' : 'hidden' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],17:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0) rotateY(15deg)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0) rotateY(15deg)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0) rotateY(15deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0) rotateY(15deg)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0) rotateY(15deg)',
                    transformOrigin: '100% 50%',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0) rotateY(-15deg)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0) rotateY(-15deg)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0) rotateY(-15deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0) rotateY(-15deg)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0) rotateY(-15deg)',
                    transformOrigin: '0% 50%',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    OTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    transform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    transition: 'all 0.5s'
                };
            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    transition: 'all 0.5s'
                };
            }
        },
        outerContainer: function outerContainer(isOpen) {
            return {
                perspective: '1500px',
                overflow: isOpen ? '' : 'hidden'
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],18:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width) {
            return {
                MozTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
                MsTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
                OTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
                WebkitTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
                transform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
                transformOrigin: '100%',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s'
            };
        },
        outerContainer: function outerContainer() {
            return { perspective: '1500px' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],19:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    MsTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    OTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    transform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s',
                    overflow: isOpen ? '' : 'hidden'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    MsTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    OTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    transform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s',
                    overflow: isOpen ? '' : 'hidden'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    OTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    transform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    transition: 'all 0.5s'
                };
            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    transition: 'all 0.5s'
                };
            }
        },
        outerContainer: function outerContainer(isOpen) {
            return {
                perspective: '1500px',
                overflow: isOpen ? '' : 'hidden'
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],20:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {};
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],21:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, height, position, breakpoint) {
            if (window.innerWidth < breakpoint) {
                switch (position) {
                case 'right':
                    return {
                        MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                        MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                        OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                        WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                        transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                        transition: 'transform 0.5s'
                    };
                default:
                    return {
                        MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                        MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                        OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                        WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                        transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                        transition: 'transform 0.5s'
                    };
                }
            }
            switch (position) {
            case 'bottom':
            case 'top':
                return { width: '100%' };
            default:
                return {
                    width: isOpen ? '100%' : 'calc(100% - ' + width + ')',
                    position: 'absolute',
                    right: position === 'right' ? 'initial' : '0',
                    left: position === 'right' ? '0' : 'initial',
                    top: '0',
                    transition: 'width 0.5s'
                };
            }
        },
        outerContainer: function outerContainer(isOpen) {
            return { overflow: isOpen ? '' : 'hidden' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],22:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        menuWrap: function menuWrap(isOpen, width, height, position) {
            switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            }
        },
        item: function item(isOpen, width, height, position, breakpoint, nthChild, children) {
            switch (position) {
            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            default:
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
                };
            }
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":12}],23:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports['default'] = function () {
    var Snap = undefined;
    try {
        Snap = typeof window !== 'undefined' ? window['Snap'] : typeof global !== 'undefined' ? global['Snap'] : null;
    } finally {
        return Snap;
    }
};
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[9])(9)
});