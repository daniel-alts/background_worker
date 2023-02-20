const Bull = require('bull');

const Worker = () => {
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;
  const queueName = 'background_jobs';

  // A queue for the jobs scheduled based on a routine without any external requests
  const backgroundJob = new Bull(queueName, { redis: { port: redisPort, host: redisHost } });

  const start = () => {
    backgroundJob.process(function (job, done) {
      const jobData = job.data;
      done(null);
    });
  
    backgroundJob.on('completed', function (job, result) {
      const jobData = job.data;
      console.log(`job ${jobData.jobId} completed with result: ${JSON.stringify(result)}`)
    })
  
    backgroundJob.isReady().then(() => {
        console.log('Ready to accept jobs')
    })
  }
 

  return {
    process: ({ data, opts}) => backgroundJob.add(data, opts), 
    start,
  }
}

module.exports = {
  Worker,
};