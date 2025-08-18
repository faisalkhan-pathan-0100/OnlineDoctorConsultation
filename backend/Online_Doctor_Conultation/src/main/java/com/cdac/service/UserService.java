package com.cdac.service;

import java.util.List;
import java.util.Optional;

import com.cdac.dto.SignUpRequestDto;
import com.cdac.entities.User;

public interface UserService {
//    User registerUser(User user);
    Optional<User> login(String email, String password);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User updateUser(Long id, User updatedUser);
    void deleteUser(Long id);
	void registerUser(SignUpRequestDto dto);
}
