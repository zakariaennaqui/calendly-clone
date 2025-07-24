package org.example.rdv_app.dao.utils;

import lombok.Getter;
import lombok.Setter;
import org.example.rdv_app.dao.entities.Abonne;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private Abonne user;

    public LoginResponse(String token, Abonne user) {
        this.token = token;
        this.user = user;
    }
}
