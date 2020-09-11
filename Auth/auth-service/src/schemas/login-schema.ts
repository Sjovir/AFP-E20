const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'login',
    type: 'object',
    title: 'login schema',
    required: ['password'],
    properties: {
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
    oneOf: [{ required: ['cpr'] }, { required: ['username'] }],
    additionalProperties: false,
};

export default schema;
