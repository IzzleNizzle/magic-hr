import React from "react";
import Input from "./Input";

function Form(props) {
  return (
    <form
      className={props.validated ? 'was-validated' : ''}>
      <div className="form-group row">

        <Input
          title="Employee Id #"
          name="employeeId"
          type="number"
          formData={props.formData}
          value={props.data.employeeId}
          handleInputChange={props.handleInputChange}
        />

        <Input
          title="First Name"
          name="firstName"
          type="text"
          formData={props.formData}
          value={props.data.firstName}
          handleInputChange={props.handleInputChange}
        />
        <Input
          title="Last Name"
          name="lastName"
          type="text"
          formData={props.formData}
          value={props.data.lastName}
          handleInputChange={props.handleInputChange}
        />

        <Input
          title="Email"
          name="email"
          type="email"
          formData={props.formData}
          value={props.data.email}
          handleInputChange={props.handleInputChange}
        />

        <Input
          title="Phone Number"
          name="phoneNumber"
          type="text"
          formData={props.formData}
          value={props.data.phoneNumber}
          handleInputChange={props.handleInputChange}
        />

        <Input
          title="Salary"
          name="salary"
          type="number"
          formData={props.formData}
          value={props.data.salary}
          handleInputChange={props.handleInputChange}
        />
      </div>

      {props.children}

    </form >
  )
}

export default Form;
