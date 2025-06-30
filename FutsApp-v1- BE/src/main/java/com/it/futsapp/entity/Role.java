package com.it.futsapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roles_seq")
    @SequenceGenerator(name = "roles_seq", sequenceName = "roles_role_id_seq", allocationSize = 1)
    @Column(name = "role_id")
    private Long roleId;
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private ERole name;
    @ManyToMany(mappedBy = "roles")
    private Set<FutaCred> users;

}