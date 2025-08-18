import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/background.css'; // Your CSS file with background styles

const Login = ({ setRole }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.email) {
      errors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:8080/users/login', form);
      const user = res.data;
      localStorage.setItem('role', user.role);
      localStorage.setItem('email', user.email);
      localStorage.setItem('patientId', user.id);
      setRole(user.role);

      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'DOCTOR') navigate('/doctor/dashboard');
      else if (user.role === 'PATIENT') navigate('/patient/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="bg-page">
      <div className="login-card">
        <h3 className="text-center mb-4 login-title">Welcome Back 👋</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin} noValidate>
          <Form.Group controlId="loginEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              isInvalid={!!validationErrors.email}
              required
            />
            <Form.Control.Feedback type="invalid" className="validation-error">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="loginPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              isInvalid={!!validationErrors.password}
              required
            />
            <Form.Control.Feedback type="invalid" className="validation-error">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
