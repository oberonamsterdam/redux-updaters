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