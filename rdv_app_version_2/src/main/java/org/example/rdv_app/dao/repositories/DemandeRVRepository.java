package org.example.rdv_app.dao.repositories;

import org.example.rdv_app.dao.entities.DemandeRV;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeRVRepository extends JpaRepository<DemandeRV, Integer> {
}
