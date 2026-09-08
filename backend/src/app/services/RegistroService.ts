import { IRegistroRepository } from '../../domain/repositories/RegistroRepository';
import { Registro } from '../../domain/entities/Registro';

export class RegistroService {
  constructor(private repository: IRegistroRepository) {}

  async createRegistration(data: Registro): Promise<number> {
    this.validateRegistration(data);
    try {
      return await this.repository.save(data);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('email')) {
          throw new Error('Email already registered');
        }
        if (error.message.includes('phone')) {
          throw new Error('Phone already registered');
        }
        if (error.message.includes('identificationNumber')) {
          throw new Error('Identification number already registered');
        }
      }
      throw error;
    }
  }

  async getRegistrations(): Promise<Registro[]> {
    return this.repository.findAll();
  }

  private validateRegistration(data: Registro): void {
    if (!data.fullName || data.fullName.trim().length === 0) {
      throw new Error('Full name required');
    }
    if (!data.phone || data.phone.trim().length === 0) {
      throw new Error('Phone required');
    }
    if (!data.email || data.email.trim().length === 0) {
      throw new Error('Email required');
    }
    if (!data.identificationNumber || data.identificationNumber.trim().length === 0) {
      throw new Error('Identification number required');
    }
    if (!data.municipality || data.municipality.trim().length === 0) {
      throw new Error('Municipality required');
    }
    if (!data.acceptedTerms) {
      throw new Error('Must accept terms and conditions');
    }
  }
}
