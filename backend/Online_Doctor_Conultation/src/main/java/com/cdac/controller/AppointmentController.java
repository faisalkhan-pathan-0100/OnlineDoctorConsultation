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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AppointmentInfoDTO;
import com.cdac.dto.AppointmentRequestDto;
import com.cdac.dto.DoctorAppointmentResponseDto;
import com.cdac.dto.PatientAppointmentResponseDto;
import com.cdac.service.AppointmentService;


@RestController
//@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {
	public AppointmentController() {
		System.out.println("in appoinments controller...");
	}
	
	@Autowired
	private AppointmentService appointmentService;
	
	@GetMapping("/admin/appointments")
	public List<AppointmentInfoDTO> getAllAppoinments(){
		List<AppointmentInfoDTO> appoinments = appointmentService.allAppointments();
		return appoinments;
	}
	
	@PostMapping("/appointments/add")
    public ResponseEntity<?> addAppointment(@RequestBody AppointmentRequestDto dto) {
        String result = appointmentService.bookAppointment(dto);
        return ResponseEntity.ok(result);
    }
	
	@GetMapping("/patient/appoinment/{id}")
	public List<PatientAppointmentResponseDto> appointByPatientId(@PathVariable Long id){
		List<PatientAppointmentResponseDto> appoinments = appointmentService.appointmentsById(id);
		return appoinments;
	}
	
	@DeleteMapping("/patient/appoinment/{id}") // id = appointment id
	public ResponseEntity<?> deleteAppointmentBypatientId(@PathVariable Long id){
		System.out.println("in delete patient appointment by id");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(appointmentService.deleteAppointmentById(id));		
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	@GetMapping("/doctor/appoinment/{id}")
	public List<DoctorAppointmentResponseDto> appointByDoctorId(@PathVariable Long id){
		List<DoctorAppointmentResponseDto> appoinments = appointmentService.appointmentsByDocId(id);
		return appoinments;
	}
}
