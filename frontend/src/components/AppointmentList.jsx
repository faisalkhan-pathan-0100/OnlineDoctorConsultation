import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/appointments'); // <-- your API URL
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Appointment List</h2>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Doctor Name</th>
              <th>Patient Name</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{appt.id}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.patientName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AppointmentList;
