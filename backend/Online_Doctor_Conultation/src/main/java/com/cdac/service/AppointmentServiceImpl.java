package com.cdac.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.AppointmentsDao;
import com.cdac.dao.DoctorDao;
import com.cdac.dao.PatientDao;
import com.cdac.dto.AppointmentInfoDTO;
import com.cdac.dto.AppointmentRequestDto;
import com.cdac.dto.DoctorAppointmentResponseDto;
import com.cdac.dto.PatientAppointmentResponseDto;
import com.cdac.entities.Appoinments;
import com.cdac.entities.Doctor;
import com.cdac.entities.Patient;

@Service
@Transactional
public class AppointmentServiceImpl  implements AppointmentService{

	
	@Autowired
	private AppointmentsDao appointmentsDao;

    @Autowired
    private DoctorDao doctorDao;

    @Autowired
    private PatientDao patientDao;

	
	public List<AppointmentInfoDTO> allAppointments() {
		List<AppointmentInfoDTO> appointments = appointmentsDao.fetchAppointmentSummary();
		return appointments;
	}

	

    @Override
    public String bookAppointment(AppointmentRequestDto
    		dto) {
        Appoinments app = new Appoinments();

        app.setDate(dto.getDate());
        app.setTime(dto.getTime());
        app.setStatus(dto.getStatus());
        app.setCreationDate(LocalDate.now());
        app.setUpdatedOn(LocalDateTime.now());

        Doctor doctor = doctorDao.findById(dto.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientDao.findById(dto.getPatientId()).orElseThrow(() -> new RuntimeException("Patient not found"));

        app.setDoctor(doctor);
        app.setPatient(patient);

        appointmentsDao.save(app);

        return "Appointment Booked Successfully!";
    }



	@Override
	public List<PatientAppointmentResponseDto> appointmentsById(Long id) {
		List<PatientAppointmentResponseDto> appointments = appointmentsDao.fetchAppointmentSummaryById(id);
		return appointments;
		
	}



	@Override
	public String deleteAppointmentById(Long id) {
		if(appointmentsDao.existsById(id)) {
			appointmentsDao.deleteById(id);
			return "Appointment record deleted successfully";
		}
		return "failed to deleted";
		
	}
    
	@Override
	public List<DoctorAppointmentResponseDto> appointmentsByDocId(Long id) {
		List<DoctorAppointmentResponseDto> appointments = appointmentsDao.fetchAppointmentSummaryByDoctorId(id);
		return appointments;
		
	}
}
