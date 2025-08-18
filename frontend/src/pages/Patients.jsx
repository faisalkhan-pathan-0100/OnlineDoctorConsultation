// src/pages/Patients.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:8080/patients'); // end point to fetch all patients
        
        setPatients(res.data);
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="mb-4">All Patients</h3>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Creation Date</th>
              <th>Updated On</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.createdAt || patient.creationDate}</td>
                <td>{patient.updatedAt || patient.updatedOn}</td>
                <td>{patient.email}</td>
                <td>{patient.name}</td>
                <td>{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Patients;
