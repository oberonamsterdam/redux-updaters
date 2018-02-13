// @flow

import snakeCase from 'snake-case/snake-case';
import { ACTION_PREFIX } from './createReducer';
import type { StatePathTree } from './createStatePaths';

export const actionName = (action: string, path: string) =>
    ACTION_PREFIX + action + '_' + snakeCase(path).toUpperCase();

/**
 * A path representation to a property in the state.
 */
export type StatePath = string | StatePathTree<*>;

export const pathName = (statePath: StatePath): string =>
    typeof statePath === 'object' && statePath !== null && typeof statePath.__path === 'string'
        ? statePath.__path
        : typeof statePath === 'string' && statePath !== ''
            ? statePath
            : '[unknown]';

export default (action: string, statePath: StatePath, value: any) => {
    const path: string = pathName(statePath);
    return {
        type: actionName(action, path),
        meta: {
            path,
        },
        payload: value,
    };
}