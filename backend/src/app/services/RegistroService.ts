import { IRegistroRepository } from '../../domain/repositories/RegistroRepository';
import { Registro } from '../../domain/entities/Registro';

export class RegistroService {
  constructor(private repository: IRegistroRepository) {}

  async crearRegistro(data: Registro): Promise<number> {
    this.validarRegistro(data);
    return this.repository.save(data);
  }

  async obtenerRegistros(): Promise<Registro[]> {
    return this.repository.findAll();
  }

  private validarRegistro(data: Registro): void {
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
