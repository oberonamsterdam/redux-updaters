// @flow
const isObject = (value: any): boolean => !Array.isArray(value) && typeof value === 'object' && value !== null;
const getPath = (startPath: string, key: string): string => (startPath ? startPath + '.' : '') + key;

/**
 * A tree that contains paths to your state properties, derived from your default state. Useful when using Flow.
 */

export interface PathString {
    __path: string;
}

export type StatePathTree<DefaultState> = PathString & {
    [V in keyof DefaultState]: StatePathTree<DefaultState[V]>
};

const createNode = (path: string): any => ({ __path: path });

/**
 * Create a paths object that contains all the paths to your state properties. This is useful when using flow, because
 * it adds type checking to the paths given to updaters.
 * @param {D} defaultState
 * @param {string} rootPath Same path as given to createReducer
 * @returns {PathString | StatePathTree<D>}
 * @example
 * const paths = createStatePath(defaultState, 'app')
 * dispatch(update(paths.currentIndex, 3)) // this will result in a flow error if currentIndex is not in your defaultState.
 */
const createStatePaths = <D extends object & {[key: string]: any}>(defaultState: D, rootPath: string = ''): StatePathTree<D> => {
    return Object.keys(defaultState).reduce(
        (res, key) => {
            const val = defaultState[key];
            const path: string = getPath(rootPath, key);

            return {
                ...res,
                [key]: isObject(val) ? createStatePaths(val, path) : createNode(path)
            };
        },
        createNode(rootPath)
    );
};

export default createStatePaths;
