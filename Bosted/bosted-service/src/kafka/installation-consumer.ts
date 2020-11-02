import { Kafka } from 'kafkajs';
import { Container } from 'typedi';

import InstallationService from '../services/installation-service';

const kafka = new Kafka({
  clientId: 'auth-microservice',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer();

const installationService = Container.get(InstallationService);

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'installation' });
  await consumer.run({
    eachMessage: async ({ topic: _topic, partition: _partition, message }) => {
      const jsonString = message.value.toString();
      const json = JSON.parse(jsonString);

      const installation: IInstallation = json.data.installation;

      console.log('[kafka:consumer:installation] ' + installation.id);

      if (installation.id) {
        switch (json.event) {
          case 'CREATE':
            await installationService.createInstallation(installation);

            break;
          case 'UPDATE':
            await installationService.updateInstallation(installation);

            break;
          case 'DELETE':
            await installationService.deleteInstallation(installation.id);

            break;
        }
      }
    },
  });
})();

export { consumer };
