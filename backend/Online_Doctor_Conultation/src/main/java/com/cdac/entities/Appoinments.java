package com.cdac.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne; // ✅ Added for relationship
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "appoinments")
@Getter
@Setter
@NoArgsConstructor
public class Appoinments extends BaseEntity {
	private LocalDate date;
	private LocalTime time;
	private String status;

//	// ✅ Added relationship with Doctor
	@ManyToOne
	@JoinColumn(name = "doctor_id") // FK column in appointments table
	private Doctor doctor;
//
//	// ✅ Added relationship with Patient
	@ManyToOne
	@JoinColumn(name = "patient_id") // FK column in appointments table
	private Patient patient;

	public Appoinments(LocalDate date, LocalTime time, String status) {
		this.date = date;
		this.time = time;
		this.status = status;
	}
}
