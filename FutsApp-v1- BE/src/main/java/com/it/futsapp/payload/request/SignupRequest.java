package com.it.futsapp.payload.request;

import com.it.futsapp.entity.ERole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record SignupRequest( @NotBlank String nome,
                             @NotBlank String cognome,
                             @Email String email,
                             @NotBlank String password,
                             @NotBlank String telefono,
                             @NotBlank String codiceFiscale,
                             @NotNull LocalDate dataNascita,
                             @NotNull ERole ruolo) {

}