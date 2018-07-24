import createAction from '../createAction';
import arrayRemove from './arrayRemove';

test('arrayDelete updater should dispatch payload with an removed array value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    arrayRemove('myArr', 0)(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REMOVE_VALUE', 'myArr', []));
        }),
        () => ({ myArr: ['a'] })
    );

    arrayRemove('myArr', 2)(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REMOVE_VALUE', 'myArr', ['a', 'b']));
        }),
        () => ({ myArr: ['a', 'b', 'c'] })
    );

    arrayRemove('myArr', (val: { id: '1', letter: 'a'}) => val.id === '1')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REMOVE_OBJECT', 'myArr', []));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }] })
    );

    arrayRemove('myArr', (val: { id: '2', letter: 'b'}) => val.id === '2')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REMOVE_OBJECT', 'myArr', [{ id: '1', letter: 'a' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }, { id: '2', letter: 'b' }] })
    );

    arrayRemove('myArr', (val: { id: '2', letter: 'b'}) => val.id === '2')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REMOVE_OBJECT', 'myArr', [{ id: '1', letter: 'a' }, { id: '3', letter: 'b' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }, { id: '2', letter: 'b' }, { id: '3', letter: 'b' }] })
    );
});