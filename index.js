const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmdyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(bodyParser.json());
app.use(cors());


const app = express()
const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const workCollection = client.db("volunteerTeam").collection("works");

  app.post('/addWork', (req, res) => {
      const work = req.body;
      workCollection.insertOne(work)
      .then(result => {
          console.log(result)
      })
  })
  
});


app.listen(port)