import kafka from 'kafka-node';
import { Container } from 'typedi';
import InstallationService from '../services/installation-service';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const installationService = Container.get(InstallationService);

const consumer = new kafka.Consumer(
  client,
  [
    {
      topic: 'installation',
    },
  ],
  {
    autoCommitIntervalMs: 8000,
    autoCommit: true,
  }
);

consumer.on('message', (data) => {
  const jsonString = data.value as string;
  const json = JSON.parse(jsonString);

  const installation: IInstallation = json.data.installation;

  console.log('[kafka:consumer:installation] ' + installation.id);

  if (installation.id) {
    switch (json.event) {
      case 'CREATE':
        installationService
          .createInstallation(installation)
          .then(() => {
            console.log('SUCCESS!!!!');
          })
          .catch(() => {
            console.error('FAILED!!!!');
          });

        break;
      case 'UPDATE':
        // await installationService
        //   .updateInstallation(installation)
        //   .then(() => {
        //     console.log('[kafka:consumer:installation:update] success.');
        //   })
        //   .catch((rej) => {
        //     console.error(rej);
        //   });

        break;
      case 'DELETE':
        // await installationService
        //   .deleteInstallation(installation.id)
        //   .then(() => {
        //     console.log('[kafka:consumer:installation:delete] success.');
        //   })
        //   .catch((rej) => {
        //     console.error(rej);
        //   });

        break;
    }
  }
});

consumer.on('error', (error) => {
  console.error('[error:kafka:consumer:installation] ' + error);
});

export { consumer };
