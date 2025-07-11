import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientProfile = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [clientData, setClientData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const getClientProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/client/profile', { headers: { token } });
      if (data.success) {
        setClientData(data.clientData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateClientProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', clientData.name);
      formData.append('phone', clientData.phone);
      formData.append('bio', clientData.bio);
      formData.append('website', clientData.website);
      formData.append('timezone', clientData.timezone);
      formData.append('slotDuration', clientData.slotDuration);
      formData.append('bufferTime', clientData.bufferTime);
      formData.append('maxAdvanceBooking', clientData.maxAdvanceBooking);
      formData.append('minAdvanceBooking', clientData.minAdvanceBooking);
      formData.append('workingHours', JSON.stringify(clientData.workingHours));

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(backendUrl + '/api/client/update-profile', formData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setImage(false);
        getClientProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setClientData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  useEffect(() => {
    if (token) {
      getClientProfile();
    }
  }, [token]);

  return clientData && (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Profil Client</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-6 mb-6">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative">
                <img 
                  className="w-24 h-24 rounded-full object-cover" 
                  src={image ? URL.createObjectURL(image) : clientData.image} 
                  alt="" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <img className="w-6 h-6" src={assets.upload_icon} alt="" />
                </div>
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <img className="w-24 h-24 rounded-full object-cover" src={clientData.image} alt="" />
          )}

          <div className="flex-1">
            {isEdit ? (
              <input
                type="text"
                value={clientData.name}
                onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                className="text-2xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold">{clientData.name}</h2>
            )}
            <p className="text-gray-600">{clientData.email}</p>
          </div>

          <button
            onClick={() => isEdit ? updateClientProfile() : setIsEdit(true)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              isEdit ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isEdit ? 'Sauvegarder' : 'Modifier'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            {isEdit ? (
              <input
                type="text"
                value={clientData.phone}
                onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-700">{clientData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site web</label>
            {isEdit ? (
              <input
                type="url"
                value={clientData.website}
                onChange={(e) => setClientData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-700">{clientData.website || 'Non renseigné'}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Bio</label>
            {isEdit ? (
              <textarea
                value={clientData.bio}
                onChange={(e) => setClientData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
                rows={3}
              />
            ) : (
              <p className="text-gray-700">{clientData.bio || 'Aucune bio'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Paramètres de calendrier</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Durée des créneaux (minutes)</label>
            {isEdit ? (
              <select
                value={clientData.slotDuration}
                onChange={(e) => setClientData(prev => ({ ...prev, slotDuration: Number(e.target.value) }))}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 heure</option>
                <option value={90}>1h30</option>
                <option value={120}>2 heures</option>
              </select>
            ) : (
              <p className="text-gray-700">{clientData.slotDuration} minutes</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Temps de pause (minutes)</label>
            {isEdit ? (
              <input
                type="number"
                value={clientData.bufferTime}
                onChange={(e) => setClientData(prev => ({ ...prev, bufferTime: Number(e.target.value) }))}
                className="w-full border rounded-lg px-3 py-2"
                min="0"
              />
            ) : (
              <p className="text-gray-700">{clientData.bufferTime} minutes</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Réservation max (jours à l'avance)</label>
            {isEdit ? (
              <input
                type="number"
                value={clientData.maxAdvanceBooking}
                onChange={(e) => setClientData(prev => ({ ...prev, maxAdvanceBooking: Number(e.target.value) }))}
                className="w-full border rounded-lg px-3 py-2"
                min="1"
              />
            ) : (
              <p className="text-gray-700">{clientData.maxAdvanceBooking} jours</p>
            )}
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Horaires de travail</h4>
          <div className="space-y-3">
            {Object.entries(clientData.workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24">
                  <span className="font-medium capitalize">{day}</span>
                </div>
                
                {isEdit ? (
                  <>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hours.enabled}
                        onChange={(e) => handleWorkingHoursChange(day, 'enabled', e.target.checked)}
                      />
                      <span>Actif</span>
                    </label>
                    
                    {hours.enabled && (
                      <>
                        <input
                          type="time"
                          value={hours.start}
                          onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                        <span>à</span>
                        <input
                          type="time"
                          value={hours.end}
                          onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      hours.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {hours.enabled ? `${hours.start} - ${hours.end}` : 'Fermé'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;