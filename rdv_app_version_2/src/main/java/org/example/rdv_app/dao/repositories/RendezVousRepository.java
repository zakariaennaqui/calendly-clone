package org.example.rdv_app.dao.repositories;

import org.example.rdv_app.dao.entities.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Integer> {

}
