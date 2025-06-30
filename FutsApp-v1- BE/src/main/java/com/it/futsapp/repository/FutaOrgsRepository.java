package com.it.futsapp.repository;

import com.it.futsapp.entity.FutaOrgs;
import com.it.futsapp.entity.FutaTour;
import com.it.futsapp.entity.TournamentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface FutaOrgsRepository extends JpaRepository<FutaOrgs, UUID> {
    Optional<FutaOrgs> findByUserId(UUID userUuid);

}