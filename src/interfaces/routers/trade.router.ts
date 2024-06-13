import { Bead, Trade, User } from '@/domain/entities';
import { getRepository } from '@/infrastructure/repositories';
import { Router } from 'express';
import { TradeController } from '../controllers';
import { TradeService } from '@/application/services/TradeService';

const router = Router();
const tradeRepository = getRepository(Trade);
const beadRepository = getRepository(Bead);
const userRepository = getRepository(User);
const tradeService = new TradeService(
    userRepository,
    beadRepository,
    tradeRepository
);
const tradeController = new TradeController(tradeService);

router.route('/').post(tradeController.createTrade);
router.route('/:id').get(tradeController.getTradeById);

export default router;
