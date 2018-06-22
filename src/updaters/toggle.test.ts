import createAction from '../createAction';
import toggle from './toggle';

test('toggle updater should dispatch a toggle action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    toggle('myBool')(
        getDispatch(action => {
            expect(action).toEqual(createAction('TOGGLE', 'myBool', true));
        }),
        () => ({ myBool: false })
    );

    toggle('myBool')(
        getDispatch(action => {
            expect(action).toEqual(createAction('TOGGLE', 'myBool', false));
        }),
        () => ({ myBool: true })
    );
});