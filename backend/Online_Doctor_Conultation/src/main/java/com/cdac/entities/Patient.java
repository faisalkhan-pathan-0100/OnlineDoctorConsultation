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
import lombok.ToString;

@Entity
@Table(name ="patients")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Patient extends BaseEntity{
	@Column(length = 100)
	private String name;
	@Column(length= 50)
	private String email;
	@Column(length= 50)
	private String phone;
//	
	@OneToMany(mappedBy = "patient")
	@JsonIgnore
	private List<Appoinments> appointments;
	public Patient(String name, String email, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
	}
	
	
}
