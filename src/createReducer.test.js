import createReducer, { ACTION_PREFIX } from './createReducer';

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

    expect(reducer(undefined, {type: nonSupportedActionType})).toBe(defaultState);
    expect(reducer(defaultState, {type: nonSupportedActionType})).toBe(defaultState);

    expect(reducer(defaultState, {
        type: supportedActionType,
        meta: {path: 'a'},
        payload: 'aaa',
    }).a).toBe('aaa');

    expect(reducer(defaultState, {
        type: supportedActionType,
        meta: {path: 'd.e'},
        payload: 3,
    }).d.e).toBe(3);

    const deepReducer = createReducer(defaultState, 'root');
    expect(deepReducer(defaultState, {
        type: supportedActionType,
        meta: {path: 'root.d.e'},
        payload: 3,
    }).d.e).toBe(3);
});