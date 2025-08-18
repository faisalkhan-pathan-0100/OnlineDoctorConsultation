// for appointment book
package com.cdac.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
//@NoArgsConstructor
public class AppointmentRequestDto {
    private LocalDate date;
    private String status;
    private LocalTime time;
    private Long doctorId;
    private Long patientId;
	public AppointmentRequestDto(LocalDate date, String status, LocalTime time, Long doctorId, Long patientId) {
		super();
		this.date = date;
		this.status = status;
		this.time = time;
		this.doctorId = doctorId;
		this.patientId = patientId;
	}
	 
    
    
}
