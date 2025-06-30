package com.it.futsapp.service;

import com.it.futsapp.dto.RegistrationDto;
import com.it.futsapp.dto.TournamentCreateDto;
import com.it.futsapp.dto.TournamentDto;
import com.it.futsapp.entity.FutaOrgs;
import com.it.futsapp.entity.FutaTour;
import com.it.futsapp.repository.FutaOrgsRepository;
import com.it.futsapp.repository.FutaTourRepository;
import com.it.futsapp.repository.TournamentRegistrationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TournamentService {

    private final FutaOrgsRepository orgRepo;
    private final FutaTourRepository tourRepo;
    private final TournamentRegistrationRepository regRepo;

    public TournamentService(FutaOrgsRepository orgRepo,
                             FutaTourRepository tourRepo,
                             TournamentRegistrationRepository regRepo) {
        this.orgRepo = orgRepo;
        this.tourRepo = tourRepo;
        this.regRepo = regRepo;
    }

    /**
     * 1️⃣ LIST: restituisce tutti i tornei di un organizer
     */
    public List<TournamentDto> listMyTournaments(UUID userUuid) {
        // Recupera l’eventuale record FutaOrgs; se mancante, rientra con lista vuota
        Optional<FutaOrgs> maybeOrg = orgRepo.findByUserId(userUuid);
        if (maybeOrg.isEmpty()) {
            return List.of();  // nessun organizer registrato: lista vuota
        }
        // Se l’ID c’è ma non ha tornei, findAll restituisce già lista vuota
        return tourRepo.findAllByOrganizerId(maybeOrg.get().getId()).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 2️⃣ DETAIL: restituisce i dettagli di un singolo torneo
     */
    public TournamentDto getTournamentDetail(UUID userUuid, UUID tournamentId) {
        FutaOrgs org = orgRepo.findByUserId(userUuid)
                .orElseThrow(() -> new EntityNotFoundException("Organizer non trovato"));
        FutaTour tour = tourRepo.findById(tournamentId)
                .orElseThrow(() -> new EntityNotFoundException("Torneo non trovato"));
        if (!tour.getOrganizer().getId().equals(org.getId())) {
            throw new AccessDeniedException("Non sei organizer di questo torneo");
        }
        return toDto(tour);
    }

    /**
     * 3️⃣ CREATE: crea un nuovo torneo
     */
    public TournamentDto createTournament(UUID userUuid, TournamentCreateDto dto) {
        FutaOrgs org = orgRepo.findByUserId(userUuid)
                .orElseThrow(() -> new EntityNotFoundException("Organizer non trovato"));

        FutaTour t = FutaTour.builder()
                .id(UUID.randomUUID())
                .organizer(org)
                .tourName(dto.getTourName())
                .tourType(dto.getTourType())
                .tourCity(dto.getTourCity())
                .tourSdat(dto.getTourSdat())
                .tourEdat(dto.getTourEdat())
                .tourMtea(dto.getTourMtea())
                .tourEfee(dto.getTourEfee())
                .tourPmat(dto.getTourPmat())
                .tourNote(dto.getTourNote())
                .tourRule(dto.getTourRule())
                .tourDcre(LocalDateTime.now())
                .tourDupd(LocalDateTime.now())
                .build();
        tourRepo.save(t);
        return toDto(t);
    }

    /**
     * 4️⃣ UPDATE: modifica un torneo esistente
     */
    public TournamentDto updateTournament(UUID userUuid, UUID tournamentId, TournamentCreateDto dto) {
        FutaTour tour = tourRepo.findById(tournamentId)
                .orElseThrow(() -> new EntityNotFoundException("Torneo non trovato"));
        FutaOrgs org = orgRepo.findByUserId(userUuid)
                .orElseThrow(() -> new EntityNotFoundException("Organizer non trovato"));
        if (!tour.getOrganizer().getId().equals(org.getId())) {
            throw new AccessDeniedException("Non sei organizer di questo torneo");
        }
        // aggiorna campi
        tour.setTourName(dto.getTourName());
        tour.setTourType(dto.getTourType());
        tour.setTourCity(dto.getTourCity());
        tour.setTourSdat(dto.getTourSdat());
        tour.setTourEdat(dto.getTourEdat());
        tour.setTourMtea(dto.getTourMtea());
        tour.setTourEfee(dto.getTourEfee());
        tour.setTourPmat(dto.getTourPmat());
        tour.setTourNote(dto.getTourNote());
        tour.setTourRule(dto.getTourRule());
        tour.setTourDupd(LocalDateTime.now());

        tourRepo.save(tour);
        return toDto(tour);
    }

    /**
     * 5️⃣ DELETE: elimina un torneo
     */
    public void deleteTournament(UUID userUuid, UUID tournamentId) {
        FutaTour tour = tourRepo.findById(tournamentId)
                .orElseThrow(() -> new EntityNotFoundException("Torneo non trovato"));
        FutaOrgs org = orgRepo.findByUserId(userUuid)
                .orElseThrow(() -> new EntityNotFoundException("Organizer non trovato"));
        if (!tour.getOrganizer().getId().equals(org.getId())) {
            throw new AccessDeniedException("Non sei organizer di questo torneo");
        }
        tourRepo.delete(tour);
    }

    /**
     * 6️⃣ LIST REGISTRATIONS: lista iscrizioni a un torneo
     */
    public List<RegistrationDto> listRegistrations(UUID userUuid, UUID tournamentId) {
        FutaOrgs org = orgRepo.findByUserId(userUuid)
                .orElseThrow(() -> new EntityNotFoundException("Organizer non trovato"));
        FutaTour tour = tourRepo.findById(tournamentId)
                .orElseThrow(() -> new EntityNotFoundException("Torneo non trovato"));
        if (!tour.getOrganizer().getId().equals(org.getId())) {
            throw new AccessDeniedException("Non sei organizer di questo torneo");
        }
        return regRepo.findAllByTournamentId(tournamentId)
                .stream()
                .map(r -> new RegistrationDto(
                        r.getId(),
                        r.getUser().getId(),
                        r.getUser().getNome() + " " + r.getUser().getCognome(),
                        r.getPaid(),
                        r.getRegistrationDate()
                ))
                .collect(Collectors.toList());
    }

    private TournamentDto toDto(FutaTour t) {
        return new TournamentDto(
                t.getId(),
                t.getTourName(),
                t.getTourType(),
                t.getTourMtea(),
                t.getTourCity(),
                t.getTourSdat(),
                t.getTourEdat(),
                t.getTourEfee(),
                t.getTourPmat(),
                t.getTourNote(),
                t.getTourRule()
        );
    }
}
