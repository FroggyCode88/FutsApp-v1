package com.it.futsapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
@Table(name = "FUTACRED", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"futauser_id"})
})
public class FutaCred extends UserBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "futacred_seq")
    @SequenceGenerator(name = "futacred_seq", sequenceName = "futacred_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "username", length = 255, nullable = false, unique = true)
    private String username;

    @Column(name = "pwd", length = 255, nullable = false)
    private String pwd;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "futauser_id", referencedColumnName = "user_uuid")
    private FutaUser futaUser;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),      // id di FUTACRED
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id")  // role_id di ROLES
    )
    private Set<Role> roles;

    public FutaCred(String username, String encode) {
        super();
    }
}