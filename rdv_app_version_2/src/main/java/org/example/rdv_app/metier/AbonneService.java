package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AbonneService {
    public Abonne getAbonneById(int abonne_id);
    public List<Abonne> getAllAbonne();
    public Abonne addAbonne(Abonne abonne);
    public Abonne updateAbonne(Abonne abonne);
    public boolean deleteAbonneById(int id);
    public List<Creneau> findAllCreneauById(int id);
    public List<Evenement> findAllEvenementById(int id);
    public List<RendezVous> findAllRendezVousById(int id);
    public List<Offre> findAllOffreById(int id);

    public List<Abonne> findAllAbonneByProfession(String profession);

    public double appliquerCode(CodePromo codePromo , Offre offre);

    public int getTotalRendezVous(Abonne a);
    public int getTotalRendezVousThisMonth(Abonne a);

    public double getTotalRevenus(Abonne a);
    public RendezVous todayRendezVous(Abonne a);


}
