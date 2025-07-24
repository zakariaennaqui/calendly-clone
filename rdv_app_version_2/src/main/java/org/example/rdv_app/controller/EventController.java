package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.Evenement;
import org.example.rdv_app.metier.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EvenementService evenementService;

    @PostMapping("/add")
    public Evenement addEvenement(@RequestBody Evenement event) {
        return evenementService.addEvenement(event);
    }

    @PutMapping("/update")
    public Evenement update(@RequestBody Evenement event) {
        return evenementService.updateEvenement(event);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        boolean res = evenementService.deleteEvenementById(id);
        if (res) return "success";
        else return "fail";
    }

    @GetMapping("/{id}")
    public Evenement getEvenement(@PathVariable int id) {
        return evenementService.getEvenementById(id);
    }

    @GetMapping("/all")
    public List<Evenement> getAllEvenement() {
        return evenementService.getAllEvenements();
    }
}
