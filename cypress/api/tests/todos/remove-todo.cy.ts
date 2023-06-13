import { login, logout } from '../../helper/auth-helpers';
import { addEntirelyTodoList, getAllTodos, removeAllTodoList, removeTodoItem, removeTodoList } from '../../helper/todo-helpers';
import type { TodoList } from '../../../../src/models/todo.model';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import todoListTestData from '../../../fixtures/todo-positive-cases.json';
import todoListNegativeCases from '../../../fixtures/todo-negative-cases.json';

describe('API tests for the DELETE remove todo list and todo items', () => {
    let todoLists: TodoList[];

    describe('Authenticated positive cases', () => {
        let deleteTodoItem: string;
        let deleteTodoList: string;

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
                removeTodoItem(todoLists[0].id, todoLists[0].items[0].id).then(responseItemRemoval => {
                    deleteTodoItem = responseItemRemoval.body;
                    removeTodoList(todoLists[0].id).then(responseListRemoval => {
                        deleteTodoList = responseListRemoval.body;
                    });
                });
            });
        });

        it('should return a non-empty string', () => {
            expect(deleteTodoItem).to.be.an('string');
            expect(deleteTodoList).to.be.an('string');
            expect(deleteTodoItem.length).to.be.greaterThan(0);
            expect(deleteTodoList.length).to.be.greaterThan(0);
        });

        it('should return the id of the deleted todo list item', () => {
            const itemId = todoLists[0].items[0].id;
            removeTodoItem(todoLists[0].id, itemId).then(response => {
                expect(response.body).to.equal(itemId);
            });
        });

        it('should return the id of the deleted todo list', () => {
            const listId = todoLists[0].id;
            removeTodoList(listId).then(response => {
                expect(response.body).to.equal(listId);
            });
        });
    });

    // TODO: Activate after the #X defect has resolved.
    xdescribe('Authenticated negative cases', () => {
        before(() => {
            login();
        });

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

    // TODO: Activate after the #20 defect has resolved.
    xdescribe('Unauthenticated cases', () => {
        it('should send a response with the proper status code and status message', () => {
            removeTodoItem(todoLists[0].id, todoLists[0].items[0].id).then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });

        it('should send a response with the proper status code and status message', () => {
            removeTodoList(todoLists[0].id).then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });
    });
});
