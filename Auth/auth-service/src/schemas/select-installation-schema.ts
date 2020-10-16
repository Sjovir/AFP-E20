const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'select-installation',
    type: 'object',
    title: 'select installation schema',
    required: ['installationId', 'tokens'],
    properties: {
        installationId: {
            type: 'string',
            minLength: 36,
            maxlength: 36,
        },
        tokens: {
            type: 'object',
            properties: {
                accessToken: {
                    type: 'string',
                    minLength: 2,
                },
                refreshToken: {
                    type: 'string',
                    minLength: 2,
                },
            }
        },
    },
    additionalProperties: false,
};

export default schema;