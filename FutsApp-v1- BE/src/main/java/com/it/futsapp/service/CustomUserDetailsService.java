package com.it.futsapp.service;

import com.it.futsapp.entity.FutaCred;
import com.it.futsapp.repository.FutaCredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService, Serializable {

    @Autowired
    private FutaCredRepository futaCredRepository;

    private static final long serialVersionUID = 1L;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        FutaCred cred = futaCredRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return CustomUserDetailsImpl.build(cred);
    }
}