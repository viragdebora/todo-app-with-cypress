import { FunctionComponent } from 'react';
import { List } from '@mui/material';
import { TodoListItem } from './todo-list-item';
import { TodoItem } from '../../../models/todo.model';

interface TodoListProps {
    items: Array<TodoItem>;
    handleUpdate: (item: TodoItem) => void;
    handleRemove: (id: string) => void;
}

export const TodoList: FunctionComponent<TodoListProps> = ({
    items,
    handleUpdate,
    handleRemove,
}) => {
    return <div>
        <List
            sx={{ width: '100%' }}
        >
            {items.map(item => <TodoListItem key={item.id}
                item={item}
                handleUpdate={handleUpdate}
                handleRemove={handleRemove} />)}
        </List>
    </div>
};
