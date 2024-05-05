import { del, get, patch, post } from "../api.interceptor";
import { LoginRequest } from "../entities/request.entities";
import {
  CommandeRequest,
  CommandeUpdateRequest,
  ContactRequest,
  ContactUpdateRequest,
  Operation,
} from "../entities/user";

export const loginUser = async (body: LoginRequest) => {
  const res = await post("/user/login", body);
  return await res.json();
};

//Contact
export const getAllDashboard = async (query?: string) => {
  const res = await get(`/dashboard/count`);
  return await res.json();
};

//Contact
export const createContact = async (body: ContactRequest) => {
  const res = await post("/contacts", body);
  return await res.json();
};

export const updateContact = async (
  userId: number,
  body: ContactUpdateRequest
) => {
  const res = await patch(`/contacts/${userId}`, body);
  return await res.json();
};

export const getAllContacts = async (query?: string) => {
  const res = await get(`/contacts/${query}`);
  return await res.json();
};

export const deleteContact = async (userId: number) => {
  const res = await del(`/contacts/${userId}`);
  return await res.json();
};

//Commandes
export const createCommande = async (body: CommandeRequest) => {
  const res = await post("/commandes", body);
  return await res.json();
};

export const updateCommande = async (
  userId: number,
  body: CommandeUpdateRequest
) => {
  const res = await patch(`/commandes/${userId}`, body);
  return await res.json();
};

export const getAllCommandes = async (query?: string) => {
  const res = await get(`/commandes/${query}`);
  return await res.json();
};

export const deleteCommande = async (userId: number) => {
  const res = await del(`/commandes/${userId}`);
  return await res.json();
};

export const updateOperation = async (commandeId: number, body: Operation) => {
  const res = await patch(`/commandes/${commandeId}/operation`, body);
  return await res.json();
};
