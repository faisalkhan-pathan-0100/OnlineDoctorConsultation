package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.dto.AppointmentInfoDTO;
import com.cdac.dto.DoctorAppointmentResponseDto;
import com.cdac.dto.PatientAppointmentResponseDto;
import com.cdac.dto.PatientSummaryDto;
import com.cdac.entities.Appoinments;

public interface AppointmentsDao extends JpaRepository<Appoinments, Long>{
	
	@Query("SELECT a.id AS id, a.date AS date, a.time AS time, a.status AS status, " +
		       "d.name AS doctorName, p.name AS patientName " +
		       "FROM Appoinments a " +
		       "JOIN a.doctor d " +
		       "JOIN a.patient p")
		List<AppointmentInfoDTO> fetchAppointmentSummary();

	
	@Query("SELECT  a.id AS id, a.date AS date, a.time AS time, a.status AS status, " +
			"d.name AS doctorName " +
		       "FROM Appoinments a " +
		       "JOIN a.doctor d " +
		       "JOIN a.patient p " +
		       "WHERE p.id = :id")
		List<PatientAppointmentResponseDto> fetchAppointmentSummaryById(@Param("id") Long id);

	@Query("SELECT  a.id AS id, a.date AS date, a.time AS time, a.status AS status,  " +
			"p.name AS patientName , p.email as patientEmail , p.phone as PatientPhone " +
		       "FROM Appoinments a " +
		       "JOIN a.doctor d " +
		       "JOIN a.patient p " +
		       "WHERE d.id = :id")
	List<DoctorAppointmentResponseDto> fetchAppointmentSummaryByDoctorId(@Param("id") Long id);

//	"SELECT a.date AS date, a.time AS time, a.status AS status, " +
//	"d.name AS doctorName " +
//	"FROM Appoinments a " +
//	"JOIN a.doctor d " +
//	"JOIN a.patient p " +
//	"WHERE p.id = :id"
	
	@Query("SELECT DISTINCT new com.cdac.dto.PatientSummaryDto(p.name, p.email, p.phone) " +
		       "FROM Appoinments a " +
		       "JOIN a.patient p " +
		       "JOIN a.doctor d " +
		       "WHERE d.id = :doctorId")
		List<PatientSummaryDto> fetchPatientsByDoctorId(@Param("doctorId") Long doctorId);


	boolean existsByDoctorId(Long id);

}
