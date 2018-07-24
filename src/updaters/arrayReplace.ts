import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { ArrayTestFn } from './arrayRemove';

/**
 * Update object or value from an array. Give index of value to replace the given index.
 * @example with Value
 * dispatch(arrayReplace('app.todos', todoIndex, myTodo);
 * dispatch(arrayReplace('app.todos', (todoItem, index) => todoItem.id === todoId, myTodo);
 */
export default (statePath: StatePath, indexOrFn: number | ArrayTestFn, newValue: any) => {
    const updateValue = typeof indexOrFn === 'function'
        ? (curArr: any[]) => curArr.map((value, index) => indexOrFn(value, index) ? newValue : value)
        : (curArr: any[]) => curArr.map((value, index) => index === indexOrFn ? newValue : value);

    return updater(
        'ARRAY_REPLACE',
        statePath,
        updateValue,
        Array.isArray,
        `arrayDelete: ${pathName(statePath)} is not an array`
    );
};
