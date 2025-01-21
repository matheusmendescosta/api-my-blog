import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface UserAuthenticateServiceRequest {
  email: string;
  password: string;
}

interface UserAuthenticateServiceResponse {
  user: User;
}

export class UserAuthenticateService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: UserAuthenticateServiceRequest): Promise<UserAuthenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new Error('Invalid credentials');
    }

    return { user };
  }
}
