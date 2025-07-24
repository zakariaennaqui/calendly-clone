import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { abonneAPI } from '../utils/api';
import { specialityData } from '../assets/assets';

const Professionals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || '');

  useEffect(() => {
    fetchProfessionals();
  }, []);

  useEffect(() => {
    filterProfessionals();
  }, [professionals, searchTerm, selectedSpecialty]);

  const fetchProfessionals = async () => {
    try {
      const response = await abonneAPI.getAll();
      setProfessionals(response.data);
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfessionals = () => {
    let filtered = professionals;

    if (searchTerm) {
      filtered = filtered.filter(prof => 
        prof.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.profession.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(prof => 
        prof.profession.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    setFilteredProfessionals(filtered);
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
    if (specialty) {
      setSearchParams({ specialty });
    } else {
      setSearchParams({});
    }
  };

  const getSpecialtyImage = (profession) => {
    const specialty = specialityData.find(s => 
      s.speciality.toLowerCase() === profession.toLowerCase()
    );
    return specialty?.image || specialityData[0].image;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Trouvez votre professionnel
          </h1>
          <p className="text-gray-600">
            Découvrez nos professionnels vérifiés et prenez rendez-vous en quelques clics
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un professionnel..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                value={selectedSpecialty}
                onChange={(e) => handleSpecialtyChange(e.target.value)}
              >
                <option value="">Toutes les spécialités</option>
                {specialityData.map((specialty, index) => (
                  <option key={index} value={specialty.speciality}>
                    {specialty.speciality.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Location (placeholder) */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Localisation"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProfessionals.length} professionnel(s) trouvé(s)
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <div key={professional.abonne_id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={getSpecialtyImage(professional.profession)}
                    alt={professional.profession}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {professional.prenom} {professional.nom}
                    </h3>
                    <p className="text-primary-600 capitalize">
                      {professional.profession.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{professional.adresse}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-gray-600">4.8 (24 avis)</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/professional/${professional.abonne_id}`}
                    className="flex-1 btn-primary text-center"
                  >
                    Voir le profil
                  </Link>
                  <Link
                    to={`/booking/${professional.abonne_id}`}
                    className="flex-1 btn-secondary text-center"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun professionnel trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Professionals;