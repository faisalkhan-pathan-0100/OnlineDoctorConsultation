import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Specialization = () => {
  const { specialization } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/doctors/specialization/${specialization}`)
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
        setNotFound(false);
      })
      .catch((err) => {
        if (err.response?.status === 204) {
          setNotFound(true);
        }
        setLoading(false);
      });
  }, [specialization]);

  return (
    <Container className="mt-4">
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

      <h2 className="mb-4 text-success text-center fw-bold text-capitalize">
        {specialization} Specialists
      </h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      )}

      {notFound && (
        <Alert variant="warning">No doctors found in this specialization.</Alert>
      )}

      <Row>
        {!loading &&
          doctors.map((doc, index) => (
            <Col md={6} lg={4} className="mb-4" key={index}>
              <Card className="doctor-card shadow-sm p-3 h-100">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random`}
                      alt={doc.name}
                      className="doctor-img"
                    />
                    <div>
                      <div className="doctor-name">{doc.name}</div>
                      <div className="specialization">
                        {doc.specialization} • {doc.experience} yrs
                      </div>
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
    </Container>
  );
};

export default Specialization;
