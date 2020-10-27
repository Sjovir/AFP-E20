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
  if (typeof data.value === 'string') {
    const json = JSON.parse(data.value);

    // if (json.event === 'UPDATE') {}
  }

  console.log('[consumer:citizen] ' + data);
});

consumer.on('error', (error) => {
  console.log('[error:consumer:citizen] Consumer: ' + error);
});

export { consumer };
