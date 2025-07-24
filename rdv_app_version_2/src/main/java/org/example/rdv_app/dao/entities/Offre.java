package org.example.rdv_app.dao.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Offre")
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String description;
    private String nom;
    private String category;
    private int duration;
    private int price;
    @ManyToOne(targetEntity = Abonne.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "abonne_id")
    @JsonIgnore
    private Abonne abonne;
    @ManyToOne
    @JoinColumn(name = "code_id")
    private CodePromo codePromo;
}
