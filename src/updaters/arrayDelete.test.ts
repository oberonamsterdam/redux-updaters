import createAction from '../createAction';
import arrayDelete from './arrayDelete';

test('arrayDelete updater should dispatch payload with an deleted array value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    arrayDelete('myArr', 'a', null)(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_DELETE_VALUE', 'myArr', []));
        }),
        () => ({ myArr: ['a'] })
    );

    arrayDelete('myArr', 'b', null)(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_DELETE_VALUE', 'myArr', ['a']));
        }),
        () => ({ myArr: ['a', 'b'] })
    );

    arrayDelete('myArr', { id: '1', letter: 'a' }, 'id')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_DELETE_OBJECT', 'myArr', []));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }] })
    );

    arrayDelete('myArr', { id: '2', letter: 'b' }, 'id')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_DELETE_OBJECT', 'myArr', [{ id: '1', letter: 'a' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }, { id: '2', letter: 'b' }] })
    );
});