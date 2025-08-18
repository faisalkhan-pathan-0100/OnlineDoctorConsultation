package com.cdac.service;

import java.util.List;
import java.util.Optional;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.PatientSummaryDto;
import com.cdac.dto.UpdateDoctorDto;
import com.cdac.entities.Doctor;

public interface DoctorService {

	List<Doctor> getAllDoctors();

	List<Doctor> getDoctorBySpecialization(String specialization);

	String deleteDoctorById(Long id);

	

	ApiResponse updateDoctorById(Long id, Doctor doctor);

	Optional<Doctor> getDoctorById(Long id);

	String addDoctor(Doctor doctor);

	Doctor getDoctorByEmail(String email);

	 
	 List<PatientSummaryDto> fetchPatientsByDoctorId(Long doctorId);




}
