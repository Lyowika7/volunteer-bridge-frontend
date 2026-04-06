import axios from "axios";

const API_BASE_URL = "https://volunteer-bridge-3.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vb_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("vb_token");
      localStorage.removeItem("vb_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => api.post("/api/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/api/auth/login", data),
};

// Projects
export const projectsAPI = {
  getAll: () => api.get("/api/projects"),

  getOne: (id: string) => api.get(`/api/projects/${id}`),

  create: (data: {
    name: string;
    description: string;
    start_date?: string;
    end_date?: string;
    status?: string;
  }) => api.post("/api/projects", data),
};

// Tasks
export const tasksAPI = {
  getByProject: (projectId: string) =>
    api.get(`/api/tasks/projects/${projectId}/tasks`),

  getMyTasks: () => api.get("/api/tasks/my-tasks"),

  create: (projectId: string, data: any) =>
    api.post(`/api/tasks/projects/${projectId}/tasks`, data),

  assign: (taskId: string, data: { userId: string; taskTitle?: string }) =>
    api.post(`/api/tasks/${taskId}/assign`, data),

  updateStatus: (taskId: string, data: { status: string }) =>
    api.patch(`/api/tasks/${taskId}/status`, data),
};

// Reports
export const reportsAPI = {
  create: (data: any) => api.post("/api/reports", data),

  getAll: () => api.get("/api/reports"),

  getByUser: (userId: string) => api.get(`/api/reports/user/${userId}`),

  getByProject: (projectId: string) =>
    api.get(`/api/reports/project/${projectId}`),

  getOne: (id: string) => api.get(`/api/reports/${id}`),
};

// Donations
export const donationsAPI = {
  create: (data: {
    report_id: string;
    amount: number;
    paymentMethod: "card" | "bank_transfer" | "cash";
    status?: string;
  }) => api.post("/api/donations", data),

  getAll: () => api.get("/api/donations"),

  getOne: (id: string) => api.get(`/api/donations/${id}`),
};

// Users
export const usersAPI = {
  getVolunteerUsers: () => api.get("/api/users/volunteers"),
};

// Notifications
export const notificationsAPI = {
  getAll: () => api.get("/api/notifications"),

  markAsRead: (id: string) => api.put(`/api/notifications/${id}/read`),
};

// Volunteer Profile
export const profileAPI = {
  create: (data: any) => api.post("/api/volunteers", data),

  update: (id: string, data: any) => api.put(`/api/volunteers/${id}`, data),

  get: (id: string) => api.get(`/api/volunteers/${id}`),
};

export default api;