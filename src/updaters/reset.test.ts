import createAction from '../createAction';
import reset from './reset';

test('reset updater should dispatch an reset action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    reset('myProp')(
        getDispatch(action => {
            expect(action).toEqual(createAction('RESET', 'myProp', ''));
        }),
        () => ({ myProp: '' })
    );

    reset('myNumber')(
        getDispatch(action => {
            expect(action).toEqual(createAction('RESET', 'myNumber', ''));
        }),
        () => ({ myNumber: '' })
    );
});