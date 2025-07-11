import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientDashboard = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [dashData, setDashData] = useState(null);
  const [events, setEvents] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showPromoForm, setShowPromoForm] = useState(false);

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    registrationDeadline: '',
    price: 0,
    isOnline: false,
    meetingLink: '',
    category: 'general'
  });

  // Promo code form state
  const [promoForm, setPromoForm] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minAmount: 0,
    usageLimit: '',
    validFrom: '',
    validUntil: ''
  });

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/client/dashboard', { headers: { token } });
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getEvents = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/client/events', { headers: { token } });
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getPromoCodes = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/client/promo-codes', { headers: { token } });
      if (data.success) {
        setPromoCodes(data.promoCodes);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/client/events', eventForm, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        setShowEventForm(false);
        setEventForm({
          title: '',
          description: '',
          location: '',
          startDate: '',
          endDate: '',
          maxParticipants: '',
          registrationDeadline: '',
          price: 0,
          isOnline: false,
          meetingLink: '',
          category: 'general'
        });
        getEvents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createPromoCode = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/client/promo-codes', promoForm, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        setShowPromoForm(false);
        setPromoForm({
          code: '',
          description: '',
          discountType: 'percentage',
          discountValue: '',
          minAmount: 0,
          usageLimit: '',
          validFrom: '',
          validUntil: ''
        });
        getPromoCodes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getDashboardData();
      getEvents();
      getPromoCodes();
    }
  }, [token]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord Client</h1>

      {/* Dashboard Stats */}
      {dashData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Rendez-vous totaux</h3>
            <p className="text-3xl font-bold text-blue-600">{dashData.totalAppointments}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">À venir</h3>
            <p className="text-3xl font-bold text-green-600">{dashData.upcomingAppointments}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Événements</h3>
            <p className="text-3xl font-bold text-purple-600">{dashData.totalEvents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Revenus</h3>
            <p className="text-3xl font-bold text-yellow-600">{dashData.totalRevenue} MAD</p>
          </div>
        </div>
      )}

      {/* Events Section */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mes Événements</h2>
          <button
            onClick={() => setShowEventForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Créer un événement
          </button>
        </div>
        <div className="p-6">
          {events.length === 0 ? (
            <p className="text-gray-500">Aucun événement créé</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <div key={event._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <p className="text-sm"><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                  <p className="text-sm"><strong>Participants max:</strong> {event.maxParticipants}</p>
                  <p className="text-sm"><strong>Inscrits:</strong> {event.registrations.length}</p>
                  <p className="text-sm"><strong>Prix:</strong> {event.price} MAD</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Promo Codes Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Codes Promo</h2>
          <button
            onClick={() => setShowPromoForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Créer un code promo
          </button>
        </div>
        <div className="p-6">
          {promoCodes.length === 0 ? (
            <p className="text-gray-500">Aucun code promo créé</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Code</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Réduction</th>
                    <th className="px-4 py-2 text-left">Utilisations</th>
                    <th className="px-4 py-2 text-left">Validité</th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((promo) => (
                    <tr key={promo._id} className="border-b">
                      <td className="px-4 py-2 font-mono">{promo.code}</td>
                      <td className="px-4 py-2">{promo.description}</td>
                      <td className="px-4 py-2">
                        {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `${promo.discountValue} MAD`}
                      </td>
                      <td className="px-4 py-2">{promo.usageCount}/{promo.usageLimit || '∞'}</td>
                      <td className="px-4 py-2">
                        {new Date(promo.validFrom).toLocaleDateString()} - {new Date(promo.validUntil).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Event Creation Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Créer un événement</h2>
            <form onSubmit={createEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lieu</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date de début</label>
                  <input
                    type="datetime-local"
                    value={eventForm.startDate}
                    onChange={(e) => setEventForm({...eventForm, startDate: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date de fin</label>
                  <input
                    type="datetime-local"
                    value={eventForm.endDate}
                    onChange={(e) => setEventForm({...eventForm, endDate: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Participants max</label>
                  <input
                    type="number"
                    value={eventForm.maxParticipants}
                    onChange={(e) => setEventForm({...eventForm, maxParticipants: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Prix (MAD)</label>
                  <input
                    type="number"
                    value={eventForm.price}
                    onChange={(e) => setEventForm({...eventForm, price: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date limite d'inscription</label>
                <input
                  type="datetime-local"
                  value={eventForm.registrationDeadline}
                  onChange={(e) => setEventForm({...eventForm, registrationDeadline: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={eventForm.isOnline}
                  onChange={(e) => setEventForm({...eventForm, isOnline: e.target.checked})}
                />
                <label className="text-sm">Événement en ligne</label>
              </div>
              {eventForm.isOnline && (
                <div>
                  <label className="block text-sm font-medium mb-1">Lien de réunion</label>
                  <input
                    type="url"
                    value={eventForm.meetingLink}
                    onChange={(e) => setEventForm({...eventForm, meetingLink: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              )}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Créer
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promo Code Creation Modal */}
      {showPromoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Créer un code promo</h2>
            <form onSubmit={createPromoCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <input
                  type="text"
                  value={promoForm.code}
                  onChange={(e) => setPromoForm({...promoForm, code: e.target.value.toUpperCase()})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({...promoForm, description: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type de réduction</label>
                <select
                  value={promoForm.discountType}
                  onChange={(e) => setPromoForm({...promoForm, discountType: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="percentage">Pourcentage</option>
                  <option value="fixed">Montant fixe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valeur de réduction {promoForm.discountType === 'percentage' ? '(%)' : '(MAD)'}
                </label>
                <input
                  type="number"
                  value={promoForm.discountValue}
                  onChange={(e) => setPromoForm({...promoForm, discountValue: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date de début</label>
                  <input
                    type="date"
                    value={promoForm.validFrom}
                    onChange={(e) => setPromoForm({...promoForm, validFrom: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date de fin</label>
                  <input
                    type="date"
                    value={promoForm.validUntil}
                    onChange={(e) => setPromoForm({...promoForm, validUntil: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Limite d'utilisation (optionnel)</label>
                <input
                  type="number"
                  value={promoForm.usageLimit}
                  onChange={(e) => setPromoForm({...promoForm, usageLimit: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Créer
                </button>
                <button
                  type="button"
                  onClick={() => setShowPromoForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;