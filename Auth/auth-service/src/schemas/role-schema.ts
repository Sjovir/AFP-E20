const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'role.schema',
    type: 'object',
    title: 'Role',
    required: ['title'],
    properties: {
        title: {
            type: 'string',
            minLength: 2,
        },
    },
    additionalProperties: false,
};

export default schema;
