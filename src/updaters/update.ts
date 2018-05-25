// @flow

import { default as createAction, StatePath } from '../createAction';
import updater from './updater';

const valueUpdater = (statePath: StatePath, value: any) =>
    updater(
        'UPDATE',
        statePath,
        () => value,
    );

const functionUpdater = (statePath: StatePath, fn: (...args: any[]) => any) =>
    (dispatch: (...args: any[]) => void, getState: () => object) =>
        dispatch(createAction('UPDATE', statePath, fn(getState())));

/**
 * @example
 * dispatch(update('app.currentIndex', 3))
 * @example
 * dispatch(update('app.currentIndex', state => state.app.pages.length - 1))
 */
export default (statePath: StatePath, value: string | object) =>
    typeof value === 'function'
        ? functionUpdater(statePath, value)
        : valueUpdater(statePath, value);
