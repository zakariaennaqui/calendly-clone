package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Offre;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OffreService {
    public List<Offre> getAllOffre();
    public Offre getOffreById(int id);
    public List<Offre> getOffreByCategory(String category);
    public Offre addOffre(Offre offre);
    public Offre updateOffre(Offre offre);
    public boolean deleteOffre(int id);
}
