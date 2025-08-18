// for admin
package com.cdac.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentInfoDTO {
	private Long id;
    private LocalDate date;
    private LocalTime time;
    private String status;
    private String doctorName;
    private String patientName;

    public AppointmentInfoDTO(Long id, LocalDate date, LocalTime time, String status, String doctorName, String patientName) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.status = status;
        this.doctorName = doctorName;
        this.patientName = patientName;
    }
}
