package com.it.futsapp.entity;

import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FutaTeapId implements Serializable {
    private UUID team;
    private UUID player;

}
