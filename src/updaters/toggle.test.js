import { ACTION_PREFIX } from '../createReducer';
import toggle from './toggle';

test('toggle updater should dispatch a toggle action', () => {
    const getDispatch = expectFn => action => {
        expectFn(action);
    };

    toggle('myBool')(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'TOGGLE',
            meta: {path: 'myBool'},
            payload: true,
        });
    }), () => ({
        myBool: false,
    }));

    toggle('myBool')(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'TOGGLE',
            meta: {path: 'myBool'},
            payload: false,
        });
    }), () => ({
        myBool: true,
    }));

});