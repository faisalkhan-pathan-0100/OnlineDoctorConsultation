package com.cdac.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.custom_exceptions.ResourceNotFoundException;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.PatientSummaryDto;
import com.cdac.entities.Doctor;
import com.cdac.service.DoctorService;



@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "http://localhost:5173") 
public class DoctorController {
	public DoctorController() {
		System.out.println("in doctor controller");
	}
	
	@Autowired
	private DoctorService doctorService;
	
	/*
	 Add REST API end point
	 * Desc - Get all doctors dfor home page rendering (card)
	 * URL - http://host:port/doctors 
	 * Method - GET
	 * Payload - none
	 * Resp -  success(available restaurants - SC 200 , (List<Restaurant>) -> JSON Array
	 * no restaurants  -only  SC 204 
	 */
	
	@GetMapping
	public ResponseEntity<?> getAllDoctors(){
		System.out.println(" get all doctor ");
		List<Doctor> doctors= doctorService.getAllDoctors();
		if(doctors.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(doctors);
	}
	
	/*
	 * http://localhost:8080/doctors/specialization/Orthopedics
	 *  Method - GET
	 */
	
	@GetMapping("/specialization/{specialization}")
	public ResponseEntity<?> getDoctorBySpecialization(@PathVariable String specialization ){
		List<Doctor> doctors = doctorService.getDoctorBySpecialization(specialization);
		if(doctors.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.status(HttpStatus.OK).body(doctors);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
	    System.out.println("in get doctor by id");
	    Optional<Doctor> doctor = doctorService.getDoctorById(id);
	    if (doctor.isPresent()) {
	        return ResponseEntity.ok(doctor.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                             .body("Doctor not found with ID: " + id);
	    }
	}
	
	/*
	 * http://localhost:8080/doctors/{id}
	 * method - delete
	 */
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDoctorById(@PathVariable Long id){
		System.out.println("in delete doctor by id");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(doctorService.deleteDoctorById(id));		
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	/*
	 * http://localhost:8080/doctors/{id}
	 * method - put 
	 * 
	 */
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDoctorDetailes(@PathVariable Long id, @RequestBody Doctor doctor){
		
		try {
			return ResponseEntity.status(HttpStatus.OK).body(doctorService.updateDoctorById(id,doctor));		
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	 // http://localhost:8080/doctors
	@PostMapping 
	public ResponseEntity<?> addNewDoctor(@RequestBody Doctor doctor) {
	    try {
	        return ResponseEntity.status(HttpStatus.OK)
	                .body(doctorService.addDoctor(doctor));
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(new ApiResponse(e.getMessage()));
	    }
	}

	
	// finder doctor id by email
	// Controller
	@GetMapping("/by-email/{email:.+}")
	public ResponseEntity<?> getDoctorDetailsByEmail(@PathVariable String email) {
	    System.out.println("Fetching doctor details for email: " + email);
	    Doctor doctor = doctorService.getDoctorByEmail(email); // updated service method
	    if (doctor != null) {
	        return ResponseEntity.ok(doctor);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
	    }
	}


	//to  get the list of patients for perticular doctor
	//http://localhost:8080/doctors/{doctorId}/patients
	@GetMapping("/{doctorId}/patients")
	public ResponseEntity<?> getPatientsByDoctorId(@PathVariable Long doctorId) {
	    try {
	        List<PatientSummaryDto> patients = doctorService.fetchPatientsByDoctorId(doctorId);
	        return ResponseEntity.ok(patients);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error fetching patients");
	    }
	}


}
