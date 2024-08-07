const Bull = require('bull');

const Worker = ({ data }) => {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;
  const queueName = 'background_jobs';

  // A queue for the jobs scheduled based on a routine without any external requests
  const backgroundJob = new Bull(queueName, { redis: redisUrl });

  backgroundJob.add(data) // adds data to queue
}

module.exports = {
  Worker,
};
