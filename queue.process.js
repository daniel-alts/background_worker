const Bull = require('bull');

const Worker = () => {
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;
  const queueName = 'background_jobs';

  // A queue for the jobs scheduled based on a routine without any external requests
  const backgroundJob = new Bull(queueName, { redis: { port: redisPort, host: redisHost } });


 const addToQueue = (data, opts) => {
    console.log('adding to queue')
    console.log(backgroundJob)
    backgroundJob.add(data, opts)
 }

  return {
    process: ({ data, opts}) => addToQueue(data, opts), 
  }
}

module.exports = {
  Worker,
};