var BROWSER_DEFAULT_FONT_SIZE = 16;
var pixelsToEm = function pixelsToEm(inPx) {
  return parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE + "em";
};

var getNextBreakName = function getNextBreakName(breakpointValue, breakpoints) {
  var namesOfBreakpoins = Object.keys(breakpoints);
  var penultimateBreakName = namesOfBreakpoins[namesOfBreakpoins.length - 2];
  var currentPosition = namesOfBreakpoins.indexOf(breakpointValue);

  try {
    if (currentPosition < namesOfBreakpoins.length - 1) {
      var nextBreak = currentPosition + 1;
      return namesOfBreakpoins["" + nextBreak];
    }

    throw new Error("\"styled-breakpoints: " + breakpointValue + "\" is incorrect value. Use " + penultimateBreakName + ".");
  } catch (err) {
    console.warn(err);
  }
};

var getNextBreakValue = function getNextBreakValue(breakpointValue, breakpoints) {
  if (breakpoints === void 0) {
    breakpoints = {};
  }

  var result = null;

  try {
    var breakName = getNextBreakName(breakpointValue, breakpoints);

    if (breakpoints[breakpointValue]) {
      result = parseFloat(breakpoints[breakName]) - 0.02 + "px";
    } else if (parseInt(breakpointValue, 10)) {
      result = "" + (Number(breakpointValue) - 0.02);
    } else {
      throw new Error("styled-breakpoints: " + breakpointValue + " no valid breakpoint or size specified for media.");
    }
  } catch (err) {
    console.warn(err);
  }

  return result;
};
var getBreakValue = function getBreakValue(breakpointValue, breakpoints) {
  if (breakpoints === void 0) {
    breakpoints = {};
  }

  var result = null;

  try {
    if (breakpoints[breakpointValue]) {
      result = breakpoints[breakpointValue];
    } else if (parseInt(breakpointValue, 10)) {
      result = breakpointValue;
    } else {
      throw new Error('styled-breakpoints: No valid breakpoint or size specified for media.');
    }
  } catch (err) {
    console.warn(err);
  }

  return result;
};

/**
 * Default media breakpoints
 * @type {Object}
 */

var defaultBreakpoints = {
  tablet: '768px',
  desktop: '992px',
  lgDesktop: '1200px'
};

var createAbove = function createAbove(breakpointsMap) {
  return function (breakpointKey) {
    var ems = pixelsToEm(getBreakValue(breakpointKey, breakpointsMap));
    return "@media screen and (min-width: " + ems + ")";
  };
};

var createBelow = function createBelow(breakpointsMap) {
  return function (breakpointKey) {
    var ems = pixelsToEm(getBreakValue(breakpointKey, breakpointsMap));
    return "@media screen and (max-width: " + ems + ")";
  };
};

var createBetween = function createBetween(breakpointsMap) {
  return function (fromBp, toBp) {
    var minEms = pixelsToEm(getBreakValue(fromBp, breakpointsMap));
    var maxEms = pixelsToEm(getNextBreakValue(toBp, breakpointsMap));
    return "@media screen and (min-width: " + minEms + ") and (max-width: " + maxEms + ")";
  };
};

var createOnly = function createOnly(breakpointsMap) {
  return function (breakpointKey) {
    var minEms = pixelsToEm(getBreakValue(breakpointKey, breakpointsMap));
    var maxEms = pixelsToEm(getNextBreakValue(breakpointKey, breakpointsMap));
    return "@media screen and (min-width: " + minEms + ") and (max-width: " + maxEms + ")";
  };
};
/**
 * Media query generator
 * @param {Object} breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */


var createBreakpoints = function createBreakpoints(breakpoints) {
  if (breakpoints === void 0) {
    breakpoints = defaultBreakpoints;
  }

  var above = createAbove(breakpoints);
  var below = createBelow(breakpoints);
  var between = createBetween(breakpoints);
  var only = createOnly(breakpoints);
  return {
    above: above,
    below: below,
    between: between,
    only: only
  };
};
/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */

var _createBreakpoints = createBreakpoints(),
    above = _createBreakpoints.above,
    below = _createBreakpoints.below,
    between = _createBreakpoints.between,
    only = _createBreakpoints.only;

export { defaultBreakpoints, createBreakpoints, above, below, between, only };
