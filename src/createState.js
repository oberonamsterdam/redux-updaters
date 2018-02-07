// @flow

const isObject = (value: any): boolean => !Array.isArray(value) && typeof value === 'object' && value !== null;
const getPath = (startPath: string, key: string) => (startPath ? startPath + '.' : '') + key;

export type StateDef<DefaultState> = {__path: string} & $ObjMap<DefaultState, <V: any>(val: V) => StateDef<V>>;

const createNode = (path: string): {__path: string} => ({__path: path});

const createState = <D: Object>(defaultState: D, curPath?: string = ''): StateDef<D> =>
    Object.keys(defaultState).reduce((res, key) => {
        const val = defaultState[key];
        const path = getPath(curPath, key);

        return {
            ...res,
            [key]: isObject(val) ? createState(val, path) : createNode(path)
        };
    }, createNode(curPath));

export default createState;