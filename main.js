const express = require('express');
const { Worker } = require('./queue.process');
const PORT = 4000;

const app = express();

app.post('/user', (req, res) => {

    // userModel.create(req.body)

    const data = {
        jobId: Math.random() * 10000,
        jobName: 'SendEmail', 
        email: 'somemail@mail.com', // req.body.email 
    }
   
    Worker({ data }); // creates data in queue

    return res.json({ status: true, message: 'user created successfully'})
})


app.listen(PORT, () => console.log('Listening on port', PORT))
