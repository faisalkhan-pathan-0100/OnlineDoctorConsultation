// src/components/DashboardContent.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import DashboardCard from './DashboardCard';
import DoctorUpcomingAppointments from './DoctorUpcomingAppointments';
import { FaUserPlus, FaCalendarCheck } from 'react-icons/fa';

function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      axios
        .get(`http://localhost:8080/doctors/by-email/${encodeURIComponent(email)}`)
        .then((res) => {
          const doctor = res.data;
          setDoctorName(doctor.name);
        })
        .catch((err) => {
          console.error("Failed to fetch doctor details", err);
        });
    }
  }, []);

  return (
    <Container fluid className="p-5">
      <div className="d-flex flex-column mb-3 justify-content-center align-items-center">
        <h4>Welcome, Dr. {doctorName}</h4>
        <p>Here's a quick overview of your day.</p>
      </div>

      <Row className="mt-5 d-flex mb-3 justify-content-center align-items-center">
        {/* <Col lg={8} xl={6}>
          <DoctorUpcomingAppointments />
        </Col> */}
        <Col md={4} lg={4} xl={3}>
          <DashboardCard
            title="My Appointments"
            icon={<FaCalendarCheck />}
            linkText="View All Appointments"
            linkHref="/doctor/appointments"
          />
        </Col>
        <Col md={4} lg={4} xl={3}>
          <DashboardCard
            title="My Patients"
            icon={<FaUserPlus />}
            linkText="View All Patients"
            linkHref="/doctor/patients"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorDashboard;
