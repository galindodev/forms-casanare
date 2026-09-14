export interface Registro {
  id?: number;
  fullName: string;
  countryCode: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
  email: string;
  address: string;
  ageGroup: string;
  department: string;
  municipality: string;
  gender: 'Male' | 'Female';
  acceptedTerms: boolean;
  referredById?: string;
  createdAt?: Date;
}
