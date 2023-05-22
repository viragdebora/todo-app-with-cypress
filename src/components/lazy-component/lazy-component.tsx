import { FunctionComponent } from 'react';
import { useLoaderData } from 'react-router-dom';

export const LazyComponent = () => {
    const { Component } = useLoaderData() as { Component: FunctionComponent };

    return <Component />;
};
