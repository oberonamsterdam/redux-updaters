// @flow

import dotProp from 'dot-prop';
import { Action, ACTION_PREFIX } from './createAction';

/**
 * Get the reducer. You will need to add this to your store.
 * @param {object} defaultState
 * @param {string} rootPath The path from the root of your state to where you will use this reducer. Use empty string if you will use this reducer as the root reducer.
 * @returns {(state: object, action: Action) => object}
 * @example
 * const reducer = createReducer(defaultState, 'app');
 * const rootReducer = combineReducers({app: reducer});
 */
export default <T extends object>(defaultState: T, rootPath?: string): (state: T, action: Action) => T => {
    const pathPrefix = rootPath ? rootPath + '.' : '';
    const formatPath = (path: string): string => pathPrefix && path.substr(0, pathPrefix.length) === pathPrefix ? path.substr(pathPrefix.length) : path;

    return (state: object = defaultState, action: Action): any => {
        if (state && action.type.substr(0, ACTION_PREFIX.length) === ACTION_PREFIX) {
            const newState = {
                ...state
            };

            return dotProp.set(newState, formatPath(action.meta ? action.meta.path : ''), action.payload);
        }

        return state;
    };
};
