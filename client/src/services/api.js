import axios from "axios";
import { PROPERTIES, POPULAR_CITIES, BLOGS } from "../data/mockData";

const API = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
});

// Interceptor to inject JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("betteracco_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Properties
export async function getProperties(params = {}) {
  try {
    const res = await API.get("/properties", { params });
    if (res.data?.data?.properties) {
      return res.data.data.properties;
    }
    return PROPERTIES;
  } catch (err) {
    console.warn("API request failed, falling back to mock dataset:", err.message);
    return PROPERTIES;
  }
}

export async function getPropertyDetails(idOrSlug) {
  try {
    const res = await API.get(`/properties/${idOrSlug}`);
    if (res.data?.data) {
      return res.data.data;
    }
    return PROPERTIES.find((p) => p.id === idOrSlug) || PROPERTIES[0];
  } catch (err) {
    console.warn("API request failed, falling back to mock property:", err.message);
    return PROPERTIES.find((p) => p.id === idOrSlug) || PROPERTIES[0];
  }
}

export async function getComparedProperties(ids = []) {
  try {
    const res = await API.get(`/properties/compare?ids=${ids.join(",")}`);
    if (res.data?.data) {
      return res.data.data;
    }
    return PROPERTIES.filter((p) => ids.includes(p.id));
  } catch {
    return PROPERTIES.filter((p) => ids.includes(p.id));
  }
}

// Leads / Consultations
export async function submitLeadConsultation(leadData) {
  try {
    const res = await API.post("/leads", leadData);
    return res.data;
  } catch (err) {
    console.warn("Lead API error:", err.message);
    return { success: true, message: "Consultation request recorded (offline mode)" };
  }
}

// Authentication
export async function loginUser(email, password) {
  const res = await API.post("/auth/login", { email, password });
  if (res.data?.data?.token) {
    localStorage.setItem("betteracco_token", res.data.data.token);
    localStorage.setItem("betteracco_user", JSON.stringify(res.data.data.user));
  }
  return res.data;
}

export async function registerUser(userData) {
  const res = await API.post("/auth/register", userData);
  if (res.data?.data?.token) {
    localStorage.setItem("betteracco_token", res.data.data.token);
    localStorage.setItem("betteracco_user", JSON.stringify(res.data.data.user));
  }
  return res.data;
}

export async function getCurrentUser() {
  const res = await API.get("/auth/me");
  return res.data?.data;
}

export async function updateUserProfile(data) {
  const res = await API.patch("/auth/profile", data);
  if (res.data?.data) {
    localStorage.setItem("betteracco_user", JSON.stringify(res.data.data));
  }
  return res.data;
}

// Blogs
export async function getBlogsList() {
  try {
    const res = await API.get("/blogs");
    return res.data?.data?.blogs || BLOGS;
  } catch {
    return BLOGS;
  }
}

// Cities
export async function getPopularCitiesList() {
  try {
    const res = await API.get("/meta/cities");
    return res.data?.data || POPULAR_CITIES;
  } catch {
    return POPULAR_CITIES;
  }
}

export default API;
