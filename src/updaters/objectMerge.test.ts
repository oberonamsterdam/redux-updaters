import createAction from '../createAction';
import objectMerge from './objectMerge';

test('objectMerge updater should dispatch an objectMerge action', () => {
    const getDispatch = (expectFn: (...args: any[]) => void) => (action: (...args: any[]) => void) => {
        expectFn(action);
    };
    const testData = {
        changeDataByMerge: {
            myObject:
            {
                articles: {
                    123: {
                        id: '123',
                        author: '1',
                        title: 'My awesome blog pos',
                        comments: [ '324' ]
                    }
                },
                users: {
                    1: { id: '1', name: 'Paul' },
                    2: { id: '2', name: 'Nicole' }
                },
                comments: {
                    324: { id: '324', commenter: '2' }
                }
            },
            objectToMatch: {
                articles: {
                    123: {
                        id: '123',
                        author: '2',
                        title: 'My awesome blog post',
                        comments: ['324']
                    }
                },
                users: {
                    1: { id: '1', name: 'Paul' },
                    2: { id: '2', name: 'Nicole' }
                },
                comments: {
                    324: { id: '324', commenter: '2' }
                }
            },
            objectToMerge: {
                articles: {
                    123: {
                        id: '123',
                        author: '2',
                        title: 'My awesome blog post',
                        comments: [ '324' ]
                    }
                },
            },

        },
        addDataByMerge: {
            myObject: {
                articles: {
                    123: {
                        id: '123',
                        author: '1',
                        title: 'My awesome blog post',
                        comments: [ '324' ]
                    }
                },
                users: {
                    1: { id: '1', name: 'Paul' },
                    2: { id: '2', name: 'Nicole' }
                },
                comments: {
                    324: { id: '324', commenter: '2' }
                }
            },
            objectToMatch: {
                articles: {
                    123: {
                        id: '123',
                        author: '1',
                        title: 'My awesome blog post',
                        comments: [ '324' ]
                    }
                },
                users: {
                    1: { id: '1', name: 'Paul' },
                    2: { id: '2', name: 'Nicole' },
                    3: { id: '3', name: 'Steve' }

                },
                comments: {
                    324: { id: '324', commenter: '2' }
                }
            },
            objectToMerge: {
                users: {
                    3: {
                        id: '3',
                        name: 'Steve'
                    }
                },
            },
        },
        changeDataWithLimit: {
            myObject: {
                articles: {
                    123: {
                        id: '123',
                        author: '1',
                        title: 'My awesome blog post',
                        comments: [ '324' ]
                    }
                },
                users: {
                    1: { id: '1', name: 'Paul', propToOverwrite: 'data we dont need' },
                    2: { id: '2', name: 'Nicole', propToOverwrite: 'data we dont need' }
                },
                comments: {
                    324: { id: '324', commenter: '2' }
                }
            },
            objectToMatch: {
                articles: {
                    123: {
                        id: '123',
                        author: '1',
                        title: 'My awesome blog post',
                        comments: [ '324' ]
                    }
                },
                users: {
                    1: { id: '1', name: 'Paul' },
                    2: { id: '2', name: 'Nicole' },
                },
                comments: {
                    324: { id: '324', commenter: '2' },
                    325: { id: '325', commenter: '2' }
                }
            },
            objectToMerge: {
                users: {
                    1: { id: '1', name: 'Paul' },
                    2: { id: '2', name: 'Nicole' },
                },
                comments: {
                    324: { id: '324', commenter: '2' },
                    325: { id: '325', commenter: '2' }
                }
            },
        }
    };

    objectMerge(
        'myObject',
        testData.changeDataByMerge.objectToMerge
        )(
        getDispatch(action => {
            expect(action).toEqual(createAction(
                'OBJECT_MERGE',
                'myObject',
                testData.changeDataByMerge.objectToMatch
            ));
        }),
        () => (testData.changeDataByMerge)
    );

    objectMerge(
        'myObject',
        testData.addDataByMerge.objectToMerge
    )(
        getDispatch(action => {
            expect(action).toEqual(createAction(
                'OBJECT_MERGE',
                'myObject',
                testData.addDataByMerge.objectToMatch
            ));
        }),
        () => (testData.addDataByMerge)
    );

    objectMerge(
        'myObject',
        testData.changeDataWithLimit.objectToMerge,
        2
    )(
        getDispatch(action => {
            expect(action).toEqual(createAction(
                'OBJECT_MERGE',
                'myObject',
                testData.changeDataWithLimit.objectToMatch,
            ));
        }),
        () => (testData.changeDataWithLimit)
    );

    // depth limit test

    const state = {
        entities: {
            users: {
                1: { id: 1 },
                2: { id: 2 },
            }
        }
    };
    // should add users
    objectMerge(
        'entities',
        {
            users: {
                3: { id: 3 }
            }
        },
        2
    )(
        getDispatch(action => {
            expect(action).toEqual(createAction(
                'OBJECT_MERGE',
                'entities',
                {
                    users: {
                        1: { id: 1 },
                        2: { id: 2 },
                        3: { id: 3 },
                    }
                }
            ));
        }),
        () => state
    );
    // should overwrite users
    objectMerge(
        'entities',
        {
            users: {
                3: { id: 3 }
            }
        },
        1
    )(
        getDispatch(action => {
            expect(action).toEqual(createAction(
                'OBJECT_MERGE',
                'entities',
                {
                    users: {
                        3: { id: 3 }
                    }
                }
            ));
        }),
        () => state
    );
});