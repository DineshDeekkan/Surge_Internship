package com.example.crudapp.service;

import com.example.crudapp.model.Employee;

import com.example.crudapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//import java.util.regex.Matcher;
//import java.util.regex.Pattern;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create Employee
    public Employee createEmployee(Employee employee) {
        List<Employee> employeeDetail = employeeRepository.findAll();
       
        employeeDetail.stream().forEach((e) -> {
            if (e.getEmail().equals(employee.getEmail())) {
                // Throw an exception with a message
                throw new IllegalArgumentException("This email already exists with another employee");
            }
        });
 
        return employeeRepository.save(employee);
    }

    // Get all Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Update Employee
    public Employee updateEmployee(Long id, Employee employee) {
        if (employeeRepository.existsById(id)) {
            employee.setId(id);
            return employeeRepository.save(employee);
        } else {
            return null;
        }
    }
    
    /*public Employee updateEmployee(Long id, Employee employee) {
        // Email validation regex pattern
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(employee.getEmail());

        // Validate email format
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Check if the email is unique (not already used by another employee)
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Check if employee with given id exists
        if (employeeRepository.existsById(id)) {
            employee.setId(id); // Set the employee ID
            return employeeRepository.save(employee); // Save the updated employee
        } else {
            return null; // Employee not found
        }
    }*/

    // Delete Employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    public boolean isEmailExist(String email) {
        System.out.println("Checking if email exists: " + email);  // Log email being checked
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        System.out.println("Email exists: " + employee.isPresent());  // Log whether email exists
        return employee.isPresent();
    }
}




