# API

## Table of Contents
- [Configuration](#configuration)
  -   [`createReducer()`](#createreducer)
  -   [`createStatePaths()`](#createstatepaths)
- [Updaters](#updaters)
  -   [`update()`](#update)
  -   [`arrayAdd()`](#arrayadd)
  -   [`arrayReplace()`](#arrayreplace)
  -   [`arrayRemove()`](#arrayremove)
  -   [`decrement()`](#decrement)
  -   [`increment()`](#increment)
  -   [`objectMerge()`](#objectmerge)
  -   [`toggle()`](#toggle)
- [Types and interfaces](#types-and-interfaces)
  -   [`StatePathTree`](#statepathtree)
  -   [`StatePath`](#statepath)

## Configuration

### `createReducer()`

Get the reducer. You will need to add this to your store.

**Parameters**

-   `defaultState` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

**Examples**

```javascript
const reducer = createReducer(defaultState);
const rootReducer = combineReducers({app: reducer});
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

### `createStatePaths()`

Create a paths object that contains all the paths to your state properties. This is especially useful when using 
TypeScript, because it adds type checking to the paths given to updaters.

**Parameters**

-   `defaultState` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**

**Examples**

```javascript
const paths = createStatePath(defaultState)
dispatch(update(paths.pager.currentIndex, 3)) // this will result in a TypeScript error if pager.currentIndex is not in your defaultState.
```

Returns **[StatePathTree](#statepathtree)** 

## Updaters

### `update()`

**Parameters**

-   `statePath` **[StatePath](#statepath)** 
-   `value` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | function (state: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)) => any)** 

**Examples**

```javascript
dispatch(update('currentIndex', 3))
```

```javascript
dispatch(update('currentIndex', state => state.app.pages.length - 1))
```

### `toggle()`

Toggle a boolean value

**Parameters**

-   `statePath` **[StatePath](#statepath)** 

**Examples**

```javascript
dispatch(toggle('menu.isOpen'))
```

### `increment()`

Increment a value by x where x is an optional parameter ('by') that defaults to 1.
There is also an optional max parameter: if the result of the incrementation would result
higher than that max value, it sets the value to the max value instead.

**Parameters**

-   `statePath` **[StatePath](#statepath)** 
-   `by?` **number** By how much to increase the value. Defaults to 1.
-   `max?`**number** Set an upper limit on the result value.

**Examples**

```javascript
    dispatch(increment('currentPage', 5, lastPage))
```

### `decrement()`

Decrement a value by x where x is an optional parameter ('by') that defaults to 1
There is also an optional min parameter, if the result of the incrementation would result
lower than that min value, it sets the value to the min value instead 

**Parameters**

-   `statePath` **[StatePath](#statepath)** 
-   `by?` **number**
-   `min?`**number**

**Examples**

```javascript
    dispatch(decrement('currentPage', 5, 0))
```

### `arrayAdd()`

Add something to the end of an array.

**Parameters**

-   `statePath` **[StatePath](#statepath)** 
-   `value` **any** 

**Examples**

```javascript
dispatch(arrayAdd('todos', 'New to do'));
```

### `objectMerge()`

Merge objects with an optional depthLimit, deepmerge everything under the depthLimit,
shallow merge the rest. Arrays are always merged using a shallow merge. A depthLimit of 1 means "do a shallow merge", 
meaning objects within the specified object will be replaced. A depthLimit of 2 means "shallow merge objects within 
this object". And so on.

**Parameters**

-   `statePath` **[StatePath](#statepath)** 
-   `object` **object**
-   `depthLimit?` **number** Set to 1 for a shallow merge.

**Examples**

```javascript
dispatch(objectMerge('myObject', object));
```

### `arrayReplace()`

Update a value within an array by index or by predicate function. If a predicate function is given, all values for which
the function returns true will be replaced with the given value.

**Parameters**

-   `statePath` **[StatePath](#statepath)**
-   `indexOrFn` **number | (value: any, index: number) => boolean**
-   `newValue`  

**Examples**

```javascript
dispatch(arrayReplace('todos', todoIndex, myTodo));
dispatch(arrayReplace('todos', (todoItem, index) => todoItem.id === todoId, myTodo);
```

### `arrayRemove()`

Remove an entry from an array. When a number is given, removes the entry at that index. When a function is given,
removes items for which the function returns true.

**Parameters**

-   `statePath` **[StatePath](#statepath)**
-   `indexOrFn` **number | (value: any, index: number) => boolean**

**Examples**

```javascript
dispatch(arrayRemove('app.todos', todoIndex));
dispatch(arrayRemove('app.todos', (todoItem, index) => todoItem.id === todoId));
```

## Types and interfaces

These types and interfaces can be imported from the package when using TypeScript.

### `StatePathTree`

A tree that contains paths to your state properties, derived from your default state. Useful when using TypeScript.

Type: Object

### `StatePath`

A path representation to a property in the state, e.g. `pager.currentIndex`. 

Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [StatePathTree](#statepathtree)&lt;any>