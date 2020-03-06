/*
 * @file: survey.js
 * @description: It Contain function layer for survey service.
 * @author: Jasdeep Singh
 */

import Survey from '../collections/survey';
import SurveyQuestions from '../collections/survey_questions';
import UserSurvey from '../collections/user_survey';
import Message from '../utilities/messages';

/********** Create Survey **********/
export const create = async payload => {
  if (await Survey.findOneByCondition({ name: payload.name }))
    throw new Error(Message.surveyExist);
  return Survey.add(payload);
};

/********** Create Survey questions **********/
export const createQuestions = async payload => {
  if (
    await SurveyQuestions.findOneByCondition({ pageNumber: payload.pageNumber })
  )
    throw new Error(Message.surveyExist);
  return SurveyQuestions.add(payload);
};
/********** Get Survey questions **********/
export const getSurveyQuestions = async payload => {
  const data = await SurveyQuestions.findOneByCondition(payload)
    .select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      type: 0,
      name: 0,
      pageNumber: 0
    })
    .lean();
  delete payload.pageNumber;
  return {
    ...data,
    total: await SurveyQuestions.findByCondition(payload).count()
  };
};
/********** Save User Survey **********/
export const saveUserSurvey = async payload => {
  const survey = await UserSurvey.findOneByCondition({
    userId: payload.userId,
    surveyId: payload.surveyId,
    questionId: payload.questionId
  });
  if (survey) {
    return UserSurvey.updateSurvey({ ...payload, id: survey._id });
  } else {
    return UserSurvey.add(payload);
  }
};
/********** Get existing Survey **********/
export const getExistingSurvey = async ({ userId }) => {
  return await UserSurvey.existingSurvey({ userId });
};
