package com.it.futsapp.controller;

import com.it.futsapp.payload.request.LoginRequest;
import com.it.futsapp.payload.request.SignupRequest;
import com.it.futsapp.payload.response.MessageResponse;
import com.it.futsapp.service.AuthService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/rest/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
        if (!isValidLoginRequest(loginRequest)) {
            return ResponseEntity.badRequest().body(new MessageResponse(HttpStatus.BAD_REQUEST.name(), "Error: username or password is null or empty"));
        }
        return authService.authenticateUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> signup(@Valid @RequestBody SignupRequest signUpRequest) {
        log.info("Signup request is:{}", signUpRequest);
        if (!isValidSignUpRequest(signUpRequest)) {
            return ResponseEntity.badRequest().body(new MessageResponse(HttpStatus.BAD_REQUEST.name(),"Error: username or password is null or empty"));
        }
        return authService.registerUser(signUpRequest);
    }

    private boolean isValidLoginRequest(LoginRequest loginRequest) {
        if (loginRequest.email() == null || loginRequest.email().isEmpty()) {
            log.error("email is null or empty");
            return false;
        }
        if (loginRequest.password() == null || loginRequest.password().isEmpty()) {
            log.error("Password is null or empty");
            return false;
        }
        return true;
    }

    private boolean isValidSignUpRequest(SignupRequest signUpRequest) {
        if (signUpRequest.email() == null || signUpRequest.email().isEmpty()) {
            log.error("mail is null or empty");
            return false;
        }
        if (signUpRequest.password() == null || signUpRequest.password().isEmpty()) {
            log.error("Password is null or empty");
            return false;
        }
        return true;
    }
}