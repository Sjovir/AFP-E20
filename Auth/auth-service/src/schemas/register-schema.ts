const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'register',
    type: 'object',
    title: 'register schema',
    required: ['firstName', 'lastName', 'cpr', 'username', 'password'],
    properties: {
        firstName: {
            type: 'string',
            minLength: 2,
        },
        lastName: {
            type: 'string',
            minLength: 2,
        },
        cpr: {
            type: 'string',
            pattern: '^[0-9]*$',
            minLength: 10,
            maxlength: 10,
        },
        username: {
            type: 'string',
            minLength: 4,
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
    additionalProperties: false,
};

export default schema;
