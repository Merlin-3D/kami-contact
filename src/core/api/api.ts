import { del, get, patch, post } from "../api.interceptor";
import { LoginRequest } from "../entities/request.entities";
import {
  CommandeRequest,
  CommandeUpdateRequest,
  ContactRequest,
  ContactUpdateRequest,
  Operation,
} from "../entities/user";

export const loginUser = async (body: LoginRequest): Promise<Response> => {
  const res = await post("/user/login", body);
  return res;
};

//Contact
export const getAllDashboard = async (query?: string) => {
  const res = await get(`/dashboard/count`);
  return await res.json();
};

//Contact
export const createContact = async (
  body: ContactRequest
): Promise<Response> => {
  const res = await post("/contacts", body);
  return res;
};

export const updateContact = async (
  userId: number,
  body: ContactUpdateRequest
): Promise<Response> => {
  const res = await patch(`/contacts/${userId}`, body);
  return res;
};

export const getAllContacts = async (query?: string) => {
  const res = await get(`/contacts/${query}`);
  return await res.json();
};

export const deleteContact = async (userId: number): Promise<Response> => {
  const res = await del(`/contacts/${userId}`);
  return res;
};

//Commandes
export const createCommande = async (
  body: CommandeRequest
): Promise<Response> => {
  const res = await post("/commandes", body);
  return res;
};

export const updateCommande = async (
  userId: number,
  body: CommandeUpdateRequest
): Promise<Response> => {
  const res = await patch(`/commandes/${userId}`, body);
  return res;
};

export const getAllCommandes = async (query?: string) => {
  const res = await get(`/commandes/${query}`);
  return await res.json();
};

export const deleteCommande = async (userId: number): Promise<Response> => {
  const res = await del(`/commandes/${userId}`);
  return res;
};

export const updateOperation = async (
  commandeId: number,
  body: Operation
): Promise<Response> => {
  const res = await patch(`/commandes/${commandeId}/operation`, body);
  return res;
};
