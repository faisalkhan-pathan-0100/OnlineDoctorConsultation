import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import '../styles/DoctorCardStyles.css';


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/doctors')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>;
  }

  return (
    <div className="container mt-5">
      <style>{`
        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          background: #ffffff;
        }
        .doctor-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .doctor-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #007bff;
        }
        .doctor-name {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .specialization {
          font-size: 1rem;
          font-weight: 500;
          color: #6c757d;
        }
        .card-body p {
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
          color: #333;
        }
      `}</style>

      <h2 className="mb-5 text-center text-success fw-bold">Our Trusted Doctors</h2>
      <p className="text-center mb-4 text-muted">
        Meet our team of experienced doctors dedicated to providing the best healthcare services.</p>
      <Row>
        {doctors.map(doc => (
          <Col md={6} lg={4} className="mb-4" key={doc.id}>
            <Card className="doctor-card shadow-sm p-3">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random`}
                    alt={doc.name}
                    className="doctor-img"
                  />
                  <div>
                    <div className="doctor-name">{doc.name}</div>
                    <div className="specialization">{doc.specialization} • {doc.experience} yrs</div>
                  </div>
                </div>
                <p><strong>Email:</strong> {doc.email}</p>
                <p><strong>Phone:</strong> {doc.phone}</p>
                <p><strong>Qualification:</strong> {doc.qualification}</p>
                <p><strong>Description:</strong> {doc.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Doctors;
