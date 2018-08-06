import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isObject } from '../services/typeService';

/**
 * Increment a number value
 * @example
 * dispatch(increment(app.counter))
 */
export default (statePath: StatePath, objectToMerge: any) =>
    updater(
        'OBJECT_MERGE',
        statePath,
        val => deepMerge(val, objectToMerge),
        isObject,
        `Toggle: ${pathName(statePath)} is not an object`
    );

function deepMerge(orig: any, object: any) {
    const result: any = { ...orig };
    Object.keys(object).forEach((key: any) => {
        if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
            console.log(object[key]);
            result[key] = deepMerge(orig[key], object[key]);
        } else {
            console.log(object[key]);
            result[key] = object[key];
        }
    });
    console.log(result);
    return result;
}