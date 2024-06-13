import { TradeService } from '@/application/services';
import { Request, Response } from 'express';

export class TradeController {
    private tradeService: TradeService;
    constructor(tradeService: TradeService) {
        this.tradeService = tradeService;
    }
    createTrade = async (req: Request, res: Response) => {
        const trade = await this.tradeService.createTrade(req.body);
        return res.status(200).json(trade);
    };

    getTradeById = async (req: Request, res: Response) => {
        const trade = await this.tradeService.getTrade(Number(req.params.id));
        return res.status(200).json(trade);
    };
}
