const Bull = require('bull');
const SendEmail = require('./email.worker');

const Worker = () => {
  const redisHost = process.env.REDIS_HOST || '127.0.0.1';
  const redisPort = process.env.REDIS_PORT || 6379;
  const queueName = 'background_jobs';

  // A queue for the jobs scheduled based on a routine without any external requests
  const backgroundJob = new Bull(queueName, { redis: { port: redisPort, host: redisHost } });

  const listenToQueue = (jobs) => {
    backgroundJob.process(function (job, done) {

    switch(job.data.jobName) {
        case 'SendEmail':
            console.log('processing send email job')
            jobs[job.data.jobName](job.data);
            done(null);
            break;
        case 'SendWelcomeEmail':
          console.log('processing send email job')
          jobs[job.data.jobName](job.data);
          done(null);
          break;
        case 'SendSMS':
            console.log('processing send sms job')
            jobs[job.data.jobName](job.data);
            done(null);
            break;
        default:
            console.log('No job found')
    }
 
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
    listenToQueue,
  }
}

module.exports = {
  Worker,
};