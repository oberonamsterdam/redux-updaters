// @flow

const isObject = (value: any): boolean => !Array.isArray(value) && typeof value === 'object' && value !== null;
const getPath = (startPath: string, key: string) => (startPath ? startPath + '.' : '') + key;

/**
 * A tree that contains paths to your state properties, derived from your default state. Useful when using Flow.
 */
export type StatePathTree<DefaultState> = {__path: string} & $ObjMap<DefaultState, <V: any>(val: V) => StatePathTree<V>>;

const createNode = (path: string): {__path: string} => ({__path: path});

/**
 * Create a paths object that contains all the paths to your state properties. This is useful when using flow, because
 * it adds type checking to the paths given to updaters.
 * @param {Object} defaultState D
 * @param rootPath Same path as given to createReducer
 * @example
 * const paths = createStatePath(defaultState, 'app')
 * dispatch(update(paths.currentIndex, 3)) // this will result in a flow error if currentIndex is not in your defaultState.
 */
const createStatePaths = <D: Object>(defaultState: D, rootPath?: string = ''): StatePathTree<D> =>
    Object.keys(defaultState).reduce((res, key) => {
        const val = defaultState[key];
        const path = getPath(rootPath, key);

        return {
            ...res,
            [key]: isObject(val) ? createStatePaths(val, path) : createNode(path)
        };
    }, createNode(rootPath));

export default createStatePaths;
