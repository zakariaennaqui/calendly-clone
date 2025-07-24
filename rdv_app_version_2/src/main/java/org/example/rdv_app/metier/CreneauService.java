package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Creneau;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CreneauService {
    public Creneau getCreneauById(int id);
    public List<Creneau> getAllCreneau();
    public Creneau addCreneau(Creneau creneau);
    public Creneau updateCreneau(Creneau creneau);
    public boolean deleteCreneauById(int id);

}
