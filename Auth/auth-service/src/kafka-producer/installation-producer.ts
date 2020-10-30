import kafka from 'kafka-node';

const INSTALLATION_TOPIC = 'installation';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

let isReady = false;

producer.on('ready', () => {
  console.log('[kafka:producer:installation] ready!');
  isReady = true;
});

producer.on('error', (error) => {
  console.log('[error:kafka:producer:installation] ' + error);
  isReady = false;
});

export const createInstallationEvent = (installation: IInstallation): void => {
  if (isReady) {
    const message = {
      event: 'CREATE',
      data: {
        installation: {
          ...installation,
        },
      },
    };

    console.log('[kafka:producer:installation] ' + installation.id);

    producer.send(
      [
        {
          topic: INSTALLATION_TOPIC,
          messages: JSON.stringify(message),
          key: installation.id,
        },
      ],
      (error, topic) => {
        if (topic) {
          console.log(
            '[kafka:producer:installation:create] ' + JSON.stringify(topic)
          );
        } else if (error) {
          console.error(
            '[error:kafka:producer:installation:create] ' +
              JSON.stringify(error)
          );
        }
      }
    );
  }
};

export const updateInstallationEvent = (installation: IInstallation): void => {
  if (isReady) {
    const message = {
      event: 'UPDATE',
      data: {
        installation: {
          ...installation,
        },
      },
    };

    producer.send(
      [
        {
          topic: INSTALLATION_TOPIC,
          messages: JSON.stringify(message),
          key: installation.id,
        },
      ],
      (error, topic) => {
        if (topic) {
          console.log(
            '[kafka:producer:installation:update] ' + JSON.stringify(topic)
          );
        } else if (error) {
          console.error(
            '[error:kafka:producer:installation:update] ' +
              JSON.stringify(error)
          );
        }
      }
    );
  }
};

export const deleteInstallationEvent = (installationUUID: string): void => {
  if (isReady) {
    const message = {
      event: 'DELETE',
      data: {
        installation: {
          id: installationUUID,
        },
      },
    };

    producer.send(
      [
        {
          topic: INSTALLATION_TOPIC,
          messages: JSON.stringify(message),
          key: installationUUID,
        },
      ],
      (error, topic) => {
        if (topic) {
          console.log(
            '[kafka:producer:installation:delete] ' + JSON.stringify(topic)
          );
        } else if (error) {
          console.error(
            '[error:kafka:producer:installation:delete] ' +
              JSON.stringify(error)
          );
        }
      }
    );
  }
};

export { producer, isReady };
