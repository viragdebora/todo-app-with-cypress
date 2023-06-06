export interface CustomCommands {
    login: () => Cypress.Chainable<void>;
    logout: () => Cypress.Chainable<void>;
    newTodoList: (todoListTitle: string) => Cypress.Chainable<void>;
    addTodoToTodoList: (todoListIndex: number, todoItem: string) => Cypress.Chainable<void>;
    removeAllTodoList: () => Cypress.Chainable<void>;
    waitUntilElementsVisible: (selectors: string[]) => Cypress.Chainable<void>;
}

export function registerCommand<CommandName extends keyof CustomCommands>(
    commandName: CommandName,
    appActionVersion: Cypress.CommandFn<CommandName>,
    nonAppActionVersion: Cypress.CommandFn<CommandName>,
): void {
    if (Cypress.env('non-app-action')) {
        Cypress.Commands.add(commandName, nonAppActionVersion);
    } else {
        Cypress.Commands.add(commandName, appActionVersion);
    }
}
