package org.example.rdv_app.metier;

import org.example.rdv_app.dao.entities.Abonne;
import org.example.rdv_app.dao.entities.CodePromo;

public interface CodePromoService {
    public CodePromo addCodePromo(CodePromo codePromo);
    public CodePromo findCodePromoById(Integer id);
    public CodePromo updateCodePromo(CodePromo codePromo);
    public boolean deleteCodePromo(CodePromo codePromo);
    public void desactiverCodePromo(CodePromo codePromo);

    // methode pour appliquer le code promo

//    public void appliquerCode(CodePromo codePromo);
}
