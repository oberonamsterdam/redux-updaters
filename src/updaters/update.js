// @flow

import type { StatePath } from '../createAction';
import createAction from '../createAction';
import updater from './updater';

const valueUpdater = (statePath: StatePath, value: string) =>
    updater(
        'UPDATE',
        statePath,
        () => value,
    );

const functionUpdater = (statePath: StatePath, fn: Object => any) => (dispatch: Function, getState: () => Object) =>
    dispatch(createAction('UPDATE', statePath, fn(getState())));

/**
 * @example
 * dispatch(update('app.currentIndex', 3))
 * @example
 * dispatch(update('app.currentIndex', state => state.app.pages.length - 1))
 */
export default (statePath: StatePath, value: string | Object => any) =>
    typeof value === 'function'
        ? functionUpdater(statePath, value)
        : valueUpdater(statePath, value);
