import createAction from '../createAction';
import increment from './increment';

test('increment updater should dispatch an increment action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    increment('myNumb')(
        getDispatch(action => {
            expect(action).toEqual(createAction('INCREMENT', 'myNumb', 2));
        }),
        () => ({ myNumb: 1 })
    );
});