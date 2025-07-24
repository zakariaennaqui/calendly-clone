import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { specialityData } from '../assets/assets';

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Réservation simple',
      description: 'Réservez vos rendez-vous en quelques clics, 24h/24 et 7j/7'
    },
    {
      icon: Clock,
      title: 'Gestion du temps',
      description: 'Optimisez votre planning avec notre système intelligent'
    },
    {
      icon: Users,
      title: 'Multi-professions',
      description: 'Trouvez des professionnels dans tous les domaines'
    },
    {
      icon: Star,
      title: 'Qualité garantie',
      description: 'Professionnels vérifiés et évalués par la communauté'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Cliente',
      content: 'Interface très intuitive, je trouve facilement mes professionnels préférés.',
      rating: 5
    },
    {
      name: 'Dr. Jean Martin',
      role: 'Médecin',
      content: 'Excellent outil pour gérer mon planning et mes patients.',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Coiffeuse',
      content: 'Mes clients adorent la simplicité de prise de rendez-vous.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simplifiez vos
              <span className="text-primary-600"> rendez-vous</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              La plateforme qui connecte professionnels et clients pour une gestion 
              de rendez-vous sans effort. Réservez, gérez et optimisez votre temps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/professionals"
                className="btn-secondary text-lg px-8 py-3"
              >
                Découvrir les professionnels
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir RDV App ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour tous vos besoins de gestion de rendez-vous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos spécialités
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez le professionnel qu'il vous faut parmi nos nombreuses spécialités
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {specialityData.slice(0, 14).map((specialty, index) => (
              <Link
                key={index}
                to={`/professionals?specialty=${specialty.speciality}`}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <img
                  src={specialty.image}
                  alt={specialty.speciality}
                  className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-gray-700 capitalize text-center">
                  {specialty.speciality.replace('_', ' ')}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Voir tous les services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En 3 étapes simples, prenez votre rendez-vous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choisissez votre professionnel
              </h3>
              <p className="text-gray-600">
                Parcourez notre liste de professionnels vérifiés et sélectionnez celui qui vous convient
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sélectionnez votre créneau
              </h3>
              <p className="text-gray-600">
                Consultez les disponibilités en temps réel et choisissez l'horaire qui vous arrange
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirmez votre rendez-vous
              </h3>
              <p className="text-gray-600">
                Recevez une confirmation instantanée et des rappels automatiques
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de ceux qui nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à simplifier vos rendez-vous ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà adopté notre solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>Créer mon compte</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;