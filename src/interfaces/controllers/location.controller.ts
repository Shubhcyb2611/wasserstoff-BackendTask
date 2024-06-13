import { LocationService } from '@/application/services';
import { Request, Response } from 'express';

export class LocationController {
    private locationService: LocationService;
    constructor(locationService: LocationService) {
        this.locationService = locationService;
    }

    getCoordinatesFromSearch = async (req: Request, res: Response) => {
        const result = await this.locationService.getCoordinatesFromSearch(
            req.query.search
        );
        return res.status(200).json(result);
    };

    getDetailAddressFromCoords = async (req: Request, res: Response) => {
        const result = await this.locationService.getDetailAddressFromCoords(
            req.body.lat,
            req.body.lng
        );
        return res.status(200).json(result);
    };
}
