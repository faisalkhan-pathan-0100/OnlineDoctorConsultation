package com.cdac.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="doctors")
@NoArgsConstructor
@Getter
@Setter
public class Doctor extends BaseEntity {
	@Column(length = 50)
	private String name;
	@Column(length = 50)
	private String specialization;
	private int experience;
	@Column(length = 70,unique=true)
	private String email;
	@Column(length = 10,unique=true)
	private String phone;
	@Column(length = 50)
	private String qualification;
	@Column(length = 500)
	private String description;
	private String password;
//	
	@OneToMany(mappedBy = "doctor")
	@JsonIgnore
	private List<Appoinments> appointments; 
//	
	// para constructor
	public Doctor(String name, String specialization, int experience, String email, String phone) {
		this.name = name;
		this.specialization = specialization;
		this.experience = experience;
		this.email = email;
		this.phone = phone;
	}
	
	
}
