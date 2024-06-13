import { BeadService, PostService } from '@/application/services';
import { BeadController, PostController } from '../controllers';
import { Bead, Post, Location } from '@/domain/entities';
import { getRepository } from '@/infrastructure';
import { Router } from 'express';
import { UseRequestDto, UseResponseDto, ValidateArray } from '../middleware';
import {
    BeadDTO,
    CreateBeadDTO,
    CreatePostDTO,
    PostDTO,
} from '@/application/dtos';

const beadRepository = getRepository(Bead);
const locationRepository = getRepository(Location);
const beadService = new BeadService(beadRepository);
const beadController = new BeadController(beadService);

const postRepository = getRepository(Post);
const postService = new PostService(
    beadRepository,
    postRepository,
    locationRepository
);
const postController = new PostController(postService, beadService);

const router = Router();

router
    .route('/')
    .post(UseResponseDto(BeadDTO), beadController.bulkCreateBeads)
    .get(UseResponseDto(BeadDTO), beadController.getAllBeads);
router.route('/:id').get(UseResponseDto(BeadDTO), beadController.getBeadById);
router
    .route('/assign')
    .post(UseResponseDto(BeadDTO), beadController.assignBeadToUser);

router
    .route('/:id/posts')
    .post(
        UseRequestDto(CreatePostDTO),
        UseResponseDto(PostDTO),
        postController.createPost
    )
    .get(UseResponseDto(PostDTO), postController.getAllPosts);
router
    .route('/:id/posts/:postId')
    .get(UseResponseDto(PostDTO), postController.getPostById)
    .patch(UseResponseDto(PostDTO), postController.updatePostById)
    .delete(UseResponseDto(PostDTO), postController.deletePostById);

export default router;
