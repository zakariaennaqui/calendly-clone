package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.*;
import org.example.rdv_app.dao.repositories.RendezVousRepository;
import org.example.rdv_app.dao.utils.Statut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
@Service
public class RendezVousManager implements RendezVousService {
    @Autowired
    private RendezVousRepository rendezVousRepo;
    @Autowired
    private CreneauService creneauService;
    @Override
    public List<RendezVous> getAllRendezVous() {
        return rendezVousRepo.findAll();
    }

    @Override
    public RendezVous findRendezVousById(int id) {
        return rendezVousRepo.findById(id).get();
    }

    @Override
    public RendezVous addRendezVous(RendezVous rendezVous) {
        if(!rendezVousRepo.existsById(rendezVous.getId())) {
            rendezVous.setStatus(Statut.Attente);
            return rendezVousRepo.save(rendezVous);
        }
        return null;
    }

    @Override
    public RendezVous updateRendezVous(RendezVous rendezVous) {
        Creneau c= creneauService.updateCreneau(rendezVous.getCreneau());
        rendezVous.setCreneau(c);
        return rendezVousRepo.save(rendezVous);
    }

    @Override
    public boolean deleteRendezVous(int id) {
        if(rendezVousRepo.existsById(id)) {
            rendezVousRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteRendezVousAutomatically(int id) {
        if(rendezVousRepo.existsById(id) && rendezVousRepo.findById(id).get().getCreneau().getDate()== Date.valueOf(LocalDate.now()) &&  Date.valueOf(LocalDate.now()).after(rendezVousRepo.findById(id).get().getCreneau().getDate())) {
            rendezVousRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Creneau getCreneau(int id) {
        return rendezVousRepo.findById(id).get().getCreneau();
    }

    @Override
    public Offre getOffre(int id) {
        return rendezVousRepo.findById(id).get().getOffre();
    }

    @Override
    public Abonne getAbonne(int id) {
        return rendezVousRepo.findById(id).get().getAbonne();
    }

    @Override
    public Client getClient(int id) {
        return rendezVousRepo.findById(id).get().getClient();
    }
}
