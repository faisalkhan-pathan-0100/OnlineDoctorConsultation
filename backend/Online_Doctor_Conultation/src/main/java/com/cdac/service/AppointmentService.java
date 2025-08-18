package com.cdac.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cdac.dto.AppointmentInfoDTO;
import com.cdac.dto.AppointmentRequestDto;
import com.cdac.dto.DoctorAppointmentResponseDto;
import com.cdac.dto.PatientAppointmentResponseDto;


public interface AppointmentService {

	
	public List<AppointmentInfoDTO> allAppointments();
	String bookAppointment(AppointmentRequestDto dto);
	public List<PatientAppointmentResponseDto> appointmentsById(Long id);
	public String deleteAppointmentById(Long id);
	public List<DoctorAppointmentResponseDto> appointmentsByDocId(Long id);
}
