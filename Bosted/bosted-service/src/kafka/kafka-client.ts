import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'bosted-microservice',
  brokers: ['localhost:9092'],
});

export default kafka;
