const Bull = require('bull');

const Worker = ({ data }) => {
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;
  const queueName = 'background_jobs';

  // A queue for the jobs scheduled based on a routine without any external requests
  const backgroundJob = new Bull(queueName, { redis: { port: redisPort, host: redisHost } });

  backgroundJob.add(data)
}

module.exports = {
  Worker,
};