package com.cdac.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entities.Doctor;


public interface DoctorDao extends JpaRepository<Doctor, Long> {

	List<Doctor> findBySpecialization(String specialization);

	boolean existsByEmail(String email);

	 
	Optional<Doctor> findByEmail(String email);
	

}
