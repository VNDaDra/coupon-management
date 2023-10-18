export const configuration = () => ({
   rabbitmq: {
      url: process.env.RABBIT_MQ_URL,
      queue: process.env.RABBIT_MQ_QUEUE,
   },
   mongo: {
      uri: process.env.MONGO_URI,
   },
});
