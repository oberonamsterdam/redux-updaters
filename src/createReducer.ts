import setValue from 'set-value';
import getValue from 'get-value';
import { Action, ACTION_PREFIX, actionName, pathName } from './createAction';
import { Reducer } from 'redux';
import { ACTION_TYPE_RESET } from './updaters/reset';

// Replace all objects along a path with clones, so they can be modified. To be used before mutation on an object to
// avoid mutating anything in the state.
const cloneObjects = (curObj: any, pathParts: string[], curIndex: number) => {
    const nextProp = pathParts[curIndex];
    if (!nextProp) {
        return curObj;
    }
    const nextVal = curObj[nextProp];
    if (typeof nextVal === 'object') {
        curObj[nextProp] = {
            ...(cloneObjects(nextVal, pathParts, curIndex + 1)),
        };
    }

    return curObj;
};

/**
 * Get the reducer. You will need to add this to your store.
 * @param {object} defaultState
 * @returns {(state: object, action: Action) => object}
 * @example
 * const reducer = createReducer(defaultState, 'app');
 * const rootReducer = combineReducers({app: reducer});
 */
export default <T extends object>(defaultState: T, rootPath?: string): Reducer<T, Action> => {
    const pathPrefix = rootPath ? rootPath + '.' : '';
    const formatPath = (path: string): string => pathPrefix && path.substr(0, pathPrefix.length) === pathPrefix ? path.substr(pathPrefix.length) : path;

    return (state: object = defaultState, action: Action): any => {
        if (state && action.type.substr(0, ACTION_PREFIX.length) === ACTION_PREFIX) {
            const path = formatPath(action.meta ? action.meta.path : '');
            const parts = path.split('.');
            const newState = { ...state };
            // make sure objects don't get mutated by cloning them
            if (parts.length > 1) {
                cloneObjects(newState, parts, 0);
            }

            if (action.type === actionName(ACTION_TYPE_RESET, pathName(action.meta ? action.meta.path : ''))) {
                return setValue(newState, path, getValue(defaultState, path));
            } else {
                return setValue(newState, path, action.payload);
            }

        }

        return state;
    };
};
