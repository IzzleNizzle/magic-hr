import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import EditModal from "../components/EditModal";
import Table from "../components/Table";
import Row from "../components/Row";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row as GridRow, Container } from "../components/Grid";
import danceBot from '../images/danceBot.gif';
import loveBot from '../images/loveBot.png';
import pointBot from '../images/pointBot.png';
import superBot from '../images/superBot.png';
import wizBot from '../images/wizBot.png';

// let testData = [{ employeeId: "werwer", firstName: "werq", lastName: "werqwer", email: "werq", phoneNumber: "qwer", salary: "qwer" }]
class Home extends Component {
  state = {
    employees: [],
    saveEmployee: {
      employeeId: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      salary: '',
    },
    editEmployeeData: {
      // id: '',
      employeeId: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      salary: '',
    },
    editEmployee: {},
    deleteEmployee: {},
    addFormValidation: false,
    editFormValidation: false,
    showModal: false,
    showDeleteModal: false,
    message: "No Employees Found, Better hire somebody!",
    heroImg: 'wizBot',
    heroImgChoices: {
      danceBot,
      loveBot,
      pointBot,
      superBot,
      wizBot
    }
  };

  componentDidMount() {
    this.getEmployees()
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(event.target.checkValidity());

    // I wish react would fix this...can't extract from event.target
    let workAround = event.target.getAttribute('data')
    this.setState((prevState => {
      // Avoid mutating state directly
      let modState = { ...prevState }
      // Change value for specific data object
      modState[workAround][name] = value
      return modState
    }));
  };

  validateForm = (event, type) => {
    event.preventDefault();
    console.log(event.target.parentElement.getAttribute('data'));
    console.log(event.target.parentElement.checkValidity());
    // Check validity of form before continuing
    if (event.target.parentElement.checkValidity()) {
      if (type === 'add') {
        // add
        this.addEmployee()
      }
      else {
        // edit
        this.state.editEmployee()
      }
      this.clearValidation(type)
    } else {
      this.needsValidation(type)

    }
    // console.log(event.target.previousSibling.children[1].getAttribute('data'))
    // console.log(event.target.parentElement.parentElement.checkValidity());
  }

  needsValidation = type => {
    // This function is fired and adds 'needs-validation' class to forms, enforcing validation rule
    this.setState({
      [`${type}FormValidation`]: true
    })
  }

  clearValidation = type => {
    // This function is fired and adds 'needs-validation' class to forms, enforcing validation rule
    this.setState({
      [`${type}FormValidation`]: false
    })
  }

  clearAddEmpForm = () => {
    this.setState({
      saveEmployee: {
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        salary: '',
      }
    })
  }

  getEmployees = () => {
    API.getEmployees()
      .then(res =>
        this.setState({
          employees: res.data
        })
      )
      .catch(() =>
        this.setState({
          employees: [],
          message: "No Employees Found, Better hire somebody!"
        })
      );
  };


  handleShow = id => {
    // Show modal as well as populate editEmployeeData fields from row clicked
    console.log(this.state)
    console.log(id)
    this.setState({
      showModal: true,
      editEmployee: () => {
        this.updateEmployee(id)
      },
      editEmployeeData: {
        // id: this.state.employees[id].id,
        employeeId: this.state.employees[id].employeeId,
        firstName: this.state.employees[id].firstName,
        lastName: this.state.employees[id].lastName,
        email: this.state.employees[id].email,
        phoneNumber: this.state.employees[id].phoneNumber,
        salary: this.state.employees[id].salary,
      }
    });
  }

  handleClose = () => {
    // Close Modal as well as clear data for editEmployeeData
    this.setState({
      showModal: false,
      editEmployeeData: {
        // id: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        salary: '',
      }
    });
  }

  handleDeleteShow = id => {
    // Show delete modal as well as populate deleteEmployee in state to hold id in closure
    this.setState({
      showDeleteModal: true,
      deleteEmployee: () => {
        console.log(this.state.employees[id]._id)        // Remove employee from database
        // API.deleteEmployee(this.state.employees[id]._id)
        //   .then(res => {
        //     this.getEmployees()
        //   })
        //   .catch(err => console.log(err))
        this.deleteEmployee(id)
        // Hiding modal this way to avoid showing superBot img
        this.setState({ showDeleteModal: false })
      }
    });
  }

  addEmployee = () => {
    API.addEmployee(this.state.saveEmployee)
      .then(res => {
        this.getEmployees()
        this.clearAddEmpForm()
        this.updateHeroImg("loveBot")
      })
      .catch(err => {
        console.log(err)
      })
  }



  updateEmployee = id => {
    // validate form before adding
    // if (event.target.parentElement.checkValidity()) {
    console.log(this.state.employees[id]._id)
    API.updateEmployee(this.state.employees[id]._id, this.state.editEmployeeData)
      .then(res => {
        console.log(this.state.employees[id]._id)
        console.log("TCL: Home -> this.state.editEmployeeData", this.state.editEmployeeData)
        this.handleClose()
        this.updateHeroImg("danceBot")
        this.getEmployees()
      })
      .catch(err => console.log(err))
  }

  deleteEmployee = id => {
    API.deleteEmployee(this.state.employees[id]._id)
      .then(res => {
        this.getEmployees()
        this.updateHeroImg("pointBot")
      })
      .catch(err => {
        console.log(err)
      })
  }


  handleDeleteClose = id => {
    // Hide delete modal, show superBot
    this.setState({
      showDeleteModal: false
    });
    this.updateHeroImg('superBot')
  }

  updateHeroImg = choice => {
    // Updating hero image for a short time
    this.setState({
      heroImg: choice
    }, () => {
      setTimeout(() => {
        // Setting heroImg back to norm after 3 seconds
        this.setState({
          heroImg: 'wizBot'
        })
      }, 3300);
    })
  }

  render() {
    return (
      <Container>
        <GridRow>
          <Col size="md-6">
            <Jumbotron>
              <h1 className="text-center">
                <img id="jumboImg" src={this.state.heroImgChoices[this.state.heroImg]} alt="dancing robot" />
              </h1>
            </Jumbotron>
          </Col>
          <Col size="md-6">
            <Card title="Add Employee" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                formData="saveEmployee"
                data={this.state.saveEmployee}
                validated={this.state.addFormValidation}
              >
                <button
                  onClick={event => {
                    this.validateForm(event, "add")
                  }}
                  type="submit"
                  className="btn btn-lg btn-danger float-right"
                >
                  Add
              </button>
              </Form>
            </Card>
          </Col>

          <Col size="md-12">
            <Card title="Current Employees">
              {this.state.employees.length ? (
                <Table>
                  {this.state.employees.map((employee, index) => (
                    <Row
                      key={employee._id}
                      id={employee._id}
                      index={index}
                      employeeId={employee.employeeId}
                      firstName={employee.firstName}
                      lastName={employee.lastName}
                      email={employee.email}
                      phoneNumber={employee.phoneNumber}
                      salary={employee.salary}
                      handleShow={this.handleShow}
                      handleDeleteShow={this.handleDeleteShow}
                    />
                  ))}
                </Table>
              ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
            </Card>
          </Col>
        </GridRow>
        <Footer />
        <EditModal
          show={this.state.showModal}
          handleClose={this.handleClose}
          title="Edit Employee"
        >
          <Form
            handleInputChange={this.handleInputChange}
            formData="editEmployeeData"
            data={this.state.editEmployeeData}
            validated={this.state.editFormValidation}
          >
            <button
              onClick={event => {
                this.validateForm(event, "edit")
              }}
              type="submit"
              className="btn btn-lg btn-primary float-right pull-right"
            >
              Update Employee Info
              </button>
          </Form>
        </EditModal>

        <EditModal
          show={this.state.showDeleteModal}
          handleClose={this.handleDeleteClose}
          title="Delete Employee"
          message="Are you sure you want to delete this employee?"
          buttonAction={this.state.deleteEmployee}
        >
          <button
            onClick={this.state.deleteEmployee}
            type="submit"
            className="btn btn-lg btn-danger float-right pull-right"
          >
            Yes, Delete
              </button>
        </EditModal>
      </Container>
    );
  }
}

export default Home;
