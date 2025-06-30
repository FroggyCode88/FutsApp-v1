package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "futaplay")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FutaPlay {
    @Id
    @Column(name = "play_uuid")
    private UUID id;

    @Column(name = "play_dcre")
    private LocalDateTime playDcre;

    @Column(name = "play_dupd")
    private LocalDateTime playDupd;

    @Column(name = "play_memb")
    private String playMemb;

    @OneToOne
    @JoinColumn(name = "play_uuid", referencedColumnName = "user_uuid")
    private FutaUser user;
}
