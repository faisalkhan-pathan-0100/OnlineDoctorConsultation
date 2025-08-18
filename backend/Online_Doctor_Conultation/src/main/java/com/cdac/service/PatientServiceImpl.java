package com.cdac.service;



import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.custom_exceptions.ResourceNotFoundException;
import com.cdac.dao.PatientDao;
import com.cdac.dto.ApiResponse;
import com.cdac.entities.Doctor;
import com.cdac.entities.Patient;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientDao patientDao;
	
	// get all patients
	@Override
	public List<Patient> getAllPatients() {
		List<Patient> patients = patientDao.findAll();
		return patients;
	}
	
	//delete patient by id
	@Override
	public String deletePatientById(Long id) {
		if(patientDao.existsById(id)) {
			patientDao.deleteById(id);
			return "patient record deleted successfully";
		}
		return "failed to delete the patient record";
	}

	
	//update patient details
//	@Override
//	public ApiResponse updateDetails(Long id, 
//			Patient patient) {
//		//validate
//		if(patientDao.existsById(id)) {
//			Patient patient1 = patientDao.save(patient);
//			System.out.println(patient1);
//			return new ApiResponse("Updated patient details ....");
//		}
//		throw new ResourceNotFoundException
//		("Invalid patient id !!!!!");
//	}//DML - update

	@Override
	public ApiResponse updateDetails(Long id, Patient updatedPatient) {
	    // Validate existence
	    if (!patientDao.existsById(id)) {
	        throw new ResourceNotFoundException("Invalid patient id !!!!!");
	    }

	    // Fetch existing patient
	    Patient existingPatient = patientDao.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + id));

	    // Update fields
	    existingPatient.setName(updatedPatient.getName());
	    existingPatient.setEmail(updatedPatient.getEmail());
	    existingPatient.setPhone(updatedPatient.getPhone());
	    existingPatient.setCreationDate(LocalDate.now());
	    // ...set other fields as needed

	    // Save updated patient
	    patientDao.save(existingPatient);

	    return new ApiResponse("Updated patient details ....");
	}

	
	
	@Override
	public boolean existsByEmail(String email) {
        return patientDao.existsByEmail(email);
    }

	@Override
	public ApiResponse updateDetailsByEmail(String email, Patient patient) {
		 // Validate existence
	    if (!patientDao.existsByEmail(email)) {
	    	System.out.println(patientDao.existsByEmail(email));
	        throw new ResourceNotFoundException("Invalid patient email !!!!!");
	    }

	    // Fetch existing patient
	    Patient existingPatient = patientDao.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("Patient not found with email: " + email));

	    // Update fields
	    existingPatient.setName(patient.getName());
	    existingPatient.setEmail(patient.getEmail());
	    existingPatient.setPhone(patient.getPhone());
	    existingPatient.setCreationDate(LocalDate.now());
	    // ...set other fields as needed

	    // Save updated patient
	    patientDao.save(existingPatient);

	    return new ApiResponse("Updated patient details ....");
	}
	
	
	@Override
	public ApiResponse addPatient(Patient patient) {
		// Check if doctor already exists by email
	    if (patientDao.existsByEmail(patient.getEmail())) {
	        throw new RuntimeException("Patient already exists with email: " + patient.getEmail());
	    }

	    // Set creation date and updated date (if not handled automatically)
	    patient.setCreationDate(LocalDate.now());
	    patient.setUpdatedOn(LocalDateTime.now());

	    // Save the doctor
	    patientDao.save(patient);
	    
	    return  new ApiResponse("parient added successfully!");
		
	}

	@Override
	public Patient getPatientByEmail(String email) {
	    return patientDao.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("Doctor with email " + email + " not found"));
	}
	
}
