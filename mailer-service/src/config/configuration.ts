export const configuration = () => ({
  rabbitmq: {
    url: process.env.RABBIT_MQ_URL,
    queue: process.env.MAILER_QUEUE_NAME
  },
  aws: {
    domain: process.env.AWS_DOMAIN,
    region: process.env.AWS_REGION,
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
  }
});
