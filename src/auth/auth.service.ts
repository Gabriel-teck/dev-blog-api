import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.repo.findOneBy({ username });

    if (existingUser) {
      throw new BadRequestException('Username already taken');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ username, password: hashed });
    const createdUser = await this.repo.save(user);
    const payload = { sub: createdUser.id, username: createdUser.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: createdUser.id, username: createdUser.username },
    };
  }

  async login(username: string, password: string) {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    const signedToken = this.jwtService.sign(payload);

    return {
      access_token: signedToken,
      user: { id: payload.sub, username: payload.username },
    };
  }
}
