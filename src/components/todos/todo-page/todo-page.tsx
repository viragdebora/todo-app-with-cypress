import { useStoreon } from 'storeon/react';
import { type FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import { TodoListSideBar } from '../ui/todo-list-side-bar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { TodoMainContent } from '../ui/todo-main-content';
import './todo.page.scss';
import type { AppState } from '../../../app.state';
import type { AppEvents } from '../../../app.events';
import { CreateTodoListEvent, ListIdClickedEvent } from '../../../store/todos/todo.events';

export const TodoPage: FunctionComponent = () => {
    const { todos, dispatch } = useStoreon<AppState, AppEvents>('todos');
    const { activeListId, todoLists } = todos;
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [todoListTitle, setTodoListTitle] = useState('');
    const dialogResolveRef = useRef<((value: string) => void) | null>();

    const activeIndex = useMemo(() => {
        return todoLists.findIndex(list => list.id === activeListId);
    }, [todoLists, activeListId]);

    const handleListItemClicked = useCallback((id: string) => {
        dispatch(ListIdClickedEvent, id);
    }, [dispatch]);

    const onAddTodoListClicked = useCallback(() => {
        setCreateDialogOpen(true);
        new Promise<string>(resolve => {
            dialogResolveRef.current = resolve;
        }).then((title) => {
            if (title) {
                dispatch(CreateTodoListEvent, title);
            }
        }).finally(() => {
            setCreateDialogOpen(false);
            setTodoListTitle('');
        });
    }, [todoListTitle, dialogResolveRef]);

    const handleTodoListDialogAction = useCallback((create: boolean) => {
        if (create && !todoListTitle.trim()) {
            return;
        }
        if (dialogResolveRef.current) {
            dialogResolveRef.current(create ? todoListTitle : '');
        }
    }, [dialogResolveRef, todoListTitle]);

    return <div className="todo-page">
        <Dialog data-testid="todo-dialog-box-container" open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
            <DialogTitle data-testid="todo-dialog-box-title">Create todo list</DialogTitle>
            <DialogContent>
                <DialogContentText data-testid="todo-dialog-box-text">
                    Please enter todo list title here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    data-testid="todo-dialog-box-title-field"
                    label="Todo list title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={todoListTitle}
                    onChange={e => setTodoListTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleTodoListDialogAction(false)}
                    data-testid="todo-dialog-box-cancel-button">Cancel</Button>
                <Button onClick={() => handleTodoListDialogAction(true)}
                    data-testid="todo-dialog-box-create-button">Create</Button>
            </DialogActions>
        </Dialog>
        <TodoListSideBar items={todoLists}
            activeIndex={activeIndex}
            onListItemClicked={handleListItemClicked}
            onAddTodoListClicked={onAddTodoListClicked}>
            <TodoMainContent />
        </TodoListSideBar>
    </div>;
};
