import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and location
import './App.css'; // Import the CSS file
import Swal from 'sweetalert2';

export default function FormPage() {
  const [values, setValues] = useState({
    ids: '',
    name: '',
    role: '',
    email: '',
    salary: '',
  });

  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To access state passed via navigation

  useEffect(() => {
    // Check if the employee data is passed through location state (edit mode)
    if (location.state && location.state.employee) {
      setValues(location.state.employee); // Pre-fill form for editing
    } else {
      setValues({
        ids: '',
        name: '',
        role: '',
        email: '',
        salary: '',
      }); // If no employee data, initialize as a new record
    }
  }, [location.state]);

  // Handle form input changes
  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Reset the form fields to their initial state
  const handleReset = () => {
    setValues({
      id: '',
      name: '',
      role: '',
      email: '',
      salary: ''
    });
  };

  // Handle form submission (either add or edit based on the presence of an ID)
  const handleSubmit = (e) => {
    e.preventDefault();

    let requestMethod;
    let url;

    if (values.id) {
      requestMethod = 'put';
      url = `http://localhost:8080/api/employees/${values.id}`;
    } else {
      requestMethod = 'post';
      url = `http://localhost:8080/api/employees/post`;
    }

    axios[requestMethod](url, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (requestMethod === 'put') {
          console.log('Update operation successful', res.data);
        } else {
          console.log('Post operation successful', res.data);
        }
        navigate('/table'); // Navigate to the table page after submitting
      })
      .catch((error) => {
        console.log("----", error);
        Swal.fire('This email already exists with another employee', error);
        if (requestMethod === 'put') {
          console.log('Update failed', error);
        } else {
          console.log('Post failed', error);
        }
      });
  };

  let buttonText;
  if (values.id) {
    buttonText = 'Update';
  } else {
    buttonText = 'Submit';
  }

  return (
    <div className="container">
      <h1>{values.id ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID*</label>
        <input
          type="number"
          placeholder="Enter Employee ID"
          name="ids"
          onChange={handleChanges}
          value={values.id}
          disabled={values.id} // Disable the ID field if it's in edit mode
        />
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          placeholder="Enter Employee Name"
          name="name"
          onChange={handleChanges}
          value={values.name}
          required
        />
        <label htmlFor="role">Role*</label>
        <input
          type="text"
          placeholder="Enter Employee Role"
          name="role"
          onChange={handleChanges}
          value={values.role}
          required
        />
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          placeholder="Enter Employee Email"
          name="email"
          onChange={handleChanges}
          value={values.email}
          required
        />
        <label htmlFor="salary">Salary*</label>
        <input
          type="number"
          placeholder="Enter Employee Salary"
          name="salary"
          onChange={handleChanges}
          value={values.salary}
          required
        />
        <button type="submit">{buttonText}</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}









      

