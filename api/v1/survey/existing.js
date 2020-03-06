/*
 * @file: existing.js
 * @description: It Contain get existing response router/api.
 * @author: Jasdeep Singh
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { getExisting } from '../../../controllers/survey';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/survey/existing:
 *  get:
 *   tags: ["survey"]
 *   summary: survey get existing survey api
 *   description: api used to get existing survey
 *   parameters:
 *      - in: query
 *        name: userId
 *        required: true
 *        description: user Id
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
    .label('User Id')
});

app.get(
  '/survey/existing',
  validator.query(surveySchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  getExisting
);

export default app;
