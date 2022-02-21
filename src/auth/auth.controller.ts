import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createTask(@Body() userCredentialsDTO: UserCredentialsDTO): Promise<void> {
    return this.authService.signUp(userCredentialsDTO);
  }
}
