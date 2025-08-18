import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container } from "react-bootstrap";
import axios from "axios";

const DoctorPatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctorEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!doctorEmail) {
      setError("Doctor email not found in local storage.");
      setLoading(false);
      return;
    }

    // Step 1: Fetch full doctor details using email
    axios.get(`http://localhost:8080/doctors/by-email/${encodeURIComponent(doctorEmail)}`)
      .then(res => {
        const doctorId = res.data.id; // extracting ID from doctor object
        // Step 2: Fetch patients for this doctor
        return axios.get(`http://localhost:8080/doctors/${doctorId}/patients`);
      })
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load patients:", err);
        setError("Failed to load patients.");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">MY PATIENTS</h3>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DoctorPatientsPage;
