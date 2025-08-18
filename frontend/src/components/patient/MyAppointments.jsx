import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const MyAppointments = () => {
  const email = localStorage.getItem("email");
  const [patientId, setPatientId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // First: Fetch patient ID using email
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/patients/by-email/${encodeURIComponent(email)}`)
        .then((res) => {
          setPatientId(res.data.id);
        })
        .catch((err) => {
          setError("Failed to load patient profile.");
          setLoading(false);
        });
    }
  }, [email]);

  // Then: Fetch appointments using patient ID
  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://localhost:8080/patient/appoinment/${patientId}`)
        .then((res) => {
          setAppointments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load appointments.");
          setLoading(false);
        });
    }
  }, [patientId]);

  // Cancel Appointment Handler
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/patient/appoinment/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      setError("Failed to cancel appointment.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>My Appointments</h3>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && appointments.length > 0 && (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => (
              <tr key={idx}>
                <td>{appt.doctorName}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "Scheduled" ? (
                    <Button variant="danger" size="sm" onClick={() => deleteAppointment(appt.id)}>
                      Cancel
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>
                      Done
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!loading && !error && appointments.length === 0 && (
        <Alert variant="info" className="mt-3">You have no appointments.</Alert>
      )}
    </Container>
  );
};

export default MyAppointments;
