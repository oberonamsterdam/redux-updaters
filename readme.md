# Redux Updaters

[![npm](https://img.shields.io/npm/v/redux-updaters.svg)](https://www.npmjs.com/package/redux-updaters)
[![Travis](https://img.shields.io/travis/oberonamsterdam/redux-updaters/master.svg)](https://travis-ci.org/oberonamsterdam/redux-updaters/)

Update your state directly from your components. No reducers,
no actions. 

## Installation

`npm i redux-updaters redux-thunk`

or

`yarn add redux-updaters redux-thunk`

*Note: this package requires redux-thunk middleware. You need to add this yourself, see example below*

## The gist

This package is designed to provide an interface to using Redux that better
matches the development thought proces. When using Redux, generally you
need to define your default state, provide reducers to define how your
state can get updated and then create an interface to trigger these updates
through action creators. We feel it makes more sense to focus on creating
components and use the Redux state whenever you need to share state between
components or component instances. Doing this should
not break your workflow or thought process. Therefor with this package, all 
you need to do to use your Redux store is the following:

* Define your initial state.
* Update the state directly from your components.

Updater functions are provided that implement common state update patterns.

## API

For an overview of all available updater functions, refer to the [full API documentation](api.md)

## Quick usage

### Define your default state
The default state is like the default state of any reducer, except now it is for the entire state that you wish to control using 
redux-updaters. This means you can define your entire state tree in here. 
```js
// The default state us just a plain object
export default {
    pager: {
        currentIndex: 0
    }
}
```

### Bind the reducer to your redux store

You can add the reducer as the root reducer when creating your store, but we 
recommend using combine reducers so you have the option to add other redux 
related packages, for example to [manage your api calls and data](https://github.com/oberonamsterdam/react-api-data).

```js
import { createReducer } from 'redux-updaters';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import defaultState from './defaultState';

const reducer = createReducer(defaultState);
const rootReducer = combineReducers({app: reducer});
const store = createStore(rootReducer, applyMiddleware(thunk));
```

### Use the state in your components
The package has been tested in combination with React, and therefore we show examples with React, but 
```js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'redux-updaters';

const MyComponent = props => {
    // Use react-redux to get your state values and dispatch updates.
    const currentIndex = useSelector(state => state.app.pager.currentIndex);
    const dispatch = useDispatch();

    return (
        <div>
            <div>The current index is {currentIndex}</div>
            <div>
                {[0, 1, 2, 3].map(index =>
                    <button key={index} onClick={() => dispatch(update('pager.currentIndex', index))}>{index}</button>,
                )}
            </div>
        </div>
    );
};

export default MyComponent;
```

## Using with TypeScript

This package includes TypeScript type definitions. So type checking on all functions should be enabled by default. To add 
type checking on the path names given to updater functions, you can use the [createStatePaths](api.md#createstatepaths)
function to retrieve a [StatePathTree](api.md#statepathtree). This is a recursive structure that you can use instead of
strings when passing the state path to an updater function. 

```js
import { createStatePaths } from 'redux-updaters';

export const paths = createStatePaths(defaultState);

// somewhere in your component
dispatch(update(paths.pager.currentIndex, 3));
// is same as
dispatch(update('pager.currentIndex', 3)); 
// but with type checking. Catch errors before they happen!

```
