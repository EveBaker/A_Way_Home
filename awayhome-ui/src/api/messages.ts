// src/api/messages.ts
import 'dotenv/config';
import api from '../config/axiosConfig';

export const addMessage = async (messageData) => {
  const response = await api.post(`/api/messages`, messageData);
  return response.data;
};

export const getMessages = async () => {
  const response = await api.get(`/api/messages`);
  return response.data;
};

export const getMessage = async (id) => {
  const response = await api.get(`/api/messages/${id}`);
  return response.data;
};

export const updateMessage = async (id, messageData) => {
  const response = await api.put(`/api/messages/${id}`, messageData);
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/api/messages/${id}`);
  return response.data;
};
