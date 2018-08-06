import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isObject } from '../services/typeService';

/**
 * Merge an object into another
 * @example
 * dispatch(objectMerge(statePath, data))
 */
export default (statePath: StatePath, objectToMerge: object, depthLimit?: number) =>
    updater(
        'OBJECT_MERGE',
        statePath,
        val => deepMerge(val, objectToMerge, depthLimit, 1),
        isObject,
        `Toggle: ${pathName(statePath)} is not an object`
    );

function deepMerge(orig: any, object: any, depthLimit?: number, depth?: number) {
    const result: any = { ...orig };
    let depthLimitReached = false;
    if (depth && depthLimit && depth >= depthLimit) {
        depthLimitReached = true;
    }
    Object.keys(object).forEach((key: any) => {
        if (typeof object[key] === 'object' && !Array.isArray(object[key]) && !depthLimitReached) {
            result[key] = deepMerge(orig[key], object[key], depthLimit, depth && (depth + 1));
        } else {
            result[key] = object[key];
        }
    });
    return result;
}