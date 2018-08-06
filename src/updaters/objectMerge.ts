import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isObject } from '../services/typeService';

/**
 * Merge an object into another
 * @example
 * dispatch(objectMerge(statePath, data))
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
            result[key] = deepMerge(orig[key], object[key]);
        } else {
            result[key] = object[key];
        }
    });
    return result;
}