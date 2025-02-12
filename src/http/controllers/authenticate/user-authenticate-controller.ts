import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserAuthenticateService } from '@/services/authenticate/user-authenticate-service';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  captchaToken: z.string(),
});

const verifyTurnstile = async (captchaToken: string): Promise<boolean> => {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET as string,
        response: captchaToken,
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
};

const userAuthenticateController = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password, captchaToken } = bodySchema.parse(request.body);
    const isHuman = await verifyTurnstile(captchaToken);
    if (!isHuman) {
      return response.status(403).json({ message: 'Failed Turnstile verification' });
    }

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
