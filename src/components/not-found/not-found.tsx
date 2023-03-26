import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './not-found.scss';

export function NotFound() {
    return <Container className="not-found-page">
        <Typography data-testid="not-found-page-status" variant="h1">
            404
        </Typography>
        <Typography data-testid="not-found-page-message" variant="h6">
            The page you're looking for doesn't exist.
        </Typography>
        <Link to="/">
            <Button data-testid="not-found-page-button" variant="contained">Back Home</Button>
        </Link>
    </Container>;
}
