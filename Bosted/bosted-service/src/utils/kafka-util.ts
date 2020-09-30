import Kafka from 'node-rdkafka';

const producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    dr_cb: true,
});

producer.on('ready', () => {
    console.log('Producer is ready!');
});

const consumer = new Kafka.KafkaConsumer(
    {
        'group.id': '1',
        'metadata.broker.list': 'localhost:9092',
    },
    {}
);

consumer
    .on('ready', () => {
        consumer.subscribe(['citizen']);

        consumer.consume();
    })
    .on('data', (data) => {
        console.log(data);
        console.log(Buffer.from(data.value).toString());
    });

/* EXAMPLE FOR PRODUCE
try {
    producer.produce(
        'citizen',
        -1,
        Buffer.from('Test'),
        'c8122cea-9aa1-435a-a986-c7e6e68be3ab',
        Date.now()
    );

    producer.poll();
} catch (err) {
    console.error('Could not send message!');
    console.error(err);
}
*/

export { producer, consumer };
