import { sendWelcomeEmail } from '@/lib/nodemailer';
import { UserRepository } from '@/repositories/user-repository';
import { Role, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { EmailAlreadyExists } from '../errors/email-already-exists';

interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) throw new EmailAlreadyExists();

    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      role: Role.READER,
    });

    await sendWelcomeEmail(user.name, user.email);

    return { user };
  }
}
