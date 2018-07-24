import createAction from '../createAction';
import arrayReplace from './arrayReplace';

test('arrayUpdate updater should dispatch payload with an update array value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    arrayReplace('myArr', 0, 'b')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REPLACE_VALUE', 'myArr', ['b']));
        }),
        () => ({ myArr: ['a'] })
    );

    arrayReplace('myArr', 1, 'c')(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REPLACE_VALUE', 'myArr', ['a', 'c']));
        }),
        () => ({ myArr: ['a', 'b'] })
    );

    arrayReplace('myArr', (val: { id: '1', letter: 'a'}) => val.id === '1', { id: '1', letter: 'c' })(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REPLACE_OBJECT', 'myArr', [ { id: '1', letter: 'c' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }] })
    );

    arrayReplace('myArr', (val: { id: '2', letter: 'b'}) => val.id === '2', { id: '2', letter: 'd' })(
        getDispatch(action => {
            expect(action).toEqual(createAction('ARRAY_REPLACE_OBJECT', 'myArr', [{ id: '1', letter: 'a' }, { id: '2', letter: 'd' }]));
        }),
        () => ({ myArr: [{ id: '1', letter: 'a' }, { id: '2', letter: 'b' }] })
    );
});