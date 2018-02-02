import createState from './createState';

test('createState should create a state definition', () => {
    const stateDef = createState({
        a: 'aa',
        b: '1',
        c: true,
        d: {
            e: 2,
        },
        e: [],
    });

    expect(stateDef.a).toBe('a');
    expect(stateDef.b).toBe('b');
    expect(stateDef.c).toBe('c');
    expect(stateDef.d).toEqual({
        e: 'd.e',
        _path: 'd',
    });
    expect(stateDef.d.e).toBe('d.e');
    expect(stateDef.e).toBe('e');
});

// stateDef.d -> {e: 2}
// stateDef.d.e -> 2

// stateDef.d = {e: 'd.e', _path: 'd'}
