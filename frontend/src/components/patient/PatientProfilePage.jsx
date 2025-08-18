import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PatientProfilePage = () => {
  const email = localStorage.getItem("email");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  // Fetch patient data
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/patients/by-email/${encodeURIComponent(email)}`)
        .then((res) => {
          const patient = res.data;
          setForm({
            name: patient.name || "",
            phone: patient.phone || "",
          });
          setPatientId(patient.id);
        })
        .catch((err) => {
          console.error("Failed to fetch patient details:", err);
          setErrorMsg("Could not load your profile details.");
        })
        .finally(() => setLoading(false));
    }
  }, [email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isPhoneValid = (phone) => /^\d{10}$/.test(phone);
  const isNameValid = (name) => name.trim().length >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!isNameValid(form.name) || !isPhoneValid(form.phone)) return;

    const payload = {
      id: patientId,
      name: form.name,
      email: email,
      phone: form.phone,
    };

    try {
      const res = await axios.put(`http://localhost:8080/patients/email/${email}`, payload);
      setSuccessMsg(res.data.message || "Profile updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMsg("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading your profile...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Alert variant="info">
        👋 Welcome back, <strong>{form.name || "Patient"}</strong>! You can update your profile below.
      </Alert>
      <h3>Your Profile</h3>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            isInvalid={validated && !isNameValid(form.name)}
          />
          <Form.Control.Feedback type="invalid">
            Name must be at least 3 characters long.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" value={email} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter 10-digit phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            isInvalid={validated && !isPhoneValid(form.phone)}
          />
          <Form.Control.Feedback type="invalid">
            Enter a valid 10-digit phone number.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default PatientProfilePage;
