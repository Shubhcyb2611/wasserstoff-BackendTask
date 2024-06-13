import { RenewalService } from '@/application/services';
import { Request, Response } from 'express';

export class RenewalController {
    private renewalService: RenewalService;
    constructor(renewalService: RenewalService) {
        this.renewalService = renewalService;
    }

    createRenewal = async (req: Request, res: Response) => {
        const renewal = await this.renewalService.create(req.body);
        return res.status(201).json(renewal);
    };

    getAllRenewals = async (req: Request, res: Response) => {
        const renewals = await this.renewalService.getAll();
        return res.status(200).json(renewals);
    };

    getRenewalById = async (req: Request, res: Response) => {
        const renewal = await this.renewalService.getById(
            Number(req.params.id)
        );
        return res.status(200).json(renewal);
    };
}
