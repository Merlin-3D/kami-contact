export interface LoginRequest {
  email: string;
  password: string;
}

export interface AssignRequest {
  categoryId?: string;
  guestName?: string;
  tableId?: string;
  wendingId?: string;
  place?: number;
  guests?: any[];
}

export interface RequestResponse {
  id: number;
  code: string;
  status: string;
  fullName: string;
  civility: string;
  phoneNumber: string;
  whatsappContact: string;
  email: string;
  typeUser: string;
  regionOfBirth: string;
  court: string;
  location: string;
  residence: string;
  address: string;
  user_close_friend_number: string;
  criminalRecordNumber: number;
  user_postal_code: string;
  birthCertificateUrl: string;
  passportVisaPageUrl: string;
  passportUrl: string;
  proofStayCameroonUrl: string;
  cniFrontUrl: string;
  cniBackUrl: string;
  weddingCertificateUrl: string;
  created_on: string;
  destination_address: string;
  destination_location: string;
}
export interface RequestPaginate {
  results: RequestResponse[];
  count: number;
  // pageSize: number;
  // totalResults: number;
  // totalPages: number;
}
