import { Header } from './components/header/header';
import { useContext } from 'react';
import { AuthContext } from './modules/auth/auth-context';
import { useObservable } from './hooks/useObservable';
import './App.css';

interface Props {
    children: any;
    logout: VoidFunction;
}

function App({ children, logout }: Props): JSX.Element {
    const { authModel } = useContext(AuthContext);
    const username = useObservable(authModel.username);
    const isAuthenticated = useObservable(authModel.isAuthenticated);

    return (
        <div className="App">
            {
                isAuthenticated &&
                <Header username={username}
                    isAuthenticated={isAuthenticated}
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
