import { type FunctionComponent, useMemo } from 'react';
import { ListItemButton, ListItemText, ListItemIcon, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { TodoItem } from '../../../models/todo.model';

interface TodoListItemProps {
    item: TodoItem;
    handleUpdate: (todoItem: TodoItem) => void;
    handleRemove: (id: string) => void;
}

export const TodoListItem: FunctionComponent<TodoListItemProps> = ({
    item,
    handleUpdate,
    handleRemove,
}) => {
    const isCompleted = useMemo(() => {
        return item.state === 'COMPLETED';
    }, [item]);

    return <div data-testid="todo-item">
        <ListItemButton sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #bdbdbd' }}>
            <Checkbox data-testid="todo-item-checkbox" checked={isCompleted}
                onChange={() => handleUpdate({
                    ...item,
                    state: isCompleted ? 'NOT_STARTED' : 'COMPLETED',
                })} />
            <ListItemText data-testid="todo-item-title" primary={item.title} sx={{
                textDecoration: isCompleted ? 'line-through' : 'none',
            }} />
            <ListItemIcon>
                <button data-testid="delete-button"
                    onClick={() => handleRemove(item.id)}>
                    <Delete />
                </button>
            </ListItemIcon>
        </ListItemButton>
    </div>;
};
