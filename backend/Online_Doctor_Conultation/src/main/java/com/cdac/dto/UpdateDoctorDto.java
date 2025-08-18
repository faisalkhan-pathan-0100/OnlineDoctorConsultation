package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateDoctorDto {

	// email | experience | name  | phone | specialization
	private String email;
	private int experience;
	private String name;
	private String phone;
	private String Specialization;
}
