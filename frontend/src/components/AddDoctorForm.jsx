import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    email: '',
    phone: '',
    qualification: '',
    description: '',
    password: ''
  });

  const [validated, setValidated] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const { name, specialization, experience, email, phone, qualification, password } = formData;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      name.trim().length >= 3 &&
      specialization.trim() !== '' &&
      !isNaN(experience) && experience >= 0 &&
      emailRegex.test(email) &&
      phoneRegex.test(phone) &&
      qualification.trim().length >= 2 &&
      password.trim().length >= 6
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setSubmitError('');

    if (!validateFields()) {
      setSubmitError("Please correct the highlighted fields.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/doctors', formData);
      alert('Doctor added successfully!');
      setFormData({
        name: '',
        specialization: '',
        experience: '',
        email: '',
        phone: '',
        qualification: '',
        description: '',
        password: ''
      });
      setValidated(false);
    } catch (err) {
      console.error(err);
      alert('Error adding doctor');
    }
  };

  return (
    <Container className="mt-4">
      <h3>Add New Doctor</h3>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={validated && formData.name.trim().length < 3}
          />
          <Form.Control.Feedback type="invalid">
            Name must be at least 3 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSpecialization">
          <Form.Label>Specialization</Form.Label>
          <Form.Control
            required
            type="text"
            name="specialization"
            placeholder="e.g., Cardiology"
            value={formData.specialization}
            onChange={handleChange}
            isInvalid={validated && formData.specialization.trim() === ''}
          />
          <Form.Control.Feedback type="invalid">
            Specialization is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formExperience">
          <Form.Label>Experience (in years)</Form.Label>
          <Form.Control
            required
            type="number"
            name="experience"
            placeholder="e.g., 5"
            value={formData.experience}
            onChange={handleChange}
            isInvalid={validated && (isNaN(formData.experience) || formData.experience < 0)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid experience (0 or more).
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={validated && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
          />
          <Form.Control.Feedback type="invalid">
            Enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="text"
            name="phone"
            placeholder="Enter 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={validated && !/^\d{10}$/.test(formData.phone)}
          />
          <Form.Control.Feedback type="invalid">
            Phone number must be exactly 10 digits.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQualification">
          <Form.Label>Qualification</Form.Label>
          <Form.Control
            required
            type="text"
            name="qualification"
            placeholder="e.g., MBBS, BHMS"
            value={formData.qualification}
            onChange={handleChange}
            isInvalid={validated && formData.qualification.trim().length < 2}
          />
          <Form.Control.Feedback type="invalid">
            Qualification must be at least 2 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Short description about doctor"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={validated && formData.password.trim().length < 6}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Doctor
        </Button>
      </Form>
    </Container>
  );
};

export default AddDoctorForm;
