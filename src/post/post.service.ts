import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCreateDto } from 'src/dto/post-create.dto';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  findAll() {
    return this.repo.find({
      relations: ['author'],
      select: { author: { id: true, username: true } },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['author'],
      select: { author: { id: true, username: true } },
    });
  }

  async create(data: PostCreateDto, userId: number) {
    const post = this.repo.create({ ...data, authorId: userId });
    return this.repo.save(post);
  }

  async update(id: number, data: PostCreateDto, userId: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: { id: true, username: true },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    if (post.author.id !== userId)
      throw new ForbiddenException('Not your post');
    Object.assign(post, data);
    return this.repo.save(post);
  }

  async remove(id: number, userId: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: { id: true, username: true },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    if (post.author.id !== userId)
      throw new ForbiddenException('Not your post');
    return this.repo.remove(post);
  }
}
