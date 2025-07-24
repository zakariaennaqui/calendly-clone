import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  loginAbonne: (credentials) => api.post('/abonne/login', credentials),
  loginClient: (credentials) => api.post('/client/login', credentials),
  registerAbonne: (userData) => api.post('/abonne/register', userData),
  registerClient: (userData) => api.post('/client/register', userData),
  getAbonneProfile: () => api.get('/abonne/me'),
  getClientProfile: () => api.get('/client/me'),
};

// Abonne API
export const abonneAPI = {
  getAll: () => api.get('/abonne/list'),
  getById: (id) => api.get(`/abonne/${id}`),
  create: (data) => api.post('/abonne/add', data),
  update: (data) => api.put('/abonne/update', data),
  delete: (id) => api.delete(`/abonne/delete/${id}`),
  getByProfession: (profession) => api.get(`/abonne/abonne-By-Profession?profession=${profession}`),
  getCreneaux: (id) => api.get(`/abonne/creneaux/${id}`),
  getOffres: (id) => api.get(`/abonne/offres/${id}`),
  getRendezVous: (id) => api.get(`/abonne/rendezVous/${id}`),
  getTotalRendezVous: () => api.get('/abonne/getTotalRendezVous'),
  getTotalRendezVousThisMonth: () => api.get('/abonne/getTotalRendezVousThisMonth'),
  getTotalRevenues: () => api.get('/abonne/getTotalRevenues'),
  getTodayRendezVous: () => api.get('/abonne/todayRendezVous'),
};

// Client API
export const clientAPI = {
  getAll: () => api.get('/client/list'),
  getById: (id) => api.get(`/client/${id}`),
  create: (data) => api.post('/client/add', data),
  update: (data) => api.put('/client/update', data),
  delete: (id) => api.delete(`/client/delete/${id}`),
  getRendezVous: (id) => api.get(`/client/rendezVous/${id}`),
  getEvenements: (id) => api.get(`/client/evenements/${id}`),
};

// Offre API
export const offreAPI = {
  getAll: () => api.get('/offre/list'),
  getById: (id) => api.get(`/offre/${id}`),
  create: (data) => api.post('/offre/add', data),
  update: (data) => api.put('/offre/update', data),
  delete: (id) => api.delete(`/offre/delete/${id}`),
  getByCategory: (category) => api.get(`/offre/offre-By-Category?category=${category}`),
};

// Creneau API
export const creneauAPI = {
  getAll: () => api.get('/creneau/all'),
  getById: (id) => api.get(`/creneau/${id}`),
  create: (data) => api.post('/creneau/add', data),
  update: (data) => api.put('/creneau/update', data),
  delete: (id) => api.delete(`/creneau/delete/${id}`),
};

// RendezVous API
export const rendezVousAPI = {
  getAll: () => api.get('/rendez-vous/all'),
  getById: (id) => api.get(`/rendez-vous/${id}`),
  create: (data) => api.post('/rendez-vous/add', data),
  update: (data) => api.put('/rendez-vous/update', data),
  delete: (id) => api.delete(`/rendez-vous/delete/${id}`),
};

// DemandeRV API
export const demandeRVAPI = {
  getAll: () => api.get('/demande/all'),
  getById: (id) => api.get(`/demande/${id}`),
  create: (data) => api.post('/demande/add', data),
  update: (data) => api.put('/demande/update', data),
  delete: (id) => api.delete(`/demande/delete/${id}`),
  confirm: (data) => api.get('/demande/Confirm', { data }),
  cancel: (data) => api.get('/demande/cancel', { data }),
};

// Events API
export const eventAPI = {
  getAll: () => api.get('/events/all'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events/add', data),
  update: (data) => api.put('/events/update', data),
  delete: (id) => api.delete(`/events/delete/${id}`),
};

export default api;