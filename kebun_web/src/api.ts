import axios from "axios";

const RAW_API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
let CLEAN_API_URL = RAW_API_URL.replace(/\/+$/, "");

// Normalize to avoid accidental /api/api from env value
while (CLEAN_API_URL.endsWith("/api")) {
  CLEAN_API_URL = CLEAN_API_URL.slice(0, -4);
}

export const ORIGIN = CLEAN_API_URL;
const API_BASE_URL = `${CLEAN_API_URL}/api`;

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

function shouldUpgradeToHttps() {
  if (typeof window === "undefined") return false;
  return window.location.protocol === "https:";
}

function upgradeHttpUrl(value: string) {
  if (!shouldUpgradeToHttps()) return value;
  if (!value.startsWith("http://")) return value;
  return `https://${value.slice("http://".length)}`;
}

function normalizePayloadUrls<T>(payload: T): T {
  if (typeof payload === "string") {
    return upgradeHttpUrl(payload) as T;
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => normalizePayloadUrls(item)) as T;
  }

  if (payload && typeof payload === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(payload as Record<string, unknown>)) {
      out[key] = normalizePayloadUrls(val);
    }
    return out as T;
  }

  return payload;
}

api.interceptors.response.use((response) => {
  response.data = normalizePayloadUrls(response.data);
  return response;
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
