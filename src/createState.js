// @flow

const isObject = (value: any): boolean => !Array.isArray(value) && typeof value === 'object' && value !== null;
const getPath = (startPath: string, key: string) => (startPath ? startPath + '.' : '') + key;

const createState = <D: {[name: string]: any}>(defaultState: D, startPath?: string = ''): $ObjMap<D, () => string | D> & {_path: string} => {
    const stateDef = Object.keys(defaultState).reduce((res, key) => ({
        ...res,
        [key]: isObject(defaultState[key]) ? createState(defaultState[key], getPath(startPath, key)) : getPath(startPath, key),
    }), {});

    stateDef._path = startPath;

    return stateDef;
};

export default createState;

const test = createState({
    a: 1,
    b: true,
});

const b: string = test.b; // todo