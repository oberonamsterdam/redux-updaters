import snakeCase from 'snake-case/snake-case';
import { StatePathTree } from './createStatePaths';

export interface Action {
    type: string;
    payload?: any;
    meta?: {
        path: string;
    };
}

export const ACTION_PREFIX = '_';

/**
 *
 * @param {string} action
 * @param {string} path
 * @returns {string}
 */
export const actionName = (action: string, path: string): string => `${ACTION_PREFIX + action}_${snakeCase(path).toUpperCase()}`;

/**
 * A path representation to a property in the state.
 */
export type StatePath = string | StatePathTree<any> & any; // the "& any" is a workaround to make the StatePathTree recursive definition work

/**
 *
 * @param {StatePath} statePath
 * @returns {string}
 */
export const pathName = (statePath: StatePath): string =>
    typeof statePath === 'object' && statePath !== null && typeof statePath.__path === 'string'
        ? statePath.__path
        : typeof statePath === 'string' && statePath !== ''
            ? statePath
            : '[unknown]';

/**
 *
 * @param {string} action
 * @param {StatePath} statePath
 * @param value
 * @returns {Action}
 */
export default (action: string, statePath: StatePath, value: any): Action => {
    const path: string = pathName(statePath);
    return {
        type: actionName(action, path),
        meta: {
            path,
        },
        payload: value,
    };
};