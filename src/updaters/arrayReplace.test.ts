import createAction from '../createAction';
import arrayReplace from './arrayReplace';

test('arrayUpdate updater should dispatch payload with an update array value', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };

    const testState = { myArr: [1, 2, 3, 4, 5] };

    const replaceExpect = (indexOrFn: any, value: any, expectedOutputValue: any) => {
        arrayReplace('myArr', indexOrFn, value)(
            getDispatch(action => {
                expect(action).toEqual(createAction('ARRAY_REPLACE', 'myArr', expectedOutputValue));
            }),
            () => (testState)
        );
    };

    replaceExpect(0, 0, [0, 2, 3, 4, 5]);
    replaceExpect(1, 0, [1, 0, 3, 4, 5]);
    replaceExpect(5, 0, [1, 2, 3, 4, 5]);
    replaceExpect(() => false, 0, [1, 2, 3, 4, 5]);
    replaceExpect(() => true, 0, [0, 0, 0, 0, 0]);
    replaceExpect((val: number) => val > 2, 0, [1, 2, 0, 0, 0]);
    replaceExpect((val: number, index: number) => index > 2, 0, [1, 2, 3, 0, 0]);
});