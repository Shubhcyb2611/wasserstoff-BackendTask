import { Renewal } from '@/domain/entities';
import { GenericRepository } from '@/infrastructure';

export class RenewalService {
    constructor(private renewalRepository: GenericRepository<Renewal>) {}

    async create(renewalData) {
        const renewal = await this.renewalRepository.create(renewalData);
        return renewal;
    }

    async getAll() {
        const renewals = await this.renewalRepository.findMany({});
        return renewals;
    }

    async getById(renewalId: number) {
        const renewal = await this.renewalRepository.findById(renewalId);
        return renewal;
    }
}
