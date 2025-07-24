package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RendezVousService {
    public List<RendezVous> getAllRendezVous();
    public RendezVous findRendezVousById(int id);
    public RendezVous addRendezVous(RendezVous rendezVous);
    public RendezVous updateRendezVous(RendezVous rendezVous);
    public boolean deleteRendezVous(int id);

    public boolean deleteRendezVousAutomatically(int id);

    public Creneau getCreneau(int id);

    public Offre getOffre(int id);

    public Abonne getAbonne(int id);

    public Client getClient(int id);
}
