import { IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class PostUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(20)
  @IsNotEmpty()
  @IsOptional()
  content: string;
}
