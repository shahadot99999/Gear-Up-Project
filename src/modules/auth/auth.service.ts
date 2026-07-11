import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';  // correct relative path
import { IRegisterPayload, ILoginPayload } from './auth.interface'; // import from same folder

const prisma = new PrismaClient();

export const register = async (payload: IRegisterPayload) => {
  const { email, password, name, role } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds) || 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return user;
};

export const login = async (payload: ILoginPayload) => {
//   const { email, password } = payload;

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });
//   if (!user) {
//     throw new Error('Invalid credentials');
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error('Invalid credentials');
//   }

//   const token = jwt.sign(
//     { id: user.id, email: user.email, role: user.role },
//     config.jwt_access_secret!,
//     { expiresIn: config.jwt_access_expires_in }
//   );

//   const { password: _, ...userWithoutPassword } = user;
//   return { user: userWithoutPassword, token };
// };