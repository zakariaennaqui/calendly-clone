package org.example.rdv_app.dao.repositories;

import org.example.rdv_app.dao.entities.Abonne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface AbonneRepository extends JpaRepository<Abonne, Integer> {
    List<Abonne> findAllByProfession(String profession);

    Abonne getAbonneByEmail(String email);

    boolean existsByEmail(String email);
}
