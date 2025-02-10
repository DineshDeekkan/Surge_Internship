import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import './App.css'; // Import the CSS file

export default function TablePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Fetch employee data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/employees')
      .then((res) => {
        console.log('Get operation successful', res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log('Get failed', error);
      });
  }, []);

  // Handle redirect to the form page to edit an existing employee
  const handleEdit = (employee) => {
    //alert("employee"+ JSON.stringify(employee))
    
    navigate('/form', { state: { employee } }); // Pass employee data for editing
  };

  // Handle redirect to the form page to add a new employee (no employee data)
  const handleAdd = () => {
    navigate('/form'); // Navigate to FormPage without any employee data
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then((res) => {
        console.log('Delete operation successful', res);
        setData(prevData => prevData.filter(employee => employee.id !== id));
      })
      .catch((error) => {
        console.log('Delete failed', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="design">
      <h1>Employee Database</h1>

      {/* Add Employee Button */}
      <div className="add-button-container">
        <button onClick={handleAdd} className="add-button">Add Employee</button>
      </div>

      {/* Table displaying employee data */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee Name</th>
            <th>Employee Role</th>
            <th>Employee Email</th>
            <th>Employee Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 ? (
              data.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.email}</td>
                  <td>{employee.salary}</td>
                  <td>
                    {/* Edit Button */}
                    <button onClick={() => handleEdit(employee)}>Edit</button>
                    {/* Delete Button */}
                    <button onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )
          }
        </tbody>
      </table>

      {/* Logout button */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}










