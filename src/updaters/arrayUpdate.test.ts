import createAction from '../createAction';
import arrayUpdate from './arrayUpdate';

test('arrayUpdate updater should dispatch payload with an update array value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    arrayUpdate('myArr', 'b', 0)(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_UPDATE_VALUE', 'myArr', ['b']));
        }),
        () => ({ myArr: ['a'] })
    );

    arrayUpdate('myArr', 'c', 1)(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_UPDATE_VALUE', 'myArr', ['a', 'c']));
        }),
        () => ({ myArr: ['a', 'b'] })
    );

    arrayUpdate('myArr', { id: '1', letter: 'c' }, 'id')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_UPDATE_OBJECT', 'myArr', [ { id: '1', letter: 'c' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }] })
    );

    arrayUpdate('myArr', { id: '2', letter: 'd' }, 'id')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_UPDATE_OBJECT', 'myArr', [{ id: '1', letter: 'a' }, { id: '2', letter: 'd' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }, { id: '2', letter: 'b' }] })
    );
});