import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { seedUsers } from './user.seeder';
import { seedPosts } from './post.seeder';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Post],
  synchronize: true,
});

dataSource
  .initialize()
  .then(async () => {
    console.log('Seeding database...');
    await seedUsers(dataSource);
    await seedPosts(dataSource);
    await dataSource.destroy();
    console.log('Seeding complete');
  })
  .catch((err) => {
    console.error('Seeder error:', err);
  });
