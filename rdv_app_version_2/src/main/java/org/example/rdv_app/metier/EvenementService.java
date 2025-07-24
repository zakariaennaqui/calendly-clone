package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Evenement;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EvenementService {
    public List<Evenement> getAllEvenements();
    public Evenement getEvenementById(int id);
    public Evenement addEvenement(Evenement evenement);
    public Evenement updateEvenement(Evenement evenement);
    public boolean deleteEvenementById(int id);

}
