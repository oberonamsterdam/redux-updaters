// @flow

import dotProp from 'dot-prop';
import { ACTION_PREFIX } from '../createReducer';

export default (stateKey: string) => (dispatch: Function, getState: Function) => {
    const curVal = dotProp.get(getState(), stateKey);

    if (typeof curVal !== 'boolean') {
        if (process.env.development) {
            console.warn(`Toggle: ${stateKey} is not a boolean`);
        }
    } else {
        dispatch({
            type: ACTION_PREFIX + 'TOGGLE',
            meta: {
                path: stateKey,
            },
            payload: !curVal,
        });
    }
};