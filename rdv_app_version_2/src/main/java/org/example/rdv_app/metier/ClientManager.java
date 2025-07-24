package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Client;
import org.example.rdv_app.dao.entities.Evenement;
import org.example.rdv_app.dao.entities.RendezVous;
import org.example.rdv_app.dao.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClientManager implements ClientService{
    @Autowired
    private ClientRepository clientRepository;
    @Override
    public Client getClient(int id) {
        return clientRepository.findById(id).get();
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client addClient(Client client) {
        Client newClient = clientRepository.findById(client.getClient_id()).get();
        if(newClient == null){
            return clientRepository.save(client);
        }
        return null;
    }

    @Override
    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public boolean deleteClient(int id) {
        Client client = clientRepository.findById(id).get();
        if(client != null){
            clientRepository.delete(client);
        }
        return false;
    }

    @Override
    public List<Evenement> findAllEvenementById(int id) {
        return clientRepository.findById(id).get().getEvenementList();
    }

    @Override
    public List<RendezVous> findAllRendezVousById(int id) {
        return clientRepository.findById(id).get().getRendezVousList();
    }
}
