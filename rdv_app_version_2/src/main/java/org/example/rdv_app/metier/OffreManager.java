package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Offre;
import org.example.rdv_app.dao.repositories.OffreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OffreManager implements OffreService{
    @Autowired
    private OffreRepository offreRepo;
    @Override
    public List<Offre> getAllOffre() {
        return offreRepo.findAll();
    }

    @Override
    public Offre getOffreById(int id) {
        return offreRepo.findById(id).get();
    }

    @Override
    public List<Offre> getOffreByCategory(String category) {
        return offreRepo.getOffresByCategory(category);
    }

    @Override
    public Offre addOffre(Offre offre) {
        if(offreRepo.existsById(offre.getId())==false) {
            return offreRepo.save(offre);
        }
        return null;
    }

    @Override
    public Offre updateOffre(Offre offre) {
        return offreRepo.save(offre);
    }

    @Override
    public boolean deleteOffre(int id) {
        if(offreRepo.existsById(id)==true) {
            offreRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
