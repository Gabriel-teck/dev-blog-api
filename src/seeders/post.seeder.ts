import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';

export async function seedPosts(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);
  const username = 'seeder-admin';

  const user = await userRepo.findOneBy({ username });
  if (!user) {
    console.log('Seeder user not found. Skipping posts seeding...');
    return;
  }

  const dummyPosts = [
    postRepo.create({
      title: 'Dummy post-1',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -1',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-2',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -2',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-3',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -3',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-4',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -4',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-5',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -5',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-6',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -6',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-7',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -7',
      authorId: user.id,
    }),
    postRepo.create({
      title: 'Dummy post-8',
      content:
        'Dummy post content for the dev-blog application to help you understand the functionality -8',
      authorId: user.id,
    }),
  ];

  await postRepo.save(dummyPosts);
  console.log('Posts have been seeded.');
}
