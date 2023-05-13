import { useStoreon } from 'storeon/react';
import './home.scss';

export function Home(): JSX.Element {
    const { auth } = useStoreon('auth');

    return <div className="home" data-testid="welcome-text">
        Welcome {auth.username || 'unknown'}
    </div>;
}
