import express from 'express'
import bodyParser from 'body-parser'
import {consumer} from './queues/email.queue'
const app = express()

app.use(bodyParser.json())


 consumer();
app.post('/send-email', (req, res) => {
    
    res.send({status: 'ok'});
})

app.get("/send-email", (req, res) => {
    const data = {
        from: 'test@mail.com',
        to: "tester@mail.com",
        subject: "Hello from Test server",
        html: '<h2> testing this app</h2>'
    }
   
  res.send({ status: "ok" });
});

app.listen(5000, () => console.log("App running on port 5000"))