package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Client;
import org.example.rdv_app.dao.entities.Evenement;
import org.example.rdv_app.dao.entities.RendezVous;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ClientService {
    public Client getClient(int id);
    public List<Client> getAllClients();
    public Client addClient(Client client);
    public Client updateClient(Client client);
    public boolean deleteClient(int id);

    public List<Evenement> findAllEvenementById(int id);
    public List<RendezVous> findAllRendezVousById(int id);


}
