package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDto {
	    private String name;
	    private String email;
	    private String password;
	    private String phone;
		public SignUpRequestDto(String name, String email, String password, String phone) {
			super();
			this.name = name;
			this.email = email;
			this.password = password;
			this.phone = phone;
		}
	    
	    
}
