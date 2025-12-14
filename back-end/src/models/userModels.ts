import knexInstance from "../utils/db";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  pseudo?: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  roles?: string[];
  created_at?: Date;
}

export const findUserByEmail = async (email: string) => {
  return knexInstance<User>("users").where({ email }).first();
};

export const findUserByUsername = async (username: string) => {
  return knexInstance<User>("users").where({ username }).first();
};

export const createUser = async (user: User) => {
  return knexInstance("users")
    .insert({
      username: user.username,
      email: user.email,
      password: user.password,
      pseudo: user.pseudo,
      first_name: user.firstName,
      last_name: user.lastName,
      roles: user.roles ?? [],
      admin: user.admin ?? false,
      created_at: new Date(),
    })
    .returning("*");
};

export const numberOfUsers = async () => {
  const result = await knexInstance<User>("users").count("* as count").first() as { count: string | number } | undefined;
  return result ? Number(result.count) : 0;
}
