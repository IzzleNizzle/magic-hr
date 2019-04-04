import React, { Component } from 'react';

class Row extends Component {

  edit = () => {
    this.props.handleShow(this.props.index)
  }

  delete = () => {
    this.props.handleDeleteShow(this.props.index)
  }

  render() {
    return (
      <tr>
        <td>{this.props.employeeId}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.email}</td>
        <td>{this.props.phoneNumber}</td>
        <td>{this.props.salary}</td>
        <td>
          <button
            className="btn btn-info"
            onClick={this.edit}
          >Edit</button>
          <button
            className="btn btn-danger"
            onClick={this.delete}
          >Delete</button>
        </td>
      </tr>
    );
  }
}


export default Row;
