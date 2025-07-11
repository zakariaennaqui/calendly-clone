import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { backendUrl } = useContext(AppContext);
  const [dashData, setDashData] = useState(null);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [events, setEvents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Admin credentials (in real app, this should be properly authenticated)
  const adminToken = localStorage.getItem('adminToken');

  const getAdminDashboard = async () => {
    try {
      // Simulate admin dashboard data
      const mockData = {
        totalUsers: 150,
        totalClients: 25,
        totalAppointments: 450,
        totalEvents: 12,
        totalRevenue: 15750,
        monthlyRevenue: 3200,
        completionRate: 85,
        popularServices: [
          { name: 'Consultation générale', count: 120 },
          { name: 'Dermatologie', count: 85 },
          { name: 'Gynécologie', count: 70 }
        ]
      };
      setDashData(mockData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUsers = async () => {
    try {
      // Mock users data
      const mockUsers = [
        { _id: '1', name: 'Jean Dupont', email: 'jean@email.com', createdAt: new Date(), isActive: true },
        { _id: '2', name: 'Marie Martin', email: 'marie@email.com', createdAt: new Date(), isActive: true },
        { _id: '3', name: 'Pierre Durand', email: 'pierre@email.com', createdAt: new Date(), isActive: false }
      ];
      setUsers(mockUsers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getClients = async () => {
    try {
      // Mock clients data
      const mockClients = [
        { _id: '1', name: 'Dr. Smith', email: 'smith@clinic.com', subscriptionPlan: 'premium', isActive: true },
        { _id: '2', name: 'Dr. Johnson', email: 'johnson@health.com', subscriptionPlan: 'free', isActive: true }
      ];
      setClients(mockClients);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      // Mock toggle user status
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, isActive: !currentStatus } : user
      ));
      toast.success('Statut utilisateur mis à jour');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleClientStatus = async (clientId, currentStatus) => {
    try {
      // Mock toggle client status
      setClients(prev => prev.map(client => 
        client._id === clientId ? { ...client, isActive: !currentStatus } : client
      ));
      toast.success('Statut client mis à jour');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAdminDashboard();
    getUsers();
    getClients();
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Utilisateurs</h3>
          <p className="text-3xl font-bold text-blue-600">{dashData?.totalUsers}</p>
          <p className="text-sm text-gray-500">Total inscrits</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Clients</h3>
          <p className="text-3xl font-bold text-green-600">{dashData?.totalClients}</p>
          <p className="text-sm text-gray-500">Abonnés actifs</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Rendez-vous</h3>
          <p className="text-3xl font-bold text-purple-600">{dashData?.totalAppointments}</p>
          <p className="text-sm text-gray-500">Total réservations</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Revenus</h3>
          <p className="text-3xl font-bold text-yellow-600">{dashData?.totalRevenue} MAD</p>
          <p className="text-sm text-gray-500">Ce mois: {dashData?.monthlyRevenue} MAD</p>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Services populaires</h3>
          <div className="space-y-3">
            {dashData?.popularServices?.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{service.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(service.count / 120) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{service.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Métriques clés</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Taux de complétion</span>
              <span className="font-semibold text-green-600">{dashData?.completionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Événements actifs</span>
              <span className="font-semibold">{dashData?.totalEvents}</span>
            </div>
            <div className="flex justify-between">
              <span>Croissance mensuelle</span>
              <span className="font-semibold text-green-600">+12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">Gestion des utilisateurs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'inscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      user.isActive 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {user.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">Gestion des clients (abonnés)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map(client => (
              <tr key={client._id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.subscriptionPlan === 'premium' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.subscriptionPlan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {client.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleClientStatus(client._id, client.isActive)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      client.isActive 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {client.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord Admin</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { id: 'overview', label: 'Vue d\'ensemble' },
          { id: 'users', label: 'Utilisateurs' },
          { id: 'clients', label: 'Clients' },
          { id: 'payments', label: 'Paiements' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'clients' && renderClients()}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Gestion des paiements</h3>
          <p className="text-gray-600">Fonctionnalité en développement...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;