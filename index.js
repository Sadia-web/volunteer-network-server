const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmdyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


const app = express()
const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const workCollection = client.db("volunteerTeam").collection("works");

  app.post('/addWork', (req, res) => {
      const work = req.body;
      workCollection.insertMany(work)
      .then(result => {
          res.send(result.insertedCount)
      })
  })

  app.post("/registeredEvent", (req, res) => {
      const latestEvent = req.body;
      RegisteredEventCollection.insertOne(latestEvent)
      .then(result => {
        res.send(result.insertedCount > 0)
      })

  })

  app.get('/' , (req, res) => {
    res.send("ready to Work")
  })

  app.get('/work', (req, res) => {
    workCollection.find({})
    .toArray((err, documents) => {
        res.send(documents);
    })
  })

  app.get('/registeredEvent', (req, res) => {
    RegisteredEventCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    RegisteredEventCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      console.log(result);
      res.send(result.deletedCount > 0);
    })
})
     

  });


app.listen(process.env.PORT || port)