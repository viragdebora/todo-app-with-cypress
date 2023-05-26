import { errorPageSelectors } from '../selectors/error-page-selectors';
import { headerSelectors } from '../selectors/header';
import { homePageSelectors } from '../selectors/home-page-selectors';
import { loginSelectors } from '../selectors/login-page-selectors';
import { todoPageSelectors } from '../selectors/todo-page-selectors';

const pageLoadSelectors = {
    home: [homePageSelectors.welcomeText, headerSelectors.headerContainer],
    basicTodo: [
        todoPageSelectors.noItemsVisible,
        todoPageSelectors.sideBar,
        todoPageSelectors.addListButton,
    ],
    todos: [
        todoPageSelectors.todoListHeader,
        todoPageSelectors.todoListTitle,
        todoPageSelectors.inputTodoField,
        todoPageSelectors.addButton,
    ],
    login: [
        loginSelectors.userNameField,
        loginSelectors.passwordField,
        loginSelectors.submitButton,
    ],
    error: [
        errorPageSelectors.errorStatus,
        errorPageSelectors.errorMessage,
        errorPageSelectors.backToHomePageButton,
    ],
};

export function waitForPageLoad(page: keyof typeof pageLoadSelectors): void {
    cy.waitUntilElementsVisible(pageLoadSelectors[page]);
}
