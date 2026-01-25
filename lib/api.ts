import axios from "axios";

// Default to localhost:8000 if not specified
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

import { WhatsAppDevice } from "@/types";

export const getDevices = () => api.get<WhatsAppDevice[]>("/whatsapp/devices");
export const createDevice = (data: { name: string; device: string }) => api.post<WhatsAppDevice>("/whatsapp/devices", data);
export const updateDevice = (id: number, data: { name?: string }) => api.put<WhatsAppDevice>(`/whatsapp/devices/${id}`, data);
export const deleteDevice = (id: number) => api.delete(`/whatsapp/devices/${id}`);
export const getDeviceQR = (id: number) => api.get(`/whatsapp/devices/${id}/qr`);
export const reconnectDevice = (id: number) => api.post(`/whatsapp/devices/${id}/reconnect`);
export const disconnectDevice = (id: number) => api.post(`/whatsapp/devices/${id}/disconnect`);
export const getDeviceStatus = (id: number) => api.get(`/whatsapp/devices/${id}/status`);

import { MessageTemplate } from "@/types";
export const getTemplates = () => api.get<MessageTemplate[]>("/whatsapp/templates");
export const sendBroadcast = (data: {
    lead_ids: number[];
    template_id?: number | "";
    custom_content?: string;
    device_id?: number | "";
    delay?: number;
}) => api.post("/whatsapp/broadcast", data);

export default api;

