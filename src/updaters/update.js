// @flow

import { ACTION_PREFIX } from '../createReducer';

export default (value: any, stateKey: string) => (dispatch: Function, getState: Function) => {
    const payload = typeof value === 'function' ? value(getState()) : value;

    dispatch({
        type: ACTION_PREFIX + 'UPDATE',
        meta: {
            path: stateKey,
        },
        payload,
    });
};