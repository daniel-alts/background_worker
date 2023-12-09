const express = require('express');
const { Worker } = require('./queue.process');
const PORT = 4000;

const app = express();

app.post('/email', (req, res) => {
   
    Worker().process({ data: {
        jobName: 'SendEmail', 
        email: 'somemail@mail.com', 
        jobId: Math.random() * 10000} 
    });

    return res.json({ status: true, message: 'mail sent'})
})


app.listen(PORT, () => console.log('Listening on port', PORT))
