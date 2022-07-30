import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => {
  const { RABBITMQ_PORT, RABBITMQ_HOST, RABBITMQ_USER, RABBITMQ_PASSWORD } =
    process.env;
  return {
    port: parseInt(RABBITMQ_PORT, 10),
    host: RABBITMQ_HOST,
    user: RABBITMQ_USER,
    password: RABBITMQ_PASSWORD,
    url: `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
    queue: 'user-management-messages'
  };
});
