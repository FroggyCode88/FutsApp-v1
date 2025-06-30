package com.it.futsapp.repository;

import com.it.futsapp.entity.FutaCred;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FutaCredRepository extends JpaRepository<FutaCred, Long> {
    @EntityGraph(attributePaths = "roles")
    Optional<FutaCred> findByUsername(String username);
    Boolean existsByUsername(String username);
}
