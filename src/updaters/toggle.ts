// @flow

import { pathName, StatePath } from '../createAction';
import updater from './updater';
import typeOfIs from 'typeof-is';

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
        typeOfIs.boolean,
        `Toggle: ${pathName(statePath)} is not a boolean`
    );
