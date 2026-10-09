export interface Registro {
  id?: string;
  fullName: string;
  countryCode: string;
  phone: string;
  identificationNumber: string;
  email: string;
  address: string;
  neighborhood: string;
  ageGroup: string;
  department: string;
  municipality: string;
  gender: 'Male' | 'Female';
  populationType: string;
  ethnicFocus: string;
  acceptedTerms: boolean;
  referredById?: string;
  createdAt?: Date;
}
