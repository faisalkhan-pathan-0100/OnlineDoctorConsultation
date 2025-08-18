package com.cdac.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import com.cdac.entities.Patient;
import java.util.List;
import java.util.Optional;


public interface PatientDao extends JpaRepository<Patient, Long>{
	Optional<Patient>  findById(Long id);

	boolean existsByEmail(String email);

	Optional<Patient> findByEmail(String email);
}
