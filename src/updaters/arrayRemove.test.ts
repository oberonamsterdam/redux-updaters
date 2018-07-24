import createAction from '../createAction';
import arrayRemove from './arrayRemove';

test('arrayDelete updater should dispatch payload with an removed array value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    const testState = { myArr: [1, 2, 3, 4, 5] };

    const removeExpect = (indexOrFn: any, expectedOutputValue: any) => {
        arrayRemove('myArr', indexOrFn)(
            getDispatch(action => {
                expect(action).toEqual(createAction('ARRAY_REMOVE', 'myArr', expectedOutputValue));
            }),
            () => (testState)
        );
    };

    removeExpect(0, [2, 3, 4, 5]);
    removeExpect(1, [1, 3, 4, 5]);
    removeExpect(5, [1, 2, 3, 4, 5]);
    removeExpect((val: number) => false, [1, 2, 3, 4, 5]);
    removeExpect((val: number) => true, []);
    removeExpect((val: number) => val > 2, [1, 2]);
    removeExpect((val: number, index: number) => index > 2, [1, 2, 3]);
});