import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientDirectory = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const getClients = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/client/directory');
      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Add category filtering logic here if needed
    return matchesSearch;
  });

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Annuaire des prestataires</h1>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un prestataire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="all">Toutes les catégories</option>
              <option value="health">Santé</option>
              <option value="beauty">Beauté</option>
              <option value="education">Éducation</option>
              <option value="consulting">Conseil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun prestataire trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <div key={client._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    className="w-16 h-16 rounded-full object-cover" 
                    src={client.image} 
                    alt={client.name} 
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{client.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {client.isActive ? 'Disponible' : 'Indisponible'}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {client.subscriptionPlan}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {client.bio || 'Aucune description disponible'}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>{client.phone}</span>
                  </div>
                  {client.website && (
                    <div className="flex items-center gap-2">
                      <span>🌐</span>
                      <a 
                        href={client.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate"
                      >
                        {client.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>Créneaux de {client.slotDuration} min</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/client/${client._id}`)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={!client.isActive}
                >
                  {client.isActive ? 'Voir le profil' : 'Indisponible'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDirectory;