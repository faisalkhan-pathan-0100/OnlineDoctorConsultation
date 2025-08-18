import React, { useState } from "react";
import { Container, Button, Form, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const specializations = [
    "Dermatologist",
    "Neurologist",
    "Gynecologist",
    "Psychologist",
    "Dietitian",
    "Sexologist",
    "Ayurvedic Specialist",
    "Homeopathic Doctor",
    "Orthopedic Surgeon",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = specializations.filter((spec) =>
        spec.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/doctors/specialization/${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (spec) => {
    setQuery(spec);
    setSuggestions([]);
    navigate(`/doctors/specialization/${encodeURIComponent(spec)}`);
  };

  return (
    <div
      className="bg-dark text-white text-center py-5 position-relative"
      style={{
        backgroundImage: `url('/your-background.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <Container>
        <h1>Get Online Doctor Consultation Anywhere, Anytime</h1>
        <div className="position-relative d-flex justify-content-center my-4">
          <Form.Control
            type="text"
            placeholder="Enter Speciality Name (e.g. Dietitian, Dermatologist)"
            className="w-50"
            value={query}
            onChange={handleChange}
          />
          <Button variant="danger" className="ms-2" onClick={handleSearch}>
            Search
          </Button>

          {suggestions.length > 0 && (
            <ListGroup
              style={{
                position: "absolute",
                top: "100%",
                zIndex: 1000,
                width: "50%",
              }}
            >
              {suggestions.map((spec, index) => (
                <ListGroup.Item
                  action
                  key={index}
                  onClick={() => handleSuggestionClick(spec)}
                >
                  {spec}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
        <div className="d-flex justify-content-center gap-4">
          <span>👨‍⚕️ Choose your Doctor</span>
          <span>💳 Pay Fee</span>
          <span>📞 Talk to Doctor</span>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
