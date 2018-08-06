import { pathName, StatePath } from '../createAction';
import updater from './updater';

// @ts-ignore
const not = fn => (...args) => !fn(...args);

export type ArrayTestFn = (arrayValue: any, index: number) => boolean;

/**
 * Remove an entry from an array. When a number is given, removes the entry at that index. When a function is given,
 * removes items for which the function returns true.
 * @example
 * dispatch(arrayRemove('app.todos', todoIndex));
 * dispatch(arrayRemove('app.todos', (todoItem, index) => todoItem.id === todoId));
 */
export default (statePath: StatePath, indexOrFn: number | ArrayTestFn) => {
    const updateValue = typeof indexOrFn === 'function'
        ? (curArr: any[]) => curArr.filter(not(indexOrFn))
        : (curArr: any[]) => curArr.slice(0, indexOrFn).concat(curArr.slice(indexOrFn + 1));

    return updater(
        'ARRAY_REMOVE',
        statePath,
        updateValue,
        Array.isArray,
        `arrayDelete: ${pathName(statePath)} is not an array`
    );
};
