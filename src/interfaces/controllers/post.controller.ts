import { BeadService, PostService, UserService } from '@/application/services';
import { Request, Response } from 'express';

export class PostController {
    private postService: PostService;
    private beadService: BeadService;
    constructor(postService: PostService, beadService: BeadService) {
        this.postService = postService;
        this.beadService = beadService;
    }
    createPost = async (req: Request, res: Response) => {
        const post = await this.postService.createPost(
            Number(req.user.id),
            Number(req.params.id),
            req.body
        );
        return res.status(201).json(post);
    };

    getAllPosts = async (req: Request, res: Response) => {
        const post = await this.postService.getAllPosts();
        return res.status(200).json(post);
    };

    getPostById = async (req: Request, res: Response) => {
        const post = await this.postService.getPostById(
            Number(req.params.id),
            Number(req.params.postId)
        );
        return res.status(200).json(post);
    };

    updatePostById = async (req: Request, res: Response) => {
        const post = await this.postService.updatePost(
            Number(req.params.id),
            Number(req.params.postId),
            req.body
        );
        return res.status(202).json(post);
    };

    deletePostById = async (req: Request, res: Response) => {
        const post = await this.postService.deletePost(
            Number(req.params.id),
            Number(req.params.postId)
        );
        return res.status(204).end();
    };
}
