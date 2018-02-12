// @flow

import updater from './updater';
import typeOfIs from 'typeof-is';

export default (stateKey: string) =>
    updater(
        'TOGGLE',
        stateKey,
        val => !val,
        typeOfIs.boolean,
        `Toggle: ${stateKey} is not a boolean`
    );
