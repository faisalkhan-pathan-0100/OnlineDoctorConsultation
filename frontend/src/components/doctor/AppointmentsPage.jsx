import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button, Badge, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const doctorEmail = localStorage.getItem("email");

  const formatTime = (timeStr) => {
    const [h, m] = timeStr.split(":");
    const date = new Date();
    date.setHours(+h);
    date.setMinutes(+m);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (!doctorEmail) {
      setError("Doctor email not found in localStorage.");
      setLoading(false);
      return;
    }

    // Get full doctor info (to extract ID)
    axios
      .get(`http://localhost:8080/doctors/by-email/${encodeURIComponent(doctorEmail)}`)
      .then((res) => {
        const doctorId = res.data.id;

        // Fetch appointments using doctorId
        return axios.get(`http://localhost:8080/doctor/appoinment/${doctorId}`);
      })
      .then((res) => {
        const adapted = res.data.map((entry, index) => ({
          id: entry.id,
          patientName: entry.patientName,
          date: entry.date,
          time: formatTime(entry.time),
          reason: "General Consultation", // placeholder
          type: "In-person",              // placeholder
          status: entry.status === "Scheduled" ? "Confirmed" : entry.status
        }));
        setAppointments(adapted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load appointments.");
        setLoading(false);
      });
  }, [doctorEmail]);

  const filteredAppointments = appointments.filter((appt) => {
    const matchesDate = filterDate ? appt.date === filterDate : true;
    const matchesStatus = filterStatus === "All" ? true : appt.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case "Confirmed": return "success";
      case "Pending": return "warning";
      case "Completed": return "info";
      case "Canceled": return "danger";
      default: return "secondary";
    }
  };

  const handleDelete = (id) => {
  const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
  if (!confirmed) return;

  axios
    .delete(`http://localhost:8080/patient/appoinment/${id}`)
    .then(() => {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    })
    .catch((err) => {
      console.error("Failed to delete appointment:", err);
      alert("Failed to cancel appointment.");
    });
};


  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 text-center">MY APPOINTMENTS</h2>

      <Row className="mb-4 align-items-end">
        <Col md={3}>
          <Form.Group controlId="filterDate">
            <Form.Label>Filter by Date</Form.Label>
            <Form.Control
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="filterStatus">
            <Form.Label>Filter by Status</Form.Label>
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" onClick={() => { setFilterDate(''); setFilterStatus('All'); }}>
            Clear Filters
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredAppointments.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt, index) => (
              <tr key={appt.id}>
                <td>{index + 1}</td>
                <td>{appt.patientName}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.reason}</td>
                <td>{appt.type}</td>
                <td>
                  <Badge bg={getStatusVariant(appt.status)}>{appt.status}</Badge>
                </td>
                <td>
                  {/* <Button variant="outline-info" size="sm" className="me-1">View</Button>
                  <Button variant="outline-primary" size="sm" className="me-1">Reschedule</Button> */}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(appt.id)}>Cancel</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info" className="mt-4">No appointments match your filters.</Alert>
      )}
    </Container>
  );
}

export default AppointmentsPage;
