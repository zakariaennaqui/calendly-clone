package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.*;
import org.example.rdv_app.dao.repositories.AbonneRepository;
import org.example.rdv_app.dao.utils.JwtUtil;
import org.example.rdv_app.dao.utils.LoginRequest;
import org.example.rdv_app.dao.utils.RegisterRequest;
import org.example.rdv_app.metier.AbonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/abonne")
public class AbonneController {
//    @Autowired
//    private AbonneRepository abonneRepo;
    @Autowired
    private AbonneService abonneService;
    @Autowired
    private AbonneRepository abonneRepository;
    @Autowired
    private JwtUtil jwtUtil;

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @GetMapping("/list")
    public List<Abonne> abonneList(){
        return abonneService.getAllAbonne();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abonne> abonneById(@PathVariable int id){
        return ResponseEntity.ok(abonneService.getAbonneById(id));
    }

    @PostMapping("/add")
    public Abonne abonneAdd(@RequestBody Abonne abonne){
        return abonneService.addAbonne(abonne);
    }

    @PutMapping("/update")
    public Abonne abonneUpdate(@RequestBody Abonne abonne){
        return abonneService.updateAbonne(abonne);
    }

    @DeleteMapping("/delete/{id}")
    public String abonneDelete(@PathVariable int id){
        boolean res= abonneService.deleteAbonneById(id);
        if(res==true){
            return "cet abonné est supprimé";
        }
        return "erreur";
    }

    @GetMapping("/creneaux/{id}")
    public List<Creneau> creneaux(@PathVariable int id){
        return abonneService.findAllCreneauById(id);
    }

    @GetMapping("/offres/{id}")
    public List<Offre> offres(@PathVariable int id){
        return abonneService.findAllOffreById(id);
    }

    @GetMapping("/rendezVous/{id}")
    public List<RendezVous> rendezVous(@PathVariable int id){
        return abonneService.findAllRendezVousById(id);
    }

    @GetMapping("/evenements/{id}")
    public List<Evenement> evenements(@PathVariable int id){
        return abonneService.findAllEvenementById(id);
    }

    @GetMapping("/abonne-By-Profession")
    public List<Abonne> getAllAbonneByProfession(@RequestParam String profession){
        return abonneService.findAllAbonneByProfession(profession);
    }

    @GetMapping("/appliquerCode")
    public double appliquerCode(@RequestBody CodePromo code, @RequestBody Offre offre){
        return abonneService.appliquerCode(code,offre);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Abonne user = abonneRepository.getAbonneByEmail(request.getEmail());
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
        Optional<Abonne> user = Optional.ofNullable(abonneRepository.getAbonneByEmail(email));
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (abonneRepository.existsByEmail(request.email)) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        Abonne user = new Abonne();
        user.setNom(request.name);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        abonneRepository.save(user);

        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("abonne", user);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getTotalRendezVous")
    public ResponseEntity<?> getTotalRendezVous(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "

        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        Abonne a=abonneRepository.getAbonneByEmail(email);

        return ResponseEntity.ok(abonneService.getTotalRendezVous(a));
    }

    @GetMapping("/getTotalRendezVousThisMonth")
    public ResponseEntity<?> getTotalRendezVousThisMounth(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "

        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        Abonne a=abonneRepository.getAbonneByEmail(email);

        return ResponseEntity.ok(abonneService.getTotalRendezVousThisMonth(a));
    }

    @GetMapping("/getTotalRevenues")
    public ResponseEntity<?> getTotalRevenus(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "

        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        Abonne a=abonneRepository.getAbonneByEmail(email);

        return ResponseEntity.ok(abonneService.getTotalRevenus(a));
    }

    @GetMapping("/todayRendezVous")
    public ResponseEntity<?> todayRendezVous(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "

        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        Abonne a=abonneRepository.getAbonneByEmail(email);

        return ResponseEntity.ok(abonneService.todayRendezVous(a));
    }

}
