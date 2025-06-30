package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "futatour")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FutaTour {
    @Id
    @Column(name = "tour_uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "tour_orgs_uuid", referencedColumnName = "orgs_uuid")
    private FutaOrgs organizer;

    @Column(name = "tour_name")
    private String tourName;
    @Column(name = "tour_note")
    private String tourNote;
    @Column(name = "tour_city")
    private String tourCity;
    @Column(name = "tour_sdat")
    private LocalDateTime tourSdat;
    @Column(name = "tour_edat")
    private LocalDateTime tourEdat;
    @Column(name = "tour_rdat")
    private LocalDateTime tourRdat;
    @Column(name = "tour_mtea")
    private Integer tourMtea;
    @Column(name = "tour_efee")
    private Double tourEfee;
    @Column(name = "tour_pmat")
    private Double tourPmat;
    @Column(name = "tour_type")
    private String tourType;
    @Column(name = "tour_stat")
    private String tourStat;
    @Column(name = "tour_rule")
    private String tourRule;
    @Column(name = "tour_logo")
    private String tourLogo;
    @Column(name = "tour_dcre")
    private LocalDateTime tourDcre;
    @Column(name = "tour_dupd")
    private LocalDateTime tourDupd;
}
