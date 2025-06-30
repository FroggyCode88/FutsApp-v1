package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "fudanoti")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fudanoti {
    @Id
    @Column(name = "noti_uuid")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "noti_tour_uuid")
    private FutaTour tour;

    @Column(name = "noti_mess")
    private String notiMess;

    @ManyToOne
    @JoinColumn(name = "noti_orgs_uuid")
    private FutaOrgs org;

    @Column(name = "noti_dcre")
    private LocalDateTime notiDcre;

    @Column(name = "noti_dupd")
    private LocalDateTime notiDupd;
}
