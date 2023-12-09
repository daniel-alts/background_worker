const { Worker } = require('./queue.worker');
const SendEmail = require('./email.worker');

Worker().listenToQueue({
    SendEmail,
})
