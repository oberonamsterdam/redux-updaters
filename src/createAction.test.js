import createAction, { pathName } from './createAction';
import { ACTION_PREFIX } from './createReducer';

test('createAction should return an action', () => {
    expect(createAction('DO_SOMETHING_WITH', 'some.pathName', 'new value')).toEqual({
        type: ACTION_PREFIX + 'DO_SOMETHING_WITH_SOME_PATH_NAME',
        meta: {path: 'some.pathName'},
        payload: 'new value',
    });
});

test('createAction.getPath should return the correct path or [unknown]', () => {
    expect(pathName('abc')).toBe('abc');
    expect(pathName('abc.def')).toBe('abc.def');
    expect(pathName({__path: 'abc'})).toBe('abc');
    expect(pathName({})).toBe('[unknown]');
    expect(pathName('')).toBe('[unknown]');
    expect(pathName(null)).toBe('[unknown]');
});