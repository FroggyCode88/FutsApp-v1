// src/main/java/it/futsapp/backend/DataInitializer.java
package com.it.futsapp.config;

import com.it.futsapp.entity.ERole;
import com.it.futsapp.entity.Role;
import com.it.futsapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        Arrays.stream(ERole.values()).forEach(roleEnum -> {
            if (roleRepository.findByName(roleEnum).isEmpty()) {
                roleRepository.save(new Role(null, roleEnum, new HashSet<>()));
            }
        });
    }
}