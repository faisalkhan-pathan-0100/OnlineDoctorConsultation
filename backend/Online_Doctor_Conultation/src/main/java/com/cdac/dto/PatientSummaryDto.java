
// to fetch the all the patients in doctor patientpage (Patient nav link of doctor navbar)
package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
public class PatientSummaryDto {
   
    private String name;
    private String email;
    private String phone;

}
