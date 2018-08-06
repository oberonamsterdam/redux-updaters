import createAction from '../createAction';
import decrement from './decrement';

test('decrementer updater should dispatch an decrement action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    // decrement by one
    decrement('myNumb')(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', 0));
        }),
        () => ({ myNumb: 1 })
    );

    // decrement by one, staying above the min
    decrement('myNumb', undefined, 0)(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', 1));
        }),
        () => ({ myNumb: 2 })
    );

    // decrement by one, but already at min
    decrement('myNumb', undefined, 2)(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', 2));
        }),
        () => ({ myNumb: 2 })
    );

    // val - by > min
    decrement('myNumb', 4, 1)(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', 1));
        }),
        () => ({ myNumb: 5 })
    );

    // val - by < min
    decrement('myNumb', 10, 1)(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', 1));
        }),
        () => ({ myNumb: 5 })
    );

    // use by and no min
    decrement('myNumb', 10)(
        getDispatch(action => {
            expect(action).toEqual(createAction('DECREMENT', 'myNumb', -9));
        }),
        () => ({ myNumb: 1 })
    );
});