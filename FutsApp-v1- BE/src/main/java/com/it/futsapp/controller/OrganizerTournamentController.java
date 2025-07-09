package com.it.futsapp.controller;

import com.it.futsapp.dto.RegistrationDto;
import com.it.futsapp.dto.TournamentCreateDto;
import com.it.futsapp.dto.TournamentDto;
import com.it.futsapp.entity.FutaCred;
import com.it.futsapp.repository.FutaCredRepository;
import com.it.futsapp.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rest/organizer")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ORGANIZER')")
public class OrganizerTournamentController {
    private final TournamentService tournService;
    private final FutaCredRepository credRepo;

    private UUID getCurrentUserUuid(Principal principal) {
        String username = principal.getName();
        FutaCred cred = credRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Credenziali non trovate per username: " + username));
        return cred.getFutaUser().getId();
    }

    /** 1️⃣ LIST: tutti i tornei dell’organizer */
    @GetMapping("/tournaments")
    public ResponseEntity<List<TournamentDto>> listTournaments(Principal principal) {
        UUID userUuid = getCurrentUserUuid(principal);
        return ResponseEntity.ok(tournService.listMyTournaments(userUuid));
    }

    /** 2️⃣ DETAIL: dettaglio di un singolo torneo */
    @GetMapping("/tournaments/{id}")
    public ResponseEntity<TournamentDto> getTournament(@PathVariable UUID id,
                                                       Principal principal) {
        UUID userUuid = getCurrentUserUuid(principal);
        return ResponseEntity.ok(tournService.getTournamentDetail(userUuid, id));
    }

    /** 3️⃣ CREATE: crea un nuovo torneo */
    @PostMapping("/tournaments")
    @ResponseStatus(HttpStatus.CREATED)
    public TournamentDto createTournament(@RequestBody TournamentCreateDto dto,
                                          Principal principal) {
        UUID userUuid = getCurrentUserUuid(principal);
        return tournService.createTournament(userUuid, dto);
    }

    /** 4️⃣ UPDATE: aggiorna i dati di un torneo esistente */
    @PutMapping("/tournaments/{id}")
    public ResponseEntity<TournamentDto> updateTournament(@PathVariable UUID id,
                                                          @RequestBody TournamentCreateDto dto,
                                                          Principal principal) {
        UUID userUuid = getCurrentUserUuid(principal);
        return ResponseEntity.ok(tournService.updateTournament(userUuid, id, dto));
    }

    /** 5️⃣ DELETE: elimina un torneo */
    @DeleteMapping("/tournaments/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTournament(@PathVariable UUID id, Principal principal) {
        UUID userUuid = getCurrentUserUuid(principal);
        tournService.deleteTournament(userUuid, id);
    }

    /** 6️⃣ LIST REGISTRATIONS: lista delle iscrizioni a un torneo */
    @GetMapping("/tournaments/{id}/registrations")
    public ResponseEntity<List<RegistrationDto>> listRegistrations(@PathVariable UUID id,
                                                                   Principal principal) {
        UUID userUuid = getCurrentUserUuid(principal);
        return ResponseEntity.ok(tournService.listRegistrations(userUuid, id));
    }
}
