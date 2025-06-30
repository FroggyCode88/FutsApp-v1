package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tournament_registrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TournamentRegistration {
    @Id
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "tour_uuid")
    private FutaTour tournament;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_uuid")
    private FutaUser user;

    @Column(name = "paid")
    private Boolean paid;
    @Column(name = "payment_date")
    private LocalDateTime paymentDate;
    @Column(name = "registration_date")
    private LocalDateTime registrationDate;
}
