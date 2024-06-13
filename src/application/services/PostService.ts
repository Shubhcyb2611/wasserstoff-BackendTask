import { Bead, Post } from '@/domain/entities';
import { Location } from '@/domain/entities/Location';
import { GenericRepository } from '@/infrastructure';

export class PostService {
    constructor(
        private beadRepository: GenericRepository<Bead>,
        private postRepository: GenericRepository<Post>,
        private locationRepository: GenericRepository<Location>
    ) {}
    async createPost(userId: number, beadId: number, postData) {
        const bead = await this.beadRepository.findById(beadId);
        if (!bead) throw new Error('404::Bead not found');
        const location = await this.locationRepository.create({
            latitude: postData.latitude,
            longitude: postData.longitude,
        });
        const post = await this.postRepository.create({
            ...postData,
            bead: beadId,
            userId: userId,
            location: location,
        });
        return post;
    }

    async getPostById(beadId: number, postId: number) {
        const post = await this.postRepository.findById(postId);
        return post;
    }

    async getAllPosts() {
        const posts = await this.postRepository.findMany({});
        return posts;
    }

    async getAllPostsOfUser(userId: number) {
        const posts = await this.postRepository.findMany({ userId: userId });
        return posts;
    }

    async updatePost(beadId: number, postId: number, postData) {
        const post = await this.postRepository.findByIdAndUpdate(
            postId,
            postData
        );
        return post;
    }

    async deletePost(beadId: number, postId: number) {
        await this.postRepository.findByIdAndDelete(postId);
    }
}
