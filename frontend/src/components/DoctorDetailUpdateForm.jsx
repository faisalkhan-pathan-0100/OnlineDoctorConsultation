import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const DoctorDetailUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    description: '',
    qualification: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/doctors/${id}`)
      .then(response => {
        setForm(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch doctor details");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/doctors/${id}`, form);
      setSuccess(true);
      setTimeout(() => navigate("/admin/doctors"), 1500);
    } catch (err) {
      setError("Update failed. Please check the form and try again.");
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Update Doctor Details</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Doctor updated successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specialization</Form.Label>
          <Form.Control type="text" name="specialization" value={form.specialization} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Experience (years)</Form.Label>
          <Form.Control type="number" name="experience" value={form.experience} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Qualification</Form.Label>
          <Form.Control type="text" name="qualification" value={form.qualification} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Doctor
        </Button>
      </Form>
    </Container>
  );
};

export default DoctorDetailUpdateForm;
