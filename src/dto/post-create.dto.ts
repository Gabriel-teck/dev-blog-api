import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class PostCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(20)
  @IsNotEmpty()
  content: string;
}
