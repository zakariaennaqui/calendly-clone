package org.example.rdv_app.dao.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Creneau")
public class Creneau {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private int heure;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "abonne_id")
    @JsonIgnore
    private Abonne abonne;
}
