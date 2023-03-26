import { Header } from './components/header/header';
import { AppState } from './app.state';
import { AppEvents } from './app.events';
import { useStoreon } from 'storeon/react';
import './App.css';

interface Props {
  children: any;
}

function App({ children }: Props) {
  const { auth } = useStoreon<AppState, AppEvents>('auth');

  return (
    <div className="App">
      {
        auth.isAuthenticated &&
        <Header username={auth.username}
          isAuthenticated={auth.isAuthenticated}
          login={() => {}}
          logout={() => {}}
        />
      }
      <div id="main-content">
        {children}
      </div>
    </div>
  )
}

export default App;
