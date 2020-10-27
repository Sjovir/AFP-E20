import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new kafka.Producer(client);
let isReady = false;

producer.on('ready', () => {
  console.log('Producer is ready!');
  isReady = true;
});

producer.on('error', (error) => {
  console.log('[error:producer:citizen] Producer: ' + error);
  isReady = false;
});

export { producer, isReady };
