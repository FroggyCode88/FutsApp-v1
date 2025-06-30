package com.it.futsapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "futateam")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FutaTeam {
    @Id
    @Column(name = "team_uuid")
    private UUID id;

    @Column(name = "team_nome")
    private String teamNome;

    @Column(name = "team_logo")
    private String teamLogo;

    @Column(name = "team_city")
    private String teamCity;

    @Column(name = "team_ncap")
    private String teamNcap;

    @Column(name = "team_dcre")
    private LocalDateTime teamDcre;

    @Column(name = "team_dupd")
    private LocalDateTime teamDupd;

}
