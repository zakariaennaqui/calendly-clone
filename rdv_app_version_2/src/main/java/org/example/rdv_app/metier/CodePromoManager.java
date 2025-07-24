package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.CodePromo;
import org.example.rdv_app.dao.repositories.CodePromoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class CodePromoManager implements CodePromoService {
    @Autowired
    private CodePromoRepository codePromoRepository;
    @Autowired
    private AbonneService abonneService;
    @Override
    public CodePromo addCodePromo(CodePromo codePromo) {
        if(!codePromoRepository.existsById(codePromo.getCode_id())){
            return codePromoRepository.save(codePromo);
        }
        return null;
    }

    @Override
    public CodePromo findCodePromoById(Integer id) {
        return codePromoRepository.findById(id).get();
    }

    @Override
    public CodePromo updateCodePromo(CodePromo codePromo) {
        return codePromoRepository.save(codePromo);
    }

    @Override
    public boolean deleteCodePromo(CodePromo codePromo) {
        LocalDate today = LocalDate.now();
        if(codePromoRepository.existsById(codePromo.getCode_id()) && Date.valueOf(today)==codePromo.getDateFin()){
            codePromoRepository.deleteById(codePromo.getCode_id());
            return true;
        }
        return false;
    }

    @Override
    public void desactiverCodePromo(CodePromo codePromo) {
        if (codePromo.getClientList().size() == codePromo.getNbr_users() || codePromo.getDateFin()== Date.valueOf(LocalDate.now())) {
            codePromo.setActive(false);
        }
    }
}
