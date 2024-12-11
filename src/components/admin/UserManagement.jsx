import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../global.js';
import { AuthContext } from '../Context/AuthContext';

const UserManagement = () => {
  const { token, roles } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/admin/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // Validate Form Fields
    const validateForm = () => {
      let formErrors = {};
      let isValid = true;
  
      if (!formData.name) {
        formErrors.name = 'Name is required';
        isValid = false;
      }
  
      if (!formData.email) {
        formErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formErrors.email = 'Email is invalid';
        isValid = false;
      }
  
      if (!formData.role) {
        formErrors.role = 'Role is required';
        isValid = false;
      }
  
      setErrors(formErrors);
      return isValid;
    };

  // Add or Edit User
  const handleSave = async () => {

    if (!validateForm()) {
      return; 
    }

    try {
      if (selectedUser && selectedUser._id) {
        const { _id, ...dataToUpdate } = formData;

        console.log("PUT Request User ID:", selectedUser._id); 
        console.log("Data to Update:", dataToUpdate); 
        
        await axios.put(`${API}/admin/${selectedUser._id}`, dataToUpdate, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User updated successfully!');
      } else {
        await axios.post(`${API}/admin/`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User created successfully!');
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API}/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Handle Modal Opening
  const handleShowModal = (user = null) => {
    setSelectedUser(user);
    setFormData(
      user || {
        name: '',
        email: '',
        role: ''
      }
    );
    setShowModal(true);
  };

  return (
    <div className="user-management">
      <h2>User and Role Management</h2>
      <Button onClick={() => handleShowModal()}>Add New User</Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(user)}>
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Users */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? 'Edit User' : 'Add New User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
              >
                <option value="">Select Role</option>
                {Object.entries(roles).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
