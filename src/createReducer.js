// @flow

import dotProp from 'dot-prop';

export const ACTION_PREFIX = '_';

type Action = {
    type: string,
    payload: any,
    meta: {
        path: string,
    }
}

/**
 * Get the reducer. You will need to add this to your store.
 * @param defaultState
 * @param rootPath The path from the root of your state to where you will use this reducer. Use empty string if you will use
 * this reducer as the root reducer.
 * @example
 * const reducer = createReducer(defaultState, 'app');
 * const rootReducer = combineReducers({app: reducer});
 */
export default (defaultState: Object, rootPath: string): Function => {
    const pathPrefix = rootPath ? rootPath + '.' : '';
    const formatPath = (path: string): string =>
        pathPrefix && path.substr(0, pathPrefix.length) === pathPrefix ? path.substr(pathPrefix.length) : path;

    return (state: Object = defaultState, action: Action) => {
        if (action.type.substr(0, ACTION_PREFIX.length) === ACTION_PREFIX) {
            const newState = {
                ...state
            };

            return dotProp.set(newState, formatPath(action.meta.path), action.payload);
        }

        return state;
    };
};
