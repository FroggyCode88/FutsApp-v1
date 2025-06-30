package com.it.futsapp.repository;

import com.it.futsapp.entity.FutaTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface FutaTourRepository extends JpaRepository<FutaTour, UUID> {
    List<FutaTour> findAllByOrganizerId(UUID orgsUuid);
}