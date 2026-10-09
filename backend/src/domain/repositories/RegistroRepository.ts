import { Registro } from '../entities/Registro';

export interface IRegistroRepository {
  save(registro: Registro): Promise<string>;
  findAll(): Promise<Registro[]>;
  findByIdentificationNumber(identificationNumber: string): Promise<Registro | null>;
  findByEmail(email: string): Promise<Registro | null>;
  deleteAll(): Promise<void>;
}
