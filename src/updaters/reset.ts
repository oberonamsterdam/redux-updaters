import { StatePath } from '../createAction';
import updater from './updater';

/**
 * Toggle a boolean value
 * @example
 * dispatch(toggle('app.menuIsOpen'))
 */
export default (statePath: StatePath) =>
    updater(
        'RESET',
        statePath,
        () => '',
    );