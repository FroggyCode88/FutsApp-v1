package com.it.futsapp.service;

import com.it.futsapp.entity.ERole;
import com.it.futsapp.entity.FutaCred;
import com.it.futsapp.entity.FutaOrgs;
import com.it.futsapp.entity.Role;
import com.it.futsapp.repository.FutaCredRepository;
import com.it.futsapp.repository.FutaOrgsRepository;
import com.it.futsapp.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;
@Log4j2
@Service
@Transactional
public class UserRoleService {
    @Autowired
    private FutaCredRepository credRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private  FutaOrgsRepository orgRepo;

    /**
     * Promuove l’utente corrente a Organizer:
     * 1) aggiunge il ruolo ORGANIZER in FutaCred.roles
     * 2) crea il record FutaOrgs se non esiste
     */
    public void addOrganizerRole(String username) {
        // 1) Recupera credenziali
        FutaCred cred = credRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utente non trovato: " + username));

        // 2) Aggiungi il ruolo ORGANIZER
        Role organizerRole = roleRepo.findByName(ERole.ORGANIZER)
                .orElseThrow(() -> new EntityNotFoundException("Ruolo ORGANIZER non trovato"));
        cred.getRoles().add(organizerRole);
        credRepo.save(cred);

        // 3) Crea FutaOrgs se non esiste (lazy initialization)
        UUID userUuid = cred.getFutaUser().getId();
        if (orgRepo.findByUserId(userUuid).isEmpty()) {
            FutaOrgs org = new FutaOrgs();
            org.setId(userUuid);
            org.setOrgsDcre(LocalDateTime.now());
            orgRepo.save(org);
            log.info("Creato nuovo record FutaOrgs per utente: {}", username);
        }
    }

    /**
     * Demuove il ruolo Organizer:
     * 1) rimuove ORGANIZER da FutaCred.roles
     * 2) elimina il record FutaOrgs, se presente
     */
    public void removeOrganizerRole(String username) {
        // 1) Recupera credenziali
        FutaCred cred = credRepo.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utente non trovato: " + username));

        // 2) Rimuovi il ruolo ORGANIZER
        Role organizerRole = roleRepo.findByName(ERole.ORGANIZER)
                .orElseThrow(() -> new EntityNotFoundException("Ruolo ORGANIZER non trovato"));
        cred.getRoles().remove(organizerRole);
        credRepo.save(cred);

        // 3) Rimuovi FutaOrgs se esiste
        UUID userUuid = cred.getFutaUser().getId();
        orgRepo.findByUserId(userUuid).ifPresent(orgRepo::delete);
        log.info("Rimosso ruolo ORGANIZER e record FutaOrgs per utente: {}", username);
    }
}
