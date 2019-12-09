import createReducer from './createReducer';
import { ACTION_PREFIX } from './createAction';
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
    const supportedActionType = ACTION_PREFIX + 'TEST';

    expect(reducer(defaultState, { type: nonSupportedActionType })).toBe(defaultState);

    expect(reducer(defaultState, {
        type: supportedActionType,
        meta: { path: 'a' },
        payload: 'aaa',
    }).a).toBe('aaa');

    expect(reducer(defaultState, {
        type: supportedActionType,
        meta: { path: 'd.e' },
        payload: 3,
    }).d.e).toBe(3);

    const deepReducer = createReducer(defaultState, 'root');
    expect(deepReducer(defaultState, {
        type: supportedActionType,
        meta: { path: 'root.d.e' },
        payload: 3,
    }).d.e).toBe(3);

    const newState = deepReducer(defaultState, {
        type: supportedActionType,
        meta: { path: 'root.d.e' },
        payload: 3,
    });
    // objects should not be mutated
    expect(newState).not.toBe(defaultState);
    expect(newState.d).not.toBe(defaultState.d);
    expect(newState.d.e).toBe(3);
    expect(defaultState.d.e).toBe(2);
});

test('createReducer should create a redux reducer and an UPDATE_ACTION should update the state and a RESET_ACTION reset to default', () => {
    const reducer = createReducer(defaultState);
    const nonSupportedActionType = 'NON_SUPPORTED_ACTION';
    const updateActionType = ACTION_PREFIX + 'UPDATE';
    const resetActionType = ACTION_PREFIX + 'RESET';

    expect(reducer(defaultState, { type: nonSupportedActionType })).toBe(defaultState);

    expect(reducer(defaultState, {
        type: updateActionType,
        meta: { path: 'a' },
        payload: 'ab',
    }).a).toBe('ab');

    expect(reducer(defaultState, {
        type: resetActionType,
        meta: { path: 'a' },
        payload: '',
    }).a).toBe('aa');

    expect(reducer(defaultState, {
        type: resetActionType,
        meta: { path: 'd.e' },
        payload: '',
    }).d.e).toBe(2);

    const deepReducer = createReducer(defaultState, 'root');
    expect(deepReducer(defaultState, {
        type: updateActionType,
        meta: { path: 'root.b' },
        payload: '2',
    }).b).toBe('2');

    const updateState = deepReducer(defaultState, {
        type: updateActionType,
        meta: { path: 'root.d.e' },
        payload: 3,
    });

    const resetState = deepReducer(defaultState, {
        type: resetActionType,
        meta: { path: 'root.d.e' },
        payload: '',
    });
    // objects should not be mutated
    expect(updateState.d.e).toBe(3);
    expect(resetState).not.toBe(defaultState);
    expect(resetState.b).not.toBe(defaultState);
    expect(resetState.d).toEqual(defaultState.d);
    expect(resetState.d.e).toBe(defaultState.d.e);
    expect(defaultState.d.e).toBe(2);
});