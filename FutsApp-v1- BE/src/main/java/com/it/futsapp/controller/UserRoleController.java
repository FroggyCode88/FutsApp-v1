package com.it.futsapp.controller;

import com.it.futsapp.payload.response.MessageResponse;
import com.it.futsapp.service.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/rest/user")
@RequiredArgsConstructor
public class UserRoleController {
    @Autowired
    private UserRoleService roleService;

    /**
     * Promuove l’utente autenticato ad organizer.
     */
    @PostMapping("/upgrade-to-organizer")
    public ResponseEntity<MessageResponse> upgradeToOrganizer(Principal principal) {
        roleService.addOrganizerRole(principal.getName());
        return ResponseEntity.ok(new MessageResponse("OK", "Sei ora Organizer"));
    }

    /**
     * Rimuove il ruolo organizer, lasciando solo player.
     */
    @PostMapping("/downgrade-to-player")
    public ResponseEntity<MessageResponse> downgradeToPlayer(Principal principal) {
        roleService.removeOrganizerRole(principal.getName());
        return ResponseEntity.ok(new MessageResponse("OK", "Sei ora solo Player"));
    }
}
