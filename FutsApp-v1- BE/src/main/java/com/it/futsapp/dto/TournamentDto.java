package com.it.futsapp.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentDto {
    private UUID id;
    private String tourName;
    private String tourType;
    private Integer tourMtea;
    private String tourCity;
    private LocalDateTime tourSdat;
    private LocalDateTime tourEdat;
    private Double tourEfee;
    private Double tourPmat;
    private String tourNote;
    private String tourRule;
}
