import dotenv from 'dotenv';
dotenv.config();

export const validUser = {
  email: process.env.VALID_USER_EMAIL!,
  password: process.env.VALID_USER_PASSWORD!
};

export const invalidUser = { email: 'testing@gmail.com', password: 'wrongpass' };