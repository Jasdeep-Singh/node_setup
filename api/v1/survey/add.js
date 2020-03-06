/*
 * @file: add.js
 * @description: It Contain add router/api.
 * @author: Jasdeep Singh
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { add } from '../../../controllers/survey';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/survey:
 *  post:
 *   tags: ["survey"]
 *   summary: survey add api
 *   description: api used to add survey.
 *   parameters:
 *      - in: body
 *        name: survey
 *        description: The survey to create.
 *        schema:
 *         type: object
 *         required:
 *          - survey add
 *         properties:
 *           name:
 *             type: string
 *             required:
 *           description:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const surveySchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .label('Survey Name'),
  description: Joi.string()
    .optional()
    .allow('')
    .label('Survey Description')
});

app.post(
  '/survey',
  validator.body(surveySchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  add
);

export default app;
