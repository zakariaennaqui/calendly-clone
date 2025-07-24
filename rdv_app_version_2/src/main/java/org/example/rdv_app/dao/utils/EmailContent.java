package org.example.rdv_app.dao.utils;

import lombok.*;
import org.springframework.stereotype.Service;

@Service
public class EmailContent {
    public String demandeEmailContent(String nom){
        return " <body style=\"font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;\">\n" +
                "    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;\" width=\"100%\" bgcolor=\"#f4f5f6\">\n" +
                "      <tr>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "        <td class=\"container\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;\" width=\"600\" valign=\"top\">\n" +
                "          <div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;\">\n" +
                "\n" +
                "            <!-- START CENTERED WHITE CONTAINER -->\n" +
                "            <span class=\"preheader\" style=\"color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;\">This is preheader text. Some clients will show this text as a preview.</span>\n" +
                "            <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;\" width=\"100%\">\n" +
                "\n" +
                "              <!-- START MAIN CONTENT AREA -->\n" +
                "              <tr>\n" +
                "                <td class=\"wrapper\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;\" valign=\"top\">\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">Bonjour " + "</p>\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">Un client de nom : " + nom +" vous a envoyé une demande de rendez-vous.</p>\n" +
                "                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;\" width=\"100%\">\n" +
                "                    <tbody>\n" +
                "                      <tr>\n" +
                "                        <td align=\"left\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;\" valign=\"top\">\n" +
                "                          <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n" +
                "                            <tbody>\n" +
                "                              <tr>\n" +
                "                                <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;\" valign=\"top\" align=\"center\" bgcolor=\"#0867ec\"> <a href=\"http://htmlemail.io\" target=\"_blank\" style=\"border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;\">Consulter la demande</a> </td>\n" +
                "                              </tr>\n" +
                "                            </tbody>\n" +
                "                          </table>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </tbody>\n" +
                "                  </table>\n" +
                "                </td>\n" +
                "              </tr>\n" +
                "\n" +
                "              <!-- END MAIN CONTENT AREA -->\n" +
                "              </table>\n" +
                "\n" +
                "            <!-- START FOOTER -->\n" +
                "            <div class=\"footer\" style=\"clear: both; padding-top: 24px; text-align: center; width: 100%;\">\n" +
                "              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    <span class=\"apple-link\" style=\"color: #9a9ea6; font-size: 16px; text-align: center;\">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>\n" +
                "                    <br> Don't like these emails? <a href=\"http://htmlemail.io/blog\" style=\"text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;\">Unsubscribe</a>.\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block powered-by\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    Powered by <a href=\"http://htmlemail.io\" style=\"color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;\">HTMLemail.io</a>\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "              </table>\n" +
                "            </div>\n" +
                "\n" +
                "            <!-- END FOOTER -->\n" +
                "            \n" +
                "<!-- END CENTERED WHITE CONTAINER --></div>\n" +
                "        </td>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "      </tr>\n" +
                "    </table>\n" +
                "  </body>";
    }

    public String confirmEmailContent(String nom){
        return " <body style=\"font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;\">\n" +
                "    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;\" width=\"100%\" bgcolor=\"#f4f5f6\">\n" +
                "      <tr>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "        <td class=\"container\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;\" width=\"600\" valign=\"top\">\n" +
                "          <div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;\">\n" +
                "\n" +
                "            <!-- START CENTERED WHITE CONTAINER -->\n" +
                "            <span class=\"preheader\" style=\"color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;\">This is preheader text. Some clients will show this text as a preview.</span>\n" +
                "            <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;\" width=\"100%\">\n" +
                "\n" +
                "              <!-- START MAIN CONTENT AREA -->\n" +
                "              <tr>\n" +
                "                <td class=\"wrapper\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;\" valign=\"top\">\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">Bonjour " + "</p>\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">" + nom +" a accepter votre demande de rendez-vous.</p>\n" +
                "                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;\" width=\"100%\">\n" +
                "                    <tbody>\n" +
                "                      <tr>\n" +
                "                        <td align=\"left\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;\" valign=\"top\">\n" +
                "                          <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n" +
                "                            <tbody>\n" +
                "                              <tr>\n" +
                "                                <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;\" valign=\"top\" align=\"center\" bgcolor=\"#0867ec\"> <a href=\"http://htmlemail.io\" target=\"_blank\" style=\"border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;\">Consulter la demande</a> </td>\n" +
                "                              </tr>\n" +
                "                            </tbody>\n" +
                "                          </table>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </tbody>\n" +
                "                  </table>\n" +
                "                </td>\n" +
                "              </tr>\n" +
                "\n" +
                "              <!-- END MAIN CONTENT AREA -->\n" +
                "              </table>\n" +
                "\n" +
                "            <!-- START FOOTER -->\n" +
                "            <div class=\"footer\" style=\"clear: both; padding-top: 24px; text-align: center; width: 100%;\">\n" +
                "              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    <span class=\"apple-link\" style=\"color: #9a9ea6; font-size: 16px; text-align: center;\">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>\n" +
                "                    <br> Don't like these emails? <a href=\"http://htmlemail.io/blog\" style=\"text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;\">Unsubscribe</a>.\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block powered-by\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    Powered by <a href=\"http://htmlemail.io\" style=\"color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;\">HTMLemail.io</a>\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "              </table>\n" +
                "            </div>\n" +
                "\n" +
                "            <!-- END FOOTER -->\n" +
                "            \n" +
                "<!-- END CENTERED WHITE CONTAINER --></div>\n" +
                "        </td>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "      </tr>\n" +
                "    </table>\n" +
                "  </body>";
    }

    public String cancelEmailContent(String nom){
        return " <body style=\"font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;\">\n" +
                "    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;\" width=\"100%\" bgcolor=\"#f4f5f6\">\n" +
                "      <tr>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "        <td class=\"container\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;\" width=\"600\" valign=\"top\">\n" +
                "          <div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;\">\n" +
                "\n" +
                "            <!-- START CENTERED WHITE CONTAINER -->\n" +
                "            <span class=\"preheader\" style=\"color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;\">This is preheader text. Some clients will show this text as a preview.</span>\n" +
                "            <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;\" width=\"100%\">\n" +
                "\n" +
                "              <!-- START MAIN CONTENT AREA -->\n" +
                "              <tr>\n" +
                "                <td class=\"wrapper\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;\" valign=\"top\">\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">Bonjour " + "</p>\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">" + nom +" vous a refusé votre demande de rendez-vous.</p>\n" +
                "                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;\" width=\"100%\">\n" +
                "                    <tbody>\n" +
                "                      <tr>\n" +
                "                        <td align=\"left\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;\" valign=\"top\">\n" +
                "                          <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n" +
                "                            <tbody>\n" +
                "                              <tr>\n" +
                "                                <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;\" valign=\"top\" align=\"center\" bgcolor=\"#0867ec\"> <a href=\"http://htmlemail.io\" target=\"_blank\" style=\"border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;\">Consulter la demande</a> </td>\n" +
                "                              </tr>\n" +
                "                            </tbody>\n" +
                "                          </table>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </tbody>\n" +
                "                  </table>\n" +
                "                </td>\n" +
                "              </tr>\n" +
                "\n" +
                "              <!-- END MAIN CONTENT AREA -->\n" +
                "              </table>\n" +
                "\n" +
                "            <!-- START FOOTER -->\n" +
                "            <div class=\"footer\" style=\"clear: both; padding-top: 24px; text-align: center; width: 100%;\">\n" +
                "              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    <span class=\"apple-link\" style=\"color: #9a9ea6; font-size: 16px; text-align: center;\">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>\n" +
                "                    <br> Don't like these emails? <a href=\"http://htmlemail.io/blog\" style=\"text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;\">Unsubscribe</a>.\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block powered-by\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    Powered by <a href=\"http://htmlemail.io\" style=\"color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;\">HTMLemail.io</a>\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "              </table>\n" +
                "            </div>\n" +
                "\n" +
                "            <!-- END FOOTER -->\n" +
                "            \n" +
                "<!-- END CENTERED WHITE CONTAINER --></div>\n" +
                "        </td>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "      </tr>\n" +
                "    </table>\n" +
                "  </body>";
    }

    public String rappelVeilleEmailContent(){
        return " <body style=\"font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;\">\n" +
                "    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;\" width=\"100%\" bgcolor=\"#f4f5f6\">\n" +
                "      <tr>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "        <td class=\"container\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;\" width=\"600\" valign=\"top\">\n" +
                "          <div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;\">\n" +
                "\n" +
                "            <!-- START CENTERED WHITE CONTAINER -->\n" +
                "            <span class=\"preheader\" style=\"color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;\">This is preheader text. Some clients will show this text as a preview.</span>\n" +
                "            <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;\" width=\"100%\">\n" +
                "\n" +
                "              <!-- START MAIN CONTENT AREA -->\n" +
                "              <tr>\n" +
                "                <td class=\"wrapper\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;\" valign=\"top\">\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">Bonjour " + "</p>\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">" +" Vous a avez un rendez-vous demain.</p>\n" +
                "                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;\" width=\"100%\">\n" +
                "                    <tbody>\n" +
                "                      <tr>\n" +
                "                        <td align=\"left\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;\" valign=\"top\">\n" +
                "                          <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n" +
                "                            <tbody>\n" +
                "                              <tr>\n" +
                "                                <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;\" valign=\"top\" align=\"center\" bgcolor=\"#0867ec\"> <a href=\"http://htmlemail.io\" target=\"_blank\" style=\"border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;\">Consulter la demande</a> </td>\n" +
                "                              </tr>\n" +
                "                            </tbody>\n" +
                "                          </table>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </tbody>\n" +
                "                  </table>\n" +
                "                </td>\n" +
                "              </tr>\n" +
                "\n" +
                "              <!-- END MAIN CONTENT AREA -->\n" +
                "              </table>\n" +
                "\n" +
                "            <!-- START FOOTER -->\n" +
                "            <div class=\"footer\" style=\"clear: both; padding-top: 24px; text-align: center; width: 100%;\">\n" +
                "              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    <span class=\"apple-link\" style=\"color: #9a9ea6; font-size: 16px; text-align: center;\">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>\n" +
                "                    <br> Don't like these emails? <a href=\"http://htmlemail.io/blog\" style=\"text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;\">Unsubscribe</a>.\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block powered-by\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    Powered by <a href=\"http://htmlemail.io\" style=\"color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;\">HTMLemail.io</a>\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "              </table>\n" +
                "            </div>\n" +
                "\n" +
                "            <!-- END FOOTER -->\n" +
                "            \n" +
                "<!-- END CENTERED WHITE CONTAINER --></div>\n" +
                "        </td>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "      </tr>\n" +
                "    </table>\n" +
                "  </body>";
    }

    public String rappelHeureEmailContent(){
        return " <body style=\"font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;\">\n" +
                "    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;\" width=\"100%\" bgcolor=\"#f4f5f6\">\n" +
                "      <tr>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "        <td class=\"container\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;\" width=\"600\" valign=\"top\">\n" +
                "          <div class=\"content\" style=\"box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;\">\n" +
                "\n" +
                "            <!-- START CENTERED WHITE CONTAINER -->\n" +
                "            <span class=\"preheader\" style=\"color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;\">This is preheader text. Some clients will show this text as a preview.</span>\n" +
                "            <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"main\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;\" width=\"100%\">\n" +
                "\n" +
                "              <!-- START MAIN CONTENT AREA -->\n" +
                "              <tr>\n" +
                "                <td class=\"wrapper\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;\" valign=\"top\">\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">Bonjour " + "</p>\n" +
                "                  <p style=\"font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;\">" +" Vous a avez un rendez-vous apres une heure.</p>\n" +
                "                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;\" width=\"100%\">\n" +
                "                    <tbody>\n" +
                "                      <tr>\n" +
                "                        <td align=\"left\" style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;\" valign=\"top\">\n" +
                "                          <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;\">\n" +
                "                            <tbody>\n" +
                "                              <tr>\n" +
                "                                <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;\" valign=\"top\" align=\"center\" bgcolor=\"#0867ec\"> <a href=\"http://htmlemail.io\" target=\"_blank\" style=\"border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;\">Consulter la demande</a> </td>\n" +
                "                              </tr>\n" +
                "                            </tbody>\n" +
                "                          </table>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </tbody>\n" +
                "                  </table>\n" +
                "                </td>\n" +
                "              </tr>\n" +
                "\n" +
                "              <!-- END MAIN CONTENT AREA -->\n" +
                "              </table>\n" +
                "\n" +
                "            <!-- START FOOTER -->\n" +
                "            <div class=\"footer\" style=\"clear: both; padding-top: 24px; text-align: center; width: 100%;\">\n" +
                "              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;\" width=\"100%\">\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    <span class=\"apple-link\" style=\"color: #9a9ea6; font-size: 16px; text-align: center;\">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>\n" +
                "                    <br> Don't like these emails? <a href=\"http://htmlemail.io/blog\" style=\"text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;\">Unsubscribe</a>.\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                  <td class=\"content-block powered-by\" style=\"font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;\" valign=\"top\" align=\"center\">\n" +
                "                    Powered by <a href=\"http://htmlemail.io\" style=\"color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;\">HTMLemail.io</a>\n" +
                "                  </td>\n" +
                "                </tr>\n" +
                "              </table>\n" +
                "            </div>\n" +
                "\n" +
                "            <!-- END FOOTER -->\n" +
                "            \n" +
                "<!-- END CENTERED WHITE CONTAINER --></div>\n" +
                "        </td>\n" +
                "        <td style=\"font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;\" valign=\"top\">&nbsp;</td>\n" +
                "      </tr>\n" +
                "    </table>\n" +
                "  </body>";
    }
}
