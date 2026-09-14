import { Registro } from '../entities/Registro';

export interface IRegistroRepository {
  save(registro: Registro): Promise<number>;
  findAll(): Promise<Registro[]>;
  deleteAll(): Promise<void>;
}
