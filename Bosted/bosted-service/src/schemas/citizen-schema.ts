const schema = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'citizen.schema',
    type: 'object',
    title: 'Citizen',
    required: ['firstName', 'lastName', 'cpr'],
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
            minLength: 10,
            maxLength: 10,
            pattern: '^[0-9]+$',
        },
        id: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        }
    },
    additionalProperties: false,
};

export default schema;
