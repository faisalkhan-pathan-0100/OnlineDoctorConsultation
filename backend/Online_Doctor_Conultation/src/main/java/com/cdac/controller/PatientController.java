package com.cdac.controller;

import java.util.List;

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

import com.cdac.dto.ApiResponse;
import com.cdac.entities.Doctor;
import com.cdac.entities.Patient;
import com.cdac.service.PatientService;



@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {
	
	public PatientController() {
		System.out.println("in patient controller");
	}
	
	@Autowired
	private PatientService patientService;
	

	/*
	 Add REST API end point
	 * Desc - Get all patient for admin role patients navlink page rendering 
	 * URL - http://host:port/patients 
	 * Method - GET
	 * Payload - none
	 * Resp -  success - SC 200 , (List<Patient>) -> JSON Array
	 * no restaurants  -only  SC 204 
	 */
	
	@GetMapping
	public ResponseEntity<?> getAllPatients(){
		System.out.println(" get all doctor ");
		List<Patient> patients= patientService.getAllPatients();
		if(patients.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(patients);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePatientById(@PathVariable Long id){
		System.out.println("in delete patient by id");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(patientService.deletePatientById(id));		
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	
	/*
	 * http://localhost:8080/patients/{id}
	 * method - put 
	 * 
	 */
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDetails(@PathVariable Long id,
			@RequestBody Patient patient)
	{
		System.out.println(patient);
		System.out.println("in update "+id+" "+patient);
		try {
			return ResponseEntity.ok
			(patientService.
					updateDetails(id,patient));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PutMapping("/email/{email}")
	public ResponseEntity<?> updateDetails(@PathVariable String email,
			@RequestBody Patient patient)
	{
		System.out.println(patient);
		System.out.println("in update "+email+" "+patient);
		try {
			return ResponseEntity.ok
			(patientService.
					updateDetailsByEmail(email,patient));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
//	@PostMapping("/add")
//	public ResponseEntity<?> addNewPatient(@RequestBody Patient patient){
//		System.out.println("in add new patient api");
//		 try {
//		        return ResponseEntity.status(HttpStatus.OK)
//		                .body(patientService.addPatient(patient));
//		    } catch (RuntimeException e) {
//		        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//		                .body(new ApiResponse(e.getMessage()));
//		    }
//	}
	
	// get patient details by email
	@GetMapping("/by-email/{email:.+}")
	public ResponseEntity<?> getPatientDetailsByEmail(@PathVariable String email) {
	    System.out.println("Fetching doctor details for email: " + email);
	    Patient patient = patientService.getPatientByEmail(email); // updated service method
	    if (patient != null) {
	        return ResponseEntity.ok(patient);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
	    }
	}
}
