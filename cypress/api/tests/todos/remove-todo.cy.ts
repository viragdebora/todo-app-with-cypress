import { login, logout } from '../../helper/auth-helpers';
import { addEntirelyTodoList, getAllTodos, removeAllTodoList, removeTodoItem, removeTodoList } from '../../helper/todo-helpers';
import type { TodoList } from '../../../../src/models/todo.model';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import todoListTestData from '../../../fixtures/todo-positive-cases.json';
import todoListNegativeCases from '../../../fixtures/todo-negative-cases.json';

describe('API tests for the DELETE remove todo list and todo items', () => {
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
            it('should return the id of the deleted todo list item', () => {
                const itemId = todoLists[0].items[0].id;
                removeTodoItem(todoLists[0].id, itemId).then(response => {
                    expect(response.body).to.equal(itemId);
                    expect(response.body).to.be.an('string');
                });
            });

            it('should return the id of the deleted todo list', () => {
                const listId = todoLists[0].id;
                removeTodoList(listId).then(response => {
                    expect(response.body).to.equal(listId);
                    expect(response.body).to.be.an('string');
                });
            });
        });

        // TODO: Activate after the #21 defect has resolved.
        xdescribe('Negative cases', () => {
            todoListNegativeCases.forEach(list => {
                it(`should return with the proper status code and status message to ${list.description} with proper list id when remove a list item`, () => {
                    removeTodoItem(todoLists[0].id, list.parameter as string).then(response => {
                        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });

                it(`should return with the proper status code and status message to ${list.description} without proper list id when remove a list item`, () => {
                    removeTodoItem(list.parameter as string, todoLists[0].items[0].id).then(response => {
                        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });

                it(`should return with the proper status code and status message to ${list.description} without proper list id, and list item id when remove a list item`, () => {
                    removeTodoItem(list.parameter as string, list.parameter as string).then(response => {
                        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });

                it(`should return with the proper status code and status message to ${list.description} without proper list id when remove a list`, () => {
                    removeTodoList(list.parameter as string).then(response => {
                        expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
                        expect(response.statusText).to.equal(ReasonPhrases.BAD_REQUEST);
                    });
                });
            });
        });
    });

    // TODO: Activate after the #20 defect has resolved.
    xdescribe('Unauthenticated cases', () => {
        const WRONG_LIST_ID = 'bc221284-fd8d-410d-acc8-ee6adb27d1ff';
        const WRONG_ITEM_ID = '650e4bf5-5ad0-4da7-86d2-1aadaa156582';

        it('should send a response with the proper status code and status message', () => {
            removeTodoItem(WRONG_LIST_ID, WRONG_ITEM_ID).then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });

        it('should send a response with the proper status code and status message', () => {
            removeTodoList(WRONG_LIST_ID).then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });
    });
});
