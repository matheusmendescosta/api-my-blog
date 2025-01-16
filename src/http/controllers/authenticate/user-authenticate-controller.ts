import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserAuthenticateService } from '@/services/authenticate/user-authenticate-service';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const userAuthenticateController = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = bodySchema.parse(request.body);

    const userAuthenticateService = new UserAuthenticateService(new PrismaUserRepository());

    const user = await userAuthenticateService.execute({ email, password });

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.user.id,
      expiresIn: '1d',
    });

    return response.status(200).json({
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
      createdAt: user.user.createdAt,
      updatedAt: user.user.updatedAt,
      token,
    });
  } catch (error) {
    next(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default userAuthenticateController;
