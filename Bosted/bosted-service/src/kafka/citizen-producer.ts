import kafka from './kafka-client';

const producer = kafka.producer();

(async () => {
  await producer.connect();
})();

const CITIZEN_TOPIC = 'citizen';

export const createCitizenEvent = async (citizen: ICitizen): Promise<void> => {
  const message = {
    event: 'CREATE',
    data: {
      citizen: {
        ...citizen,
      },
    },
  };

  const result = await producer.send({
    topic: CITIZEN_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log('[kafka:producer:citizen:create] ' + JSON.stringify(result));
};

export const updateCitizenEvent = async (citizen: ICitizen): Promise<void> => {
  const message = {
    event: 'CREATE',
    data: {
      citizen: {
        ...citizen,
      },
    },
  };

  const result = await producer.send({
    topic: CITIZEN_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log('[kafka:producer:citizen:update] ' + JSON.stringify(result));
};

export const deleteCitizenEvent = async (
  citizenUUID: string
): Promise<void> => {
  const message = {
    event: 'DELETE',
    data: {
      Citizen: {
        id: citizenUUID,
      },
    },
  };

  const result = await producer.send({
    topic: CITIZEN_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log('[kafka:producer:citizen:delete] ' + JSON.stringify(result));
};

export { producer };
