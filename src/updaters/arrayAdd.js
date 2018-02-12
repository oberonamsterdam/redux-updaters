// @flow

import updater from './updater';

export default (stateKey: string, value: any) =>
    updater(
        'ARRAY_ADD',
        stateKey,
        curArr => [...curArr, value],
        Array.isArray,
        `arrayAdd: ${stateKey} is not an array`
    );