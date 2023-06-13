import { login, logout } from '../../helper/auth-helpers';
import { addEntirelyTodoList, getAllTodos, removeAllTodoList } from '../../helper/todo-helpers';
import type { TodoList } from '../../../../src/models/todo.model';
import { todoListSchema } from '../../json-schemas/todo-schemas';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import todoListTestData from '../../../fixtures/todo-positive-cases.json';

describe('API tests for the GET / todos/loadTodos', () => {
    describe('Authenticated positive cases', () => {
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

        it('should return a non-empty array', () => {
            expect(todoLists).to.be.an('array');
            expect(todoLists.length).to.be.greaterThan(0);
        });

        it('should match the schema', () => {
            todoLists.forEach(list => {
                expect(list).to.be.jsonSchema(todoListSchema);
            });
        });
    });

    // TODO: Activate after the #20 defect has resolved.
    xdescribe('Unauthenticated cases', () => {
        it('should send a response with the proper status code and status message', () => {
            getAllTodos().then(response => {
                expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
                expect(response.statusText).to.equal(ReasonPhrases.UNAUTHORIZED);
            });
        });
    });
});
