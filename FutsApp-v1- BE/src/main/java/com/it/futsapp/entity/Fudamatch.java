package com.it.futsapp.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Set;

// FUDAMACH
@Entity
@Table(name = "fudamach")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fudamatch {
    @Id
    @Column(name = "mach_uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "mach_tour_uuid")
    private FutaTour tour;

    @ManyToOne
    @JoinColumn(name = "mach_team_uuid_home")
    private FutaTeam homeTeam;

    @ManyToOne
    @JoinColumn(name = "mach_team_uuid_away")
    private FutaTeam awayTeam;

    @Column(name = "mach_mday")
    private LocalDateTime machMday;

    @Column(name = "mach_city")
    private String machCity;

    @Column(name = "mach_loca")
    private UUID machLoca;

    @Column(name = "mach_home_goal")
    private Integer machHomeGoal;

    @Column(name = "mach_away_goal")
    private Integer machAwayGoal;

    @Column(name = "mach_stat")
    private String machStat;

    @Column(name = "mach_dcre")
    private LocalDateTime machDcre;

    @Column(name = "mach_dupd")
    private LocalDateTime machDupd;

}
