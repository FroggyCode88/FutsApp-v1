package com.it.futsapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationDto {
    private UUID id;
    private UUID playerId;
    private String playerName;   // potrai comporre da FutaUser.nome+cognome
    private Boolean paid;
    private LocalDateTime registrationDate;
}
