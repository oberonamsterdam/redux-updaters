# Redux Updaters

[![npm](https://img.shields.io/npm/v/redux-updaters.svg)](https://www.npmjs.com/package/redux-updaters)
[![Travis](https://img.shields.io/travis/oberonamsterdam/redux-updaters/master.svg)](https://travis-ci.org/oberonamsterdam/redux-updaters/)

Update your state directly from your components. No reducers,
no actions. 

## Installation

`npm i redux-updaters`

or

`yarn add redux-updaters`

## The gist

This package is designed to provide an interface to using redux that
matches the development thought proces. When using redux, generally you
need to define your default state, provide reducers to define how your
state can get updated and then create an interface to trigger these updates
through action creators. We feel it makes more sense to focus on creating
components and use the redux state whenever you need to share state between
components or component instances (i.e. through persistence). Doing this should
not break your workflow or thought process. Therefor with this package, all 
you need to do to use your redux store is the following:

* Define your initial state.
* Update the state directly from your components.

Updater functions are provided that implement common state update patterns.

## API

For an overview of all available updater functions, refer to the [full API documentation](api.md)

## Quick usage

### Define your default state

```js
// The default state us just a plain object
export default {
    currentIndex: 0,
};
```

### Bind the reducer to your redux store

You can add the reducer as the root reducer when creating your store, but we 
recommend using combine reducers so you have the option to add other redux 
related packages, for example to [manage your api calls and data](https://github.com/oberonamsterdam/react-api-data).

```js
import { createReducer } from 'redux-updaters';
import defaultState from './defaultState';

const reducer = createReducer(defaultState, 'app');
const rootReducer = combineReducers({app: reducer});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
```

### Use the state in your components

```js
import React from 'react';
import { connect } from 'react-redux';
import { update } from 'redux-updaters';

// Use react-redux to bind your state and dispatch updates. 

const mapStateToProps = state => ({
    currentIndex: state.app.currentIndex,
});

const mapDispatchToProps = dispatch => ({
    updateIndex: index => dispatch(update('app.currentIndex', index))
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

const MyComponent = props => (
    <div>
        <div>The current index is {props.currentIndex}</div>
        <div>
            {[0, 1, 2, 3].map(index =>
                <button key={index} onClick={() => props.updateIndex(index)}>{index}</button>
            )}
        </div>
    </div>
);

export default enhance(MyComponent);
```

## Using with TypeScript

This package includes TypeScript type definitions. So type checking on all functions should be enabled by default. To add 
type checking on the path names given to updater functions, you can use the [createStatePaths](api.md#createstatepaths)
function to retrieve a [StatePathTree](api.md#statepathtree). This is a recursive structure that you can use instead of
strings when passing the state path to an updater function. 

```js
import { createStatePaths } from 'redux-updaters';

export const paths = createStatePaths(defaultState, 'app');

// somewhere in your component
dispatch(update(paths.currentIndex, 3));
// is same as
dispatch(update('app.currentIndex', 3)); 
// but with type checking. Catch errors before they happen!
```
