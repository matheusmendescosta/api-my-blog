import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticateMiddlewareRequest {
  sub: string;
}

export const AuthenticateMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ message: 'Malformed token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticateMiddlewareRequest;

    request.user = { id: decoded.sub };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: 'Expired token' });
    }

    return response.status(401).json({ message: 'Invalid or expired token' });
  }
};
