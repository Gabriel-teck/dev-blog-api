import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthCredentialsDto) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: AuthCredentialsDto) {
    return this.authService.login(body.username, body.password);
  }
}
