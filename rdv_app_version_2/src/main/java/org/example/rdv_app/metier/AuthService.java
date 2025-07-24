package org.example.rdv_app.metier;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface AuthService {
    public ResponseEntity<?> getUserByEmail(String authHeader);
}
