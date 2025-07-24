package org.example.rdv_app.controller;

import jakarta.mail.AuthenticationFailedException;
import jakarta.mail.MessagingException;
import org.example.rdv_app.dao.entities.DemandeRV;
import org.example.rdv_app.metier.DemandeRVService;
import org.example.rdv_app.metier.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demande")
public class DemandeRVController {
    @Autowired
    private DemandeRVService service;
    @Autowired
    private EmailService emailService;
    @PostMapping("/add")
    public DemandeRV addDemandeRV(@RequestBody DemandeRV demandeRV , @RequestHeader("Authorization") String token) throws MessagingException {
        emailService.demandeRvEmail(demandeRV , token);
        return service.addDemandeRV(demandeRV);
    }

    @PutMapping("/update")
    public DemandeRV updateDemandeRV(@RequestBody DemandeRV demandeRV , @RequestHeader("Authorization") String token) throws MessagingException {
        emailService.demandeRvEmail(demandeRV , token);
        return service.updateDemandeRV(demandeRV);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDemandeRV(@PathVariable Integer id) {
        boolean result = service.deleteDemandeRV(id);
        if(result){
            return "OK";
        }
        return "ERROR";
    }

    @GetMapping("/{id}")
    public DemandeRV getDemandeRV(@PathVariable Integer id) {
        return service.findById(id);
    }

    @GetMapping("/all")
    public List<DemandeRV> getAllDemandeRV() {
        return service.findAll();
    }

    @GetMapping("/Confirm")
    public String ConfirmDemandeRV(@RequestBody DemandeRV demandeRV , @RequestHeader("Authorization") String token) throws AuthenticationFailedException , MessagingException {
        emailService.confirmRvEmail(demandeRV , token);
        service.confirmerDemandeRV(demandeRV);
        return "OK";
    }

    @GetMapping("/cancel")
    public String cancelDemandeRV(@RequestBody DemandeRV demandeRV , @RequestHeader("Authorization") String token) throws AuthenticationFailedException , MessagingException {
        emailService.cancelRvEmail(demandeRV , token);
        service.annulerDemandeRV(demandeRV);
        return "OK";
    }
}
