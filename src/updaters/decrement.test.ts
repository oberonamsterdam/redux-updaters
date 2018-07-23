import createAction from '../createAction';
import decrement from './decrement';

test('decrementer updater should dispatch an decrement action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    decrement('myNumb')(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', 0));
        }),
        () => ({ myNumb: 1 })
    );
});