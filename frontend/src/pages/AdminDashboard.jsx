import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-3 fw-bold">👨‍⚕️ Admin Dashboard</h2>
      <p className="lead">Welcome, Admin! Use the navigation bar to manage doctors, patients, and appointments.</p>

      <Link to="/admin/add-doctor" className="btn btn-success mb-5 px-4 py-2 fw-semibold">
        ➕ Add New Doctor
      </Link>

      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">Doctors</h5>
              <p className="card-text">View and manage registered doctors.</p>
              <Link to="/admin/doctors" className="btn btn-outline-primary">
                View All Doctors
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-success">Patients</h5>
              <p className="card-text">Access patient data and appointment history.</p>
              <Link to="/admin/patients" className="btn btn-outline-success">
                View All Patients
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-warning">Appointments</h5>
              <p className="card-text">View all upcoming and past appointments.</p>
              <Link to="/admin/appointments" className="btn btn-outline-warning">
                View All Appointments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
