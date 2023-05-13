import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import './header.scss';

interface HeaderProps {
    username: string;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export function Header({
    username,
    isAuthenticated,
    login,
    logout,
}: HeaderProps): JSX.Element {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }, []);

    const handleCloseUserMenu = React.useCallback(() => {
        setAnchorElUser(null);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar data-testid="header-container" position="static">
                <Toolbar>
                    <Box sx={{
                        flexGrow: 1,
                    }}>
                        <Button data-testid="home-page-header-button" color="inherit">
                            <Link to="/">
                                Home
                            </Link>
                        </Button>
                        <Button data-testid="todos-page-header-button"color="inherit">
                            <Link to="/todos">
                                Todos
                            </Link>
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                // sx={{ p: 0 }}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                data-testid="avatar-button"
                                color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem data-testid="header-logout-button" onClick={() => {
                                handleCloseUserMenu();
                                logout();
                            }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* {
                        isAuthenticated
                            ? <>
                                <Typography data-testid="header-user-name" variant="h6">{username}</Typography>
                                <Button data-testid="header-logout-button" color="inherit" onClick={logout}>Logout</Button>
                            </>
                            : <Button color="inherit" onClick={login}>Login</Button>
                    } */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
