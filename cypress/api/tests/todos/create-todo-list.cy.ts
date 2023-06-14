import { login, logout } from '../../helper/auth-helpers';
import { createTodoList, removeAllTodoList } from '../../helper/todo-helpers';
import type { TodoList } from '../../../../src/models/todo.model';
import { todoListSchema } from '../../json-schemas/todo-schemas';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import todoListTestData from '../../../fixtures/todo-positive-cases.json';
import todoListNegativeCases from '../../../fixtures/todo-negative-cases.json';

describe('API tests for the POST / todos/', () => {
    describe('Authenticated cases', () => {
        let todoList: TodoList;

        after(() => {
            removeAllTodoList();
            logout();
        });

        before(() => {
            login();
            todoListTestData.forEach(list => {
                createTodoList(list.listTitle).then(response => {
                    todoList = response.body;
                });
            });
        });

        describe('Positive cases', () => {
            it('should return an object', () => {
                expect(todoList).to.be.an('object');
            });

            it('should match the schema', () => {
                expect(todoList).to.be.jsonSchema(todoListSchema);
            });
        });

        // TODO: Activate after the #21 defect has resolved.
        xdescribe('Negative cases', () => {
            todoListNegativeCases.forEach(list => {
                it(`should return with the proper status code and status message to ${list.description}`, () => {
                    createTodoList(list.parameter as string).then(response => {
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
            createTodoList(todoListTestData[0].listTitle).then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });
    });
});
