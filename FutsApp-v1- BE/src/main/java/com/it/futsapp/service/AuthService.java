package com.it.futsapp.service;

import com.it.futsapp.dto.UserProfileDto;
import com.it.futsapp.entity.*;
import com.it.futsapp.payload.request.LoginRequest;
import com.it.futsapp.payload.request.SignupRequest;
import com.it.futsapp.payload.response.AuthResponse;
import com.it.futsapp.payload.response.MessageResponse;
import com.it.futsapp.repository.FutaCredRepository;
import com.it.futsapp.repository.FutaOrgsRepository;
import com.it.futsapp.repository.FutaUserRepository;
import com.it.futsapp.repository.RoleRepository;
import com.it.futsapp.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Log4j2

public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private FutaCredRepository futaCredRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private FutaUserRepository futaUserRepository;
    @Autowired
    private FutaOrgsRepository orgRepo; // Repository per FutaOrgs
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtUtil jwtUtils;

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        try {
            // 1️⃣ Autenticazione
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
            SecurityContextHolder.getContext().setAuthentication(auth);

            // 2️⃣ Carico il FutaCred completo con ruoli e utente associato
            FutaCred cred = futaCredRepository.findWithRolesAndUserById(((CustomUserDetailsImpl) auth.getPrincipal()).getId())
                    .orElseThrow(() -> new RuntimeException("Utente non trovato"));
            log.info("Ruoli caricati da DB: {}", cred.getRoles());
            // 3️⃣ Costruisco il UserDetails con authorities corrette
            CustomUserDetailsImpl userDetails = CustomUserDetailsImpl.build(cred);
            log.info("Authorities nel userDetails: {}", userDetails.getAuthorities());
            // 4️⃣ Genero il JWT token includendo le authorities
            String jwt = jwtUtils.generateJwtToken(
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities())
            );

            // 5️⃣ Creo il DTO per il profilo utente
            FutaUser profile = cred.getFutaUser();
            UserProfileDto profileDto = new UserProfileDto(
                    profile.getId(),
                    profile.getNome(),
                    profile.getCognome(),
                    profile.getEmail(),
                    profile.getTelefono(),
                    profile.getCodiceFiscale(),
                    profile.getDataNascita(),
                    profile.getRuolo().name()
            );

            // 6️⃣ Estraggo i ruoli come stringa per la risposta
            List<String> roles = cred.getRoles().stream()
                    .map(r -> r.getName().name()) // es. ["PLAYER", "ORGANIZER"]
                    .toList();

            // 7️⃣ Creo la risposta
            AuthResponse response = new AuthResponse(
                    jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    profileDto,
                    roles
            );

            log.info("Authentication success: {}", response);
            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            log.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED.name(), e.getMessage()));
        } catch (Exception e2) {
            log.error("Error during authentication: {}", e2.getMessage(), e2);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR.name(), "Errore interno durante l'autenticazione"));
        }
    }

    @Transactional
    public ResponseEntity<MessageResponse> registerUser(SignupRequest request) {
        try {

            if (futaCredRepository.existsByUsername(request.email())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse(HttpStatus.ALREADY_REPORTED.name(), "Error: email is already registered!"));
            }

            // 1) Creo FutaUser
            FutaUser futaUser = FutaUser.builder()
                    .email(request.email())
                    .nome(request.nome())
                    .cognome(request.cognome())
                    .codiceFiscale(request.codiceFiscale().toUpperCase())
                    .dataNascita(request.dataNascita())
                    .creatoIl(OffsetDateTime.now())
                    .telefono(request.telefono())
                    .ruolo(request.ruolo())
                    .build();
            // Salvo FutaCred insieme a FutaUser (cascade)
            Role ruolo = roleRepository.findByName(request.ruolo())
                    .orElseThrow(() -> new RuntimeException("Role non trovato: " + request.ruolo()));
            FutaCred cred = FutaCred.builder()
                    .username(request.email())
                    .pwd(encoder.encode(request.password()))
                    .futaUser(futaUser)
                    .roles(Set.of(ruolo))
                    .build();

            futaCredRepository.save(cred);
            if (request.ruolo() == ERole.ORGANIZER) {
                FutaOrgs org = new FutaOrgs();
                org.setId(futaUser.getId());       // l’UUID è lo stesso
                org.setOrgsDcre(LocalDateTime.now());
                orgRepo.save(org);
            }
            return ResponseEntity.ok(new MessageResponse(HttpStatus.OK.name(),"Registrazione completata"));

        } catch (Exception e) {
            log.error("Error during registration: {}", e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR.name(),"Error while registering user: " + e.getMessage()));
        }
    }
}
