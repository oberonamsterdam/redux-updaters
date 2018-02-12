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
