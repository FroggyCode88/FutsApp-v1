package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "futaorgs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FutaOrgs {
    @Id
    @Column(name = "orgs_uuid")
    private UUID id;

    @Column(name = "orgs_dcre")
    private LocalDateTime orgsDcre;

    @Column(name = "orgs_dupd")
    private LocalDateTime orgsDupd;

    @OneToOne
    @JoinColumn(name = "orgs_uuid", referencedColumnName = "user_uuid")
    private FutaUser user;
}
