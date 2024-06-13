import { RenewalService } from '@/application/services';
import { Renewal } from '@/domain/entities';
import { getRepository } from '@/infrastructure';
import { Router } from 'express';
import { RenewalController } from '../controllers';

const router = Router();

const renewalRepository = getRepository(Renewal);
const renewalService = new RenewalService(renewalRepository);
const renewalController = new RenewalController(renewalService);

router
    .route('/')
    .post(renewalController.createRenewal)
    .get(renewalController.getAllRenewals);

router.route('/:id').get(renewalController.getRenewalById);

export default router;
