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
      //Convert JSON string to array of objects
      repos = JSON.parse(repos.body);
      const promRepos = repos.map((repo) => {
        return dbSaveAsync(repo);
      });
      Promise.all(promRepos)
        .then((values) => {
          console.log(values);
          const dbAction = {
            'modified': 0,
            'created': 0
          };
          values.forEach((item) => {
            dbAction.modified += item.nModified;
            if (item.upserted !== undefined) {
              dbAction.created += 1;
            }
          });
          console.log('Successfully wrote all repos');
          console.log(dbAction);
          res.send(dbAction);
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
  db.search((err, results) => {
    if(err) {
      res.status(404).end();
    } else {
      res.send(results);
    }
  })
  // res.send('Request received')
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

