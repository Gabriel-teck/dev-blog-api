import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const username = 'seeder-admin';
  const password = 'admin1234';

  const existinguser = await userRepo.findOneBy({ username });
  if (!existinguser) {
    const hash = (await bcrypt.hash(password, 10)) as string;
    const user = userRepo.create({ username, password: hash });

    await userRepo.save(user);
    console.log('Seeder user created');
  } else {
    console.log('Seeder user already exist');
  }
}
