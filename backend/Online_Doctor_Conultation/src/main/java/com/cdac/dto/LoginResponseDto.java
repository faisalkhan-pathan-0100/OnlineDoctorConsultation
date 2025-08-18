// src/main/java/com/cdac/dto/LoginResponseDto.java
package com.cdac.dto;

import com.cdac.entities.User;

public class LoginResponseDto {
    private User user;
    private boolean needsProfileCompletion;

    public LoginResponseDto(User user, boolean needsProfileCompletion) {
        this.user = user;
        this.needsProfileCompletion = needsProfileCompletion;
    }

    public User getUser() {
        return user;
    }

    public boolean isNeedsProfileCompletion() {
        return needsProfileCompletion;
    }
}
