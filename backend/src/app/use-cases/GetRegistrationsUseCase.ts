import { injectable } from 'tsyringe';
import { RegistroRepositoryImpl } from '../../infra/dynamodb/RegistroRepositoryImpl';
import { Registro } from '../../domain/entities/Registro';

export type RegistroWithReferrals = Registro & { referralCount: number };

@injectable()
export class GetRegistrationsUseCase {
  constructor(private repository: RegistroRepositoryImpl) {}

  async execute(): Promise<RegistroWithReferrals[]> {
    const registrations = await this.repository.findAll();

    // Count referrals per person. A referrer may be stored by uuid (dropdown)
    // or by the short numeric id used in the referral link/QR, so count both.
    const counts = new Map<string, number>();
    for (const reg of registrations) {
      if (reg.referredById == null) continue;
      const key = String(reg.referredById);
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    return registrations.map((reg) => {
      const uuid = String(reg.id);
      const numericId = String(parseInt(uuid.split('-')[0], 16));
      const referralCount = (counts.get(uuid) || 0) + (counts.get(numericId) || 0);
      return { ...reg, referralCount };
    });
  }
}
