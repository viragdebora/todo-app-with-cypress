export const todoItemSchema = {
    type: 'object',
    require: ['id', 'state', 'title'],
    properties: {
        id: { type: 'string' },
        state: { enum: ['NOT_STARTED', 'COMPLETED'] },
        title: { type: 'string' },
    },
};

export const todoListSchema = {
    type: 'object',
    require: ['id', 'title', 'items'],
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        items: {
            type: 'array',
            items: todoItemSchema,
        },
    },
};
