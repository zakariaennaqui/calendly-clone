package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Evenement;
import org.example.rdv_app.dao.repositories.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EvenementManager implements EvenementService {
    @Autowired
    private EvenementRepository eventRepo;
    @Override
    public List<Evenement> getAllEvenements() {
        return eventRepo.findAll();
    }

    @Override
    public Evenement getEvenementById(int id) {
        return eventRepo.findById(id).get();
    }

    @Override
    public Evenement addEvenement(Evenement evenement) {
        if(eventRepo.existsById(evenement.getId())==false) {
            return eventRepo.save(evenement);
        }
        return null;
    }

    @Override
    public Evenement updateEvenement(Evenement evenement) {
        return eventRepo.save(evenement);
    }

    @Override
    public boolean deleteEvenementById(int id) {
        if(eventRepo.existsById(id)==true) {
            eventRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
