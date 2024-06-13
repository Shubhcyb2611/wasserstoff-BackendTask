import { AdminService } from '@/application/services';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/config';
import { User } from '@/domain/entities';
import { getRepository } from '@/infrastructure/repositories/repository-factory';

export async function createAdminUser() {
    const userRepository = getRepository(User);
    const adminService = new AdminService(userRepository);
    const adminResponse = await adminService.createAdmin({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
    });
    return adminResponse;
}
