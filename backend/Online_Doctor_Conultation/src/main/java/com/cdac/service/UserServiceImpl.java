package com.cdac.service;

import java.util.List;
import java.util.Optional;

import com.cdac.entities.Patient;
import com.cdac.entities.User;
import com.cdac.dao.PatientDao;
import com.cdac.dao.UserRepository;
import com.cdac.dto.SignUpRequestDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientDao patientDao;
    @Override
    public void registerUser(SignUpRequestDto dto) {
    	if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Save to users
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole("PATIENT");
        userRepository.save(user);

        // Save to patients
        Patient patient = new Patient(dto.getName(), dto.getEmail(), dto.getPhone());
        patientDao.save(patient);
    }

    @Override
    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // For now simple password check (plaintext)
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
//            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found");
        }
    }

//	@Override
//	public User registerUser(User user) {
//		// TODO Auto-generated method stub
//		return null;
//	}
}
