import { Kafka } from 'kafkajs';

const brokers = process.env.KAFKA_HOST || 'localhost';

const kafka = new Kafka({
  clientId: 'bosted-microservice',
  brokers: [`${brokers}:9092`],
});

export default kafka;
