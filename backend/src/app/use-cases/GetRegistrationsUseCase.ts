import { injectable } from 'tsyringe';
import { RegistroRepositoryImpl } from '../../infra/dynamodb/RegistroRepositoryImpl';
import { Registro } from '../../domain/entities/Registro';

@injectable()
export class GetRegistrationsUseCase {
  constructor(private repository: RegistroRepositoryImpl) {}

  async execute(): Promise<Registro[]> {
    return this.repository.findAll();
  }
}
