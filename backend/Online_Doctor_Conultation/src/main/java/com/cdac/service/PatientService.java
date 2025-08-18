package com.cdac.service;

import java.util.List;

import com.cdac.dto.ApiResponse;
import com.cdac.entities.Doctor;
import com.cdac.entities.Patient;

public interface PatientService {

	List<Patient> getAllPatients();

	String deletePatientById(Long id);

	ApiResponse updateDetails(Long id, Patient patient);

	ApiResponse addPatient(Patient patient);

	ApiResponse updateDetailsByEmail(String email, Patient patient);

	boolean existsByEmail(String email);

	Patient getPatientByEmail(String email);

	

}
