import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import HallList from './HallList';
import './Admin.css';

const AdminDashboard = () => {
  const [activeKey, setActiveKey] = useState('users');
  const navigate = useNavigate();

  return (
    <Container fluid className="admin-dashboard">
      <Row>
        <Col md={3} sm={12} className="sidebar">
          <h4>Admin Panel</h4>
          <Nav
            variant="pills"
            className="flex-column text-center"
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey="users">User Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="hall">Hall List</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col md={9} sm={12} className="main-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Admin Dashboard</h2>
            <Button
              variant="secondary"
              onClick={() => navigate('/home')}
            >
              Back to Homepage
            </Button>
          </div>

          <Tab.Container
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            <Tab.Content>
              <Tab.Pane eventKey="users">
                <UserManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="hall">
                <HallList />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

