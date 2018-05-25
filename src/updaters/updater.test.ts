import updater from './updater';
import { Action, ACTION_PREFIX, StatePath } from '../createAction';

test('createUpdater should create an updater function', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: Action) => {
        expectFn(action);
    };

    const assertionFailMessage = 'abc';
    const testUpdater = (statePath: StatePath, newVal: any) => updater('TEST_ACTION', statePath, () => newVal, val => typeof val === 'number', assertionFailMessage);

    testUpdater('test.path', 2)(
        getDispatch((action: Action) => {
            expect(action).toEqual({
                type: ACTION_PREFIX + 'TEST_ACTION_TEST_PATH',
                meta: { path: 'test.path' },
                payload: 2,
            });
        }),
        () => ({ test: { path: 1 } })
    );

    const dispatch = jest.fn();
    testUpdater('test.path', 2)(dispatch, () => ({
        test: { path: '1' },
    }));
    expect(dispatch).not.toHaveBeenCalled();
});