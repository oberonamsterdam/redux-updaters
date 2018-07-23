import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isNumber } from '../services/typeService';

/**
 * Increment a number value
 * @example
 * dispatch(increment(app.currentPage, 5, app.lastPage))
 */
export default (statePath: StatePath, by?: number, max?: number) => (
    updater(
        'INCREMENT',
        statePath,
        val => val = (getNewVal(val, by, max)),
        isNumber,
        `Toggle: ${pathName(statePath)} is not a number`
    )
);

const getNewVal = (val: any, by: number = 1, max: number = +Infinity) => {
    return Math.min(max, val + by);

};
