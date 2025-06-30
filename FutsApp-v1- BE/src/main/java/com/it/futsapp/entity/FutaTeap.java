package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "futateap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FutaTeapId.class)
public class FutaTeap {
    @Id
    @ManyToOne
    @JoinColumn(name = "teap_team_uuid", referencedColumnName = "team_uuid")
    private FutaTeam team;

    @Id
    @ManyToOne
    @JoinColumn(name = "teap_play_uuid", referencedColumnName = "play_uuid")
    private FutaPlay player;

    @Column(name = "teap_play_role")
    private String teapPlayRole;
    @Column(name = "teap_dcre")
    private LocalDateTime teapDcre;
    @Column(name = "teap_dupd")
    private LocalDateTime teapDupd;
}
