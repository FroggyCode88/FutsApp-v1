package com.it.futsapp.dto;

import java.time.LocalDate;
import java.util.UUID;

public  record UserProfileDto(
        UUID id,
        String nome,
        String cognome,
        String email,
        String telefono,
        String codiceFiscale,
        LocalDate dataNascita,
        String ruolo
) {}
