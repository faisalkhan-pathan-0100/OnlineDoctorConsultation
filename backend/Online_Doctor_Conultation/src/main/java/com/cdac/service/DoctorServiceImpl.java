package com.cdac.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.custom_exceptions.ResourceNotFoundException;
import com.cdac.dao.AppointmentsDao;
import com.cdac.dao.DoctorDao;
import com.cdac.dao.UserRepository;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.PatientSummaryDto;
import com.cdac.dto.UpdateDoctorDto;
import com.cdac.entities.Doctor;
import com.cdac.entities.Patient;
import com.cdac.entities.User;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private AppointmentsDao appointmentsDao;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DoctorDao doctorDao;
	 @Autowired
	    private ModelMapper modelMapper;
	 @Autowired
		private AppointmentsDao appointmentDao;
	@Override
	public List<Doctor> getAllDoctors() {
		List<Doctor> doctors = doctorDao.findAll();
		return doctors;
	}
	@Override // derived query
	public List<Doctor> getDoctorBySpecialization(String specialization) {
		List<Doctor> doctors= doctorDao.findBySpecialization(specialization);
		return doctors;
	}
	 
	

	@Override
	public String deleteDoctorById(Long id) {
	    if (!doctorDao.existsById(id)) {
	        return "Doctor not found.";
	    }

	    // Check if any appointment is linked to this doctor
	    if (appointmentDao.existsByDoctorId(id)) {
	        throw new IllegalStateException("Doctor has existing appointments and cannot be deleted.");
	    }

	    doctorDao.deleteById(id);
	    return "Doctor record deleted successfully";
	}

	
	@Override
	public ApiResponse updateDoctorById(Long id, Doctor doctor) {
		// Validate existence
	    if (!doctorDao.existsById(id)) {
	        throw new ResourceNotFoundException("Invalid doctor id !!!!!");
	    }
	    // Fetch existing doc
	    Doctor existingDoctor = doctorDao.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("doctor not found with ID: " + id));
	    
	    //update feilds
	    existingDoctor.setCreationDate(LocalDate.now());
	    existingDoctor.setEmail(doctor.getEmail());
	    existingDoctor.setExperience(doctor.getExperience());
	    existingDoctor.setName(doctor.getName());
	    existingDoctor.setPhone(doctor.getPhone());
	    existingDoctor.setSpecialization(doctor.getSpecialization());
	    existingDoctor.setQualification(doctor.getQualification());
	    existingDoctor.setDescription(doctor.getDescription());
	    // Save updated patient
	    doctorDao.save(existingDoctor);

	    
	    return new ApiResponse("Updated doctor details ....");
				 
	}
	@Override
	public Optional<Doctor> getDoctorById(Long id) {
	    return doctorDao.findById(id);
	}
	
	// add new doctor
	@Override
	public String addDoctor(Doctor doctor) {
	    // Check if doctor already exists by email
	    if (doctorDao.existsByEmail(doctor.getEmail())) {
	        throw new RuntimeException("Patient already exists with email: " + doctor.getEmail());
	    }

	    // Set creation date and updated date (if not handled automatically)
	    doctor.setCreationDate(LocalDate.now());
	    doctor.setUpdatedOn(LocalDateTime.now());

	    // Save the doctor to doctors table
	    doctorDao.save(doctor);
	    //save doctor to users table
	    User user = new User();
	    user.setEmail(doctor.getEmail());
	    user.setPassword(doctor.getPassword());
	    user.setRole("DOCTOR");
	    userRepository.save(user);
	    System.out.println(user);
	    return "Doctor added successfully!";
	}


	@Override
	public Doctor getDoctorByEmail(String email) {
	    return doctorDao.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("Doctor with email " + email + " not found"));
	}


	// list of patient for perticular doctor
	@Override
	public List<PatientSummaryDto> fetchPatientsByDoctorId(Long doctorId) {
	    return appointmentsDao.fetchPatientsByDoctorId(doctorId);
	}

	
}
	
	

