import kafka from './kafka-client';

import logger from '../logger';

const producer = kafka.producer();

(async () => {
  await producer.connect();
})();

const CITIZEN_TOPIC = 'citizen';
const SUCCESS_MESSAGE = `citizen event has been sent to kafka topic: ${CITIZEN_TOPIC}`;
const ERROR_MESSAGE = `error occurred when trying to send citizen event to kafka topic: ${CITIZEN_TOPIC}`;

export const createCitizenEvent = async (citizen: ICitizen): Promise<void> => {
  const message = {
    event: 'CREATE',
    data: {
      citizen: {
        ...citizen,
      },
    },
  };

  try {
    const result = await producer.send({
      topic: CITIZEN_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });

    logger.info(SUCCESS_MESSAGE, {
      event: message.event,
      id: citizen.id,
      data: message.data,
      result: result,
    });
  } catch (err) {
    logger.error(ERROR_MESSAGE, {
      event: message.event,
      id: citizen.id,
      data: message.data,
    });
  }
};

export const updateCitizenEvent = async (citizen: ICitizen): Promise<void> => {
  const message = {
    event: 'UPDATE',
    data: {
      citizen: {
        ...citizen,
      },
    },
  };

  try {
    const result = await producer.send({
      topic: CITIZEN_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });

    logger.info(SUCCESS_MESSAGE, {
      event: message.event,
      id: citizen.id,
      data: message.data,
      result: result,
    });
  } catch (err) {
    logger.error(ERROR_MESSAGE, {
      event: message.event,
      id: citizen.id,
      data: message.data,
    });
  }
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

  try {
    const result = await producer.send({
      topic: CITIZEN_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });

    logger.info(SUCCESS_MESSAGE, {
      event: message.event,
      id: citizenUUID,
      data: message.data,
      result: result,
    });
  } catch (err) {
    logger.error(ERROR_MESSAGE, {
      event: message.event,
      id: citizenUUID,
      data: message.data,
    });
  }
};

export { producer };
