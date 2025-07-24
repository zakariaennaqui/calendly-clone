package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.*;
import org.example.rdv_app.dao.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Service
public class AbonneManager implements AbonneService{
    @Autowired
    private AbonneRepository abonneRepository;
    @Autowired
    private CreneauRepository creneauRepository;
    @Autowired
    private EvenementRepository evenementRepository;
    @Autowired
    private OffreRepository offreRepository;
    @Autowired
    private RendezVousRepository rendezVousRepository;
    @Override
    public Abonne getAbonneById(int id) {
        return abonneRepository.findById(id).get();
    }

    @Override
    public List<Abonne> getAllAbonne() {
        return abonneRepository.findAll();
    }

    @Override
    public Abonne addAbonne(Abonne abonne) {
        Abonne abonne1 = abonneRepository.findById(abonne.getAbonne_id()).get();
        if (abonne1 == null) {
            return abonneRepository.save(abonne);
        }
        return null;
    }

    @Override
    public Abonne updateAbonne(Abonne abonne) {
        return abonneRepository.save(abonne);
    }

    @Override
    public boolean deleteAbonneById(int id) {
        Abonne abonne = abonneRepository.findById(id).get();
        if (abonne != null) {
            abonneRepository.delete(abonne);
            return true;
        }
        return false;
    }

    @Override
    public List<Creneau> findAllCreneauById(int id) {
        return abonneRepository.findById(id).get().getCreneauList();
    }

    @Override
    public List<Evenement> findAllEvenementById(int id) {
        return abonneRepository.findById(id).get().getEvenementList();
    }

    @Override
    public List<RendezVous> findAllRendezVousById(int id) {
        return abonneRepository.findById(id).get().getRendezVousList();
    }

    @Override
    public List<Offre> findAllOffreById(int id) {
        return abonneRepository.findById(id).get().getOffreList();
    }

    @Override
    public List<Abonne> findAllAbonneByProfession(String profession) {
        return abonneRepository.findAllByProfession(profession);
    }

    @Override
    public double appliquerCode(CodePromo codePromo , Offre offre) {
        return (codePromo.getPercentage()*offre.getPrice())/100;
    }

    @Override
    public int getTotalRendezVous(Abonne a) {
        return a.getRendezVousList().size();
    }

    @Override
    public int getTotalRendezVousThisMonth(Abonne a) {
        List<RendezVous> rendezVousList = a.getRendezVousList();
        List<RendezVous> rv=new ArrayList<>();
        for (RendezVous rendezVous : rendezVousList) {
            if (rendezVous.getCreneau().getDate().getMonth() == Date.valueOf(LocalDate.now()).getMonth()) {
                rv.add(rendezVous);
            }
        }
        return rv.size();
    }

    @Override
    public double getTotalRevenus(Abonne a) {
        double rev=0;
        List<RendezVous> rendezVousList = a.getRendezVousList();
        for (RendezVous rendezVous : rendezVousList) {
            rev=rev+rendezVous.getOffre().getPrice();
        }
        return rev;
    }

    @Override
    public RendezVous todayRendezVous(Abonne a) {
        List<RendezVous> rendezVousList = a.getRendezVousList();
        for (RendezVous rendezVous : rendezVousList) {
            if(rendezVous.getCreneau().getDate() == Date.valueOf(LocalDate.now())){
                return rendezVous;
            }
        }
        return null;
    }


}
