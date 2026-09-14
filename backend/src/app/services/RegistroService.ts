import { injectable } from 'tsyringe';
import { CreateRegistroUseCase } from '../use-cases/CreateRegistroUseCase';
import { GetRegistrationsUseCase } from '../use-cases/GetRegistrationsUseCase';
import { RegistroRepositoryImpl } from '../../infra/dynamodb/RegistroRepositoryImpl';
import { Registro } from '../../domain/entities/Registro';
import { CreateRegistroDTO } from '../dtos/CreateRegistroDTO';

@injectable()
export class RegistroService {
  constructor(
    private createRegistroUseCase: CreateRegistroUseCase,
    private getRegistrationsUseCase: GetRegistrationsUseCase,
    private repository: RegistroRepositoryImpl
  ) {}

  async createRegistration(data: CreateRegistroDTO): Promise<number> {
    return this.createRegistroUseCase.execute(data);
  }

  async getRegistrations(): Promise<Registro[]> {
    return this.getRegistrationsUseCase.execute();
  }

  async deleteAllRegistrations(): Promise<void> {
    return this.repository.deleteAll();
  }
}
