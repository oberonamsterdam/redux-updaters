import dotProp from 'dot-prop';
import { default as createAction, StatePath, pathName } from '../createAction';

export const updater = (
    action: string,
    statePath: StatePath,
    updateVal: (curValue: any) => any,
    assertCurValue?: (value: any) => boolean,
    assertionFailMessage?: string
) => (dispatch: (...args: any[]) => void, getState: () => object) => {
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