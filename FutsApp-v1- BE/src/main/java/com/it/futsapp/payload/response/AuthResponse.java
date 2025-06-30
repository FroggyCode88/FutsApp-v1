package com.it.futsapp.payload.response;

import com.it.futsapp.entity.FutaUser;

public record AuthResponse(
        String token,
        Long id,
        String username,
        FutaUser user

) {}