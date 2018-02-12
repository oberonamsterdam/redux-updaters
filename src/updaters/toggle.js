// @flow

import updater from './updater';
import typeOfIs from 'typeof-is';

/**
 * Toggle a boolean value
 * @example
 * dispatch(toggle('app.menuIsOpen'))
 */
export default (stateKey: string) =>
    updater(
        'TOGGLE',
        stateKey,
        val => !val,
        typeOfIs.boolean,
        `Toggle: ${stateKey} is not a boolean`
    );
