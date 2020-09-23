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
    },
    additionalProperties: false,
};

export default schema;
