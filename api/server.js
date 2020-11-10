const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors');

var corsOptions = {
    origin: '*',
  };
app.use(cors(corsOptions));


// require('errorScript.js');
// res.render(view, locals);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
console.log("MongoDB Connected...");
});

const quotesCollection = db.collection('quotes');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results);
    //   res.render('/views/index.ejs', { quotes: results });
      res.sendFile(__dirname + '/index.html');
    })
    .catch(error => console.error(error))
  })

//   app.post('/quotes', (req, res) => {
//     console.log(req.body);
//   })

  app.post('/quotes', cors(corsOptions), async (req, res) => {
    await quotesCollection.insertOne(req.body)
    res.send(JSON.stringify({success:true}));
  })

  app.listen(3000, function() {
    console.log('listening on 3000');
  })
