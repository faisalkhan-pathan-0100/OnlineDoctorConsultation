import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, Button, Card, Alert, Spinner
} from 'react-bootstrap';
import { FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';

function DoctorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const doctorEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!doctorEmail) {
      setError("Doctor email not found in local storage.");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8080/doctors/by-email/${encodeURIComponent(doctorEmail)}`)
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch doctor profile:", err);
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, [doctorEmail]);

  const handleChange = (e) => {
    if (!isEditing) return; // Prevent state update if not editing
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const isPhoneValid = (phone) => /^\d{10}$/.test(phone);
  const isNameValid = (name) => name.trim().length >= 3;
  const isQualificationValid = (q) => q.trim().length >= 2;
  const isExperienceValid = (exp) => Number(exp) >= 0;

  const handleSave = (e) => {
    e.preventDefault();
    setValidated(true);
    setSaveMessage("");
    setError("");

    if (
      !isNameValid(profile.name) ||
      !isPhoneValid(profile.phone) ||
      !isQualificationValid(profile.qualification) ||
      !isExperienceValid(profile.experience)
    ) {
      return;
    }

    axios.put(`http://localhost:8080/doctors/${profile.id}`, profile)
      .then(() => {
        setSaveMessage("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setSaveMessage(''), 3000);
      })
      .catch(err => {
        console.error("Failed to save profile:", err);
        setError("Failed to update profile.");
      });
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" />
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  if (!profile) return null;

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">My Profile</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col md={9}>
              <h3>{profile.name}</h3>
              <p className="text-muted mb-1">{profile.specialization}</p>
              <p className="text-muted mb-1">{profile.qualification}</p>
              <p className="text-muted mb-0">{profile.experience} Years Experience</p>
            </Col>
          </Row>

          {saveMessage && <Alert variant="success">{saveMessage}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate validated={validated} >
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !isNameValid(profile.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Name must be at least 3 characters long.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formSpecialization">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={profile.specialization || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email || ''}
                    disabled
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !isPhoneValid(profile.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone number must be 10 digits.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formQualifications">
                  <Form.Label>Qualifications</Form.Label>
                  <Form.Control
                    type="text"
                    name="qualification"
                    value={profile.qualification || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !isQualificationValid(profile.qualification)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Qualification must be at least 2 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formExperience">
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control
                    type="number"
                    name="experience"
                    value={profile.experience || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !isExperienceValid(profile.experience)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Experience must be a non-negative number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formBio">
              <Form.Label>About Me / Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={profile.description || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>
                <FaSave className="me-1" /> Save Changes
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <FaEdit className="me-1" /> Edit Profile
              </Button>
            )}

             {/* {isEditing && (
              <Button variant="primary" onClick={handleSave}>
                <FaSave className="me-1" /> Save Changes
              </Button>
            )}
            {!isEditing && (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <FaEdit className="me-1" /> Edit Profile
              </Button>
            )} */}

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DoctorProfilePage;
