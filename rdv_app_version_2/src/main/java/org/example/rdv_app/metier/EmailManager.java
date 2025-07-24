package org.example.rdv_app.metier;

import jakarta.mail.AuthenticationFailedException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.rdv_app.dao.entities.Abonne;
import org.example.rdv_app.dao.entities.Client;
import org.example.rdv_app.dao.entities.DemandeRV;
import org.example.rdv_app.dao.repositories.EmailRepository;
import org.example.rdv_app.dao.utils.EmailContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Arrays;
import java.util.Date;

@Service
public class EmailManager implements EmailService{
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private AuthService authService;
    @Autowired
    private EmailContent emailContent;


    @Override
    public void demandeRvEmail(DemandeRV demandeRV , @RequestHeader("Authorization") String authHeader) throws MessagingException {
//        SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        message.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setSubject("demande d'un rendez-vous");
        EmailContent emailContent = new EmailContent();
        Object object = authService.getUserByEmail(authHeader);
        if (object.getClass().equals(Abonne.class)) {
            String html =emailContent.demandeEmailContent(demandeRV.getRendezVous().getAbonne().getNom());
            mimeMessage.setContent(html , "text/html ; charset=utf-8");
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO , demandeRV.getRendezVous().getClient().getEmail());
            mailSender.send(mimeMessage);
            System.out.println("ok");
        }
        if (object.getClass().equals(Client.class)) {
            String html =emailContent.demandeEmailContent(demandeRV.getRendezVous().getClient().getNom());
            mimeMessage.setContent(html , "text/html ; charset=utf-8");
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO , demandeRV.getRendezVous().getAbonne().getEmail());
            mailSender.send(mimeMessage);
            System.out.println("ok");
        }




    }

    @Override
    public void confirmRvEmail(DemandeRV demandeRV , @RequestHeader("Authorization") String authHeader) throws MessagingException {
        //        SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        message.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setSubject("demande d'un rendez-vous");
        EmailContent emailContent = new EmailContent();
        Object object = authService.getUserByEmail(authHeader);
        if (object.getClass().equals(Abonne.class)) {
            String html =emailContent.demandeEmailContent(demandeRV.getRendezVous().getAbonne().getNom());
            mimeMessage.setContent(html , "text/html ; charset=utf-8");
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO , demandeRV.getRendezVous().getClient().getEmail());
            mailSender.send(mimeMessage);
            System.out.println("ok");
        }
        if (object.getClass().equals(Client.class)) {
            String html =emailContent.demandeEmailContent(demandeRV.getRendezVous().getClient().getNom());
            mimeMessage.setContent(html , "text/html ; charset=utf-8");
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO , demandeRV.getRendezVous().getAbonne().getEmail());
            mailSender.send(mimeMessage);
            System.out.println("ok");
        }


    }

    @Override
    public void cancelRvEmail(DemandeRV demandeRV , @RequestHeader("Authorization") String authHeader) throws MessagingException {
        //        SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        message.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setSubject("demande d'un rendez-vous");
//        EmailContent emailContent = new EmailContent();
        Object object = authService.getUserByEmail(authHeader);
        if (object.getClass().equals(Abonne.class)) {
            String html =emailContent.demandeEmailContent(demandeRV.getRendezVous().getAbonne().getNom());
            mimeMessage.setContent(html , "text/html ; charset=utf-8");
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO , demandeRV.getRendezVous().getClient().getEmail());
            mailSender.send(mimeMessage);
            System.out.println("ok");
        }
        if (object.getClass().equals(Client.class)) {
            String html =emailContent.demandeEmailContent(demandeRV.getRendezVous().getClient().getNom());
            mimeMessage.setContent(html , "text/html ; charset=utf-8");
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO , demandeRV.getRendezVous().getAbonne().getEmail());
            mailSender.send(mimeMessage);
            System.out.println("ok");
        }
    }

    @Override
    public void rappelVeilleRvEmail(DemandeRV demandRV) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        mimeMessage.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setSubject("demande d'un rendez-vous");
        String[] adresses= {demandRV.getRendezVous().getAbonne().getEmail() , demandRV.getRendezVous().getClient().getEmail()};
        mimeMessage.setRecipients(MimeMessage.RecipientType.TO , Arrays.toString(adresses));
        Date date = new Date();
        date.setYear(demandRV.getRendezVous().getCreneau().getDate().getYear());
        date.setMonth(demandRV.getRendezVous().getCreneau().getDate().getMonth());
        date.setDate(demandRV.getRendezVous().getCreneau().getDate().getDate()-1);
        mimeMessage.setSentDate(date);
        String html =emailContent.rappelVeilleEmailContent();
        mimeMessage.setContent(html , "text/html ; charset=utf-8");
        mailSender.send(mimeMessage);
        System.out.println("ok");
    }

    public void rappelHeureRvEmail(DemandeRV demandRV) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        mimeMessage.setFrom("issam.mounir.pro@gmail.com");
        mimeMessage.setSubject("demande d'un rendez-vous");
        String[] adresses= {demandRV.getRendezVous().getAbonne().getEmail() , demandRV.getRendezVous().getClient().getEmail()};
        mimeMessage.setRecipients(MimeMessage.RecipientType.TO , Arrays.toString(adresses));
        Date date = new Date();
        date.setYear(demandRV.getRendezVous().getCreneau().getDate().getYear());
        date.setMonth(demandRV.getRendezVous().getCreneau().getDate().getMonth());
        date.setDate(demandRV.getRendezVous().getCreneau().getDate().getDate());
        date.setHours(demandRV.getRendezVous().getCreneau().getDate().getHours()-1);
        mimeMessage.setSentDate(date);
        String html =emailContent.rappelHeureEmailContent();
        mimeMessage.setContent(html , "text/html ; charset=utf-8");
        mailSender.send(mimeMessage);
        System.out.println("ok");
    }


}
