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
    if (!data.nombresCompletos || data.nombresCompletos.trim().length === 0) {
      throw new Error('Nombres completos requeridos');
    }
    if (!data.celular || data.celular.trim().length === 0) {
      throw new Error('Celular requerido');
    }
    if (!data.correoElectronico || data.correoElectronico.trim().length === 0) {
      throw new Error('Correo electrónico requerido');
    }
    if (!data.numeroIdentificacion || data.numeroIdentificacion.trim().length === 0) {
      throw new Error('Número de identificación requerido');
    }
    if (!data.municipio || data.municipio.trim().length === 0) {
      throw new Error('Municipio requerido');
    }
    if (!data.aceptoTerminos) {
      throw new Error('Debe aceptar términos y condiciones');
    }
  }
}
