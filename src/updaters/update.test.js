import { ACTION_PREFIX } from '../createReducer';
import update from './update';

test('update updater should dispatch an update action with given value', () => {
    const getDispatch = expectFn => action => {
        expectFn(action);
    };

    update('abc', 'myProp')(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'UPDATE',
            meta: {path: 'myProp'},
            payload: 'abc',
        });
    }));

    update(state => state.myNumber + 1, 'myNumber')(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'UPDATE',
            meta: {path: 'myNumber'},
            payload: 2
        });
    }), () => ({myNumber: 1}));
});