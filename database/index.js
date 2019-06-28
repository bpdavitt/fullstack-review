const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true
  },
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
  let newRepo = new Repo({
    id: repoInfo.id,
    name: repoInfo.name,
    owner: repoInfo.owner.login,
    url: repoInfo.url,
    forks: repoInfo.forks
  })

  newRepo.save((err, newRepo) => {
    if (err) {
      console.log('error while saving new repo: ', newRepo, err);
      callback(err, null);
    } else {
      console.log('Repo successfully saved');
      callback(null, newRepo)
    }
  })
}

module.exports.save = save;