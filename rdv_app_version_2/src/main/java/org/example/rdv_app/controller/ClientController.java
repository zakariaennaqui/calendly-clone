package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.Abonne;
import org.example.rdv_app.dao.entities.Client;
import org.example.rdv_app.dao.entities.Evenement;
import org.example.rdv_app.dao.entities.RendezVous;
import org.example.rdv_app.dao.repositories.ClientRepository;
import org.example.rdv_app.dao.utils.JwtUtil;
import org.example.rdv_app.dao.utils.LoginRequest;
import org.example.rdv_app.dao.utils.RegisterRequest;
import org.example.rdv_app.metier.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private JwtUtil jwtUtil;

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @GetMapping("/list")
    public List<Client> getClients(){
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable int id){
        return clientService.getClient(id);
    }

    @PostMapping("/add")
    public Client addClient(@RequestBody Client client){
        return clientService.addClient(client);
    }

    @PutMapping("/update")
    public Client updateClient(@RequestBody Client client){
        return clientService.updateClient(client);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteClient(@PathVariable int id){
        boolean res= clientService.deleteClient(id);
        if(res){
            return "client est supprimé";
        }
        return "client n'existe pas";
    }

    @GetMapping("/evenements/{id}")
    public List<Evenement> getEvenements(@PathVariable int id){
        return clientService.findAllEvenementById(id);
    }

    @GetMapping("/rendezVous/{id}")
    public List<RendezVous> getRendezVous(@PathVariable int id){
        return clientService.findAllRendezVousById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Client user = clientRepository.getClientByEmail(request.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not found");
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!passwordMatches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user); // You might want to send a DTO instead

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "

        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        Optional<Client> user = Optional.ofNullable(clientRepository.getClientByEmail(email));
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (clientRepository.existsByEmail(request.email)) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        Client user = new Client();
        user.setNom(request.name);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        clientRepository.save(user);

        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("abonne", user);

        return ResponseEntity.ok(response);
    }


}
