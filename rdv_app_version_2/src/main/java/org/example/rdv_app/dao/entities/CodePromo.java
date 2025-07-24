package org.example.rdv_app.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "CodePromo")
@NoArgsConstructor
@AllArgsConstructor
public class CodePromo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer code_id;
    private String code;
    private double percentage;
    private Date dateDebut;
    private Date dateFin;
    private int nbr_users;
    private boolean active = true;
    @OneToOne
    private Abonne abonne;
    @OneToMany(mappedBy = "codePromo")
    private List<Client> clientList;
}
