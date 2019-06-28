import React from 'react'

const Repo = (props) => {

  const {repo} = props;

  return (
    <tr>
      <th>{repo.name}</th>
      <th>{repo.owner}</th>
      <th>{repo.forks}</th>
      <th>{repo.url}</th>
    </tr>
  )
}

export default Repo;