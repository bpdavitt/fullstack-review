const express = require('express');
const app = express();
const db = require('../database');
const helper = require('../helpers/github.js');
const Promise = require('bluebird');
const dbSaveAsync = Promise.promisify(db.save);

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body);
  helper.getReposByUsername(req.body.username, (err, repos) => {
    if (err) {
      console.log('Error in getting repos with username', err);
      res.status(404).end()
    } else {
      console.log(typeof repos.body);
      //Convert JSON string to array of objects
      repos = JSON.parse(repos.body);
      console.log(repos.length);
      const promRepos = repos.map((repo) => {
        return dbSaveAsync(repo);
      });
      console.log(promRepos)
      Promise.all(promRepos).then((values) => {
          console.log('Successfully wrote all repos');
          res.send('Repos found and written to database')
        })
        .catch((err) => {
          console.log('Something went wrong');
          res.status(404).send();
        });
    }
  })
});


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log(req.body);
  res.send('Request received')
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

