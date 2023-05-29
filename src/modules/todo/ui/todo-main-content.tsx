import { Delete, MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { type FunctionComponent, useCallback, useMemo, useState, type MouseEvent } from 'react';
import { AddTodoItem } from './add-todo-item';
import { TodoList } from './todo-list';
import './todo-main-content.scss';
import type { TodoItem } from '../../../models/todo.model';
import { useTodoPageContext } from '../todo-page-context';
import { useObservable } from '../../../hooks/useObservable';

export const TodoMainContent: FunctionComponent = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = useMemo(() => Boolean(menuAnchorEl), [menuAnchorEl]);
    const { todoListModel } = useTodoPageContext();
    const todoLists = useObservable(todoListModel.todoLists);
    const activeListId = useObservable(todoListModel.activeListId);

    const handleMenuClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuAnchorEl(null);
    }, []);

    const activeTodoList = useMemo(() => {
        return todoLists.find(list => list.id === activeListId);
    }, [todoLists, activeListId]);

    const activeTodoItems = useMemo(() => {
        return todoLists.find(list => list.id === activeListId)?.items ?? [];
    }, [todoLists, activeListId]);

    const handleAddTodoItem = useCallback((title: string) => {
        todoListModel.addTodoItem(activeListId, title);
    }, [activeListId, todoListModel.addTodoItem]);

    const handleUpdateTodoItem = useCallback((todoItem: TodoItem) => {
        todoListModel.updateTodoItem(activeListId, todoItem);
    }, [activeListId, todoListModel.updateTodoItem]);

    const handleRemoveTodoItem = useCallback((id: string) => {
        todoListModel.removeTodoItem(activeListId, id);
    }, [activeListId, todoListModel.removeTodoItem]);

    const handleRemoveTodoList = useCallback(() => {
        todoListModel.removeTodoList(activeListId);
    }, [activeListId, todoListModel.removeTodoList]);

    return <>
        {
            activeListId
                ? <>
                    <div className="todo-list-header">
                        <h2 className="title">{activeTodoList?.title}</h2>
                        <div>
                            <IconButton
                                aria-label="more"
                                data-testid="todo-header-menu-button"
                                aria-controls={isMenuOpen ? 'long-menu' : undefined}
                                aria-expanded={isMenuOpen ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleMenuClick}
                            >
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={menuAnchorEl}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: 46 * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                <MenuItem data-testid="delete-list-button" onClick={() => {
                                    handleRemoveTodoList();
                                    handleMenuClose();
                                }}>
                                    <Delete />
                                    Delete list
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <AddTodoItem handleAddTodo={handleAddTodoItem} />
                    <TodoList items={activeTodoItems}
                        handleUpdate={handleUpdateTodoItem}
                        handleRemove={handleRemoveTodoItem} />
                </>
                : <div data-testid="no-items">Nothing to show</div>
        }
    </>;
};
