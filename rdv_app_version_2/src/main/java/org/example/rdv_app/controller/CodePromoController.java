package org.example.rdv_app.controller;

import org.example.rdv_app.dao.entities.CodePromo;
import org.example.rdv_app.metier.CodePromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/code")
public class CodePromoController {
    @Autowired
    CodePromoService codePromoService;
    @PostMapping("/add")
    public CodePromo addCodePromo(@RequestBody CodePromo codePromo) {
        return codePromoService.addCodePromo(codePromo);
    }
    @PutMapping("/update")
    public CodePromo updateCodePromo(@RequestBody CodePromo codePromo) {
        return codePromoService.updateCodePromo(codePromo);
    }
    @GetMapping("/{id}")
    public CodePromo findCodePromoById(@PathVariable Integer id) {
        return codePromoService.findCodePromoById(id);
    }
    @DeleteMapping("/delete")
    public String deleteCodePromo(@RequestBody CodePromo codePromo) {
        boolean res = codePromoService.deleteCodePromo(codePromo);
        if (res) {
            return "Deleted Code Promo Successfully";
        }
        return "Deleted Code Promo Failed";
    }
    @GetMapping("/desactiver")
    public String desactiverCodePromo(@RequestBody CodePromo codePromo) {
        codePromoService.desactiverCodePromo(codePromo);
        return "Desactiver Code Promo Successfully";
    }
}
