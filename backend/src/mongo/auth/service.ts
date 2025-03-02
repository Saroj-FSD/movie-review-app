import { UserModel } from "./model";

type TCreateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function createUser(input: TCreateUserInput) {
  const user = new UserModel({
    username: input.username,
    password: input.password,
    email: input.email,
  });
  await user.save();
}

type TUpdateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await UserModel.findById(toUpdateUserId);

  if (!user) {
    throw new Error("User not found");
  }

  await UserModel.replaceOne(
    { _id: toUpdateUserId },
    {
      username: input.username,
      email: input.email,
      password: input.password,
    }
  );
}



async function getUserByEmail(input: { email: string }) {
  const user = await UserModel.findOne({
    email: input.email,
  });
  return user;
}


export const userMongoService = {
  createUser,
  updateUser,
  getUserByEmail,
};
