import { BeadService } from '@/application/services';
import { Request, Response } from 'express';

export class BeadController {
    private beadService: BeadService;
    constructor(beadService: BeadService) {
        this.beadService = beadService;
    }

    bulkCreateBeads = async (req: Request, res: Response) => {
        const beads = await this.beadService.bulkCreateBead(
            req.body,
            req.body[0].batchId
        );
        return res.status(201).json(beads);
    };

    getBeadById = async (req: Request, res: Response) => {
        const bead = await this.beadService.getBeadById(Number(req.params.id));
        return res.status(200).json(bead);
    };

    getAllBeads = async (req: Request, res: Response) => {
        const beads = await this.beadService.getAllBeads(Number(req.user.id));
        return res.status(200).json(beads);
    };

    assignBeadToUser = async (req: Request, res: Response) => {
        const bead = await this.beadService.assignBeadToUser(
            req.user.id,
            req.body.beadId,
            req.body.passCode
        );
        return res.status(201).json(bead);
    };
}
