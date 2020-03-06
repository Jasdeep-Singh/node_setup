/*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: Jasdeep Singh
 */

import { successAction, failAction } from '../utilities/response';
import { save, onLogin } from '../services/user';
import Message from '../utilities/messages';

/**************** Register User ***********/
export const register = async (req, res, next) => {
  const payload = req.body;
  try {
    await save(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Login User ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
