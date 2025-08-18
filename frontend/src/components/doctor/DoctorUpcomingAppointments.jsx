import React, { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import { FaCalendarAlt, FaUser, FaInfoCircle, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import axios from "axios";

function DoctorUpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId and role from localStorage
  const userId = localStorage.getItem("patientId");
  const role = localStorage.getItem("role"); // expected values: "DOCTOR" or "PATIENT"

  useEffect(() => {
    if (!userId) {
      setError("User ID not found.");
      setLoading(false);
      return;
    }
    if (!role) {
      setError("User role not found.");
      setLoading(false);
      return;
    }
    if (role !== "DOCTOR") {
      setError("You are not authorized to view this page.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Use the correct API endpoint based on role
    const apiUrl = `http://localhost:8080/doctor/appoinment/${userId}`;

    axios.get(apiUrl)
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load appointments.");
        setLoading(false);
      });
  }, [userId, role]);

  // Format date and time helpers
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="mb-4 shadow border rounded">
      <Card.Header className="bg-primary text-white d-flex align-items-center rounded-top py-3">
        <FaCalendarAlt className="me-2 fs-4" />
        <h5 className="mb-0 fw-bold">Upcoming Appointments</h5>
      </Card.Header>

      <Card.Body className="p-0">
        {loading && (
          <div className="text-center p-4">
            <Spinner animation="border" />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="m-3">
            {error}
          </Alert>
        )}

        {!loading && !error && appointments.length > 0 ? (
          <ListGroup variant="flush">
            {appointments.map((appt) => (
              <ListGroup.Item
                key={appt.id}
                className="d-flex justify-content-between align-items-center py-3 px-3 border-bottom"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="d-flex align-items-start flex-grow-1 me-3">
                  <div className="text-center me-3" style={{ minWidth: "75px" }}>
                    <p className="mb-0 fw-bold text-dark fs-5">{formatTime(appt.time)}</p>
                    <small className="text-muted d-block">{formatDate(appt.date)}</small>
                  </div>

                  <div className="flex-grow-1">
                    <p className="mb-0 fw-semibold text-primary d-flex align-items-center">
                      <FaUser className="me-2" /> {appt.patientName}
                    </p>
                    <small className="text-muted d-flex align-items-center">
                      <FaInfoCircle className="me-2" />
                      {appt.patientEmail} | {appt.patientPhone}
                    </small>
                  </div>
                </div>

                <div>
                  <span
                    className={`badge bg-${
                      appt.status.toLowerCase() === "completed" ? "success" : "warning"
                    } fs-6 py-2 px-3 rounded-pill`}
                  >
                    {appt.status.toLowerCase() === "completed" ? (
                      <FaCheckCircle className="me-1" />
                    ) : (
                      <FaHourglassHalf className="me-1" />
                    )}
                    {appt.status}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          !loading &&
          !error && (
            <div className="p-4 text-center">
              <p className="text-muted mb-0">No upcoming appointments scheduled.</p>
            </div>
          )
        )}
      </Card.Body>
    </Card>
  );
}

export default DoctorUpcomingAppointments;
