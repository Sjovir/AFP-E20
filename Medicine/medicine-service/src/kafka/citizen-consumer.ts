import { Kafka } from 'kafkajs';
import { Container } from 'typedi';

import logger from '../logger';
import CitizenService from '../services/citizen-service';

const brokers = process.env.KAFKA_HOST || 'localhost';

const kafka = new Kafka({
  clientId: 'medicine-microservice',
  brokers: [`${brokers}:9092`],
});

const consumer = kafka.consumer({
  groupId: 'test-group2',
});

const TOPIC = 'citizen';
const SUCCESS_MESSAGE = `consuming kafka event on topic ${TOPIC}`;

const citizenService = Container.get(CitizenService);

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC });
  await consumer.run({
    eachMessage: async ({ topic: _topic, partition: _partition, message }) => {
      const jsonString = message.value.toString();
      const json = JSON.parse(jsonString);

      const citizen: ICitizen = json.data.citizen;

      if (citizen.id) {
        try {
          switch (json.event) {
            case 'CREATE':
              await citizenService.createCitizen(citizen);
              logger.info(SUCCESS_MESSAGE, {
                event: json.event,
                id: citizen.id,
                data: citizen,
              });

              break;
            case 'UPDATE':
              await citizenService.updateCitizen(citizen);
              logger.info(SUCCESS_MESSAGE, {
                event: json.event,
                id: citizen.id,
                data: citizen,
              });

              break;
            case 'DELETE':
              await citizenService.deleteCitizen(citizen.id);
              logger.info(SUCCESS_MESSAGE, {
                event: json.event,
                id: citizen.id,
                data: citizen,
              });

              break;
            default:
              logger.warn(
                `unknown event when consuming kafka event on topic ${TOPIC}`,
                {
                  event: json.event,
                  id: citizen.id,
                  data: citizen,
                }
              );
          }
        } catch (err) {
          logger.error(`error consuming kafka event on topic ${TOPIC}`, err);
        }
      }
    },
  });
})();

export { consumer };
