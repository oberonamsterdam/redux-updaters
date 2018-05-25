import createAction from '../createAction';
import update from './update';

test('update updater should dispatch an update action with given value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    update('myProp', 'abc')(
        getDispatch(action => {
            expect(action).toEqual(createAction('UPDATE', 'myProp', 'abc'));
        }),
        () => ({ myProp: '' })
    );

    update('myNumber', (state: any) => state.myNumber + 1)(
        getDispatch(action => {
            expect(action).toEqual(createAction('UPDATE', 'myNumber', 2));
        }),
        () => ({ myNumber: 1 })
    );
});