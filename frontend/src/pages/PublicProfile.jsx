import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PublicProfile = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { token, backendUrl } = useContext(AppContext);
  const [clientData, setClientData] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const getClientProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/client/public-profile/${clientId}`);
      if (data.success) {
        setClientData(data.clientData);
      }
    } catch (error) {
      toast.error('Profil non trouvé');
      navigate('/');
    }
  };

  const generateAvailableSlots = () => {
    if (!clientData) return;

    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const workingHours = clientData.workingHours[dayName];

    if (!workingHours || !workingHours.enabled) {
      setAvailableSlots([]);
      return;
    }

    const slots = [];
    const [startHour, startMinute] = workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = workingHours.end.split(':').map(Number);

    let currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    while (currentTime < endTime) {
      const timeString = currentTime.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      // Check if slot is not booked (this would need to be implemented with actual booking data)
      slots.push(timeString);
      
      currentTime.setMinutes(currentTime.getMinutes() + clientData.slotDuration);
    }

    setAvailableSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Veuillez vous connecter pour réserver');
      navigate('/login');
      return;
    }

    try {
      const slotDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '_');
      
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId: clientId,
          slotDate,
          slotTime: selectedTime
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Rendez-vous réservé avec succès!');
        setShowBookingModal(false);
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (clientId) {
      getClientProfile();
    }
  }, [clientId]);

  useEffect(() => {
    generateAvailableSlots();
  }, [clientData, selectedDate]);

  if (!clientData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Client Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-6">
          <img 
            className="w-24 h-24 rounded-full object-cover" 
            src={clientData.image} 
            alt={clientData.name} 
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{clientData.name}</h1>
            <p className="text-gray-600 mt-2">{clientData.bio}</p>
            {clientData.website && (
              <a 
                href={clientData.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Visiter le site web
              </a>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Durée des créneaux</div>
            <div className="text-lg font-semibold">{clientData.slotDuration} min</div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Réserver un rendez-vous</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choisir une date</h3>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + clientData.maxAdvanceBooking * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            />
            
            {/* Working Hours Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Horaires de travail</h4>
              <div className="space-y-1 text-sm">
                {Object.entries(clientData.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">{day}:</span>
                    <span className={hours.enabled ? 'text-green-600' : 'text-gray-500'}>
                      {hours.enabled ? `${hours.start} - ${hours.end}` : 'Fermé'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Créneaux disponibles - {selectedDate.toLocaleDateString('fr-FR')}
            </h3>
            
            {availableSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun créneau disponible pour cette date
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {availableSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setShowBookingModal(true);
                    }}
                    className="p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-300 text-sm"
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirmer la réservation</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-medium">Prestataire:</span>
                <span>{clientData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{selectedDate.toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Heure:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Durée:</span>
                <span>{clientData.slotDuration} minutes</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={bookAppointment}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Confirmer
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
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

export default PublicProfile;