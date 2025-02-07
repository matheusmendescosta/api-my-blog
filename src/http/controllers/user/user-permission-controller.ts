import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
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
    console.log(error);

    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default UserPermissionController;
