// @flow

import updater from './updater';

/**
 * Add something to the end of an array.
 * @example
 * dispatch(arrayAdd('app.todos', 'New to do');
 */
export default (stateKey: string, value: any) =>
    updater(
        'ARRAY_ADD',
        stateKey,
        curArr => [...curArr, value],
        Array.isArray,
        `arrayAdd: ${stateKey} is not an array`
    );