package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "FUTAUSER", uniqueConstraints = {@UniqueConstraint(columnNames = {"fiscalCode"})})
public class FutaUser extends UserBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_uuid")
    private UUID id;

    @Column(name = "user_name", nullable = false)
    private String nome;

    @Column(name = "user_cogn", nullable = false)
    private String cognome;

    @Column(name = "user_mail", nullable = false, unique = true)
    private String email;

    @Column(name = "user_tell", nullable = false)
    private String telefono;

    @Column(name = "user_cfis", nullable = false)
    private String codiceFiscale;

    @Column(name = "user_dnas", nullable = false)
    private LocalDate dataNascita;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private ERole ruolo;

    @Column(name = "user_aurl")
    private String avatarUrl;

    @Column(name = "user_dcre")
    private OffsetDateTime creatoIl;

    @Column(name = "user_dupd")
    private OffsetDateTime aggiornatoIl;

}