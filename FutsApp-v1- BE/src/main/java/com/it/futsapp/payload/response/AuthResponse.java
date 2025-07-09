package com.it.futsapp.payload.response;

import com.it.futsapp.dto.UserProfileDto;

import java.util.List;

public record AuthResponse(
        String token,
        Long id,
        String username,
        UserProfileDto user,
        List<String> roles

) {}