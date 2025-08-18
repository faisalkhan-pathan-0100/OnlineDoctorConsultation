import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const specializations = [
  "Dermatologist",
  "Neurologist",
  "Gynecologist",
  "Psychologist",
  "Dietitian",
  "Sexologist",
  "Ayurvedic Specialist",
  "Homeopathic Doctor",
  "Orthopedic Surgeon"
];

const BookAppointment = () => {
  const [selectedSpec, setSelectedSpec] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [form, setForm] = useState({ date: "", time: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  const email = localStorage.getItem("email");

  // Fetch patientId
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/patients/by-email/${encodeURIComponent(email)}`)
        .then((res) => setPatientId(res.data.id))
        .catch((err) => console.error("Failed to fetch patient ID:", err));
    }
  }, [email]);

  // Fetch doctors when specialization is selected
  useEffect(() => {
    if (selectedSpec) {
      axios
        .get(`http://localhost:8080/doctors/specialization/${selectedSpec}`)
        .then((res) => setDoctors(res.data))
        .catch((err) => {
          console.error("Error fetching doctors:", err);
          setDoctors([]);
        });
    }
  }, [selectedSpec]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFutureDate = (dateStr) => {
    const selected = new Date(dateStr);
    const today = new Date();
    return selected.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setError("");
    setSuccess("");

    const formEl = e.currentTarget;

    if (formEl.checkValidity() === false || !selectedDoctorId || !isFutureDate(form.date)) {
      e.stopPropagation();
      if (!isFutureDate(form.date)) {
        setError("Please select a valid future date.");
      }
      return;
    }

    const payload = {
      date: form.date,
      time: form.time,
      status: "Scheduled",
      doctorId: selectedDoctorId,
      patientId: patientId
    };

    try {
      const response = await axios.post("http://localhost:8080/appointments/add", payload);
      setSuccess("Appointment booked successfully!");
      setForm({ date: "", time: "" });
      setSelectedDoctorId("");
      setSelectedSpec("");
      setValidated(false);
    } catch (error) {
      console.error("Failed to book appointment:", error);
      setError("Failed to book appointment. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Book Appointment</h3>
      <p>Please fill in the details below to book your appointment.</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formSpecialization">
          <Form.Label>Select Specialization</Form.Label>
          <Form.Select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            required
          >
            <option value="">-- Select Specialization --</option>
            {specializations.map((spec, idx) => (
              <option key={idx} value={spec}>
                {spec}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a specialization.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDoctor">
          <Form.Label>Select Doctor</Form.Label>
          <Form.Select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            required
            disabled={!doctors.length}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a doctor.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            required
            isInvalid={form.date && !isFutureDate(form.date)}
          />
          <Form.Control.Feedback type="invalid">
            Please select a valid future date.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTime">
          <Form.Label>Select Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={form.time}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please select a time.
          </Form.Control.Feedback>
        </Form.Group>

          <Form.Group className="mb-3" controlId="formTime">
          <Form.Label>did</Form.Label>
          <Form.Control
            type="text"
            name="time"
            value={form.doctorId}
            // onChange={handleInputChange}
           
          />
          <Form.Control.Feedback type="invalid">
            {/* Please select a time. */}
          </Form.Control.Feedback>
        </Form.Group>
             <Form.Group className="mb-3" controlId="formTime">
          <Form.Label>pid</Form.Label>
          <Form.Control
            type="text"
            name="time"
            value={form.patientIdId}
            // onChange={handleInputChange}
            
          />
          <Form.Control.Feedback type="invalid">
            {/* Please select a time. */}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Book Appointment
        </Button>
      </Form>
    </Container>
  );
};

export default BookAppointment;
