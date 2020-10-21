const schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'citizen.schema',
  type: 'object',
  title: 'Citizen',
  required: ['drugId', 'drugAmount', 'drugUnit', 'startDate', 'endDate'],
  properties: {
    id: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    drugId: {
      type: 'string',
    },
    drugAmount: {
      type: 'number',
      exclusiveMinimum: 0,
    },
    drugUnit: {
      type: 'string',
    },
    startDate: {
      type: 'string',
      format: 'date-time',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
    },
  },
  additionalProperties: false,
};

export default schema;
