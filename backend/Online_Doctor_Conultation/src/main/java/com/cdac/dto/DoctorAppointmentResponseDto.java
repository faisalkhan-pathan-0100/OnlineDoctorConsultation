// this is for when doctor want to see all the appointment of patient  with him
package com.cdac.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class DoctorAppointmentResponseDto {
	private Long id;
	private LocalDate date;
    private LocalTime time;
    private String status;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
	public DoctorAppointmentResponseDto(Long id,LocalDate date, LocalTime time, String status, String patientName,String patientEmail, String patientPhone) {
		super();
		this.id = id;
		this.date = date;
		this.time = time;
		this.status = status;
		this.patientName = patientName;
		this.patientEmail = patientEmail;
		this.patientPhone = patientPhone;
	}
		 
	    
	    
}

