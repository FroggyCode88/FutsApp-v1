package com.it.futsapp.repository;

import com.it.futsapp.entity.TournamentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface TournamentRegistrationRepository extends JpaRepository<TournamentRegistration, UUID> {
        List<TournamentRegistration> findAllByTournamentId(UUID tournUuid);
}
