import { FunctionComponent, useState, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import './add-todo-item.scss';

interface AddTodoItemProps {
    handleAddTodo: (title: string) => void;
}

export const AddTodoItem: FunctionComponent<AddTodoItemProps> = ({
    handleAddTodo
}) => {
    const [title, setTitle] = useState('');

    const submitTodo = useCallback(() => {
        if (!title.trim()) {
            return;
        }

        handleAddTodo(title.trim());
        setTitle('');
    }, [title, setTitle]);

    return <div className="add-todo-container">
        <TextField id="outlined-basic"
            data-testid="add-todo-item-input-field"
            label="Todo title"
            variant="outlined"
            size="small"
            autoComplete="off"
            sx={{
                flexGrow: '1'
            }}
            onKeyUp={e => {
                if (e.key === 'Enter') {
                    submitTodo();
                }
            }}
            value={title}
            onChange={e => setTitle(e.target.value)} />
        <Button variant="contained"
            data-testid="add-todo-item-button"
            size="large"
            onClick={submitTodo}
            sx={{
                marginLeft: '1rem'
            }}>Add</Button>
    </div>
};
