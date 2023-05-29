import { type FunctionComponent } from 'react';
import { useLoaderData } from 'react-router-dom';

export const LazyComponent: FunctionComponent = () => {
    const { Component } = useLoaderData() as { Component: FunctionComponent; };

    return <Component />;
};
