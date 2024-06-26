import { __exports as utils } from '../../../../../_virtual/utils.js';
export { __exports as default } from '../../../../../_virtual/utils.js';

utils.__esModule = true;
utils.extend = extend;
utils.indexOf = indexOf;
utils.escapeExpression = escapeExpression;
utils.isEmpty = isEmpty;
utils.createFrame = createFrame;
utils.blockParams = blockParams;
utils.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
var badChars = /[&<>"'`=]/g,
  possible = /[&<>"'`=]/;
function escapeChar(chr) {
  return escape[chr];
}
function extend(obj
/* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
}
var toString = Object.prototype.toString;
utils.toString = toString; // Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt

/* eslint-disable func-style */

var isFunction = function isFunction(value) {
  return typeof value === 'function';
}; // fallback for older versions of Chrome and Safari

/* istanbul ignore next */

if (isFunction(/x/)) {
  utils.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
utils.isFunction = isFunction;
/* eslint-enable func-style */

/* istanbul ignore next */

var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};
utils.isArray = isArray; // Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    } // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.

    string = '' + string;
  }
  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}
function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}
function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}
function blockParams(params, ids) {
  params.path = ids;
  return params;
}
function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
//# sourceMappingURL=utils.js.map
