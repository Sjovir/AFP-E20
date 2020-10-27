import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

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

consumer.on('message', (data) => {
  console.log('[consumer:citizen] ' + data);
});

consumer.on('error', (error) => {
  console.log('[error:consumer:citizen] Consumer: ' + error);
});

export { consumer };
