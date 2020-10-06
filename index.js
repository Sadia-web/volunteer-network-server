const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmdyz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(cors());
app.use(bodyParser.json());



const app = express()
const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const workCollection = client.db("volunteerTeam").collection("works");

  console.log('Database connected!');

  app.post("/registeredEvent", (req, res) => {
      const selectedEvent = req.body;
      console.log(selectedEvent);
  })


 
  app.post("/addWorks", (req, res) => {
      const work = req.body;
      eventCollection.insertMany(work)
          .then(result => {
              console.log(result.insertedCount);
              res.send(result.insertedCount)
          })
  })

  app.get("/works", (req, res) => {
      eventCollection.find({})
          .toArray((err, documents) => {
              res.send(documents)
          })
  })

  app.get("/works/:_id", (req, res) => {
      eventCollection.find({ _id: ObjectId(req.params._id) })
          .toArray((err, documents) => {
              res.send(documents[0])
          })
  })


});


app.get('/', (req, res) => {
  res.send('Successfully works!')
})

app.listen(process.env.PORT || port)