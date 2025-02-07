import { UserRepository } from '@/repositories/user-repository';
import { Role } from '@prisma/client';

interface UserPermissionServiceRequest {
  id: string;
  role: Role;
}

interface UserPermissionServiceResponse {
  name: string;
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class UserPermissionService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, role }: UserPermissionServiceRequest): Promise<UserPermissionServiceResponse> {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) throw new Error('User not found');

    const userNewPermission = await this.userRepository.updateUserPermission(id, {
      role,
    });

    if (!userNewPermission) throw new Error('Failed to update user permission');

    return userNewPermission;
  }
}
