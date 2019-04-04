import React from 'react'

export default function Input(props) {
  return (
    <div className="col-md-6">
      <label htmlFor={props.title}>
        <strong>{props.title}</strong>
      </label>
      <input
        className="form-control"
        type={props.type}
        value={props.value}
        name={props.name}
        data={props.formData}
        onChange={props.handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Please provide a valid {props.title}.
      </div>
    </div>
  )
}
