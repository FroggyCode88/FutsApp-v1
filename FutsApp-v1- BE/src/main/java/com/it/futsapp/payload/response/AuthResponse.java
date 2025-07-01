package com.it.futsapp.payload.response;

import com.it.futsapp.entity.FutaUser;

import java.util.List;

public record AuthResponse(
        String token,
        Long id,
        String username,
        FutaUser user,
        List<String> roles

) {}