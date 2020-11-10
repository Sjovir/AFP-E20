import { Kafka } from 'kafkajs';

import logger from '../logger';

const brokers = process.env.KAFKA_HOST || 'localhost';
const kafka = new Kafka({
  clientId: 'auth-microservice',
  brokers: [`${brokers}:9092`],
});

const producer = kafka.producer();

(async () => {
  await producer.connect();
})();

const INSTALLATION_TOPIC = 'installation';
const SUCCESS_MESSAGE = `citizen event has been sent to kafka topic: ${INSTALLATION_TOPIC}`;
const ERROR_MESSAGE = `error occurred when trying to send citizen event to kafka topic: ${INSTALLATION_TOPIC}`;

export const createInstallationEvent = async (
  installation: IInstallation
): Promise<void> => {
  const message = {
    event: 'CREATE',
    data: {
      installation: {
        ...installation,
      },
    },
  };

  try {
    const result = await producer.send({
      topic: INSTALLATION_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });

    logger.info(SUCCESS_MESSAGE, {
      event: message.event,
      id: installation.id,
      data: message.data,
      result: result,
    });
  } catch (err) {
    logger.error(ERROR_MESSAGE, {
      event: message.event,
      id: installation.id,
      data: message.data,
    });
  }
};

export const updateInstallationEvent = async (
  installation: IInstallation
): Promise<void> => {
  const message = {
    event: 'UPDATE',
    data: {
      installation: {
        ...installation,
      },
    },
  };

  try {
    const result = await producer.send({
      topic: INSTALLATION_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });

    logger.info(SUCCESS_MESSAGE, {
      event: message.event,
      id: installation.id,
      data: message.data,
      result: result,
    });
  } catch (err) {
    logger.error(ERROR_MESSAGE, {
      event: message.event,
      id: installation.id,
      data: message.data,
    });
  }
};

export const deleteInstallationEvent = async (
  installationUUID: string
): Promise<void> => {
  const message = {
    event: 'DELETE',
    data: {
      installation: {
        id: installationUUID,
      },
    },
  };

  try {
    const result = await producer.send({
      topic: INSTALLATION_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });

    logger.info(SUCCESS_MESSAGE, {
      event: message.event,
      id: installationUUID,
      data: message.data,
      result: result,
    });
  } catch (err) {
    logger.error(ERROR_MESSAGE, {
      event: message.event,
      id: installationUUID,
      data: message.data,
    });
  }
};

export { producer };
