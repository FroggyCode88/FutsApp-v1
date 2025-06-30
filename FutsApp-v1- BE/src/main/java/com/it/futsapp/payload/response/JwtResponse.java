package com.it.futsapp.payload.response;

import com.it.futsapp.entity.FutaUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private FutaUser user;
    private Long id;
    private String username;

    public JwtResponse(String accessToken, Long id, String username, FutaUser user) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.user = user;
    }
}
