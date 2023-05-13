import React from 'react';
import {
    Drawer,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
} from '@mui/material';
import './todo-list-side-bar.scss';
import { Add } from '@mui/icons-material';
import type { TodoList } from '../../../models/todo.model';

const drawerWidth = 240;

interface TodoListSideBarProps {
    items: TodoList[];
    activeIndex: number;
    onListItemClicked: (id: string) => void;
    onAddTodoListClicked: () => void;
}

export const TodoListSideBar: React.FunctionComponent<TodoListSideBarProps & React.PropsWithChildren> = ({
    children,
    items,
    activeIndex,
    onListItemClicked,
    onAddTodoListClicked,
}) => {
    return <div className="todo-list-side-bar">
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'static',
                },
            }}
            data-testid="side-bar"
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                {items.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton data-testid="todo-list" selected={activeIndex === index}
                            onClick={() => onListItemClicked(item.id)} sx={{
                                wordBreak: 'break-all',
                                display: '-webkit-box',
                                lineClamp: '1',
                                overflow: 'hidden',
                                boxOrient: 'vertical',
                            }}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem>
                    <Button variant="contained"
                        data-testid="add-list-button"
                        endIcon={<Add />}
                        onClick={onAddTodoListClicked}>
                        Add list
                    </Button>
                </ListItem>
            </List>
        </Drawer>
        <div className="todo-list-content">
            {children}
        </div>
    </div >;
};
