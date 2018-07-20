import { pathName, StatePath } from '../createAction';
import updater from './updater';

/**
 * Delete something from an array.
 * @example
 * dispatch(arrayDelete('app.todos', 'todo deleted', 'id');
 */
const removeValueFromArray = (statePath: StatePath, value: any) =>
    updater(
        'ARRAY_DELETE_VALUE',
        statePath,
        curArr => curArr.filter((element: any) => element !== value),
        Array.isArray,
        `arrayDelete: ${pathName(statePath)} is not an array`
    );

const removeObjectFromArray = (statePath: StatePath, value: any, key: any) =>
    updater(
        'ARRAY_DELETE_OBJECT',
        statePath,
        curArr => curArr.filter((obj: any) => obj.hasOwnProperty(key) && obj[key] !== value[key]),
        Array.isArray,
        `arrayDelete: ${pathName(statePath)} is not an array`
);

export default (statePath: StatePath, value: any, key: any) =>
    typeof value === 'object'
        ? removeObjectFromArray(statePath, value, key)
        : removeValueFromArray(statePath, value);