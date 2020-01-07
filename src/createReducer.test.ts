import createReducer from './createReducer';
import createAction from './createAction';
const defaultState = {
    a: 'aa',
    b: '1',
    c: true,
    d: {
        e: 2,
    },
    e: [],
};

test('createReducer should create a redux reducer that updates the state on updater actions', () => {
    const reducer = createReducer(defaultState);
    const nonSupportedActionType = 'NON_SUPPORTED_ACTION';
    const supportedActionType = 'TEST';

    expect(reducer(defaultState, { type: nonSupportedActionType })).toBe(defaultState);

    expect(reducer(defaultState, createAction(supportedActionType, 'a', 'aaa')).a)
        .toBe('aaa');

    expect(reducer(defaultState, createAction(supportedActionType, 'b', '110')).b)
        .toBe('110');

    expect(reducer(defaultState, createAction(supportedActionType, 'c', false)).c)
        .toBe(false);

    expect(reducer(defaultState, createAction(supportedActionType, 'd.e', 3)).d.e)
        .toBe(3);

    expect(reducer(defaultState, createAction(supportedActionType, 'e', ['filled Array'])).e)
        .toEqual(['filled Array']);

    const deepReducer = createReducer(defaultState, 'root');
    expect(deepReducer(defaultState, createAction(supportedActionType, 'root.d.e', 3)).d.e).toBe(3);

    const newerState = deepReducer(defaultState, createAction(supportedActionType, 'root.d.e', 3));
    // objects should not be mutated
    expect(newerState).not.toBe(defaultState);
    expect(newerState.d).not.toBe(defaultState.d);
    expect(newerState.d.e).toBe(3);
    expect(newerState.d.e).toBe(3);
});

const newState = {
    a: 'bbe',
    b: '110',
    c: false,
    d: {
        e: 10,
    },
    e: ['filled array'],
};

test('createReducer should create a redux reducer and a RESET_ACTION reset to default', () => {
    const reducer: any = createReducer(defaultState);
    const resetActionType = 'RESET'
    expect(reducer(newState, createAction(resetActionType, 'a', ''))
               .a).toBe('aa');
    expect(reducer(newState, createAction(resetActionType, 'b', ''))
               .b).toBe('1');
    expect(reducer(newState, createAction(resetActionType, 'c', ''))
               .c).toBe(true);
    expect(reducer(newState, createAction(resetActionType, 'd.e', ''))
               .d.e).toBe(2);
    expect(reducer(newState, createAction(resetActionType, 'e', ''))
               .e).toEqual([]);

    const deepReducer: any = createReducer(defaultState, 'root');
    const resetState = deepReducer(newState, createAction(resetActionType, 'root.d.e', ''));
    // objects should not be mutated
    expect(resetState).not.toBe(defaultState);
    expect(resetState.b).not.toBe(defaultState);
    expect(resetState.d).toEqual(defaultState.d);
    expect(resetState.d.e).toBe(defaultState.d.e);
    expect(defaultState.d.e).toBe(2);
});