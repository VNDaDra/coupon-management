export const configuration = () => ({
   http: {
      port: parseInt(process.env.API_GATEWAY_PORT, 10),
   },
   rabbitMq: {
      url: process.env.RABBIT_MQ_URL,
      couponServiceQueue: process.env.COUPON_SERVICE_QUEUE,
      mailerServiceQueue: process.env.MAILER_SERVICE_QUEUE,
   },
});
