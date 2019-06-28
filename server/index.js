const express = require('express');
let app = express();
let db = require('../database')

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  console.log(req.body);
  db.save(req.body, (err, info) => {
    if (err) {
      console.log('Error posting a repo');
      res.status(400).send()
    } else {
      res.send('Request received')
    }
  })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log(req.body);
  res.send('Request received')
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

