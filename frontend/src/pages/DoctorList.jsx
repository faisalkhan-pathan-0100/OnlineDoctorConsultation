// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Row, Col, Spinner, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Doctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = () => {
//     axios.get('http://localhost:8080/doctors')
//       .then(response => {
//         setDoctors(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching doctors:', error);
//         setLoading(false);
//       });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this doctor?")) {
//       try {
//         await axios.delete(`http://localhost:8080/doctors/${id}`);
//         fetchDoctors();
//       } catch (error) {
//         console.error("Error deleting doctor:", error);
//       }
//     }
//   };

//   const navigate = useNavigate();
//   const handleEdit = (id) => {
//     navigate(`/doctor/update/${id}`);
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <div className="text-center mb-5">
//         <h2 className="fw-bold display-5 text-primary">👨‍⚕️ Our Top Doctors</h2>
//         <p className="text-muted fs-5">Meet our certified and experienced medical professionals</p>
//       </div>

//       <Row className="g-4">
//         {doctors.map(doc => (
//           <Col md={6} lg={4} key={doc.id}>
//             <Card className="border-0 shadow-lg rounded-4 h-100 doctor-card">
//               <div className="p-4 pb-0 text-center">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
//                   alt="Doctor"
//                   className="rounded-circle shadow"
//                   width="100"
//                   height="100"
//                 />
//                 <h5 className="mt-3 mb-1 fw-bold">{doc.name}</h5>
//                 <p className="text-muted mb-2">{doc.specialization} • {doc.experience} yrs</p>
//               </div>
//               <Card.Body className="pt-2">
//                 <p className="mb-1"><strong>Email:</strong> {doc.email}</p>
//                 <p className="mb-1"><strong>Phone:</strong> {doc.phone}</p>
//                 <p className="mb-1"><strong>Qualification:</strong> {doc.qualification}</p>
//                 <p className="text-secondary"><strong>About:</strong> {doc.description}</p>
//               </Card.Body>
//               <Card.Footer className="bg-light d-flex justify-content-between border-top px-4 py-3">
//                 <Button variant="outline-primary" size="sm" onClick={() => handleEdit(doc.id)}>
//                   ✏️ Edit
//                 </Button>
//                 <Button variant="outline-danger" size="sm" onClick={() => handleDelete(doc.id)}>
//                   🗑️ Delete
//                 </Button>
//               </Card.Footer>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Doctors;
//===================================================================================
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios.get('http://localhost:8080/doctors')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/doctors/${id}`);
        console.log("Delete response:", response.data);
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/doctor/update/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-gradient">👨‍⚕️ Meet Our Doctors</h2>
      <Row className="g-3">
        {doctors.map(doc => (
          <Col xs={12} sm={6} md={4} lg={3} key={doc.id}>
            <Card className="doctor-card text-center border-0 shadow-sm rounded-4">
              <Card.Body className="p-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3870/3870822.png"
                  alt="Doctor"
                  className="rounded-circle mb-3 border border-2"
                  width="60"
                  height="60"
                />
                <h6 className="fw-bold mb-0">{doc.name}</h6>
                <small className="text-muted">{doc.specialization}</small>
                <hr />
                <div className="text-start small">
                  <p className="mb-1"><i className="bi bi-envelope-at-fill text-primary me-1"></i>{doc.email}</p>
                  <p className="mb-1"><i className="bi bi-phone-fill text-success me-1"></i>{doc.phone}</p>
                  <p className="mb-1"><i className="bi bi-mortarboard-fill text-warning me-1"></i>{doc.qualification}</p>
                  <p className="text-muted"><i className="bi bi-info-circle text-info me-1"></i>{doc.description}</p>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white d-flex justify-content-around border-top">
                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(doc.id)}>✏️</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(doc.id)}>🗑️</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CSS for effects */}
      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #007cf0, #00dfd8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-height: 350px;
        }
        .doctor-card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .doctor-card img {
          background-color: #f8f9fa;
          padding: 6px;
        }
      `}</style>
    </div>
  );
};

export default Doctors;
