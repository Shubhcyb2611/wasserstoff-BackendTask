import { User } from '@/domain/entities';
import { GenericRepository } from '@/infrastructure/repositories';
import bcrypt from 'bcryptjs';
import { JwtService } from './JwtService';

export class UserService {
    constructor(
        private userRepository: GenericRepository<User>,
        private jwtService: JwtService
    ) {}

    async signUp(userData: { email: string; password: string }) {
        const userExists = await this.userRepository.findOne({
            email: userData.email,
        });
        if (userExists) throw new Error('404::User already exists');
        const user = await this.userRepository.create(userData);
        return user;
    }

    async login(loginCredentials: { email: string; password: string }) {
        const { email, password } = loginCredentials;
        const user = await this.userRepository.findOne({ email });
        if (!user) throw new Error('404::User not found');
        if (password && !(await bcrypt.compare(password, user.password)))
            throw new Error('400::Invalid credentials');
        const accessToken = this.jwtService.createAccessToken(user.id);
        const refreshToken = this.jwtService.createRefreshToken(user.id);
        const response = { ...user, accessToken, refreshToken };
        return response;
    }

    async getUserById(userId: number) {
        const user = await this.userRepository.findById(userId, ['projects']);
        return user;
    }

    async updateUser(userId: number, userData) {
        const user = await this.userRepository.findByIdAndUpdate(
            userId,
            userData
        );
        return user;
    }

    async deleteUser(userId: number) {
        const user = await this.userRepository.findByIdAndDelete(userId);
        return user;
    }
    exchangeRefreshTokenForAccessToken(refreshToken: string) {
        const accessToken =
            this.jwtService.exchangeRefreshTokenForAccess(refreshToken);
        return accessToken;
    }

    async loginByGoogle(userData) {
        const { email, password } = userData;
        const existingUser = await this.userRepository.findOne({
            email: userData.email,
        });
        if (existingUser) {
            const user = await this.login({ email, password });
            return user;
        } else {
            await this.signUp({ email, password });
            const user = await this.login({ email, password });
            return user;
        }
    }
}
