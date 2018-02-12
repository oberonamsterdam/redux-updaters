import { ACTION_PREFIX } from '../createReducer';
import updater from './updater';

test('createUpdater should create an updater function', () => {
    const getDispatch = expectFn => action => {
        expectFn(action);
    };

    const assertionFailMessage = 'abc';
    const testUpdater = (stateKey, newVal) => updater('TEST_ACTION', stateKey, () => newVal, val => typeof val === 'number', assertionFailMessage);

    testUpdater('test.path', 2)(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'TEST_ACTION_TEST_PATH',
            meta: {path: 'test.path'},
            payload: 2,
        });
    }), () => ({
        test: {path: 1},
    }));

    const dispatch = jest.fn();
    testUpdater('test.path', 2)(dispatch, () => ({
        test: {path: '1'},
    }));
    expect(dispatch).not.toHaveBeenCalled();
});