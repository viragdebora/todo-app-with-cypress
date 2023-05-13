import { Header } from './components/header/header';
import type { AppState } from './app.state';
import type { AppEvents } from './app.events';
import { useStoreon } from 'storeon/react';
import './App.css';

interface Props {
    children: any;
    logout: VoidFunction;
}

function App({ children, logout }: Props): JSX.Element {
    const { auth } = useStoreon<AppState, AppEvents>('auth');

    return (
        <div className="App">
            {
                auth.isAuthenticated &&
                <Header username={auth.username}
                    isAuthenticated={auth.isAuthenticated}
                    login={() => { }}
                    logout={logout}
                />
            }
            <div id="main-content">
                {children}
            </div>
        </div>
    );
}

export default App;
