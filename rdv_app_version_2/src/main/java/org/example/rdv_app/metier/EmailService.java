package org.example.rdv_app.metier;

import jakarta.mail.AuthenticationFailedException;
import jakarta.mail.MessagingException;
import org.example.rdv_app.dao.entities.DemandeRV;
import org.springframework.stereotype.Service;


public interface EmailService {
    public void demandeRvEmail(DemandeRV demandeRV , String authHeader) throws MessagingException;
    public void confirmRvEmail(DemandeRV demandeRV , String authHeader) throws MessagingException;
    public void cancelRvEmail(DemandeRV demandeRV , String authHeader) throws MessagingException;
    public void rappelVeilleRvEmail(DemandeRV demandRV) throws MessagingException;
    public void rappelHeureRvEmail(DemandeRV demandRV) throws MessagingException;

}
