import { Logger } from '@/config';
import { User, UserType } from '@/domain/entities';
import { GenericRepository } from '@/infrastructure/repositories';

export class AdminService {
    constructor(private userRepository: GenericRepository<User>) {}
    async createAdmin(adminData: { email: string; password: string }) {
        const { email, password } = adminData;
        if (!(email && password)) throw new Error('400::Invalid credentials');
        const adminExists = await this.userRepository.findOne({
            _userType: UserType.Admin,
        });
        if (adminExists) return Logger.info(`‍💼: Admin email is ${email}`);
        await this.userRepository.create({
            email: email,
            password: password,
            _userType: UserType.Admin,
        });
        return Logger.info(`‍💼: Admin email is ${email}`);
    }
}
