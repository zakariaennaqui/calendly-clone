package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.Offre;
import org.example.rdv_app.metier.OffreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offre")
public class OffreController {
    @Autowired
    private OffreService offreService;

    @GetMapping("/list")
    public List<Offre> getOffreList(){
        return offreService.getAllOffre();
    }

    @GetMapping("{id}")
    public Offre getOffre(@PathVariable int id){
        return offreService.getOffreById(id);
    }

    @PostMapping("/add")
    public Offre addOffre(@RequestBody Offre offre){
        return offreService.addOffre(offre);
    }

    @PutMapping("update")
    public Offre updateOffre(@RequestBody Offre offre){
        return offreService.updateOffre(offre);
    }

    @DeleteMapping("delete/{id}")
    public String deleteOffre(@PathVariable int id){
        boolean res = offreService.deleteOffre(id);
        if(res){
            return "Offre deleted Successfully";
        }
        else{
            return "Offre Not Deleted";
        }
    }

    @GetMapping("/offre-By-Category")
    public List<Offre> getOffreByCategory(@RequestParam String category){
        return offreService.getOffreByCategory(category);
    }
}
