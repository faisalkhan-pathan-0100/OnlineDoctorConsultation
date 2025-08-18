package com.cdac.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false, unique = true, length = 100)
	    private String email;

	    @Column(nullable = false)
	    private String password;

	    @Column(nullable = false, length = 20)
	    private String role; // "PATIENT" or "ADMIN"

//		public User(Long id, String email, String role) {
//			super();
//			this.id = id;
//			this.email = email;
//			this.role = role;
//		}
	
	    
}
