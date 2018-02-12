import createAction from '../createAction';
import arrayAdd from './arrayAdd';

test('arrayAdd updater should dispatch payload with an added array value', () => {
    const getDispatch = expectFn => action => {
        expectFn(action);
    };

    arrayAdd('myArr', 'a')(getDispatch(action => {
        expect(action).toEqual(createAction('ARRAY_ADD', 'myArr', ['a']));
    }), () => ({
        myArr: [],
    }));

    arrayAdd('myArr', 'b')(getDispatch(action => {
        expect(action).toEqual(createAction('ARRAY_ADD', 'myArr', ['a', 'b']));
    }), () => ({
        myArr: ['a'],
    }));
});