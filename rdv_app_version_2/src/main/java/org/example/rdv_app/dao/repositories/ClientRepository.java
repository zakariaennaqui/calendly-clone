package org.example.rdv_app.dao.repositories;

import org.example.rdv_app.dao.entities.Abonne;
import org.example.rdv_app.dao.entities.Client;
import org.example.rdv_app.dao.entities.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client getClientByEmail(String email);

    boolean existsByEmail(String email);

    double findAllByEvenementListContains(List<Evenement> evenementList);
}
