import { uplaodVideo, uploadImage } from '@/application/services';
import { Router } from 'express';
import { UploadsController } from '../controllers';

const router = Router();

const uploadController = new UploadsController();

router
    .route('/images')
    .post(uploadImage.single('image'), uploadController.handleNewImageUpload);
router
    .route('/videos')
    .post(uplaodVideo.single('video'), uploadController.handleNewVideoUpload);

export default router;
