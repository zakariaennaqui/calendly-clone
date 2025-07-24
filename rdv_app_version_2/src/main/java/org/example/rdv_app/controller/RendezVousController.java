package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.RendezVous;
import org.example.rdv_app.metier.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rendez-vous")
public class RendezVousController {
    @Autowired
    RendezVousService rendezVousService;

    // les methodes pour recuperer abonne , client ...

    @PostMapping("/add")
    public RendezVous addRendezVous(@RequestBody RendezVous rendezVous) {
        return rendezVousService.addRendezVous(rendezVous);
    }

    @PutMapping("/update")
    public RendezVous update(@RequestBody RendezVous rendezVous) {
        return rendezVousService.updateRendezVous(rendezVous);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        boolean res = rendezVousService.deleteRendezVous(id);
        if (res) return "success";
        else return "fail";
    }

    @GetMapping("/{id}")
    public RendezVous getRendezVous(@PathVariable int id) {
        return rendezVousService.findRendezVousById(id);
    }

    @GetMapping("/all")
    public List<RendezVous> getAllRendezVous() {
        return rendezVousService.getAllRendezVous();
    }

}
