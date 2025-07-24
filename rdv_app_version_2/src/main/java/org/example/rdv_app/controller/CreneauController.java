package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.Creneau;
import org.example.rdv_app.metier.CreneauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/creneau")
public class CreneauController {
    @Autowired
    private CreneauService creneauService;

    @GetMapping("/{id}")
    public Creneau getCreneau(@PathVariable int id) {
        return creneauService.getCreneauById(id);
    }

    @PostMapping("/add")
    public Creneau addCreneau(@RequestBody Creneau creneau) {
        return creneauService.addCreneau(creneau);
    }

    @PutMapping("/update")
    public Creneau updateCreneau(@RequestBody Creneau creneau) {
        return creneauService.updateCreneau(creneau);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCreneau(@PathVariable int id) {
        boolean res = creneauService.deleteCreneauById(id);
        if (res) return "Creneau deleted";
        else return "Creneau could not be deleted";

    }

    @GetMapping("/all")
    public List<Creneau> getAllCreneau() {
        return creneauService.getAllCreneau();
    }
}
