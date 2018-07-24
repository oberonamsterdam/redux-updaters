import { pathName, StatePath } from '../createAction';
import updater from './updater';

/**
 * Delete something from an array.
 * @example
 * dispatch(arrayDelete('app.todos', 'todo deleted', 'id');
 */
const removeValueFromArray = (statePath: StatePath, value: any) =>
    updater(
        'ARRAY_REMOVE_VALUE',
        statePath,
        curArr => curArr.filter((element: any, index: number) => index !== value),
        Array.isArray,
        `arrayDelete: ${pathName(statePath)} is not an array`
    );

const removeObjectFromArray = (statePath: StatePath, predicate: (statePath: StatePath) => void) =>
    updater(
        'ARRAY_REMOVE_OBJECT',
        statePath,
        curArr => removeObjectInArray(curArr, predicate),
        Array.isArray,
        `arrayDelete: ${pathName(statePath)} is not an array`
);

function removeObjectInArray(array: any, predicate: any) {
    return array.filter((val: any) => predicate(val) ? null : val);
}

export default (statePath: StatePath, value: any) =>
    typeof value === 'function'
        ? removeObjectFromArray(statePath, value)
        : removeValueFromArray(statePath, value);