import kafka from 'kafka-node';
import { Container } from 'typedi';
import CitizenService from '../services/citizen-service';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const citizenService = Container.get(CitizenService);

const consumer = new kafka.Consumer(
  client,
  [
    {
      topic: 'citizen',
    },
  ],
  {
    autoCommit: true,
  }
);

consumer.on('message', async (data) => {
  const jsonString = data.value as string;
  const json = JSON.parse(jsonString);

  const citizen: ICitizen = json.data.citizen;

  if (citizen.id) {
    switch (json.event) {
      case 'CREATE':
        await citizenService.createCitizen(citizen);
        break;
      case 'UPDATE':
        await citizenService.updateCitizen(citizen);
        break;
      case 'DELETE':
        await citizenService.deleteCitizen(citizen.id);
        break;
    }
  }
});

consumer.on('error', (error) => {
  console.error('[error:kafka:consumer:citizen] ' + error);
});

export { consumer };
