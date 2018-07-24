import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { ArrayTestFn } from './arrayRemove';

/**
 * Replace a value in an array, by given index or by filter function (replaces all values for which the given function
 * returns true).
 * @example
 * dispatch(arrayReplace('app.todos', todoIndex, myTodo));
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
