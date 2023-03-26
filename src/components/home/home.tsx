import { useStoreon } from 'storeon/react';
import './home.scss';

export function Home() {
    const { auth } = useStoreon('auth');

    return <div className="home" data-testid="welcome-text">
        Welcome {auth.username || 'unknown'}
    </div>;
}
