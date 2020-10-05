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

  app.post("/registeredEvent", (req,res) => {
    const latestEvent = req.body;
    console.log(latestEvent);
  })

  app.post("/addWorks", (req, res) =>{
    const work = req.body;
    workCollection.insertMany(work)
    .then(result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount)
    })
  })


  app.get('/', (req, res) =>{
    res.send('ready to use')
  })

  app.get("/works/:_id", (req, res) =>{
    workCollection.find({_id: ObjectID(req.params._id)})
    .toArray((err, documents) => {
      res.sendDate(documents[0])
    })
  })

  });

 


app.listen(process.env.PORT || port)