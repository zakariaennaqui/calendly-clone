import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');

  const getEvents = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/event/list');
      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerForEvent = async () => {
    if (!token) {
      toast.warn('Veuillez vous connecter pour vous inscrire');
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + '/api/event/register',
        { eventId: selectedEvent._id, paymentMethod },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setShowRegistrationModal(false);
        getEvents(); // Refresh events to update registration count
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Événements disponibles</h1>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun événement disponible pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">📅 Date:</span>
                    <span>{new Date(event.startDate).toLocaleDateString('fr-FR')} - {new Date(event.endDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium">📍 Lieu:</span>
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium">👥 Participants:</span>
                    <span>{event.registrations.length}/{event.maxParticipants}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium">💰 Prix:</span>
                    <span className={event.price === 0 ? 'text-green-600 font-semibold' : ''}>
                      {event.price === 0 ? 'Gratuit' : `${event.price} MAD`}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium">⏰ Inscription jusqu'au:</span>
                    <span>{new Date(event.registrationDeadline).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="mt-6">
                  {event.registrations.length >= event.maxParticipants ? (
                    <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed">
                      Complet
                    </button>
                  ) : new Date() > new Date(event.registrationDeadline) ? (
                    <button className="w-full bg-red-400 text-white py-2 px-4 rounded cursor-not-allowed">
                      Inscriptions fermées
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowRegistrationModal(true);
                      }}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                      S'inscrire
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Inscription à l'événement</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold">{selectedEvent.title}</h3>
              <p className="text-gray-600 text-sm">{selectedEvent.description}</p>
            </div>

            {selectedEvent.price > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Mode de paiement</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Paiement en ligne ({selectedEvent.price} MAD)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="onsite"
                      checked={paymentMethod === 'onsite'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Paiement sur place</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={registerForEvent}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Confirmer l'inscription
              </button>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;