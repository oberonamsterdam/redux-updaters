// @flow

import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isBoolean } from '../services/typeService';

/**
 * Toggle a boolean value
 * @example
 * dispatch(toggle('app.menuIsOpen'))
 */
export default (statePath: StatePath) =>
    updater(
        'TOGGLE',
        statePath,
        val => !val,
        isBoolean,
        `Toggle: ${pathName(statePath)} is not a boolean`
    );
