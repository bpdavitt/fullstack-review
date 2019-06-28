import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <thead>
        <tr>
          <th>Repo Name</th>
          <th>Repo Owner</th>
          <th>Repo Forks</th>
          <th>Repo URL</th>
        </tr>
      </thead>
      <tbody>
        {props.repos.map(repo => {
          return (
            <Repo repo={repo}/>
          )
        })}
      </tbody>

    </table>
  </div>
)

export default RepoList;