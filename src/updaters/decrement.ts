import { pathName, StatePath } from '../createAction';
import updater from './updater';
import { isNumber } from '../services/typeService';

/**
 * Increment a number value
 * @example
 * dispatch(decrement(app.counter))
 */
export default (statePath: StatePath) =>
    updater(
        'DECREMENT',
        statePath,
        val => val - 1,
        isNumber,
        `Toggle: ${pathName(statePath)} is not a number`
    );
