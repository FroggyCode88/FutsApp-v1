package com.it.futsapp.repository;

import com.it.futsapp.entity.FutaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FutaUserRepository extends JpaRepository<FutaUser, Long> {

}
