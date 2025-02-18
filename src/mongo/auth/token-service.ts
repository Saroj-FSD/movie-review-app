import { TokenModel } from "./model";

type TCreateTokenInput = {
  userId: string;
  token: string;
};

// create token
async function createToken(input: TCreateTokenInput) {
  const token = new TokenModel({
    userId: input.userId,
    token: input.token,
  });
  await token.save();
}

// delete
type TDeleteTokenInput = {
  token: string;
  userId: string;
};
async function deleteToken(input: TDeleteTokenInput) {
  await TokenModel.deleteOne({
    userId: input.userId,
    token: input.token,
  });
}

// get
async function getToken(input: { token: string }) {
  const token = await TokenModel.findOne({
    token: input.token,
  });
  return token;
}

export const TokenService = {
  createToken,
  deleteToken,
  getToken,
};
