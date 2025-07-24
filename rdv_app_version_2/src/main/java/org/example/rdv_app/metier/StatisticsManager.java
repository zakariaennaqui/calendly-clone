package org.example.rdv_app.metier;

import org.apache.coyote.Request;
import org.apache.coyote.RequestInfo;
import org.apache.logging.log4j.CloseableThreadContext;
import org.aspectj.weaver.ast.Instanceof;
import org.example.rdv_app.dao.entities.*;
import org.example.rdv_app.dao.repositories.*;
import org.example.rdv_app.dao.utils.Statut;
import org.hibernate.stat.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.web.exchanges.HttpExchange;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.DateTimeAtCreation;
import java.net.http.HttpRequest;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticsManager implements StatisticsService {
    @Autowired
    private AbonneRepository abonneRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private RendezVousRepository rendezVousRepository;
    @Autowired
    private CreneauRepository creneauRepository;
    @Autowired
    private OffreRepository offreRepository;
    @Autowired
    private CodePromoRepository codePromoRepository;
    @Override
    public int totalNumberOfUsers() {
        return abonneRepository.findAll().size()+clientRepository.findAll().size();
    }

    @Override
    public int totalNumberOfAbonnes() {
        return abonneRepository.findAll().size();
    }

    @Override
    public int totalNumberOfClients() {
        return clientRepository.findAll().size();
    }

    @Override
    public int totalNumberOfRendezvous() {
        return rendezVousRepository.findAll().size();
    }

    @Override
    public int totalRevenus() {
        List<RendezVous> list = rendezVousRepository.findAll();
        int total = 0;
        for (RendezVous r : list) {
            total = total + r.getOffre().getPrice();
        }
        return total;
    }

    @Override
    public List<Abonne> getAbonnes() {
        return abonneRepository.findAll();
    }

    @Override
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @Override
    public int totalNumberOfAbonnesByMonth() {
        List<Abonne> list = abonneRepository.findAll();
        int total = 0;
        for (Abonne a : list) {
            if(a.getCreation_date().getMonthValue() == LocalDate.now().getMonthValue()-1){
                total++;
            }
        }
        return total;
    }

    @Override
    public void supprimerCompteAbonne(Abonne a) {
        abonneRepository.delete(a);
    }

    @Override
    public void supprimerCompteClient(Client c) {
        clientRepository.delete(c);
    }

    @Override
    public void desactiverCompteAbonne(Abonne a) {
        a.setActive(false);
    }

    @Override
    public void desactiverCompteClient(Client c) {
        c.setActive(false);
    }

    @Override
    public int totalNumberOfRVByAbonne(int abonneId) {
        return (int) abonneRepository.findById(abonneId).get().getRendezVousList().stream().filter(rv -> rv.getStatus()== Statut.Confirmé).count();
    }

    @Override
    public int totalRevenusByAbonne(int abonneId) {
        return abonneRepository.findById(abonneId).get().getRendezVousList().stream().map(rv -> rv.getOffre().getPrice()).reduce(0, Integer::sum);
    }

    @Override
    public Map<Offre , Integer> mostTakenOffresByAbonne(int abonneId) {
        RendezVous[] list = abonneRepository.findById(abonneId).get().getRendezVousList().stream().toArray(RendezVous[]::new);
        int total = 0;
        Map<Offre , Integer> map = new HashMap<>();
        for (int i=0 ; i<list.length ; i++ ){
            for(int j=i+1 ; j<list.length ; j++ ){
                if(list[i].getOffre()==list[j].getOffre()){
                    total++;
                }
            }
            map.put(list[i].getOffre(), total);
        }
        return map;
    }

    @Override
    public int totalNumberOfRVByClient(int clientId) {
        return (int) clientRepository.findById(clientId).get().getRendezVousList().stream().filter(rv -> rv.getStatus()== Statut.Confirmé).count();
    }

    @Override
    public List<Offre> allOffresByClient(int clientId) {
        return clientRepository.findById(clientId).get().getRendezVousList().stream().map(rv -> rv.getOffre()).collect(Collectors.toList());
    }

    @Override
    public Map<Evenement , Integer> popularEvents(int abonneId) {
        Map<Evenement , Integer> map = new HashMap<>();
        int total =0;
        List<Evenement> list=abonneRepository.findById(abonneId).get().getEvenementList();
        List<Client> clients=clientRepository.findAll();
        for (Evenement e : list ) {
            for (Client c : clients ) {
                for (Evenement ev : c.getEvenementList()) {
                    if(e==ev) total++;
                }
            }
            map.put(e, total);
        }
        return map;
    }

    @Override
    public int totalEventsByClient(int clientId) {
        return (int) clientRepository.findById(clientId).get().getEvenementList().stream().count();
    }

    @Override
    public Map<LocalDate , Integer>  totalNewAbonnesPerDay() {
        Map<LocalDate , Integer> map = new HashMap<>();
        map.put(LocalDate.now(), (int) abonneRepository.findAll().stream().filter(a -> a.getCreation_date()==LocalDate.now()).count());
        return map;
    }

    @Override
    public Map<LocalDate, Integer> totalNewClientsPerDay() {
        Map<LocalDate , Integer> map = new HashMap<>();
        map.put(LocalDate.now(), (int) clientRepository.findAll().stream().filter(a -> a.getCreation_date()==LocalDate.now()).count());
        return map;
    }


}
