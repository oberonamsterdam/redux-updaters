import createAction from './createAction';
import { ACTION_PREFIX } from './createReducer';

test('createAction should return an action', () => {
    expect(createAction('DO_SOMETHING_WITH', 'some.pathName', 'new value')).toEqual({
        type: ACTION_PREFIX + 'DO_SOMETHING_WITH_SOME_PATH_NAME',
        meta: {path: 'some.pathName'},
        payload: 'new value',
    });
});
