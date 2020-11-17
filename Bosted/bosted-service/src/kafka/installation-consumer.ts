import kafka from './kafka-client';
import { Container } from 'typedi';

import logger from '../logger';
import ExistsError from '../errors/exists-error';
import ForeignKeyError from '../errors/foreignkey-error';
import InstallationService from '../services/installation-service';

const consumer = kafka.consumer({
  groupId: 'test-group',
});

const TOPIC = 'installation';
const SUCCESS_MESSAGE = `consuming kafka event on topic ${TOPIC}`;

const installationService = Container.get(InstallationService);

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC });
  await consumer.run({
    eachMessage: async ({ topic: _topic, partition: _partition, message }) => {
      const jsonString = message.value.toString();
      const json = JSON.parse(jsonString);

      const installation: IInstallation = json.data.installation;

      if (installation.id) {
        try {
          switch (json.event) {
            case 'CREATE':
              await installationService.createInstallation(installation);
              logger.info(SUCCESS_MESSAGE, {
                event: json.event,
                id: installation.id,
                data: installation,
              });

              break;
            case 'UPDATE':
              await installationService.updateInstallation(installation);
              logger.info(SUCCESS_MESSAGE, {
                event: json.event,
                id: installation.id,
                data: installation,
              });

              break;
            case 'DELETE':
              await installationService.deleteInstallation(installation.id);
              logger.info(SUCCESS_MESSAGE, {
                event: json.event,
                id: installation.id,
                data: installation,
              });

              break;
            default:
              logger.warn(
                `unknown event when consuming kafka event on topic ${TOPIC}`,
                {
                  event: json.event,
                  id: installation.id,
                  data: installation,
                }
              );
          }
        } catch (err) {
          if (err instanceof ExistsError) {
            logger.error(
              `exists error consuming kafka event on topic ${TOPIC}`,
              err
            );
          } else if (err instanceof ForeignKeyError) {
            logger.error(
              `foreign key error consuming kafka event on topic ${TOPIC}`,
              err
            );
          } else {
            logger.error(`error consuming kafka event on topic ${TOPIC}`, err);
          }
        }
      }
    },
  });
})();

export { consumer };
