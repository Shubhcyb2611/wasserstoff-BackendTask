import { User } from '@/domain/entities';
import { getRepository } from '@/infrastructure/repositories';
import { Router } from 'express';
import { UserController } from '../controllers';
import { JwtService, UserService } from '@/application/services';
import { UseRequestDto, UseResponseDto } from '../middleware';
import { CreateUserDTO, UserDTO } from '@/application/dtos';

const router = Router();
const userRepository = getRepository(User);
const jwtService = new JwtService();
const userService = new UserService(userRepository, jwtService);
const userController = new UserController(userService, jwtService);

router.route('/google').post(userController.getUserInfoByGoogle);
router.route('/login/google').post(userController.loginByGoogle);

router.route('/login').post(UseResponseDto(UserDTO), userController.loginUser);
router.route('/').post(userController.signupUser);
router.route('/refresh').post(userController.refreshAccessToken);
router
    .route('/:id')
    .get(userController.getUserDetails)
    .patch(userController.updateUserById)
    .delete(userController.deleteUserById);

export default router;
