/*
 * @file: get.js
 * @description: It Contain get questions router/api.
 * @author: Jasdeep Singh
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getQuestions } from '../../../controllers/survey';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/survey/questions:
 *  get:
 *   tags: ["survey"]
 *   summary: survey get questions api
 *   description: api used to get survey questions
 *   parameters:
 *      - in: query
 *        name: surveyId
 *        required: true
 *        description: survey Id
 *      - in: query
 *        name: type
 *        required: true
 *        description: it should be 1 for internal and 2 for external
 *      - in: query
 *        name: pageNumber
 *        description: survey page number
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const surveySchema = Joi.object({
  surveyId: Joi.string()
    .required()
    .trim()
    .label('Survey Id'),
  type: Joi.string()
    .required()
    .valid('1', '2')
    .label('Survey Type'),
  pageNumber: Joi.number()
    .optional()
    .label('Page Number')
});

app.get(
  '/survey/questions',
  validator.query(surveySchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  getQuestions
);

export default app;
