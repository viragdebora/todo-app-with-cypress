import { login, logout } from '../../helper/auth-helpers';
import { addEntirelyTodoList, getAllTodos, removeAllTodoList, updateTodoItem } from '../../helper/todo-helpers';
import type { TodoList, TodoStatus } from '../../../../src/models/todo.model';
import { todoListSchema } from '../../json-schemas/todo-schemas';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import todoListTestData from '../../../fixtures/todo-positive-cases.json';
import todoListNegativeCases from '../../../fixtures/todo-negative-cases.json';

describe('API tests for the POST / todos/updateTodoItem', () => {
    let todoLists: TodoList[];

    describe('Authenticated positive cases', () => {
        after(() => {
            removeAllTodoList();
            logout();
        });

        before(() => {
            login();
            addEntirelyTodoList(todoListTestData[0].listTitle, todoListTestData[0].listItems).then(todoList => {
                updateTodoItem(todoList.id, {
                    id: todoList.items[0].id,
                    state: 'COMPLETED',
                    title: 'Updated Todo Item',
                });
                getAllTodos().then(response => {
                    todoLists = response.body;
                });
            });
        });

        it('should return a non-empty array', () => {
            todoLists.forEach(list => {
                expect(list.items).to.be.an('array');
                expect((list.items).length).to.be.greaterThan(0);
            });
        });

        it('should match the schema', () => {
            todoLists.forEach(list => {
                expect(list).to.be.jsonSchema(todoListSchema);
            });
        });

        it('should change from \'NOT_STARTED\' to \'COMPLETED\'', () => {
            expect(todoLists[0].items[0].state).not.to.equal('NOT_STARTED');
            expect(todoLists[0].items[0].state).to.equal('COMPLETED');
        });

        it('should change the title', () => {
            const previousTitle = todoListTestData[0].listItems[todoListTestData[0].listItems.length - 1];
            expect(todoLists[0].items[0].title).not.to.equal(previousTitle);
            expect(todoLists[0].items[0].title).to.equal('Updated Todo Item');
        });
    });

    // TODO: Activate after the #X defect has resolved.
    xdescribe('Authenticated negative cases', () => {
        before(() => {
            login();
        });

        todoListNegativeCases.forEach(list => {
            it(`should return with the proper status code and status message to ${list.description} to state with proper list id`, () => {
                updateTodoItem(todoLists[0].id, {
                    id: todoLists[0].items[0].id,
                    state: list.parameter as TodoStatus,
                    title: 'Todo Item 1',
                }).then(response => {
                    expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                    expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                });
            });

            it(`should return with the proper status code and status message without proper list id to ${list.description}`, () => {
                updateTodoItem(list.parameter as string, {
                    id: todoLists[0].items[0].id,
                    state: 'COMPLETED',
                    title: 'Updated Todo Item 2',
                }).then(response => {
                    expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                    expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                });
            });

            it(`should return with the proper status code and status message without proper list id and list item id to ${list.description}`, () => {
                updateTodoItem(list.parameter as string, {
                    id: list.parameter as string,
                    state: 'COMPLETED',
                    title: 'Updated Todo Item 2',
                }).then(response => {
                    expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                    expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                });
            });
        });
    });

    // TODO: Activate after the #20 defect has resolved.
    xdescribe('Unauthenticated cases', () => {
        it('should send a response with the proper status code and status message', () => {
            updateTodoItem(todoLists[0].id, {
                id: todoLists[0].items[0].id,
                state: 'COMPLETED',
                title: 'Updated Todo Item 2',
            }).then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });
    });
});
