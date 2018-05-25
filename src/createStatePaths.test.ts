import createState, { StatePathTree } from './createStatePaths';

interface TestState {
    childA: {
        a: number;
        b: boolean;
        c: {
            d: number
        }
    };
    childB: {
        a: number,
        b: boolean;
    };
    someProp: boolean;
}

test('createState should create a state definition', () => {
    const defaultState: TestState = {
        childA: {
            a: 1,
            b: true,
            c: {
                d: 3,
            }
        },
        childB: {
            a: 2,
            b: false
        },
        someProp: true,
    };

    const stateDef: StatePathTree<TestState> = createState(defaultState);

    expect(stateDef.childA.__path).toBe('childA');
    expect(stateDef.childA.a.__path).toBe('childA.a');
    expect(stateDef.childA.c.__path).toBe('childA.c');
    expect(stateDef.childA.c.d.__path).toBe('childA.c.d');
    expect(stateDef.someProp.__path).toBe('someProp');
});
