// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Doctors from './pages/Doctors';
import NavbarGeneral from './components/NavbarGeneral';
import Footer from './components/Footer';
import Specialization from './pages/Specialization';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import { useState } from 'react';
import Patients from './pages/Patients';
import DoctorList from './pages/DoctorList';
import DoctorDetailUpdateForm from './components/DoctorDetailUpdateForm';
import AddDoctorForm from './components/AddDoctorForm';
import AppointmentList from './components/AppointmentList';
import DoctorNavbar from './components/doctor/DoctorNavbar';
import AppointmentsPage from './components/doctor/AppointmentsPage';
import PatientsPage from './components/doctor/PatientsPage';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DoctorProfilePage from './components/doctor/DoctorProfilePage';
import PatientNavbar from './components/patient/PatientNavbar';
import MyAppointments from './components/patient/MyAppointments';
import BookAppointment from './components/patient/BookAppointment';
import PatientProfilePage from './components/patient/PatientProfilePage';
import AboutUs from './pages/AboutUs';

function App() {
  // const role = localStorage.getItem('role');
  // console.log('User Role:', role);
  // const storedUser = localStorage.getItem('loggedInUser');
  // console.log('Stored User:', storedUser);
  // const user = storedUser ? JSON.parse(storedUser) : null;
  // console.log('Parsed User:', user);
   const [role, setRole] = useState(localStorage.getItem('role'));



  const renderNavbar = () => {
    if (role === 'ADMIN') return <AdminNavbar setRole={setRole}/>;
    if (role === 'PATIENT') return <PatientNavbar setRole={setRole} />;
    if (role === 'DOCTOR') return <DoctorNavbar setRole={setRole}/>;
    return <NavbarGeneral />;
  };
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        {renderNavbar()}
        
        <main className="flex-grow-1">
          <Routes>
            {/* general Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/specialization/:specialization" element={<Specialization />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login setRole={setRole}/>} />
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<DoctorList />} />
            <Route path="/admin/patients" element={<Patients />} />
            <Route path="/doctor/update/:id" element={<DoctorDetailUpdateForm />} />
            <Route path="/admin/add-doctor" element={<AddDoctorForm />} />
            <Route path="/admin/appointments" element={<AppointmentList />} />
            {/* doc Routes */}
            <Route path="/doctor/appointments" element={<AppointmentsPage />} /> {/* Assuming this is for doctors*/}
            <Route path="/doctor/patients" element={<PatientsPage />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/profile" element={<DoctorProfilePage />} />

            {/*patient route*/}
            <Route path="/patient/my-appointments" element={<MyAppointments />} />
            <Route path="/patient/book-appointment" element={<BookAppointment />} />
            <Route path="/patient/profile" element={<PatientProfilePage />} />
            <Route path="/patient/dashboard" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
