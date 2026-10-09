import { injectable } from 'tsyringe';
import { RegistroRepositoryImpl } from '../../infra/dynamodb/RegistroRepositoryImpl';

export interface ReferralStats {
  id: string;
  fullName: string;
  referrals: number;
}

@injectable()
export class GetReferralStatsUseCase {
  constructor(private repository: RegistroRepositoryImpl) {}

  async execute(identificationNumber: string): Promise<ReferralStats | null> {
    const registrations = await this.repository.findAll();

    const person = registrations.find(
      (r) => String(r.identificationNumber) === String(identificationNumber)
    );

    if (!person) {
      return null;
    }

    // A referrer can be stored either by uuid (dropdown selection) or by the
    // short numeric id used in the referral link/QR. Match both.
    const uuid = String(person.id);
    const numericId = String(parseInt(uuid.split('-')[0], 16));
    const referrerIds = new Set([uuid, numericId]);

    const referrals = registrations.filter(
      (r) => r.referredById != null && referrerIds.has(String(r.referredById))
    ).length;

    return { id: uuid, fullName: person.fullName, referrals };
  }
}
