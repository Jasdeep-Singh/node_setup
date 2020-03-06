/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Jasdeep Singh
 */

import User from '../collections/user';
import Message from '../utilities/messages';
import { encryptpassword, generateToken } from '../utilities/universal';

/********** Save users **********/
export const save = async payload => {
  if (await User.checkEmail(payload.email))
    throw new Error(Message.userEmailAlreadyExists);
  payload.password = encryptpassword(payload.password);
  return await User.saveUser({
    ...payload
  });
};

/********** Login users **********/
export const onLogin = async payload => {
  const userData = await User.findOneByCondition({
    email: payload.email,
    password: encryptpassword(payload.password)
  });
  if (!userData) throw new Error(Message.invalidCredentials);

  let loginToken = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await User.onLoginDone(userData._id, loginToken);
  return {
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    lastLogin: data.lastLogin
  };
};
