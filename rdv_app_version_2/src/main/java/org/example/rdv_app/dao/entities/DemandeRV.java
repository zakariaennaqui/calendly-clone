package org.example.rdv_app.dao.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "DemandeRv")
public class DemandeRV {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Boolean confirmation;
    @OneToOne
    private RendezVous rendezVous;
}
