import { BatchService } from '@/application/services';
import { Request, Response } from 'express';

export class BatchController {
    private batchService: BatchService;
    constructor(batchService: BatchService) {
        this.batchService = batchService;
    }
    createBatch = async (req: Request, res: Response) => {
        const batch = await this.batchService.createBatch(
            Number(req.user.id),
            req.body
        );
        return res.status(201).json(batch);
    };

    getAllBatches = async (req: Request, res: Response) => {
        const batches = await this.batchService.getAllBatches();
        return res.status(200).json(batches);
    };

    getBatchById = async (req: Request, res: Response) => {
        const batch = await this.batchService.getBatchById(
            Number(req.params.id)
        );
        return res.status(200).json(batch);
    };
}
