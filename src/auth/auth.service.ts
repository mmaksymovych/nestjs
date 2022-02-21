import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRespository } from 'src/tasks/tasks.repository';
import { UserCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(userCredentialsDTO: UserCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(userCredentialsDTO);
  }
}
