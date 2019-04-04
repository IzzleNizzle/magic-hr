import React from "react";


export const Table = props => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Employee Id #</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Salary</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody id="theTable">
      {props.children}
    </tbody>
  </table>
);


export default Table;
