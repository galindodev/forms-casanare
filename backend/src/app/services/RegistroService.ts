import { injectable } from 'tsyringe';
import { CreateRegistroUseCase } from '../use-cases/CreateRegistroUseCase';
import { GetRegistrationsUseCase, RegistroWithReferrals } from '../use-cases/GetRegistrationsUseCase';
import { GetReferralStatsUseCase, ReferralStats } from '../use-cases/GetReferralStatsUseCase';
import { RegistroRepositoryImpl } from '../../infra/dynamodb/RegistroRepositoryImpl';
import { Registro } from '../../domain/entities/Registro';
import { CreateRegistroDTO } from '../dtos/CreateRegistroDTO';

@injectable()
export class RegistroService {
  constructor(
    private createRegistroUseCase: CreateRegistroUseCase,
    private getRegistrationsUseCase: GetRegistrationsUseCase,
    private getReferralStatsUseCase: GetReferralStatsUseCase,
    private repository: RegistroRepositoryImpl
  ) {}

  async getReferralStats(identificationNumber: string): Promise<ReferralStats | null> {
    return this.getReferralStatsUseCase.execute(identificationNumber);
  }

  async createRegistration(data: CreateRegistroDTO): Promise<string> {
    return this.createRegistroUseCase.execute(data);
  }

  async getRegistrations(): Promise<RegistroWithReferrals[]> {
    return this.getRegistrationsUseCase.execute();
  }

  async deleteAllRegistrations(): Promise<void> {
    return this.repository.deleteAll();
  }
}
