const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoInfo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newRepo = {
    name: repoInfo.name,
    owner: repoInfo.owner.login,
    url: repoInfo.url,
    forks: repoInfo.forks
  };

  //Use upsert to check if an entry exists; if so will update w/ new info, otherwise make new entry
  Repo.update({ 'id': repoInfo.id }, newRepo, { upsert: true }, (err, insertData) => {
    if (err) {
      console.log('error while saving new repo: ', err);
      callback(err, null);
    } else {
      console.log('Repo successfully saved');
      callback(null, insertData);
    }
  });
};

const search = (callback) => {
  Repo.find((err, items) => {
    if(err) {
      console.log('Error searching DB');
      callback(err);
    } else {
      // console.log(items);
      callback(null, items);
    }
  }).limit(25).sort({"forks": -1});
}

module.exports = {save, search};