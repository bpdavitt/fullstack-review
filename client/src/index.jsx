import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Change from './components/Change.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      term: '',
      created: null,
      modified: null
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:1128/repos')
      .then(result => {
        const allRepos = result.data;
        this.setState({ repos: allRepos });
      });
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    console.log(this.state.term);
    axios.post('http://localhost:1128/repos', { "username": this.state.term })
      .then(res => {
        console.log('POST successful');
        console.log(res.data);
        const modifiedAndCreated = res.data;
        axios.get('http://localhost:1128/repos')
          .then(result => {
            const allRepos = result.data;
            this.setState({ repos: allRepos, created: modifiedAndCreated.created, modified: modifiedAndCreated.modified });
          })
      })
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      {this.state.created === null ? (<div />) : (
        <Change created={this.state.created} modified={this.state.modified}/>
      )}
      <Search onSearch={this.search} onChange={this.onChange} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));