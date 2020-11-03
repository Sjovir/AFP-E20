import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-microservice',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

(async () => {
  await producer.connect();
})();

const INSTALLATION_TOPIC = 'installation';

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

  const result = await producer.send({
    topic: INSTALLATION_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log('[kafka:producer:installation:create] ' + installation.id);
  console.log('[kafka:producer:installation:create] ' + JSON.stringify(result));
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

  const result = await producer.send({
    topic: INSTALLATION_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log('[kafka:producer:installation:update] ' + JSON.stringify(result));
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

  const result = await producer.send({
    topic: INSTALLATION_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });

  console.log('[kafka:producer:installation:delete] ' + JSON.stringify(result));
};

export { producer };
