package com.it.futsapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contact_requests")
public class ContactRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "name", nullable = false)
    @NotBlank
    @Size(max = 50)
    private String name;
    @Column(name = "email", nullable = false)
    @NotBlank
    @Size(max = 100)
    private String email;

    @Column(name = "subject", nullable = false)
    @NotBlank
    @Size(max = 50)
    private String subject;

    @Column(name = "message")
    private String message;

    @Column(name = "phone")
    @Size(max = 10)
    private String phone;

    @Column(name = "callable")
    private Boolean callable;

    @Column(name = "type")
    @Size(max = 10)
    private String type;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
}