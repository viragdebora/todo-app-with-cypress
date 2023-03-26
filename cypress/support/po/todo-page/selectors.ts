export const selectors = {
    //todo-content
    noItemsVisible: "div[data-testid='no-items']",
    
    //sidebar related selectors
    sideBar: "div[data-testid='side-bar']",
    todoListItems: "div[data-testid='todo-list']",
    addListButton: "button[data-testid='add-list-button']",
    
    //new todo-list item related selectors
    todoListContent: "div[class='todo-list-content']",
    todoListHeader: "div[class='todo-list-header']",
    todoListTitle: "h2[class='title']",
    todoListHeaderMenuButton: "button[data-testid='todo-header-menu-button']",
    deleteTodoListButton: "li[data-testid='delete-list-button']",
    inputTodoField: "div[data-testid='add-todo-item-input-field'] input",
    addButton: "button[data-testid='add-todo-item-button']",

    //todo-list todos related selectors
    todoItem: "div[data-testid='todo-item']",
    todoItemCheckbox: "span[data-testid='todo-item-checkbox']",
    todoItemTitle: "div[data-testid='todo-item-title']",
    todoItemDeleteButton: "button[data-testid='delete-button']"
}