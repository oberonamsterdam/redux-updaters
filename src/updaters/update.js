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

/**
 * @example
 * dispatch(update('app.currentIndex', 3))
 * @example
 * dispatch(update('app.currentIndex', state => state.app.pages.length - 1))
 */
export default (stateKey: string, value: string | Object => any) =>
    typeof value === 'function'
        ? functionUpdater(stateKey, value)
        : valueUpdater(stateKey, value);
