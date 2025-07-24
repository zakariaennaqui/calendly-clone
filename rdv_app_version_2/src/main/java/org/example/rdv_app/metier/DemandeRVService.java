package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.DemandeRV;
import org.example.rdv_app.dao.entities.RendezVous;

import java.util.List;

public interface DemandeRVService {
    public DemandeRV findById(Integer id);
    public List<DemandeRV> findAll();
    public DemandeRV addDemandeRV(DemandeRV demandeRV);
    public DemandeRV updateDemandeRV(DemandeRV demandeRV);
    public boolean deleteDemandeRV(Integer id);

    // autre fonctions

    public void confirmerDemandeRV(DemandeRV demandeRV);

    public void annulerDemandeRV(DemandeRV demandeRV);


}
