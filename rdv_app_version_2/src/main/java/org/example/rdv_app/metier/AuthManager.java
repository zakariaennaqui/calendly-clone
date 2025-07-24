package org.example.rdv_app.metier;

import org.example.rdv_app.dao.repositories.AbonneRepository;
import org.example.rdv_app.dao.repositories.ClientRepository;
import org.example.rdv_app.dao.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthManager implements AuthService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private AbonneRepository abonneRepository;
    @Override
    public ResponseEntity<?> getUserByEmail(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "

        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);

        if (abonneRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(abonneRepository.getAbonneByEmail(email));
        }
        if (clientRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(clientRepository.getClientByEmail(email));
        }

        return ResponseEntity.ok("not found");

    }
}
