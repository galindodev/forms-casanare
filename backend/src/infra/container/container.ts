import 'reflect-metadata';
import { container } from 'tsyringe';
import { RegistroRepositoryImpl } from '../dynamodb/RegistroRepositoryImpl';
import { RegistroService } from '../../app/services/RegistroService';
import { RegistroController } from '../../app/controllers/RegistroController';
import { CreateRegistroUseCase } from '../../app/use-cases/CreateRegistroUseCase';
import { GetRegistrationsUseCase } from '../../app/use-cases/GetRegistrationsUseCase';

export function setupContainer(): void {
  container.registerSingleton(RegistroRepositoryImpl);
  container.registerSingleton(CreateRegistroUseCase);
  container.registerSingleton(GetRegistrationsUseCase);
  container.registerSingleton(RegistroService);
  container.registerSingleton(RegistroController);
}

export { container };
