/*
 * @file: save.js
 * @description: It Contain save user survey router/api.
 * @author: Jasdeep Singh
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { saveSurvey } from '../../../controllers/survey';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/survey/save:
 *  post:
 *   tags: ["survey"]
 *   summary: save user survey questions/answers api
 *   description: api used save user survey questions/answers
 *   parameters:
 *      - in: body
 *        name: survey
 *        description: save user survey questions/answers
 *        schema:
 *         type: object
 *         required:
 *          - save survey questions/answers
 *         properties:
 *           userId:
 *             type: string
 *             required:
 *           surveyId:
 *             type: string
 *             required:
 *           questionId:
 *             type: string
 *             required:
 *           elements:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *               _id:
 *                type: string
 *                required: true
 *               value:
 *                type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const surveySchema = Joi.object({
  userId: Joi.string()
    .required()
    .trim()
    .label('User Id'),
  surveyId: Joi.string()
    .required()
    .trim()
    .label('Survey Id'),
  questionId: Joi.string()
    .required()
    .trim()
    .label('Question Id'),
  elements: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string()
          .required()
          .trim()
          .label('Element Id'),
        value: Joi.string()
          .optional()
          .allow('')
          .label('Value')
      })
    )
    .required()
    .label('Survey elements')
});

app.post(
  '/survey/save',
  validator.body(surveySchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  saveSurvey
);

export default app;
