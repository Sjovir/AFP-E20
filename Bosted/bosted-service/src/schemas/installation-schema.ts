const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'installation.schema',
    type: 'object',
    title: 'Installation',
    required: ['name', 'address'],
    properties: {
        name: {
            type: 'string',
            minLength: 2,
        },
        address: {
            type: 'string',
            minLength: 2,
        },
    },
    additionalProperties: false,
};

export default schema;
