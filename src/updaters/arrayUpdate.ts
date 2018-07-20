import { pathName, StatePath } from '../createAction';
import updater from './updater';

/**
 * Update object or value from an array.
 * @example with Value
 * dispatch(arrayUpdate('app.todos', 'todo updated', 1);
 *  @example with Object ('app.todos', 'todo updated', 'id')
 */

const updateValueFromArray = (statePath: StatePath, value: any, key: any) =>
    updater(
        'ARRAY_UPDATE_VALUE',
        statePath,
        curArr => Object.assign([...curArr], { [key]: value }),
        Array.isArray,
        `arrayUpdate: ${pathName(statePath)} is not an array`
    );

const updateObjectFromArray = (statePath: StatePath, value: any, key: any) =>
    updater(
        'ARRAY_UPDATE_OBJECT',
        statePath,
        curArr => curArr.map((obj: any) => obj.hasOwnProperty(key) && obj[key] === value[key] ? value : obj),
        Array.isArray,
        `arrayUpdate: ${pathName(statePath)} is not an array`
    );

export default (statePath: StatePath, value: any, key: any) =>
    typeof value === 'object'
        ? updateObjectFromArray(statePath, value, key)
        : updateValueFromArray(statePath, value, key);