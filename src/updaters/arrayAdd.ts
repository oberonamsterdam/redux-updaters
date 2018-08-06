import { pathName, StatePath } from '../createAction';
import updater from './updater';

/**
 * Add something to the end of an array.
 * @example
 * dispatch(arrayAdd('app.todos', 'New to do'));
 */
export default (statePath: StatePath, value: any) =>
    updater(
        'ARRAY_ADD',
        statePath,
        curArr => [...curArr, value],
        Array.isArray,
        `arrayAdd: ${pathName(statePath)} is not an array`
    );