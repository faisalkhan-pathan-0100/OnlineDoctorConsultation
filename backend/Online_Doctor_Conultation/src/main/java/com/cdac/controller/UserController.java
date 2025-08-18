package com.cdac.controller;

import java.util.List;
import java.util.Optional;

import com.cdac.dao.PatientDao;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.SignUpRequestDto;
import com.cdac.entities.User;
import com.cdac.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	@Autowired
    private  PatientDao patientDao;

    @Autowired
    private UserService userService;

    public UserController(PatientDao patientDao) {
        System.out.println("In UserController");
        this.patientDao = patientDao;
    }

    // Register new user (default role is patient)
//    @PostMapping("/signup")
//    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        try {
//            User savedUser = userService.registerUser(user);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ApiResponse("Error during registration"));
//        }
//    }
    // signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequestDto dto) {
        try {
        	userService.registerUser(dto);
            return ResponseEntity.ok("User registered successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> authenticatedUser = userService.login(user.getEmail(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            return ResponseEntity.ok(authenticatedUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Invalid email or password"));
        }
    }

    // Login endpoint
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody User user) {
//        Optional<User> authenticatedUser = userService.login(user.getEmail(), user.getPassword());
//
//        if (authenticatedUser.isPresent()) {
//            User foundUser = authenticatedUser.get();
//
//            boolean needsProfileCompletion = false;
//
//            if (foundUser.getRole().equalsIgnoreCase("PATIENT")) {
//                // check if this user exists in patients table
//                needsProfileCompletion = !patientService.existsByEmail(foundUser.getEmail());
//            }
//
//            return ResponseEntity.ok(new LoginResponseDto(foundUser, needsProfileCompletion));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(new ApiResponse("Invalid email or password"));
//        }
//    }
    // Get all users (admin-only logic to be enforced in frontend/backend logic later)
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("User not found"));
    }

    // Update user info
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(new ApiResponse("User deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
        }
    }
}
