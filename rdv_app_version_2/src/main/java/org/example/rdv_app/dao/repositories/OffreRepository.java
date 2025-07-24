package org.example.rdv_app.dao.repositories;

import org.example.rdv_app.dao.entities.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Integer> {


    List<Offre> getOffresByCategory(String category);
}
