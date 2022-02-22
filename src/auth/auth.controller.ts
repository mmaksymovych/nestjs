import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './dto/jwt-payload-interface.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userCredentialsDTO: UserCredentialsDTO): Promise<void> {
    return this.authService.signUp(userCredentialsDTO);
  }

  @Post('/signin')
  signIn(
    @Body() userCredentialsDTO: UserCredentialsDTO,
  ): Promise<{ accessToken }> {
    return this.authService.signIn(userCredentialsDTO);
  }
}
