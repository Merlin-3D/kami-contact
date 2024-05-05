export type actionsType = "add" | "edit";

export interface User {
  id?: number;
  email: string;
  full_name: string;
  createdAt?: string;
}

export interface ContactRequest {
  firstName?: string;
  lastName?: string;
  city?: string;
  phone?: string;
}

export interface ContactResponse extends ContactRequest {
  id: number;
  createdAt: string;
}

export interface ContactUpdateRequest extends ContactRequest {
  id: number;
}

export interface CommandeRequest {
  date?: string;
  article?: string;
  qantity?: string;
  delivery?: string;
  prixAch?: string;
  prixDouane?: string;
  prixAchatTot?: string;
  prixTot?: string;
}

export interface CommandeResponse extends CommandeRequest {
  id: number;
  operations: Operation[];
  createdAt: string;
  updatedAt: string;
}

export interface CommandeUpdateRequest extends CommandeRequest {
  id: number;
}

export interface Operation {
  type: "in" | "out";
  initQte?: string;
  newQte: string;
}
