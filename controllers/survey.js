/*
 * @file: survey.js
 * @description: It Contain function layer for survey controller.
 * @author: Jasdeep Singh
 */

import { successAction, failAction } from '../utilities/response';
import {
  create,
  createQuestions,
  getSurveyQuestions,
  saveUserSurvey,
  getExistingSurvey
} from '../services/survey';
import Message from '../utilities/messages';

/**************** Add Survey ***********/
export const add = async (req, res, next) => {
  const payload = req.body;
  try {
    await create(payload);
    res.status(200).json(successAction(null, Message.serveyAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Add Survey question ***********/
export const addQuestions = async (req, res, next) => {
  const payload = req.body;
  try {
    await createQuestions(payload);
    res.status(200).json(successAction(null, Message.serveyAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Get Survey ***********/
export const getQuestions = async (req, res, next) => {
  const payload = req.query;
  try {
    const data = await getSurveyQuestions(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Get Survey ***********/
export const saveSurvey = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await saveUserSurvey(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
/**************** Get Survey ***********/
export const getExisting = async (req, res, next) => {
  const payload = req.query;
  try {
    const data = await getExistingSurvey(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
