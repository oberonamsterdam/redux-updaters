"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var isObject = function (value) { return !Array.isArray(value) && typeof value === 'object' && value !== null; };
var getPath = function (startPath, key) { return (startPath ? startPath + '.' : '') + key; };
var createNode = function (path) { return ({ __path: path }); };
/**
 * Create a paths object that contains all the paths to your state properties. This is useful when using flow, because
 * it adds type checking to the paths given to updaters.
 * @param {Object} defaultState D
 * @param rootPath Same path as given to createReducer
 * @example
 * const paths = createStatePath(defaultState, 'app')
 * dispatch(update(paths.currentIndex, 3)) // this will result in a flow error if currentIndex is not in your defaultState.
 */
var createStatePaths = function (defaultState, rootPath) {
    if (rootPath === void 0) { rootPath = ''; }
    return Object.keys(defaultState).reduce(function (res, key) {
        var val = defaultState[key];
        var path = getPath(rootPath, key);
        return __assign({}, res, (_a = {}, _a[key] = isObject(val) ? createStatePaths(val, path) : createNode(path), _a));
        var _a;
    }, createNode(rootPath));
};
exports["default"] = createStatePaths;
