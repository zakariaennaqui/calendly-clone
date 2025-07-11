import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientCalendar = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [availableSlots, setAvailableSlots] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/client/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getWeekDays = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = formatDate(date);
    return appointments.filter(apt => {
      const aptDate = apt.slotDate.replace(/_/g, '-');
      return aptDate === dateStr;
    });
  };

  const isSlotBooked = (date, time) => {
    const dateAppointments = getAppointmentsForDate(date);
    return dateAppointments.some(apt => apt.slotTime === time);
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  useEffect(() => {
    setAvailableSlots(generateTimeSlots());
  }, []);

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(selectedDate);
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
          {selectedDate.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        
        <div className="space-y-2">
          {availableSlots.map(time => {
            const isBooked = isSlotBooked(selectedDate, time);
            const appointment = dayAppointments.find(apt => apt.slotTime === time);
            
            return (
              <div
                key={time}
                className={`p-3 rounded-lg border ${
                  isBooked 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{time}</span>
                  {isBooked && appointment ? (
                    <div className="text-sm">
                      <span className="font-medium">{appointment.userData.name}</span>
                      <span className="text-gray-600 ml-2">
                        {appointment.cancelled ? '(Annulé)' : appointment.isCompleted ? '(Terminé)' : '(Confirmé)'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Disponible</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(selectedDate);
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-8 gap-2">
          <div className="font-semibold p-2">Heure</div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="font-semibold p-2 text-center">
              <div>{day.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
              <div className="text-sm text-gray-600">{day.getDate()}</div>
            </div>
          ))}
          
          {availableSlots.map(time => (
            <React.Fragment key={time}>
              <div className="p-2 text-sm font-medium border-t">{time}</div>
              {weekDays.map(day => {
                const isBooked = isSlotBooked(day, time);
                const appointment = getAppointmentsForDate(day).find(apt => apt.slotTime === time);
                
                return (
                  <div
                    key={`${day.toISOString()}-${time}`}
                    className={`p-2 border-t text-xs ${
                      isBooked ? 'bg-blue-100' : 'bg-gray-50'
                    }`}
                  >
                    {appointment && (
                      <div className="truncate">
                        {appointment.userData.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mon Calendrier</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewMode === 'day' ? 'bg-white shadow' : 'text-gray-600'
              }`}
            >
              Jour
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewMode === 'week' ? 'bg-white shadow' : 'text-gray-600'
              }`}
            >
              Semaine
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - (viewMode === 'week' ? 7 : 1));
                setSelectedDate(newDate);
              }}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              ←
            </button>
            
            <input
              type="date"
              value={formatDate(selectedDate)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border rounded-lg px-3 py-2"
            />
            
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + (viewMode === 'week' ? 7 : 1));
                setSelectedDate(newDate);
              }}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              →
            </button>
            
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Aujourd'hui
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'day' ? renderDayView() : renderWeekView()}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total RDV</h3>
          <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Confirmés</h3>
          <p className="text-3xl font-bold text-green-600">
            {appointments.filter(apt => !apt.cancelled && !apt.isCompleted).length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Terminés</h3>
          <p className="text-3xl font-bold text-purple-600">
            {appointments.filter(apt => apt.isCompleted).length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Annulés</h3>
          <p className="text-3xl font-bold text-red-600">
            {appointments.filter(apt => apt.cancelled).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientCalendar;