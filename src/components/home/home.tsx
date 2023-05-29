import { type Observable } from '../../common/observable';
import { useObservable } from '../../hooks/useObservable';
import './home.scss';

interface HomeProps {
    usernameObs: Observable<string>;
}

export function Home({ usernameObs }: HomeProps): JSX.Element {
    const username = useObservable(usernameObs);

    return <div className="home" data-testid="welcome-text">
        Welcome {username || 'unknown'}
    </div>;
}
