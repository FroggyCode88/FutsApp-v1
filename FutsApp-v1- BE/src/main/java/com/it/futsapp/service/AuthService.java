package com.it.futsapp.service;

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

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
            Authentication auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
            SecurityContextHolder.getContext().setAuthentication(auth);

            String jwt = jwtUtils.generateJwtToken(auth);
            CustomUserDetailsImpl userDetails = (CustomUserDetailsImpl) auth.getPrincipal();
            // Recupera il FutaCred con roles e user
            FutaCred cred = futaCredRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("Credenziali non trovate per id: " + userDetails.getId()));

            // Estrai direttamente il FutaUser collegato
            FutaUser profile = cred.getFutaUser();

            AuthResponse response = new AuthResponse(
                    jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    profile
            );
            log.info("Authentication success: {}", response);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            log.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(HttpStatus.UNAUTHORIZED.name(), e.getMessage()));
        }catch (Exception e2){
            log.error("Error during authentication: {}", e2.getMessage(), e2);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

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
