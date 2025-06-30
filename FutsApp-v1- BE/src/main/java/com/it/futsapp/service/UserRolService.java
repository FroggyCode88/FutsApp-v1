package com.it.futsapp.service;

import com.it.futsapp.entity.ERole;
import com.it.futsapp.entity.FutaCred;
import com.it.futsapp.entity.Role;
import com.it.futsapp.repository.FutaCredRepository;
import com.it.futsapp.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRolService {
    @Autowired
    private FutaCredRepository credRepo;
    @Autowired
    private RoleRepository roleRepo;


    public void addOrganizerRole(String username) {
        FutaCred cred = credRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utente non trovato"));
        Role organizerRole = roleRepo.findByName(ERole.ORGANIZER)
                .orElseThrow(() -> new EntityNotFoundException("Ruolo ORGANIZER non trovato"));
        cred.getRoles().add(organizerRole);
        credRepo.save(cred);
    }

    public void removeOrganizerRole(String username) {
        FutaCred cred = credRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utente non trovato"));
        Role organizerRole = roleRepo.findByName(ERole.ORGANIZER)
                .orElseThrow(() -> new EntityNotFoundException("Ruolo ORGANIZER non trovato"));
        cred.getRoles().remove(organizerRole);
        credRepo.save(cred);
    }
}
