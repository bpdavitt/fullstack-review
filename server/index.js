const express = require('express');
const app = express();
const db = require('../database')
const helper = require('../helpers/github.js')


app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body);
  helper.getReposByUsername(req.body.username, (err, repos) => {
    if(err) {
      console.log('Error in getting repos with username', err);
      res.status(404).end()
    } else {
      console.log(typeof repos.body);
      //Convert JSON string to array of objects
      repos = JSON.parse(repos.body);
      console.log(repos.length);
      res.send('Check out these repos')
    }
  })

  // db.save(req.body, (err, info) => {
  //   if (err) {
  //     console.log('Error posting a repo');
  //     res.status(400).send()
  //   } else {
  //     res.send('Request received')
  //   }
  // })
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

