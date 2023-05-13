import { Delete, MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { type FunctionComponent, useCallback, useMemo, useState, type MouseEvent } from 'react';
import { useStoreon } from 'storeon/react';
import { AddTodoItem } from './add-todo-item';
import { TodoList } from './todo-list';
import './todo-main-content.scss';
import type { AppState } from '../../../app.state';
import type { AppEvents } from '../../../app.events';
import { AddTodoItemEvent, RemoveTodoItemEvent, RemoveTodoListEvent, UpdateTodoItemEvent } from '../../../store/todos/todo.events';
import type { TodoItem } from '../../../models/todo.model';

export const TodoMainContent: FunctionComponent = () => {
    const { todos, dispatch } = useStoreon<AppState, AppEvents>('todos');
    const { activeListId, todoLists } = todos;
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = useMemo(() => Boolean(menuAnchorEl), [menuAnchorEl]);

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
        dispatch(AddTodoItemEvent, { title, listId: activeListId });
    }, [dispatch, activeListId]);

    const handleUpdateTodoItem = useCallback((todoItem: TodoItem) => {
        dispatch(UpdateTodoItemEvent, { listId: activeListId, todoItem });
    }, [dispatch, activeListId]);

    const handleRemoveTodoItem = useCallback((id: string) => {
        dispatch(RemoveTodoItemEvent, { todoId: id, listId: activeListId });
    }, [dispatch, activeListId]);

    const handleRemoveTodoList = useCallback(() => {
        dispatch(RemoveTodoListEvent, { listId: activeListId });
    }, [dispatch, activeListId]);

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
