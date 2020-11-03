import { Kafka } from 'kafkajs';
import { Container } from 'typedi';
import CitizenService from '../services/citizen-service';

const kafka = new Kafka({
  clientId: 'medicine-microservice',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({
  groupId: 'test-group2',
});

const citizenService = Container.get(CitizenService);

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'citizen' });
  await consumer.run({
    eachMessage: async ({ topic: _topic, partition: _partition, message }) => {
      const jsonString = message.value.toString();
      const json = JSON.parse(jsonString);

      const citizen: ICitizen = json.data.citizen;

      console.log('[kafka:consumer:citizen] ' + citizen.id);

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
    },
  });
})();

export { consumer };
