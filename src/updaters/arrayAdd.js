// @flow

import dotProp from 'dot-prop';
import { ACTION_PREFIX } from '../createReducer';

export default (value: any, stateKey: string) => (dispatch: Function, getState: Function) => {
    const curVal = dotProp.get(getState(), stateKey);

    if (!Array.isArray(curVal)) {
        if (process.env.development) {
            console.warn(`ArrayAdd: ${stateKey} is not an array`);
        }
    } else {
        dispatch({
            type: ACTION_PREFIX + 'ARRAY_ADD',
            meta: {
                path: stateKey,
            },
            payload: [...curVal, value],
        });
    }
};