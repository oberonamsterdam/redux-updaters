// @flow

import createAction from '../createAction';
import updater from './updater';

const valueUpdater = (stateKey: string, value: string) =>
    updater(
        'UPDATE',
        stateKey,
        () => value,
    );

const functionUpdater = (stateKey: string, fn: Object => any) => (dispatch: Function, getState: () => Object) =>
    dispatch(createAction('UPDATE', stateKey, fn(getState())));

export default (stateKey: string, value: string | Object => any) =>
    typeof value === 'function'
        ? functionUpdater(stateKey, value)
        : valueUpdater(stateKey, value);
