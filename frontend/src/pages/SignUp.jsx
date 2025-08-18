import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../styles/background.css'; //  CSS file with background styles

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!form.email) {
      errors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      errors.email = 'Invalid email address.';
    }
    if (!form.phone) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(form.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 7) {
      errors.password = 'Password must be at least 7 characters.';
    } else if (!/(?=.*\d)/.test(form.password)) {
      errors.password = 'Password must contain at least one digit.';
    } else if (!/(?=.*[!@#$%^&*])/.test(form.password)) {
      errors.password = 'Password must contain at least one special character (!@#$%^&*).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:8080/users/signup', {
        ...form,
        role: 'PATIENT',
      });
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Email may already be used.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center signup-page" style={{ minHeight: '100vh' }}>
      <style>{`
    .signup-page {
      min-width: 100%;
      min-height: 100%;
      background-image: url('/CatagoryImgs/bg1.avif');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .signup-card {
      background: #ffffff;
      padding: 2.5rem 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 420px;
    }
    .signup-card h3 {
      font-weight: 700;
      color: #198754;
    }
    .form-control {
      border-radius: 12px;
    }
    .btn-primary {
      border-radius: 12px;
      font-weight: 600;
      padding: 0.6rem;
      background-color: #198754;
      border: none;
    }
    .btn-primary:hover {
      background-color: #146c43;
    }
    .validation-error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `}</style>

      <div className="signup-card">
        <h3 className="text-center mb-4">Create Your Account 📝</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              isInvalid={!!validationErrors.name}
              required
            />
            <Form.Control.Feedback type="invalid" className="validation-error">
              {validationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email Address</Form.Label>
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

          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              isInvalid={!!validationErrors.phone}
              required
            />
            <Form.Control.Feedback type="invalid" className="validation-error">
              {validationErrors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              isInvalid={!!validationErrors.password}
              required
            />
            <Form.Control.Feedback type="invalid" className="validation-error">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
