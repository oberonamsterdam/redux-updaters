import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isNumber } from '../services/typeService';

/**
 * Increment a number value
 * @example
 * dispatch(decrement(app.currentPage, 5, app.firstPage))
 */
export default (statePath: StatePath, by?: number, min?: number) => (
    updater(
        'DECREMENT',
        statePath,
        val => val = (getNewVal(val, by, min)),
        isNumber,
        `Toggle: ${pathName(statePath)} is not a number`
    )
);

const getNewVal = (val: any, by: number = 1, min: number = -Infinity) => {
    return Math.max(min, val - by);
};
