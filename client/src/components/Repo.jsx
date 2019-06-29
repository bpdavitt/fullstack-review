import React from 'react';

const Repo = (props) => {

  const {repo} = props;

  return (
    <tr>
      <td>
        <a href={`https://github.com/${repo.owner}/${repo.name}`}>{repo.name}</a>
      </td>
      <td>{repo.owner}</td>
      <td>{repo.forks}</td>
      <td>{repo.url}</td>
    </tr>
  )
}

export default Repo;