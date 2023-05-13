export type getTodoListType = {
    id: string;
    title: string;
    items: getTodoType[];
};

type getTodoType = {
    id: string;
    state: string;
    title: string;
};
