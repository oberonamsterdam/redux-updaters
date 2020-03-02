import { StatePath } from '../createAction';
import updater from './updater';

/**
 * Toggle a boolean value
 * @example
 * dispatch(toggle('app.menuIsOpen'))
 */

export const ACTION_TYPE_RESET = 'RESET';

export default (statePath: StatePath) =>
    updater(
        ACTION_TYPE_RESET,
        statePath,
        () => '',
    );