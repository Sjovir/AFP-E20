import kafka from 'kafka-node';

const CITIZEN_TOPIC = 'citizen';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

let isReady = false;

producer.on('ready', () => {
  console.log('[kafka:producer:citizen] ready!');
  isReady = true;
});

producer.on('error', (error) => {
  console.log('[error:kafka:producer:citizen] ' + error);
  isReady = false;
});

export const createCitizenEvent = (citizen: ICitizen): void => {
  if (isReady) {
    const message = {
      event: 'CREATE',
      data: {
        citizen: {
          ...citizen,
        },
      },
    };

    producer.send(
      [
        {
          topic: CITIZEN_TOPIC,
          messages: JSON.stringify(message),
          key: citizen.id,
        },
      ],
      (error, topic) => {
        if (topic) {
          console.log('[kafka:citizen:create] ' + JSON.stringify(topic));
        } else if (error) {
          console.error(
            '[error:kafka:citizen:create] ' + JSON.stringify(error)
          );
        }
      }
    );
  }
};

export const updateCitizenEvent = (citizen: ICitizen): void => {
  if (isReady) {
    const message = {
      event: 'UPDATE',
      data: {
        citizen: {
          ...citizen,
        },
      },
    };

    producer.send(
      [
        {
          topic: CITIZEN_TOPIC,
          messages: JSON.stringify(message),
          key: citizen.id,
        },
      ],
      (error, topic) => {
        if (topic) {
          console.log(
            '[kafka:producer:citizen:update] ' + JSON.stringify(topic)
          );
        } else if (error) {
          console.error(
            '[error:kafka:producer:citizen:update] ' + JSON.stringify(error)
          );
        }
      }
    );
  }
};

export const deleteCitizenEvent = (citizenUUID: string): void => {
  if (isReady) {
    const message = {
      event: 'DELETE',
      data: {
        citizen: {
          id: citizenUUID,
        },
      },
    };

    producer.send(
      [
        {
          topic: CITIZEN_TOPIC,
          messages: JSON.stringify(message),
          key: citizenUUID,
        },
      ],
      (error, topic) => {
        if (topic) {
          console.log('[kafka:citizen:delete] ' + JSON.stringify(topic));
        } else if (error) {
          console.error(
            '[error:kafka:citizen:delete] ' + JSON.stringify(error)
          );
        }
      }
    );
  }
};

export { producer, isReady };
