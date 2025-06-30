package com.it.futsapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentCreateDto {
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
