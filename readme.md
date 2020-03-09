# <img src="https://user-images.githubusercontent.com/19429291/69951420-83dc0900-14f5-11ea-8c6a-0ddbdd8ea7f9.png" alt="Redux Updaters" width="400" />

[![npm](https://img.shields.io/npm/v/redux-updaters.svg)](https://www.npmjs.com/package/redux-updaters)
[![Build Status](https://travis-ci.org/oberonamsterdam/redux-updaters.svg?branch=master)](https://travis-ci.org/oberonamsterdam/redux-updaters)

Update your state directly from your components. No reducers,
no actions. 

Built upon Redux to keep all of its benefits, this package brings centralised state management closer to the component architecture. 

Resulting benefits are:

:white_check_mark: Greatly reduce lines of code in your projects

:white_check_mark: Reduce code complexity

:white_check_mark: Increase maintainability

:white_check_mark: Reduce chance of bugs

Also:

:white_check_mark: Respects the priciples of Redux, keeping all of its benefits

:white_check_mark: Can be added to existing code bases that already use Redux

## Installation

`npm i redux-updaters redux-thunk`

or

`yarn add redux-updaters redux-thunk`

*Note: this package requires redux-thunk middleware. You need to add this yourself, see example below*

## The gist

[Read the article on Medium](https://medium.com/oberonamsterdam/a-more-convenient-approach-to-redux-3c5f553e82bb)

This package is designed to provide an interface to using Redux that better
matches the component architecture. Redux prescribes separating state management
logic from your component logic, through actions and reducers. We believe that when
using the component architecture, components should be leading. In practice, 
developers don't reason from a state management perspective, but
rather from the perspective of your component implementations. State management
happens whenever your components need it. At this point you would create actions
and reducers, because your components have a need for it. Using Redux Updaters,
you can just update your state directly from your components when you need to. It
lets Redux take care of updating the state, keeping all the benefits around keeping
state in sync. Using Redux Updaters, you will need only two steps:

* Define your initial state.
* Update the state directly from your components.

## How does it work

Redux Updaters provides a toolbox of action creators, called *updaters*, and a reducer
to handle the created actions. You are in charge of dispatching the actions as usual.
Using the updaters, you should be able to easily update your state in which ever way you
need to. Reading state is done the same way as without Redux Updaters.

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

### Use the state in your components - React example
*This package has been tested in combination with React, so we use React in our examples, but it does not depend on React and can 
also be used in combination with other view-libraries or frameworks.*
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

## License

[MIT](LICENSE)
