🔗 **users :** [calendly-clone-neon.vercel.app](https://calendly-clone-neon.vercel.app)
🔗 **admin&abonne :** [calendly-clone-admins.vercel.app](https://calendly-clone-admins.vercel.app)
🔗 **back :** [calendly-clone-back.vercel.app](https://calendly-clone-back.vercel.app)

# 📅 Calendly Clone - Système de Gestion de Rendez-vous

Une application complète de gestion de calendrier et prise de rendez-vous, inspirée de Calendly, développée avec React, Node.js et MongoDB.

## 🚀 Fonctionnalités Principales

### 👥 Gestion des Utilisateurs
- **Dual Registration**: Comptes séparés pour Clients (abonnés) et Utilisateurs (visiteurs)
- **Authentification JWT**: Système sécurisé avec gestion des rôles
- **Profils personnalisables**: Gestion complète des informations utilisateur

### 📅 Gestion de Calendrier (Clients)
- **Horaires de travail configurables**: Définition par jour de la semaine
- **Durée des créneaux personnalisable**: 15min à 2h
- **Temps de pause entre rendez-vous**
- **Limites de réservation**: Min/max jours à l'avance
- **Vue calendrier**: Jour, semaine avec aperçu des réservations

### 🎉 Système d'Événements
- **Création d'événements**: Avec participants multiples
- **Gestion des inscriptions**: Limite de participants et date limite
- **Événements payants/gratuits**: Intégration paiement
- **Notifications automatiques**: Confirmation et rappels

### 💰 Codes Promo
- **Réductions flexibles**: Pourcentage ou montant fixe
- **Limites d'utilisation**: Par utilisateur et globale
- **Validation en temps réel**: Vérification automatique
- **Applicabilité**: Services spécifiques ou globale

### 📧 Notifications Automatiques
- **Emails de confirmation**: Rendez-vous et événements
- **Rappels automatiques**: 24h et 1h avant
- **Templates professionnels**: HTML avec branding
- **Système de queue**: Gestion asynchrone des envois

### 💳 Paiements Intégrés
- **Stripe & Razorpay**: Double intégration
- **Paiement en ligne/sur place**: Options flexibles
- **Gestion des remboursements**: En cas d'annulation

### 🎨 Interface Moderne
- **Design responsive**: Mobile et desktop
- **UI/UX professionnelle**: Inspirée de Notion/Calendly
- **Navigation intuitive**: Menus adaptatifs selon le rôle
- **Tableaux de bord**: Statistiques et métriques

## 🛠️ Technologies Utilisées

### Backend
- **Node.js & Express**: API REST
- **MongoDB & Mongoose**: Base de données
- **JWT**: Authentification
- **Nodemailer**: Envoi d'emails
- **Cloudinary**: Gestion des images
- **Stripe/Razorpay**: Paiements
- **Node-cron**: Tâches programmées

### Frontend
- **React 19**: Interface utilisateur
- **React Router**: Navigation
- **Axios**: Requêtes HTTP
- **Tailwind CSS**: Styling
- **React Toastify**: Notifications

## 📦 Installation

### Prérequis
- Node.js (v16+)
- MongoDB
- Comptes Cloudinary, Stripe, Razorpay

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin Panel
```bash
cd admin
npm install
npm run dev
```

## ⚙️ Configuration

### Variables d'environnement (.env)
```env
# Database
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net"

# Cloudinary
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_SECRET_KEY="your_secret"
CLOUDINARY_NAME="your_name"

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASSWORD="your_app_password"

# Paiements
STRIPE_SECRET_KEY="sk_test_..."
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_secret"
```

## 🎯 Utilisation

### Pour les Clients (Abonnés)
1. **Inscription** avec profil détaillé
2. **Configuration** des horaires et créneaux
3. **Création** d'événements et codes promo
4. **Gestion** du calendrier et des réservations
5. **Suivi** des statistiques et revenus

### Pour les Utilisateurs (Visiteurs)
1. **Navigation** dans l'annuaire des prestataires
2. **Réservation** de créneaux disponibles
3. **Inscription** aux événements
4. **Paiement** en ligne ou sur place
5. **Suivi** des rendez-vous et historique

### Pour les Administrateurs
1. **Dashboard** global avec métriques
2. **Gestion** des utilisateurs et clients
3. **Suivi** des paiements et revenus
4. **Modération** des comptes et contenus

## 📱 Fonctionnalités Avancées

- **Système de rappels**: Emails automatiques
- **Gestion des fuseaux horaires**: Support international
- **API REST complète**: Documentation Swagger
- **Sécurité renforcée**: Validation et sanitisation
- **Performance optimisée**: Cache et pagination
- **Logs détaillés**: Monitoring et debug

## 🔒 Sécurité

- Authentification JWT sécurisée
- Validation des données côté serveur
- Protection CORS configurée
- Chiffrement des mots de passe
- Gestion des permissions par rôle

## 📈 Métriques et Analytics

- Tableau de bord avec KPIs
- Statistiques de réservation
- Taux de conversion
- Revenus et paiements
- Événements populaires

## 🚀 Déploiement

Le projet est configuré pour Vercel avec les fichiers `vercel.json` appropriés.

### Backend
```bash
vercel --prod
```

### Frontend
```bash
cd frontend
vercel --prod
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour toute question ou support, contactez: zakariaennaqui.pro@gmail.com