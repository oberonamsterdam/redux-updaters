import createAction from '../createAction';
import increment from './increment';

test('increment updater should dispatch an increment action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    // increment by one
    increment('myNumb')(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 2));
        }),
        () => ({ myNumb: 1 })
    );

    // increment by one, staying under the max
    increment('myNumb', undefined, 2)(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 2));
        }),
        () => ({ myNumb: 1 })
    );

    // increment by one, but already at max
    increment('myNumb', undefined, 2)(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 2));
        }),
        () => ({ myNumb: 2 })
    );

    // val + by < max
    increment('myNumb', 4, 5)(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 5));
        }),
        () => ({ myNumb: 1 })
    );

    // val + by > max
    increment('myNumb', 10, 5)(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 5));
        }),
        () => ({ myNumb: 1 })
    );

    // use by and no max
    increment('myNumb', 10)(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 11));
        }),
        () => ({ myNumb: 1 })
    );

});