import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialsDTO: UserCredentialsDTO): Promise<void> {
    const { username, password } = userCredentialsDTO;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
