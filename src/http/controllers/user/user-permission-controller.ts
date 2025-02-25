import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { FailUpdatePermission } from '@/services/errors/fail-update-permission';
import { UserNotFound } from '@/services/errors/user-not-found';
import { UserPermissionService } from '@/services/user/user-permission-service';
import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

const routeSchema = z.object({
  id: z.string(),
});

const bodySchema = z.object({
  role: z.nativeEnum(Role),
});

const UserPermissionController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const body = bodySchema.parse(request.body);
    const userPermissionService = new UserPermissionService(new PrismaUserRepository());

    const user = await userPermissionService.execute({ id: params.id, role: body.role });

    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof FailUpdatePermission) {
      return response.status(400).json({ message: error.message });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default UserPermissionController;
