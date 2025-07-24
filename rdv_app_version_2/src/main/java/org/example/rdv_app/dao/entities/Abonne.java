package org.example.rdv_app.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "Abonné")
@NoArgsConstructor
@AllArgsConstructor

public class Abonne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer abonne_id;
    private String nom;
    private String prenom;
    private String adresse;
    private String telephone;
    private String email;
    private String password;
    private String profession;
    private LocalDate creation_date = LocalDate.now();
    private boolean active=true;
    @OneToMany(mappedBy = "abonne" , fetch = FetchType.LAZY)
    private List<RendezVous> rendezVousList;
    @OneToMany(mappedBy = "abonne" , fetch = FetchType.LAZY)
    private List<Creneau> creneauList;
    @OneToMany(mappedBy = "abonne" , fetch = FetchType.LAZY)
    private List<Evenement> evenementList;
    @OneToMany(mappedBy = "abonne" , fetch = FetchType.LAZY)
    private List<Offre> offreList;
    @OneToOne
    private CodePromo codePromo;

}
