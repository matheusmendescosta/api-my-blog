import { UserRepository } from '@/repositories/user-repository';
import { Role } from '@prisma/client';
import { UserNotFound } from '../errors/user-not-found';
import { FailUpdatePermission } from '../errors/fail-update-permission';

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

    if (!findUser) throw new UserNotFound();

    if (findUser.role !== Role.ADMIN) throw new FailUpdatePermission();

    const userNewPermission = await this.userRepository.updateUserPermission(id, {
      role,
    });

    if (!userNewPermission) throw new FailUpdatePermission();

    return userNewPermission;
  }
}
