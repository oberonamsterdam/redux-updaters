// @flow

import dotProp from 'dot-prop';
import createAction from '../createAction';

export const updater = (
    action: string,
    stateKey: string,
    updateVal: (curValue: any) => any,
    assertCurValue?: (value: any) => boolean,
    assertionFailMessage?: string,
) => (dispatch: Function, getState: Function) => {
    const curVal = dotProp.get(getState(), stateKey);

    if (assertCurValue && !assertCurValue(curVal)) {
        if (assertionFailMessage && process.env.development) {
            console.warn(assertionFailMessage);
        }
    } else {
        dispatch(createAction(action, stateKey, updateVal(curVal)));
    }
};

export default updater;