import { pathName, StatePath } from '../createAction';
import updater from './updater';

/**
 * Update object or value from an array. Give index of value to replace the given index.
 * @example with Value
 * dispatch(arrayUpdate('app.todos', 'todo updated', 1);
 *  @example with Object ('app.todos', 'todo updated', 'id')
 */

const updateValueFromArray = (statePath: StatePath, index: number, newValue: any) =>
    updater(
        'ARRAY_REPLACE_VALUE',
        statePath,
        curArr => Object.assign([...curArr], { [index]: newValue }),
        Array.isArray,
        `arrayUpdate: ${pathName(statePath)} is not an array`
    );

const updateObjectFromArray = (statePath: StatePath, predicate: (statePath: StatePath) => void, newValue: any) =>
    updater(
        'ARRAY_REPLACE_OBJECT',
        statePath,
        curArr => replaceObjectInArray(curArr, predicate, newValue),
        Array.isArray,
        `arrayUpdate: ${pathName(statePath)} is not an array`
    );

function replaceObjectInArray(array: any, predicate: any, newValue: any) {
    return array.map((val: any) => predicate(val) ? newValue : val);
}

export default (statePath: StatePath, value: any, newValue: any) =>
    typeof value === 'function'
        ? updateObjectFromArray(statePath, value, newValue)
        : updateValueFromArray(statePath, value, newValue);
