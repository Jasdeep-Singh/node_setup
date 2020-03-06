/*
 * @file: add.js
 * @description: It Contain add questions router/api.
 * @author: Jasdeep Singh
 */
import express from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';
import { addQuestions } from '../../../controllers/survey';

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/survey/questions:
 *  post:
 *   tags: ["survey"]
 *   summary: survey add questions api
 *   description: api used to add survey questions </br><b>Note:-</b><br/> choice field is optional field. <b>refName</b> is a parent element name and <b>refValue</b> is a parent value selection in case of child element.
 *   parameters:
 *      - in: body
 *        name: survey
 *        description: The survey questions to create.
 *        schema:
 *         type: object
 *         required:
 *          - survey questions add
 *         properties:
 *           surveyId:
 *             type: string
 *             required:
 *           type:
 *             type: integer
 *             required:
 *           pageNumber:
 *             type: integer
 *             required:
 *           pageName:
 *             type: string
 *             required:
 *           elements:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *               name:
 *                type: string
 *                required: true
 *               type:
 *                type: string
 *                required: true
 *               refName:
 *                type: string
 *               refValue:
 *                type: string
 *               choices:
 *                type: array
 *                items:
 *                 type: string
 *             required:
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
    .valid(1, 2)
    .label('Survey Type'),
  pageNumber: Joi.number()
    .required()
    .label('Page Number'),
  pageName: Joi.string()
    .required()
    .trim()
    .label('Page Name'),
  elements: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .required()
          .label('Element Name'),
        type: Joi.string()
          .required()
          .label('Type'),
        refName: Joi.string()
          .optional()
          .allow('')
          .label('Ref Name'),
        refValue: Joi.string()
          .optional()
          .allow('')
          .label('Ref Value'),
        choices: Joi.array()
          .optional()
          .label('Choice')
      })
    )
    .required()
    .label('Page elements')
});

app.post(
  '/survey/questions',
  validator.body(surveySchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  addQuestions
);

export default app;
