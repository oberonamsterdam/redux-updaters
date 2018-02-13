// @flow

import dotProp from 'dot-prop';
import type { StatePath } from '../createAction';
import createAction, { pathName } from '../createAction';

export const updater = (
    action: string,
    statePath: StatePath,
    updateVal: (curValue: any) => any,
    assertCurValue?: (value: any) => boolean,
    assertionFailMessage?: string,
) => (dispatch: Function, getState: Function) => {
    const curVal = dotProp.get(getState(), pathName(statePath));

    if (assertCurValue && !assertCurValue(curVal)) {
        if (assertionFailMessage && process.env.development) {
            console.warn(assertionFailMessage);
        }
    } else {
        dispatch(createAction(action, statePath, updateVal(curVal)));
    }
};

export default updater;