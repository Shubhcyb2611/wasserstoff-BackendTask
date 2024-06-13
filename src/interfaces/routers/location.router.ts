import { Location } from '@/domain/entities';
import { getRepository } from '@/infrastructure/repositories';
import { Router } from 'express';
import { LocationService } from '@/application/services';
import { LocationController } from '../controllers';

const router = Router();
const locationRepository = getRepository(Location);
const locationService = new LocationService(locationRepository);
const locationController = new LocationController(locationService);

router.route('/').get(locationController.getCoordinatesFromSearch);
router.route('/address').get(locationController.getDetailAddressFromCoords);

export default router;
