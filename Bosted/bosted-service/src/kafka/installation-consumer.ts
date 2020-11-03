import kafka from './kafka-client';
import { Container } from 'typedi';

import InstallationService from '../services/installation-service';

const consumer = kafka.consumer({
  groupId: 'test-group',
});

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
