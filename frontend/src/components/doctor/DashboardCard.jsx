// src/components/DashboardCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

function DashboardCard({ title, value, icon, linkText, linkHref, onClick }) {
  return (
    <Card
      className="text-center mb-3 shadow border rounded"
      style={{ transition: 'transform 0.2s ease-in-out' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Body className="p-3">
        {icon && <div className="mb-2 text-primary fs-2">{icon}</div>}
        <Card.Title className="h3 mb-1 fw-bold text-dark">{value}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{title}</Card.Subtitle>
        {linkText && linkHref && (
          <Card.Link
            href={linkHref}
            className="mt-2 d-block text-decoration-none text-white fw-semibold rounded py-1 px-2"
            onClick={onClick}
            style={{
              backgroundColor: '#007bff',
              display: 'inline-block',
              minWidth: '100px',
              transition: 'background-color 0.15s ease-in-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            {linkText}
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;