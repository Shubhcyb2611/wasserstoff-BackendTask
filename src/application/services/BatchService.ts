import { Batch } from '@/domain/entities';
import { GenericRepository } from '@/infrastructure';

export class BatchService {
    constructor(private batchRepository: GenericRepository<Batch>) {}
    async createBatch(originId, batchData) {
        const batch = await this.batchRepository.create({
            originId: originId,
            ...batchData,
        });
        return batch;
    }

    async getBatchById(batchId: number) {
        const batch = await this.batchRepository.findById(batchId, ['beads']);
        return batch;
    }

    async getAllBatches() {
        const batches = await this.batchRepository.findMany({});
        return batches;
    }
}
