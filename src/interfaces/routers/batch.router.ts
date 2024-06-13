import { Batch } from '@/domain/entities';
import { getRepository } from '@/infrastructure/repositories';
import { Router } from 'express';
import { BatchController } from '../controllers';
import { BatchService } from '@/application/services/BatchService';

const router = Router();
const batchRepository = getRepository(Batch);

const batchService = new BatchService(batchRepository);
const batchController = new BatchController(batchService);

router
    .route('/')
    .post(batchController.createBatch)
    .get(batchController.getAllBatches);
router.route('/:id').get(batchController.getBatchById);

export default router;
