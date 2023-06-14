import { login, logout } from '../../helper/auth-helpers';
import { addEntirelyTodoList, addTodoListItem, createTodoList, getAllTodos, removeAllTodoList } from '../../helper/todo-helpers';
import type { TodoList } from '../../../../src/models/todo.model';
import { todoListSchema } from '../../json-schemas/todo-schemas';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import todoListTestData from '../../../fixtures/todo-positive-cases.json';
import todoListNegativeCases from '../../../fixtures/todo-negative-cases.json';

describe('API tests for the POST / todos/addItem', () => {
    describe('Authenticated cases', () => {
        let todoLists: TodoList[];

        after(() => {
            removeAllTodoList();
            logout();
        });

        before(() => {
            login();
            todoListTestData.forEach(list => {
                addEntirelyTodoList(list.listTitle, list.listItems);
            });
            getAllTodos().then(response => {
                todoLists = response.body;
            });
        });
        describe('Positive cases', () => {
            it('should return a non-empty array', () => {
                todoLists.forEach(list => {
                    expect(list.items).to.be.an('array');
                    expect(list.items.length).to.be.greaterThan(0);
                });
            });

            it('should match the schema', () => {
                todoLists.forEach(list => {
                    expect(list).to.be.jsonSchema(todoListSchema);
                });
            });
        });

        // TODO: Activate after the #21 defect has resolved.
        xdescribe('Negative cases', () => {
            before(() => {
                login();
            });

            after(() => {
                removeAllTodoList();
                logout();
            });

            todoListNegativeCases.forEach(list => {
                it(`should return with the proper status code and status message to ${list.description} with proper list id`, () => {
                    addTodoListItem(todoLists[0].id, list.parameter as string).then(responseTodoItem => {
                        expect(responseTodoItem.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(responseTodoItem.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });

                it(`should return with the proper status code and status message without proper list id for ${list.description}`, () => {
                    addTodoListItem(list.parameter as string, todoLists[0].items[0].title).then(response => {
                        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });

                it(`should return with the proper status code and status message without proper list and list item id for ${list.description}`, () => {
                    addTodoListItem(list.parameter as string, list.parameter as string).then(response => {
                        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });
            });
        });
    });

    // TODO: Activate after the #20 defect has resolved.
    xdescribe('Unauthenticated cases', () => {
        it('should send a response with the proper status code and status message', () => {
            createTodoList('Test Todo List').then(response => {
                return addTodoListItem(response.body.id, 'Todo Item');
            }).then((responseTodoItem) => {
                expect(responseTodoItem.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(responseTodoItem.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });
    });
});
