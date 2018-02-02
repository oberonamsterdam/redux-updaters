import { ACTION_PREFIX } from '../createReducer';
import arrayAdd from './arrayAdd';

test('arrayAdd updater should dispatch payload with an added array value', () => {
    const getDispatch = expectFn => action => {
        expectFn(action);
    };

    arrayAdd('a', 'myArr')(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'ARRAY_ADD',
            meta: {path: 'myArr'},
            payload: ['a'],
        });
    }), () => ({
        myArr: [],
    }));

    arrayAdd('b', 'myArr')(getDispatch(action => {
        expect(action).toEqual({
            type: ACTION_PREFIX + 'ARRAY_ADD',
            meta: {path: 'myArr'},
            payload: ['a', 'b'],
        });
    }), () => ({
        myArr: ['a'],
    }));
});