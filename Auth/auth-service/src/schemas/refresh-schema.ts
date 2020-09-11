const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'refresh',
    type: 'object',
    title: 'refresh schema',
    required: ['accessToken', 'refreshToken'],
    properties: {
        accessToken: {
            type: 'string',
            minLength: 2,
        },
        refreshToken: {
            type: 'string',
            minLength: 2,
        },
    },
    additionalProperties: false,
};

export default schema;
