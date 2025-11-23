import knexInstance from "../utils/db";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  admin?: boolean;
  roles?: string[];
  created_at?: Date;
}

export const findUserByEmail = async (email: string) => {
  return knexInstance<User>("users").where({ email }).first();
};

export const createUser = async (user: User) => {
  return knexInstance<User>("users").insert(user).returning("*");
};
