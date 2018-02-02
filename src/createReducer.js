// @flow

import dotProp from 'dot-prop';

export const ACTION_PREFIX = 'RP_';

type Action = {
    type: string,
    payload: any,
    meta: {
        path: string,
    }
}

export default (defaultState: Object): Function =>
    (state: Object = defaultState, action: Action) => {
        if (action.type.substr(0, ACTION_PREFIX.length) === ACTION_PREFIX) {
            const newState = {
                ...state
            };

            return dotProp.set(newState, action.meta.path, action.payload);
        }

        return state;
    };