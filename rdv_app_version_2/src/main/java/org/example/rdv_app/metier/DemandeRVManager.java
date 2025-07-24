package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.DemandeRV;
import org.example.rdv_app.dao.entities.RendezVous;
import org.example.rdv_app.dao.repositories.DemandeRVRepository;
import org.example.rdv_app.dao.utils.Statut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemandeRVManager implements DemandeRVService {
    @Autowired
    private DemandeRVRepository repository;
    @Autowired
    private RendezVousService rendezVousService;
    @Autowired
    private EmailService emailService;
    @Override
    public DemandeRV findById(Integer id) {
        return repository.findById(id).get();
    }

    @Override
    public List<DemandeRV> findAll() {
        return repository.findAll();
    }

    @Override
    public DemandeRV addDemandeRV(DemandeRV demandeRV) {
        if(!repository.existsById(demandeRV.getId())){
            return repository.save(demandeRV);
        }
        return null;
    }
// update peut servir comme une fonction pour donner une contre offre au lieu de classe ChangementRV
    @Override
    public DemandeRV updateDemandeRV(DemandeRV demandeRV) {
        RendezVous rv = rendezVousService.updateRendezVous(demandeRV.getRendezVous());
        demandeRV.setRendezVous(rv);
        return repository.save(demandeRV);
    }

    @Override
    public boolean deleteDemandeRV(Integer id) {
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public void confirmerDemandeRV(DemandeRV demandeRV) {
        demandeRV.setConfirmation(true);
        demandeRV.getRendezVous().setStatus(Statut.Confirmé);
        boolean res= this.deleteDemandeRV(demandeRV.getId());
        if(res){
            System.out.println("DemandeRV confirmed");
        }
    }

    @Override
    public void annulerDemandeRV(DemandeRV demandeRV) {
        demandeRV.setConfirmation(false);
        demandeRV.getRendezVous().setStatus(Statut.Annulé);
        boolean res= this.deleteDemandeRV(demandeRV.getId());
        if(res){
            System.out.println("DemandeRV confirmed");
        }
    }
}
