package org.example.rdv_app.dao.repositories;

import org.example.rdv_app.dao.entities.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Integer> {
}
