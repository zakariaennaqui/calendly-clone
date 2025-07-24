package org.example.rdv_app.metier;

import io.micrometer.core.ipc.http.HttpSender;
import org.example.rdv_app.dao.entities.Abonne;
import org.example.rdv_app.dao.entities.Client;
import org.example.rdv_app.dao.entities.Evenement;
import org.example.rdv_app.dao.entities.Offre;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface StatisticsService {
    public int totalNumberOfUsers();
    public int totalNumberOfAbonnes();
    public int totalNumberOfClients();
    public int totalNumberOfRendezvous();

    public int totalRevenus();
    public List<Abonne> getAbonnes();
    public List<Client> getClients();

    public int totalNumberOfAbonnesByMonth();

    public void supprimerCompteAbonne(Abonne a);
    public void supprimerCompteClient(Client c);
    public void desactiverCompteAbonne(Abonne a);
    public void desactiverCompteClient(Client c);
    public int totalNumberOfRVByAbonne(int abonneId);
    public int totalRevenusByAbonne(int abonneId);

    public Map<Offre,Integer> mostTakenOffresByAbonne(int abonneId);

    public int totalNumberOfRVByClient(int clientId);

    public List<Offre> allOffresByClient(int clientId);

    public Map<Evenement,Integer> popularEvents(int abonneId);

    public int totalEventsByClient(int clientId);
    //ces methodes en bas sont les graphes du back-office
    public Map<LocalDate , Integer>  totalNewAbonnesPerDay();

    public Map<LocalDate , Integer>  totalNewClientsPerDay();

}
