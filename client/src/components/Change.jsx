import React from 'react';

const Change = (props) => {

  return (
    <div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Records Created</th>
            <th>Records Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.created}</td>
            <td>{props.modified}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

};

export default Change;