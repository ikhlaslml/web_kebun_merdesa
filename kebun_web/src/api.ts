import axios from "axios";

const RAW_API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const CLEAN_API_URL = RAW_API_URL.replace(/\/+$/, "");

export const ORIGIN = CLEAN_API_URL.endsWith("/api") ? CLEAN_API_URL.slice(0, -4) : CLEAN_API_URL;
const API_BASE_URL = CLEAN_API_URL.endsWith("/api") ? CLEAN_API_URL : `${CLEAN_API_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Auto attach token (admin)
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token");

  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function asArray<T>(input: unknown): T[] {
  if (Array.isArray(input)) return input;
  if (input && typeof input === "object") {
    const data = (input as { data?: unknown }).data;
    if (Array.isArray(data)) return data as T[];
  }
  return [];
}

export function waLink(message: string) {
  const number = (import.meta.env.VITE_WA_NUMBER || "").trim();
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}
